// Package mcpgatewayctx carries request-scoped metadata from HTTP MCP handlers into MCP proxy handlers.
package mcpgatewayctx

import (
	"context"
)

type routeCtxKey int

const (
	keyToolGroupRoute routeCtxKey = iota + 1
	keyPromptGroupRoute
	keyGlobalMCPAPIKeyAuth
)

// WithToolGroupRoute annotates the context with the tool group name served by the current MCP route.
func WithToolGroupRoute(ctx context.Context, groupName string) context.Context {
	return context.WithValue(ctx, keyToolGroupRoute, groupName)
}

// ToolGroupRoute returns the tool group name if the request was scoped to a tool group MCP endpoint.
func ToolGroupRoute(ctx context.Context) (string, bool) {
	v, ok := ctx.Value(keyToolGroupRoute).(string)
	return v, ok && v != ""
}

// WithPromptGroupRoute annotates the context with the prompt group name for prompt-group MCP routes.
func WithPromptGroupRoute(ctx context.Context, groupName string) context.Context {
	return context.WithValue(ctx, keyPromptGroupRoute, groupName)
}

// PromptGroupRoute returns the prompt group name if the request was scoped to a prompt group MCP endpoint.
func PromptGroupRoute(ctx context.Context) (string, bool) {
	v, ok := ctx.Value(keyPromptGroupRoute).(string)
	return v, ok && v != ""
}

// WithGlobalMCPAPIKeyAuth marks the request as authenticated to the global MCP proxy (/mcp, /sse) via GLOBAL_MCP_API_KEY.
func WithGlobalMCPAPIKeyAuth(ctx context.Context, ok bool) context.Context {
	return context.WithValue(ctx, keyGlobalMCPAPIKeyAuth, ok)
}

// GlobalMCPAPIKeyAuth reports whether the global MCP proxy request was authenticated with the configured global API key.
func GlobalMCPAPIKeyAuth(ctx context.Context) bool {
	v, ok := ctx.Value(keyGlobalMCPAPIKeyAuth).(bool)
	return ok && v
}
