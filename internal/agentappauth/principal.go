// Package agentappauth holds MCP authorization context for tenant agent-apps (portal credentials).
package agentappauth

import (
	"context"
)

type ctxKey int

const keyAgentApp ctxKey = 1

// Principal is resolved after Bearer JWT verification + DB status check,
// or Basic auth credential verification + DB load.
type Principal struct {
	AgentAppID uint
	// ToolGroups and PromptGroups are the current attachment sets from the database.
	ToolGroups    []string
	PromptGroups  []string
	SkillSets     []string
}

// WithPrincipal attaches an agent-app principal to ctx for MCP proxy handlers.
func WithPrincipal(ctx context.Context, p *Principal) context.Context {
	return context.WithValue(ctx, keyAgentApp, p)
}

// PrincipalFromContext returns the agent-app principal when present.
func PrincipalFromContext(ctx context.Context) (*Principal, bool) {
	v, ok := ctx.Value(keyAgentApp).(*Principal)
	return v, ok && v != nil
}

func containsString(list []string, want string) bool {
	for _, s := range list {
		if s == want {
			return true
		}
	}
	return false
}

// AllowsToolGroup reports whether the principal may access the named tool group route.
func (p *Principal) AllowsToolGroup(name string) bool {
	return containsString(p.ToolGroups, name)
}

// AllowsPromptGroup reports whether the principal may access the named prompt group route.
func (p *Principal) AllowsPromptGroup(name string) bool {
	return containsString(p.PromptGroups, name)
}

// AllowsSkillSet reports whether the principal may access the named skill set route.
func (p *Principal) AllowsSkillSet(name string) bool {
	return containsString(p.SkillSets, name)
}
