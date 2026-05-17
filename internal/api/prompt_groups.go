package api

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
	"github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/types"
)

func (s *Server) createPromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var input model.PromptGroup
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := s.promptGroupService.CreatePromptGroup(c.Request.Context(), &input); err != nil {
			handleServiceError(c, err)
			return
		}
		resp := &types.CreatePromptGroupResponse{
			ToolGroupEndpoints: s.getPromptGroupEndpoints(c, input.Name),
		}
		c.JSON(http.StatusCreated, resp)
	}
}

func (s *Server) listPromptGroupsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		groups, err := s.promptGroupService.ListPromptGroups(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}

		resp := make([]*types.PromptGroup, len(groups))
		for i := range groups {
			pg, err := promptGroupModelToPromptGroupType(&groups[i])
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			resp[i] = pg
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) getPromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		if name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "name is required"})
			return
		}

		group, err := s.promptGroupService.GetPromptGroup(c.Request.Context(), name)
		if err != nil {
			handleServiceError(c, err)
			return
		}

		base, err := promptGroupModelToPromptGroupType(group)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		resp := &types.GetPromptGroupResponse{
			PromptGroup:        base,
			ToolGroupEndpoints: s.getPromptGroupEndpoints(c, group.Name),
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) getPromptGroupEffectivePromptsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		if name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "name is required"})
			return
		}

		prompts, err := s.promptGroupService.ResolveEffectivePrompts(c.Request.Context(), name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"prompts": prompts})
	}
}

func (s *Server) deletePromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		if name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "name is required"})
			return
		}

		if err := s.promptGroupService.DeletePromptGroup(c.Request.Context(), name); err != nil {
			handleServiceError(c, err)
			return
		}
		c.Status(http.StatusNoContent)
	}
}

func (s *Server) updatePromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		if name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "group name is required"})
			return
		}

		var input model.PromptGroup
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		originalConf, err := s.promptGroupService.UpdatePromptGroup(c.Request.Context(), name, &input)
		if err != nil {
			handleServiceError(c, err)
			return
		}

		oldTG, err := promptGroupModelToPromptGroupType(originalConf)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		newTG, err := promptGroupModelToPromptGroupType(&input)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		resp := &types.UpdatePromptGroupResponse{
			Name: name,
			Old:  oldTG,
			New:  newTG,
		}
		if resp.Old != nil {
			resp.Old.Name = originalConf.Name
		}
		if resp.New != nil {
			resp.New.Name = name
		}

		c.JSON(http.StatusOK, resp)
	}
}

func promptGroupModelToPromptGroupType(g *model.PromptGroup) (*types.PromptGroup, error) {
	out := &types.PromptGroup{
		Name:        g.Name,
		Description: g.Description,
	}
	var err error
	out.IncludedPrompts, err = g.GetPrompts()
	if err != nil {
		return nil, fmt.Errorf("included_prompts: %w", err)
	}
	out.IncludedServers, err = g.GetServers()
	if err != nil {
		return nil, fmt.Errorf("included_servers: %w", err)
	}
	out.ExcludedPrompts, err = g.GetExcludedPrompts()
	if err != nil {
		return nil, fmt.Errorf("excluded_prompts: %w", err)
	}
	return out, nil
}

func (s *Server) promptGroupMCPServerCallHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		groupName := c.Param("name")
		tid := tenant.MustFromContext(c.Request.Context())
		srv, ok := s.promptGroupService.GetPromptGroupMCPServer(tid, groupName)
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("prompt group not found: %s", groupName)})
			return
		}
		server.NewStreamableHTTPServer(srv).ServeHTTP(c.Writer, c.Request)
	}
}

func (s *Server) getPromptGroupSseServer(c *gin.Context, groupName string) (*server.SSEServer, error) {
	tid := tenant.MustFromContext(c.Request.Context())
	cacheKey := tenant.PromptGroupMapKey(tid, groupName)

	if v, ok := s.promptGroupSseServers.Load(cacheKey); ok {
		return v.(*server.SSEServer), nil
	}

	mcpSrv, ok := s.promptGroupService.GetPromptGroupSseMCPServer(tid, groupName)
	if !ok {
		return nil, fmt.Errorf("prompt group not found: %s", groupName)
	}

	sse := server.NewSSEServer(
		mcpSrv,
		server.WithDynamicBasePath(func(r *http.Request, sessionID string) string {
			return s.promptGroupProxyPathPrefix(groupName)
		}),
	)
	s.promptGroupSseServers.Store(cacheKey, sse)
	return sse, nil
}

func (s *Server) promptGroupSseHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		sseSrv, err := s.getPromptGroupSseServer(c, name)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("failed to get sse server for prompt group %s: %v", name, err)})
			return
		}
		sseSrv.SSEHandler().ServeHTTP(c.Writer, c.Request)
	}
}

func (s *Server) promptGroupSseMessageHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		sseSrv, err := s.getPromptGroupSseServer(c, name)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": fmt.Sprintf("failed to get sse message handler for prompt group: %s", name)})
			return
		}
		sseSrv.MessageHandler().ServeHTTP(c.Writer, c.Request)
	}
}

func (s *Server) getPromptGroupEndpoints(c *gin.Context, groupName string) *types.ToolGroupEndpoints {
	scheme := s.publicSchemeForURLs(c)
	basePath := s.promptGroupProxyPathPrefix(groupName)
	u := &url.URL{Scheme: scheme, Host: c.Request.Host, Path: basePath}
	base := u.String()

	return &types.ToolGroupEndpoints{
		StreamableHTTPEndpoint: base + "/mcp",
		SSEEndpoint:            base + "/sse",
		SSEMessageEndpoint:     base + "/message",
	}
}
