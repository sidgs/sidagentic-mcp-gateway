package api

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/service/config"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
	"strings"
	"gorm.io/gorm"
)

func TestRequireInitialized(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name           string
		setupConfig    func(*gorm.DB) error
		expectedStatus int
		expectedBody   string
	}{
		{
			name: "server is initialized",
			setupConfig: func(testDB *gorm.DB) error {
				configService := config.NewServerConfigService(testDB)
				_, err := configService.Init(context.Background(), model.ModeDev)
				return err
			},
			expectedStatus: http.StatusOK,
			expectedBody:   "",
		},
		{
			name: "server is not initialized",
			setupConfig: func(testDB *gorm.DB) error {
				cfg := model.ServerConfig{
					Initialized: false,
					Mode:        model.ModeDev,
				}
				return testDB.Create(&cfg).Error
			},
			expectedStatus: http.StatusForbidden,
			expectedBody:   `{"error":"server is not initialized"}`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			setup := testhelpers.SetupTestDB(t)
			defer setup.Cleanup()
			testDB := setup.DB
			configService := config.NewServerConfigService(testDB)

			err := tt.setupConfig(testDB)
			if err != nil {
				t.Fatalf("Setup config failed: %v", err)
			}

			server := &Server{configService: configService}
			router := gin.New()
			router.Use(server.requireInitialized())
			router.GET("/test", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{"status": "success"})
			})

			req := httptest.NewRequest(http.MethodGet, "/test", nil)
			w := httptest.NewRecorder()

			router.ServeHTTP(w, req)

			if w.Code != tt.expectedStatus {
				t.Errorf("Expected status %d, got %d", tt.expectedStatus, w.Code)
			}
			if tt.expectedBody != "" && w.Body.String() != tt.expectedBody {
				t.Errorf("Expected body %s, got %s", tt.expectedBody, w.Body.String())
			}
		})
	}
}

func TestRequireInitialized_AutoBootstrapsNonDefaultTenant(t *testing.T) {
	gin.SetMode(gin.TestMode)

	setup := testhelpers.SetupTestDB(t)
	defer setup.Cleanup()
	testDB := setup.DB
	configService := config.NewServerConfigService(testDB)

	const defaultTenant = "sid-agentic"
	const otherTenant = "bian-demo"

	_, err := configService.Init(tenant.WithContext(context.Background(), defaultTenant), model.ModeEnterprise)
	if err != nil {
		t.Fatalf("Setup default tenant config failed: %v", err)
	}

	server := &Server{
		configService:   configService,
		defaultTenantID: defaultTenant,
	}
	router := gin.New()
	router.Use(func(c *gin.Context) {
		tid := strings.TrimSpace(c.GetHeader(tenant.HeaderName))
		if tid == "" {
			tid = defaultTenant
		}
		c.Request = c.Request.WithContext(tenant.WithContext(c.Request.Context(), tid))
	})
	router.Use(server.requireInitialized())
	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "success"})
	})

	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set(tenant.HeaderName, otherTenant)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("Expected status %d, got %d body=%s", http.StatusOK, w.Code, w.Body.String())
	}

	otherCfg, err := configService.GetConfig(tenant.WithContext(context.Background(), otherTenant))
	if err != nil {
		t.Fatalf("GetConfig for other tenant failed: %v", err)
	}
	if !otherCfg.Initialized {
		t.Fatal("expected other tenant to be auto-initialized")
	}
	if otherCfg.Mode != model.ModeEnterprise {
		t.Fatalf("expected enterprise mode, got %v", otherCfg.Mode)
	}
}
	gin.SetMode(gin.TestMode)

	const globalKey = "unit-test-global-mcp-key"

	tests := []struct {
		name           string
		serverKey      string
		xApiKey        string
		authHeader     string
		expectedStatus int
	}{
		{
			name:           "valid x-api-key",
			serverKey:      globalKey,
			xApiKey:        globalKey,
			expectedStatus: http.StatusOK,
		},
		{
			name:           "valid bearer same as key",
			serverKey:      globalKey,
			authHeader:     "Bearer " + globalKey,
			expectedStatus: http.StatusOK,
		},
		{
			name:           "missing credentials",
			serverKey:      globalKey,
			expectedStatus: http.StatusUnauthorized,
		},
		{
			name:           "global key not configured",
			serverKey:      "",
			expectedStatus: http.StatusServiceUnavailable,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			router := gin.New()
			server := &Server{globalMcpAPIKey: tt.serverKey}
			router.Use(server.verifyUserAuthForAPIAccess())
			router.GET("/test", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{"status": "success"})
			})

			req := httptest.NewRequest(http.MethodGet, "/test", nil)
			if tt.xApiKey != "" {
				req.Header.Set("X-API-Key", tt.xApiKey)
			}
			if tt.authHeader != "" {
				req.Header.Set("Authorization", tt.authHeader)
			}
			w := httptest.NewRecorder()

			router.ServeHTTP(w, req)

			if w.Code != tt.expectedStatus {
				t.Errorf("Expected status %d, got %d", tt.expectedStatus, w.Code)
			}
		})
	}
}

func TestRequireAdminUser(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.New()
	server := &Server{}
	router.Use(server.requireAdminUser())
	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "success"})
	})

	req := httptest.NewRequest(http.MethodGet, "/test", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}
}

