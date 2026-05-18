package api

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	mcpserver "github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/migrations"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/internal/service/agentapp"
	mcpSvc "github.com/mcpjungle/mcpjungle/internal/service/mcp"
	"github.com/mcpjungle/mcpjungle/internal/service/promptgroup"
	"github.com/mcpjungle/mcpjungle/internal/service/toolgroup"
	"github.com/mcpjungle/mcpjungle/internal/telemetry"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/testhelpers"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type groupMcpTestServer struct {
	s      *Server
	db     *gorm.DB
	agentS *agentapp.Service
}

func setupGroupMCPTestServer(t *testing.T, jwtKey string) *groupMcpTestServer {
	t.Helper()
	setup := testhelpers.SetupTestDB(t)
	t.Cleanup(setup.Cleanup)
	db := setup.DB
	if err := migrations.Migrate(db); err != nil {
		t.Fatalf("migrate: %v", err)
	}

	mcpProxy := mcpserver.NewMCPServer("test", "0.0.1")
	sseMcpProxy := mcpserver.NewMCPServer("test-sse", "0.0.1")
	svc, err := mcpSvc.NewMCPService(&mcpSvc.ServiceConfig{
		DB:                      db,
		McpProxyServer:          mcpProxy,
		SseMcpProxyServer:       sseMcpProxy,
		Metrics:                 telemetry.NewNoopCustomMetrics(),
		McpServerInitReqTimeout: 5,
	})
	if err != nil {
		t.Fatalf("mcp service: %v", err)
	}

	tgSvc, err := toolgroup.NewToolGroupService(db, svc)
	if err != nil {
		t.Fatalf("tool group service: %v", err)
	}
	pgSvc, err := promptgroup.NewPromptGroupService(db, svc)
	if err != nil {
		t.Fatalf("prompt group service: %v", err)
	}
	ag := agentapp.New(db, jwtKey)
	s := &Server{
		toolGroupService:  tgSvc,
		promptGroupService: pgSvc,
		agentAppService:    ag,
	}
	return &groupMcpTestServer{s: s, db: db, agentS: ag}
}

func testTenantAndModeMiddleware(mode model.ServerMode) gin.HandlerFunc {
	return func(c *gin.Context) {
		tid := tenant.DefaultID
		c.Set(tenant.GinKey, tid)
		ctx := tenant.WithContext(c.Request.Context(), tid)
		c.Request = c.Request.WithContext(ctx)
		c.Set("mode", mode)
		c.Next()
	}
}

func mustMarshalJSONSlice(t *testing.T, s []string) datatypes.JSON {
	t.Helper()
	b, err := json.Marshal(s)
	if err != nil {
		t.Fatal(err)
	}
	return datatypes.JSON(b)
}

func insertToolGroup(t *testing.T, db *gorm.DB, name, sec string) {
	t.Helper()
	g := &model.ToolGroup{
		TenantID:         tenant.DefaultID,
		Name:             name,
		Description:      "test",
		SecurityOption:   sec,
		IncludedTools:    mustMarshalJSONSlice(t, []string{"srv__noop"}),
		IncludedServers:  mustMarshalJSONSlice(t, nil),
		ExcludedTools:    mustMarshalJSONSlice(t, nil),
	}
	if err := db.Create(g).Error; err != nil {
		t.Fatalf("create tool group: %v", err)
	}
}

func insertPromptGroup(t *testing.T, db *gorm.DB, name, sec string) {
	t.Helper()
	g := &model.PromptGroup{
		TenantID:         tenant.DefaultID,
		Name:             name,
		Description:      "test",
		SecurityOption:   sec,
		IncludedPrompts:  mustMarshalJSONSlice(t, []string{"srv__noop"}),
		IncludedServers:  mustMarshalJSONSlice(t, nil),
		ExcludedPrompts:  mustMarshalJSONSlice(t, nil),
	}
	if err := db.Create(g).Error; err != nil {
		t.Fatalf("create prompt group: %v", err)
	}
}

func TestCheckAuthForGroupMcpProxyAccess_OpenDevNoAuth(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertToolGroup(t, env.db, "gopen", types.GroupSecurityOpen)

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/gopen/mcp", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusOK, w.Code)
}

func TestCheckAuthForGroupMcpProxyAccess_OpenEnterpriseNoAuth(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertToolGroup(t, env.db, "gopen", types.GroupSecurityOpen)

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeEnterprise))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/gopen/mcp", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusOK, w.Code)
}

