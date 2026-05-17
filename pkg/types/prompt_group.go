package types

// PromptGroup is a named subset of MCP prompts for a dedicated proxy URL.
type PromptGroup struct {
	Name            string   `json:"name"`
	IncludedPrompts []string `json:"included_prompts,omitempty"`
	IncludedServers []string `json:"included_servers,omitempty"`
	ExcludedPrompts []string `json:"excluded_prompts,omitempty"`
	Description     string   `json:"description"`
}

// CreatePromptGroupResponse returns transport endpoints for a newly created prompt group.
type CreatePromptGroupResponse struct {
	*ToolGroupEndpoints
}

type GetPromptGroupResponse struct {
	*PromptGroup
	*ToolGroupEndpoints
}

// UpdatePromptGroupResponse compares old and new prompt group configuration after update.
type UpdatePromptGroupResponse struct {
	Name string `json:"name"`
	Old  *PromptGroup `json:"old"`
	New  *PromptGroup `json:"new"`
}
