package api

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/apierrors"
	"github.com/mcpjungle/mcpjungle/pkg/types"
)

func ownerScopeKeyFromUser(u *model.User) string {
	return "user:" + strconv.FormatUint(uint64(u.ID), 10)
}

func (s *Server) agentAppOwnerScopeFromAPIUser(c *gin.Context) (string, error) {
	mode := c.MustGet("mode").(model.ServerMode)
	if mode == model.ModeDev {
		return "dev:api", nil
	}
	uVal, ok := c.Get("user")
	if !ok {
		return "", fmt.Errorf("unauthenticated")
	}
	u := uVal.(*model.User)
	return ownerScopeKeyFromUser(u), nil
}

func agentAppModelToPublic(a *model.AgentApp) (types.AgentAppPublic, error) {
	tg, err := a.GetToolGroups()
	if err != nil {
		return types.AgentAppPublic{}, err
	}
	pg, err := a.GetPromptGroups()
	if err != nil {
		return types.AgentAppPublic{}, err
	}
	return types.AgentAppPublic{
		ID:               a.ID,
		Name:             a.Name,
		Description:      a.Description,
		ClientID:         a.ClientID,
		Status:           string(a.Status),
		ToolGroupNames:   tg,
		PromptGroupNames: pg,
	}, nil
}

func (s *Server) agentAppOAuthTokenURL(c *gin.Context) string {
	prefix := NormalizeHTTPPathPrefix(s.httpPathPrefix)
	rawPath := prefix + V0ApiPathPrefix + "/agent-apps/oauth/token"
	u := url.URL{
		Scheme: s.publicSchemeForURLs(c),
		Host:   c.Request.Host,
		Path:   rawPath,
	}
	return u.String()
}

func (s *Server) agentAppOAuthTokenHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil || !s.agentAppService.JWTConfigured() {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "agent-app JWT signing is not configured"})
			return
		}
		grant := strings.TrimSpace(c.PostForm("grant_type"))
		clientID := strings.TrimSpace(c.PostForm("client_id"))
		clientSecret := c.PostForm("client_secret")
		if grant == "" && strings.Contains(strings.ToLower(c.GetHeader("Content-Type")), "application/json") {
			var body struct {
				GrantType    string `json:"grant_type"`
				ClientID     string `json:"client_id"`
				ClientSecret string `json:"client_secret"`
			}
			if err := c.ShouldBindJSON(&body); err == nil {
				grant = strings.TrimSpace(body.GrantType)
				clientID = strings.TrimSpace(body.ClientID)
				clientSecret = body.ClientSecret
			}
		}
		if grant != "client_credentials" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "unsupported grant_type"})
			return
		}
		app, err := s.agentAppService.AuthenticateClientCredentials(c.Request.Context(), clientID, clientSecret)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid_client"})
			return
		}
		if !app.IsEnabled() {
			c.JSON(http.StatusForbidden, gin.H{"error": "agent-app is disabled"})
			return
		}
		tok, exp, err := s.agentAppService.MintAccessToken(app)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, types.AgentAppOAuthTokenResponse{
			AccessToken: tok,
			TokenType:   "Bearer",
			ExpiresIn:   exp,
		})
	}
}

func (s *Server) createAgentAppHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "agent-apps are not available"})
			return
		}
		ownerScope, err := s.agentAppOwnerScopeFromAPIUser(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		var req types.CreateAgentAppRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		app, secret, err := s.agentAppService.Create(c.Request.Context(), ownerScope, req.Name, req.Description, req.ToolGroupNames, req.PromptGroupNames)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		pub, err := agentAppModelToPublic(app)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		resp := types.CreateAgentAppResponse{
			App:           pub,
			ClientSecret:  secret,
			OAuthTokenURL: s.agentAppOAuthTokenURL(c),
		}
		c.JSON(http.StatusCreated, resp)
	}
}

func (s *Server) listAgentAppsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusOK, []types.AgentAppPublic{})
			return
		}
		ownerScope, err := s.agentAppOwnerScopeFromAPIUser(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		apps, err := s.agentAppService.ListByOwnerScope(c.Request.Context(), ownerScope)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		out := make([]types.AgentAppPublic, 0, len(apps))
		for i := range apps {
			pub, err := agentAppModelToPublic(&apps[i])
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			out = append(out, pub)
		}
		c.JSON(http.StatusOK, out)
	}
}

func (s *Server) getAgentAppHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		ownerScope, err := s.agentAppOwnerScopeFromAPIUser(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		app, err := s.agentAppService.GetOwned(c.Request.Context(), uint(id), ownerScope)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		pub, err := agentAppModelToPublic(app)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, pub)
	}
}

func (s *Server) patchAgentAppHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		ownerScope, err := s.agentAppOwnerScopeFromAPIUser(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		var req types.PatchAgentAppRequest
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
		app, err := s.agentAppService.UpdatePatch(c.Request.Context(), uint(id), ownerScope, req.Name, req.Description, st, req.ToolGroupNames, req.PromptGroupNames)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		pub, err := agentAppModelToPublic(app)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, pub)
	}
}

func (s *Server) deleteAgentAppHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		ownerScope, err := s.agentAppOwnerScopeFromAPIUser(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		if err := s.agentAppService.Delete(c.Request.Context(), uint(id), ownerScope); err != nil {
			handleServiceError(c, err)
			return
		}
		c.Status(http.StatusNoContent)
	}
}

func (s *Server) rotateAgentAppSecretHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.agentAppService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		ownerScope, err := s.agentAppOwnerScopeFromAPIUser(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		sec, err := s.agentAppService.RotateSecret(c.Request.Context(), uint(id), ownerScope)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, types.RotateAgentAppSecretResponse{ClientSecret: sec})
	}
}

func agentAppOwnerScopeFromDashboard(s *Server, c *gin.Context) (string, error) {
	if sess, ok := s.validOIDCSessionFromRequest(c); ok {
		return "oidc:" + sess.Sub, nil
	}
	mode := c.MustGet("mode").(model.ServerMode)
	if mode == model.ModeDev {
		return "dev:dashboard", nil
	}
	return "", fmt.Errorf("dashboard session required: %w", apierrors.ErrUnauthorized)
}
