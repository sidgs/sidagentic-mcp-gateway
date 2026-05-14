package mcp

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/mark3labs/mcp-go/client"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/apierrors"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"gorm.io/gorm"
)

// ListPrompts returns all prompts registered in the registry.
func (m *MCPService) ListPrompts(ctx context.Context) ([]model.Prompt, error) {
	var prompts []model.Prompt
	if err := m.dbTenant(ctx).Preload("Server").Find(&prompts).Error; err != nil {
		return nil, err
	}
	for i := range prompts {
		prompts[i].Name = mergeServerPromptNames(prompts[i].Server.Name, prompts[i].Name)
	}
	return prompts, nil
}

// ListPromptsByServer fetches prompts provided by an MCP server from the registry.
func (m *MCPService) ListPromptsByServer(ctx context.Context, name string) ([]model.Prompt, error) {
	if err := validateServerName(name); err != nil {
		return nil, err
	}

	s, err := m.GetMcpServer(ctx, name)
	if err != nil {
		return nil, fmt.Errorf("failed to get MCP server %s from DB: %w", name, err)
	}

	var prompts []model.Prompt
	if err := m.dbTenant(ctx).Where("server_id = ?", s.ID).Find(&prompts).Error; err != nil {
		return nil, fmt.Errorf("failed to get prompts for server %s from DB: %w", name, err)
	}

	for i := range prompts {
		prompts[i].Name = mergeServerPromptNames(s.Name, prompts[i].Name)
	}

	return prompts, nil
}

// GetPrompt fetches a prompt from the database by its canonical name.
func (m *MCPService) GetPrompt(ctx context.Context, name string) (*model.Prompt, error) {
	serverName, promptName, ok := splitServerPromptName(name)
	if !ok {
		return nil, fmt.Errorf("prompt name does not contain a %s separator: %w", serverPromptNameSep, apierrors.ErrInvalidInput)
	}

	s, err := m.GetMcpServer(ctx, serverName)
	if err != nil {
		return nil, fmt.Errorf("failed to get MCP server %s from DB: %w", serverName, err)
	}

	var prompt model.Prompt
	if err := m.dbTenant(ctx).Where("server_id = ? AND name = ?", s.ID, promptName).First(&prompt).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("prompt %s not found: %w", name, apierrors.ErrNotFound)
		}
		return nil, fmt.Errorf("failed to get prompt %s from DB: %w", name, err)
	}
	prompt.Name = name
	return &prompt, nil
}

// GetPromptWithArgs retrieves a prompt with provided arguments and returns the rendered template.
func (m *MCPService) GetPromptWithArgs(ctx context.Context, name string, args map[string]any) (*types.PromptResult, error) {
	serverName, promptName, ok := splitServerPromptName(name)
	if !ok {
		return nil, fmt.Errorf("prompt name does not contain a %s separator: %w", serverPromptNameSep, apierrors.ErrInvalidInput)
	}

	serverModel, err := m.GetMcpServer(ctx, serverName)
	if err != nil {
		return nil, fmt.Errorf(
			"failed to get details about MCP server %s from DB: %w",
			serverName,
			err,
		)
	}

	session, err := m.getSession(ctx, serverModel)
	if err != nil {
		return nil, err
	}
	defer session.closeIfApplicable()

	getPromptReq := mcp.GetPromptRequest{}
	getPromptReq.Params.Name = promptName

	stringArgs := make(map[string]string)
	for k, v := range args {
		if str, ok := v.(string); ok {
			stringArgs[k] = str
		} else {
			if jsonBytes, err := json.Marshal(v); err == nil {
				stringArgs[k] = string(jsonBytes)
			}
		}
	}
	getPromptReq.Params.Arguments = stringArgs

	getPromptResp, err := session.client.GetPrompt(ctx, getPromptReq)
	if err != nil {
		session.invalidateOnError(err)
		return nil, fmt.Errorf("failed to get prompt %s from MCP server %s: %w", promptName, serverName, err)
	}

	messages := make([]types.PromptMessage, len(getPromptResp.Messages))
	for i, msg := range getPromptResp.Messages {
		var content map[string]any
		serialized, err := json.Marshal(msg.Content)
		if err != nil {
			return nil, fmt.Errorf("failed to serialize prompt message content: %w", err)
		}
		if err = json.Unmarshal(serialized, &content); err != nil {
			return nil, fmt.Errorf("failed to deserialize prompt message content: %w", err)
		}

		messages[i] = types.PromptMessage{
			Role:    string(msg.Role),
			Content: content,
		}
	}

	metaMap := m.convertMCPMetaToMap(getPromptResp.Meta)

	result := &types.PromptResult{
		Description: getPromptResp.Description,
		Messages:    messages,
		Meta:        metaMap,
	}
	return result, nil
}

// EnablePrompts enables one or more prompts.
func (m *MCPService) EnablePrompts(ctx context.Context, entity string) ([]string, error) {
	return m.setPromptsEnabled(ctx, entity, true)
}

// DisablePrompts disables one or more prompts.
func (m *MCPService) DisablePrompts(ctx context.Context, entity string) ([]string, error) {
	return m.setPromptsEnabled(ctx, entity, false)
}

