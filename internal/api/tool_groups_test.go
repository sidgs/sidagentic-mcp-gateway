package api

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	mcpserver "github.com/mark3labs/mcp-go/server"
	mcpSvc "github.com/mcpjungle/mcpjungle/internal/service/mcp"
	"github.com/mcpjungle/mcpjungle/internal/service/toolgroup"
	"github.com/mcpjungle/mcpjungle/internal/telemetry"
	"github.com/mcpjungle/mcpjungle/pkg/testhelpers"
)

// setupToolGroupServer creates a Server with a real ToolGroupService backed by an in-memory DB.
func setupToolGroupServer(t *testing.T) *Server {
	t.Helper()
	setup := testhelpers.SetupTestDB(t)
	t.Cleanup(setup.Cleanup)

	mcpProxy := mcpserver.NewMCPServer("test", "0.0.1")
	sseMcpProxy := mcpserver.NewMCPServer("test-sse", "0.0.1")
	svc, err := mcpSvc.NewMCPService(&mcpSvc.ServiceConfig{
		DB:                      setup.DB,
		McpProxyServer:          mcpProxy,
		SseMcpProxyServer:       sseMcpProxy,
		Metrics:                 telemetry.NewNoopCustomMetrics(),
		McpServerInitReqTimeout: 5,
	})
	if err != nil {
		t.Fatalf("failed to create MCP service: %v", err)
	}

	tgSvc, err := toolgroup.NewToolGroupService(setup.DB, svc)
	if err != nil {
		t.Fatalf("failed to create tool group service: %v", err)
	}

	return &Server{toolGroupService: tgSvc}
}

func TestGetToolGroupHandler_NotFound(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := setupToolGroupServer(t)

	router := gin.New()
	router.GET("/groups/:name", s.getToolGroupHandler())

	req := httptest.NewRequest(http.MethodGet, "/groups/ghost-group", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	testhelpers.AssertEqual(t, http.StatusNotFound, w.Code)
	testhelpers.AssertStringContains(t, w.Body.String(), "not found")
}

func TestUpdateToolGroupHandler_NotFound(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := setupToolGroupServer(t)

	router := gin.New()
	router.PUT("/groups/:name", s.updateToolGroupHandler())

	req := httptest.NewRequest(http.MethodPut, "/groups/ghost-group",
		strings.NewReader(`{"name":"ghost-group","description":"updated"}`))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	testhelpers.AssertEqual(t, http.StatusNotFound, w.Code)
	testhelpers.AssertStringContains(t, w.Body.String(), "not found")
}

func TestGetToolGroupEndpoints_IncludesHTTPPathPrefix(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := setupToolGroupServer(t)
	s.httpPathPrefix = "/api/v1/sami-mcp-gateway"

	c, _ := gin.CreateTestContext(nil)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "apps.example.com"
	c.Request.Header.Set("X-Forwarded-Proto", "https")

	got := s.getToolGroupEndpoints(c, "my-group")

	wantMCP := "https://apps.example.com/api/v1/sami-mcp-gateway/v0/groups/my-group/mcp"
	wantSSE := "https://apps.example.com/api/v1/sami-mcp-gateway/v0/groups/my-group/sse"
	wantMsg := "https://apps.example.com/api/v1/sami-mcp-gateway/v0/groups/my-group/message"
	testhelpers.AssertEqual(t, wantMCP, got.StreamableHTTPEndpoint)
	testhelpers.AssertEqual(t, wantSSE, got.SSEEndpoint)
	testhelpers.AssertEqual(t, wantMsg, got.SSEMessageEndpoint)
}

func TestGetToolGroupEndpoints_NoHTTPPathPrefix(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := setupToolGroupServer(t)

	c, _ := gin.CreateTestContext(nil)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "localhost:8080"
	c.Request.TLS = nil
	c.Request.Header.Set("X-Forwarded-Proto", "") // http

	got := s.getToolGroupEndpoints(c, "g")

	testhelpers.AssertEqual(t, "http://localhost:8080/v0/groups/g/mcp", got.StreamableHTTPEndpoint)
	testhelpers.AssertEqual(t, "http://localhost:8080/v0/groups/g/sse", got.SSEEndpoint)
	testhelpers.AssertEqual(t, "http://localhost:8080/v0/groups/g/message", got.SSEMessageEndpoint)
}
