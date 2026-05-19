package api

import (
	"context"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/agentappauth"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/mcpgatewayctx"
	"sami.io/mcpgateway/internal/service/agentapp"
	"sami.io/mcpgateway/internal/service/promptgroup"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
)

// tenantFromPathMiddleware resolves tenant from the :tenant_id URL segment (path wins over X-Tenant-ID).
func (s *Server) tenantFromPathMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tid := strings.TrimSpace(c.Param("tenant_id"))
		if err := tenant.Validate(tid); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.Set(tenant.GinKey, tid)
		c.Request = c.Request.WithContext(tenant.WithContext(c.Request.Context(), tid))
		c.Next()
	}
}

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

// requireDashboardMode returns 404 if sami-mcp-gateway server is not running in development mode.
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

func constantTimeStringEqual(a, b string) bool {
	if len(a) != len(b) {
		return false
	}
	return subtle.ConstantTimeCompare([]byte(a), []byte(b)) == 1
}

// checkAuthForMcpProxyAccess gates the global MCP proxy (/mcp, /sse, /message).
// In development mode, no authentication is required.
// In enterprise mode, clients must send GLOBAL_MCP_API_KEY as X-API-Key or Authorization: Bearer <key>.
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

		ctx := context.WithValue(c.Request.Context(), "mode", m)
		c.Request = c.Request.WithContext(ctx)

		if m == model.ModeDev {
			c.Next()
			return
		}

		if s.globalMcpAPIKey == "" {
			c.AbortWithStatusJSON(http.StatusServiceUnavailable, gin.H{"error": "global MCP is not configured (set GLOBAL_MCP_API_KEY)"})
			return
		}

		apiKey := strings.TrimSpace(c.GetHeader("X-API-Key"))
		if apiKey != "" && constantTimeStringEqual(apiKey, s.globalMcpAPIKey) {
			nextCtx := mcpgatewayctx.WithGlobalMCPAPIKeyAuth(c.Request.Context(), true)
			c.Request = c.Request.WithContext(nextCtx)
			c.Next()
			return
		}

		authHeader := strings.TrimSpace(c.GetHeader("Authorization"))
		const bearerPrefix = "Bearer "
		if len(authHeader) > len(bearerPrefix) && strings.EqualFold(authHeader[:len(bearerPrefix)], bearerPrefix) {
			tok := strings.TrimSpace(authHeader[len(bearerPrefix):])
			if tok != "" && constantTimeStringEqual(tok, s.globalMcpAPIKey) {
				nextCtx := mcpgatewayctx.WithGlobalMCPAPIKeyAuth(c.Request.Context(), true)
				c.Request = c.Request.WithContext(nextCtx)
				c.Next()
				return
			}
		}

		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid global MCP credentials"})
	}
}

// checkAuthForGroupMcpProxyAccess requires agent-app authentication for tool- and prompt-group MCP routes in enterprise mode.
// Development mode does not require authentication (group existence is still validated).
func (s *Server) checkAuthForGroupMcpProxyAccess(toolGroup bool) gin.HandlerFunc {
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

		ctx := context.WithValue(c.Request.Context(), "mode", m)
		c.Request = c.Request.WithContext(ctx)

		name := c.Param("name")
		if name == "" {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "group name is required"})
			return
		}

		if toolGroup {
			_, err := s.toolGroupService.GetToolGroup(c.Request.Context(), name)
			if err != nil {
				if errors.Is(err, toolgroup.ErrToolGroupNotFound) {
					c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("tool group not found: %s", name)})
					return
				}
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		} else {
			_, err := s.promptGroupService.GetPromptGroup(c.Request.Context(), name)
			if err != nil {
				if errors.Is(err, promptgroup.ErrPromptGroupNotFound) {
					c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("prompt group not found: %s", name)})
					return
				}
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}

		ctx = injectMCPGroupRouteContext(c, c.Request.Context())
		c.Request = c.Request.WithContext(ctx)

		if m == model.ModeDev {
			c.Next()
			return
		}

		if s.agentAppService == nil {
			c.AbortWithStatusJSON(http.StatusServiceUnavailable, gin.H{"error": "agent-app service is not configured"})
			return
		}

		if key := strings.TrimSpace(c.GetHeader("X-API-Key")); key != "" {
			app, err := s.agentAppService.GetByClientID(c.Request.Context(), key)
			if err != nil || !app.IsEnabled() {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid x-api-key"})
				return
			}
			principal, err := agentapp.PrincipalForApp(app)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			if toolGroup && !principal.AllowsToolGroup(name) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "not authorized for this tool group"})
				return
			}
			if !toolGroup && !principal.AllowsPromptGroup(name) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "not authorized for this prompt group"})
				return
			}
			nextCtx := agentappauth.WithPrincipal(c.Request.Context(), principal)
			c.Request = c.Request.WithContext(nextCtx)
			c.Next()
			return
		}

		authHeader := strings.TrimSpace(c.GetHeader("Authorization"))
		if user, pass, ok := parseMCPBasicAuth(authHeader); ok {
			principal, err := s.agentAppService.ResolvePrincipalFromBasic(c.Request.Context(), user, pass)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization"})
				return
			}
			if toolGroup && !principal.AllowsToolGroup(name) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "not authorized for this tool group"})
				return
			}
			if !toolGroup && !principal.AllowsPromptGroup(name) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "not authorized for this prompt group"})
				return
			}
			nextCtx := agentappauth.WithPrincipal(c.Request.Context(), principal)
			c.Request = c.Request.WithContext(nextCtx)
			c.Next()
			return
		}

		const bearerPrefix = "Bearer "
		if len(authHeader) > len(bearerPrefix) && strings.EqualFold(authHeader[:len(bearerPrefix)], bearerPrefix) {
			if !s.agentAppService.JWTConfigured() {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid bearer token"})
				return
			}
			token := strings.TrimSpace(authHeader[len(bearerPrefix):])
			if token == "" {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing bearer token"})
				return
			}
			principal, err := s.agentAppService.ResolvePrincipalFromBearerJWT(c.Request.Context(), token)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid bearer token"})
				return
			}
			if toolGroup && !principal.AllowsToolGroup(name) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "not authorized for this tool group"})
				return
			}
			if !toolGroup && !principal.AllowsPromptGroup(name) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "not authorized for this prompt group"})
				return
			}
			nextCtx := agentappauth.WithPrincipal(c.Request.Context(), principal)
			c.Request = c.Request.WithContext(nextCtx)
			c.Next()
			return
		}

		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing agent-app authentication (x-api-key, basic, or bearer)"})
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
	fp := c.FullPath()
	switch {
	case strings.HasSuffix(fp, V0PathPrefix+"/groups/:name/mcp"),
		strings.HasSuffix(fp, V0PathPrefix+"/groups/:name/sse"),
		strings.HasSuffix(fp, V0PathPrefix+"/groups/:name/message"):
		return mcpgatewayctx.WithToolGroupRoute(ctx, c.Param("name"))
	case strings.HasSuffix(fp, V0PathPrefix+"/prompt-groups/:name/mcp"),
		strings.HasSuffix(fp, V0PathPrefix+"/prompt-groups/:name/sse"),
		strings.HasSuffix(fp, V0PathPrefix+"/prompt-groups/:name/message"):
		return mcpgatewayctx.WithPromptGroupRoute(ctx, c.Param("name"))
	default:
		return ctx
	}
}
