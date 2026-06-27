package api

import (
	"context"
	"testing"

	"github.com/mark3labs/mcp-go/server"
	"sami.io/mcpgateway/internal/model"
	configSvc "sami.io/mcpgateway/internal/service/config"
	"sami.io/mcpgateway/internal/service/agentapp"
	"sami.io/mcpgateway/internal/service/dashboard"
	mcpSvc "sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/promptgroup"
	"sami.io/mcpgateway/internal/service/toolgroup"
	userSvc "sami.io/mcpgateway/internal/service/user"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
	"gorm.io/gorm"
)

func newBootstrapTestServer(t *testing.T) (*Server, *gorm.DB) {
	t.Helper()

	db := testhelpers.CreateTestDB(t)

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

	apiServer, err := NewServer(&ServerOptions{
		MCPProxyServer:     mcpProxy,
		SseMcpProxyServer:  sseMcpProxy,
		MCPService:         mcpService,
		AgentAppService:    agentapp.New(db, "unit-test-agent-app-jwt-signing-key-secret-minimum-length"),
		GlobalMCPAPIKey:    "unit-test-global-mcp-api-key",
		ConfigService:      configSvc.NewServerConfigService(db),
		DashboardService:   dashboard.NewService(db, false),
		UserService:        userSvc.NewUserService(db),
		ToolGroupService:   mustNewToolGroupService(t, db, mcpService),
		PromptGroupService: mustNewPromptGroupService(t, db, mcpService),
		Metrics:            telemetry.NewNoopCustomMetrics(),
	})
	testhelpers.AssertNoError(t, err)
	return apiServer, db
}

func TestBootstrapServerIfUninitialized_DevMode(t *testing.T) {
	apiServer, _ := newBootstrapTestServer(t)
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)

	created, err := apiServer.BootstrapServerIfUninitialized(ctx, model.ModeDev)
	testhelpers.AssertNoError(t, err)
	if !created {
		t.Fatal("expected first bootstrap to create config")
	}

	ok, err := apiServer.IsInitialized()
	testhelpers.AssertNoError(t, err)
	if !ok {
		t.Fatal("expected server to be initialized")
	}

	created, err = apiServer.BootstrapServerIfUninitialized(ctx, model.ModeDev)
	testhelpers.AssertNoError(t, err)
	if created {
		t.Fatal("expected second bootstrap to be idempotent")
	}
}

func TestBootstrapServerIfUninitialized_EnterpriseMode(t *testing.T) {
	apiServer, _ := newBootstrapTestServer(t)
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)

	created, err := apiServer.BootstrapServerIfUninitialized(ctx, model.ModeEnterprise)
	testhelpers.AssertNoError(t, err)
	if !created {
		t.Fatal("expected first bootstrap to create config")
	}

	ok, err := apiServer.IsInitialized()
	testhelpers.AssertNoError(t, err)
	if !ok {
		t.Fatal("expected server to be initialized")
	}

	created, err = apiServer.BootstrapServerIfUninitialized(ctx, model.ModeEnterprise)
	testhelpers.AssertNoError(t, err)
	if created {
		t.Fatal("expected second bootstrap to be idempotent")
	}
}

func TestBootstrapServerIfUninitialized_ExistingUninitializedRow(t *testing.T) {
	apiServer, db := newBootstrapTestServer(t)
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)

	err := db.Create(&model.ServerConfig{
		TenantID:    tenant.DefaultID,
		Mode:        model.ModeDev,
		Initialized: false,
	}).Error
	testhelpers.AssertNoError(t, err)

	created, err := apiServer.BootstrapServerIfUninitialized(ctx, model.ModeEnterprise)
	testhelpers.AssertNoError(t, err)
	if !created {
		t.Fatal("expected bootstrap to update uninitialized row")
	}

	mode, err := apiServer.GetMode()
	testhelpers.AssertNoError(t, err)
	if mode != model.ModeEnterprise {
		t.Fatalf("expected enterprise mode, got %v", mode)
	}
}
