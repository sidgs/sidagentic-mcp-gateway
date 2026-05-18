// Package e2e contains end-to-end integration tests for MCPJungle against
// @modelcontextprotocol/server-everything.
//
// Tests spin up a full MCPJungle HTTP server backed by an in-memory SQLite
// database, register server-everything as a stdio upstream, then exercise every
// major API surface:
//   - Global tools: list, get, invoke
//   - Global prompts: list, get, render (simple and complex)
//   - Tool groups: CRUD, effective-tools, included-servers, excluded-tools
//   - Tool/prompt operations scoped to a tool group
//   - Dev mode vs Enterprise mode (auth, permissions, enterprise-only endpoints)
//   - MCP proxy: enterprise global API key + agent-app credentials for group routes
package e2e_test

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net"
	"net/http"
	"os/exec"
	"testing"

	"github.com/mark3labs/mcp-go/client"
	"github.com/mark3labs/mcp-go/client/transport"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/api"
	"github.com/mcpjungle/mcpjungle/internal/migrations"
	"github.com/mcpjungle/mcpjungle/internal/model"
	configSvc "github.com/mcpjungle/mcpjungle/internal/service/config"
	"github.com/mcpjungle/mcpjungle/internal/service/agentapp"
	"github.com/mcpjungle/mcpjungle/internal/service/dashboard"
	mcpSvc "github.com/mcpjungle/mcpjungle/internal/service/mcp"
	"github.com/mcpjungle/mcpjungle/internal/service/promptgroup"
	"github.com/mcpjungle/mcpjungle/internal/service/toolgroup"
	userSvc "github.com/mcpjungle/mcpjungle/internal/service/user"
	"github.com/mcpjungle/mcpjungle/internal/telemetry"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// e2eGlobalMCPAPIKey must match GlobalMCPAPIKey passed to the API server in enterprise e2e tests.
const e2eGlobalMCPAPIKey = "e2e-global-mcp-api-key-secret"

// -----------------------------------------------------------------------
// Shared response types
// -----------------------------------------------------------------------

// toolInvokeResult is the JSON response from POST /api/v0/tools/invoke.
type toolInvokeResult struct {
	Content []struct {
		Type string `json:"type"`
		Text string `json:"text"`
	} `json:"content"`
}

// renderedPromptResult is the JSON response from POST /api/v0/prompts/render.
type renderedPromptResult struct {
	Messages []struct {
		Role    string `json:"role"`
		Content struct {
			Type string `json:"type"`
			Text string `json:"text"`
		} `json:"content"`
	} `json:"messages"`
}

// -----------------------------------------------------------------------
// Test environment
// -----------------------------------------------------------------------

// e2eEnv holds a running MCPJungle httptest server and associated tokens.
type e2eEnv struct {
	baseURL         string
	adminToken      string // populated only in enterprise mode
	userToken       string // populated only in enterprise mode (regular user)
	globalMCPAPIKey string // enterprise global MCP key (empty in dev)
	db              *gorm.DB
}

// do makes an HTTP request against the test server and returns the raw response.
// The caller is responsible for closing resp.Body (decodeJSON does it automatically).
func (e *e2eEnv) do(t *testing.T, method, path string, body any, token string) *http.Response {
	t.Helper()
	var reqBody io.Reader
	if body != nil {
		b, err := json.Marshal(body)
		require.NoError(t, err)
		reqBody = bytes.NewReader(b)
	}
	req, err := http.NewRequest(method, e.baseURL+path, reqBody)
	require.NoError(t, err)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	resp, err := http.DefaultClient.Do(req)
	require.NoError(t, err)
	return resp
}

// drain closes an HTTP response body without reading it.
func drain(r *http.Response) { r.Body.Close() }

// decodeJSON decodes the JSON response body into target.
func decodeJSON(t *testing.T, r *http.Response, target any) {
	t.Helper()
	require.NoError(t, json.NewDecoder(r.Body).Decode(target))
}

