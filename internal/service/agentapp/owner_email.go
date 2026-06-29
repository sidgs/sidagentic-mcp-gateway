package agentapp

import (
	"context"
	"log"
	"strings"

	"sami.io/mcpgateway/internal/service/user"
)

func resolveOwnerEmail(ctx context.Context, userSvc *user.UserService, ownerScopeKey string) string {
	if userSvc == nil {
		return ""
	}
	ownerScopeKey = strings.TrimSpace(ownerScopeKey)
	if ownerScopeKey == "" || strings.HasPrefix(ownerScopeKey, "global:") || strings.HasPrefix(ownerScopeKey, "dev:") {
		return ""
	}
	var sub string
	switch {
	case strings.HasPrefix(ownerScopeKey, "oidc:"):
		sub = strings.TrimPrefix(ownerScopeKey, "oidc:")
	case strings.HasPrefix(ownerScopeKey, "ui:"):
		sub = strings.TrimPrefix(ownerScopeKey, "ui:")
	default:
		return ""
	}
	sub = strings.TrimSpace(sub)
	if sub == "" {
		return ""
	}
	u, err := userSvc.GetByOIDCSub(ctx, sub)
	if err != nil {
		log.Printf("[notifications] resolve owner email for %q: %v", ownerScopeKey, err)
		return ""
	}
	if u == nil {
		return ""
	}
	return strings.TrimSpace(u.Email)
}
