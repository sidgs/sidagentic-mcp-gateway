package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

func (s *Server) enrichAuthStatus(c *gin.Context, resp types.DashboardAuthStatusResponse) types.DashboardAuthStatusResponse {
	if !resp.Authenticated || s.userService == nil {
		return resp
	}
	principal, err := s.buildDashboardPrincipal(c)
	if err != nil || principal == nil {
		return resp
	}
	me := s.principalToMeResponse(c, principal)
	resp.Role = me.Role
	resp.TenantID = me.TenantID
	resp.UserID = me.UserID
	resp.Teams = me.Teams
	resp.PlatformAdmin = me.PlatformAdmin
	return resp
}

func (s *Server) dashboardAuthStatusHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		loginPath := OIDCUIRootRelativePath(s.httpPathPrefix, "login")
		logoutPath := OIDCUIRootRelativePath(s.httpPathPrefix, "logout")

		if !s.oidcConfigured() {
			if s.platformJWTConfigured() {
				if sess, ok := s.validPlatformBearerFromRequest(c); ok {
					c.JSON(http.StatusOK, s.enrichAuthStatus(c, types.DashboardAuthStatusResponse{
						Authenticated: true,
						OIDCEnabled:   false,
						Email:         sess.Email,
						Sub:           sess.Sub,
					}))
					return
				}
				c.JSON(http.StatusOK, types.DashboardAuthStatusResponse{
					Authenticated: false,
					OIDCEnabled:   false,
				})
				return
			}
			c.JSON(http.StatusOK, s.enrichAuthStatus(c, types.DashboardAuthStatusResponse{
				Authenticated: true,
				OIDCEnabled:   false,
			}))
			return
		}

		if sess, ok := s.validDashboardUserFromRequest(c); ok {
			c.JSON(http.StatusOK, s.enrichAuthStatus(c, types.DashboardAuthStatusResponse{
				Authenticated: true,
				OIDCEnabled:   true,
				LogoutPath:    logoutPath,
				Email:         sess.Email,
				Sub:           sess.Sub,
			}))
			return
		}

		c.JSON(http.StatusOK, types.DashboardAuthStatusResponse{
			Authenticated: false,
			OIDCEnabled:   true,
			LoginPath:     loginPath,
		})
	}
}

func (s *Server) dashboardOverviewHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mode := c.MustGet("mode").(model.ServerMode)
		resp, err := s.dashboardService.Overview(c.Request.Context(), mode, s.publicTenantMCPRoot(c))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if s.oidcConfigured() {
			resp.OIDCLoginPath = OIDCUIRootRelativePath(s.httpPathPrefix, "login")
			resp.OIDCLogoutPath = OIDCUIRootRelativePath(s.httpPathPrefix, "logout")
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardServersHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		resp, err := s.dashboardService.Servers(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		filtered := make([]types.DashboardServer, 0, len(resp.Servers))
		for _, srv := range resp.Servers {
			ok, err := s.canSeeCatalog(c, p, types.TeamResourceServer, srv.Name)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			if ok {
				filtered = append(filtered, srv)
			}
		}
		resp.Servers = filtered
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardToolsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		resp, err := s.dashboardService.Tools(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		filtered := make([]types.DashboardTool, 0, len(resp.Tools))
		for _, tool := range resp.Tools {
			ok, err := s.inheritServerTeamVisibility(c, p, tool.Server, types.TeamResourceServer)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			if ok {
				filtered = append(filtered, tool)
			}
		}
		resp.Tools = filtered
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardPromptsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		resp, err := s.dashboardService.Prompts(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		filtered := make([]types.DashboardPrompt, 0, len(resp.Prompts))
		for _, prompt := range resp.Prompts {
			ok, err := s.inheritServerTeamVisibility(c, p, prompt.Server, types.TeamResourceServer)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			if ok {
				filtered = append(filtered, prompt)
			}
		}
		resp.Prompts = filtered
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardResourcesHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		resp, err := s.dashboardService.Resources(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		filtered := make([]types.DashboardResource, 0, len(resp.Resources))
		for _, resource := range resp.Resources {
			ok, err := s.inheritServerTeamVisibility(c, p, resource.Server, types.TeamResourceServer)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			if ok {
				filtered = append(filtered, resource)
			}
		}
		resp.Resources = filtered
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardDiagnosticsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		if !p.CanAccessSystemSection() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		mode := c.MustGet("mode").(model.ServerMode)
		resp, err := s.dashboardService.Diagnostics(c.Request.Context(), mode, s.publicTenantMCPRoot(c))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardObservabilityHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		if !p.CanAccessSystemSection() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		limit := 0
		if raw := c.Query("limit"); raw != "" {
			if _, err := fmt.Sscanf(raw, "%d", &limit); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid limit"})
				return
			}
		}
		resp, err := s.dashboardService.Observability(
			c.Request.Context(),
			c.Query("range"),
			c.Query("from"),
			c.Query("to"),
			limit,
		)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardLineageHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		if !p.CanAccessSystemSection() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		resp, err := s.dashboardService.Lineage(c.Request.Context(), c.Query("range"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}
