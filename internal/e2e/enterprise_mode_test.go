package e2e_test

import (
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mark3labs/mcp-go/client"
	"github.com/mark3labs/mcp-go/client/transport"
	"github.com/mark3labs/mcp-go/mcp"
	mcpserver "github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// -----------------------------------------------------------------------
// Enterprise mode – authentication & RBAC
// -----------------------------------------------------------------------

func TestE2E_EnterpriseMode_Unauthenticated_Returns401(t *testing.T) {
	env := setupE2EServer(t, model.ModeEnterprise)

	endpoints := []struct{ method, path string }{
		{http.MethodGet, "/api/v0/tools"},
		{http.MethodGet, "/api/v0/prompts"},
		{http.MethodGet, "/api/v0/servers"},
	}
	for _, ep := range endpoints {
		t.Run(fmt.Sprintf("%s %s", ep.method, ep.path), func(t *testing.T) {
			resp := env.do(t, ep.method, ep.path, nil, "")
			defer drain(resp)
			assert.Equal(t, http.StatusUnauthorized, resp.StatusCode)
		})
	}
}

func TestE2E_EnterpriseMode_RegularUser_CannotWrite(t *testing.T) {
	env := setupE2EServer(t, model.ModeEnterprise)

	writeOps := []struct {
		method, path string
		body         any
	}{
		{http.MethodPost, "/api/v0/servers", map[string]any{"name": "x", "transport": "stdio", "command": "echo"}},
		{http.MethodPost, "/api/v0/tool-groups", map[string]any{"name": "g"}},
		{http.MethodPost, "/api/v0/users", map[string]any{"username": "u"}},
	}
	for _, op := range writeOps {
		t.Run(fmt.Sprintf("%s %s", op.method, op.path), func(t *testing.T) {
			resp := env.do(t, op.method, op.path, op.body, env.userToken)
			defer drain(resp)
			assert.Equal(t, http.StatusForbidden, resp.StatusCode)
		})
	}
}

// -----------------------------------------------------------------------
// Enterprise mode – global MCP (GLOBAL_MCP_API_KEY)
// -----------------------------------------------------------------------

// TestE2E_EnterpriseMode_McpProxy_RequiresGlobalKey verifies that global /mcp rejects
// user/admin bearer tokens and accepts X-API-Key GLOBAL_MCP_API_KEY.
func TestE2E_EnterpriseMode_McpProxy_RequiresGlobalKey(t *testing.T) {
	env := setupE2EServer(t, model.ModeEnterprise)

	for _, token := range []string{"", env.userToken, env.adminToken} {
		c, err := client.NewStreamableHttpClient(env.baseURL+"/mcp", transport.WithHTTPHeaders(map[string]string{
			"Authorization": "Bearer " + token,
		}))
		require.NoError(t, err)
		_, err = c.Initialize(context.Background(), mcp.InitializeRequest{
			Params: mcp.InitializeParams{
				ProtocolVersion: mcp.LATEST_PROTOCOL_VERSION,
				ClientInfo:      mcp.Implementation{Name: "e2e", Version: "1.0"},
			},
		})
		require.Error(t, err, "user/admin token must not authenticate global MCP")
		_ = c.Close()
	}

	c, err := client.NewStreamableHttpClient(env.baseURL+"/mcp", transport.WithHTTPHeaders(map[string]string{
		"X-API-Key": e2eGlobalMCPAPIKey,
	}))
	require.NoError(t, err)
	defer c.Close()
	_, err = c.Initialize(context.Background(), mcp.InitializeRequest{
		Params: mcp.InitializeParams{
			ProtocolVersion: mcp.LATEST_PROTOCOL_VERSION,
			ClientInfo:      mcp.Implementation{Name: "e2e", Version: "1.0"},
		},
	})
	require.NoError(t, err)
}

// TestE2E_EnterpriseMode_McpProxy_GlobalKeyFullTenantAccess registers two servers and verifies
// the global MCP proxy exposes tools and prompts from both (no per-client allow list).
func TestE2E_EnterpriseMode_McpProxy_GlobalKeyFullTenantAccess(t *testing.T) {
	env := setupE2EServer(t, model.ModeEnterprise)

	// Register two independent server instances so we can test cross-server scoping.
	registerEverythingServerAs(t, env, "svc-a", env.adminToken)
	registerEverythingServerAs(t, env, "svc-b", env.adminToken)

	c := newMCPProxyClient(t, env)
	qa := tenant.QualifyProxyName(tenant.DefaultID, "svc-a__echo")
	qb := tenant.QualifyProxyName(tenant.DefaultID, "svc-b__echo")
	pa := tenant.QualifyProxyName(tenant.DefaultID, "svc-a__simple-prompt")
	pb := tenant.QualifyProxyName(tenant.DefaultID, "svc-b__simple-prompt")

	// --- Tools ---

	t.Run("list tools: both servers visible", func(t *testing.T) {
		result, err := c.ListTools(context.Background(), mcp.ListToolsRequest{})
		require.NoError(t, err)

		names := make([]string, 0, len(result.Tools))
		for _, tool := range result.Tools {
			names = append(names, tool.Name)
		}
		assert.Contains(t, names, qa)
		assert.Contains(t, names, qb)
	})

	t.Run("invoke svc-a tool succeeds", func(t *testing.T) {
		result, err := c.CallTool(context.Background(), mcp.CallToolRequest{
			Params: mcp.CallToolParams{
				Name:      qa,
				Arguments: map[string]any{"message": "hello from svc-a"},
			},
		})
		require.NoError(t, err)
		require.False(t, result.IsError)
		first, ok := result.Content[0].(mcp.TextContent)
		require.True(t, ok)
		assert.Contains(t, first.Text, "hello from svc-a")
	})

	t.Run("invoke svc-b tool succeeds", func(t *testing.T) {
		result, err := c.CallTool(context.Background(), mcp.CallToolRequest{
			Params: mcp.CallToolParams{
				Name:      qb,
				Arguments: map[string]any{"message": "hello from svc-b"},
			},
		})
		require.NoError(t, err)
		require.False(t, result.IsError)
		first, ok := result.Content[0].(mcp.TextContent)
		require.True(t, ok)
		assert.Contains(t, first.Text, "hello from svc-b")
	})

	// --- Prompts ---

	t.Run("list prompts: both servers", func(t *testing.T) {
		result, err := c.ListPrompts(context.Background(), mcp.ListPromptsRequest{})
		require.NoError(t, err)

		names := make([]string, 0, len(result.Prompts))
		for _, p := range result.Prompts {
			names = append(names, p.Name)
		}
		assert.Contains(t, names, pa)
		assert.Contains(t, names, pb)
	})

	t.Run("get prompt from svc-a succeeds", func(t *testing.T) {
		result, err := c.GetPrompt(context.Background(), mcp.GetPromptRequest{
			Params: mcp.GetPromptParams{Name: pa},
		})
		require.NoError(t, err)
		require.NotEmpty(t, result.Messages)
	})

	t.Run("get prompt from svc-b succeeds", func(t *testing.T) {
		result, err := c.GetPrompt(context.Background(), mcp.GetPromptRequest{
			Params: mcp.GetPromptParams{Name: pb},
		})
		require.NoError(t, err)
		require.NotEmpty(t, result.Messages)
	})
}

func TestE2E_EnterpriseMode_McpProxy_StripsInboundHeadersForUpstreamCalls(t *testing.T) {
	env := setupE2EServer(t, model.ModeEnterprise)

	upstream := mcpserver.NewMCPServer("header-check", "0.1.0")
	upstream.AddTool(
		mcp.NewTool("echo", mcp.WithString("message", mcp.Required())),
		func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
			msg, _ := req.GetArguments()["message"].(string)
			return mcp.NewToolResultText(msg), nil
		},
	)
	upstream.AddPrompt(
		mcp.Prompt{Name: "simple-prompt"},
		func(ctx context.Context, req mcp.GetPromptRequest) (*mcp.GetPromptResult, error) {
			return &mcp.GetPromptResult{
				Messages: []mcp.PromptMessage{
					mcp.NewPromptMessage(mcp.RoleAssistant, mcp.TextContent{Type: "text", Text: "prompt ok"}),
				},
			}, nil
		},
	)
	upstream.AddResource(
		mcp.Resource{URI: "resource://header-check/status", Name: "status", MIMEType: "text/plain"},
		func(ctx context.Context, req mcp.ReadResourceRequest) ([]mcp.ResourceContents, error) {
			return []mcp.ResourceContents{
				mcp.TextResourceContents{
					URI:      req.Params.URI,
					MIMEType: "text/plain",
					Text:     "resource ok",
				},
			}, nil
		},
	)

	upstreamHTTP := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("Authorization") != "" || r.Header.Get("X-Test-Forward") != "" {
			http.Error(w, "downstream headers leaked upstream", http.StatusUnauthorized)
			return
		}
		mcpserver.NewStreamableHTTPServer(upstream).ServeHTTP(w, r)
	}))
	defer upstreamHTTP.Close()

	resp := env.do(t, http.MethodPost, "/api/v0/servers", map[string]any{
		"name":        "header-proxy",
		"description": "Header scrub regression server",
		"transport":   "streamable_http",
		"url":         upstreamHTTP.URL,
	}, env.adminToken)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)

	qEcho := tenant.QualifyProxyName(tenant.DefaultID, "header-proxy__echo")
	qPrompt := tenant.QualifyProxyName(tenant.DefaultID, "header-proxy__simple-prompt")
	c, err := client.NewStreamableHttpClient(env.baseURL+"/mcp", transport.WithHTTPHeaders(map[string]string{
		"X-API-Key":        e2eGlobalMCPAPIKey,
		"X-Test-Forward": "downstream-custom-header",
	}))
	require.NoError(t, err)
	defer c.Close()
	_, err = c.Initialize(context.Background(), mcp.InitializeRequest{
		Params: mcp.InitializeParams{
			ProtocolVersion: mcp.LATEST_PROTOCOL_VERSION,
			ClientInfo: mcp.Implementation{
				Name:    "e2e-header-test-client",
				Version: "1.0.0",
			},
		},
	})
	require.NoError(t, err)

	toolRes, err := c.CallTool(context.Background(), mcp.CallToolRequest{
		Params: mcp.CallToolParams{
			Name:      qEcho,
			Arguments: map[string]any{"message": "tool ok"},
		},
	})
	require.NoError(t, err)
	require.False(t, toolRes.IsError)

	promptRes, err := c.GetPrompt(context.Background(), mcp.GetPromptRequest{
		Params: mcp.GetPromptParams{Name: qPrompt},
	})
	require.NoError(t, err)
	require.NotEmpty(t, promptRes.Messages)

	resourceURI := "mcpj://res/header-proxy/" + base64.RawStdEncoding.EncodeToString([]byte("resource://header-check/status"))
	resourceRes, err := c.ReadResource(context.Background(), mcp.ReadResourceRequest{
		Params: mcp.ReadResourceParams{URI: resourceURI},
	})
	require.NoError(t, err)
	require.NotEmpty(t, resourceRes.Contents)
}
