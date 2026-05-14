// Package toolgroup provides functionality to manage tool groups and their associated MCP proxy servers.
package toolgroup

import (
	"context"
	"errors"
	"fmt"
	"log"
	"regexp"
	"sort"
	"sync"

	mcpgo "github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/internal/service/mcp"
	"github.com/mcpjungle/mcpjungle/pkg/apierrors"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"github.com/mcpjungle/mcpjungle/pkg/util"
	"github.com/mcpjungle/mcpjungle/pkg/version"
	"gorm.io/gorm"
)

var ErrToolGroupNotFound = fmt.Errorf("tool group not found: %w", apierrors.ErrNotFound)

// ValidGroupName is a regex that matches valid tool group names.
var ValidGroupName = regexp.MustCompile(`^[a-zA-Z0-9][a-zA-Z0-9_-]*$`)

// ToolGroupService provides methods to manage tool groups and their associated MCP proxy servers.
type ToolGroupService struct {
	db *gorm.DB

	mcpService *mcp.MCPService

	// mcpServers key: tenant::groupName
	mcpServers   map[string]*server.MCPServer
	mcpServersMu sync.RWMutex

	sseMcpServers   map[string]*server.MCPServer
	sseMcpServerMu  sync.RWMutex
}

func (s *ToolGroupService) dbTenant(ctx context.Context) *gorm.DB {
	return s.db.WithContext(ctx).Where("tenant_id = ?", tenant.MustFromContext(ctx))
}

func NewToolGroupService(db *gorm.DB, mcpService *mcp.MCPService) (*ToolGroupService, error) {
	s := &ToolGroupService{
		db:            db,
		mcpService:    mcpService,
		mcpServers:    make(map[string]*server.MCPServer),
		mcpServersMu:  sync.RWMutex{},
		sseMcpServers: make(map[string]*server.MCPServer),
		sseMcpServerMu: sync.RWMutex{},
	}

	mcpService.SetToolDeletionCallback(s.handleToolDeletion)
	mcpService.SetToolAdditionCallback(s.handleToolAddition)

	if err := s.initToolGroupMCPServers(); err != nil {
		return nil, fmt.Errorf("failed to initialize tool group MCP servers: %w", err)
	}
	return s, nil
}

func groupMapKey(tenantID, groupName string) string {
	return tenant.ToolGroupMapKey(tenantID, groupName)
}

// CreateToolGroup creates a new tool group in the database and a Proxy MCP server that just exposes the specified tools.
func (s *ToolGroupService) CreateToolGroup(ctx context.Context, group *model.ToolGroup) error {
	if len(group.Name) == 0 {
		return fmt.Errorf("tool group name cannot be empty: %w", apierrors.ErrInvalidInput)
	}
	if !ValidGroupName.MatchString(group.Name) {
		return fmt.Errorf(
			"invalid group name: name must start with an alphanumeric character and "+
				"can only contain alphanumeric characters, underscores, and hyphens: %w",
			apierrors.ErrInvalidInput,
		)
	}
	group.TenantID = tenant.MustFromContext(ctx)

	toolNames, err := group.ResolveEffectiveTools(ctx, s.mcpService)
	if err != nil {
		return fmt.Errorf("failed to resolve effective tools: %w", err)
	}
	if len(toolNames) == 0 {
		return fmt.Errorf(
			"tool group must contain at least one tool after resolving servers and exclusions: %w",
			apierrors.ErrInvalidInput,
		)
	}

	mcpServer := s.newMCPServer(group.Name)
	sseMcpServer := s.newSseMCPServer(group.Name)

	for _, name := range toolNames {
		q := tenant.QualifyProxyName(group.TenantID, name)
		tool, exists := s.mcpService.GetToolInstance(q)
		if !exists {
			return fmt.Errorf("tool %s does not exist or is disabled: %w", name, apierrors.ErrInvalidInput)
		}

		parentServer, err := s.mcpService.GetToolParentServer(ctx, name)
		if err != nil {
			return fmt.Errorf("failed to get parent MCP server of the tool %s: %w", name, err)
		}

		if parentServer.Transport == types.TransportSSE {
			sseMcpServer.AddTool(tool, s.mcpService.MCPProxyToolCallHandler)
		} else {
			mcpServer.AddTool(tool, s.mcpService.MCPProxyToolCallHandler)
		}
	}

	if err := s.dbTenant(ctx).Create(group).Error; err != nil {
		return fmt.Errorf("failed to create tool group: %w", err)
	}

	mapKey := groupMapKey(group.TenantID, group.Name)
	s.addToolGroupMCPServer(mapKey, mcpServer)
	s.addToolGroupSseMCPServer(mapKey, sseMcpServer)

	return nil
}

