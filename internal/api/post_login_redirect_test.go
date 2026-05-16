package api

import (
	"strings"
	"testing"
)

func TestNormalizePostLoginRedirectURL(t *testing.T) {
	t.Parallel()

	t.Run("https absolute", func(t *testing.T) {
		got, err := normalizePostLoginRedirectURL("https://dash.example/foo?x=1#h")
		if err != nil {
			t.Fatal(err)
		}
		if got != "https://dash.example/foo?x=1#h" {
			t.Fatalf("got %q", got)
		}
	})

	t.Run("relative path", func(t *testing.T) {
		got, err := normalizePostLoginRedirectURL("/api/v1/gw/")
		if err != nil || got != "/api/v1/gw/" {
			t.Fatalf("got %q err %v", got, err)
		}
	})

	t.Run("reject javascript", func(t *testing.T) {
		_, err := normalizePostLoginRedirectURL("javascript:alert(1)")
		if err == nil {
			t.Fatal("expected error")
		}
	})

	t.Run("reject protocol-relative", func(t *testing.T) {
		_, err := normalizePostLoginRedirectURL("//evil.example/")
		if err == nil || !strings.Contains(err.Error(), "//") {
			t.Fatalf("expected error mentioning //, got %v", err)
		}
	})

	t.Run("reject bare path segment", func(t *testing.T) {
		_, err := normalizePostLoginRedirectURL("dashboard/")
		if err == nil {
			t.Fatal("expected error")
		}
	})

	t.Run("reject empty input", func(t *testing.T) {
		_, err := normalizePostLoginRedirectURL("")
		if err == nil {
			t.Fatal("expected error")
		}
	})
}

func TestEffectivePostLoginRedirect(t *testing.T) {
	t.Parallel()

	t.Run("custom URL", func(t *testing.T) {
		s := &Server{httpPathPrefix: "/pfx", postLoginRedirectURL: "https://another.host/app/"}
		if s.effectivePostLoginRedirect() != "https://another.host/app/" {
			t.Fatalf("got %q", s.effectivePostLoginRedirect())
		}
	})

	t.Run("default with prefix", func(t *testing.T) {
		s := &Server{httpPathPrefix: "/pfx"}
		if s.effectivePostLoginRedirect() != "/pfx/" {
			t.Fatalf("got %q", s.effectivePostLoginRedirect())
		}
	})

	t.Run("default root", func(t *testing.T) {
		s := &Server{}
		if s.effectivePostLoginRedirect() != "/" {
			t.Fatalf("got %q", s.effectivePostLoginRedirect())
		}
	})
}
