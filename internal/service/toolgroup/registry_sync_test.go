package toolgroup

import (
	"context"
	"testing"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/datatypes"
)

func TestReloadFromDBRebuildsToolGroupProxy(t *testing.T) {
	db := setupInMemoryDB(t)
	mcpService := newTestMCPService(t, db)
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
		t.Fatalf("reload server catalog: %v", err)
	}

	group := &model.ToolGroup{
		TenantID:        tenant.DefaultID,
		Name:            "grp",
		IncludedServers: datatypes.JSON(`["upstream"]`),
	}
	if err := db.Create(group).Error; err != nil {
		t.Fatalf("create group: %v", err)
	}

	tg, err := NewToolGroupService(db, mcpService)
	if err != nil {
		t.Fatalf("tool group service: %v", err)
	}

	tg.RemoveFromMemory(tenant.DefaultID, "grp")
	if _, ok := tg.GetToolGroupMCPServer(tenant.DefaultID, "grp"); ok {
		t.Fatal("expected group MCP server removed")
	}

	if err := tg.ReloadFromDB(ctx, tenant.DefaultID, "grp"); err != nil {
		t.Fatalf("reload from db: %v", err)
	}
	if _, ok := tg.GetToolGroupMCPServer(tenant.DefaultID, "grp"); !ok {
		t.Fatal("expected group MCP server after reload")
	}
}

func TestRemoveFromMemoryDeletesMissingGroup(t *testing.T) {
	db := setupInMemoryDB(t)
	mcpService := newTestMCPService(t, db)
	tg, err := NewToolGroupService(db, mcpService)
	if err != nil {
		t.Fatalf("tool group service: %v", err)
	}
	tg.RemoveFromMemory(tenant.DefaultID, "missing")
}

func TestReloadGroupsForServerReloadsOnlyReferencedGroups(t *testing.T) {
	db := setupInMemoryDB(t)
	mcpService := newTestMCPService(t, db)
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
		t.Fatalf("reload server catalog: %v", err)
	}

	referenced := &model.ToolGroup{
		TenantID:        tenant.DefaultID,
		Name:            "referenced",
		IncludedServers: datatypes.JSON(`["upstream"]`),
	}
	unrelated := &model.ToolGroup{
		TenantID:      tenant.DefaultID,
		Name:          "unrelated",
		IncludedTools: datatypes.JSON(`["other__echo"]`),
	}
	for _, group := range []*model.ToolGroup{referenced, unrelated} {
		if err := db.Create(group).Error; err != nil {
			t.Fatalf("create group: %v", err)
		}
	}

	tg, err := NewToolGroupService(db, mcpService)
	if err != nil {
		t.Fatalf("tool group service: %v", err)
	}

	tg.RemoveFromMemory(tenant.DefaultID, "referenced")
	tg.RemoveFromMemory(tenant.DefaultID, "unrelated")

	reloaded, err := tg.ReloadGroupsForServer(ctx, tenant.DefaultID, "upstream")
	if err != nil {
		t.Fatalf("reload groups for server: %v", err)
	}
	if len(reloaded) != 1 || reloaded[0] != "referenced" {
		t.Fatalf("reloaded groups = %#v, want [referenced]", reloaded)
	}
	if _, ok := tg.GetToolGroupMCPServer(tenant.DefaultID, "referenced"); !ok {
		t.Fatal("expected referenced group MCP server after reload")
	}
	if _, ok := tg.GetToolGroupMCPServer(tenant.DefaultID, "unrelated"); ok {
		t.Fatal("expected unrelated group MCP server to remain absent")
	}
}
