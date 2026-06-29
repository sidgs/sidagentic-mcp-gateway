package cmd

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/signal"
	"slices"
	"strconv"
	"strings"
	"syscall"
	"time"
	"unicode"

	"github.com/joho/godotenv"
	"github.com/mark3labs/mcp-go/server"
	"sami.io/mcpgateway/internal/api"
	"sami.io/mcpgateway/internal/db"
	"sami.io/mcpgateway/internal/dbconfig"
	"sami.io/mcpgateway/internal/registrycoord"
	"sami.io/mcpgateway/internal/registrysync"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/notifications"
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
	"sami.io/mcpgateway/internal/service/usage"
	"sami.io/mcpgateway/internal/service/user"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/version"
	"github.com/redis/go-redis/v9"
	"github.com/spf13/cobra"
)

const (
	BindPortEnvVar  = "PORT"
	BindPortDefault = "8080"

	DBUrlEnvVar            = "DATABASE_URL"
	ServerModeEnvVar       = "SERVER_MODE"
	TelemetryEnabledEnvVar = "OTEL_ENABLED"

	// HTTPPathPrefixEnvVar sets a path prefix for all HTTP routes (e.g. /ai/v1/sami-mcp-gateway).
	HTTPPathPrefixEnvVar = "HTTP_PATH_PREFIX"

	// PublicURLSchemeEnvVar optionally forces http or https for advertised MCP/dashboard URLs (behind TLS-terminated proxies without X-Forwarded-Proto).
	PublicURLSchemeEnvVar = "PUBLIC_URL_SCHEME"

	// DefaultTenantIDEnvVar selects the tenant when the X-Tenant-ID header is omitted.
	DefaultTenantIDEnvVar = "DEFAULT_TENANT_ID"

	// AgentAppJWTSigningKeyEnvVar sets the HS256 key for agent-app Bearer tokens (client_credentials). Empty disables JWT mint and Bearer JWT MCP auth.
	AgentAppJWTSigningKeyEnvVar = "AGENT_APP_JWT_SIGNING_KEY"

	// GlobalMCPAPIKeyEnvVar is required in all modes for MCP proxy and REST API authentication.
	GlobalMCPAPIKeyEnvVar = "GLOBAL_MCP_API_KEY"

	// Cognito / OIDC (optional dashboard login)
	CognitoIssuerURLEnvVar    = "COGNITO_ISSUER_URL"
	CognitoClientIDEnvVar     = "COGNITO_CLIENT_ID"
	CognitoClientSecretEnvVar = "COGNITO_CLIENT_SECRET"
	CognitoRegionEnvVar       = "COGNITO_REGION"
	// CognitoRedirectURIEnvVar optionally overrides OAuth2 redirect_uri (absolute https or http URL; must match Cognito hosted UI / app client callbacks).
	CognitoRedirectURIEnvVar = "COGNITO_REDIRECT_URI"

	// Redis (optional OIDC dashboard session backing when Cognito/OIDC login is enabled)
	RedisURLEnvVar       = "REDIS_URL"
	RedisAddrEnvVar      = "REDIS_ADDR"
	RedisPasswordEnvVar  = "REDIS_PASSWORD"
	RedisDBEnvVar        = "REDIS_DB"
	OIDCSessionTTLEnvVar = "OIDC_SESSION_TTL_SECONDS"

	// Registry sync (multi-replica in-memory proxy coherence)
	RegistrySyncEnabledEnvVar           = "REGISTRY_SYNC_ENABLED"
	RegistrySyncChannelEnvVar           = "REGISTRY_SYNC_CHANNEL"
	RegistrySyncReconcileIntervalEnvVar = "REGISTRY_SYNC_RECONCILE_INTERVAL_SEC"
	// OIDCScopesEnvVar sets OAuth2 scopes for the dashboard OIDC login flow (comma- or whitespace-separated). Empty uses server default (openid email profile). "openid" is added if omitted.
	OIDCScopesEnvVar = "OIDC_SCOPES"
	// PostLoginRedirectURLEnvVar is an optional absolute (https://…) or root-relative (/…) Location after OIDC callback success and after /logout.
	PostLoginRedirectURLEnvVar = "POST_LOGIN_REDIRECT_URL"

	// DashboardEmbedAllowedOriginsEnvVar is a comma-separated list of browser origins allowed to call /dashboard/* cross-origin (embed mode).
	DashboardEmbedAllowedOriginsEnvVar = "DASHBOARD_EMBED_ALLOWED_ORIGINS"

	// PlatformAdminListEnvVar is a comma-separated list of emails granted global platform administrator access.
	PlatformAdminListEnvVar = "PLATFORM_ADMIN_LIST"

	// JWTSecretEnvVar is the HS256 key for platform-issued UI JWTs on /dashboard/* routes.
	JWTSecretEnvVar = "JWT_SECRET"
	// PlatformJWTAudEnvVar validates the aud claim on platform UI JWTs. Empty uses default sami-cms.
	PlatformJWTAudEnvVar = "PLATFORM_JWT_AUD"
	// JWTUseUnsignedEnvVar allows alg=none platform UI JWTs when true (default true).
	JWTUseUnsignedEnvVar = "JWT_USE_UNSIGNED"

	NotificationsEnabledEnvVar      = notifications.EnvNotificationsEnabled
	NotificationsKafkaTopicEnvVar   = notifications.EnvNotificationsKafkaTopic
	NotificationsAppNameEnvVar      = notifications.EnvNotificationsAppName
	NotificationsFromEmailEnvVar    = notifications.EnvNotificationsFromEmail
	NotificationsDashboardURLEnvVar = notifications.EnvNotificationsDashboardURL
)

