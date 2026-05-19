package mcp

import (
	"context"
	"testing"

	"github.com/mark3labs/mcp-go/mcp"
	"sami.io/mcpgateway/internal/agentappauth"
	"sami.io/mcpgateway/internal/mcpgatewayctx"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/tenant"
	"github.com/stretchr/testify/assert"
)

func TestMcpProxyToolFilter(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name      string
		mode      model.ServerMode
		tools     []mcp.Tool
		wantNames []string
	}{
		{
			name: "development mode returns tenant-qualified tools only",
			mode: model.ModeDev,
			tools: []mcp.Tool{
				{Name: tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")},
				{Name: "deepwiki__search_wiki"},
			},
			wantNames: []string{tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")},
		},
		{
			name: "enterprise global MCP key returns all well-formed tenant tools",
			mode: model.ModeEnterprise,
			tools: []mcp.Tool{
				{Name: tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")},
				{Name: tenant.QualifyProxyName(tenant.DefaultID, "deepwiki__search_wiki")},
			},
			wantNames: []string{
				tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time"),
				tenant.QualifyProxyName(tenant.DefaultID, "deepwiki__search_wiki"),
			},
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			ctx := context.WithValue(context.Background(), "mode", tt.mode)
			ctx = tenant.WithContext(ctx, tenant.DefaultID)
			if tt.mode == model.ModeEnterprise {
				ctx = mcpgatewayctx.WithGlobalMCPAPIKeyAuth(ctx, true)
			}

			got := ProxyToolFilter(ctx, tt.tools)
			assert.Equal(t, tt.wantNames, toolNames(got))
		})
	}
}

func TestMcpProxyToolFilter_MissingModeInContext(t *testing.T) {
	t.Parallel()

	got := ProxyToolFilter(context.Background(), []mcp.Tool{
		{Name: "time__get_current_time"},
	})

	assert.Empty(t, got)
}

func TestMcpProxyToolFilter_InvalidModeTypeInContext(t *testing.T) {
	t.Parallel()

	ctx := context.WithValue(context.Background(), "mode", "enterprise")
	got := ProxyToolFilter(ctx, []mcp.Tool{
		{Name: "time__get_current_time"},
	})

	assert.Empty(t, got)
}

func TestMcpProxyToolFilter_EnterpriseMissingAuthInContext(t *testing.T) {
	t.Parallel()

	ctx := context.WithValue(context.Background(), "mode", model.ModeEnterprise)
	ctx = tenant.WithContext(ctx, tenant.DefaultID)
	got := ProxyToolFilter(ctx, []mcp.Tool{
		{Name: tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")},
	})

	assert.Empty(t, got)
}

func TestMcpProxyToolFilter_EnterpriseMalformedToolNamesAreDenied(t *testing.T) {
	t.Parallel()

	ctx := context.WithValue(context.Background(), "mode", model.ModeEnterprise)
	ctx = tenant.WithContext(ctx, tenant.DefaultID)
	ctx = mcpgatewayctx.WithGlobalMCPAPIKeyAuth(ctx, true)

	got := ProxyToolFilter(ctx, []mcp.Tool{
		{Name: "missing_separator"},
		{Name: tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")},
	})

	assert.Equal(t, []string{tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")}, toolNames(got))
}

func TestMcpProxyToolFilter_EnterpriseOpenToolGroup(t *testing.T) {
	t.Parallel()

	ctx := context.WithValue(context.Background(), "mode", model.ModeEnterprise)
	ctx = tenant.WithContext(ctx, tenant.DefaultID)
	ctx = mcpgatewayctx.WithToolGroupRoute(ctx, "mygroup")
	ctx = mcpgatewayctx.WithOpenGroupMCP(ctx, true)

	tools := []mcp.Tool{
		{Name: tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")},
		{Name: "missing_separator"},
	}
	got := ProxyToolFilter(ctx, tools)
	assert.Equal(t, []string{tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")}, toolNames(got))
}

func TestMcpProxyToolFilter_EnterpriseToolGroupWithAgentApp(t *testing.T) {
	t.Parallel()

	ctx := context.WithValue(context.Background(), "mode", model.ModeEnterprise)
	ctx = tenant.WithContext(ctx, tenant.DefaultID)
	ctx = mcpgatewayctx.WithToolGroupRoute(ctx, "mygroup")
	ctx = agentappauth.WithPrincipal(ctx, &agentappauth.Principal{
		ToolGroups: []string{"mygroup"},
	})

	tools := []mcp.Tool{
		{Name: tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")},
		{Name: tenant.QualifyProxyName("other", "time__get_current_time")},
	}
	got := ProxyToolFilter(ctx, tools)
	assert.Equal(t, []string{tenant.QualifyProxyName(tenant.DefaultID, "time__get_current_time")}, toolNames(got))
}

func toolNames(tools []mcp.Tool) []string {
	names := make([]string, len(tools))
	for i, tool := range tools {
		names[i] = tool.Name
	}
	return names
}
