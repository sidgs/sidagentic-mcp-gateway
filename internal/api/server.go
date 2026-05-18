// Package api provides HTTP API functionality for the MCPJungle server.
package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/gin-gonic/gin"
	"github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/dashboardui"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/internal/service/agentapp"
	"github.com/mcpjungle/mcpjungle/internal/service/config"
	"github.com/mcpjungle/mcpjungle/internal/service/dashboard"
	"github.com/mcpjungle/mcpjungle/internal/service/mcp"
	"github.com/mcpjungle/mcpjungle/internal/service/promptgroup"
	"github.com/mcpjungle/mcpjungle/internal/service/toolgroup"
	"github.com/mcpjungle/mcpjungle/internal/service/user"
	"github.com/mcpjungle/mcpjungle/internal/telemetry"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"github.com/mcpjungle/mcpjungle/pkg/version"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/redis/go-redis/v9"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

const (
	V0PathPrefix    = "/v0"
	V0ApiPathPrefix = "/api" + V0PathPrefix
)

type ServerOptions struct {
	// MCPProxyServer is the MCP proxy server instance that contains tools for all MCP servers
	// using the stdio or streamable http transport.
	MCPProxyServer *server.MCPServer
	// SseMcpProxyServer is the MCP proxy server instance that contains tools for all MCP servers
	// using the SSE transport.
	// sse tools are kept separate because SSE is supported for backward compatibility reasons, and
	// we don't want it to interfere with the usual mcp proxy server.
	// Both sse & streamable http use http, and we don't want to mix them up either.
	SseMcpProxyServer *server.MCPServer

	MCPService    *mcp.MCPService
	ConfigService *config.ServerConfigService

	// GlobalMCPAPIKey is required for enterprise global MCP (/mcp, /sse, /message): send as X-API-Key or Authorization: Bearer <key>.
	GlobalMCPAPIKey string
	UserService      *user.UserService
	ToolGroupService  *toolgroup.ToolGroupService
	PromptGroupService *promptgroup.PromptGroupService
	DashboardService   *dashboard.Service
	AgentAppService    *agentapp.Service

	OtelProviders *telemetry.Providers
	Metrics       telemetry.CustomMetrics

	// HTTPPathPrefix is an optional path prefix (e.g. /ai/v1/sami-mcp-gateway) for every route.
	// Empty means routes are served from the host root.
	HTTPPathPrefix string

	// PublicURLScheme optionally forces http or https for externally advertised URLs when TLS terminates upstream without X-Forwarded-Proto (see PUBLIC_URL_SCHEME env).
	PublicURLScheme string

	// OIDC configures optional Cognito (or OIDC-compliant) login for the dashboard (/login, /auth/callback).
	OIDC *OIDCSettings
	// OIDCRedis is optional; when set alongside OIDC login, browser sessions are stored in Redis for multi-replica deployments.
	OIDCRedis *redis.Client
	// OIDCSessionTTL is the maximum dashboard session lifetime (Redis key TTL upper bound, cookie cap). Zero uses 3 days.
	OIDCSessionTTL time.Duration

	// PostLoginRedirectURL is optional absolute (https://…) or root-relative (/…) URL to send browsers after OIDC succeeds or after dashboard sign-out (/logout).
	// Empty means redirect to "/" or "{HTTP_PATH_PREFIX}/". Validated at server construction.
	PostLoginRedirectURL string

	// CognitoOAuthRedirectURI optionally overrides OAuth2 authorize redirect_uri (COGNITO_REDIRECT_URI env: absolute https or http URL, must match Cognito app client callback).
	CognitoOAuthRedirectURI string

	// DefaultTenantID is used when the X-Tenant-ID header is absent (typically from DEFAULT_TENANT_ID).
	DefaultTenantID string
}