const (
	PostgresHostEnvVar     = "POSTGRES_HOST"
	PostgresPortEnvVar     = "POSTGRES_PORT"
	PostgresUserEnvVar     = "POSTGRES_USER"
	PostgresPasswordEnvVar = "POSTGRES_PASSWORD"
	PostgresDBEnvVar       = "POSTGRES_DB"
)

const (
	// McpServerInitReqTimeoutSecEnvVar is the environment variable for configuring
	// the MCP server initialization request timeout.
	McpServerInitReqTimeoutSecEnvVar = "MCP_SERVER_INIT_REQ_TIMEOUT_SEC"

	// McpServerInitRequestTimeoutSecondsDefault is the default timeout in seconds for MCP server initialization requests.
	McpServerInitRequestTimeoutSecondsDefault = 30

	// SessionIdleTimeoutSecEnvVar is the environment variable for configuring the idle timeout for stateful sessions.
	SessionIdleTimeoutSecEnvVar = "SESSION_IDLE_TIMEOUT_SEC"

	// SessionIdleTimeoutSecondsDefault is the default idle timeout in seconds for stateful sessions.
	SessionIdleTimeoutSecondsDefault = -1
)

// defaultOIDCSessionTTLSeconds is the cap for Cognito-backed dashboard cookie/session TTL when OIDC_SESSION_TTL_SECONDS is unset (3 days).
const defaultOIDCSessionTTLSeconds = 259200

var (
	startServerCmdBindPort          string
	startServerCmdEnterpriseEnabled bool
	startServerCmdProdEnabled       bool
)

var startServerCmd = &cobra.Command{
	Use:   "start",
	Short: "Start the SAMI MCP Gateway server",
	Long: "Starts the SAMI MCP Gateway HTTP Registry and the MCP Gateway\n\n" +
		"The server is started in development mode by default, which is ideal for running sami-mcp-gateway locally.\n" +
		"Teams & Enterprises should run sami-mcp-gateway in enterprise mode.\n" +
		"If the database is not yet initialized, startup completes initialization automatically for the selected mode.\n\n" +
		"By default, this command creates a SQLite database file in the current directory (if it doesn't already exist).\n" +
		"You can also supply a custom DSN in the DATABASE_URL environment variable.\n" +
		"eg: export DATABASE_URL='postgres://user:password@localhost:5432/sami-mcp-gateway'\n" +
		"For Postgres, you can also set individual connection details using the following environment variables:\n" +
		"POSTGRES_HOST, POSTGRES_PORT (default 5432), POSTGRES_USER (default postgres), POSTGRES_PASSWORD, POSTGRES_DB (default postgres)\n\n" +
		"You can also configure the amount of time (in seconds) sami-mcp-gateway will wait for a new MCP server's initialization before aborting it.\n" +
		"Set the MCP_SERVER_INIT_REQ_TIMEOUT_SEC environment variable to an integer (default is 30).\n" +
		"This is useful when you register a MCP server (usually stdio, like filesystem) that may take some time to start up.\n\n" +
		"Finally, you can also configure the idle timeout (in seconds) for stateful sessions.\n" +
		"Set the SESSION_IDLE_TIMEOUT_SEC environment variable to an integer (default is -1, meaning no timeout).\n" +
		"This is useful to automatically clean up idle sessions after a certain period of inactivity.",
	RunE: runStartServer,
	Annotations: map[string]string{
		"group": string(subCommandGroupBasic),
		"order": "1",
	},
}

func init() {
	startServerCmd.Flags().StringVar(
		&startServerCmdBindPort,
		"port",
		"",
		fmt.Sprintf("port to bind the HTTP server to (overrides env var %s)", BindPortEnvVar),
	)
	startServerCmd.Flags().BoolVar(
		&startServerCmdEnterpriseEnabled,
		"enterprise",
		false,
		fmt.Sprintf(
			"Run the server in Enterprise mode (ideal for teams and enterprises)."+
				" Alternatively, set the %s environment variable ('%s' | '%s')",
			ServerModeEnvVar, model.ModeDev, model.ModeEnterprise,
		),
	)
	startServerCmd.Flags().BoolVar(
		&startServerCmdProdEnabled,
		"prod",
		false,
		"[DEPRECATED] Alias for --enterprise flag.",
	)

	rootCmd.AddCommand(startServerCmd)
}

