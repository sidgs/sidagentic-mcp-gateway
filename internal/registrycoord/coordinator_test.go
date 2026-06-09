package registrycoord_test

import (
	"context"
	"testing"

	"github.com/mark3labs/mcp-go/server"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/registrycoord"
	"sami.io/mcpgateway/internal/registrysync"
	"sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/datatypes"
)

func TestCoordinatorSkipsSameOrigin(t *testing.T) {
	db, err := testhelpers.CreateTestDB()
	if err != nil {
		t.Fatalf("db: %v", err)
	}
	if err := db.AutoMigrate(&model.McpServer{}, &model.Tool{}, &model.ToolGroup{}); err != nil {
		t.Fatalf("migrate: %v", err)
	}

	proxy := server.NewMCPServer("p", "0", server.WithToolCapabilities(true))
	sse := server.NewMCPServer("s", "0", server.WithToolCapabilities(true))
	mcpService, err := mcp.NewMCPService(&mcp.ServiceConfig{
		DB: db, McpProxyServer: proxy, SseMcpProxyServer: sse,
		Metrics: telemetry.NewNoopCustomMetrics(),
	})
	if err != nil {
		t.Fatalf("mcp: %v", err)
	}

	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	srv := &model.McpServer{
		TenantID: tenant.DefaultID, Name: "srv", Transport: types.TransportStdio,
		Enabled: true, Config: datatypes.JSON(`{"command":"echo"}`),
	}
	if err := db.Create(srv).Error; err != nil {
		t.Fatalf("server: %v", err)
	}
	if err := db.Create(&model.Tool{
		TenantID: tenant.DefaultID, ServerID: srv.ID, Name: "t", Enabled: true,
		InputSchema: datatypes.JSON(`{"type":"object"}`),
	}).Error; err != nil {
		t.Fatalf("tool: %v", err)
	}
	if err := mcpService.ReloadServerCatalogFromDB(ctx, tenant.DefaultID, "srv"); err != nil {
		t.Fatalf("reload: %v", err)
	}

	tg, err := toolgroup.NewToolGroupService(db, mcpService)
	if err != nil {
		t.Fatalf("toolgroup: %v", err)
	}
	if err := tg.CreateToolGroup(ctx, &model.ToolGroup{
		TenantID: tenant.DefaultID, Name: "g1",
		IncludedServers: datatypes.JSON(`["srv"]`),
	}); err != nil {
		t.Fatalf("create: %v", err)
	}

	coord := registrycoord.NewCoordinator("pod-a", tg, nil, mcpService, nil)
	coord.Handle(ctx, registrysync.ToolGroupDelete(tenant.DefaultID, "g1", "pod-a"))

	if _, ok := tg.GetToolGroupMCPServer(tenant.DefaultID, "g1"); !ok {
		t.Fatal("same-origin delete event should be skipped; group server should remain")
	}
}
