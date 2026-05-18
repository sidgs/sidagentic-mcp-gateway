package api

import (
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mcpjungle/mcpjungle/internal/agentappauth"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/internal/mcpgatewayctx"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/types"
)

// tenantMiddleware resolves the tenant from X-Tenant-ID or the server's default.
func (s *Server) tenantMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tid := strings.TrimSpace(c.GetHeader(tenant.HeaderName))
		if tid == "" {
			tid = s.defaultTenantID
		}
		if err := tenant.Validate(tid); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.Set(tenant.GinKey, tid)
		c.Request = c.Request.WithContext(tenant.WithContext(c.Request.Context(), tid))
		c.Next()
	}
}

// requireInitialized is middleware to reject requests to certain routes if the server is not initialized
func (s *Server) requireInitialized() gin.HandlerFunc {
	return func(c *gin.Context) {
		cfg, err := s.configService.GetConfig(c.Request.Context())
		if err != nil || !cfg.Initialized {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "server is not initialized"})
			return
		}
		// propagate the server mode in context for other middleware/handlers to use
		c.Set("mode", cfg.Mode)
		c.Next()
	}
}

// requireDashboardMode returns 404 if mcpjungle server is not running in development mode.
// It is mainly used for frontend routes, since frontend is currently only allowed in dev mode.
func (s *Server) requireDashboardMode() gin.HandlerFunc {
	return func(c *gin.Context) {
		mode, exists := c.Get("mode")
		if !exists {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "server mode not found in context"})
			return
		}
		currentMode, ok := mode.(model.ServerMode)
		if !ok {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "invalid server mode in context"})
			return
		}
		if currentMode != model.ModeDev {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		c.Next()
	}
}

// verifyUserAuthForAPIAccess is middleware that checks for a valid user token if the server is in enterprise mode.
// this middleware doesn't care about the role of the user, it just verifies that they're authenticated.
func (s *Server) verifyUserAuthForAPIAccess() gin.HandlerFunc {
	return func(c *gin.Context) {
		mode, exists := c.Get("mode")
		if !exists {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "server mode not found in context"})
			return
		}
		m, ok := mode.(model.ServerMode)
		if !ok {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "invalid server mode in context"})
			return
		}
		if m == model.ModeDev {
			// no auth is required in case of dev mode
			c.Next()
			return
		}

		authHeader := c.GetHeader("Authorization")
		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing access token"})
			return
		}

		// Verify that the token is valid and corresponds to a user
		authenticatedUser, err := s.userService.GetUserByAccessToken(c.Request.Context(), token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid access token: " + err.Error()})
			return
		}

		// Store user in context for potential role checks in subsequent handlers
		c.Set("user", authenticatedUser)
		c.Next()
	}
}

// requireAdminUser is middleware that ensures the authenticated user has an admin role when in enterprise mode.
// It assumes that verifyUserAuthForAPIAccess middleware has already run and set the user in context.
func (s *Server) requireAdminUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		mode, exists := c.Get("mode")
		if !exists {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "server mode not found in context"})
			return
		}
		m, ok := mode.(model.ServerMode)
		if !ok {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "invalid server mode in context"})
			return
		}
		if m == model.ModeDev {
			// no admin check is required in dev mode
			c.Next()
			return
		}

		authenticatedUser, exists := c.Get("user")
		if !exists {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "user is not authenticated"})
			return
		}

		u, ok := authenticatedUser.(*model.User)
		if ok && u.Role == types.UserRoleAdmin {
			c.Next()
			return
		}

		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "user is not authorized to perform this action"})
	}
}

// requireServerMode is middleware that checks if the server is in a specific mode.
// If not, the request is rejected with a 403 Forbidden status.
// This is useful for routes that should only be accessible in certain modes (e.g., enterprise-only features).
// NOTE: ModeProd is supported for backwards compatibility, it is equivalent to ModeEnterprise.
func (s *Server) requireServerMode(m model.ServerMode) gin.HandlerFunc {
	return func(c *gin.Context) {
		mode, exists := c.Get("mode")
		if !exists {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "server mode not found in context"})
			return
		}
		currentMode, ok := mode.(model.ServerMode)
		if !ok {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "invalid server mode in context"})
			return
		}

		if currentMode == m {
			// current mode matches the required mode, allow access
			c.Next()
			return
		}
		if model.IsEnterpriseMode(currentMode) && model.IsEnterpriseMode(m) {
			// both current and required modes are enterprise modes, allow access
			c.Next()
			return
		}
		// current mode does not match the required mode, reject the request
		c.AbortWithStatusJSON(
			http.StatusForbidden,
			gin.H{"error": fmt.Sprintf("this request is only allowed in %s mode", m)},
		)
	}
}