// UpdateToolGroup updates an existing tool group without causing any downtime for its MCP proxy servers.
func (s *ToolGroupService) UpdateToolGroup(ctx context.Context, name string, updatedGroup *model.ToolGroup) (*model.ToolGroup, error) {
	oldGroup, err := s.GetToolGroup(ctx, name)
	if err != nil {
		if errors.Is(err, ErrToolGroupNotFound) {
			return nil, err
		}
		return nil, fmt.Errorf("failed to retrieve the tool group: %w", err)
	}

	oldToolNames, err := oldGroup.ResolveEffectiveTools(ctx, s.mcpService)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve effective tools of original group: %w", err)
	}
	updatedToolNames, err := updatedGroup.ResolveEffectiveTools(ctx, s.mcpService)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve effective tools of the updated group: %w", err)
	}

	toolsAdded, toolsRemoved := util.DiffTools(oldToolNames, updatedToolNames)

	if updatedGroup.Description == oldGroup.Description && len(toolsAdded) == 0 && len(toolsRemoved) == 0 {
		return oldGroup, nil
	}

	mcpServer, exists := s.GetToolGroupMCPServer(oldGroup.TenantID, name)
	if !exists {
		return nil, fmt.Errorf("MCP server for tool group %s does not exist", name)
	}
	sseMcpServer, exists := s.GetToolGroupSseMCPServer(oldGroup.TenantID, name)
	if !exists {
		return nil, fmt.Errorf("SSE MCP server for tool group %s does not exist", name)
	}

	var sseToolsToAdd, normalToolsToAdd []mcpgo.Tool
	for _, toolName := range toolsAdded {
		q := tenant.QualifyProxyName(oldGroup.TenantID, toolName)
		tool, exists := s.mcpService.GetToolInstance(q)
		if !exists {
			return nil, fmt.Errorf("tool %s does not exist or is disabled: %w", toolName, apierrors.ErrInvalidInput)
		}

		parentServer, err := s.mcpService.GetToolParentServer(ctx, toolName)
		if err != nil {
			return nil, fmt.Errorf("failed to get parent MCP server of the tool %s: %w", toolName, err)
		}

		if parentServer.Transport == types.TransportSSE {
			sseToolsToAdd = append(sseToolsToAdd, tool)
		} else {
			normalToolsToAdd = append(normalToolsToAdd, tool)
		}
	}

	var sseToolsToRemove, normalToolsToRemove []string
	for _, toolName := range toolsRemoved {
		parentServer, err := s.mcpService.GetToolParentServer(ctx, toolName)
		if err != nil {
			return nil, fmt.Errorf("failed to get parent MCP server of the tool %s: %w", toolName, err)
		}

		q := tenant.QualifyProxyName(oldGroup.TenantID, toolName)
		if parentServer.Transport == types.TransportSSE {
			sseToolsToRemove = append(sseToolsToRemove, q)
		} else {
			normalToolsToRemove = append(normalToolsToRemove, q)
		}
	}

	mcpServer.DeleteTools(normalToolsToRemove...)
	sseMcpServer.DeleteTools(sseToolsToRemove...)

	for _, tool := range normalToolsToAdd {
		mcpServer.AddTool(tool, s.mcpService.MCPProxyToolCallHandler)
	}
	for _, tool := range sseToolsToAdd {
		sseMcpServer.AddTool(tool, s.mcpService.MCPProxyToolCallHandler)
	}

	updatedGroup.Name = name
	if err := s.dbTenant(ctx).Model(&model.ToolGroup{}).Where("name = ?", name).Updates(updatedGroup).Error; err != nil {
		return nil, fmt.Errorf("failed to update tool group in DB: %w", err)
	}

	return oldGroup, nil
}

