package api

import "testing"

func TestNormalizeHTTPPathPrefix(t *testing.T) {
	t.Parallel()
	tests := []struct {
		in, want string
	}{
		{"", ""},
		{"   ", ""},
		{"/ai/v1/sami-mcp-gateway", "/ai/v1/sami-mcp-gateway"},
		{"ai/v1/sami-mcp-gateway/", "/ai/v1/sami-mcp-gateway"},
		{"/foo//bar/", "/foo//bar"},
	}
	for _, tt := range tests {
		got := NormalizeHTTPPathPrefix(tt.in)
		if got != tt.want {
			t.Errorf("NormalizeHTTPPathPrefix(%q) = %q; want %q", tt.in, got, tt.want)
		}
	}
}

func TestOIDCUIRootRelativePath(t *testing.T) {
	t.Parallel()
	tests := []struct {
		prefix, suffix, want string
	}{
		{"", "login", "/login"},
		{"", "logout", "/logout"},
		{"/ai/v1/sami-mcp-gateway", "login", "/ai/v1/sami-mcp-gateway/login"},
		{"ai/v1/gw/", "logout", "/ai/v1/gw/logout"},
	}
	for _, tt := range tests {
		got := OIDCUIRootRelativePath(tt.prefix, tt.suffix)
		if got != tt.want {
			t.Errorf("OIDCUIRootRelativePath(%q, %q) = %q; want %q", tt.prefix, tt.suffix, got, tt.want)
		}
	}
}