// Server represents the MCPJungle registry server that handles MCP proxy and API requests
type Server struct {
	router *gin.Engine

	mcpProxyServer    *server.MCPServer
	sseMcpProxyServer *server.MCPServer

	mcpService *mcp.MCPService

	configService *config.ServerConfigService

	globalMcpAPIKey string
	userService      *user.UserService
	toolGroupService  *toolgroup.ToolGroupService
	promptGroupService *promptgroup.PromptGroupService
	dashboardService   *dashboard.Service
	agentAppService    *agentapp.Service

	otelProviders *telemetry.Providers
	metrics       telemetry.CustomMetrics

	// groupSseServers caches SSE MCP sessions for tool groups (key tenant::group).
	groupSseServers sync.Map

	// promptGroupSseServers caches SSE sessions for prompt groups (key pg::tenant::group).
	promptGroupSseServers sync.Map

	// Lazy-cached OIDC issuer (Cognito or other OIDC-compliant IdP).
	oidcProviderMu     sync.Mutex
	oidcCachedProvider *oidc.Provider
	oidcSettings       *OIDCSettings
	oidcSessionStore   oidcSessionStore
	oidcSessionMaxTTL  time.Duration

	// dashboardOAuthMu guards dashboardOAuthResults, which is a short-lived
	// in-memory cache used by the browser-based dashboard OAuth flow.
	dashboardOAuthMu sync.Mutex
	// dashboardOAuthResults stores terminal dashboard-facing OAuth status for a
	// session ID (completed/failed/expired) so the frontend can poll for
	// progress after opening the upstream authorization URL.
	dashboardOAuthResults map[string]dashboardOAuthSessionResult

	// httpPathPrefix is normalized (see NormalizeHTTPPathPrefix).
	httpPathPrefix string

	// postLoginRedirectURL, when set, overrides the default browser redirect target after OIDC callback success and after /logout.
	postLoginRedirectURL string

	// cognitoOAuthRedirectURI overrides OAuth2 redirect_uri passed to Cognito when COGNITO_REDIRECT_URI is set.
	cognitoOAuthRedirectURI string

	// publicURLScheme when https or http forces that scheme for publicly advertised URLs instead of inferring from the request connection.
	publicURLScheme string

	// defaultTenantID is used when X-Tenant-ID is missing and for non-HTTP operations.
	defaultTenantID string
}

// dashboardOAuthSessionResult is the dashboard-facing terminal state for an
// upstream OAuth registration attempt. This is not the source of truth for the
// pending OAuth session itself; it is a lightweight cache used to coordinate
// callback completion and frontend polling.
type dashboardOAuthSessionResult struct {
	Status     string
	Error      string
	ServerName string
	ExpiresAt  time.Time
	UpdatedAt  time.Time
}