// setupE2EServer spins up a full MCPJungle HTTP server backed by an in-memory
// SQLite DB, initialised in the requested mode.
// HTTP routes are at the host root (HTTP_PATH_PREFIX is unset). To test a
// prefixed deployment, set HTTP_PATH_PREFIX before start and use baseURL+prefix in requests.
// In enterprise mode, env.adminToken and env.userToken are set.
// The server is shut down via t.Cleanup.
func setupE2EServer(t *testing.T, mode model.ServerMode) *e2eEnv {
	t.Helper()
	if _, err := exec.LookPath("npx"); err != nil {
		t.Skip("npx not found in PATH – skipping server-everything end-to-end tests")
	}

	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, migrations.Migrate(db))

	mcpProxy := server.NewMCPServer("MCPJungle", "0.0.1",
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcpSvc.ProxyToolFilter),
	)
	sseMcpProxy := server.NewMCPServer("MCPJungle SSE", "0.0.1",
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcpSvc.ProxyToolFilter),
	)

	mcpService, err := mcpSvc.NewMCPService(&mcpSvc.ServiceConfig{
		DB:                      db,
		McpProxyServer:          mcpProxy,
		SseMcpProxyServer:       sseMcpProxy,
		Metrics:                 telemetry.NewNoopCustomMetrics(),
		McpServerInitReqTimeout: 30,
	})
	require.NoError(t, err)

	cfgSvc := configSvc.NewServerConfigService(db)
	usrSvc := userSvc.NewUserService(db)
	tgSvc, err := toolgroup.NewToolGroupService(db, mcpService)
	require.NoError(t, err)
	pgSvc, err := promptgroup.NewPromptGroupService(db, mcpService)
	require.NoError(t, err)

	globalKey := ""
	if mode == model.ModeEnterprise {
		globalKey = e2eGlobalMCPAPIKey
	}

	apiServer, err := api.NewServer(&api.ServerOptions{
		MCPProxyServer:     mcpProxy,
		SseMcpProxyServer:  sseMcpProxy,
		MCPService:         mcpService,
		GlobalMCPAPIKey:    globalKey,
		AgentAppService:    agentapp.New(db, "e2e-agent-app-jwt-signing-key-secret-min-len!!"),
		ConfigService:      cfgSvc,
		DashboardService:   dashboard.NewService(db, false),
		UserService:        usrSvc,
		ToolGroupService:   tgSvc,
		PromptGroupService: pgSvc,
		Metrics:            telemetry.NewNoopCustomMetrics(),
	})
	require.NoError(t, err)

	env := &e2eEnv{}

	switch mode {
	case model.ModeDev:
		require.NoError(t, apiServer.InitDev())
	case model.ModeEnterprise:
		env.globalMCPAPIKey = e2eGlobalMCPAPIKey
		_, err = cfgSvc.Init(context.Background(), model.ModeEnterprise)
		require.NoError(t, err)
		adminUser, err := usrSvc.CreateAdminUser(context.Background())
		require.NoError(t, err)
		env.adminToken = adminUser.AccessToken
		regularUser, err := usrSvc.CreateUser(context.Background(), &model.User{Username: "regularuser"})
		require.NoError(t, err)
		env.userToken = regularUser.AccessToken
	default:
		t.Fatalf("unsupported server mode: %s", mode)
	}

	listener, err := net.Listen("tcp4", "127.0.0.1:0")
	require.NoError(t, err)

	httpServer := &http.Server{Handler: apiServer.Router()}
	go func() {
		_ = httpServer.Serve(listener)
	}()
	t.Cleanup(func() {
		_ = httpServer.Close()
	})
	env.baseURL = "http://" + listener.Addr().String()
	env.db = db

	return env
}

// registerEverythingServer registers @modelcontextprotocol/server-everything
// as a stdio upstream named "everything" via the REST API.
func registerEverythingServer(t *testing.T, env *e2eEnv, token string) {
	t.Helper()
	registerEverythingServerAs(t, env, "everything", token)
}

// registerEverythingServerAs registers @modelcontextprotocol/server-everything
// under a custom name, allowing multiple instances with different names.
func registerEverythingServerAs(t *testing.T, env *e2eEnv, name string, token string) {
	t.Helper()
	body := map[string]any{
		"name":        name,
		"description": "MCP server-everything integration test server",
		"transport":   "stdio",
		"command":     "npx",
		"args":        []string{"-y", "@modelcontextprotocol/server-everything", "stdio"},
	}
	resp := env.do(t, http.MethodPost, "/api/v0/servers", body, token)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode, "register server-everything as %q", name)
}

// toolNames extracts the "name" field from a slice of JSON objects.
func toolNames(tools []map[string]any) []string {
	names := make([]string, 0, len(tools))
	for _, tl := range tools {
		if n, ok := tl["name"].(string); ok {
			names = append(names, n)
		}
	}
	return names
}

// promptNames extracts the "name" field from a slice of JSON prompt objects.
func promptNames(prompts []map[string]any) []string {
	names := make([]string, 0, len(prompts))
	for _, p := range prompts {
		if n, ok := p["name"].(string); ok {
			names = append(names, n)
		}
	}
	return names
}

// newMCPProxyClient creates an initialized StreamableHTTP MCP client on the global /mcp endpoint.
func newMCPProxyClient(t *testing.T, env *e2eEnv) *client.Client {
	t.Helper()
	opts := []transport.StreamableHTTPCOption{}
	if env.globalMCPAPIKey != "" {
		opts = append(opts, transport.WithHTTPHeaders(map[string]string{
			"X-API-Key": env.globalMCPAPIKey,
		}))
	}
	c, err := client.NewStreamableHttpClient(env.baseURL+"/mcp", opts...)
	require.NoError(t, err)
	_, err = c.Initialize(context.Background(), mcp.InitializeRequest{
		Params: mcp.InitializeParams{
			ProtocolVersion: mcp.LATEST_PROTOCOL_VERSION,
			ClientInfo: mcp.Implementation{
				Name:    "e2e-test-client",
				Version: "1.0.0",
			},
		},
	})
	require.NoError(t, err)
	return c
}

// newGroupMCPClient creates an initialized StreamableHTTP MCP client that
// connects directly to a tool group's own MCP endpoint at /v0/groups/:name/mcp.
// This endpoint exposes ONLY the tools registered for that group.
func newGroupMCPClient(t *testing.T, env *e2eEnv, groupName string, token string) *client.Client {
	t.Helper()
	opts := []transport.StreamableHTTPCOption{}
	if token != "" {
		opts = append(opts, transport.WithHTTPHeaders(map[string]string{
			"Authorization": "Bearer " + token,
		}))
	}
	c, err := client.NewStreamableHttpClient(
		env.baseURL+"/v0/groups/"+groupName+"/mcp",
		opts...,
	)
	require.NoError(t, err)
	_, err = c.Initialize(context.Background(), mcp.InitializeRequest{
		Params: mcp.InitializeParams{
			ProtocolVersion: mcp.LATEST_PROTOCOL_VERSION,
			ClientInfo: mcp.Implementation{
				Name:    "e2e-test-client",
				Version: "1.0.0",
			},
		},
	})
	require.NoError(t, err)
	return c
}
