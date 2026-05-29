package api

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v4"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/tenant"
	"github.com/stretchr/testify/require"
)

const testPlatformJWTSecret = "test-platform-jwt-secret-for-ui-auth"

func signTestPlatformJWT(t *testing.T, secret string, claims platformBearerClaims) string {
	t.Helper()
	if claims.RegisteredClaims.IssuedAt == nil {
		now := jwt.NewNumericDate(time.Now())
		claims.RegisteredClaims.IssuedAt = now
	}
	if claims.RegisteredClaims.ExpiresAt == nil {
		claims.RegisteredClaims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Hour))
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := tok.SignedString([]byte(secret))
	require.NoError(t, err)
	return signed
}

func newPlatformJWTTestServer(t *testing.T) *Server {
	t.Helper()
	s, _, _, _ := newOIDCTestServer(t)
	s.platformJWTSecret = testPlatformJWTSecret
	s.platformJWTAud = defaultPlatformJWTAud
	return s
}

func TestValidPlatformBearerFromRequest_AcceptsHS256(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, testPlatformJWTSecret, platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  "platform-user-1",
			Audience: jwt.ClaimStrings{defaultPlatformJWTAud},
		},
		Email:    "user@example.com",
		TenantID: "bian-demo",
	})

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")

	sess, ok := s.validPlatformBearerFromRequest(c)
	require.True(t, ok)
	require.Equal(t, "platform-user-1", sess.Sub)
	require.Equal(t, "user@example.com", sess.Email)
	require.Equal(t, dashboardAuthPlatformBearer, sess.Source)
}

func TestValidPlatformBearerFromRequest_RejectsWrongSecret(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, "wrong-secret", platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  "platform-user-1",
			Audience: jwt.ClaimStrings{defaultPlatformJWTAud},
		},
		TenantID: "bian-demo",
	})

	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")

	_, ok := s.validPlatformBearerFromRequest(c)
	require.False(t, ok)
}

func TestValidPlatformBearerFromRequest_RejectsExpired(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, testPlatformJWTSecret, platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   "platform-user-1",
			Audience:  jwt.ClaimStrings{defaultPlatformJWTAud},
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(-time.Hour)),
		},
		TenantID: "bian-demo",
	})

	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")

	_, ok := s.validPlatformBearerFromRequest(c)
	require.False(t, ok)
}

func TestValidPlatformBearerFromRequest_RejectsAlgNone(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	tok := jwt.NewWithClaims(jwt.SigningMethodNone, jwt.MapClaims{
		"sub":       "u",
		"aud":       defaultPlatformJWTAud,
		"tenant_id": "bian-demo",
		"exp":       float64(time.Now().Add(time.Hour).Unix()),
	})
	unsigned, err := tok.SignedString(jwt.UnsafeAllowNoneSignatureType)
	require.NoError(t, err)

	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+unsigned)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")

	_, ok := s.validPlatformBearerFromRequest(c)
	require.False(t, ok)
}

func TestValidPlatformBearerFromRequest_AcceptsAlgNoneWhenAllowed(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)
	s.platformJWTAllowUnsigned = true

	tok := jwt.NewWithClaims(jwt.SigningMethodNone, jwt.MapClaims{
		"sub":       "platform-user-1",
		"aud":       defaultPlatformJWTAud,
		"tenant_id": "sidgs-platform",
		"email":     "user@example.com",
		"exp":       float64(time.Now().Add(time.Hour).Unix()),
	})
	unsigned, err := tok.SignedString(jwt.UnsafeAllowNoneSignatureType)
	require.NoError(t, err)

	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+unsigned)
	c.Request.Header.Set(tenant.HeaderName, "sidgs-platform")

	sess, ok := s.validPlatformBearerFromRequest(c)
	require.True(t, ok)
	require.Equal(t, "platform-user-1", sess.Sub)
	require.Equal(t, "user@example.com", sess.Email)
}

func TestValidPlatformBearerFromRequest_RejectsTenantMismatch(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, testPlatformJWTSecret, platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  "platform-user-1",
			Audience: jwt.ClaimStrings{defaultPlatformJWTAud},
		},
		TenantID: "bian-demo",
	})

	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "other-tenant")

	_, ok := s.validPlatformBearerFromRequest(c)
	require.False(t, ok)
}

func TestValidPlatformBearerFromRequest_RejectsWrongAud(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, testPlatformJWTSecret, platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  "platform-user-1",
			Audience: jwt.ClaimStrings{"other-audience"},
		},
		TenantID: "bian-demo",
	})

	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")

	_, ok := s.validPlatformBearerFromRequest(c)
	require.False(t, ok)
}

func TestRequireOIDCSessionIfEnabled_AcceptsPlatformBearer(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, testPlatformJWTSecret, platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  "platform-user-1",
			Audience: jwt.ClaimStrings{defaultPlatformJWTAud},
		},
		TenantID: "bian-demo",
	})

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")
	c.Request.Header.Set("Accept", "application/json")

	s.requireOIDCSessionIfEnabled()(c)
	require.False(t, c.IsAborted())
}

func TestDashboardAuthStatus_AcceptsPlatformBearer(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, testPlatformJWTSecret, platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  "platform-user-1",
			Audience: jwt.ClaimStrings{defaultPlatformJWTAud},
		},
		Email:    "platform@example.com",
		TenantID: "bian-demo",
	})

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/auth-status", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")

	s.dashboardAuthStatusHandler()(c)
	require.Equal(t, http.StatusOK, w.Code)
	require.Contains(t, w.Body.String(), `"authenticated":true`)
	require.Contains(t, w.Body.String(), `"platform@example.com"`)
}

func TestAgentAppOwnerScopeFromDashboard_AcceptsPlatformBearer(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := newPlatformJWTTestServer(t)

	token := signTestPlatformJWT(t, testPlatformJWTSecret, platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:  "platform-user-42",
			Audience: jwt.ClaimStrings{defaultPlatformJWTAud},
		},
		TenantID: "bian-demo",
	})

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/agent-apps", nil)
	c.Request.Header.Set("Authorization", "Bearer "+token)
	c.Request.Header.Set(tenant.HeaderName, "bian-demo")
	c.Set("mode", model.ModeEnterprise)

	scope, err := agentAppOwnerScopeFromDashboard(s, c)
	require.NoError(t, err)
	require.Equal(t, "ui:platform-user-42", scope)
}

func TestValidDashboardUserFromRequest_PrefersCognitoOverPlatform(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s, priv, issuer, clientID := newOIDCTestServer(t)
	s.platformJWTSecret = testPlatformJWTSecret
	s.platformJWTAud = defaultPlatformJWTAud

	cognitoTok := signTestBearerIDToken(t, priv, issuer, clientID, "embed-test-kid", map[string]any{
		"email":     "cognito@example.com",
		"tenant_id": "acme",
	})

	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = httptest.NewRequest(http.MethodGet, "/dashboard/overview", nil)
	c.Request.Header.Set("Authorization", "Bearer "+cognitoTok)
	c.Request.Header.Set(tenant.HeaderName, "acme")

	sess, ok := s.validDashboardUserFromRequest(c)
	require.True(t, ok)
	require.Equal(t, dashboardAuthCognitoBearer, sess.Source)
	require.Equal(t, "cognito@example.com", sess.Email)
}
