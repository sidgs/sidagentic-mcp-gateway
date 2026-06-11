package e2e_test

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/mark3labs/mcp-go/mcp"
	"sami.io/mcpgateway/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestE2E_DevMode_RestServer_ToolGroup(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)

	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/v1/ping" && r.Method == http.MethodGet {
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write([]byte(`{"pong":true}`))
			return
		}
		http.NotFound(w, r)
	}))
	defer upstream.Close()

	spec := `openapi: 3.0.3
info:
  title: Ping API
  version: 1.0.0
paths:
  /v1/ping:
    get:
      operationId: ping
      summary: Use when connectivity to the ping service must be verified
      responses:
        "200":
          description: ok
`

	resp := env.do(t, http.MethodPost, "/api/v0/servers", map[string]any{
		"name":         "pingapi",
		"server_kind":  "rest_openapi",
		"transport":    "rest",
		"base_url":     upstream.URL,
		"openapi_spec": spec,
		"rest_auth":    map[string]any{"type": "none"},
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)

	groupResp := env.do(t, http.MethodPost, "/api/v0/tool-groups", map[string]any{
		"name":              "ping-group",
		"security_option":   "open",
		"included_servers":  []string{"pingapi"},
	}, env.globalMCPAPIKey)
	require.Equal(t, http.StatusCreated, groupResp.StatusCode)
	drain(groupResp)

	c := newGroupMCPClient(t, env, "ping-group", "")
	listResult, err := c.ListTools(context.Background(), mcp.ListToolsRequest{})
	require.NoError(t, err)
	require.Len(t, listResult.Tools, 1)
	assert.Equal(t, "pingapi__ping", listResult.Tools[0].Name)
	assert.NotEmpty(t, listResult.Tools[0].Description)

	callResult, err := c.CallTool(context.Background(), mcp.CallToolRequest{
		Params: mcp.CallToolParams{
			Name: "pingapi__ping",
		},
	})
	require.NoError(t, err)
	require.NotNil(t, callResult)
	require.NotEmpty(t, callResult.Content)
}
