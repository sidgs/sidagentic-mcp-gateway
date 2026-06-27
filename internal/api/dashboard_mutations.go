package api

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/types"
)

type dashboardToggleRequest struct {
	Enabled bool `json:"enabled"`
}

type dashboardRegisterServerResponse struct {
	Name                  string                                    `json:"name,omitempty"`
	Transport             string                                    `json:"transport,omitempty"`
	Enabled               bool                                      `json:"enabled,omitempty"`
	Description           string                                    `json:"description,omitempty"`
	AuthorizationRequired *types.UpstreamOAuthAuthorizationRequired `json:"authorization_required,omitempty"`
}

type dashboardOAuthSessionResponse struct {
	SessionID  string     `json:"session_id"`
	Status     string     `json:"status"`
	ServerName string     `json:"server_name,omitempty"`
	ExpiresAt  *time.Time `json:"expires_at,omitempty"`
	Error      string     `json:"error,omitempty"`
}

func (s *Server) dashboardRegisterServerHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.forbidUnlessProviderWrite(c) {
			return
		}
		var input types.RegisterServerInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		server, err := createServerModelFromInput(&input)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		ctx := c.Request.Context()
		err = s.mcpService.RegisterMcpServerWithOAuthSupport(ctx, &input, server, false, "dashboard")
		if err != nil {
			if errors.Is(err, apierrors.ErrUpstreamOAuthRequired) {
				input.OAuthRedirectURI = s.publicGatewayRoot(c) + "/dashboard/oauth/callback"
				err = s.mcpService.RegisterMcpServerWithOAuthSupport(ctx, &input, server, false, "dashboard")
			}
		}
		if err != nil {
			var oauthErr *mcp.UpstreamOAuthAuthorizationPendingError
			if errors.As(err, &oauthErr) {
				c.JSON(http.StatusAccepted, dashboardRegisterServerResponse{
					AuthorizationRequired: &types.UpstreamOAuthAuthorizationRequired{
						SessionID:        oauthErr.SessionID,
						AuthorizationURL: oauthErr.AuthorizationURL,
						ExpiresAt:        oauthErr.ExpiresAt,
					},
				})
				return
			}
			handleServiceError(c, err)
			return
		}

		c.JSON(http.StatusCreated, dashboardRegisterServerResponse{
			Name:        server.Name,
			Transport:   string(server.Transport),
			Enabled:     server.Enabled,
			Description: server.Description,
		})
	}
}

func (s *Server) dashboardDeleteServerHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.forbidUnlessProviderWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		name := c.Param("name")
		ok, err := s.canManageCatalog(c, p, types.TeamResourceServer, name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if !ok {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		if err := s.mcpService.DeregisterMcpServer(c.Request.Context(), name); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"deleted": true})
	}
}

func (s *Server) dashboardSetServerEnabledHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.forbidUnlessProviderWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		name := c.Param("name")
		ok, err := s.canManageCatalog(c, p, types.TeamResourceServer, name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if !ok {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		var input dashboardToggleRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := s.mcpService.SetDashboardServerEnabled(c.Request.Context(), c.Param("name"), input.Enabled); err != nil {
			handleServiceError(c, err)
			return
		}

		c.JSON(http.StatusOK, gin.H{"name": c.Param("name"), "enabled": input.Enabled})
	}
}

func (s *Server) dashboardSetToolEnabledHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.forbidUnlessProviderWrite(c) {
			return
		}
		var input dashboardToggleRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		entity := c.Param("name")
		ctx := c.Request.Context()
		var err error
		if input.Enabled {
			_, err = s.mcpService.EnableTools(ctx, entity)
		} else {
			_, err = s.mcpService.DisableTools(ctx, entity)
		}
		if err != nil {
			handleServiceError(c, err)
			return
		}

		c.JSON(http.StatusOK, gin.H{"name": entity, "enabled": input.Enabled})
	}
}

func (s *Server) dashboardSetPromptEnabledHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var input dashboardToggleRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		entity := c.Param("name")
		ctx := c.Request.Context()
		var err error
		if input.Enabled {
			_, err = s.mcpService.EnablePrompts(ctx, entity)
		} else {
			_, err = s.mcpService.DisablePrompts(ctx, entity)
		}
		if err != nil {
			handleServiceError(c, err)
			return
		}

		c.JSON(http.StatusOK, gin.H{"name": entity, "enabled": input.Enabled})
	}
}

func (s *Server) dashboardGetServerConfigHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		input, err := s.mcpService.DashboardServerConfig(c.Request.Context(), c.Param("name"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, input)
	}
}

func (s *Server) dashboardUpdateServerHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		var input types.RegisterServerInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		ctx := c.Request.Context()
		existing, err := s.mcpService.GetMcpServer(ctx, name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if err := mergeRegisterInputForUpdate(name, &input, existing); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		serverModel, err := createServerModelFromInput(&input)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := s.mcpService.UpdateDashboardMcpServer(ctx, name, serverModel); err != nil {
			handleServiceError(c, err)
			return
		}
		s.syncGroupsForServer(ctx, name)
		updated, err := s.mcpService.GetMcpServer(ctx, name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, dashboardRegisterServerResponse{
			Name:        updated.Name,
			Transport:   string(updated.Transport),
			Enabled:     updated.Enabled,
			Description: updated.Description,
		})
	}
}

func (s *Server) dashboardReregisterServerHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		ctx := c.Request.Context()

		if err := s.mcpService.ReregisterMcpServer(ctx, name); err != nil {
			handleServiceError(c, err)
			return
		}
		s.syncGroupsForServer(ctx, name)

		updated, err := s.mcpService.GetMcpServer(ctx, name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, dashboardRegisterServerResponse{
			Name:        updated.Name,
			Transport:   string(updated.Transport),
			Enabled:     updated.Enabled,
			Description: updated.Description,
		})
	}
}
