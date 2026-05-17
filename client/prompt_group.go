package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/mcpjungle/mcpjungle/pkg/types"
)

// CreatePromptGroup registers a prompt group subset.
func (c *Client) CreatePromptGroup(group *types.PromptGroup) (*types.CreatePromptGroupResponse, error) {
	u, _ := c.constructAPIEndpoint("/prompt-groups")
	body, err := json.Marshal(group)
	if err != nil {
		return nil, err
	}
	req, err := c.newRequest(http.MethodPost, u, bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create request to %s: %w", u, err)
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request to %s: %w", u, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusCreated {
		return nil, c.parseErrorResponse(resp)
	}
	var out types.CreatePromptGroupResponse
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}
	return &out, nil
}

// DeletePromptGroup removes a prompt group by name.
func (c *Client) DeletePromptGroup(name string) error {
	u, _ := c.constructAPIEndpoint("/prompt-groups/" + name)
	req, err := c.newRequest(http.MethodDelete, u, nil)
	if err != nil {
		return fmt.Errorf("failed to create request to %s: %w", u, err)
	}
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("failed to send request to %s: %w", u, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusNoContent {
		return c.parseErrorResponse(resp)
	}
	return nil
}

// ListPromptGroups lists all prompt groups.
func (c *Client) ListPromptGroups() ([]types.PromptGroup, error) {
	u, _ := c.constructAPIEndpoint("/prompt-groups")
	req, err := c.newRequest(http.MethodGet, u, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request to %s: %w", u, err)
	}
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request to %s: %w", u, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, c.parseErrorResponse(resp)
	}
	var groups []types.PromptGroup
	if err := json.NewDecoder(resp.Body).Decode(&groups); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}
	return groups, nil
}

// GetPromptGroup returns metadata and MCP endpoints for a prompt group.
func (c *Client) GetPromptGroup(name string) (*types.GetPromptGroupResponse, error) {
	u, _ := c.constructAPIEndpoint("/prompt-groups/" + name)
	req, err := c.newRequest(http.MethodGet, u, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request to %s: %w", u, err)
	}
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request to %s: %w", u, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, c.parseErrorResponse(resp)
	}
	var g types.GetPromptGroupResponse
	if err := json.NewDecoder(resp.Body).Decode(&g); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}
	return &g, nil
}

// GetPromptGroupEffectivePrompts returns resolved canonical prompt names for a prompt group.
func (c *Client) GetPromptGroupEffectivePrompts(name string) ([]string, error) {
	u, _ := c.constructAPIEndpoint("/prompt-groups/" + name + "/effective-prompts")
	req, err := c.newRequest(http.MethodGet, u, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request to %s: %w", u, err)
	}
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request to %s: %w", u, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, c.parseErrorResponse(resp)
	}
	var out struct {
		Prompts []string `json:"prompts"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&out); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}
	return out.Prompts, nil
}

// UpdatePromptGroup updates an existing prompt group.
func (c *Client) UpdatePromptGroup(group *types.PromptGroup) (*types.UpdatePromptGroupResponse, error) {
	u, _ := c.constructAPIEndpoint("/prompt-groups/" + group.Name)
	body, err := json.Marshal(group)
	if err != nil {
		return nil, err
	}
	req, err := c.newRequest(http.MethodPut, u, bytes.NewBuffer(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create request to %s: %w", u, err)
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request to %s: %w", u, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, c.parseErrorResponse(resp)
	}
	var upd types.UpdatePromptGroupResponse
	if err := json.NewDecoder(resp.Body).Decode(&upd); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}
	return &upd, nil
}

// GetPromptGroupConfigs is a helper for export; wraps ListPromptGroups.
func (c *Client) GetPromptGroupConfigs() ([]types.PromptGroup, error) {
	return c.ListPromptGroups()
}
