package restadapter

import (
	"encoding/json"

	"sami.io/mcpgateway/internal/model"
)

// SynthesizedTool holds a REST operation converted to an MCP tool definition.
type SynthesizedTool struct {
	Name        string
	Description string
	InputSchema map[string]any
	RestMeta    model.RestOperationMeta
}

// inputSchemaProperty builds a JSON Schema property map for a primitive field.
func inputSchemaProperty(fieldType, description string, required bool, enum []string) map[string]any {
	prop := map[string]any{
		"type": fieldType,
	}
	if description != "" {
		prop["description"] = description
	}
	if len(enum) > 0 {
		prop["enum"] = enum
	}
	_ = required
	return prop
}

func buildInputSchema(properties map[string]any, required []string) map[string]any {
	schema := map[string]any{
		"type":       "object",
		"properties": properties,
	}
	if len(required) > 0 {
		schema["required"] = required
	}
	return schema
}

func schemaToJSON(schema map[string]any) ([]byte, error) {
	return json.Marshal(schema)
}