// ResolveEffectiveTools resolves all effective tools for the specified tool group.
func (s *ToolGroupService) ResolveEffectiveTools(ctx context.Context, name string) ([]string, error) {
	group, err := s.GetToolGroup(ctx, name)
	if err != nil {
		return nil, err
	}

	tools, err := group.ResolveEffectiveTools(ctx, s.mcpService)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve effective tools for group %s: %w", name, err)
	}

	sort.Strings(tools)
	return tools, nil
}

// GetToolGroup retrieves a tool group by name from the database.
func (s *ToolGroupService) GetToolGroup(ctx context.Context, name string) (*model.ToolGroup, error) {
	var group model.ToolGroup
	if err := s.dbTenant(ctx).Where("name = ?", name).First(&group).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrToolGroupNotFound
		}
		return nil, err
	}
	return &group, nil
}

// ListToolGroups retrieves all tool groups from the database.
func (s *ToolGroupService) ListToolGroups(ctx context.Context) ([]model.ToolGroup, error) {
	var groups []model.ToolGroup
	if err := s.dbTenant(ctx).Find(&groups).Error; err != nil {
		return nil, err
	}
	return groups, nil
}

// ListAllToolGroupsForInit lists tool groups across tenants (startup only).
func (s *ToolGroupService) ListAllToolGroupsForInit() ([]model.ToolGroup, error) {
	var groups []model.ToolGroup
	if err := s.db.Find(&groups).Error; err != nil {
		return nil, err
	}
	return groups, nil
}

func (s *ToolGroupService) DeleteToolGroup(ctx context.Context, name string) error {
	group, err := s.GetToolGroup(ctx, name)
	if err != nil {
		return err
	}
	mapKey := groupMapKey(group.TenantID, name)
	s.deleteToolGroupMCPServers(mapKey)

	if err := s.dbTenant(ctx).Unscoped().Where("name = ?", name).Delete(&model.ToolGroup{}).Error; err != nil {
		return fmt.Errorf("failed to delete toolgroup: %w", err)
	}
	return nil
}

// GetToolGroupMCPServer retrieves the MCP proxy server for a given tool group name.
func (s *ToolGroupService) GetToolGroupMCPServer(tenantID, groupName string) (*server.MCPServer, bool) {
	s.mcpServersMu.RLock()
	defer s.mcpServersMu.RUnlock()
	mcpServer, exists := s.mcpServers[groupMapKey(tenantID, groupName)]
	return mcpServer, exists
}

// GetToolGroupSseMCPServer retrieves the SSE MCP proxy server for a given tool group name.
func (s *ToolGroupService) GetToolGroupSseMCPServer(tenantID, groupName string) (*server.MCPServer, bool) {
	s.sseMcpServerMu.RLock()
	defer s.sseMcpServerMu.RUnlock()
	mcpServer, exists := s.sseMcpServers[groupMapKey(tenantID, groupName)]
	return mcpServer, exists
}

func (s *ToolGroupService) newMCPServer(groupName string) *server.MCPServer {
	return server.NewMCPServer(
		fmt.Sprintf("MCPJungle proxy MCP server for tool group: %s", groupName),
		version.GetVersion(),
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcp.ProxyToolFilter),
	)
}

func (s *ToolGroupService) newSseMCPServer(groupName string) *server.MCPServer {
	return server.NewMCPServer(
		fmt.Sprintf("MCPJungle proxy MCP server for SSE transport for tool group: %s", groupName),
		version.GetVersion(),
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcp.ProxyToolFilter),
	)
}

func (s *ToolGroupService) addToolGroupMCPServer(key string, mcpServer *server.MCPServer) {
	s.mcpServersMu.Lock()
	defer s.mcpServersMu.Unlock()
	s.mcpServers[key] = mcpServer
}

func (s *ToolGroupService) addToolGroupSseMCPServer(key string, mcpServer *server.MCPServer) {
	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()
	s.sseMcpServers[key] = mcpServer
}

func (s *ToolGroupService) deleteToolGroupMCPServers(key string) {
	s.mcpServersMu.Lock()
	defer s.mcpServersMu.Unlock()

	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()

	delete(s.mcpServers, key)
	delete(s.sseMcpServers, key)
}

