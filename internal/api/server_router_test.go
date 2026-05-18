package api

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/migrations"
	configSvc "github.com/mcpjungle/mcpjungle/internal/service/config"
	"github.com/mcpjungle/mcpjungle/internal/service/agentapp"
	"github.com/mcpjungle/mcpjungle/internal/service/dashboard"
	mcpSvc "github.com/mcpjungle/mcpjungle/internal/service/mcp"
	"github.com/mcpjungle/mcpjungle/internal/service/mcpclient"
	"github.com/mcpjungle/mcpjungle/internal/service/promptgroup"
	"github.com/mcpjungle/mcpjungle/internal/service/toolgroup"
	userSvc "github.com/mcpjungle/mcpjungle/internal/service/user"
	"github.com/mcpjungle/mcpjungle/internal/telemetry"
	"github.com/mcpjungle/mcpjungle/pkg/testhelpers"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func newTestAPIServer(t *testing.T, httpPathPrefix string, oidcCfg *OIDCSettings) *Server {
	t.Helper()
	gin.SetMode(gin.TestMode)

	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	testhelpers.AssertNoError(t, err)
	testhelpers.AssertNoError(t, migrations.Migrate(db))

	mcpProxy := server.NewMCPServer("test", "0.0.1",
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcpSvc.ProxyToolFilter),
	)
	sseMcpProxy := server.NewMCPServer("test-sse", "0.0.1",
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
	testhelpers.AssertNoError(t, err)

	cfgSvc := configSvc.NewServerConfigService(db)
	apiServer, err := NewServer(&ServerOptions{
		MCPProxyServer:    mcpProxy,
		SseMcpProxyServer: sseMcpProxy,
		MCPService:        mcpService,
		MCPClientService:  mcpclient.NewMCPClientService(db),
		AgentAppService:     agentapp.New(db, "unit-test-agent-app-jwt-signing-key-secret-minimum-length"),
		ConfigService:     cfgSvc,
		DashboardService:  dashboard.NewService(db, false),
		UserService:         userSvc.NewUserService(db),
		ToolGroupService:    mustNewToolGroupService(t, db, mcpService),
		PromptGroupService:  mustNewPromptGroupService(t, db, mcpService),
		Metrics:           telemetry.NewNoopCustomMetrics(),
		HTTPPathPrefix:    httpPathPrefix,
		OIDC:              oidcCfg,
	})
	testhelpers.AssertNoError(t, err)
	testhelpers.AssertNoError(t, apiServer.InitDev())
	return apiServer
}

func mustNewToolGroupService(t *testing.T, db *gorm.DB, mcpService *mcpSvc.MCPService) *toolgroup.ToolGroupService {
	t.Helper()
	svc, err := toolgroup.NewToolGroupService(db, mcpService)
	testhelpers.AssertNoError(t, err)
	return svc
}

func mustNewPromptGroupService(t *testing.T, db *gorm.DB, mcpService *mcpSvc.MCPService) *promptgroup.PromptGroupService {
	t.Helper()
	svc, err := promptgroup.NewPromptGroupService(db, mcpService)
	testhelpers.AssertNoError(t, err)
	return svc
}

func TestLoginRouteAbsentWhenOIDCDisabled(t *testing.T) {
	s := newTestAPIServer(t, "/pfx", nil)
	w := httptest.NewRecorder()
	req, err := http.NewRequest(http.MethodGet, "/pfx/login", nil)
	testhelpers.AssertNoError(t, err)
	s.Router().ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusNotFound, w.Code)
}

func TestHealthEndpointRespectsPathPrefix(t *testing.T) {
	tests := []struct {
		name      string
		prefix    string
		reqPath   string
		wantCode  int
	}{
		{"root", "", "/health", http.StatusOK},
		{"prefixed", "/ai/v1/sami-mcp-gateway", "/ai/v1/sami-mcp-gateway/health", http.StatusOK},
		{"prefixed_wrong", "/ai/v1/sami-mcp-gateway", "/health", http.StatusNotFound},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := newTestAPIServer(t, tt.prefix, nil)
			w := httptest.NewRecorder()
			req, err := http.NewRequest(http.MethodGet, tt.reqPath, nil)
			testhelpers.AssertNoError(t, err)
			s.Router().ServeHTTP(w, req)
			testhelpers.AssertEqual(t, tt.wantCode, w.Code)
		})
	}
}
