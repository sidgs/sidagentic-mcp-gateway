// Package promptgroup manages named subsets of MCP prompts and their dedicated proxy servers.
package promptgroup

import (
	"context"
	"errors"
	"fmt"
	"log"
	"sort"
	"strings"
	"sync"

	mcpgo "github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/registrysync"
	"sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"sami.io/mcpgateway/pkg/util"
	"sami.io/mcpgateway/pkg/version"
	"gorm.io/gorm"
)

var ErrPromptGroupNotFound = fmt.Errorf("prompt group not found: %w", apierrors.ErrNotFound)

// PromptGroupService holds per-tenant prompt groups and their MCP proxy servers.
type PromptGroupService struct {
	db         *gorm.DB
	mcpService *mcp.MCPService

	mcpServers      map[string]*server.MCPServer
	mcpServersMu    sync.RWMutex
	sseMcpServers   map[string]*server.MCPServer
	sseMcpServerMu  sync.RWMutex

	notifier registrysync.Notifier
	originID string
}

func (s *PromptGroupService) dbTenant(ctx context.Context) *gorm.DB {
	return s.db.WithContext(ctx).Where("tenant_id = ?", tenant.MustFromContext(ctx))
}

// NewPromptGroupService wires prompt groups and subscribes MCP prompt lifecycle callbacks.
func NewPromptGroupService(db *gorm.DB, mcpService *mcp.MCPService) (*PromptGroupService, error) {
	s := &PromptGroupService{
		db:             db,
		mcpService:     mcpService,
		mcpServers:     make(map[string]*server.MCPServer),
		sseMcpServers:  make(map[string]*server.MCPServer),
		mcpServersMu:   sync.RWMutex{},
		sseMcpServerMu: sync.RWMutex{},
		notifier:       registrysync.NoopNotifier{},
	}

	mcpService.SetPromptDeletionCallback(s.handlePromptDeletion)
	mcpService.SetPromptAdditionCallback(s.handlePromptAddition)

	if err := s.initPromptGroupMCPServers(); err != nil {
		return nil, fmt.Errorf("failed to initialize prompt group MCP servers: %w", err)
	}
	return s, nil
}

func groupMapKey(tenantID, groupName string) string {
	return tenant.PromptGroupMapKey(tenantID, groupName)
}

// CreatePromptGroup persists a prompt group and registers prompts on two transport-specific proxies.
func (s *PromptGroupService) CreatePromptGroup(ctx context.Context, group *model.PromptGroup) error {
	if len(group.Name) == 0 {
		return fmt.Errorf("prompt group name cannot be empty: %w", apierrors.ErrInvalidInput)
	}
	if !toolgroup.ValidGroupName.MatchString(group.Name) {
		return fmt.Errorf(
			"invalid group name: name must start with an alphanumeric character and "+
				"can only contain alphanumeric characters, underscores, and hyphens: %w",
			apierrors.ErrInvalidInput,
		)
	}
	group.TenantID = tenant.MustFromContext(ctx)
	group.SecurityOption = types.NormalizeGroupSecurityOption(group.SecurityOption)
	if err := types.ValidateGroupSecurityOption(group.SecurityOption); err != nil {
		return err
	}

	promptNames, err := group.ResolveEffectivePrompts(ctx, s.mcpService)
	if err != nil {
		return fmt.Errorf("failed to resolve effective prompts: %w", err)
	}
	if len(promptNames) == 0 {
		return fmt.Errorf(
			"prompt group must contain at least one prompt after resolving servers and exclusions: %w",
			apierrors.ErrInvalidInput,
		)
	}

	mcpSrv := s.newMCPServer(group.Name)
	sseSrv := s.newSseMCPServer(group.Name)

	for _, pname := range promptNames {
		mcpPrompt, err := s.mcpService.QualifiedProxyPrompt(ctx, group.TenantID, pname)
		if err != nil {
			return fmt.Errorf("prompt %s does not exist or is disabled: %w", pname, apierrors.ErrInvalidInput)
		}
		parent, err := s.mcpService.GetPromptParentServer(ctx, pname)
		if err != nil {
			return fmt.Errorf("failed to get parent MCP server of prompt %s: %w", pname, err)
		}
		if parent.Transport == types.TransportSSE {
			sseSrv.AddPrompt(mcpPrompt, s.mcpService.MCPProxyPromptHandler)
		} else {
			mcpSrv.AddPrompt(mcpPrompt, s.mcpService.MCPProxyPromptHandler)
		}
	}

	if err := s.dbTenant(ctx).Create(group).Error; err != nil {
		return fmt.Errorf("failed to create prompt group: %w", err)
	}

	k := groupMapKey(group.TenantID, group.Name)
	s.addMCPServers(k, mcpSrv, sseSrv)
	s.notifyPromptGroupReload(ctx, group.TenantID, group.Name)
	return nil
}

