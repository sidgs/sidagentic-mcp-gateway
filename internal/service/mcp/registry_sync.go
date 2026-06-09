package mcp

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/mark3labs/mcp-go/mcp"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/registrysync"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
)

// SetRegistryNotifier configures cross-pod registry sync publishing.
func (m *MCPService) SetRegistryNotifier(n registrysync.Notifier) {
	if n == nil {
		m.notifier = registrysync.NoopNotifier{}
		return
	}
	m.notifier = n
}

// SetOriginID sets the pod identity stamped on outbound sync events.
func (m *MCPService) SetOriginID(id string) {
	m.originID = id
}

func (m *MCPService) notifyServerCatalogReload(ctx context.Context, serverName string) {
	if m.notifier == nil {
		return
	}
	m.notifier.Notify(ctx, registrysync.ServerCatalogReload(tenant.MustFromContext(ctx), serverName, m.originID))
}

func (m *MCPService) notifyServerPurge(ctx context.Context, serverName string) {
	if m.notifier == nil {
		return
	}
	m.notifier.Notify(ctx, registrysync.ServerPurge(tenant.MustFromContext(ctx), serverName, m.originID))
}

// ReloadServerCatalogFromDB reconciles the global MCP proxy catalog for one server from Postgres.
func (m *MCPService) ReloadServerCatalogFromDB(ctx context.Context, tenantID, serverName string) error {
	ctx = tenant.WithContext(ctx, tenantID)
	s, err := m.GetMcpServer(ctx, serverName)
	if err != nil {
		if errors.Is(err, apierrors.ErrNotFound) || strings.Contains(err.Error(), "not found") {
			m.PurgeServerFromProxy(tenantID, serverName)
			return nil
		}
		return err
	}

	if err := m.reconcileServerToolsFromDB(ctx, s); err != nil {
		return err
	}
	if err := m.reconcileServerPromptsFromDB(ctx, s); err != nil {
		return err
	}
	return m.reconcileServerResourcesFromDB(ctx, s)
}

// PurgeServerFromProxy removes all proxy entries for a deleted server without reading DB rows.
func (m *MCPService) PurgeServerFromProxy(tenantID, serverName string) {
	toolNames := m.collectProxyToolNamesForServer(tenantID, serverName)
	if len(toolNames) > 0 {
		m.mcpProxyServer.DeleteTools(toolNames...)
		m.sseMcpProxyServer.DeleteTools(toolNames...)
		m.deleteToolInstances(toolNames...)
		m.notifyToolDeletion(toolNames...)
	}

	promptNames := m.collectProxyPromptNamesForServer(tenantID, serverName)
	if len(promptNames) > 0 {
		m.mcpProxyServer.DeletePrompts(promptNames...)
		m.sseMcpProxyServer.DeletePrompts(promptNames...)
		m.deletePromptProxyNames(promptNames...)
		m.notifyPromptDeletion(promptNames...)
	}

	resourceURIs := m.collectProxyResourceURIsForServer(tenantID, serverName)
	if len(resourceURIs) > 0 {
		m.mcpProxyServer.DeleteResources(resourceURIs...)
		m.sseMcpProxyServer.DeleteResources(resourceURIs...)
		m.deleteResourceProxyURIs(resourceURIs...)
	}

	m.sessionManager.CloseSessionForServer(tenantID, serverName)
}

// ReconcileGlobalProxyFromDB rebuilds the global MCP proxy from Postgres (full catalog safety net).
func (m *MCPService) ReconcileGlobalProxyFromDB(ctx context.Context) error {
	var servers []model.McpServer
	if err := m.db.Find(&servers).Error; err != nil {
		return fmt.Errorf("list servers: %w", err)
	}
	for _, srv := range servers {
		sctx := tenant.WithContext(ctx, srv.TenantID)
		if err := m.ReloadServerCatalogFromDB(sctx, srv.TenantID, srv.Name); err != nil {
			return err
		}
	}

	// Purge orphaned proxy entries whose server row no longer exists.
	known := make(map[string]struct{}, len(servers))
	for _, srv := range servers {
		known[tenant.SessionKey(srv.TenantID, srv.Name)] = struct{}{}
	}
	for _, tenantID := range m.distinctProxyTenants() {
		for _, serverName := range m.distinctProxyServerNames(tenantID) {
			if _, ok := known[tenant.SessionKey(tenantID, serverName)]; !ok {
				m.PurgeServerFromProxy(tenantID, serverName)
			}
		}
	}
	return nil
}

