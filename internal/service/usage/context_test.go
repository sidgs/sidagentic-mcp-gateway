package usage

import (
	"context"
	"testing"

	"sami.io/mcpgateway/internal/agentappauth"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/mcpgatewayctx"
	"sami.io/mcpgateway/pkg/tenant"
	"github.com/stretchr/testify/require"
)

func TestMetadataFromContext_AgentAppAndToolGroup(t *testing.T) {
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	ctx = mcpgatewayctx.WithToolGroupRoute(ctx, "ops-tools")
	ctx = agentappauth.WithPrincipal(ctx, &agentappauth.Principal{
		AgentAppID: 42,
		ToolGroups: []string{"ops-tools"},
	})

	meta := MetadataFromContext(ctx)
	require.Equal(t, tenant.DefaultID, meta.TenantID)
	require.NotNil(t, meta.AgentAppID)
	require.Equal(t, uint(42), *meta.AgentAppID)
	require.Equal(t, "ops-tools", meta.ToolGroupName)
	require.Equal(t, model.ToolInvocationAuthAgentApp, meta.AuthKind)
}

func TestMetadataFromContext_GlobalAPIKey(t *testing.T) {
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	ctx = mcpgatewayctx.WithGlobalMCPAPIKeyAuth(ctx, true)

	meta := MetadataFromContext(ctx)
	require.Equal(t, model.ToolInvocationAuthAPIKey, meta.AuthKind)
}