func newProxyServers() (*server.MCPServer, *server.MCPServer) {
	// Tie the advertised proxy version to the sami-mcp-gateway server version (from
	// pkg/version) so the proxies always report the same version as the host
	// process, instead of a hardcoded string.
	proxyVersion := version.GetVersion()

	mcpProxyServer := server.NewMCPServer(
		"SAMI MCP Gateway Proxy MCP Server",
		proxyVersion,
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcp.ProxyToolFilter),
	)
	sseMcpProxyServer := server.NewMCPServer(
		"SAMI MCP Gateway Proxy MCP Server for SSE transport",
		proxyVersion,
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcp.ProxyToolFilter),
	)

	return mcpProxyServer, sseMcpProxyServer
}

// getDesiredServerMode returns the desired server mode for sami-mcp-gateway server.
// unless explicitly specified, the desired mode is dev
func getDesiredServerMode(cmd *cobra.Command) (model.ServerMode, error) {
	desiredServerMode := model.ModeDev

	envMode := os.Getenv(ServerModeEnvVar)
	if envMode != "" {
		// the value of the environment variable is allowed to be case-insensitive
		envMode = strings.ToLower(envMode)

		// If user is using the deprecated 'production' mode, replace it with 'enterprise'
		if envMode == string(model.ModeProd) {
			cmd.Printf(
				"Warning: '%s' value is deprecated for env var %s, please use '%s' instead\n\n",
				model.ModeProd, ServerModeEnvVar, model.ModeEnterprise,
			)
			envMode = string(model.ModeEnterprise)
		}

		if envMode != string(model.ModeDev) && envMode != string(model.ModeEnterprise) {
			return "", fmt.Errorf(
				"invalid value for %s environment variable: '%s', valid values are '%s' and '%s'",
				ServerModeEnvVar, envMode, model.ModeDev, model.ModeEnterprise,
			)
		}

		desiredServerMode = model.ServerMode(envMode)
	}

	// If the --enterprise or --prod flag is set, it gets precedence over the environment variable
	if startServerCmdEnterpriseEnabled || startServerCmdProdEnabled {
		desiredServerMode = model.ModeEnterprise
	}
	if startServerCmdProdEnabled {
		cmd.Println("Warning: --prod flag is deprecated, please use --enterprise flag instead")
	}

	return desiredServerMode, nil
}

// normalizeServerMode treats deprecated production mode as enterprise for comparisons against stored config.
func normalizeServerMode(m model.ServerMode) model.ServerMode {
	if m == model.ModeProd {
		return model.ModeEnterprise
	}
	return m
}

// isTelemetryEnabled returns true if telemetry should be enabled.
// If an env var is specified, it takes precedence over the defaults.
// Otherwise, by default, telemetry is disabled in dev mode and enabled in enterprise mode.
func isTelemetryEnabled(desiredServerMode model.ServerMode) (bool, error) {
	telemetryEnabled := desiredServerMode == model.ModeEnterprise

	envTelemetryEnabled := os.Getenv(TelemetryEnabledEnvVar)
	if envTelemetryEnabled != "" {
		envTelemetryEnabled = strings.ToLower(envTelemetryEnabled)

		switch envTelemetryEnabled {
		case "true", "1":
			telemetryEnabled = true
		case "false", "0":
			telemetryEnabled = false
		default:
			return false, fmt.Errorf(
				"invalid value for %s environment variable: '%s', valid values are 'true' or 'false'",
				TelemetryEnabledEnvVar, envTelemetryEnabled,
			)
		}
	}

	return telemetryEnabled, nil
}

func parseEnvBoolDefault(envVar string, defaultVal bool) bool {
	raw := strings.TrimSpace(os.Getenv(envVar))
	if raw == "" {
		return defaultVal
	}
	switch strings.ToLower(raw) {
	case "1", "true", "yes", "on":
		return true
	case "0", "false", "no", "off":
		return false
	default:
		log.Printf("[server] %s=%q is not a boolean; using default %t\n", envVar, raw, defaultVal)
		return defaultVal
	}
}

// getDefaultTenantID returns the tenant id used when a request has no X-Tenant-ID header.
func getDefaultTenantID() (string, error) {
	v := strings.TrimSpace(os.Getenv(DefaultTenantIDEnvVar))
	if v == "" {
		return tenant.DefaultID, nil
	}
	if err := tenant.Validate(v); err != nil {
		return "", fmt.Errorf("invalid %s: %w", DefaultTenantIDEnvVar, err)
	}
	return v, nil
}

// getBindPort returns the TCP port to bind the sami-mcp-gateway server to
// precedence: command line flag > environment variable > default
func getBindPort() string {
	port := startServerCmdBindPort
	if port == "" {
		port = os.Getenv(BindPortEnvVar)
	}
	if port == "" {
		port = BindPortDefault
	}
	return port
}