func (m *MCPService) reconcileServerToolsFromDB(ctx context.Context, s *model.McpServer) error {
	tools, err := m.ListToolsByServer(ctx, s.Name)
	if err != nil {
		return err
	}

	desired := make(map[string]mcp.Tool)
	for i := range tools {
		if !tools[i].Enabled || !s.Enabled {
			continue
		}
		mcpTool, err := convertToolModelToMcpObject(&tools[i])
		if err != nil {
			return fmt.Errorf("convert tool %s: %w", tools[i].Name, err)
		}
		proxyName := tenant.QualifyProxyName(s.TenantID, tools[i].Name)
		mcpTool.Name = proxyName
		desired[proxyName] = mcpTool
	}

	current := m.collectProxyToolNamesForServer(s.TenantID, s.Name)
	currentSet := make(map[string]struct{}, len(current))
	for _, name := range current {
		currentSet[name] = struct{}{}
	}

	var toRemove []string
	for name := range currentSet {
		if _, ok := desired[name]; !ok {
			toRemove = append(toRemove, name)
		}
	}
	if len(toRemove) > 0 {
		if s.Transport == types.TransportSSE {
			m.sseMcpProxyServer.DeleteTools(toRemove...)
		} else {
			m.mcpProxyServer.DeleteTools(toRemove...)
		}
		m.deleteToolInstances(toRemove...)
		m.notifyToolDeletion(toRemove...)
	}

	for proxyName, mcpTool := range desired {
		if _, ok := currentSet[proxyName]; ok {
			continue
		}
		if s.Transport == types.TransportSSE {
			m.sseMcpProxyServer.AddTool(mcpTool, m.MCPProxyToolCallHandler)
		} else {
			m.mcpProxyServer.AddTool(mcpTool, m.MCPProxyToolCallHandler)
		}
		m.addToolInstance(mcpTool)
		m.notifyToolAddition(proxyName)
	}
	return nil
}

func (m *MCPService) reconcileServerPromptsFromDB(ctx context.Context, s *model.McpServer) error {
	prompts, err := m.ListPromptsByServer(ctx, s.Name)
	if err != nil {
		return err
	}

	desired := make(map[string]mcp.Prompt)
	for i := range prompts {
		if !prompts[i].Enabled || !s.Enabled {
			continue
		}
		mcpPrompt, err := convertPromptModelToMcpObject(&prompts[i])
		if err != nil {
			return fmt.Errorf("convert prompt %s: %w", prompts[i].Name, err)
		}
		proxyName := tenant.QualifyProxyName(s.TenantID, prompts[i].Name)
		mcpPrompt.Name = proxyName
		desired[proxyName] = mcpPrompt
	}

	current := m.collectProxyPromptNamesForServer(s.TenantID, s.Name)
	currentSet := make(map[string]struct{}, len(current))
	for _, name := range current {
		currentSet[name] = struct{}{}
	}

	var toRemove []string
	for name := range currentSet {
		if _, ok := desired[name]; !ok {
			toRemove = append(toRemove, name)
		}
	}
	if len(toRemove) > 0 {
		if s.Transport == types.TransportSSE {
			m.sseMcpProxyServer.DeletePrompts(toRemove...)
		} else {
			m.mcpProxyServer.DeletePrompts(toRemove...)
		}
		m.deletePromptProxyNames(toRemove...)
		m.notifyPromptDeletion(toRemove...)
	}

	for proxyName, mcpPrompt := range desired {
		if _, ok := currentSet[proxyName]; ok {
			continue
		}
		if s.Transport == types.TransportSSE {
			m.sseMcpProxyServer.AddPrompt(mcpPrompt, m.mcpProxyPromptHandler)
		} else {
			m.mcpProxyServer.AddPrompt(mcpPrompt, m.mcpProxyPromptHandler)
		}
		m.trackPromptProxyName(proxyName)
		m.notifyPromptAddition(proxyName)
	}
	return nil
}

func (m *MCPService) reconcileServerResourcesFromDB(ctx context.Context, s *model.McpServer) error {
	var resources []model.Resource
	if err := m.dbTenant(ctx).Where("server_id = ?", s.ID).Find(&resources).Error; err != nil {
		return fmt.Errorf("list resources for server %s: %w", s.Name, err)
	}

	desired := make(map[string]mcp.Resource)
	for i := range resources {
		if !resources[i].Enabled || !s.Enabled {
			continue
		}
		mcpResource, err := convertResourceModelToMcpObject(&resources[i])
		if err != nil {
			return fmt.Errorf("convert resource %s: %w", resources[i].URI, err)
		}
		mcpResource.Name = mergeServerResourceNames(s.Name, mcpResource.Name)
		desired[resources[i].URI] = mcpResource
	}

	current := m.collectProxyResourceURIsForServer(s.TenantID, s.Name)
	currentSet := make(map[string]struct{}, len(current))
	for _, uri := range current {
		currentSet[uri] = struct{}{}
	}

	var toRemove []string
	for uri := range currentSet {
		if _, ok := desired[uri]; !ok {
			toRemove = append(toRemove, uri)
		}
	}
	if len(toRemove) > 0 {
		if s.Transport == types.TransportSSE {
			m.sseMcpProxyServer.DeleteResources(toRemove...)
		} else {
			m.mcpProxyServer.DeleteResources(toRemove...)
		}
		m.deleteResourceProxyURIs(toRemove...)
	}

	for uri, mcpResource := range desired {
		if _, ok := currentSet[uri]; ok {
			continue
		}
		if s.Transport == types.TransportSSE {
			m.sseMcpProxyServer.AddResource(mcpResource, m.mcpProxyResourceHandler)
		} else {
			m.mcpProxyServer.AddResource(mcpResource, m.mcpProxyResourceHandler)
		}
		m.trackResourceProxyURI(uri)
	}
	return nil
}