func TestCheckAuthForGroupMcpProxyAccess_BasicDevMissingAuth(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertToolGroup(t, env.db, "gbasic", types.GroupSecurityBasic)

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/gbasic/mcp", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusUnauthorized, w.Code)
	testhelpers.AssertStringContains(t, w.Body.String(), "basic")
}

func TestCheckAuthForGroupMcpProxyAccess_APIKeyAllowed(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertToolGroup(t, env.db, "tg", types.GroupSecurityAPIKey)
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	_, _, err := env.agentS.Create(ctx, "owner", "a1", "", []string{"tg"}, nil)
	if err != nil {
		t.Fatal(err)
	}
	var app model.AgentApp
	if err := env.db.Where("name = ?", "a1").First(&app).Error; err != nil {
		t.Fatal(err)
	}

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/tg/mcp", nil)
	req.Header.Set("X-API-Key", app.ClientID)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusOK, w.Code)
}

func TestCheckAuthForGroupMcpProxyAccess_APIKeyWrongGroup(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertToolGroup(t, env.db, "tg", types.GroupSecurityAPIKey)
	insertToolGroup(t, env.db, "other", types.GroupSecurityAPIKey)
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	_, _, err := env.agentS.Create(ctx, "owner", "a1", "", []string{"other"}, nil)
	if err != nil {
		t.Fatal(err)
	}
	var app model.AgentApp
	if err := env.db.Where("name = ?", "a1").First(&app).Error; err != nil {
		t.Fatal(err)
	}

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/tg/mcp", nil)
	req.Header.Set("X-API-Key", app.ClientID)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusUnauthorized, w.Code)
}

func TestCheckAuthForGroupMcpProxyAccess_BasicOK(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertToolGroup(t, env.db, "tg", types.GroupSecurityBasic)
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	app, secret, err := env.agentS.Create(ctx, "owner", "a1", "", []string{"tg"}, nil)
	if err != nil {
		t.Fatal(err)
	}

	raw := base64.StdEncoding.EncodeToString([]byte(app.ClientID + ":" + secret))
	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := ttReqBAuth(t, "/v0/groups/tg/mcp", "Basic "+raw)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusOK, w.Code)
}

func ttReqBAuth(t *testing.T, path, auth string) *http.Request {
	t.Helper()
	req := httptest.NewRequest(http.MethodGet, path, nil)
	req.Header.Set("Authorization", auth)
	return req
}

func TestCheckAuthForGroupMcpProxyAccess_BearerJWTNotConfigured(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertToolGroup(t, env.db, "tg", types.GroupSecurityBearer)

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/tg/mcp", nil)
	req.Header.Set("Authorization", "Bearer x")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusServiceUnavailable, w.Code)
	testhelpers.AssertStringContains(t, w.Body.String(), "JWT")
}

func TestCheckAuthForGroupMcpProxyAccess_BearerJWTValid(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "test-signing-key-for-jwt-hmac-32")
	insertToolGroup(t, env.db, "tg", types.GroupSecurityBearer)
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	app, _, err := env.agentS.Create(ctx, "owner", "a1", "", []string{"tg"}, nil)
	if err != nil {
		t.Fatal(err)
	}
	tok, _, err := env.agentS.MintAccessToken(app)
	if err != nil {
		t.Fatal(err)
	}

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/tg/mcp", nil)
	req.Header.Set("Authorization", "Bearer "+tok)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusOK, w.Code)
}

func TestCheckAuthForGroupMcpProxyAccess_PromptGroupOpen(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")
	insertPromptGroup(t, env.db, "pg1", types.GroupSecurityOpen)

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/prompt-groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(false), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/prompt-groups/pg1/mcp", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusOK, w.Code)
}

func TestCheckAuthForGroupMcpProxyAccess_UnknownGroup404(t *testing.T) {
	gin.SetMode(gin.TestMode)
	env := setupGroupMCPTestServer(t, "")

	r := gin.New()
	r.Use(testTenantAndModeMiddleware(model.ModeDev))
	r.GET("/v0/groups/:name/mcp", env.s.checkAuthForGroupMcpProxyAccess(true), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})
	req := httptest.NewRequest(http.MethodGet, "/v0/groups/ghost/mcp", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	testhelpers.AssertEqual(t, http.StatusNotFound, w.Code)
}
