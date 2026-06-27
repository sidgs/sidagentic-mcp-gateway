// Package api provides HTTP API functionality for the SAMI MCP Gateway server.
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
	"sami.io/mcpgateway/internal/dashboardui"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/service/agentapp"
	"sami.io/mcpgateway/internal/service/config"
	"sami.io/mcpgateway/internal/service/dashboard"
	"sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/promptgroup"
	"sami.io/mcpgateway/internal/service/skill"
	"sami.io/mcpgateway/internal/service/skillset"
	"sami.io/mcpgateway/internal/service/team"
	"sami.io/mcpgateway/internal/service/tenantregistry"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/internal/service/user"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"sami.io/mcpgateway/pkg/version"
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

	// GlobalMCPAPIKey is required for global MCP (/mcp, /sse, /message) and /api/v0 REST access in all modes.
	GlobalMCPAPIKey string
	UserService      *user.UserService
	TeamService      *team.Service
	TenantRegistry   *tenantregistry.Service
	ToolGroupService  *toolgroup.ToolGroupService
	PromptGroupService *promptgroup.PromptGroupService
	SkillService       *skill.Service
	SkillSetService    *skillset.Service
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

	// DashboardEmbedAllowedOrigins is a comma-separated list of browser origins allowed to call /dashboard/* with Bearer auth (embed mode).
	DashboardEmbedAllowedOrigins string

	// PlatformJWTSecret is the HS256 signing key for platform-issued UI JWTs (JWT_SECRET env).
	PlatformJWTSecret string
	// PlatformJWTAud optionally validates the aud claim on platform JWTs (default sami-cms).
	PlatformJWTAud string
	// PlatformJWTAllowUnsigned allows alg=none platform JWTs when true (JWT_USE_UNSIGNED env).
	PlatformJWTAllowUnsigned bool
}

