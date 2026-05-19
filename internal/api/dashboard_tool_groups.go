package api

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/datatypes"
)

type dashboardToolGroupCreateRequest struct {
	Name             string   `json:"name"`
	Description      string   `json:"description"`
	Tools            []string `json:"tools"`
	SecurityOption   string   `json:"security_option,omitempty"`
}

// dashboardToolGroupUpdateRequest is the JSON body for PUT /dashboard/tool-groups/:name (dashboard-only curated lists).
type dashboardToolGroupUpdateRequest struct {
	Description    string   `json:"description"`
	Tools          []string `json:"tools"`
	SecurityOption string   `json:"security_option,omitempty"`
}

type dashboardToolGroupTool struct {
	Name          string `json:"name"`
	CanonicalName string `json:"canonical_name"`
	Server        string `json:"server"`
	Description   string `json:"description,omitempty"`
}

type dashboardToolGroup struct {
	Name                   string                   `json:"name"`
	Description            string                   `json:"description,omitempty"`
	SecurityOption         string                   `json:"security_option"`
	ToolCount              int                      `json:"tool_count"`
	Tools                  []dashboardToolGroupTool `json:"tools"`
	StreamableHTTPEndpoint string                   `json:"streamable_http_endpoint"`
	SSEEndpoint            string                   `json:"sse_endpoint"`
	SSEMessageEndpoint     string                   `json:"sse_message_endpoint"`
}

type dashboardToolGroupsResponse struct {
	ToolGroups []dashboardToolGroup       `json:"tool_groups"`
	EmptyState *types.DashboardEmptyState `json:"empty_state,omitempty"`
}

func (s *Server) dashboardToolGroupsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		groups, err := s.toolGroupService.ListToolGroups(ctx)
		if err != nil {
			handleServiceError(c, err)
			return
		}

		resp := dashboardToolGroupsResponse{
			ToolGroups: make([]dashboardToolGroup, 0, len(groups)),
		}
		for _, group := range groups {
			item, err := s.buildDashboardToolGroup(c, group)
			if err != nil {
				handleServiceError(c, err)
				return
			}
			resp.ToolGroups = append(resp.ToolGroups, item)
		}

		if len(resp.ToolGroups) == 0 {
			resp.EmptyState = &types.DashboardEmptyState{
				Title:       "No tool groups configured yet.",
				Description: "Create a tool group to expose a focused subset of MCP tools.",
				Commands: []string{
					// fmt.Sprintf("%s create group --conf group.json", cliapp.ExecutableName),
					// fmt.Sprintf("%s list groups", cliapp.ExecutableName),
					// fmt.Sprintf("%s get group <group-name>", cliapp.ExecutableName),
				},
			}
		}

		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardGetToolGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		group, err := s.toolGroupService.GetToolGroup(c.Request.Context(), c.Param("name"))
		if err != nil {
			handleServiceError(c, err)
			return
		}

		resp, err := s.buildDashboardToolGroup(c, *group)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardCreateToolGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var input dashboardToolGroupCreateRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		includedTools, err := json.Marshal(input.Tools)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid tools payload"})
			return
		}

		group := &model.ToolGroup{
			Name:             input.Name,
			Description:      input.Description,
			SecurityOption:   input.SecurityOption,
			IncludedTools:    includedTools,
		}
		if err := s.toolGroupService.CreateToolGroup(c.Request.Context(), group); err != nil {
			handleServiceError(c, err)
			return
		}

		resp, err := s.buildDashboardToolGroup(c, *group)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusCreated, resp)
	}
}

func (s *Server) dashboardUpdateToolGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Param("name")
		if name == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "group name is required"})
			return
		}

		var input dashboardToolGroupUpdateRequest
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		includedTools, err := json.Marshal(input.Tools)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid tools payload"})
			return
		}
		emptyArr, err := json.Marshal([]string{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to encode empty server lists"})
			return
		}

		group := &model.ToolGroup{
			Description:      input.Description,
			SecurityOption:   input.SecurityOption,
			IncludedTools:    datatypes.JSON(includedTools),
			IncludedServers:  datatypes.JSON(emptyArr),
			ExcludedTools:    datatypes.JSON(emptyArr),
		}
		if _, err := s.toolGroupService.UpdateToolGroup(c.Request.Context(), name, group); err != nil {
			handleServiceError(c, err)
			return
		}

		updated, err := s.toolGroupService.GetToolGroup(c.Request.Context(), name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		resp, err := s.buildDashboardToolGroup(c, *updated)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardDeleteToolGroupHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if err := s.toolGroupService.DeleteToolGroup(c.Request.Context(), c.Param("name")); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"deleted": true})
	}
}

func (s *Server) buildDashboardToolGroup(c *gin.Context, group model.ToolGroup) (dashboardToolGroup, error) {
	toolNames, err := group.ResolveEffectiveTools(c.Request.Context(), s.mcpService)
	if err != nil {
		return dashboardToolGroup{}, err
	}

	tools := make([]dashboardToolGroupTool, 0, len(toolNames))
	for _, toolName := range toolNames {
		item := dashboardToolGroupTool{
			CanonicalName: toolName,
			Name:          toolName,
			Server:        "Unknown",
		}
		if tool, err := s.mcpService.GetTool(c.Request.Context(), toolName); err == nil {
			item.Name = tool.Name
			if server, serverErr := s.mcpService.GetToolParentServer(c.Request.Context(), toolName); serverErr == nil {
				item.Server = server.Name
			}
			item.CanonicalName = toolName
			item.Description = tool.Description
		}
		respName := item.Name
		parts := strings.SplitN(toolName, "__", 2)
		if len(parts) == 2 {
			respName = parts[1]
		}
		item.Name = respName
		tools = append(tools, item)
	}

	endpoints := s.getToolGroupEndpoints(c, group.Name)

	return dashboardToolGroup{
		Name:                   group.Name,
		Description:            group.Description,
		SecurityOption:         types.NormalizeGroupSecurityOption(group.SecurityOption),
		ToolCount:              len(tools),
		Tools:                  tools,
		StreamableHTTPEndpoint: endpoints.StreamableHTTPEndpoint,
		SSEEndpoint:            endpoints.SSEEndpoint,
		SSEMessageEndpoint:     endpoints.SSEMessageEndpoint,
	}, nil
}
