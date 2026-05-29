package api

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mark3labs/mcp-go/server"
	"sami.io/mcpgateway/internal/migrations"
	"sami.io/mcpgateway/internal/model"
	configSvc "sami.io/mcpgateway/internal/service/config"
	"sami.io/mcpgateway/internal/service/agentapp"
	"sami.io/mcpgateway/internal/service/dashboard"
	mcpSvc "sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/promptgroup"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/tenant"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestDashboardDiagnosticsHandler_ReturnsDiagnostics(t *testing.T) {
	gin.SetMode(gin.TestMode)

	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, migrations.Migrate(db))

	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	cfg := configSvc.NewServerConfigService(db)
	_, err = cfg.Init(ctx, model.ModeEnterprise)
	require.NoError(t, err)

	mcpProxy := server.NewMCPServer("t", "0.0.1",
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcpSvc.ProxyToolFilter),
	)
	sseProxy := server.NewMCPServer("t-sse", "0.0.1",
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcpSvc.ProxyToolFilter),
	)
	mcpService, err := mcpSvc.NewMCPService(&mcpSvc.ServiceConfig{
		DB:                      db,
		McpProxyServer:          mcpProxy,
		SseMcpProxyServer:       sseProxy,
		Metrics:                 telemetry.NewNoopCustomMetrics(),
		McpServerInitReqTimeout: 30,
	})
	require.NoError(t, err)

	tgSvc, err := toolgroup.NewToolGroupService(db, mcpService)
	require.NoError(t, err)
	pgSvc, err := promptgroup.NewPromptGroupService(db, mcpService)
	require.NoError(t, err)

	apiServer, err := NewServer(&ServerOptions{
		MCPProxyServer:     mcpProxy,
		SseMcpProxyServer:  sseProxy,
		MCPService:         mcpService,
		GlobalMCPAPIKey:    "diag-enterprise-global-mcp-key",
		AgentAppService:    agentapp.New(db, ""),
		ConfigService:      cfg,
		DashboardService:   dashboard.NewService(db, false),
		ToolGroupService:   tgSvc,
		PromptGroupService: pgSvc,
		Metrics:            telemetry.NewNoopCustomMetrics(),
		DefaultTenantID:    tenant.DefaultID,
	})
	require.NoError(t, err)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	req := httptest.NewRequest(http.MethodGet, "/dashboard/diagnostics", nil)
	req.Host = "127.0.0.1:8080"
	req = req.WithContext(tenant.WithContext(req.Context(), tenant.DefaultID))
	c.Request = req
	c.Set("mode", model.ModeEnterprise)

	apiServer.dashboardDiagnosticsHandler()(c)

	require.Equal(t, 200, w.Code)
	var payload map[string]any
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &payload))
	require.Equal(t, "enterprise", payload["mode"])
	_, has := payload["admin_access_token_masked"]
	require.False(t, has)
}