// getEnvOrFile returns the value of the given environment variable.
// If the environment variable is not set, it checks for a corresponding
// _FILE environment variable and reads the value from the file if it exists.
// If neither is set, it returns an empty string.
// If both are set, the value of the original environment variable takes precedence.
func getEnvOrFile(envVar string) (string, error) {
	val := os.Getenv(envVar)
	if val != "" {
		return val, nil
	}

	fileEnvVar := envVar + "_FILE"
	filePath := os.Getenv(fileEnvVar)
	if filePath != "" {
		data, err := os.ReadFile(filePath)
		if err != nil {
			return "", fmt.Errorf("failed to read %s: %w", fileEnvVar, err)
		}
		return strings.TrimSpace(string(data)), nil
	}

	return "", nil
}

// parseOIDCScopesEnv reads OIDC_SCOPES (comma- or whitespace-separated).
// Empty/unset returns (nil, nil) to use server defaults (openid email profile).
// The "openid" scope is prepended when missing; it is required for the ID-token flow.
func parseOIDCScopesEnv() ([]string, error) {
	raw := strings.TrimSpace(os.Getenv(OIDCScopesEnvVar))
	if raw == "" {
		return nil, nil
	}
	parts := strings.FieldsFunc(raw, func(r rune) bool {
		return r == ',' || unicode.IsSpace(r)
	})
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p != "" {
			out = append(out, p)
		}
	}
	if len(out) == 0 {
		return nil, fmt.Errorf("%s is set but contains no scope tokens", OIDCScopesEnvVar)
	}
	const oidcScopeOpenID = "openid"
	if !slices.Contains(out, oidcScopeOpenID) {
		out = append([]string{oidcScopeOpenID}, out...)
	}
	return out, nil
}

// loadOIDCSettingsFromEnv returns optional Cognito OIDC settings.
// If none of the required variables are set, it returns (nil, nil).
// If only a subset is set, it returns an error.
func loadOIDCSettingsFromEnv() (*api.OIDCSettings, error) {
	issuer := strings.TrimSpace(os.Getenv(CognitoIssuerURLEnvVar))
	clientID := strings.TrimSpace(os.Getenv(CognitoClientIDEnvVar))
	secret, err := getEnvOrFile(CognitoClientSecretEnvVar)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", CognitoClientSecretEnvVar, err)
	}
	secret = strings.TrimSpace(secret)
	region := strings.TrimSpace(os.Getenv(CognitoRegionEnvVar))

	if issuer == "" && clientID == "" && secret == "" {
		return nil, nil
	}
	if issuer == "" || clientID == "" || secret == "" {
		return nil, fmt.Errorf(
			"partial Cognito OIDC configuration: set %s, %s, and %s together (optional: %s)",
			CognitoIssuerURLEnvVar,
			CognitoClientIDEnvVar,
			CognitoClientSecretEnvVar,
			CognitoRegionEnvVar,
		)
	}
	issuer = strings.TrimSuffix(issuer, "/")
	scopes, err := parseOIDCScopesEnv()
	if err != nil {
		return nil, err
	}
	return &api.OIDCSettings{
		IssuerURL:    issuer,
		ClientID:     clientID,
		ClientSecret: secret,
		Region:       region,
		Scopes:       scopes,
	}, nil
}

// getOIDCSessionTTL returns maximum OIDC dashboard session lifetime (seconds in env → duration).
func getOIDCSessionTTL() (time.Duration, error) {
	s := strings.TrimSpace(os.Getenv(OIDCSessionTTLEnvVar))
	if s == "" {
		return time.Duration(defaultOIDCSessionTTLSeconds) * time.Second, nil
	}
	sec, err := strconv.Atoi(s)
	if err != nil || sec < 1 {
		return 0, fmt.Errorf(
			"invalid %s: %q — use a positive integer (session TTL in seconds)",
			OIDCSessionTTLEnvVar, s,
		)
	}
	return time.Duration(sec) * time.Second, nil
}

// newRedisClientFromEnv optionally builds a Redis client from REDIS_URL or REDIS_ADDR[/password/db].
func newRedisClientFromEnv() (*redis.Client, error) {
	rawURL := strings.TrimSpace(os.Getenv(RedisURLEnvVar))
	if rawURL != "" {
		opts, err := redis.ParseURL(rawURL)
		if err != nil {
			return nil, fmt.Errorf("parse %s: %w", RedisURLEnvVar, err)
		}
		return redis.NewClient(opts), nil
	}

	addr := strings.TrimSpace(os.Getenv(RedisAddrEnvVar))
	if addr == "" {
		return nil, nil
	}

	pw, err := getEnvOrFile(RedisPasswordEnvVar)
	if err != nil {
		return nil, fmt.Errorf("read %s: %w", RedisPasswordEnvVar, err)
	}

	db := 0
	if rawDB := strings.TrimSpace(os.Getenv(RedisDBEnvVar)); rawDB != "" {
		db, err = strconv.Atoi(rawDB)
		if err != nil || db < 0 {
			return nil, fmt.Errorf("invalid %s: %q", RedisDBEnvVar, rawDB)
		}
	}

	return redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: strings.TrimSpace(pw),
		DB:       db,
	}), nil
}

