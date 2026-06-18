package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

func (s *Server) dashboardAuthStatusHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		loginPath := OIDCUIRootRelativePath(s.httpPathPrefix, "login")
		logoutPath := OIDCUIRootRelativePath(s.httpPathPrefix, "logout")

		if !s.oidcConfigured() {
			if s.platformJWTConfigured() {
				if sess, ok := s.validPlatformBearerFromRequest(c); ok {
					c.JSON(http.StatusOK, types.DashboardAuthStatusResponse{
						Authenticated: true,
						OIDCEnabled:   false,
						Email:         sess.Email,
						Sub:           sess.Sub,
					})
					return
				}
				c.JSON(http.StatusOK, types.DashboardAuthStatusResponse{
					Authenticated: false,
					OIDCEnabled:   false,
				})
				return
			}
			c.JSON(http.StatusOK, types.DashboardAuthStatusResponse{
				Authenticated: true,
				OIDCEnabled:   false,
			})
			return
		}

		if sess, ok := s.validDashboardUserFromRequest(c); ok {
			c.JSON(http.StatusOK, types.DashboardAuthStatusResponse{
				Authenticated: true,
				OIDCEnabled:   true,
				LogoutPath:    logoutPath,
				Email:         sess.Email,
				Sub:           sess.Sub,
			})
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
		resp, err := s.dashboardService.Overview(mode, s.publicTenantMCPRoot(c))
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
		resp, err := s.dashboardService.Servers()
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardToolsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		resp, err := s.dashboardService.Tools()
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardPromptsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		resp, err := s.dashboardService.Prompts()
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardResourcesHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		resp, err := s.dashboardService.Resources()
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardDiagnosticsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		mode := c.MustGet("mode").(model.ServerMode)
		resp, err := s.dashboardService.Diagnostics(mode, s.publicTenantMCPRoot(c))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardObservabilityHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		limit := 0
		if raw := c.Query("limit"); raw != "" {
			if _, err := fmt.Sscanf(raw, "%d", &limit); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid limit"})
				return
			}
		}
		resp, err := s.dashboardService.Observability(
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
		resp, err := s.dashboardService.Lineage(c.Query("range"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}
