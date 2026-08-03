package dashboard

import (
	"context"
	"testing"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
	"github.com/stretchr/testify/require"
)

func TestServers_TenantIsolation(t *testing.T) {
	db := testhelpers.CreateTestDB(t)

	require.NoError(t, db.Create(&model.McpServer{
		Name: "tenant-a-server", Transport: "stdio", Enabled: true, TenantID: "tenant-a",
	}).Error)
	require.NoError(t, db.Create(&model.McpServer{
		Name: "tenant-b-server", Transport: "stdio", Enabled: true, TenantID: "tenant-b",
	}).Error)

	svc := NewService(db, false)

	respA, err := svc.Servers(tenant.WithContext(context.Background(), "tenant-a"))
	require.NoError(t, err)
	require.Len(t, respA.Servers, 1)
	require.Equal(t, "tenant-a-server", respA.Servers[0].Name)

	respB, err := svc.Servers(tenant.WithContext(context.Background(), "tenant-b"))
	require.NoError(t, err)
	require.Len(t, respB.Servers, 1)
	require.Equal(t, "tenant-b-server", respB.Servers[0].Name)

	overviewA, err := svc.Overview(tenant.WithContext(context.Background(), "tenant-a"), model.ModeEnterprise, "https://example.com/tenant-a")
	require.NoError(t, err)
	require.Equal(t, 1, overviewA.ServerCount)

	overviewB, err := svc.Overview(tenant.WithContext(context.Background(), "tenant-b"), model.ModeEnterprise, "https://example.com/tenant-b")
	require.NoError(t, err)
	require.Equal(t, 1, overviewB.ServerCount)
}

func TestServers_WithToolCounts(t *testing.T) {
	db := testhelpers.CreateTestDB(t)

	server := model.McpServer{Name: "srv-a", Transport: "stdio", Enabled: true, TenantID: "tenant-a"}
	require.NoError(t, db.Create(&server).Error)
	require.NoError(t, db.Create(&model.Tool{
		Name: "tool-a", Enabled: true, TenantID: "tenant-a", ServerID: server.ID,
	}).Error)
	require.NoError(t, db.Create(&model.Tool{
		Name: "tool-b", Enabled: false, TenantID: "tenant-a", ServerID: server.ID,
	}).Error)

	svc := NewService(db, false)
	resp, err := svc.Servers(tenant.WithContext(context.Background(), "tenant-a"))
	require.NoError(t, err)
	require.Len(t, resp.Servers, 1)
	require.Equal(t, 2, resp.Servers[0].ToolCount)
}

func TestTools_TenantIsolation(t *testing.T) {
	db := testhelpers.CreateTestDB(t)

	serverA := model.McpServer{Name: "srv-a", Transport: "stdio", Enabled: true, TenantID: "tenant-a"}
	serverB := model.McpServer{Name: "srv-b", Transport: "stdio", Enabled: true, TenantID: "tenant-b"}
	require.NoError(t, db.Create(&serverA).Error)
	require.NoError(t, db.Create(&serverB).Error)
	require.NoError(t, db.Create(&model.Tool{
		Name: "tool-a", Enabled: true, TenantID: "tenant-a", ServerID: serverA.ID,
	}).Error)
	require.NoError(t, db.Create(&model.Tool{
		Name: "tool-b", Enabled: true, TenantID: "tenant-b", ServerID: serverB.ID,
	}).Error)

	svc := NewService(db, false)

	respA, err := svc.Tools(tenant.WithContext(context.Background(), "tenant-a"))
	require.NoError(t, err)
	require.Len(t, respA.Tools, 1)
	require.Equal(t, "tool-a", respA.Tools[0].Name)

	respB, err := svc.Tools(tenant.WithContext(context.Background(), "tenant-b"))
	require.NoError(t, err)
	require.Len(t, respB.Tools, 1)
	require.Equal(t, "tool-b", respB.Tools[0].Name)
}