// SetRegistryNotifier configures cross-pod registry sync publishing.
func (s *PromptGroupService) SetRegistryNotifier(n registrysync.Notifier) {
	if n == nil {
		s.notifier = registrysync.NoopNotifier{}
		return
	}
	s.notifier = n
}

// SetOriginID sets the pod identity stamped on outbound sync events.
func (s *PromptGroupService) SetOriginID(id string) {
	s.originID = id
}

func (s *PromptGroupService) notifyPromptGroupReload(ctx context.Context, tenantID, name string) {
	if s.notifier != nil {
		s.notifier.Notify(ctx, registrysync.PromptGroupReload(tenantID, name, s.originID))
	}
}

func (s *PromptGroupService) notifyPromptGroupDelete(ctx context.Context, tenantID, name string) {
	if s.notifier != nil {
		s.notifier.Notify(ctx, registrysync.PromptGroupDelete(tenantID, name, s.originID))
	}
}

// UpdatePromptGroup reconciles MCP servers with updated membership.
func (s *PromptGroupService) UpdatePromptGroup(ctx context.Context, name string, updated *model.PromptGroup) (*model.PromptGroup, error) {
	oldGroup, err := s.GetPromptGroup(ctx, name)
	if err != nil {
		return nil, err
	}

	if strings.TrimSpace(updated.SecurityOption) == "" {
		updated.SecurityOption = oldGroup.SecurityOption
	}
	updated.SecurityOption = types.NormalizeGroupSecurityOption(updated.SecurityOption)
	if err := types.ValidateGroupSecurityOption(updated.SecurityOption); err != nil {
		return nil, err
	}

	oldPrompts, err := oldGroup.ResolveEffectivePrompts(ctx, s.mcpService)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve effective prompts of original group: %w", err)
	}
	newPrompts, err := updated.ResolveEffectivePrompts(ctx, s.mcpService)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve effective prompts of updated group: %w", err)
	}

	added, removed := util.DiffTools(oldPrompts, newPrompts)

	if updated.Description == oldGroup.Description &&
		updated.SecurityOption == types.NormalizeGroupSecurityOption(oldGroup.SecurityOption) &&
		len(added) == 0 && len(removed) == 0 {
		return oldGroup, nil
	}

	mcpSrv, ok := s.GetPromptGroupMCPServer(oldGroup.TenantID, name)
	if !ok {
		return nil, fmt.Errorf("MCP server for prompt group %s does not exist", name)
	}
	sseSrv, ok := s.GetPromptGroupSseMCPServer(oldGroup.TenantID, name)
	if !ok {
		return nil, fmt.Errorf("SSE MCP server for prompt group %s does not exist", name)
	}

	type addPair struct {
		prompt mcpgo.Prompt
		sse    bool
	}
	var toAdd []addPair
	for _, pname := range added {
		mcpPrompt, err := s.mcpService.QualifiedProxyPrompt(ctx, oldGroup.TenantID, pname)
		if err != nil {
			return nil, fmt.Errorf("prompt %s does not exist or is disabled: %w", pname, apierrors.ErrInvalidInput)
		}
		parent, err := s.mcpService.GetPromptParentServer(ctx, pname)
		if err != nil {
			return nil, fmt.Errorf("failed to get parent MCP server of prompt %s: %w", pname, err)
		}
		toAdd = append(toAdd, addPair{prompt: mcpPrompt, sse: parent.Transport == types.TransportSSE})
	}

	var normalRemove, sseRemove []string
	for _, pname := range removed {
		parent, err := s.mcpService.GetPromptParentServer(ctx, pname)
		if err != nil {
			return nil, fmt.Errorf("failed to get parent MCP server of prompt %s: %w", pname, err)
		}
		q := tenant.QualifyProxyName(oldGroup.TenantID, pname)
		if parent.Transport == types.TransportSSE {
			sseRemove = append(sseRemove, q)
		} else {
			normalRemove = append(normalRemove, q)
		}
	}

	mcpSrv.DeletePrompts(normalRemove...)
	sseSrv.DeletePrompts(sseRemove...)

	for _, ap := range toAdd {
		if ap.sse {
			sseSrv.AddPrompt(ap.prompt, s.mcpService.MCPProxyPromptHandler)
		} else {
			mcpSrv.AddPrompt(ap.prompt, s.mcpService.MCPProxyPromptHandler)
		}
	}

	updated.Name = name
	if err := s.dbTenant(ctx).Model(&model.PromptGroup{}).Where("name = ?", name).Updates(updated).Error; err != nil {
		return nil, fmt.Errorf("failed to update prompt group in DB: %w", err)
	}
	s.notifyPromptGroupReload(ctx, oldGroup.TenantID, name)
	return oldGroup, nil
}