func (m *MCPService) setPromptsEnabled(ctx context.Context, entity string, enabled bool) ([]string, error) {
	serverName, promptName, ok := splitServerPromptName(entity)
	if ok {
		s, err := m.GetMcpServer(ctx, serverName)
		if err != nil {
			return nil, fmt.Errorf("failed to get MCP server %s: %w", serverName, err)
		}

		var prompt model.Prompt
		if err := m.dbTenant(ctx).Where("server_id = ? AND name = ?", s.ID, promptName).First(&prompt).Error; err != nil {
			return nil, fmt.Errorf("failed to get prompt %s: %w", entity, err)
		}

		if prompt.Enabled == enabled {
			return []string{entity}, nil
		}

		prompt.Enabled = enabled
		if err := m.dbTenant(ctx).Save(&prompt).Error; err != nil {
			return nil, fmt.Errorf("failed to set prompt %s enabled=%t: %w", entity, enabled, err)
		}

		proxyName := tenant.QualifyProxyName(s.TenantID, entity)

		if enabled {
			mcpPrompt, err := convertPromptModelToMcpObject(&prompt)
			if err != nil {
				return nil, fmt.Errorf("failed to convert prompt model to MCP object for prompt %s: %w", prompt.Name, err)
			}
			mcpPrompt.Name = proxyName

			if s.Transport == types.TransportSSE {
				m.sseMcpProxyServer.AddPrompt(mcpPrompt, m.mcpProxyPromptHandler)
			} else {
				m.mcpProxyServer.AddPrompt(mcpPrompt, m.mcpProxyPromptHandler)
			}
		} else {
			if s.Transport == types.TransportSSE {
				m.sseMcpProxyServer.DeletePrompts(proxyName)
			} else {
				m.mcpProxyServer.DeletePrompts(proxyName)
			}
		}

		return []string{entity}, nil
	}

	s, err := m.GetMcpServer(ctx, entity)
	if err != nil {
		return nil, fmt.Errorf("failed to get MCP server %s: %w", entity, err)
	}

	var prompts []model.Prompt
	if err := m.dbTenant(ctx).Where("server_id = ?", s.ID).Find(&prompts).Error; err != nil {
		return nil, fmt.Errorf("failed to get prompts for server %s: %w", entity, err)
	}

	var changedPromptNames []string
	for i := range prompts {
		if prompts[i].Enabled == enabled {
			continue
		}
		prompts[i].Enabled = enabled
		if err := m.dbTenant(ctx).Save(&prompts[i]).Error; err != nil {
			return nil, fmt.Errorf("failed to set prompt %s enabled=%t: %w", prompts[i].Name, enabled, err)
		}
		canonicalPromptName := mergeServerPromptNames(s.Name, prompts[i].Name)
		proxyName := tenant.QualifyProxyName(s.TenantID, canonicalPromptName)

		if enabled {
			mcpPrompt, err := convertPromptModelToMcpObject(&prompts[i])
			if err != nil {
				return nil, fmt.Errorf("failed to convert prompt model to MCP object for prompt %s: %w", prompts[i].Name, err)
			}
			mcpPrompt.Name = proxyName

			if s.Transport == types.TransportSSE {
				m.sseMcpProxyServer.AddPrompt(mcpPrompt, m.mcpProxyPromptHandler)
			} else {
				m.mcpProxyServer.AddPrompt(mcpPrompt, m.mcpProxyPromptHandler)
			}
		} else {
			if s.Transport == types.TransportSSE {
				m.sseMcpProxyServer.DeletePrompts(proxyName)
			} else {
				m.mcpProxyServer.DeletePrompts(proxyName)
			}
		}

		changedPromptNames = append(changedPromptNames, canonicalPromptName)
	}

	return changedPromptNames, nil
}

// registerServerPrompts fetches all prompts from an MCP server and registers them in the DB.
func (m *MCPService) registerServerPrompts(ctx context.Context, s *model.McpServer, c *client.Client) error {
	resp, err := c.ListPrompts(ctx, mcp.ListPromptsRequest{})
	if err != nil {
		return fmt.Errorf("failed to fetch prompts from MCP server %s: %w", s.Name, err)
	}
	for _, prompt := range resp.Prompts {
		canonicalPromptName := mergeServerPromptNames(s.Name, prompt.GetName())

		jsonArguments, _ := json.Marshal(prompt.Arguments)

		p := &model.Prompt{
			TenantID:    s.TenantID,
			ServerID:    s.ID,
			Name:        prompt.GetName(),
			Description: prompt.Description,
			Arguments:   jsonArguments,
		}
		if err := m.dbTenant(ctx).Create(p).Error; err != nil {
			log.Printf("[ERROR] failed to register prompt %s in DB: %v", canonicalPromptName, err)
		} else {
			prompt.Name = tenant.QualifyProxyName(s.TenantID, canonicalPromptName)

			if s.Transport == types.TransportSSE {
				m.sseMcpProxyServer.AddPrompt(prompt, m.mcpProxyPromptHandler)
			} else {
				m.mcpProxyServer.AddPrompt(prompt, m.mcpProxyPromptHandler)
			}
		}
	}
	return nil
}

// deregisterServerPrompts deletes all prompts that belong to an MCP server from the DB.
func (m *MCPService) deregisterServerPrompts(ctx context.Context, s *model.McpServer) error {
	prompts, err := m.ListPromptsByServer(ctx, s.Name)
	if err != nil {
		return fmt.Errorf("failed to list prompts for server %s: %w", s.Name, err)
	}

	result := m.dbTenant(ctx).Unscoped().Where("server_id = ?", s.ID).Delete(&model.Prompt{})
	if result.Error != nil {
		return fmt.Errorf("failed to delete prompts for server %s: %w", s.Name, result.Error)
	}

	promptNames := make([]string, len(prompts))
	for i, prompt := range prompts {
		promptNames[i] = tenant.QualifyProxyName(s.TenantID, prompt.Name)
	}

	if s.Transport == types.TransportSSE {
		m.sseMcpProxyServer.DeletePrompts(promptNames...)
	} else {
		m.mcpProxyServer.DeletePrompts(promptNames...)
	}

	return nil
}
