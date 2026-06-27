package api

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mark3labs/mcp-go/server"
	"sami.io/mcpgateway/internal/model"
	configSvc "sami.io/mcpgateway/internal/service/config"
	"sami.io/mcpgateway/internal/service/agentapp"
	"sami.io/mcpgateway/internal/service/dashboard"
	mcpSvc "sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/promptgroup"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
	"github.com/stretchr/testify/require"
)

func TestDashboardObservabilityHandler_ReturnsAggregates(t *testing.T) {
	gin.SetMode(gin.TestMode)

	db := testhelpers.CreateTestDB(t)

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

	require.NoError(t, db.Create(&model.ToolInvocationEvent{
		CreatedOn:     time.Now().UTC(),
		TenantID:      tenant.DefaultID,
		MCPServerName: "calc",
		ToolName:      "add",
		Outcome:       model.ToolInvocationOutcomeSuccess,
		LatencyMs:     42,
		Source:        model.ToolInvocationSourceMCPProxy,
		AuthKind:      model.ToolInvocationAuthOpen,
	}).Error)

	apiServer, err := NewServer(&ServerOptions{
		MCPProxyServer:     mcpProxy,
		SseMcpProxyServer:  sseProxy,
		MCPService:         mcpService,
		GlobalMCPAPIKey:    "obs-enterprise-global-mcp-key",
		AgentAppService:    agentapp.New(db, ""),
		ConfigService:      cfg,
		DashboardService:   dashboard.NewService(db, true),
		ToolGroupService:   tgSvc,
		PromptGroupService: pgSvc,
		Metrics:            telemetry.NewNoopCustomMetrics(),
		DefaultTenantID:    tenant.DefaultID,
	})
	require.NoError(t, err)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	req := httptest.NewRequest(http.MethodGet, "/dashboard/observability?range=24h&limit=5", nil)
	req.Host = "127.0.0.1:8080"
	req = req.WithContext(tenant.WithContext(req.Context(), tenant.DefaultID))
	c.Request = req
	c.Set("mode", model.ModeEnterprise)

	apiServer.dashboardObservabilityHandler()(c)

	require.Equal(t, 200, w.Code)
	var payload map[string]any
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &payload))
	summary := payload["summary"].(map[string]any)
	require.Equal(t, float64(1), summary["total_calls"])
}
