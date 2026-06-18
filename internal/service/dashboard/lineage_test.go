package dashboard

import (
	"encoding/json"
	"testing"
	"time"

	"sami.io/mcpgateway/internal/migrations"
	"sami.io/mcpgateway/internal/model"
	"github.com/stretchr/testify/require"
	"gorm.io/datatypes"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func TestLineage_BuildsConfiguredAndUsageEdges(t *testing.T) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, migrations.Migrate(db))

	server := model.McpServer{Name: "calc", Transport: "stdio", Enabled: true, TenantID: "sami"}
	require.NoError(t, db.Create(&server).Error)
	require.NoError(t, db.Create(&model.Tool{
		Name: "add", Enabled: true, TenantID: "sami", ServerID: server.ID,
	}).Error)

	require.NoError(t, db.Create(&model.ToolGroup{
		TenantID: "sami", Name: "ops", SecurityOption: "basic",
		IncludedTools: datatypes.JSON(`["calc__add"]`),
	}).Error)

	agentID := uint(1)
	require.NoError(t, db.Create(&model.AgentApp{
		Model: gorm.Model{ID: agentID}, TenantID: "sami", OwnerScopeKey: "scope",
		Name: "Ops Agent", ClientID: "ops-client", SecretHash: "hash", Status: model.AgentAppStatusEnabled,
		ToolGroupNames: datatypes.JSON(`["ops"]`),
	}).Error)

	require.NoError(t, db.Create(&model.ToolInvocationEvent{
		CreatedAt: time.Now().UTC(), TenantID: "sami", AgentAppID: &agentID,
		ToolGroupName: "ops", MCPServerName: "calc", ToolName: "add",
		Outcome: model.ToolInvocationOutcomeSuccess, LatencyMs: 10,
		Source: model.ToolInvocationSourceMCPProxy, AuthKind: model.ToolInvocationAuthAgentApp,
	}).Error)

	svc := NewService(db, true)
	resp, err := svc.Lineage("24h")
	require.NoError(t, err)
	require.GreaterOrEqual(t, len(resp.Nodes), 4)
	require.NotEmpty(t, resp.Edges)

	kinds := map[string]int{}
	for _, node := range resp.Nodes {
		kinds[node.Kind]++
	}
	require.Equal(t, 1, kinds["agent_app"])
	require.Equal(t, 1, kinds["tool_group"])
	require.Equal(t, 1, kinds["server"])
	require.GreaterOrEqual(t, kinds["tool"], 1)

	raw, err := json.Marshal(resp)
	require.NoError(t, err)
	require.Contains(t, string(raw), "agent_app:1")
}