// ResolveEffectivePrompts returns sorted effective canonical prompt names.
func (s *PromptGroupService) ResolveEffectivePrompts(ctx context.Context, name string) ([]string, error) {
	group, err := s.GetPromptGroup(ctx, name)
	if err != nil {
		return nil, err
	}
	prompts, err := group.ResolveEffectivePrompts(ctx, s.mcpService)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve effective prompts for group %s: %w", name, err)
	}
	sort.Strings(prompts)
	return prompts, nil
}

// GetPromptGroup loads a prompt group by name for the tenant in ctx.
func (s *PromptGroupService) GetPromptGroup(ctx context.Context, name string) (*model.PromptGroup, error) {
	var group model.PromptGroup
	if err := s.dbTenant(ctx).Where("name = ?", name).First(&group).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrPromptGroupNotFound
		}
		return nil, err
	}
	return &group, nil
}

// ListPromptGroups lists all prompt groups for the tenant.
func (s *PromptGroupService) ListPromptGroups(ctx context.Context) ([]model.PromptGroup, error) {
	var groups []model.PromptGroup
	if err := s.dbTenant(ctx).Find(&groups).Error; err != nil {
		return nil, err
	}
	return groups, nil
}

// ListAllPromptGroupsForInit lists prompt groups across tenants (startup).
func (s *PromptGroupService) ListAllPromptGroupsForInit() ([]model.PromptGroup, error) {
	var groups []model.PromptGroup
	if err := s.db.Find(&groups).Error; err != nil {
		return nil, err
	}
	return groups, nil
}

// DeletePromptGroup removes DB row and in-memory MCP servers.
func (s *PromptGroupService) DeletePromptGroup(ctx context.Context, name string) error {
	group, err := s.GetPromptGroup(ctx, name)
	if err != nil {
		return err
	}
	k := groupMapKey(group.TenantID, name)
	s.deleteMCPServers(k)
	if err := s.dbTenant(ctx).Unscoped().Where("name = ?", name).Delete(&model.PromptGroup{}).Error; err != nil {
		return fmt.Errorf("failed to delete prompt group: %w", err)
	}
	s.notifyPromptGroupDelete(ctx, group.TenantID, name)
	return nil
}

