package types

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestMcpServer(t *testing.T) {
	t.Parallel()

	server := McpServer{
		Name:      "test-server",
		Transport: "stdio",
		Command:   "/usr/bin/test-server",
	}

	if server.Name != "test-server" {
		t.Errorf("Expected Name to be 'test-server', got %s", server.Name)
	}
	if server.Transport != "stdio" {
		t.Errorf("Expected Transport to be 'stdio', got %s", server.Transport)
	}
	if server.Command != "/usr/bin/test-server" {
		t.Errorf("Expected Command to be '/usr/bin/test-server', got %s", server.Command)
	}
}

func TestMcpServerJSONMarshaling(t *testing.T) {
	t.Parallel()

	server := McpServer{
		Name:        "json-server",
		Transport:   "stdio",
		Enabled:     true,
		Description: "Server for JSON testing",
		Command:     "/usr/bin/json-server",
		Args:        []string{"--verbose"},
		Env:         map[string]string{"ENV": "test"},
		SessionMode: "stateless",
	}

	data, err := json.Marshal(server)
	if err != nil {
		t.Fatalf("Failed to marshal McpServer: %v", err)
	}

	expected := `{"name":"json-server","transport":"stdio","enabled":true,"description":"Server for JSON testing","url":"","command":"/usr/bin/json-server","args":["--verbose"],"env":{"ENV":"test"},"session_mode":"stateless"}`
	if string(data) != expected {
		t.Errorf("Expected JSON %s, got %s", expected, string(data))
	}
}

func TestValidateTransport(t *testing.T) {
	t.Parallel()

	transport, err := ValidateTransport("stdio")
	if err != nil {
		t.Errorf("Expected no error for 'stdio', got %v", err)
	}
	if transport != TransportStdio {
		t.Errorf("Expected transport to be TransportStdio, got %s", transport)
	}

	transport, err = ValidateTransport("streamable_http")
	if err != nil {
		t.Errorf("Expected no error for 'streamable_http', got %v", err)
	}
	if transport != TransportStreamableHTTP {
		t.Errorf("Expected transport to be TransportStreamableHTTP, got %s", transport)
	}

	transport, err = ValidateTransport("sse")
	if err != nil {
		t.Errorf("Expected no error for 'sse', got %v", err)
	}
	if transport != TransportSSE {
		t.Errorf("Expected transport to be TransportSSE, got %s", transport)
	}

	transport, err = ValidateTransport("rest")
	if err != nil {
		t.Errorf("Expected no error for 'rest', got %v", err)
	}
	if transport != TransportRest {
		t.Errorf("Expected transport to be TransportRest, got %s", transport)
	}

	transport, err = ValidateTransport("")
	if err == nil {
		t.Error("Expected error for empty string, got nil")
	}
	if transport != "" {
		t.Errorf("Expected empty transport for invalid input, got %s", transport)
	}

	transport, err = ValidateTransport("invalid_transport")
	if err == nil {
		t.Error("Expected error for invalid transport, got nil")
	}
	if transport != "" {
		t.Errorf("Expected empty transport for invalid input, got %s", transport)
	}
}

func TestValidateServerKind(t *testing.T) {
	t.Parallel()

	kind, err := ValidateServerKind("")
	if err != nil || kind != ServerKindMCPProtocol {
		t.Fatalf("empty server kind: got %q err=%v", kind, err)
	}

	kind, err = ValidateServerKind("rest_openapi")
	if err != nil || kind != ServerKindRestOpenAPI {
		t.Fatalf("rest_openapi: got %q err=%v", kind, err)
	}

	_, err = ValidateServerKind("invalid")
	if err == nil {
		t.Fatal("expected error for invalid server kind")
	}
}

func TestIsRestServerKind(t *testing.T) {
	t.Parallel()

	if !IsRestServerKind(ServerKindRestOpenAPI) {
		t.Fatal("rest_openapi should be REST kind")
	}
	if IsRestServerKind(ServerKindMCPProtocol) {
		t.Fatal("mcp_protocol should not be REST kind")
	}
}

func TestServerMetadata(t *testing.T) {
	t.Parallel()

	metadata := ServerMetadata{Version: "v1.2.3"}

	jsonData, err := json.Marshal(metadata)
	if err != nil {
		t.Fatalf("Failed to marshal: %v", err)
	}

	expected := `{"version":"v1.2.3"}`
	if string(jsonData) != expected {
		t.Errorf("Expected JSON %s, got %s", expected, string(jsonData))
	}

	var result ServerMetadata
	err = json.Unmarshal(jsonData, &result)
	if err != nil {
		t.Fatalf("Failed to unmarshal: %v", err)
	}

	if result.Version != "v1.2.3" {
		t.Errorf("Expected version v1.2.3, got %s", result.Version)
	}
}

func TestValidateSessionMode(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name        string
		input       string
		wantMode    SessionMode
		wantErr     bool
		errContains string
	}{
		{
			name:     "valid stateless",
			input:    "stateless",
			wantMode: SessionModeStateless,
			wantErr:  false,
		},
		{
			name:     "valid stateful",
			input:    "stateful",
			wantMode: SessionModeStateful,
			wantErr:  false,
		},
		{
			name:     "empty string defaults to stateless",
			input:    "",
			wantMode: SessionModeStateless,
			wantErr:  false,
		},
		{
			name:        "invalid session mode",
			input:       "invalid",
			wantMode:    "",
			wantErr:     true,
			errContains: "unsupported session mode",
		},
		{
			name:        "case sensitive - uppercase fails",
			input:       "Stateful",
			wantMode:    "",
			wantErr:     true,
			errContains: "unsupported session mode",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mode, err := ValidateSessionMode(tt.input)

			if tt.wantErr {
				if err == nil {
					t.Errorf("Expected error, got nil")
				} else if tt.errContains != "" && !strings.Contains(err.Error(), tt.errContains) {
					t.Errorf("Expected error containing %q, got %q", tt.errContains, err.Error())
				}
				if mode != tt.wantMode {
					t.Errorf("Expected mode %q, got %q", tt.wantMode, mode)
				}
				return
			}

			if err != nil {
				t.Errorf("Unexpected error: %v", err)
			}
			if mode != tt.wantMode {
				t.Errorf("Expected mode %q, got %q", tt.wantMode, mode)
			}
		})
	}
}
