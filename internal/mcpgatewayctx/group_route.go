// Package mcpgatewayctx carries request-scoped metadata from HTTP MCP handlers into MCP proxy handlers.
package mcpgatewayctx

import (
	"context"
)

type routeCtxKey int

const (
	keyToolGroupRoute routeCtxKey = iota + 1
	keyPromptGroupRoute
	keyOpenGroupMCP
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

// WithOpenGroupMCP marks the request as using an MCP tool- or prompt-group route with security_option=open.
func WithOpenGroupMCP(ctx context.Context, open bool) context.Context {
	return context.WithValue(ctx, keyOpenGroupMCP, open)
}

// OpenGroupMCP reports whether the group route allows unauthenticated MCP access (enterprise).
func OpenGroupMCP(ctx context.Context) bool {
	v, ok := ctx.Value(keyOpenGroupMCP).(bool)
	return ok && v
}
