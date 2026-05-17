package api

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
)

func TestNormalizeOAuth2AuthorizeRedirectURI(t *testing.T) {
	t.Parallel()

	t.Run("empty", func(t *testing.T) {
		got, err := normalizeOAuth2AuthorizeRedirectURI("")
		require.NoError(t, err)
		require.Equal(t, "", got)

		got, err = normalizeOAuth2AuthorizeRedirectURI("  \t  ")
		require.NoError(t, err)
		require.Equal(t, "", got)
	})

	t.Run("https OK", func(t *testing.T) {
		got, err := normalizeOAuth2AuthorizeRedirectURI("https://apps.example.com/api/v1/gw/auth/callback")
		require.NoError(t, err)
		require.Equal(t, "https://apps.example.com/api/v1/gw/auth/callback", got)
	})

	t.Run("http OK", func(t *testing.T) {
		got, err := normalizeOAuth2AuthorizeRedirectURI("http://localhost:8080/auth/callback")
		require.NoError(t, err)
		require.Equal(t, "http://localhost:8080/auth/callback", got)
	})

	t.Run("reject missing scheme", func(t *testing.T) {
		_, err := normalizeOAuth2AuthorizeRedirectURI("apps.example.com/cb")
		require.Error(t, err)
		require.Contains(t, strings.ToLower(err.Error()), "scheme")
	})

	t.Run("reject javascript", func(t *testing.T) {
		_, err := normalizeOAuth2AuthorizeRedirectURI("javascript:alert(1)")
		require.Error(t, err)
	})
}

func TestOAuthRedirectURL_StaticOverride(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{
		cognitoOAuthRedirectURI: "https://apps.example.com/prefix/auth/callback",
		httpPathPrefix:          "/prefix",
	}

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "http://internal/wrong/path", nil)

	require.Equal(t, "https://apps.example.com/prefix/auth/callback", s.oauthRedirectURL(c))
}

func TestOAuthRedirectURL_DerivedFromRequest(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/pfx"}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/pfx/login", nil)
	c.Request.Host = "app.dev"
	c.Request.Header.Set("X-Forwarded-Proto", "https")

	require.Equal(t, "https://app.dev/pfx/auth/callback", s.oauthRedirectURL(c))
}

func TestNormalizePublicURLScheme(t *testing.T) {
	t.Parallel()

	got, err := normalizePublicURLScheme("")
	require.NoError(t, err)
	require.Equal(t, "", got)

	got, err = normalizePublicURLScheme("HTTPS")
	require.NoError(t, err)
	require.Equal(t, "https", got)

	_, err = normalizePublicURLScheme("ftp")
	require.Error(t, err)
}

func TestPublicGatewayRoot_PublicURLSchemeForcesHTTPS(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/pfx", publicURLScheme: "https"}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "app.dev"
	c.Request.URL.Host = ""

	require.Equal(t, "https://app.dev/pfx", s.publicGatewayRoot(c))
	require.Equal(t, "https://app.dev/pfx/auth/callback", s.oauthRedirectURL(c))
	require.True(t, s.oauthCookieSecure(c))
}

func TestPublicGatewayRoot_PublicURLSchemeForcesHTTP(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "", publicURLScheme: "http"}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "localhost:8080"
	c.Request.Header.Set("X-Forwarded-Proto", "https")

	require.Equal(t, "http://localhost:8080", s.publicGatewayRoot(c))
	require.False(t, s.oauthCookieSecure(c))
}
