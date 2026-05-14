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