// checkAuthForMcpProxyAccess is middleware for MCP proxy that checks for a valid MCP client token
// if the server is in enterprise mode.
// In development mode, mcp clients do not require auth to access the MCP proxy.
//
// Enterprise mode accepts:
// - Bearer <opaque token> for legacy MCP clients (unchanged),
// - Bearer <JWT> for agent-apps (when AGENT_APP_JWT_SIGNING_KEY is set),
// - Basic base64(client_id:client_secret) for agent-apps.
//
// Agent-app credentials may only access tool-group or prompt-group MCP/SSE URLs (/v0/groups/... or /v0/prompt-groups/...).
func (s *Server) checkAuthForMcpProxyAccess() gin.HandlerFunc {
	return func(c *gin.Context) {
		mode, exists := c.Get("mode")
		if !exists {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "server mode not found in context"})
			return
		}
		m, ok := mode.(model.ServerMode)
		if !ok {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "invalid server mode in context"})
			return
		}

		// the gin context doesn't get passed down to the MCP proxy server, so we need to
		// set values in the underlying request's context to be able to access them from proxy.
		ctx := context.WithValue(c.Request.Context(), "mode", m)
		c.Request = c.Request.WithContext(ctx)

		if m == model.ModeDev {
			// no auth is required in case of dev mode
			c.Next()
			return
		}

		authHeader := strings.TrimSpace(c.GetHeader("Authorization"))
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing authorization"})
			return
		}

		fullPath := c.FullPath()

		if user, pass, ok := parseMCPBasicAuth(authHeader); ok {
			if s.agentAppService == nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization"})
				return
			}
			principal, err := s.agentAppService.ResolvePrincipalFromBasic(c.Request.Context(), user, pass)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization"})
				return
			}
			if !agentAppAllowedMCPFullPath(fullPath) {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "agent-app credentials may only access tool-group or prompt-group MCP endpoints"})
				return
			}
			ctx = injectMCPGroupRouteContext(c, c.Request.Context())
			ctx = agentappauth.WithPrincipal(ctx, principal)
			c.Request = c.Request.WithContext(ctx)
			c.Next()
			return
		}

		const bearerPrefix = "Bearer "
		if len(authHeader) > len(bearerPrefix) && strings.EqualFold(authHeader[:len(bearerPrefix)], bearerPrefix) {
			token := strings.TrimSpace(authHeader[len(bearerPrefix):])
			if token == "" {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing bearer token"})
				return
			}

			client, err := s.mcpClientService.GetClientByToken(c.Request.Context(), token)
			if err == nil {
				ctx = context.WithValue(c.Request.Context(), "client", client)
				c.Request = c.Request.WithContext(ctx)
				c.Next()
				return
			}

			if s.agentAppService == nil || !s.agentAppService.JWTConfigured() {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid MCP client token"})
				return
			}

			principal, err := s.agentAppService.ResolvePrincipalFromBearerJWT(c.Request.Context(), token)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid MCP client token"})
				return
			}
			if !agentAppAllowedMCPFullPath(fullPath) {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "agent-app credentials may only access tool-group or prompt-group MCP endpoints"})
				return
			}
			ctx = injectMCPGroupRouteContext(c, c.Request.Context())
			ctx = agentappauth.WithPrincipal(ctx, principal)
			c.Request = c.Request.WithContext(ctx)
			c.Next()
			return
		}

		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unsupported authorization scheme"})
	}
}

func parseMCPBasicAuth(authHeader string) (username, password string, ok bool) {
	const prefix = "Basic "
	if len(authHeader) < len(prefix) || !strings.EqualFold(authHeader[:len(prefix)], prefix) {
		return "", "", false
	}
	payload := strings.TrimSpace(authHeader[len(prefix):])
	raw, err := base64.StdEncoding.DecodeString(payload)
	if err != nil {
		return "", "", false
	}
	s := string(raw)
	idx := strings.IndexByte(s, ':')
	if idx < 0 {
		return "", "", false
	}
	return s[:idx], s[idx+1:], true
}

func injectMCPGroupRouteContext(c *gin.Context, ctx context.Context) context.Context {
	switch c.FullPath() {
	case V0PathPrefix + "/groups/:name/mcp",
		V0PathPrefix + "/groups/:name/sse",
		V0PathPrefix + "/groups/:name/message":
		return mcpgatewayctx.WithToolGroupRoute(ctx, c.Param("name"))
	case V0PathPrefix + "/prompt-groups/:name/mcp",
		V0PathPrefix + "/prompt-groups/:name/sse",
		V0PathPrefix + "/prompt-groups/:name/message":
		return mcpgatewayctx.WithPromptGroupRoute(ctx, c.Param("name"))
	default:
		return ctx
	}
}

func agentAppAllowedMCPFullPath(fullPath string) bool {
	switch fullPath {
	case V0PathPrefix + "/groups/:name/mcp",
		V0PathPrefix + "/groups/:name/sse",
		V0PathPrefix + "/groups/:name/message",
		V0PathPrefix + "/prompt-groups/:name/mcp",
		V0PathPrefix + "/prompt-groups/:name/sse",
		V0PathPrefix + "/prompt-groups/:name/message":
		return true
	default:
		return false
	}
}
