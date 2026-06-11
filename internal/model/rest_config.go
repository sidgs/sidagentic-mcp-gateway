package model

import (
	"encoding/json"
	"errors"

	"sami.io/mcpgateway/pkg/types"
)

// RestAuthConfig configures upstream authentication for REST-backed servers.
type RestAuthConfig struct {
	Type         types.RestAuthType `json:"type,omitempty"`
	APIKeyHeader string             `json:"api_key_header,omitempty"`
	APIKeyQuery  string             `json:"api_key_query,omitempty"`
	APIKeyValue  string             `json:"api_key_value,omitempty"`
	Username     string             `json:"username,omitempty"`
	Password     string             `json:"password,omitempty"`
	BearerToken  string             `json:"bearer_token,omitempty"`
	Headers      map[string]string  `json:"headers,omitempty"`
}

// ManualRestOperation defines a single manually registered REST endpoint.
type ManualRestOperation struct {
	Method      string              `json:"method"`
	Path        string              `json:"path"`
	ToolName    string              `json:"tool_name"`
	Description string              `json:"description"`
	Parameters  []types.RestParameter `json:"parameters,omitempty"`
}

// RestConfig is transport-specific configuration for REST adapter servers.
type RestConfig struct {
	BaseURL            string               `json:"base_url"`
	OpenAPISpecURL     string               `json:"openapi_spec_url,omitempty"`
	OpenAPISpecInline  string               `json:"openapi_spec_inline,omitempty"`
	ExcludedOperations []string             `json:"excluded_operations,omitempty"`
	Auth               RestAuthConfig       `json:"auth"`
	ManualOperation    *ManualRestOperation `json:"manual_operation,omitempty"`
}

// RestOperationMeta stores REST operation metadata on a tool row for execution without re-parsing specs.
type RestOperationMeta struct {
	OperationID string              `json:"operation_id,omitempty"`
	Method      string              `json:"method"`
	Path        string              `json:"path"`
	Parameters  []RestParamMapping  `json:"parameters,omitempty"`
	BodyFields  []RestBodyField     `json:"body_fields,omitempty"`
}

// RestParamMapping maps a flat MCP tool argument to an HTTP parameter location.
type RestParamMapping struct {
	ArgName     string `json:"arg_name"`
	Name        string `json:"name"`
	In          string `json:"in"`
	Required    bool   `json:"required,omitempty"`
	Description string `json:"description,omitempty"`
	Type        string `json:"type,omitempty"`
}

// RestBodyField maps a flattened body field to a JSON path segment list.
type RestBodyField struct {
	ArgName     string   `json:"arg_name"`
	JSONPath    []string `json:"json_path"`
	Type        string   `json:"type,omitempty"`
	Required    bool     `json:"required,omitempty"`
	Description string   `json:"description,omitempty"`
	Enum        []string `json:"enum,omitempty"`
}

// NewRestOpenAPIServer creates a REST OpenAPI adapter server model.
func NewRestOpenAPIServer(
	name, description, baseURL, specURL, specInline string,
	excluded []string,
	auth RestAuthConfig,
	sessionMode types.SessionMode,
) (*McpServer, error) {
	if baseURL == "" {
		return nil, errors.New("base_url is required for REST servers")
	}
	if specURL == "" && specInline == "" {
		return nil, errors.New("openapi_spec_url or openapi_spec is required for rest_openapi servers")
	}
	if specURL != "" && specInline != "" {
		return nil, errors.New("provide either openapi_spec_url or openapi_spec, not both")
	}
	if auth.Type == "" {
		auth.Type = types.RestAuthNone
	}
	config := RestConfig{
		BaseURL:            baseURL,
		OpenAPISpecURL:     specURL,
		OpenAPISpecInline:  specInline,
		ExcludedOperations: excluded,
		Auth:               auth,
	}
	configJSON, err := json.Marshal(config)
	if err != nil {
		return nil, err
	}
	if sessionMode == "" {
		sessionMode = types.SessionModeStateless
	}
	return &McpServer{
		Name:        name,
		Description: description,
		ServerKind:  types.ServerKindRestOpenAPI,
		Transport:   types.TransportRest,
		Enabled:     true,
		Config:      configJSON,
		SessionMode: sessionMode,
	}, nil
}

// NewRestEndpointServer creates a REST single-endpoint adapter server model.
func NewRestEndpointServer(
	name, description, baseURL string,
	op ManualRestOperation,
	auth RestAuthConfig,
	sessionMode types.SessionMode,
) (*McpServer, error) {
	if baseURL == "" {
		return nil, errors.New("base_url is required for REST servers")
	}
	if op.Method == "" || op.Path == "" || op.ToolName == "" {
		return nil, errors.New("method, path, and tool_name are required for rest_endpoint servers")
	}
	if auth.Type == "" {
		auth.Type = types.RestAuthNone
	}
	config := RestConfig{
		BaseURL:         baseURL,
		Auth:            auth,
		ManualOperation: &op,
	}
	configJSON, err := json.Marshal(config)
	if err != nil {
		return nil, err
	}
	if sessionMode == "" {
		sessionMode = types.SessionModeStateless
	}
	return &McpServer{
		Name:        name,
		Description: description,
		ServerKind:  types.ServerKindRestEndpoint,
		Transport:   types.TransportRest,
		Enabled:     true,
		Config:      configJSON,
		SessionMode: sessionMode,
	}, nil
}

// GetRestConfig returns REST configuration when transport is rest.
func (s *McpServer) GetRestConfig() (*RestConfig, error) {
	if s.Transport != types.TransportRest {
		return nil, errors.New("server is not a REST transport type")
	}
	var config RestConfig
	if err := json.Unmarshal(s.Config, &config); err != nil {
		return nil, err
	}
	return &config, nil
}

// GetRestConfigAuthType returns the configured REST auth type, or none.
func (s *McpServer) GetRestConfigAuthType() types.RestAuthType {
	if s.Transport != types.TransportRest {
		return types.RestAuthNone
	}
	conf, err := s.GetRestConfig()
	if err != nil {
		return types.RestAuthNone
	}
	if conf.Auth.Type == "" {
		return types.RestAuthNone
	}
	return conf.Auth.Type
}

// IsRestServer reports whether this server uses REST HTTP upstreams.
func (s *McpServer) IsRestServer() bool {
	if s.ServerKind == "" {
		return s.Transport == types.TransportRest
	}
	return types.IsRestServerKind(s.ServerKind)
}