// Server represents the SAMI MCP Gateway registry server that handles MCP proxy and API requests
type Server struct {
	router *gin.Engine

	mcpProxyServer    *server.MCPServer
	sseMcpProxyServer *server.MCPServer

	mcpService *mcp.MCPService

	configService *config.ServerConfigService

	globalMcpAPIKey string
	userService      *user.UserService
	teamService      *team.Service
	tenantRegistry   *tenantregistry.Service
	toolGroupService  *toolgroup.ToolGroupService
	promptGroupService *promptgroup.PromptGroupService
	skillService       *skill.Service
	skillSetService    *skillset.Service
	dashboardService   *dashboard.Service
	agentAppService    *agentapp.Service

	otelProviders *telemetry.Providers
	metrics       telemetry.CustomMetrics

	// groupSseServers caches SSE MCP sessions for tool groups (key tenant__group).
	groupSseServers sync.Map

	// promptGroupSseServers caches SSE sessions for prompt groups (key pg__tenant__group).
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

	// dashboardEmbedAllowedOrigins lists browser origins permitted for cross-origin embed dashboard API calls.
	dashboardEmbedAllowedOrigins []string

	// platformJWTSecret verifies HS256 platform UI JWTs; separate from agent-app JWT signing.
	platformJWTSecret string
	platformJWTAud      string
	platformJWTAllowUnsigned bool
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

// NewServer initializes a new Gin server for SAMI MCP Gateway registry and MCP proxy
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

	platformJWTAud := strings.TrimSpace(opts.PlatformJWTAud)
	if platformJWTAud == "" {
		platformJWTAud = defaultPlatformJWTAud
	}

	s := &Server{
		mcpProxyServer:        opts.MCPProxyServer,
		sseMcpProxyServer:     opts.SseMcpProxyServer,
		mcpService:      opts.MCPService,
		globalMcpAPIKey: strings.TrimSpace(opts.GlobalMCPAPIKey),
		configService:   opts.ConfigService,
		userService:           opts.UserService,
		teamService:           opts.TeamService,
		tenantRegistry:        opts.TenantRegistry,
		toolGroupService:      opts.ToolGroupService,
		promptGroupService:    opts.PromptGroupService,
		skillService:          opts.SkillService,
		skillSetService:       opts.SkillSetService,
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
		dashboardEmbedAllowedOrigins: parseDashboardEmbedAllowedOrigins(opts.DashboardEmbedAllowedOrigins),
		platformJWTSecret:            strings.TrimSpace(opts.PlatformJWTSecret),
		platformJWTAud:               platformJWTAud,
		platformJWTAllowUnsigned:     opts.PlatformJWTAllowUnsigned,
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
	if strings.TrimSpace(opts.PlatformJWTSecret) != "" {
		log.Printf("[server] platform UI JWT auth enabled (JWT_SECRET is set, aud=%s)\n", platformJWTAud)
	}
	if opts.PlatformJWTAllowUnsigned {
		log.Printf("[server] platform UI JWT auth: unsigned tokens allowed (JWT_USE_UNSIGNED=true)\n")
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
// config exists yet. If the server is already initialized, it returns created=false.
func (s *Server) BootstrapServerIfUninitialized(ctx context.Context, mode model.ServerMode) (created bool, err error) {
	return s.configService.Init(ctx, mode)
}

// resolveTenantConfig returns initialized server config for the request tenant.
// When the default tenant is already initialized, other tenants are bootstrapped
// automatically on first access using the same server mode.
func (s *Server) resolveTenantConfig(ctx context.Context) (model.ServerConfig, error) {
	cfg, err := s.configService.GetConfig(ctx)
	if err != nil {
		return model.ServerConfig{}, err
	}
	if cfg.Initialized {
		return cfg, nil
	}

	defaultTenant := strings.TrimSpace(s.defaultTenantID)
	if defaultTenant == "" {
		defaultTenant = tenant.DefaultID
	}
	if tenant.MustFromContext(ctx) == defaultTenant {
		return cfg, nil
	}

	defCfg, err := s.configService.GetConfig(tenant.WithContext(context.Background(), defaultTenant))
	if err != nil {
		return model.ServerConfig{}, err
	}
	if !defCfg.Initialized {
		return cfg, nil
	}

	if _, err := s.BootstrapServerIfUninitialized(ctx, defCfg.Mode); err != nil {
		return model.ServerConfig{}, err
	}
	return s.configService.GetConfig(ctx)
}

func (s *Server) ensureTenantBootstrap(ctx context.Context, tenantID string) error {
	ctx = tenant.WithContext(ctx, tenantID)
	_, err := s.resolveTenantConfig(ctx)
	return err
}

// InitDev initializes the server configuration in the Development mode.
func (s *Server) InitDev() error {
	ctx := tenant.WithContext(context.Background(), s.defaultTenantID)
	_, err := s.BootstrapServerIfUninitialized(ctx, model.ModeDev)
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

// InvalidateToolGroupSSECache drops a cached SSE MCP session so clients reconnect with fresh tools.
func (s *Server) InvalidateToolGroupSSECache(tenantID, groupName string) {
	s.groupSseServers.Delete(tenant.ToolGroupMapKey(tenantID, groupName))
}

// InvalidatePromptGroupSSECache drops a cached SSE MCP session so clients reconnect with fresh prompts.
func (s *Server) InvalidatePromptGroupSSECache(tenantID, groupName string) {
	s.promptGroupSseServers.Delete(tenant.PromptGroupMapKey(tenantID, groupName))
}

// syncGroupsForServer reloads in-memory tool and prompt group proxies that reference the MCP server.
func (s *Server) syncGroupsForServer(ctx context.Context, serverName string) {
	tenantID := tenant.MustFromContext(ctx)
	if reloaded, err := s.toolGroupService.ReloadGroupsForServer(ctx, tenantID, serverName); err != nil {
		log.Printf("[api] reload tool groups for server %s/%s: %v", tenantID, serverName, err)
	} else {
		for _, groupName := range reloaded {
			s.InvalidateToolGroupSSECache(tenantID, groupName)
		}
	}
	if s.promptGroupService != nil {
		if reloaded, err := s.promptGroupService.ReloadGroupsForServer(ctx, tenantID, serverName); err != nil {
			log.Printf("[api] reload prompt groups for server %s/%s: %v", tenantID, serverName, err)
		} else {
			for _, groupName := range reloaded {
				s.InvalidatePromptGroupSSECache(tenantID, groupName)
			}
		}
	}
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

// publicTenantMCPRoot returns scheme://host[/prefix]/{tenantID} for advertised MCP connection URLs.
func (s *Server) publicTenantMCPRoot(c *gin.Context) string {
	tid := tenant.MustFromContext(c.Request.Context())
	return strings.TrimRight(s.schemeHostPublicURL(c), "/") + s.tenantMCPMountBasePath(tid)
}

// tenantMCPMountBasePath returns [HTTP_PATH_PREFIX]/{tenantID} (no trailing slash).
func (s *Server) tenantMCPMountBasePath(tenantID string) string {
	pp := NormalizeHTTPPathPrefix(s.httpPathPrefix)
	core := "/" + tenantID
	if pp == "" {
		return core
	}
	return pp + core
}

// v0SubgroupMountBasePath returns [HTTP_PATH_PREFIX]/{tenantID}/v0/{segment}/{subgroupName}.
func (s *Server) v0SubgroupMountBasePath(tenantID, segment, subgroupName string) string {
	pp := NormalizeHTTPPathPrefix(s.httpPathPrefix)
	core := fmt.Sprintf("/%s%s/%s/%s", tenantID, V0PathPrefix, segment, subgroupName)
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

	// Tenant-scoped MCP connection routes (global + tool/prompt groups).
	streamableHTTPServer := server.NewStreamableHTTPServer(s.mcpProxyServer)
	sseServer := server.NewSSEServer(
		s.sseMcpProxyServer,
		server.WithDynamicBasePath(func(r *http.Request, sessionID string) string {
			return s.tenantMCPMountBasePath(tenant.MustFromContext(r.Context()))
		}),
	)
	tenantMCP := g.Group("/:tenant_id", s.tenantFromPathMiddleware())
	tenantMCP.Any(
		"/mcp",
		s.requireInitialized(),
		s.checkAuthForMcpProxyAccess(),
		gin.WrapH(streamableHTTPServer),
	)
	tenantMCP.Any(
		"/sse",
		s.requireInitialized(),
		s.checkAuthForMcpProxyAccess(),
		gin.WrapH(sseServer.SSEHandler()),
	)
	tenantMCP.Any(
		"/message",
		s.requireInitialized(),
		s.checkAuthForMcpProxyAccess(),
		gin.WrapH(sseServer.MessageHandler()),
	)
	tenantMCP.Any(
		V0PathPrefix+"/groups/:name/mcp",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(true),
		s.toolGroupMCPServerCallHandler(),
	)
	tenantMCP.Any(
		V0PathPrefix+"/prompt-groups/:name/mcp",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(false),
		s.promptGroupMCPServerCallHandler(),
	)
	tenantMCP.Any(
		V0PathPrefix+"/groups/:name/sse",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(true),
		s.toolGroupSseMCPServerCallHandler(),
	)
	tenantMCP.Any(
		V0PathPrefix+"/groups/:name/message",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(true),
		s.toolGroupSseMCPServerCallMessageHandler(),
	)
	tenantMCP.Any(
		V0PathPrefix+"/prompt-groups/:name/sse",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(false),
		s.promptGroupSseHandler(),
	)
	tenantMCP.Any(
		V0PathPrefix+"/prompt-groups/:name/message",
		s.requireInitialized(),
		s.checkAuthForGroupMcpProxyAccess(false),
		s.promptGroupSseMessageHandler(),
	)
	tenantMCP.GET(
		V0PathPrefix+"/skillsets/:name/skills",
		s.requireInitialized(),
		s.checkAuthForSkillSetAccess(),
		s.tenantSkillSetListHandler(),
	)
	tenantMCP.GET(
		V0PathPrefix+"/skillsets/:name/skills/:skillname/versions/:version",
		s.requireInitialized(),
		s.checkAuthForSkillSetAccess(),
		s.tenantSkillSetSkillHandler(),
	)
	tenantMCP.GET(
		V0PathPrefix+"/skillsets/:name/skills/:skillname/versions/:version/references/:filename",
		s.requireInitialized(),
		s.checkAuthForSkillSetAccess(),
		s.tenantSkillSetReferenceHandler(),
	)

	g.POST(
		"/agent-apps/oauth/token",
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

		userAPI.GET("/skills", s.listSkillsHandler())
		userAPI.GET("/skills/:name/versions/:version", s.getSkillVersionHandler())
		userAPI.GET("/skills/:name/versions/:version/references/:filename", s.getSkillReferenceHandler())
		userAPI.GET("/skillsets", s.listSkillSetsHandler())
		userAPI.GET("/skillsets/:name", s.getSkillSetHandler())
	}

	// endpoints only accessible by an admin user in enterprise mode or anyone in development mode
	adminAPI := apiV0.Group("/", s.requireAdminUser())
	{
		adminAPI.POST("/servers", s.registerServerHandler())
		adminAPI.POST("/upstream_oauth/sessions/:id/complete", s.completeUpstreamOAuthSessionHandler())
		adminAPI.DELETE("/servers/:name", s.deregisterServerHandler())
		adminAPI.POST("/servers/:name/reregister", s.reregisterServerHandler())
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

		adminAPI.POST("/skills", s.createSkillVersionHandler())
		adminAPI.PUT("/skills/:name/versions/:version", s.updateSkillVersionHandler())
		adminAPI.PATCH("/skills/:name/versions/:version/status", s.transitionSkillStatusHandler())
		adminAPI.PATCH("/skills/:name/versions/:version/dlc-status", s.setSkillDLCStatusHandler())
		adminAPI.PATCH("/skills/:name/versions/:version/lock", s.setSkillLockHandler())
		adminAPI.POST("/skillsets", s.createSkillSetHandler())
		adminAPI.PUT("/skillsets/:name", s.updateSkillSetHandler())
	}

	if s.dashboardService != nil {
		dashboardPublic := g.Group(
			"/dashboard",
			s.requireInitialized(),
			requireDashboardModeOrOIDC,
			s.dashboardEmbedCORS(),
		)
		{
			dashboardPublic.GET("/auth-status", s.dashboardAuthStatusHandler())
			dashboardPublic.GET("/auth/tenants", s.dashboardAuthTenantsHandler())
			dashboardPublic.POST("/auth/select-tenant", s.dashboardSelectTenantHandler())
			dashboardPublic.POST("/auth/switch-tenant", s.dashboardSelectTenantHandler())
		}
		dashboardAPI := g.Group(
			"/dashboard",
			s.requireInitialized(),
			requireDashboardModeOrOIDC,
			s.dashboardEmbedCORS(),
			requireOIDCSessionIfEnabled,
			s.requireTenantOperational(),
			s.requireDashboardPrincipal(),
			s.rejectAuditorWrites(),
			s.rejectReadOnlyTenantWrites(),
		)
		{
			dashboardAPI.GET("/me", s.dashboardMeHandler())
			dashboardAPI.GET("/overview", s.dashboardOverviewHandler())
			dashboardAPI.GET("/servers", s.dashboardServersHandler())
			dashboardAPI.POST("/servers", s.dashboardRegisterServerHandler())
			dashboardAPI.GET("/servers/:name/config", s.dashboardGetServerConfigHandler())
			dashboardAPI.PUT("/servers/:name", s.dashboardUpdateServerHandler())
			dashboardAPI.POST("/servers/:name/reregister", s.dashboardReregisterServerHandler())
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

			dashboardAPI.GET("/skills", s.dashboardSkillsHandler())
			dashboardAPI.GET("/skills/:name/versions/:version", s.dashboardGetSkillVersionHandler())
			dashboardAPI.POST("/skills", s.dashboardCreateSkillVersionHandler())
			dashboardAPI.PUT("/skills/:name/versions/:version", s.dashboardUpdateSkillVersionHandler())
			dashboardAPI.PATCH("/skills/:name/versions/:version/status", s.dashboardTransitionSkillStatusHandler())
			dashboardAPI.PATCH("/skills/:name/versions/:version/dlc-status", s.dashboardSetSkillDLCStatusHandler())
			dashboardAPI.PATCH("/skills/:name/versions/:version/lock", s.dashboardSetSkillLockHandler())
			dashboardAPI.DELETE("/skills/:name/versions/:version", s.dashboardDeleteSkillVersionHandler())

			dashboardAPI.GET("/skillsets", s.dashboardSkillSetsHandler())
			dashboardAPI.GET("/skillsets/:name", s.dashboardGetSkillSetHandler())
			dashboardAPI.POST("/skillsets", s.dashboardCreateSkillSetHandler())
			dashboardAPI.PUT("/skillsets/:name", s.dashboardUpdateSkillSetHandler())
			dashboardAPI.DELETE("/skillsets/:name", s.dashboardDeleteSkillSetHandler())

			dashboardAPI.GET("/agent-apps", s.dashboardAgentAppsHandler())
			dashboardAPI.POST("/agent-apps", s.dashboardCreateAgentAppHandler())
			dashboardAPI.PATCH("/agent-apps/:id", s.dashboardPatchAgentAppHandler())
			dashboardAPI.DELETE("/agent-apps/:id", s.dashboardDeleteAgentAppHandler())
			dashboardAPI.POST("/agent-apps/:id/rotate-secret", s.dashboardRotateAgentAppSecretHandler())

			dashboardAPI.GET("/prompts", s.dashboardPromptsHandler())
			dashboardAPI.PATCH("/prompts/:name/enabled", s.dashboardSetPromptEnabledHandler())
			dashboardAPI.GET("/resources", s.dashboardResourcesHandler())
			dashboardAPI.GET("/diagnostics", s.dashboardDiagnosticsHandler())
			dashboardAPI.GET("/observability", s.dashboardObservabilityHandler())
			dashboardAPI.GET("/lineage", s.dashboardLineageHandler())

			dashboardAPI.GET("/users", s.dashboardListUsersHandler())
			dashboardAPI.POST("/users", s.dashboardCreateUserHandler())
			dashboardAPI.PATCH("/users/:id/role", s.dashboardPatchUserRoleHandler())
			dashboardAPI.DELETE("/users/:id", s.dashboardDeleteUserHandler())

			dashboardAPI.GET("/teams", s.dashboardListTeamsHandler())
			dashboardAPI.POST("/teams", s.dashboardCreateTeamHandler())
			dashboardAPI.GET("/teams/:id", s.dashboardGetTeamHandler())
			dashboardAPI.DELETE("/teams/:id", s.dashboardDeleteTeamHandler())
			dashboardAPI.POST("/teams/:id/members", s.dashboardAddTeamMemberHandler())
			dashboardAPI.DELETE("/teams/:id/members/:userId", s.dashboardRemoveTeamMemberHandler())
			dashboardAPI.PUT("/teams/:id/assignments", s.dashboardSetTeamAssignmentsHandler())

			platformAPI := dashboardAPI.Group("/platform", s.requirePlatformAdmin())
			{
				platformAPI.GET("/tenants", s.dashboardPlatformListTenantsHandler())
				platformAPI.POST("/tenants", s.dashboardPlatformCreateTenantHandler())
				platformAPI.PATCH("/tenants/:id", s.dashboardPlatformPatchTenantHandler())
				platformAPI.POST("/tenants/:id/suspend", s.dashboardPlatformSuspendTenantHandler())
				platformAPI.POST("/tenants/:id/retire", s.dashboardPlatformRetireTenantHandler())
				platformAPI.POST("/tenants/:id/remove", s.dashboardPlatformRemoveTenantHandler())
				platformAPI.PATCH("/tenants/:id/mode", s.dashboardPlatformSetTenantModeHandler())
				platformAPI.GET("/tenants/:id/members", s.dashboardPlatformListMembersHandler())
				platformAPI.POST("/tenants/:id/members", s.dashboardPlatformAddMemberHandler())
				platformAPI.PATCH("/tenants/:id/members/:membershipId", s.dashboardPlatformPatchMemberHandler())
				platformAPI.DELETE("/tenants/:id/members/:membershipId", s.dashboardPlatformDeleteMemberHandler())
			}
		}
	}

	return r, nil
}
