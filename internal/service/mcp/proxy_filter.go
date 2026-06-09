package mcp

import (
	"context"

	"github.com/mark3labs/mcp-go/mcp"
	"sami.io/mcpgateway/internal/agentappauth"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/mcpgatewayctx"
	"sami.io/mcpgateway/pkg/tenant"
)

// ProxyToolFilter filters tools exposed by the MCP proxy.
// In development mode, only tools qualified for the request tenant are returned.
// In enterprise mode:
//   - Global /mcp (authenticated with GLOBAL_MCP_API_KEY) returns all tenant-qualified, well-formed tools.
//   - Open tool-group MCP returns tenant-qualified tools registered on that group's server.
//   - Tool-group MCP (agent-app principal) returns tools on that group's server when the app is attached to the group.
func ProxyToolFilter(ctx context.Context, tools []mcp.Tool) []mcp.Tool {
	serverMode, ok := ctx.Value("mode").(model.ServerMode)
	if !ok {
		return nil
	}
	if !model.IsEnterpriseMode(serverMode) {
		reqTenant := tenant.MustFromContext(ctx)
		var out []mcp.Tool
		for _, tool := range tools {
			if devProxyToolMatches(ctx, tool.Name, reqTenant) {
				out = append(out, tool)
			}
		}
		return out
	}

	if mcpgatewayctx.GlobalMCPAPIKeyAuth(ctx) {
		return tenantQualifiedEnterpriseTools(ctx, tools)
	}

	if mcpgatewayctx.OpenGroupMCP(ctx) {
		if _, ok := mcpgatewayctx.ToolGroupRoute(ctx); ok {
			return tenantQualifiedEnterpriseTools(ctx, tools)
		}
	}

	if aa, ok := agentappauth.PrincipalFromContext(ctx); ok {
		reqTenant := tenant.MustFromContext(ctx)
		var filtered []mcp.Tool
		for _, tool := range tools {
			toolTenant, canonical, qual := tenant.SplitProxyToolName(tool.Name)
			if !qual || toolTenant != reqTenant {
				continue
			}
			if _, _, ok := splitServerToolName(canonical); !ok {
				continue
			}
			filtered = append(filtered, tool)
		}
		if tg, ok := mcpgatewayctx.ToolGroupRoute(ctx); ok && aa.AllowsToolGroup(tg) {
			return filtered
		}
	}

	return nil
}

func devProxyToolMatches(ctx context.Context, toolName, reqTenant string) bool {
	toolTenant, _, qual := tenant.SplitProxyToolName(toolName)
	if qual {
		return toolTenant == reqTenant
	}
	if _, hasTenant := tenant.FromContext(ctx); !hasTenant {
		return false
	}
	_, _, ok := splitServerToolName(toolName)
	return ok
}

func tenantQualifiedEnterpriseTools(ctx context.Context, tools []mcp.Tool) []mcp.Tool {
	reqTenant := tenant.MustFromContext(ctx)
	var out []mcp.Tool
	for _, tool := range tools {
		toolTenant, canonical, qual := tenant.SplitProxyToolName(tool.Name)
		if !qual || toolTenant != reqTenant {
			continue
		}
		if _, _, ok := splitServerToolName(canonical); !ok {
			continue
		}
		out = append(out, tool)
	}
	return out
}
