package model

import (
	"encoding/json"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

// Tool represents a tool provided by an MCP server.
type Tool struct {
	gorm.Model

	TenantID string `json:"tenant_id" gorm:"size:255;not null;default:sami;index"`

	// Name is just the name of the tool, without the server name prefix.
	// A tool name is unique only within the context of a server.
	// This means that two tools in sami-mcp-gateway DB CAN have the same name because
	// they belong to different servers, identified by server ID.
	Name string `json:"name" gorm:"not null"`

	// Enabled indicates whether the tool is enabled or not.
	// If a tool is disabled, it cannot be viewed or called from the MCP proxy.
	Enabled bool `json:"enabled" gorm:"default:true"`

	Description string `json:"description"`

	// InputSchema is a JSON schema that describes the input parameters for the tool.
	InputSchema datatypes.JSON `json:"input_schema" gorm:"type:jsonb"`

	// Annotations stores tool annotation hints from the upstream MCP server.
	// These hints help LLMs understand tool behavior (e.g., read-only vs destructive).
	Annotations datatypes.JSON `json:"annotations" gorm:"type:jsonb"`

	// RestOperation stores REST operation metadata for REST adapter tools.
	RestOperation datatypes.JSON `json:"rest_operation" gorm:"type:jsonb"`

	// ServerID is the ID of the MCP server that provides this tool.
	ServerID uint      `json:"-" gorm:"not null"`
	Server   McpServer `json:"-" gorm:"foreignKey:ServerID;references:ID"`
}

// GetRestOperationMeta unmarshals REST operation metadata when present.
func (t *Tool) GetRestOperationMeta() (*RestOperationMeta, error) {
	if len(t.RestOperation) == 0 {
		return nil, nil
	}
	var meta RestOperationMeta
	if err := json.Unmarshal(t.RestOperation, &meta); err != nil {
		return nil, err
	}
	return &meta, nil
}

// SetRestOperationMeta serializes REST operation metadata onto the tool row.
func (t *Tool) SetRestOperationMeta(meta *RestOperationMeta) error {
	if meta == nil {
		t.RestOperation = nil
		return nil
	}
	data, err := json.Marshal(meta)
	if err != nil {
		return err
	}
	t.RestOperation = datatypes.JSON(data)
	return nil
}
