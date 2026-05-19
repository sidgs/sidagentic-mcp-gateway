package api

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

type dashboardAgentAppGroupEndpoints struct {
	Name                   string `json:"name"`
	StreamableHTTPEndpoint string `json:"streamable_http_endpoint"`
	SSEEndpoint            string `json:"sse_endpoint"`
	SSEMessageEndpoint     string `json:"sse_message_endpoint"`
}

type dashboardAgentApp struct {
	ID                   uint                              `json:"id"`
	Name                 string                            `json:"name"`
	Description          string                            `json:"description,omitempty"`
	ClientID             string                            `json:"client_id"`
	Status               string                            `json:"status"`
	ToolGroupNames       []string                          `json:"tool_group_names"`
	PromptGroupNames     []string                          `json:"prompt_group_names"`
	OAuthTokenURL        string                            `json:"oauth_token_url"`
	ToolGroupEndpoints   []dashboardAgentAppGroupEndpoints `json:"tool_group_endpoints"`
	PromptGroupEndpoints []dashboardAgentAppGroupEndpoints `json:"prompt_group_endpoints"`
}

type dashboardAgentAppsResponse struct {
	Apps []dashboardAgentApp `json:"apps"`
}

type dashboardAgentAppCreateRequest struct {
	Name               string   `json:"name"`
	Description        string   `json:"description,omitempty"`
	ToolGroupNames     []string `json:"tool_group_names,omitempty"`
	PromptGroupNames   []string `json:"prompt_group_names,omitempty"`
}

type dashboardAgentAppPatchRequest struct {
	Name               *string   `json:"name,omitempty"`
	Description        *string   `json:"description,omitempty"`
	Status             *string   `json:"status,omitempty"`
	ToolGroupNames     *[]string `json:"tool_group_names,omitempty"`
	PromptGroupNames   *[]string `json:"prompt_group_names,omitempty"`
}

func (s *Server) buildDashboardAgentApp(c *gin.Context, app *model.AgentApp) (dashboardAgentApp, error) {
	tg, err := app.GetToolGroups()
	if err != nil {
		return dashboardAgentApp{}, err
	}
	pg, err := app.GetPromptGroups()
	if err != nil {
		return dashboardAgentApp{}, err
	}
	out := dashboardAgentApp{
		ID:               app.ID,
		Name:             app.Name,
		Description:      app.Description,
		ClientID:         app.ClientID,
		Status:           string(app.Status),
		ToolGroupNames:   tg,
		PromptGroupNames: pg,
		OAuthTokenURL:    s.agentAppOAuthTokenURL(c),
	}
	for _, n := range tg {
		ep := s.getToolGroupEndpoints(c, n)
		out.ToolGroupEndpoints = append(out.ToolGroupEndpoints, dashboardAgentAppGroupEndpoints{
			Name:                   n,
			StreamableHTTPEndpoint: ep.StreamableHTTPEndpoint,
			SSEEndpoint:            ep.SSEEndpoint,
			SSEMessageEndpoint:     ep.SSEMessageEndpoint,
		})
	}
	for _, n := range pg {
		ep := s.getPromptGroupEndpoints(c, n)
		out.PromptGroupEndpoints = append(out.PromptGroupEndpoints, dashboardAgentAppGroupEndpoints{
			Name:                   n,
			StreamableHTTPEndpoint: ep.StreamableHTTPEndpoint,
			SSEEndpoint:            ep.SSEEndpoint,
			SSEMessageEndpoint:     ep.SSEMessageEndpoint,
		})
	}
	return out, nil
}

func (s *Server) dashboardAgentAppsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusOK, dashboardAgentAppsResponse{Apps: []dashboardAgentApp{}})
			return
		}
		scope, err := agentAppOwnerScopeFromDashboard(s, c)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		apps, err := s.agentAppService.ListByOwnerScope(c.Request.Context(), scope)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		resp := dashboardAgentAppsResponse{Apps: make([]dashboardAgentApp, 0, len(apps))}
		for i := range apps {
			item, err := s.buildDashboardAgentApp(c, &apps[i])
			if err != nil {
				handleServiceError(c, err)
				return
			}
			resp.Apps = append(resp.Apps, item)
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardCreateAgentAppHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "agent-apps are not available"})
			return
		}
		scope, err := agentAppOwnerScopeFromDashboard(s, c)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		var req dashboardAgentAppCreateRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		app, secret, err := s.agentAppService.Create(c.Request.Context(), scope, req.Name, req.Description, req.ToolGroupNames, req.PromptGroupNames)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		item, err := s.buildDashboardAgentApp(c, app)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusCreated, types.CreateAgentAppResponse{
			App: types.AgentAppPublic{
				ID:               item.ID,
				Name:             item.Name,
				Description:      item.Description,
				ClientID:         item.ClientID,
				Status:           item.Status,
				ToolGroupNames:   item.ToolGroupNames,
				PromptGroupNames: item.PromptGroupNames,
			},
			ClientSecret:  secret,
			OAuthTokenURL: item.OAuthTokenURL,
		})
	}
}

func (s *Server) dashboardPatchAgentAppHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id64 == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		scope, err := agentAppOwnerScopeFromDashboard(s, c)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		var req dashboardAgentAppPatchRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var st *model.AgentAppStatus
		if req.Status != nil {
			v := model.AgentAppStatus(strings.TrimSpace(*req.Status))
			if v != model.AgentAppStatusEnabled && v != model.AgentAppStatusDisabled {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid status"})
				return
			}
			st = &v
		}
		app, err := s.agentAppService.UpdatePatch(c.Request.Context(), uint(id64), scope, req.Name, req.Description, st, req.ToolGroupNames, req.PromptGroupNames)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		item, err := s.buildDashboardAgentApp(c, app)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, item)
	}
}

func (s *Server) dashboardDeleteAgentAppHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id64 == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		scope, err := agentAppOwnerScopeFromDashboard(s, c)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if err := s.agentAppService.Delete(c.Request.Context(), uint(id64), scope); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"deleted": true})
	}
}

func (s *Server) dashboardRotateAgentAppSecretHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id64 == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		scope, err := agentAppOwnerScopeFromDashboard(s, c)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		sec, err := s.agentAppService.RotateSecret(c.Request.Context(), uint(id64), scope)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, types.RotateAgentAppSecretResponse{ClientSecret: sec})
	}
}
