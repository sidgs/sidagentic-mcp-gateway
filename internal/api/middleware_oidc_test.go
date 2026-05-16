package api

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"github.com/stretchr/testify/require"
)

func TestDashboardAuthStatus_OIDCDisabled(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/pfx"}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/pfx/dashboard/auth-status", nil)
	s.dashboardAuthStatusHandler()(c)
	require.Equal(t, http.StatusOK, w.Code)
	var got types.DashboardAuthStatusResponse
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &got))
	require.True(t, got.Authenticated)
	require.False(t, got.OIDCEnabled)
}

func TestDashboardAuthStatus_OIDCNoSession(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{
		httpPathPrefix: "/pfx",
		oidcSettings:   &OIDCSettings{IssuerURL: "https://issuer", ClientID: "c", ClientSecret: "s"},
	}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/pfx/dashboard/auth-status", nil)
	s.dashboardAuthStatusHandler()(c)
	require.Equal(t, http.StatusOK, w.Code)
	var got types.DashboardAuthStatusResponse
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &got))
	require.False(t, got.Authenticated)
	require.True(t, got.OIDCEnabled)
	require.Contains(t, got.LoginPath, "/login")
}

func TestRequireDashboardModeOrOIDC_AllowsOIDCEnterprise(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/p", oidcSettings: &OIDCSettings{IssuerURL: "https://issuer", ClientID: "x", ClientSecret: "y"}}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Set("mode", model.ModeEnterprise)
	s.requireDashboardModeOrOIDC()(c)
	require.False(t, c.IsAborted())
}

func TestRequireDashboardModeOrOIDC_BlocksEnterpriseWithoutOIDC(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/p"}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Set("mode", model.ModeEnterprise)
	s.requireDashboardModeOrOIDC()(c)
	require.True(t, c.IsAborted())
	require.Equal(t, http.StatusNotFound, w.Code)
}

func TestRequireDashboardModeOrOIDC_AlwaysAllowsDev(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Set("mode", model.ModeDev)
	s.requireDashboardModeOrOIDC()(c)
	require.False(t, c.IsAborted())
}

func TestPreferJSONAcceptedForDashboardAPIRequest(t *testing.T) {
	require.True(t, prefersJSONAccepted("application/json"))
	require.True(t, prefersJSONAccepted("Application/JSON"))
	require.False(t, prefersJSONAccepted("text/html"))

	gin.SetMode(gin.TestMode)
	s := &Server{
		httpPathPrefix:    "/pfx",
		oidcSessionStore:  newMemoryOIDCSessionStore(),
		oidcSessionMaxTTL: 24 * time.Hour,
		oidcSettings:      &OIDCSettings{IssuerURL: "https://x", ClientID: "c", ClientSecret: "s"},
	}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest("GET", "/pfx/dashboard/overview", nil)
	c.Request.Header.Set("Accept", "application/json")
	s.requireOIDCSessionIfEnabled()(c)
	require.True(t, c.IsAborted())
	require.Equal(t, http.StatusUnauthorized, w.Code)
}
