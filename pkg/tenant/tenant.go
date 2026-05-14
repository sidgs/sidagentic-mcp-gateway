// Package tenant carries per-request tenant identity for multi-tenant APIs.
package tenant

import (
	"context"
	"fmt"
	"regexp"
	"strings"

	"github.com/mcpjungle/mcpjungle/pkg/apierrors"
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
	ProxyNameSep = "::"
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

// QualifyProxyName prefixes the canonical MCP name (e.g. server__tool) for the global proxy registry.
func QualifyProxyName(tenantID, canonicalName string) string {
	return tenantID + ProxyNameSep + canonicalName
}

// SplitProxyToolName splits "tenant::server__tool". If there is no tenant prefix, qualified is false
// and rest is the full name (legacy canonical form).
func SplitProxyToolName(full string) (tenantID, rest string, qualified bool) {
	if !strings.Contains(full, ProxyNameSep) {
		return "", full, false
	}
	tenantID, rest, ok := strings.Cut(full, ProxyNameSep)
	if !ok || tenantID == "" {
		return "", full, false
	}
	return tenantID, rest, true
}

// SessionKey combines tenant and server name for session manager map keys.
func SessionKey(tenantID, serverName string) string {
	return tenantID + ProxyNameSep + serverName
}

// ToolGroupMapKey combines tenant and tool group name for in-memory maps.
func ToolGroupMapKey(tenantID, groupName string) string {
	return tenantID + ProxyNameSep + groupName
}
