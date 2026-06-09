package e2e_test

import (
	"context"
	"sync"
	"testing"
	"time"

	"github.com/alicebob/miniredis/v2"
	"github.com/mark3labs/mcp-go/server"
	"github.com/redis/go-redis/v9"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/registrycoord"
	"sami.io/mcpgateway/internal/registrysync"
	mcpSvc "sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/datatypes"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// TestRegistrySyncToolGroupCrossPod verifies a subscriber pod reloads tool groups after a Redis event.
func TestRegistrySyncToolGroupCrossPod(t *testing.T) {
	mr, err := miniredis.Run()
	if err != nil {
		t.Fatalf("miniredis: %v", err)
	}
	defer mr.Close()

	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		t.Fatalf("db: %v", err)
	}
	if err := db.AutoMigrate(&model.McpServer{}, &model.Tool{}, &model.ToolGroup{}); err != nil {
		t.Fatalf("migrate: %v", err)
	}

	mcpProxy := server.NewMCPServer("proxy", "0.0.1", server.WithToolCapabilities(true))
	sseProxy := server.NewMCPServer("sse", "0.0.1", server.WithToolCapabilities(true))
	mcpService, err := mcpSvc.NewMCPService(&mcpSvc.ServiceConfig{
		DB:                      db,
		McpProxyServer:          mcpProxy,
		SseMcpProxyServer:       sseProxy,
		Metrics:                 telemetry.NewNoopCustomMetrics(),
		McpServerInitReqTimeout: 10,
	})
	if err != nil {
		t.Fatalf("mcp service: %v", err)
	}

	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	srv := &model.McpServer{
		TenantID:  tenant.DefaultID,
		Name:      "upstream",
		Transport: types.TransportStdio,
		Enabled:   true,
		Config:    datatypes.JSON(`{"command":"echo"}`),
	}
	if err := db.Create(srv).Error; err != nil {
		t.Fatalf("create server: %v", err)
	}
	tool := &model.Tool{
		TenantID:    tenant.DefaultID,
		ServerID:    srv.ID,
		Name:        "echo",
		Enabled:     true,
		InputSchema: datatypes.JSON(`{"type":"object"}`),
	}
	if err := db.Create(tool).Error; err != nil {
		t.Fatalf("create tool: %v", err)
	}
	if err := mcpService.ReloadServerCatalogFromDB(ctx, tenant.DefaultID, "upstream"); err != nil {
		t.Fatalf("reload catalog: %v", err)
	}

	// Pod A: writer with tool group service and notifier.
	podA, err := toolgroup.NewToolGroupService(db, mcpService)
	if err != nil {
		t.Fatalf("tool group service: %v", err)
	}

	redisClient := redis.NewClient(&redis.Options{Addr: mr.Addr()})
	defer func() { _ = redisClient.Close() }()

	const channel = "e2e:registry:v1"
	podANotifier := registrysync.NewRedisNotifier(redisClient, channel, "pod-a")
	podA.SetRegistryNotifier(podANotifier)
	podA.SetOriginID("pod-a")

	// Pod B: subscriber with separate in-memory maps (fresh service instance).
	podB, err := toolgroup.NewToolGroupService(db, mcpService)
	if err != nil {
		t.Fatalf("tool group service b: %v", err)
	}
	podB.RemoveFromMemory(tenant.DefaultID, "grp")

	coordB := registrycoord.NewCoordinator("pod-b", podB, nil, mcpService, nil)

	var wg sync.WaitGroup
	wg.Add(1)
	subCtx, subCancel := context.WithCancel(context.Background())
	defer subCancel()

	go func() {
		defer wg.Done()
		_ = registrysync.Subscribe(subCtx, redisClient, channel, func(ev registrysync.Event) {
			coordB.Handle(subCtx, ev)
		})
	}()
	time.Sleep(50 * time.Millisecond)

	group := &model.ToolGroup{
		TenantID:        tenant.DefaultID,
		Name:            "grp",
		IncludedServers: datatypes.JSON(`["upstream"]`),
	}
	if err := podA.CreateToolGroup(ctx, group); err != nil {
		t.Fatalf("create tool group: %v", err)
	}

	deadline := time.Now().Add(2 * time.Second)
	for time.Now().Before(deadline) {
		if _, ok := podB.GetToolGroupMCPServer(tenant.DefaultID, "grp"); ok {
			subCancel()
			wg.Wait()
			return
		}
		time.Sleep(25 * time.Millisecond)
	}

	subCancel()
	wg.Wait()
	t.Fatal("pod B did not reload tool group from registry sync event")
}
