package types

// AgentAppPublic is the JSON shape returned for agent-apps (no secret).
type AgentAppPublic struct {
	ID               uint     `json:"id"`
	Name             string   `json:"name"`
	Description      string   `json:"description,omitempty"`
	ClientID         string   `json:"client_id"`
	Status           string   `json:"status"`
	ToolGroupNames   []string `json:"tool_group_names"`
	PromptGroupNames []string `json:"prompt_group_names"`
}

// CreateAgentAppRequest creates an agent-app with group attachment.
// Exactly one of ToolGroupNames or PromptGroupNames must list exactly one existing group name;
// the other slice must be empty. An app cannot attach to both or to neither.
type CreateAgentAppRequest struct {
	Name             string   `json:"name"`
	Description      string   `json:"description,omitempty"`
	ToolGroupNames   []string `json:"tool_group_names,omitempty"`
	PromptGroupNames []string `json:"prompt_group_names,omitempty"`
}

// CreateAgentAppResponse returns credentials once.
type CreateAgentAppResponse struct {
	App           AgentAppPublic `json:"app"`
	ClientSecret  string         `json:"client_secret"`
	OAuthTokenURL string         `json:"oauth_token_url,omitempty"`
}

// PatchAgentAppRequest partial update. When tool_group_names and/or prompt_group_names are sent,
// the stored attachment must end as exactly one tool group or exactly one prompt group (see CreateAgentAppRequest).
// Supplying a non-empty tool_group_names clears prompt attachments; a non-empty prompt_group_names clears tool attachments.
type PatchAgentAppRequest struct {
	Name             *string   `json:"name,omitempty"`
	Description      *string   `json:"description,omitempty"`
	Status           *string   `json:"status,omitempty"`
	ToolGroupNames   *[]string `json:"tool_group_names,omitempty"`
	PromptGroupNames *[]string `json:"prompt_group_names,omitempty"`
}

// RotateAgentAppSecretResponse returns the new secret once.
type RotateAgentAppSecretResponse struct {
	ClientSecret string `json:"client_secret"`
}

// AgentAppOAuthTokenResponse is returned by client_credentials grant.
type AgentAppOAuthTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int64  `json:"expires_in"`
}
