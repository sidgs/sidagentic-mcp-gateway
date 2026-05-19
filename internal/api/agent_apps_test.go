package api

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/pkg/testhelpers"
	"github.com/stretchr/testify/require"
)

func TestAgentAppOAuthTokenURL(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{
		httpPathPrefix:  "/api/v1/sami-mcp-gateway",
		publicURLScheme: "https",
	}

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest("GET", "/api/v1/sami-mcp-gateway/dashboard/agent-apps", nil)
	c.Request.Host = "apps.sidglobal.cloud"

	got := s.agentAppOAuthTokenURL(c)
	want := "https://apps.sidglobal.cloud/api/v1/sami-mcp-gateway/agent-apps/oauth/token"
	require.Equal(t, want, got)
	require.NotContains(t, got, "/api/v0")
}

func TestAgentAppOAuthTokenURL_NoPathPrefix(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{}

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest("GET", "/", nil)
	c.Request.Host = "localhost:8080"

	got := s.agentAppOAuthTokenURL(c)
	require.Equal(t, "http://localhost:8080/agent-apps/oauth/token", got)
	require.False(t, strings.Contains(got, "/api/v0"))
}

func TestAgentAppOAuthTokenRoute(t *testing.T) {
	const prefix = "/api/v1/sami-mcp-gateway"
	s := newTestAPIServer(t, prefix, nil)

	t.Run("new path registered", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodPost, prefix+"/agent-apps/oauth/token", strings.NewReader("grant_type=client_credentials&client_id=x&client_secret=y"))
		require.NoError(t, err)
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
		s.Router().ServeHTTP(w, req)
		// invalid_client (401), not 404
		testhelpers.AssertEqual(t, http.StatusUnauthorized, w.Code)
	})

	t.Run("old api/v0 path removed", func(t *testing.T) {
		w := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodPost, prefix+"/api/v0/agent-apps/oauth/token", strings.NewReader("grant_type=client_credentials"))
		require.NoError(t, err)
		s.Router().ServeHTTP(w, req)
		testhelpers.AssertEqual(t, http.StatusNotFound, w.Code)
	})
}