// NewServer initializes a new Gin server for MCPJungle registry and MCP proxy
func NewServer(opts *ServerOptions) (*Server, error) {
	def := strings.TrimSpace(opts.DefaultTenantID)
	if def == "" {
		def = tenant.DefaultID
	}
	if err := tenant.Validate(def); err != nil {
		return nil, fmt.Errorf("invalid default tenant id: %w", err)
	}

	maxTTL := opts.OIDCSessionTTL
	if maxTTL < 0 {
		return nil, fmt.Errorf("OIDCSessionTTL must not be negative")
	}
	if maxTTL == 0 {
		maxTTL = defaultOIDCSessionMaxTTL
	}

	var sessionStore oidcSessionStore
	if opts.OIDCRedis != nil {
		sessionStore = newRedisOIDCSessionStore(opts.OIDCRedis, "")
	} else {
		sessionStore = newMemoryOIDCSessionStore()
	}

	postLogin := strings.TrimSpace(opts.PostLoginRedirectURL)
	if postLogin != "" {
		var errNormalize error
		postLogin, errNormalize = normalizePostLoginRedirectURL(postLogin)
		if errNormalize != nil {
			return nil, fmt.Errorf("PostLoginRedirectURL: %w", errNormalize)
		}
	}

	cognitoOAuthRedirect := strings.TrimSpace(opts.CognitoOAuthRedirectURI)
	if cognitoOAuthRedirect != "" {
		if opts.OIDC == nil {
			return nil, fmt.Errorf("CognitoOAuthRedirectURI is set but OIDC is not configured")
		}
		var errCR error
		cognitoOAuthRedirect, errCR = normalizeOAuth2AuthorizeRedirectURI(cognitoOAuthRedirect)
		if errCR != nil {
			return nil, fmt.Errorf("CognitoOAuthRedirectURI: %w", errCR)
		}
	}

	publicSchemeRaw := strings.TrimSpace(opts.PublicURLScheme)
	publicScheme, errPS := normalizePublicURLScheme(publicSchemeRaw)
	if errPS != nil {
		return nil, fmt.Errorf("PublicURLScheme: %w", errPS)
	}

	s := &Server{
		mcpProxyServer:        opts.MCPProxyServer,
		sseMcpProxyServer:     opts.SseMcpProxyServer,
		mcpService:      opts.MCPService,
		globalMcpAPIKey: strings.TrimSpace(opts.GlobalMCPAPIKey),
		configService:   opts.ConfigService,
		userService:           opts.UserService,
		toolGroupService:      opts.ToolGroupService,
		promptGroupService:    opts.PromptGroupService,
		dashboardService:      opts.DashboardService,
		agentAppService:       opts.AgentAppService,
		otelProviders:         opts.OtelProviders,
		metrics:               opts.Metrics,
		dashboardOAuthResults: make(map[string]dashboardOAuthSessionResult),
		httpPathPrefix:            NormalizeHTTPPathPrefix(opts.HTTPPathPrefix),
		postLoginRedirectURL:      postLogin,
		cognitoOAuthRedirectURI:   cognitoOAuthRedirect,
		defaultTenantID:           def,
		publicURLScheme:           publicScheme,
		oidcSettings:              opts.OIDC,
		oidcSessionStore:      sessionStore,
		oidcSessionMaxTTL:     maxTTL,
	}

	// Set up the router after the server is fully initialized
	r, err := s.setupRouter()
	if err != nil {
		return nil, err
	}
	s.router = r

	if postLogin != "" && opts.OIDC != nil {
		log.Printf("[oidc] post-login redirect: %s\n", postLogin)
	}
	if cognitoOAuthRedirect != "" {
		log.Printf("[oidc] OAuth2 redirect_uri override: %s\n", cognitoOAuthRedirect)
	}
	if publicScheme != "" {
		log.Printf("[server] PUBLIC_URL_SCHEME override: %s (public MCP/dashboard URLs)\n", publicScheme)
	}

	return s, nil
}

// IsInitialized returns true if the server is initialized
func (s *Server) IsInitialized() (bool, error) {
	ctx := tenant.WithContext(context.Background(), s.defaultTenantID)
	c, err := s.configService.GetConfig(ctx)
	if err != nil {
		return false, fmt.Errorf("failed to get server config: %w", err)
	}
	return c.Initialized, nil
}

// GetMode returns the server mode if the server is initialized, otherwise an error
func (s *Server) GetMode() (model.ServerMode, error) {
	ok, err := s.IsInitialized()
	if err != nil {
		return "", fmt.Errorf("failed to check if server is initialized: %w", err)
	}
	if !ok {
		return "", fmt.Errorf("server is not initialized")
	}
	c, err := s.configService.GetConfig(tenant.WithContext(context.Background(), s.defaultTenantID))
	if err != nil {
		return "", fmt.Errorf("failed to get server config: %w", err)
	}
	return c.Mode, nil
}

// BootstrapServerIfUninitialized persists server mode for the tenant when no initialized
// config exists yet. For enterprise modes it also creates the bootstrap admin user.
// If the server is already initialized, it returns created=false and does nothing (idempotent).
func (s *Server) BootstrapServerIfUninitialized(ctx context.Context, mode model.ServerMode) (created bool, enterpriseAdminToken string, err error) {
	createdFlag, err := s.configService.Init(ctx, mode)
	if err != nil {
		return false, "", err
	}
	if !createdFlag {
		return false, "", nil
	}
	if model.IsEnterpriseMode(mode) {
		admin, err := s.userService.CreateAdminUser(ctx)
		if err != nil {
			return false, "", fmt.Errorf("failed to create bootstrap admin user: %w", err)
		}
		return true, admin.AccessToken, nil
	}
	return true, "", nil
}