func (m *MCPService) collectProxyToolNamesForServer(tenantID, serverName string) []string {
	m.mu.RLock()
	defer m.mu.RUnlock()

	var names []string
	for qn := range m.toolInstances {
		if proxyBelongsToServer(qn, tenantID, serverName, splitServerToolName) {
			names = append(names, qn)
		}
	}
	return names
}

func (m *MCPService) collectProxyPromptNamesForServer(tenantID, serverName string) []string {
	m.proxyCatalogMu.RLock()
	defer m.proxyCatalogMu.RUnlock()

	var names []string
	for qn := range m.promptProxyNames {
		if proxyBelongsToServer(qn, tenantID, serverName, splitServerPromptName) {
			names = append(names, qn)
		}
	}
	return names
}

func (m *MCPService) collectProxyResourceURIsForServer(tenantID, serverName string) []string {
	m.proxyCatalogMu.RLock()
	defer m.proxyCatalogMu.RUnlock()

	prefix := resourceURIPrefix + tenantID + "/" + serverName + "/"
	legacyPrefix := resourceURIPrefix + serverName + "/"

	var uris []string
	for uri := range m.resourceProxyURIs {
		if strings.HasPrefix(uri, prefix) || (tenantID == "" && strings.HasPrefix(uri, legacyPrefix)) {
			uris = append(uris, uri)
		}
	}
	return uris
}

func (m *MCPService) distinctProxyTenants() []string {
	seen := make(map[string]struct{})
	m.mu.RLock()
	for qn := range m.toolInstances {
		if tid, _, ok := proxyTenantAndCanonical(qn); ok && tid != "" {
			seen[tid] = struct{}{}
		}
	}
	m.mu.RUnlock()

	m.proxyCatalogMu.RLock()
	for qn := range m.promptProxyNames {
		if tid, _, ok := proxyTenantAndCanonical(qn); ok && tid != "" {
			seen[tid] = struct{}{}
		}
	}
	m.proxyCatalogMu.RUnlock()

	out := make([]string, 0, len(seen))
	for tid := range seen {
		out = append(out, tid)
	}
	return out
}

func (m *MCPService) distinctProxyServerNames(tenantID string) []string {
	seen := make(map[string]struct{})
	m.mu.RLock()
	for qn := range m.toolInstances {
		if tid, canonical, ok := proxyTenantAndCanonical(qn); ok && tid == tenantID {
			if srv, _, ok := splitServerToolName(canonical); ok {
				seen[srv] = struct{}{}
			}
		}
	}
	m.mu.RUnlock()
	out := make([]string, 0, len(seen))
	for name := range seen {
		out = append(out, name)
	}
	return out
}

func proxyTenantAndCanonical(proxyName string) (tenantID, canonical string, ok bool) {
	if tid, rest, qual := tenant.SplitProxyToolName(proxyName); qual {
		return tid, rest, true
	}
	return "", proxyName, true
}

func proxyBelongsToServer(
	proxyName, tenantID, serverName string,
	splitCanonical func(string) (string, string, bool),
) bool {
	tid, canonical, ok := proxyTenantAndCanonical(proxyName)
	if !ok {
		return false
	}
	if tid != tenantID {
		return false
	}
	srv, _, ok := splitCanonical(canonical)
	return ok && srv == serverName
}

func (m *MCPService) trackPromptProxyName(name string) {
	m.proxyCatalogMu.Lock()
	defer m.proxyCatalogMu.Unlock()
	if m.promptProxyNames == nil {
		m.promptProxyNames = make(map[string]struct{})
	}
	m.promptProxyNames[name] = struct{}{}
}

func (m *MCPService) deletePromptProxyNames(names ...string) {
	m.proxyCatalogMu.Lock()
	defer m.proxyCatalogMu.Unlock()
	for _, name := range names {
		delete(m.promptProxyNames, name)
	}
}

func (m *MCPService) trackResourceProxyURI(uri string) {
	m.proxyCatalogMu.Lock()
	defer m.proxyCatalogMu.Unlock()
	if m.resourceProxyURIs == nil {
		m.resourceProxyURIs = make(map[string]struct{})
	}
	m.resourceProxyURIs[uri] = struct{}{}
}

func (m *MCPService) deleteResourceProxyURIs(uris ...string) {
	m.proxyCatalogMu.Lock()
	defer m.proxyCatalogMu.Unlock()
	for _, uri := range uris {
		delete(m.resourceProxyURIs, uri)
	}
}