// GetPromptGroupMCPServer returns the streamable-HTTP-oriented proxy for a prompt group.
func (s *PromptGroupService) GetPromptGroupMCPServer(tenantID, groupName string) (*server.MCPServer, bool) {
	s.mcpServersMu.RLock()
	defer s.mcpServersMu.RUnlock()
	srv, ok := s.mcpServers[groupMapKey(tenantID, groupName)]
	return srv, ok
}

// GetPromptGroupSseMCPServer returns the SSE-oriented proxy for a prompt group.
func (s *PromptGroupService) GetPromptGroupSseMCPServer(tenantID, groupName string) (*server.MCPServer, bool) {
	s.sseMcpServerMu.RLock()
	defer s.sseMcpServerMu.RUnlock()
	srv, ok := s.sseMcpServers[groupMapKey(tenantID, groupName)]
	return srv, ok
}

func (s *PromptGroupService) newMCPServer(groupName string) *server.MCPServer {
	return server.NewMCPServer(
		fmt.Sprintf("SAMI MCP Gateway proxy MCP server for prompt group: %s", groupName),
		version.GetVersion(),
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(false),
		server.WithPromptCapabilities(true),
	)
}

func (s *PromptGroupService) newSseMCPServer(groupName string) *server.MCPServer {
	return server.NewMCPServer(
		fmt.Sprintf("SAMI MCP Gateway proxy MCP server for SSE transport for prompt group: %s", groupName),
		version.GetVersion(),
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(false),
		server.WithPromptCapabilities(true),
	)
}

func (s *PromptGroupService) addMCPServers(key string, mcpSrv, sseSrv *server.MCPServer) {
	s.mcpServersMu.Lock()
	defer s.mcpServersMu.Unlock()
	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()
	s.mcpServers[key] = mcpSrv
	s.sseMcpServers[key] = sseSrv
}

func (s *PromptGroupService) deleteMCPServers(key string) {
	s.mcpServersMu.Lock()
	defer s.mcpServersMu.Unlock()
	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()
	delete(s.mcpServers, key)
	delete(s.sseMcpServers, key)
}

func (s *PromptGroupService) initPromptGroupMCPServers() error {
	groups, err := s.ListAllPromptGroupsForInit()
	if err != nil {
		return fmt.Errorf("failed to list prompt groups from DB: %w", err)
	}

	for _, group := range groups {
		gctx := tenant.WithContext(context.Background(), group.TenantID)
		if err := s.reloadGroupMCPServers(gctx, group.TenantID, group.Name); err != nil {
			return err
		}
	}
	return nil
}

// ReloadFromDB rebuilds in-memory MCP servers for one prompt group from Postgres.
func (s *PromptGroupService) ReloadFromDB(ctx context.Context, tenantID, name string) error {
	return s.reloadGroupMCPServers(ctx, tenantID, name)
}

// RemoveFromMemory drops in-memory MCP servers for a prompt group without touching the database.
func (s *PromptGroupService) RemoveFromMemory(tenantID, name string) {
	s.deleteMCPServers(groupMapKey(tenantID, name))
}

// ReloadAllFromDB rebuilds every prompt group's in-memory MCP servers from Postgres.
func (s *PromptGroupService) ReloadAllFromDB(ctx context.Context) error {
	groups, err := s.ListAllPromptGroupsForInit()
	if err != nil {
		return fmt.Errorf("failed to list prompt groups from DB: %w", err)
	}
	for _, group := range groups {
		gctx := tenant.WithContext(ctx, group.TenantID)
		if err := s.reloadGroupMCPServers(gctx, group.TenantID, group.Name); err != nil {
			return err
		}
	}
	return nil
}

