package usage

import (
	"context"

	"sami.io/mcpgateway/internal/agentappauth"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/mcpgatewayctx"
	"sami.io/mcpgateway/pkg/tenant"
)

// RequestMetadata captures attribution for a tool invocation from request context.
type RequestMetadata struct {
	TenantID      string
	AgentAppID    *uint
	ToolGroupName string
	AuthKind      string
}

// MetadataFromContext extracts observability attribution from an MCP or REST request context.
func MetadataFromContext(ctx context.Context) RequestMetadata {
	meta := RequestMetadata{AuthKind: model.ToolInvocationAuthUnknown}

	if id, ok := tenant.FromContext(ctx); ok {
		meta.TenantID = id
	} else {
		meta.TenantID = tenant.MustFromContext(ctx)
	}

	if principal, ok := agentappauth.PrincipalFromContext(ctx); ok && principal.AgentAppID > 0 {
		id := principal.AgentAppID
		meta.AgentAppID = &id
		meta.AuthKind = model.ToolInvocationAuthAgentApp
	}

	if tg, ok := mcpgatewayctx.ToolGroupRoute(ctx); ok {
		meta.ToolGroupName = tg
	}

	if meta.AuthKind != model.ToolInvocationAuthUnknown {
		return meta
	}

	switch {
	case mcpgatewayctx.GlobalMCPAPIKeyAuth(ctx):
		meta.AuthKind = model.ToolInvocationAuthAPIKey
	case mcpgatewayctx.OpenGroupMCP(ctx):
		meta.AuthKind = model.ToolInvocationAuthOpen
	}

	return meta
}
