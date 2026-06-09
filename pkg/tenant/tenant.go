// Package tenant carries per-request tenant identity for multi-tenant APIs.
package tenant

import (
	"context"
	"fmt"
	"regexp"
	"strings"

	"sami.io/mcpgateway/pkg/apierrors"
)

type contextKey struct{}

const (
	// HeaderName is the HTTP header clients send to select a tenant.
	HeaderName = "X-Tenant-ID"

	// GinKey is the gin.Context key used to store the resolved tenant id (string).
	GinKey = "tenant_id"

	// DefaultID is used when DEFAULT_TENANT_ID is unset or empty.
	DefaultID = "sami"

	// ProxyNameSep separates tenant id from the canonical tool name in the MCP proxy.
	ProxyNameSep = "__"
)

var validTenantID = regexp.MustCompile(`^[a-zA-Z0-9_-]+$`)

// Validate checks tenant id syntax. It must not contain ProxyNameSep.
func Validate(id string) error {
	if id == "" {
		return fmt.Errorf("tenant id must not be empty: %w", apierrors.ErrInvalidInput)
	}
	if strings.Contains(id, ProxyNameSep) {
		return fmt.Errorf("tenant id must not contain %q: %w", ProxyNameSep, apierrors.ErrInvalidInput)
	}
	if !validTenantID.MatchString(id) {
		return fmt.Errorf("tenant id must match %s: %w", validTenantID, apierrors.ErrInvalidInput)
	}
	return nil
}

// PresentID returns a trimmed, validated tenant id when one is present.
func PresentID(id string) (string, bool) {
	id = strings.TrimSpace(id)
	if id == "" {
		return "", false
	}
	if err := Validate(id); err != nil {
		return "", false
	}
	return id, true
}

// WithContext returns a context that carries tenantID for downstream DB and services.
func WithContext(ctx context.Context, tenantID string) context.Context {
	return context.WithValue(ctx, contextKey{}, tenantID)
}

// FromContext returns the tenant id if present.
func FromContext(ctx context.Context) (string, bool) {
	v := ctx.Value(contextKey{})
	s, ok := v.(string)
	return s, ok && s != ""
}

// MustFromContext returns the tenant id or DefaultID if missing.
func MustFromContext(ctx context.Context) string {
	s, ok := FromContext(ctx)
	if ok {
		return s
	}
	return DefaultID
}

// QualifyProxyName prefixes the canonical MCP name (e.g. server__tool) only when tenantID is present.
func QualifyProxyName(tenantID, canonicalName string) string {
	id, ok := PresentID(tenantID)
	if !ok {
		return canonicalName
	}
	return id + ProxyNameSep + canonicalName
}

// SplitProxyToolName splits "tenant__server__tool" when an explicit tenant prefix is present.
// If there is no tenant prefix, qualified is false and rest is the full name (canonical form).
func SplitProxyToolName(full string) (tenantID, rest string, qualified bool) {
	idx := strings.Index(full, ProxyNameSep)
	if idx <= 0 {
		return "", full, false
	}
	candidate := full[:idx]
	id, ok := PresentID(candidate)
	if !ok {
		return "", full, false
	}
	remainder := full[idx+len(ProxyNameSep):]
	if remainder == "" || !strings.Contains(remainder, ProxyNameSep) {
		return "", full, false
	}
	return id, remainder, true
}

// SessionKey combines tenant and server name for session manager map keys.
func SessionKey(tenantID, serverName string) string {
	if id, ok := PresentID(tenantID); ok {
		return id + ProxyNameSep + serverName
	}
	return serverName
}

// ToolGroupMapKey combines tenant and tool group name for in-memory maps.
func ToolGroupMapKey(tenantID, groupName string) string {
	if id, ok := PresentID(tenantID); ok {
		return id + ProxyNameSep + groupName
	}
	return groupName
}

// PromptGroupMapKey combines tenant and prompt group name so caches stay distinct from tool groups with the same display name.
func PromptGroupMapKey(tenantID, groupName string) string {
	if id, ok := PresentID(tenantID); ok {
		return "pg" + ProxyNameSep + id + ProxyNameSep + groupName
	}
	return "pg" + ProxyNameSep + groupName
}