// InitDev initializes the server configuration in the Development mode.
// This method does not create an admin user because that is irrelevant in dev mode.
func (s *Server) InitDev() error {
	ctx := tenant.WithContext(context.Background(), s.defaultTenantID)
	_, _, err := s.BootstrapServerIfUninitialized(ctx, model.ModeDev)
	if err != nil {
		return fmt.Errorf("failed to initialize server config in dev mode: %w", err)
	}
	return nil
}

// Router returns the underlying HTTP handler for use with a custom HTTP server.
// This is useful for graceful shutdown support.
func (s *Server) Router() http.Handler {
	return s.router
}

// HTTPPathPrefix returns the configured path prefix (normalized), or "" if routes are at the host root.
func (s *Server) HTTPPathPrefix() string {
	return s.httpPathPrefix
}

// normalizePublicURLScheme validates PUBLIC_URL_SCHEME: empty → auto detect; otherwise "http" or "https" (case-insensitive).
func normalizePublicURLScheme(raw string) (string, error) {
	raw = strings.TrimSpace(strings.ToLower(raw))
	if raw == "" {
		return "", nil
	}
	if raw == "http" || raw == "https" {
		return raw, nil
	}
	return "", fmt.Errorf("must be empty, http, or https, got %q", raw)
}

// inferRequestScheme returns http/https from TLS or X-Forwarded-Proto (ignores PUBLIC_URL_SCHEME).
func inferRequestScheme(c *gin.Context) string {
	if c.Request.TLS != nil || c.GetHeader("X-Forwarded-Proto") == "https" {
		return "https"
	}
	return "http"
}

func (s *Server) publicSchemeForURLs(c *gin.Context) string {
	if s.publicURLScheme != "" {
		return s.publicURLScheme
	}
	return inferRequestScheme(c)
}

// schemeHostPublicURL returns scheme://host used in advertised MCP and dashboard URLs.
func (s *Server) schemeHostPublicURL(c *gin.Context) string {
	return s.publicSchemeForURLs(c) + "://" + c.Request.Host
}

// publicGatewayRoot returns scheme://host[/prefix] with no trailing slash (before path segments like /mcp).
func (s *Server) publicGatewayRoot(c *gin.Context) string {
	hostRoot := s.schemeHostPublicURL(c)
	if s.httpPathPrefix == "" {
		return hostRoot
	}
	return strings.TrimRight(hostRoot, "/") + s.httpPathPrefix
}

// v0SubgroupMountBasePath is the path prefix for /v0/<segment>/<subgroupName> MCP mounts (includes HTTP_PATH_PREFIX when set).
func (s *Server) v0SubgroupMountBasePath(segment, subgroupName string) string {
	pp := NormalizeHTTPPathPrefix(s.httpPathPrefix)
	core := fmt.Sprintf("%s/%s/%s", V0PathPrefix, segment, subgroupName)
	if pp == "" {
		return core
	}
	return pp + core
}

// oauthCookieSecure sets OAuth session cookie Secure when HTTPS is inferred or forced via PUBLIC_URL_SCHEME.
func (s *Server) oauthCookieSecure(c *gin.Context) bool {
	if s.publicURLScheme == "https" {
		return true
	}
	if s.publicURLScheme == "http" {
		return false
	}
	return c.Request.TLS != nil || c.Request.Header.Get("X-Forwarded-Proto") == "https"
}

