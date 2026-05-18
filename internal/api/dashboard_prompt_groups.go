package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/cliapp"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"gorm.io/datatypes"
)

type dashboardPromptGroupCreateRequest struct {
	Name             string   `json:"name"`
	Description      string   `json:"description"`
	Prompts          []string `json:"prompts"`
	SecurityOption   string   `json:"security_option,omitempty"`
}

type dashboardPromptGroupUpdateRequest struct {
	Description    string   `json:"description"`
	Prompts      []string `json:"prompts"`
	SecurityOption string   `json:"security_option,omitempty"`
}

type dashboardPromptGroupPrompt struct {
	Name          string `json:"name"`
	CanonicalName string `json:"canonical_name"`
	Server        string `json:"server"`
	Description   string `json:"description,omitempty"`
}

type dashboardPromptGroup struct {
	Name                   string                      `json:"name"`
	Description            string                      `json:"description,omitempty"`
	SecurityOption         string                      `json:"security_option"`
	PromptCount            int                         `json:"prompt_count"`
	Prompts                []dashboardPromptGroupPrompt `json:"prompts"`
	StreamableHTTPEndpoint string                      `json:"streamable_http_endpoint"`
	SSEEndpoint            string                      `json:"sse_endpoint"`
	SSEMessageEndpoint     string                      `json:"sse_message_endpoint"`
}

type dashboardPromptGroupsResponse struct {
	PromptGroups []dashboardPromptGroup      `json:"prompt_groups"`
	EmptyState   *types.DashboardEmptyState `json:"empty_state,omitempty"`
}

func (s *Server) dashboardPromptGroupsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		groups, err := s.promptGroupService.ListPromptGroups(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}

		resp := dashboardPromptGroupsResponse{
			PromptGroups: make([]dashboardPromptGroup, 0, len(groups)),
		}
		for _, group := range groups {
			item, err := s.buildDashboardPromptGroup(c, group)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			resp.PromptGroups = append(resp.PromptGroups, item)
		}

		if len(resp.PromptGroups) == 0 {
			resp.EmptyState = &types.DashboardEmptyState{
				Title:       "No prompt groups configured yet.",
				Description: "Create a prompt group to expose a focused subset of MCP prompts.",
				Commands: []string{
					fmt.Sprintf("%s create prompt-group --conf prompt-group.json", cliapp.ExecutableName),
					fmt.Sprintf("%s list prompt-groups", cliapp.ExecutableName),
					fmt.Sprintf("%s get prompt-group <name>", cliapp.ExecutableName),
				},
			}
		}

		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardGetPromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		group, err := s.promptGroupService.GetPromptGroup(c.Request.Context(), c.Param("name"))
		if err != nil {
			handleServiceError(c, err)
			return
		}

		resp, err := s.buildDashboardPromptGroup(c, *group)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardCreatePromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var input dashboardPromptGroupCreateRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		included, err := json.Marshal(input.Prompts)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid prompts payload"})
			return
		}

		group := &model.PromptGroup{
			Name:             input.Name,
			Description:      input.Description,
			SecurityOption:   input.SecurityOption,
			IncludedPrompts: included,
		}
		if err := s.promptGroupService.CreatePromptGroup(c.Request.Context(), group); err != nil {
			handleServiceError(c, err)
			return
		}

		resp, err := s.buildDashboardPromptGroup(c, *group)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusCreated, resp)
	}
}

func (s *Server) dashboardUpdatePromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		if name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "group name is required"})
			return
		}

		var input dashboardPromptGroupUpdateRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		included, err := json.Marshal(input.Prompts)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid prompts payload"})
			return
		}
		emptyArr, err := json.Marshal([]string{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to encode empty server lists"})
			return
		}

		group := &model.PromptGroup{
			Description:      input.Description,
			SecurityOption:   input.SecurityOption,
			IncludedPrompts:  datatypes.JSON(included),
			IncludedServers:  datatypes.JSON(emptyArr),
			ExcludedPrompts:  datatypes.JSON(emptyArr),
		}
		if _, err := s.promptGroupService.UpdatePromptGroup(c.Request.Context(), name, group); err != nil {
			handleServiceError(c, err)
			return
		}

		updated, err := s.promptGroupService.GetPromptGroup(c.Request.Context(), name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		resp, err := s.buildDashboardPromptGroup(c, *updated)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardDeletePromptGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if err := s.promptGroupService.DeletePromptGroup(c.Request.Context(), c.Param("name")); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"deleted": true})
	}
}

func (s *Server) buildDashboardPromptGroup(c *gin.Context, group model.PromptGroup) (dashboardPromptGroup, error) {
	promptNames, err := group.ResolveEffectivePrompts(c.Request.Context(), s.mcpService)
	if err != nil {
		return dashboardPromptGroup{}, err
	}

	prompts := make([]dashboardPromptGroupPrompt, 0, len(promptNames))
	for _, pname := range promptNames {
		item := dashboardPromptGroupPrompt{
			CanonicalName: pname,
			Name:          pname,
			Server:        "Unknown",
		}
		if p, err := s.mcpService.GetPrompt(c.Request.Context(), pname); err == nil {
			item.Name = p.Name
			if server, serverErr := s.mcpService.GetPromptParentServer(c.Request.Context(), pname); serverErr == nil {
				item.Server = server.Name
			}
			item.CanonicalName = pname
			item.Description = p.Description
		}
		displayName := item.Name
		parts := strings.SplitN(pname, "__", 2)
		if len(parts) == 2 {
			displayName = parts[1]
		}
		item.Name = displayName
		prompts = append(prompts, item)
	}

	ep := s.getPromptGroupEndpoints(c, group.Name)

	return dashboardPromptGroup{
		Name:                   group.Name,
		Description:            group.Description,
		SecurityOption:         types.NormalizeGroupSecurityOption(group.SecurityOption),
		PromptCount:            len(prompts),
		Prompts:                prompts,
		StreamableHTTPEndpoint: ep.StreamableHTTPEndpoint,
		SSEEndpoint:            ep.SSEEndpoint,
		SSEMessageEndpoint:     ep.SSEMessageEndpoint,
	}, nil
}

func (s *Server) promptGroupProxyPathPrefix(groupName string) string {
	return s.v0SubgroupMountBasePath("prompt-groups", groupName)
}
