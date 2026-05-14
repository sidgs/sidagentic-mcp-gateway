package mcp

import (
	"context"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
)

// ProxyToolFilter filters tools exposed by MCP proxy for enterprise mode based on client allow-list.
func ProxyToolFilter(ctx context.Context, tools []mcp.Tool) []mcp.Tool {
	serverMode, ok := ctx.Value("mode").(model.ServerMode)
	if !ok {
		return nil
	}
	if !model.IsEnterpriseMode(serverMode) {
		reqTenant := tenant.MustFromContext(ctx)
		var out []mcp.Tool
		for _, tool := range tools {
			tt, _, qual := tenant.SplitProxyToolName(tool.Name)
			if !qual || tt != reqTenant {
				continue
			}
			out = append(out, tool)
		}
		return out
	}

	c, ok := ctx.Value("client").(*model.McpClient)
	if !ok || c == nil {
		return nil
	}

	reqTenant := tenant.MustFromContext(ctx)

	var filteredTools []mcp.Tool
	allowedServers := make(map[string]bool)

	for _, tool := range tools {
		toolTenant, canonical, qual := tenant.SplitProxyToolName(tool.Name)
		if !qual || toolTenant != reqTenant {
			continue
		}
		serverName, _, ok := splitServerToolName(canonical)
		if !ok {
			continue
		}

		allowed, cached := allowedServers[serverName]
		if !cached {
			allowed = c.CheckHasServerAccess(serverName)
			allowedServers[serverName] = allowed
		}
		if allowed {
			filteredTools = append(filteredTools, tool)
		}
	}

	return filteredTools
}
