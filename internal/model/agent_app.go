package model

import (
	"encoding/json"
	"fmt"

	"gorm.io/datatypes"
)

// AgentAppStatus controls whether an agent-app may mint tokens or call MCP.
type AgentAppStatus string

const (
	AgentAppStatusEnabled  AgentAppStatus = "enabled"
	AgentAppStatusDisabled AgentAppStatus = "disabled"
)

// AgentApp is a user-owned portal credential binding tool groups and prompt groups for MCP access.
type AgentApp struct {
	BaseModel

	TenantID         string         `json:"tenant_id" gorm:"size:255;not null;uniqueIndex:ux_agentapp_client;uniqueIndex:ux_agentapp_scope_name"`
	OwnerScopeKey      string         `json:"-" gorm:"size:768;not null;uniqueIndex:ux_agentapp_scope_name"`
	Name               string         `json:"name" gorm:"not null;uniqueIndex:ux_agentapp_scope_name"`
	Description        string         `json:"description"`
	ClientID           string         `json:"client_id" gorm:"size:128;not null;uniqueIndex:ux_agentapp_client"`
	SecretHash         string         `json:"-" gorm:"not null"`
	Status             AgentAppStatus `json:"status" gorm:"size:32;not null;default:enabled"`
	ToolGroupNames     datatypes.JSON `json:"tool_group_names" gorm:"type:jsonb"`
	PromptGroupNames   datatypes.JSON `json:"prompt_group_names" gorm:"type:jsonb"`
	SkillSetNames      datatypes.JSON `json:"skill_set_names" gorm:"type:jsonb"`
}

// GetToolGroups unmarshals tool group names attached to this app.
func (a *AgentApp) GetToolGroups() ([]string, error) {
	if a.ToolGroupNames == nil {
		return []string{}, nil
	}
	var names []string
	if err := json.Unmarshal(a.ToolGroupNames, &names); err != nil {
		return nil, fmt.Errorf("tool_group_names: %w", err)
	}
	return names, nil
}

// GetPromptGroups unmarshals prompt group names attached to this app.
func (a *AgentApp) GetPromptGroups() ([]string, error) {
	if a.PromptGroupNames == nil {
		return []string{}, nil
	}
	var names []string
	if err := json.Unmarshal(a.PromptGroupNames, &names); err != nil {
		return nil, fmt.Errorf("prompt_group_names: %w", err)
	}
	return names, nil
}

// GetSkillSets unmarshals skill set names attached to this app.
func (a *AgentApp) GetSkillSets() ([]string, error) {
	if a.SkillSetNames == nil {
		return []string{}, nil
	}
	var names []string
	if err := json.Unmarshal(a.SkillSetNames, &names); err != nil {
		return nil, fmt.Errorf("skill_set_names: %w", err)
	}
	return names, nil
}

// IsEnabled returns true when the app may authenticate MCP traffic.
func (a *AgentApp) IsEnabled() bool {
	return a.Status == AgentAppStatusEnabled
}