// setupRouter sets up the Gin router with the MCP proxy server and API endpoints.
func (s *Server) setupRouter() (*gin.Engine, error) {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// if otel is enabled, setup prometheus metrics endpoint
	if s.otelProviders != nil && s.otelProviders.IsEnabled() {
		// instrument gin
		r.Use(otelgin.Middleware(s.otelProviders.ServiceName()))
	}

	var g *gin.RouterGroup
	if s.httpPathPrefix != "" {
		g = r.Group(s.httpPathPrefix)
	} else {
		g = &r.RouterGroup
	}

	g.Use(s.tenantMiddleware())

	if s.otelProviders != nil && s.otelProviders.IsEnabled() {
		// expose prometheus metrics endpoint
		g.GET("/metrics", gin.WrapH(promhttp.Handler()))
	}

	g.GET(
		"/health",
		func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		},
	)

	g.GET(
		"/metadata",
		func(c *gin.Context) {
			m := &types.ServerMetadata{
				Version: version.GetVersion(),
			}
			c.JSON(http.StatusOK, m)
		},
	)

	g.POST("/init", s.registerInitServerHandler())

	g.GET("/login", s.cognitoOAuthLoginHandler())
	g.GET("/auth/callback", s.cognitoOAuthCallbackHandler())
	g.GET("/logout", s.cognitoLogoutHandler())

	requireEnterpriseMode := s.requireServerMode(model.ModeEnterprise)
	requireDashboardModeOrOIDC := s.requireDashboardModeOrOIDC()
	requireOIDCSessionIfEnabled := s.requireOIDCSessionIfEnabled()

	if s.dashboardService != nil {
		dashboardFileServer, err := dashboardui.FileServer()
		if err != nil {
			return nil, err
		}
		// SPA shell loads without OIDC session so the Home page can be public; gated JSON remains behind requireOIDCSessionIfEnabled.
		g.GET("/", s.requireInitialized(), requireDashboardModeOrOIDC, gin.WrapH(dashboardFileServer))
		g.GET("/index.html", s.requireInitialized(), requireDashboardModeOrOIDC, gin.WrapH(dashboardFileServer))
		g.GET("/assets/*filepath", s.requireInitialized(), requireDashboardModeOrOIDC, gin.WrapH(dashboardFileServer))
	}

	// Set up the MCP proxy server on /mcp
	streamableHTTPServer := server.NewStreamableHTTPServer(s.mcpProxyServer)
	g.Any(
		"/mcp",
		s.requireInitialized(),
		s.checkAuthForMcpProxyAccess(),
		gin.WrapH(streamableHTTPServer),
	)

	g.Any(
		V0PathPrefix+"/groups/:name/mcp",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(true),
		s.toolGroupMCPServerCallHandler(),
	)

	g.Any(
		V0PathPrefix+"/prompt-groups/:name/mcp",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(false),
		s.promptGroupMCPServerCallHandler(),
	)

	// Set up the SSE transport-based MCP proxy server for the global /sse endpoint
	sseServer := server.NewSSEServer(s.sseMcpProxyServer)
	g.Any(
		"/sse",
		s.requireInitialized(),
		s.checkAuthForMcpProxyAccess(),
		gin.WrapH(sseServer.SSEHandler()),
	)
	g.Any(
		"/message",
		s.requireInitialized(),
		s.checkAuthForMcpProxyAccess(),
		gin.WrapH(sseServer.MessageHandler()),
	)

	g.Any(
		V0PathPrefix+"/groups/:name/sse",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(true),
		s.toolGroupSseMCPServerCallHandler(),
	)
	g.Any(
		V0PathPrefix+"/groups/:name/message",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(true),
		s.toolGroupSseMCPServerCallMessageHandler(),
	)

	g.Any(
		V0PathPrefix+"/prompt-groups/:name/sse",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(false),
		s.promptGroupSseHandler(),
	)
	g.Any(
		V0PathPrefix+"/prompt-groups/:name/message",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(false),
		s.promptGroupSseMessageHandler(),
	)

	g.POST(
		V0ApiPathPrefix+"/agent-apps/oauth/token",
		s.requireInitialized(),
		s.agentAppOAuthTokenHandler(),
	)

	// Setup /v0 API endpoints
	apiV0 := g.Group(
		V0ApiPathPrefix,
		s.requireInitialized(),
		s.verifyUserAuthForAPIAccess(),
	)

	// endpoints accessible by a standard user in enterprise mode or anyone in development mode
	userAPI := apiV0.Group("/")
	{
		userAPI.GET("/servers", s.listServersHandler())

		userAPI.GET("/tools", s.listToolsHandler())
		userAPI.POST("/tools/invoke", s.invokeToolHandler())
		userAPI.GET("/tool", s.getToolHandler())

		userAPI.GET("/resources", s.listResourcesHandler())
		userAPI.POST("/resources/get", s.getResourceHandler())
		userAPI.POST("/resources/read", s.readResourceHandler())

		// Prompt endpoints
		userAPI.GET("/prompts", s.listPromptsHandler())
		userAPI.GET("/prompt", s.getPromptHandler())
		userAPI.POST("/prompts/render", s.getPromptWithArgsHandler())

		userAPI.GET("/users/whoami", requireEnterpriseMode, s.whoAmIHandler())

		userAPI.POST("/agent-apps", s.createAgentAppHandler())
		userAPI.GET("/agent-apps", s.listAgentAppsHandler())
		userAPI.GET("/agent-apps/:id", s.getAgentAppHandler())
		userAPI.PATCH("/agent-apps/:id", s.patchAgentAppHandler())
		userAPI.DELETE("/agent-apps/:id", s.deleteAgentAppHandler())
		userAPI.POST("/agent-apps/:id/rotate-secret", s.rotateAgentAppSecretHandler())
	}

	// endpoints only accessible by an admin user in enterprise mode or anyone in development mode
	adminAPI := apiV0.Group("/", s.requireAdminUser())
	{
		adminAPI.POST("/servers", s.registerServerHandler())
		adminAPI.POST("/upstream_oauth/sessions/:id/complete", s.completeUpstreamOAuthSessionHandler())
		adminAPI.DELETE("/servers/:name", s.deregisterServerHandler())
		adminAPI.POST("/servers/:name/enable", s.enableServerHandler())
		adminAPI.POST("/servers/:name/disable", s.disableServerHandler())

		// this endpoint is restricted to admins only because it can potentially expose sensitive information
		// like bearer tokens.
		adminAPI.GET("/server_configs", s.getServerConfigsHandler())

		adminAPI.POST("/tools/enable", s.enableToolsHandler())
		adminAPI.POST("/tools/disable", s.disableToolsHandler())

		adminAPI.POST("/prompts/enable", s.enablePromptsHandler())
		adminAPI.POST("/prompts/disable", s.disablePromptsHandler())

		// endpoints for managing human users (enterprise mode only)
		adminAPI.POST(
			"/users",
			requireEnterpriseMode,
			s.createUserHandler(),
		)
		adminAPI.GET(
			"/users",
			requireEnterpriseMode,
			s.listUsersHandler(),
		)
		adminAPI.DELETE(
			"/users/:username",
			requireEnterpriseMode,
			s.deleteUserHandler(),
		)
		adminAPI.PUT(
			"/users/:username",
			requireEnterpriseMode,
			s.updateUserHandler(),
		)

		// endpoints for managing tool groups
		adminAPI.POST("/tool-groups", s.createToolGroupHandler())
		adminAPI.GET("/tool-groups/:name", s.getToolGroupHandler())
		adminAPI.GET("/tool-groups/:name/effective-tools", s.getToolGroupEffectiveToolsHandler())
		adminAPI.GET("/tool-groups", s.listToolGroupsHandler())
		adminAPI.DELETE("/tool-groups/:name", s.deleteToolGroupHandler())
		adminAPI.PUT("/tool-groups/:name", s.updateToolGroupHandler())

		adminAPI.POST("/prompt-groups", s.createPromptGroupHandler())
		adminAPI.GET("/prompt-groups/:name", s.getPromptGroupHandler())
		adminAPI.GET("/prompt-groups/:name/effective-prompts", s.getPromptGroupEffectivePromptsHandler())
		adminAPI.GET("/prompt-groups", s.listPromptGroupsHandler())
		adminAPI.DELETE("/prompt-groups/:name", s.deletePromptGroupHandler())
		adminAPI.PUT("/prompt-groups/:name", s.updatePromptGroupHandler())
	}

	if s.dashboardService != nil {
		dashboardPublic := g.Group(
			"/dashboard",
			s.requireInitialized(),
			requireDashboardModeOrOIDC,
		)
		{
			dashboardPublic.GET("/auth-status", s.dashboardAuthStatusHandler())
		}
		dashboardAPI := g.Group(
			"/dashboard",
			s.requireInitialized(),
			requireDashboardModeOrOIDC,
			requireOIDCSessionIfEnabled,
		)
		{
			dashboardAPI.GET("/overview", s.dashboardOverviewHandler())
			dashboardAPI.GET("/servers", s.dashboardServersHandler())
			dashboardAPI.POST("/servers", s.dashboardRegisterServerHandler())
			dashboardAPI.GET("/servers/:name/config", s.dashboardGetServerConfigHandler())
			dashboardAPI.PUT("/servers/:name", s.dashboardUpdateServerHandler())
			dashboardAPI.GET("/oauth/callback", s.dashboardOAuthCallbackHandler())
			dashboardAPI.GET("/oauth/session/:id", s.dashboardOAuthSessionHandler())
			dashboardAPI.DELETE("/servers/:name", s.dashboardDeleteServerHandler())
			dashboardAPI.PATCH("/servers/:name/enabled", s.dashboardSetServerEnabledHandler())
			dashboardAPI.GET("/tools", s.dashboardToolsHandler())
			dashboardAPI.PATCH("/tools/:name/enabled", s.dashboardSetToolEnabledHandler())
			dashboardAPI.GET("/tool-groups", s.dashboardToolGroupsHandler())
			dashboardAPI.POST("/tool-groups", s.dashboardCreateToolGroupHandler())
			dashboardAPI.GET("/tool-groups/:name", s.dashboardGetToolGroupHandler())
			dashboardAPI.PUT("/tool-groups/:name", s.dashboardUpdateToolGroupHandler())
			dashboardAPI.DELETE("/tool-groups/:name", s.dashboardDeleteToolGroupHandler())

			dashboardAPI.GET("/prompt-groups", s.dashboardPromptGroupsHandler())
			dashboardAPI.POST("/prompt-groups", s.dashboardCreatePromptGroupHandler())
			dashboardAPI.GET("/prompt-groups/:name", s.dashboardGetPromptGroupHandler())
			dashboardAPI.PUT("/prompt-groups/:name", s.dashboardUpdatePromptGroupHandler())
			dashboardAPI.DELETE("/prompt-groups/:name", s.dashboardDeletePromptGroupHandler())

			dashboardAPI.GET("/agent-apps", s.dashboardAgentAppsHandler())
			dashboardAPI.POST("/agent-apps", s.dashboardCreateAgentAppHandler())
			dashboardAPI.PATCH("/agent-apps/:id", s.dashboardPatchAgentAppHandler())
			dashboardAPI.DELETE("/agent-apps/:id", s.dashboardDeleteAgentAppHandler())
			dashboardAPI.POST("/agent-apps/:id/rotate-secret", s.dashboardRotateAgentAppSecretHandler())

			dashboardAPI.GET("/prompts", s.dashboardPromptsHandler())
			dashboardAPI.PATCH("/prompts/:name/enabled", s.dashboardSetPromptEnabledHandler())
			dashboardAPI.GET("/resources", s.dashboardResourcesHandler())
			dashboardAPI.GET("/diagnostics", s.dashboardDiagnosticsHandler())
		}
	}

	return r, nil
}
