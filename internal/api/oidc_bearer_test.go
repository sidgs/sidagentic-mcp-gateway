package api

import (
	"context"
	"crypto/rand"
	"crypto/rsa"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/stretchr/testify/require"
)

func signTestBearerIDToken(
	t *testing.T,
	priv *rsa.PrivateKey,
	iss, aud, kid string,
	extra map[string]any,
) string {
	t.Helper()
	now := time.Now()
	claims := jwt.MapClaims{
		"sub": "bearer-test-subject",
		"iss": iss,
		"aud": aud,
		"iat": float64(now.Unix()),
		"exp": float64(now.Add(time.Hour).Unix()),
	}
	for k, v := range extra {
		claims[k] = v
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	tok.Header["kid"] = kid
	signed, err := tok.SignedString(priv)
	require.NoError(t, err)
	return signed
}

func startMockOIDCIssuer(t *testing.T, kid string, pub *rsa.PublicKey) string {
	t.Helper()
	var issuerBase string
	mux := http.NewServeMux()
	mux.HandleFunc("/.well-known/openid-configuration", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		require.NoError(t, json.NewEncoder(w).Encode(map[string]string{
			"issuer":                 issuerBase,
			"authorization_endpoint": issuerBase + "/oauth2/authorize",
			"token_endpoint":         issuerBase + "/oauth2/token",
			"jwks_uri":               issuerBase + "/jwks",
		}))
	})
	mux.HandleFunc("/jwks", func(w http.ResponseWriter, r *http.Request) {
		key := rsaJWKForTests(pub, kid)
		w.Header().Set("Content-Type", "application/json")
		require.NoError(t, json.NewEncoder(w).Encode(map[string]any{"keys": []any{key}}))
	})
	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)
	issuerBase = srv.URL
	return issuerBase
}

func newOIDCTestServer(t *testing.T) (*Server, *rsa.PrivateKey, string, string) {
	t.Helper()
	const (
		clientID = "embed-test-client"
		kid      = "embed-test-kid"
	)
	priv, err := rsa.GenerateKey(rand.Reader, 2048)
	require.NoError(t, err)
	pub, ok := priv.Public().(*rsa.PublicKey)
	require.True(t, ok)
	issuer := startMockOIDCIssuer(t, kid, pub)
	s := &Server{
		httpPathPrefix:    "/pfx",
		oidcSessionStore:  newMemoryOIDCSessionStore(),
		oidcSessionMaxTTL: 24 * time.Hour,
		oidcSettings: &OIDCSettings{
			IssuerURL:    issuer,
			ClientID:     clientID,
			ClientSecret: "secret",
		},
	}
	_, err = s.oidcLazyProvider(context.Background())
	require.NoError(t, err)
	return s, priv, issuer, clientID
}

func TestRequireOIDCSessionIfEnabled_AcceptsBearerJWT(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s, priv, issuer, clientID := newOIDCTestServer(t)
	token := signTestBearerIDToken(t, priv, issuer, clientID, "embed-test-kid", map[string]any{
		"email":     "embed@example.com",
		"tenant_id": "acme",
	})

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/pfx/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set("X-Tenant-ID", "acme")
	c.Request.Header.Set("Accept", "application/json")

	s.requireOIDCSessionIfEnabled()(c)
	require.False(t, c.IsAborted())
}

func TestRequireOIDCSessionIfEnabled_RejectsBearerTenantMismatch(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s, priv, issuer, clientID := newOIDCTestServer(t)
	token := signTestBearerIDToken(t, priv, issuer, clientID, "embed-test-kid", map[string]any{
		"tenant_id": "acme",
	})

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/pfx/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set("X-Tenant-ID", "other")
	c.Request.Header.Set("Accept", "application/json")

	s.requireOIDCSessionIfEnabled()(c)
	require.True(t, c.IsAborted())
	require.Equal(t, http.StatusUnauthorized, w.Code)
}

func TestRequireOIDCSessionIfEnabled_RejectsInvalidBearerJWT(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s, _, _, _ := newOIDCTestServer(t)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/pfx/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer not-a-valid-jwt")
	c.Request.Header.Set("Accept", "application/json")

	s.requireOIDCSessionIfEnabled()(c)
	require.True(t, c.IsAborted())
	require.Equal(t, http.StatusUnauthorized, w.Code)
}

func TestDashboardAuthStatus_AcceptsBearerJWT(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s, priv, issuer, clientID := newOIDCTestServer(t)
	token := signTestBearerIDToken(t, priv, issuer, clientID, "embed-test-kid", map[string]any{
		"email": "embed@example.com",
		"sub":   "embed-subject",
	})

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/pfx/dashboard/auth-status", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)

	s.dashboardAuthStatusHandler()(c)
	require.Equal(t, http.StatusOK, w.Code)
	var got map[string]any
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &got))
	require.Equal(t, true, got["authenticated"])
	require.Equal(t, true, got["oidc_enabled"])
	require.Equal(t, "embed@example.com", got["email"])
	require.Equal(t, "embed-subject", got["sub"])
}

func TestParseDashboardEmbedAllowedOrigins(t *testing.T) {
	require.Nil(t, parseDashboardEmbedAllowedOrigins(""))
	require.Equal(t, []string{"https://a.example.com"}, parseDashboardEmbedAllowedOrigins("https://a.example.com"))
	require.Equal(t,
		[]string{"https://a.example.com", "http://localhost:5173"},
		parseDashboardEmbedAllowedOrigins(" https://a.example.com , http://localhost:5173 "),
	)
}

func TestDashboardEmbedCORS_AllowsPreflight(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{dashboardEmbedAllowedOrigins: []string{"https://apps.example.com"}}

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodOptions, "/dashboard/overview", nil)
	c.Request.Header.Set("Origin", "https://apps.example.com")
	c.Request.Header.Set("Access-Control-Request-Method", "GET")

	s.dashboardEmbedCORS()(c)
	require.True(t, c.IsAborted())
	require.Equal(t, http.StatusNoContent, w.Code)
	require.Equal(t, "https://apps.example.com", w.Header().Get("Access-Control-Allow-Origin"))
	require.Equal(t, dashboardEmbedAllowedHeaders, w.Header().Get("Access-Control-Allow-Headers"))
}

func TestDashboardEmbedCORS_RejectsUnknownOriginPreflight(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{dashboardEmbedAllowedOrigins: []string{"https://apps.example.com"}}

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodOptions, "/dashboard/overview", nil)
	c.Request.Header.Set("Origin", "https://evil.example.com")

	s.dashboardEmbedCORS()(c)
	require.True(t, c.IsAborted())
	require.Equal(t, http.StatusForbidden, w.Code)
}
