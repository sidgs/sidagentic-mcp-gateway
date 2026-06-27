package dashboard

import (
	"testing"
	"time"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/testhelpers"
	"github.com/stretchr/testify/require"
	"gorm.io/gorm"
)

func TestObservability_AggregatesEvents(t *testing.T) {
	db := testhelpers.CreateTestDB(t)

	now := time.Now().UTC()
	agentID := uint(7)
	events := []model.ToolInvocationEvent{
		{
			CreatedOn: now.Add(-2 * time.Hour), TenantID: "sami", AgentAppID: &agentID,
			ToolGroupName: "ops", MCPServerName: "calc", ToolName: "add",
			Outcome: model.ToolInvocationOutcomeSuccess, LatencyMs: 100,
			Source: model.ToolInvocationSourceMCPProxy, AuthKind: model.ToolInvocationAuthAgentApp,
		},
		{
			CreatedOn: now.Add(-90 * time.Minute), TenantID: "sami", AgentAppID: &agentID,
			ToolGroupName: "ops", MCPServerName: "calc", ToolName: "add",
			Outcome: model.ToolInvocationOutcomeError, LatencyMs: 200,
			Source: model.ToolInvocationSourceMCPProxy, AuthKind: model.ToolInvocationAuthAgentApp,
		},
		{
			CreatedOn: now.Add(-30 * time.Minute), TenantID: "sami",
			ToolGroupName: "ops", MCPServerName: "git", ToolName: "status",
			Outcome: model.ToolInvocationOutcomeSuccess, LatencyMs: 50,
			Source: model.ToolInvocationSourceRESTInvoke, AuthKind: model.ToolInvocationAuthAPIKey,
		},
	}
	require.NoError(t, db.Create(&events).Error)
	require.NoError(t, db.Create(&model.AgentApp{
		BaseModel: model.BaseModel{ID: agentID}, TenantID: "sami", OwnerScopeKey: "scope",
		Name: "Ops Agent", ClientID: "ops-client", SecretHash: "hash", Status: model.AgentAppStatusEnabled,
	}).Error)

	svc := NewService(db, true)
	resp, err := svc.Observability("24h", "", "", 10)
	require.NoError(t, err)
	require.Equal(t, int64(3), resp.Summary.TotalCalls)
	require.Equal(t, int64(2), resp.Summary.SuccessCalls)
	require.Equal(t, int64(1), resp.Summary.ErrorCalls)
	require.Equal(t, 1, resp.Summary.ActiveAgents)
	require.Equal(t, 2, resp.Summary.ActiveTools)
	require.Equal(t, 1, resp.Summary.ActiveToolSets)
	require.Len(t, resp.ByAgent, 2)
	require.Equal(t, int64(2), resp.ByAgent[0].TotalCalls)
	require.Len(t, resp.TopTools, 2)
	require.Equal(t, "calc", resp.TopTools[0].MCPServerName)
	require.Len(t, resp.TopToolGroups, 1)
	require.Equal(t, "ops", resp.TopToolGroups[0].ToolGroupName)
	require.NotEmpty(t, resp.CallVolumeSeries)
}

func TestObservability_EmptyRangeReturnsEmptyState(t *testing.T) {
	db := testhelpers.CreateTestDB(t)

	svc := NewService(db, true)
	resp, err := svc.Observability("24h", "", "", 10)
	require.NoError(t, err)
	require.NotNil(t, resp.EmptyState)
	require.Equal(t, int64(0), resp.Summary.TotalCalls)
}
