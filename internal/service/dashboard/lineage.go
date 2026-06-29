package dashboard

import (
	"fmt"
	"strings"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

const defaultLineageUsageWindow = "7d"

func agentLineageID(id uint) string {
	return fmt.Sprintf("agent_app:%d", id)
}

func toolGroupLineageID(name string) string {
	return fmt.Sprintf("tool_group:%s", name)
}

func serverLineageID(name string) string {
	return fmt.Sprintf("server:%s", name)
}

func toolLineageID(serverName, toolName string) string {
	return fmt.Sprintf("tool:%s__%s", serverName, toolName)
}

func splitCanonicalToolName(canonical string) (serverName, toolName string, ok bool) {
	const sep = "__"
	idx := strings.Index(canonical, sep)
	if idx <= 0 || idx >= len(canonical)-len(sep) {
		return "", "", false
	}
	return canonical[:idx], canonical[idx+len(sep):], true
}

type lineageBuilder struct {
	nodes map[string]types.DashboardLineageNode
	edges map[string]types.DashboardLineageEdge
}

func newLineageBuilder() *lineageBuilder {
	return &lineageBuilder{
		nodes: make(map[string]types.DashboardLineageNode),
		edges: make(map[string]types.DashboardLineageEdge),
	}
}

func (b *lineageBuilder) addNode(id, kind, label string, meta map[string]string) {
	if _, exists := b.nodes[id]; exists {
		return
	}
	b.nodes[id] = types.DashboardLineageNode{
		ID:    id,
		Kind:  kind,
		Label: label,
		Meta:  meta,
	}
}

func (b *lineageBuilder) addEdge(source, target, kind, label string, weight int64) {
	id := fmt.Sprintf("%s->%s:%s", source, target, kind)
	if _, exists := b.edges[id]; exists {
		return
	}
	b.edges[id] = types.DashboardLineageEdge{
		ID:     id,
		Source: source,
		Target: target,
		Kind:   kind,
		Label:  label,
		Weight: weight,
	}
}

func (b *lineageBuilder) response(usageWindow string, empty bool) *types.DashboardLineageResponse {
	nodes := make([]types.DashboardLineageNode, 0, len(b.nodes))
	for _, node := range b.nodes {
		nodes = append(nodes, node)
	}
	edges := make([]types.DashboardLineageEdge, 0, len(b.edges))
	for _, edge := range b.edges {
		edges = append(edges, edge)
	}
	resp := &types.DashboardLineageResponse{
		UsageWindow: usageWindow,
		Nodes:       nodes,
		Edges:       edges,
	}
	if empty {
		resp.EmptyState = &types.DashboardEmptyState{
			Title:       "No lineage to display",
			Description: "Register servers, create tool groups, and attach agent apps to see how they connect.",
		}
	}
	return resp
}

// Lineage returns a graph of configured and observed relationships between agent apps, tool groups, servers, and tools.
func (s *Service) Lineage(usageRange string) (*types.DashboardLineageResponse, error) {
	window, err := parseObservabilityWindow(usageRange, "", "")
	if err != nil {
		window, err = parseObservabilityWindow(defaultLineageUsageWindow, "", "")
		if err != nil {
			return nil, err
		}
	}

	builder := newLineageBuilder()

	var agentApps []model.AgentApp
	if err := s.db.Find(&agentApps).Error; err != nil {
		return nil, err
	}
	var toolGroups []model.ToolGroup
	if err := s.db.Find(&toolGroups).Error; err != nil {
		return nil, err
	}
	var tools []model.Tool
	if err := s.db.Preload("Server").Find(&tools).Error; err != nil {
		return nil, err
	}

	toolsByServer := make(map[string][]model.Tool)
	for _, tool := range tools {
		if !tool.Enabled || !tool.Server.Enabled {
			continue
		}
		serverName := tool.Server.Name
		toolsByServer[serverName] = append(toolsByServer[serverName], tool)
	}

	for _, app := range agentApps {
		agentID := agentLineageID(app.ID)
		builder.addNode(agentID, "agent_app", app.Name, map[string]string{
			"client_id": app.ClientID,
			"status":    string(app.Status),
		})

		groupNames, err := app.GetToolGroups()
		if err != nil {
			return nil, err
		}
		for _, groupName := range groupNames {
			groupID := toolGroupLineageID(groupName)
			builder.addNode(groupID, "tool_group", groupName, nil)
			builder.addEdge(agentID, groupID, "attaches", "attached", 0)
		}
	}

	for _, group := range toolGroups {
		groupID := toolGroupLineageID(group.Name)
		builder.addNode(groupID, "tool_group", group.Name, map[string]string{
			"security_option": group.SecurityOption,
		})

		includedTools, err := group.GetTools()
		if err != nil {
			return nil, err
		}
		for _, canonical := range includedTools {
			serverName, toolName, ok := splitCanonicalToolName(canonical)
			if !ok {
				continue
			}
			serverID := serverLineageID(serverName)
			toolID := toolLineageID(serverName, toolName)
			builder.addNode(serverID, "server", serverName, nil)
			builder.addNode(toolID, "tool", toolName, map[string]string{"server": serverName})
			builder.addEdge(groupID, toolID, "includes_tool", "includes", 0)
			builder.addEdge(serverID, toolID, "provides", "provides", 0)
		}

		includedServers, err := group.GetServers()
		if err != nil {
			return nil, err
		}
		for _, serverName := range includedServers {
			serverID := serverLineageID(serverName)
			builder.addNode(serverID, "server", serverName, nil)
			builder.addEdge(groupID, serverID, "includes_server", "includes server", 0)
			for _, tool := range toolsByServer[serverName] {
				toolID := toolLineageID(serverName, tool.Name)
				builder.addNode(toolID, "tool", tool.Name, map[string]string{"server": serverName})
				builder.addEdge(serverID, toolID, "provides", "provides", 0)
			}
		}
	}

	type usageEdgeRow struct {
		AgentAppID    *uint
		MCPServerName string
		ToolName      string
		ToolGroupName string
		TotalCalls    int64
	}
	var usageRows []usageEdgeRow
	if err := s.db.Model(&model.ToolInvocationEvent{}).
		Select(`
			agent_app_id,
			mcp_server_name,
			tool_name,
			tool_group_name,
			COUNT(*) AS total_calls`).
		Where("created_on >= ? AND created_on < ?", window.From, window.To).
		Group("agent_app_id, mcp_server_name, tool_name, tool_group_name").
		Scan(&usageRows).Error; err != nil {
		return nil, err
	}

	for _, row := range usageRows {
		serverID := serverLineageID(row.MCPServerName)
		toolID := toolLineageID(row.MCPServerName, row.ToolName)
		builder.addNode(serverID, "server", row.MCPServerName, nil)
		builder.addNode(toolID, "tool", row.ToolName, map[string]string{"server": row.MCPServerName})
		builder.addEdge(serverID, toolID, "provides", "provides", 0)

		if row.AgentAppID != nil {
			agentID := agentLineageID(*row.AgentAppID)
			var app model.AgentApp
			if err := s.db.First(&app, *row.AgentAppID).Error; err == nil {
				builder.addNode(agentID, "agent_app", app.Name, map[string]string{
					"client_id": app.ClientID,
					"status":    string(app.Status),
				})
			}
			builder.addEdge(agentID, toolID, "invokes", "invokes", row.TotalCalls)
		}

		if row.ToolGroupName != "" {
			groupID := toolGroupLineageID(row.ToolGroupName)
			builder.addNode(groupID, "tool_group", row.ToolGroupName, nil)
			builder.addEdge(groupID, toolID, "routes_to", "routes to", row.TotalCalls)
			if row.AgentAppID != nil {
				builder.addEdge(agentLineageID(*row.AgentAppID), groupID, "attaches", "attached", 0)
			}
		}
	}

	empty := len(builder.nodes) == 0
	return builder.response(window.Range, empty), nil
}
