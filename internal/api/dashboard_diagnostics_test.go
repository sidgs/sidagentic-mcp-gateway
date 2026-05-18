package api

import (
	"context"
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mark3labs/mcp-go/server"
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
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestMaskBearerToken(t *testing.T) {
	require.Equal(t, "", maskBearerToken(""))
	require.Equal(t, "", maskBearerToken("   "))
	require.Equal(t, "••••••••", maskBearerToken("short"))
	require.Equal(t, "••••••••", maskBearerToken("12345678"))
	require.Equal(t, "1234…9012", maskBearerToken("123456789012"))
}

func TestDashboardDiagnosticsHandler_EnterpriseMasksAdminToken(t *testing.T) {
	gin.SetMode(gin.TestMode)

	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, migrations.Migrate(db))

	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	cfg := configSvc.NewServerConfigService(db)
	_, err = cfg.Init(ctx, model.ModeEnterprise)
	require.NoError(t, err)
	usr := userSvc.NewUserService(db)
	admin, err := usr.CreateAdminUser(ctx)
	require.NoError(t, err)
	fullToken := admin.AccessToken
	require.Greater(t, len(fullToken), 8)

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
		UserService:        usr,
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
	require.NotContains(t, w.Body.String(), fullToken)

	var payload struct {
		AdminAccessTokenMasked string `json:"admin_access_token_masked"`
	}
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &payload))
	require.Equal(t, maskBearerToken(fullToken), payload.AdminAccessTokenMasked)
}

func TestDashboardDiagnosticsHandler_DevOmitsMaskEvenIfAdminExists(t *testing.T) {
	gin.SetMode(gin.TestMode)

	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, migrations.Migrate(db))

	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	cfg := configSvc.NewServerConfigService(db)
	_, err = cfg.Init(ctx, model.ModeDev)
	require.NoError(t, err)
	usr := userSvc.NewUserService(db)
	_, err = usr.CreateAdminUser(ctx)
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
		GlobalMCPAPIKey:    "",
		AgentAppService:    agentapp.New(db, ""),
		ConfigService:      cfg,
		UserService:        usr,
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
	c.Set("mode", model.ModeDev)

	apiServer.dashboardDiagnosticsHandler()(c)

	require.Equal(t, 200, w.Code)
	var payload map[string]any
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &payload))
	_, has := payload["admin_access_token_masked"]
	require.False(t, has)
}