type registrySyncConfig struct {
	enabled              bool
	channel              string
	reconcileIntervalSec int
}

func getRegistrySyncConfig(redisAvailable bool) registrySyncConfig {
	channel := strings.TrimSpace(os.Getenv(RegistrySyncChannelEnvVar))
	if channel == "" {
		channel = "mcp-gateway:registry:v1"
	}

	enabled := parseEnvBoolDefault(RegistrySyncEnabledEnvVar, redisAvailable)

	reconcileIntervalSec := 300
	if raw := strings.TrimSpace(os.Getenv(RegistrySyncReconcileIntervalEnvVar)); raw != "" {
		sec, err := strconv.Atoi(raw)
		if err != nil || sec < 0 {
			log.Printf(
				"[server] invalid %s=%q; using default %d (0 disables periodic reconcile)\n",
				RegistrySyncReconcileIntervalEnvVar, raw, reconcileIntervalSec,
			)
		} else {
			reconcileIntervalSec = sec
		}
	}

	return registrySyncConfig{
		enabled:              enabled,
		channel:              channel,
		reconcileIntervalSec: reconcileIntervalSec,
	}
}

func generateOriginID() string {
	host, err := os.Hostname()
	if err != nil || host == "" {
		host = "unknown"
	}
	return fmt.Sprintf("%s:%d", host, os.Getpid())
}

func initNotificationDispatcher() (*notifications.Dispatcher, error) {
	cfg, err := notifications.LoadConfigFromEnv(parseEnvBoolDefault)
	if err != nil {
		return nil, err
	}
	if !cfg.Enabled {
		d, err := notifications.NewDispatcher(cfg, notifications.NoopNotifier{})
		if err != nil {
			return nil, err
		}
		return d, nil
	}
	if err := cfg.ValidateForEnabled(); err != nil {
		return nil, err
	}
	kafkaNotifier, err := notifications.NewKafkaNotifier(cfg)
	if err != nil {
		return nil, err
	}
	log.Printf("[server] email notifications enabled (kafka topic=%q app=%q)", cfg.Topic, cfg.AppName)
	return notifications.NewDispatcher(cfg, kafkaNotifier)
}

// getPostgresDSN constructs a Postgres DSN from individual Postgres-specific environment variables & files.
// It is used to provide an alternative way to specify Postgres connection details
// in case the user doesn't want to use a full DATABASE_URL.
// If POSTGRES_HOST is not set, this function assumes that Postgres-specific env vars are not being used
// and returns ok=false.
// Other Postgres env vars are optional and have sensible defaults.
func getPostgresDSN() (string, bool, error) {
	host := os.Getenv(PostgresHostEnvVar)
	if host == "" {
		return "", false, nil
	}
	port := os.Getenv(PostgresPortEnvVar)
	if port == "" {
		port = "5432"
	}
	dbName, err := getEnvOrFile(PostgresDBEnvVar)
	if err != nil {
		return "", false, fmt.Errorf("failed to get postgres DB name: %w", err)
	}
	if dbName == "" {
		dbName = "postgres"
	}
	pgUser, err := getEnvOrFile(PostgresUserEnvVar)
	if err != nil {
		return "", false, fmt.Errorf("failed to get postgres user: %w", err)
	}
	if pgUser == "" {
		pgUser = "postgres"
	}
	password, err := getEnvOrFile(PostgresPasswordEnvVar)
	if err != nil {
		return "", false, fmt.Errorf("failed to get postgres password: %w", err)
	}
	// password can be empty, so no default value

	// todo: support sslmode param in the dsn constructed here
	dsn := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		url.QueryEscape(pgUser),
		url.QueryEscape(password),
		host,
		port,
		url.QueryEscape(dbName),
	)

	return dsn, true, nil
}

// getMcpServerInitReqTimeout returns the timeout (in seconds) for MCP server initialization requests.
// If the corresponding environment variable is not set, it returns the default value.
// If the value is invalid, it returns an error.
func getMcpServerInitReqTimeout() (int, error) {
	timeoutStr := strings.TrimSpace(os.Getenv(McpServerInitReqTimeoutSecEnvVar))
	if timeoutStr == "" {
		return McpServerInitRequestTimeoutSecondsDefault, nil
	}
	timeout, err := strconv.Atoi(timeoutStr)
	if err != nil || timeout < 1 {
		return 0, fmt.Errorf(
			"invalid value for %s: '%s', must be a positive integer", McpServerInitReqTimeoutSecEnvVar, timeoutStr,
		)
	}
	return timeout, nil
}

