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