func TestRequireServerMode(t *testing.T) {
	gin.SetMode(gin.TestMode)

	tests := []struct {
		name           string
		contextMode    model.ServerMode
		requiredMode   model.ServerMode
		expectedStatus int
		expectedBody   string
	}{
		{
			name:           "matching mode - dev",
			contextMode:    model.ModeDev,
			requiredMode:   model.ModeDev,
			expectedStatus: http.StatusOK,
			expectedBody:   "",
		},
		{
			name:           "non-matching mode - dev required, enterprise context",
			contextMode:    model.ModeEnterprise,
			requiredMode:   model.ModeDev,
			expectedStatus: http.StatusForbidden,
			expectedBody:   `{"error":"this request is only allowed in development mode"}`,
		},
		{
			name:           "non-matching mode - dev required, prod context",
			contextMode:    model.ModeProd,
			requiredMode:   model.ModeDev,
			expectedStatus: http.StatusForbidden,
			expectedBody:   `{"error":"this request is only allowed in development mode"}`,
		},
		{
			name:           "enterprise required, prod context (deprecated)",
			contextMode:    model.ModeProd,
			requiredMode:   model.ModeEnterprise,
			expectedStatus: http.StatusOK,
			expectedBody:   "",
		},
		{
			name:           "prod required, enterprise context (deprecated)",
			contextMode:    model.ModeEnterprise,
			requiredMode:   model.ModeProd,
			expectedStatus: http.StatusOK,
			expectedBody:   "",
		},
		{
			name:           "prod required, prod context (deprecated)",
			contextMode:    model.ModeProd,
			requiredMode:   model.ModeProd,
			expectedStatus: http.StatusOK,
			expectedBody:   "",
		},
		{
			name:           "enterprise required, enterprise context",
			contextMode:    model.ModeEnterprise,
			requiredMode:   model.ModeEnterprise,
			expectedStatus: http.StatusOK,
			expectedBody:   "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			router := gin.New()
			router.Use(func(c *gin.Context) {
				if tt.contextMode != "" {
					c.Set("mode", tt.contextMode)
				}
			})
			server := &Server{}
			router.Use(server.requireServerMode(tt.requiredMode))
			router.GET("/test", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{"status": "success"})
			})

			req := httptest.NewRequest(http.MethodGet, "/test", nil)
			w := httptest.NewRecorder()

			router.ServeHTTP(w, req)

			if w.Code != tt.expectedStatus {
				t.Errorf("Expected status %d, got %d", tt.expectedStatus, w.Code)
			}
			if tt.expectedBody != "" && w.Body.String() != tt.expectedBody {
				t.Errorf("Expected body %s, got %s", tt.expectedBody, w.Body.String())
			}
		})
	}
}

func TestCheckAuthForMcpProxyAccess(t *testing.T) {
	gin.SetMode(gin.TestMode)

	const globalKey = "unit-test-global-mcp-key"

	tests := []struct {
		name           string
		mode           model.ServerMode
		serverKey      string
		xApiKey        string
		authHeader     string
		expectedStatus int
	}{
		{
			name:           "valid x-api-key",
			mode:           model.ModeDev,
			serverKey:      globalKey,
			xApiKey:        globalKey,
			expectedStatus: http.StatusOK,
		},
		{
			name:           "valid bearer same as key",
			mode:           model.ModeEnterprise,
			serverKey:      globalKey,
			authHeader:     "Bearer " + globalKey,
			expectedStatus: http.StatusOK,
		},
		{
			name:           "missing credentials",
			mode:           model.ModeEnterprise,
			serverKey:      globalKey,
			expectedStatus: http.StatusUnauthorized,
		},
		{
			name:           "global key not configured",
			mode:           model.ModeDev,
			serverKey:      "",
			expectedStatus: http.StatusServiceUnavailable,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			router := gin.New()
			router.Use(func(c *gin.Context) {
				if tt.mode != "" {
					c.Set("mode", tt.mode)
				}
			})
			server := &Server{globalMcpAPIKey: tt.serverKey}
			router.Use(server.checkAuthForMcpProxyAccess())
			router.GET("/test", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{"status": "success"})
			})

			req := httptest.NewRequest(http.MethodGet, "/test", nil)
			if tt.xApiKey != "" {
				req.Header.Set("X-API-Key", tt.xApiKey)
			}
			if tt.authHeader != "" {
				req.Header.Set("Authorization", tt.authHeader)
			}
			w := httptest.NewRecorder()

			router.ServeHTTP(w, req)

			if w.Code != tt.expectedStatus {
				t.Errorf("Expected status %d, got %d", tt.expectedStatus, w.Code)
			}
		})
	}
}

func TestMiddlewareIntegration(t *testing.T) {
	gin.SetMode(gin.TestMode)
	setup := testhelpers.SetupTestDB(t)
	defer setup.Cleanup()
	testDB := setup.DB

	configService := config.NewServerConfigService(testDB)

	_, err := configService.Init(context.Background(), model.ModeEnterprise)
	if err != nil {
		t.Fatalf("Setup config failed: %v", err)
	}

	const globalKey = "unit-test-global-mcp-key"
	server := &Server{
		configService:   configService,
		globalMcpAPIKey: globalKey,
	}
	router := gin.New()
	router.Use(server.requireInitialized())
	router.Use(server.verifyUserAuthForAPIAccess())
	router.Use(server.requireAdminUser())
	router.GET("/admin", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "admin access granted"})
	})

	req := httptest.NewRequest(http.MethodGet, "/admin", nil)
	req.Header.Set("X-API-Key", globalKey)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}
	expectedBody := `{"status":"admin access granted"}`
	if w.Body.String() != expectedBody {
		t.Errorf("Expected body %s, got %s", expectedBody, w.Body.String())
	}
}
