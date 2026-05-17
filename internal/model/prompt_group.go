package model

import (
	"context"
	"encoding/json"
	"fmt"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

// PromptResolver defines the interface needed to resolve prompts by server.
type PromptResolver interface {
	// ListPromptsByServer returns prompts for the given MCP server name (canonical merged names server__prompt).
	ListPromptsByServer(ctx context.Context, serverName string) ([]Prompt, error)
}

// PromptGroup represents a subset of MCP prompts exposed on a dedicated proxy endpoint.
type PromptGroup struct {
	gorm.Model

	TenantID string `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_promptgroup_tenant_name"`

	Name        string `json:"name" gorm:"uniqueIndex:ux_promptgroup_tenant_name; not null"`
	Description string `json:"description"`

	IncludedPrompts datatypes.JSON `json:"included_prompts" gorm:"type:jsonb"`
	IncludedServers datatypes.JSON `json:"included_servers" gorm:"type:jsonb"`
	ExcludedPrompts datatypes.JSON `json:"excluded_prompts" gorm:"type:jsonb"`
}

// GetPrompts unmarshals IncludedPrompts into canonical prompt names (e.g. server__name).
func (g *PromptGroup) GetPrompts() ([]string, error) {
	if g.IncludedPrompts == nil {
		return []string{}, nil
	}
	var prompts []string
	err := json.Unmarshal(g.IncludedPrompts, &prompts)
	return prompts, err
}

// GetServers unmarshals IncludedServers.
func (g *PromptGroup) GetServers() ([]string, error) {
	if g.IncludedServers == nil {
		return []string{}, nil
	}
	var servers []string
	err := json.Unmarshal(g.IncludedServers, &servers)
	return servers, err
}

// GetExcludedPrompts unmarshals ExcludedPrompts.
func (g *PromptGroup) GetExcludedPrompts() ([]string, error) {
	if g.ExcludedPrompts == nil {
		return []string{}, nil
	}
	var prompts []string
	err := json.Unmarshal(g.ExcludedPrompts, &prompts)
	return prompts, err
}

// ResolveEffectivePrompts combines included_prompts, prompts from included_servers, minus excluded_prompts.
func (g *PromptGroup) ResolveEffectivePrompts(ctx context.Context, mcp PromptResolver) ([]string, error) {
	effective := make(map[string]bool)

	includedPrompts, err := g.GetPrompts()
	if err != nil {
		return nil, fmt.Errorf("failed to get included prompts: %w", err)
	}
	for _, p := range includedPrompts {
		effective[p] = true
	}

	includedServers, err := g.GetServers()
	if err != nil {
		return nil, fmt.Errorf("failed to get included servers: %w", err)
	}
	for _, serverName := range includedServers {
		serverPrompts, err := mcp.ListPromptsByServer(ctx, serverName)
		if err != nil {
			return nil, fmt.Errorf("failed to get prompts for server %s: %w", serverName, err)
		}
		for _, p := range serverPrompts {
			effective[p.Name] = true
		}
	}

	excluded, err := g.GetExcludedPrompts()
	if err != nil {
		return nil, fmt.Errorf("failed to get excluded prompts: %w", err)
	}
	for _, p := range excluded {
		delete(effective, p)
	}

	result := make([]string, 0, len(effective))
	for p := range effective {
		result = append(result, p)
	}
	return result, nil
}