func (s *ToolGroupService) initToolGroupMCPServers() error {
	groups, err := s.ListAllToolGroupsForInit()
	if err != nil {
		return fmt.Errorf("failed to list tool groups from DB: %w", err)
	}

	for _, group := range groups {
		mcpServer := s.newMCPServer(group.Name)
		sseMcpServer := s.newSseMCPServer(group.Name)

		gctx := tenant.WithContext(context.Background(), group.TenantID)
		toolNames, err := group.ResolveEffectiveTools(gctx, s.mcpService)
		if err != nil {
			log.Printf(
				"[ERROR] failed to resolve effective tools for tool group %s during startup; the tool group will be initialized as empty: %v",
				group.Name,
				err,
			)
			k := groupMapKey(group.TenantID, group.Name)
			s.addToolGroupMCPServer(k, mcpServer)
			s.addToolGroupSseMCPServer(k, sseMcpServer)
			continue
		}

		for _, name := range toolNames {
			q := tenant.QualifyProxyName(group.TenantID, name)
			tool, exists := s.mcpService.GetToolInstance(q)
			if !exists {
				continue
			}

			parentServer, err := s.mcpService.GetToolParentServer(gctx, name)
			if err != nil {
				return fmt.Errorf("failed to get parent MCP server of the tool %s: %w", name, err)
			}

			if parentServer.Transport == types.TransportSSE {
				sseMcpServer.AddTool(tool, s.mcpService.MCPProxyToolCallHandler)
			} else {
				mcpServer.AddTool(tool, s.mcpService.MCPProxyToolCallHandler)
			}
		}

		k := groupMapKey(group.TenantID, group.Name)
		s.addToolGroupMCPServer(k, mcpServer)
		s.addToolGroupSseMCPServer(k, sseMcpServer)
	}

	return nil
}

func (s *ToolGroupService) handleToolDeletion(tools ...string) {
	s.mcpServersMu.RLock()
	defer s.mcpServersMu.RUnlock()

	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()

	for _, mcpServer := range s.mcpServers {
		mcpServer.DeleteTools(tools...)
	}

	for _, sseMcpServer := range s.sseMcpServers {
		sseMcpServer.DeleteTools(tools...)
	}
}

func (s *ToolGroupService) handleToolAddition(newTool string) error {
	toolTenant, canonicalTool, qual := tenant.SplitProxyToolName(newTool)
	if !qual {
		return fmt.Errorf("tool instance %s has unexpected name format", newTool)
	}
	ctx := tenant.WithContext(context.Background(), toolTenant)

	groups, err := s.ListAllToolGroupsForInit()
	if err != nil {
		return fmt.Errorf("failed to list tool groups from DB: %w", err)
	}

	var groupsToUpdate []string
	for i := range groups {
		if groups[i].TenantID != toolTenant {
			continue
		}
		gname := groups[i].Name
		groupTools, err := groups[i].ResolveEffectiveTools(ctx, s.mcpService)
		if err != nil {
			return fmt.Errorf("failed to resolve effective tools for group %s: %w", gname, err)
		}
		for _, t := range groupTools {
			if t != canonicalTool {
				continue
			}
			groupsToUpdate = append(groupsToUpdate, groupMapKey(groups[i].TenantID, gname))
			break
		}
	}

	newToolInstance, exists := s.mcpService.GetToolInstance(newTool)
	if !exists {
		return fmt.Errorf("tool instance %s does not exist", newTool)
	}

	parentServer, err := s.mcpService.GetToolParentServer(ctx, canonicalTool)
	if err != nil {
		return fmt.Errorf("failed to get parent MCP server of the tool %s: %w", newTool, err)
	}

	s.mcpServersMu.RLock()
	defer s.mcpServersMu.RUnlock()

	s.sseMcpServerMu.Lock()
	defer s.sseMcpServerMu.Unlock()

	for _, mapKey := range groupsToUpdate {
		if parentServer.Transport == types.TransportSSE {
			sseMcpServer, exists := s.sseMcpServers[mapKey]
			if exists {
				sseMcpServer.AddTool(newToolInstance, s.mcpService.MCPProxyToolCallHandler)
			}
			continue
		}

		mcpServer, exists := s.mcpServers[mapKey]
		if exists {
			mcpServer.AddTool(newToolInstance, s.mcpService.MCPProxyToolCallHandler)
		}
	}

	return nil
}
