package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/types"
)

func (s *Server) dashboardAuthStatusHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		loginPath := OIDCUIRootRelativePath(s.httpPathPrefix, "login")
		logoutPath := OIDCUIRootRelativePath(s.httpPathPrefix, "logout")

		if !s.oidcConfigured() {
			c.JSON(http.StatusOK, types.DashboardAuthStatusResponse{
				Authenticated: true,
				OIDCEnabled:   false,
			})
			return
		}

		if sess, ok := s.validOIDCSessionFromRequest(c); ok {
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
		resp, err := s.dashboardService.Overview(mode, s.publicGatewayRoot(c))
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
		resp, err := s.dashboardService.Diagnostics(mode, s.publicGatewayRoot(c))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}