func (s *PromptGroupService) reloadGroupMCPServers(ctx context.Context, tenantID, name string) error {
	group, err := s.GetPromptGroup(ctx, name)
	if err != nil {
		if errors.Is(err, ErrPromptGroupNotFound) {
			s.RemoveFromMemory(tenantID, name)
			return nil
		}
		return err
	}

	mcpSrv := s.newMCPServer(group.Name)
	sseSrv := s.newSseMCPServer(group.Name)

	names, err := group.ResolveEffectivePrompts(ctx, s.mcpService)
	if err != nil {
		log.Printf(
			"[ERROR] failed to resolve effective prompts for prompt group %s during reload; group starts empty: %v",
			group.Name, err,
		)
	} else {
		for _, pname := range names {
			mcpPrompt, err := s.mcpService.QualifiedProxyPrompt(ctx, group.TenantID, pname)
			if err != nil {
				continue
			}
			parent, err := s.mcpService.GetPromptParentServer(ctx, pname)
			if err != nil {
				return fmt.Errorf("failed to get parent MCP server of prompt %s: %w", pname, err)
			}
			if parent.Transport == types.TransportSSE {
				sseSrv.AddPrompt(mcpPrompt, s.mcpService.MCPProxyPromptHandler)
			} else {
				mcpSrv.AddPrompt(mcpPrompt, s.mcpService.MCPProxyPromptHandler)
			}
		}
	}

	s.addMCPServers(groupMapKey(tenantID, name), mcpSrv, sseSrv)
	return nil
}

func (s *PromptGroupService) handlePromptDeletion(qualified ...string) {
	s.mcpServersMu.RLock()
	defer s.mcpServersMu.RUnlock()
	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()

	for _, srv := range s.mcpServers {
		srv.DeletePrompts(qualified...)
	}
	for _, srv := range s.sseMcpServers {
		srv.DeletePrompts(qualified...)
	}
}

func (s *PromptGroupService) handlePromptAddition(qualified string) error {
	promptTenant, canonical, err := s.mcpService.ResolveProxyPromptTenant(qualified)
	if err != nil {
		return err
	}
	if promptTenant == "" {
		return fmt.Errorf("prompt %s has no tenant context", qualified)
	}
	ctx := tenant.WithContext(context.Background(), promptTenant)

	groups, err := s.ListAllPromptGroupsForInit()
	if err != nil {
		return fmt.Errorf("failed to list prompt groups: %w", err)
	}

	var keys []string
	for i := range groups {
		if groups[i].TenantID != promptTenant {
			continue
		}
		gname := groups[i].Name
		effective, err := groups[i].ResolveEffectivePrompts(ctx, s.mcpService)
		if err != nil {
			return fmt.Errorf("failed to resolve effective prompts for group %s: %w", gname, err)
		}
		for _, p := range effective {
			if p == canonical {
				keys = append(keys, groupMapKey(groups[i].TenantID, gname))
				break
			}
		}
	}

	mcpPrompt, err := s.mcpService.QualifiedProxyPrompt(ctx, promptTenant, canonical)
	if err != nil {
		return fmt.Errorf("qualified prompt %s: %w", qualified, err)
	}
	parent, err := s.mcpService.GetPromptParentServer(ctx, canonical)
	if err != nil {
		return fmt.Errorf("parent server for prompt %s: %w", canonical, err)
	}

	s.mcpServersMu.RLock()
	defer s.mcpServersMu.RUnlock()
	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()

	for _, k := range keys {
		if parent.Transport == types.TransportSSE {
			if srv, ok := s.sseMcpServers[k]; ok {
				srv.AddPrompt(mcpPrompt, s.mcpService.MCPProxyPromptHandler)
			}
			continue
		}
		if srv, ok := s.mcpServers[k]; ok {
			srv.AddPrompt(mcpPrompt, s.mcpService.MCPProxyPromptHandler)
		}
	}
	return nil
}
