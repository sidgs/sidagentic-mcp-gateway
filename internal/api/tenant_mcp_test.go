package api

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
	"github.com/stretchr/testify/require"
)

func TestTenantMCPMountBasePath(t *testing.T) {
	s := &Server{httpPathPrefix: "/api/v1/sami-mcp-gateway"}
	require.Equal(t, "/api/v1/sami-mcp-gateway/sid-agentic", s.tenantMCPMountBasePath("sid-agentic"))
	require.Equal(t, "/api/v1/sami-mcp-gateway/sid-agentic/v0/groups/g1", s.v0SubgroupMountBasePath("sid-agentic", "groups", "g1"))
}

func TestPublicTenantMCPRoot(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/api/v1/sami-mcp-gateway", publicURLScheme: "https"}

	c, _ := gin.CreateTestContext(nil)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request = c.Request.WithContext(tenant.WithContext(c.Request.Context(), "sid-agentic"))
	c.Request.Host = "apps.example.com"

	require.Equal(t, "https://apps.example.com/api/v1/sami-mcp-gateway/sid-agentic", s.publicTenantMCPRoot(c))
}

func TestTenantFromPathMiddleware(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{defaultTenantID: tenant.DefaultID}

	r := gin.New()
	r.GET("/:tenant_id/ping", s.tenantFromPathMiddleware(), func(c *gin.Context) {
		got, ok := tenant.FromContext(c.Request.Context())
		if !ok || got != "acme" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "tenant mismatch"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"tenant": got})
	})

	w := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/acme/ping", nil)
	req.Header.Set(tenant.HeaderName, "other-tenant")
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusOK, w.Code)

	w = httptest.NewRecorder()
	req = httptest.NewRequest(http.MethodGet, "/bad@tenant/ping", nil)
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusBadRequest, w.Code)
}

func TestTenantMCPRoutes_OldPaths404(t *testing.T) {
	s := newTestAPIServer(t, "", nil)

	for _, path := range []string{"/mcp", "/v0/groups/x/mcp"} {
		w := httptest.NewRecorder()
		req, err := http.NewRequest(http.MethodPost, path, nil)
		require.NoError(t, err)
		s.Router().ServeHTTP(w, req)
		testhelpers.AssertEqual(t, http.StatusNotFound, w.Code)
	}
}

func TestTenantMCPRoutes_GlobalMCPRegistered(t *testing.T) {
	s := newTestAPIServer(t, "", nil)

	w := httptest.NewRecorder()
	req, err := http.NewRequest(http.MethodPost, "/"+tenant.DefaultID+"/mcp", nil)
	require.NoError(t, err)
	s.Router().ServeHTTP(w, req)
	// Unauthorized without GLOBAL_MCP_API_KEY in dev is OK; route exists (not 404).
	require.NotEqual(t, http.StatusNotFound, w.Code)
}
