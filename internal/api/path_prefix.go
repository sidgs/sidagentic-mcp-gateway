package api

import "strings"

// NormalizeHTTPPathPrefix trims space, ensures a leading '/', and removes a trailing '/'.
// Empty input returns "" (no prefix — legacy root routing).
func NormalizeHTTPPathPrefix(p string) string {
	p = strings.TrimSpace(p)
	if p == "" {
		return ""
	}
	if !strings.HasPrefix(p, "/") {
		p = "/" + p
	}
	return strings.TrimRight(p, "/")
}

// OIDCUIRootRelativePath returns a root-relative path for OIDC routes under HTTPPathPrefix
// (e.g. "/login", "/pfx/login").
func OIDCUIRootRelativePath(httpPathPrefix, suffix string) string {
	pp := NormalizeHTTPPathPrefix(httpPathPrefix)
	suffix = strings.Trim(strings.TrimPrefix(strings.TrimSpace(suffix), "/"), "/")
	if suffix == "" {
		suffix = "login"
	}
	if pp == "" {
		return "/" + suffix
	}
	return pp + "/" + suffix
}