// getSessionIdleTimeout returns the idle timeout (in seconds) for stateful sessions.
func getSessionIdleTimeout() (int, error) {
	timeoutStr := strings.TrimSpace(os.Getenv(SessionIdleTimeoutSecEnvVar))
	if timeoutStr == "" {
		return SessionIdleTimeoutSecondsDefault, nil
	}
	timeout, err := strconv.Atoi(timeoutStr)
	if err != nil || timeout < 0 {
		return 0, fmt.Errorf(
			"invalid value for %s: '%s', must be a non-negative integer (0 = no timeout)",
			SessionIdleTimeoutSecEnvVar, timeoutStr,
		)
	}
	return timeout, nil
}

func runStartServer(cmd *cobra.Command, args []string) error {
	_ = godotenv.Load()

	var redisClient *redis.Client
	defer func() {
		if redisClient != nil {
			if err := redisClient.Close(); err != nil {
				log.Printf("[server] redis close: %v\n", err)
			}
		}
	}()

	desiredServerMode, err := getDesiredServerMode(cmd)
	if err != nil {
		return err
	}

	// Initialize metrics if enabled
	telemetryEnabled, err := isTelemetryEnabled(desiredServerMode)
	if err != nil {
		return err
	}
	otelConfig := &telemetry.Config{
		ServiceName: "sami-mcp-gateway",
		Enabled:     telemetryEnabled,
	}
	otelProviders, err := telemetry.Init(cmd.Context(), otelConfig)
	if err != nil {
		return fmt.Errorf("failed to initialize Opentelemetry providers: %v", err)
	}
	defer func() {
		if err := otelProviders.Shutdown(cmd.Context()); err != nil {
			cmd.Printf("Warning: failed to shutdown opentelemetry providers: %v\n", err)
		}
	}()

	// Create MCP metrics from the metrics providers
	// By default, a no-op metrics implementation is used, assuming metrics are disabled.
	// If metrics are enabled, then create the real metrics implementation.
	// This way, we don't have to check if metrics are enabled every time we want to record a metric.
	// Instead, the no-op implementation will simply do nothing.
	// This also avoids nil pointer dereferences in case metrics are not initialized.
	// The rest of the code can simply use the CustomMetrics interface without worrying about whether
	// metrics are enabled or not.
	mcpMetrics := telemetry.NewNoopCustomMetrics()
	if otelProviders.IsEnabled() {
		mcpMetrics, err = telemetry.NewOtelCustomMetrics(otelProviders.Meter)
		if err != nil {
			return fmt.Errorf("failed to create MCP metrics: %v", err)
		}
	}

	dsn, err := dbconfig.ResolveDSN()
	if err != nil {
		return err
	}
	dbConn, err := db.NewDBConnection(dsn)
	if err != nil {
		return err
	}
	ready, err := db.SchemaReady(dbConn)
	if err != nil {
		return fmt.Errorf("failed to check database schema: %w", err)
	}
	if !ready {
		return fmt.Errorf("database schema not initialized; run `mcpgateway migrate run` or the migrate Job before starting the server")
	}

	bindPort := getBindPort()

	mcpProxyServer, sseMcpProxyServer := newProxyServers()

	timeout, err := getMcpServerInitReqTimeout()
	if err != nil {
		return err
	}
	log.Printf("[server] timeout for initialization requests to MCP servers is %d seconds\n", timeout)

	sessionIdleTimeout, err := getSessionIdleTimeout()
	if err != nil {
		return err
	}
	if sessionIdleTimeout > 0 {
		log.Printf("[server] idle timeout for stateful sessions is %d seconds\n", sessionIdleTimeout)
	} else if sessionIdleTimeout == 0 {
		log.Printf("[server] stateful sessions will not timeout (run until server shutdown)\n")
	}

	// Create the session manager for stateful MCP connections
	sessionManager := mcp.NewSessionManager(&mcp.SessionManagerConfig{
		DB:                dbConn,
		IdleTimeoutSec:    sessionIdleTimeout,
		InitReqTimeoutSec: timeout,
	})

	mcpServiceConfig := &mcp.ServiceConfig{
		DB:                      dbConn,
		McpProxyServer:          mcpProxyServer,
		SseMcpProxyServer:       sseMcpProxyServer,
		Metrics:                 mcpMetrics,
		UsageRecorder:           usage.NewRecorder(dbConn),
		McpServerInitReqTimeout: timeout,
		SessionManager:          sessionManager,
	}
	mcpService, err := mcp.NewMCPService(mcpServiceConfig)
	if err != nil {
		return fmt.Errorf("failed to create MCP service: %v", err)
	}

	agentAppSigningKey := strings.TrimSpace(os.Getenv(AgentAppJWTSigningKeyEnvVar))
	agentAppService := agentapp.New(dbConn, agentAppSigningKey)
	if agentAppSigningKey != "" {
		log.Printf("[server] agent-app JWT signing enabled (%s is set)", AgentAppJWTSigningKeyEnvVar)
	}

	configService := config.NewServerConfigService(dbConn)
	userService := user.NewUserService(dbConn)
	teamService := team.NewService(dbConn)
	tenantRegistry := tenantregistry.NewService(dbConn)
	dashboardService := dashboard.NewService(dbConn, otelProviders.IsEnabled())

	toolGroupService, err := toolgroup.NewToolGroupService(dbConn, mcpService)
	if err != nil {
		return fmt.Errorf("failed to create Tool Group service: %v", err)
	}

	promptGroupService, err := promptgroup.NewPromptGroupService(dbConn, mcpService)
	if err != nil {
		return fmt.Errorf("failed to create Prompt Group service: %v", err)
	}

	skillService := skill.New(dbConn)
	skillSetService := skillset.New(dbConn, skillService)

	notificationDispatcher, err := initNotificationDispatcher()
	if err != nil {
		return fmt.Errorf("notifications: %w", err)
	}
	defer notificationDispatcher.Close()
	teamService.SetNotificationDispatcher(notificationDispatcher)
	tenantRegistry.SetNotificationDispatcher(notificationDispatcher)
	userService.SetNotificationDispatcher(notificationDispatcher)
	agentAppService.SetNotificationDispatcher(notificationDispatcher, userService)

	defaultTenantID, err := getDefaultTenantID()
	if err != nil {
		return err
	}

	redisClient, err = newRedisClientFromEnv()
	if err != nil {
		return err
	}

	oidcSettings, err := loadOIDCSettingsFromEnv()
	if err != nil {
		return err
	}
	var oidcSessionTTL time.Duration
	if oidcSettings != nil {
		log.Printf("[server] Cognito OIDC login enabled (issuer=%s region=%q)", oidcSettings.IssuerURL, oidcSettings.Region)
		if len(oidcSettings.Scopes) > 0 {
			log.Printf("[server] OIDC OAuth scopes: %v", oidcSettings.Scopes)
		}
		oidcSessionTTL, err = getOIDCSessionTTL()
		if err != nil {
			return err
		}
		if redisClient != nil {
			pingCtx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
			pingErr := redisClient.Ping(pingCtx).Err()
			cancel()
			if pingErr != nil {
				return fmt.Errorf("redis ping (OIDC sessions): %w", pingErr)
			}
			log.Printf("[server] OIDC dashboard sessions: Redis (max TTL %s)", oidcSessionTTL)
		} else {
			log.Printf("[server] OIDC dashboard sessions: in-process (set %s or %s for multi-replica)", RedisURLEnvVar, RedisAddrEnvVar)
		}
	}

	// create the API server
	globalMCPAPIKey := strings.TrimSpace(os.Getenv(GlobalMCPAPIKeyEnvVar))
	opts := &api.ServerOptions{
		MCPProxyServer:    mcpProxyServer,
		SseMcpProxyServer: sseMcpProxyServer,
		MCPService:        mcpService,
		GlobalMCPAPIKey:   globalMCPAPIKey,
		ConfigService:        configService,
		UserService:          userService,
		TeamService:          teamService,
		TenantRegistry:       tenantRegistry,
		ToolGroupService:      toolGroupService,
		PromptGroupService: promptGroupService,
		SkillService:       skillService,
		SkillSetService:    skillSetService,
		DashboardService:     dashboardService,
		AgentAppService:      agentAppService,
		OtelProviders:        otelProviders,
		Metrics:              mcpMetrics,
		HTTPPathPrefix:          strings.TrimSpace(os.Getenv(HTTPPathPrefixEnvVar)),
		PublicURLScheme:         strings.TrimSpace(os.Getenv(PublicURLSchemeEnvVar)),
		OIDC:                    oidcSettings,
		OIDCRedis:            redisClient,
		OIDCSessionTTL:       oidcSessionTTL,
		PostLoginRedirectURL: strings.TrimSpace(os.Getenv(PostLoginRedirectURLEnvVar)),
		CognitoOAuthRedirectURI: strings.TrimSpace(os.Getenv(CognitoRedirectURIEnvVar)),
		DefaultTenantID:      defaultTenantID,
		DashboardEmbedAllowedOrigins: strings.TrimSpace(os.Getenv(DashboardEmbedAllowedOriginsEnvVar)),
		PlatformJWTSecret:          strings.TrimSpace(os.Getenv(JWTSecretEnvVar)),
		PlatformJWTAud:             strings.TrimSpace(os.Getenv(PlatformJWTAudEnvVar)),
		PlatformJWTAllowUnsigned:   parseEnvBoolDefault(JWTUseUnsignedEnvVar, true),
	}
	s, err := api.NewServer(opts)
	if err != nil {
		return fmt.Errorf("failed to create server: %v", err)
	}

	originID := generateOriginID()
	syncCfg := getRegistrySyncConfig(redisClient != nil)
	var registryNotifier registrysync.Notifier = registrysync.NoopNotifier{}
	if syncCfg.enabled {
		if redisClient == nil {
			return fmt.Errorf(
				"%s is true but Redis is not configured (set %s or %s)",
				RegistrySyncEnabledEnvVar, RedisURLEnvVar, RedisAddrEnvVar,
			)
		}
		pingCtx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		pingErr := redisClient.Ping(pingCtx).Err()
		cancel()
		if pingErr != nil {
			return fmt.Errorf("redis ping (registry sync): %w", pingErr)
		}
		registryNotifier = registrysync.NewRedisNotifier(redisClient, syncCfg.channel, originID)
		log.Printf("[server] registry sync: Redis enabled (channel=%s, origin=%s)", syncCfg.channel, originID)
	} else {
		log.Printf("[server] registry sync: disabled (single-replica)")
	}

	mcpService.SetRegistryNotifier(registryNotifier)
	mcpService.SetOriginID(originID)
	toolGroupService.SetRegistryNotifier(registryNotifier)
	toolGroupService.SetOriginID(originID)
	promptGroupService.SetRegistryNotifier(registryNotifier)
	promptGroupService.SetOriginID(originID)

	registryCoordinator := registrycoord.NewCoordinator(
		originID,
		toolGroupService,
		promptGroupService,
		mcpService,
		s,
	)

	var registrySyncCancel context.CancelFunc
	if syncCfg.enabled {
		registrySyncCtx, cancel := context.WithCancel(context.Background())
		registrySyncCancel = cancel
		go func() {
			if err := registrysync.Subscribe(registrySyncCtx, redisClient, syncCfg.channel, func(ev registrysync.Event) {
				registryCoordinator.Handle(registrySyncCtx, ev)
			}); err != nil && !errors.Is(err, context.Canceled) {
				log.Printf("[registrysync] subscriber stopped: %v", err)
			}
		}()
		if syncCfg.reconcileIntervalSec > 0 {
			go func() {
				ticker := time.NewTicker(time.Duration(syncCfg.reconcileIntervalSec) * time.Second)
				defer ticker.Stop()
				for {
					select {
					case <-registrySyncCtx.Done():
						return
					case <-ticker.C:
						if err := registryCoordinator.FullReload(registrySyncCtx); err != nil {
							log.Printf("[registrysync] periodic reconcile: %v", err)
						}
					}
				}
			}()
			log.Printf("[server] registry sync: periodic reconcile every %ds", syncCfg.reconcileIntervalSec)
		}
	}

	// Ensure server config exists (idempotent). First startup creates dev or enterprise row.
	ctxInit := tenant.WithContext(context.Background(), defaultTenantID)
	created, err := s.BootstrapServerIfUninitialized(ctxInit, desiredServerMode)
	if err != nil {
		return fmt.Errorf("failed to initialize server: %w", err)
	}
	if created {
		log.Printf("[server] first-time initialization complete (%s mode)", desiredServerMode)
	}

	mode, err := s.GetMode()
	if err != nil {
		return fmt.Errorf("failed to get server mode: %v", err)
	}
	if normalizeServerMode(mode) != normalizeServerMode(desiredServerMode) {
		return fmt.Errorf(
			"server is already initialized in %s mode, cannot start in %s mode",
			mode, desiredServerMode,
		)
	}

	if globalMCPAPIKey == "" {
		return fmt.Errorf(
			"%s is required for MCP proxy and REST API access (/mcp, /sse, /api/v0)",
			GlobalMCPAPIKeyEnvVar,
		)
	}

	// Display startup banner when the server is started
	cmd.Print(asciiArt)
	cmd.Printf("MCP GATEWAY HTTP server listening on :%s\n\n", bindPort)

	// Create a cancellable base context for all requests - when cancelled, all active connections terminate
	requestBaseCtx, cancelRequests := context.WithCancel(context.Background())

	// Create HTTP server for graceful shutdown support
	httpServer := &http.Server{
		Addr:    ":" + bindPort,
		Handler: s.Router(),
		BaseContext: func(l net.Listener) context.Context {
			return requestBaseCtx
		},
	}

	// Register shutdown callback - cancels base context when Shutdown() is called
	httpServer.RegisterOnShutdown(func() {
		log.Println("[server] Cancelling active connections...")
		cancelRequests()
		if registrySyncCancel != nil {
			registrySyncCancel()
		}
	})

	// Channel to receive OS signals
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	// Start the server in a goroutine
	go func() {
		if err := httpServer.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("failed to run the server: %v", err)
		}
	}()

	// Block until we receive a shutdown signal
	sig := <-quit
	log.Printf("[server] Received signal %v, initiating graceful shutdown...\n", sig)

	// Gracefully shutdown the MCP service (closes all stateful sessions)
	mcpService.Shutdown()

	// Gracefully shutdown the HTTP server with a timeout
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := httpServer.Shutdown(shutdownCtx); err != nil {
		return fmt.Errorf("server forced to shutdown: %v", err)
	}

	log.Println("[server] Server gracefully stopped")
	return nil
}
