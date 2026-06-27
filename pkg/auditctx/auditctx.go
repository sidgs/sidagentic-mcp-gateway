// Package auditctx carries the acting user identifier for audit field stamping.
package auditctx

import "context"

type contextKey struct{}

const SystemActor = "system"

// WithActor returns a context carrying the audit actor string (email, sub, or user:{id}).
func WithActor(ctx context.Context, actor string) context.Context {
	if actor == "" {
		actor = SystemActor
	}
	return context.WithValue(ctx, contextKey{}, actor)
}

// ActorFrom returns the audit actor from context, or SystemActor when absent.
func ActorFrom(ctx context.Context) string {
	if ctx == nil {
		return SystemActor
	}
	v, ok := ctx.Value(contextKey{}).(string)
	if !ok || v == "" {
		return SystemActor
	}
	return v
}
