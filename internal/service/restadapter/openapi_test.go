package restadapter_test

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/service/restadapter"
	"sami.io/mcpgateway/pkg/types"
)

const sampleOpenAPISpec = `openapi: 3.0.3
info:
  title: Sample API
  version: 1.0.0
paths:
  /pets/{petId}:
    get:
      operationId: getPet
      summary: Get a pet by ID
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: integer
        - name: verbose
          in: query
          schema:
            type: boolean
      responses:
        "200":
          description: ok
    post:
      operationId: createPet
      summary: Create a pet
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name]
              properties:
                name:
                  type: string
                age:
                  type: integer
      responses:
        "201":
          description: created
`

func TestSynthesizeToolsFromOpenAPI(t *testing.T) {
	doc, err := restadapter.LoadOpenAPISpec(context.Background(), "", sampleOpenAPISpec)
	require.NoError(t, err)

	tools, err := restadapter.SynthesizeToolsFromOpenAPI(doc, "https://api.example.com", []string{})
	require.NoError(t, err)
	require.Len(t, tools, 2)

	names := map[string]restadapter.SynthesizedTool{}
	for _, tool := range tools {
		names[tool.Name] = tool
		assert.NotEmpty(t, tool.Description)
	}

	getPet := names["getpet"]
	assert.Equal(t, "GET", getPet.RestMeta.Method)
	assert.Equal(t, "/pets/{petId}", getPet.RestMeta.Path)
	assert.Contains(t, getPet.InputSchema["properties"], "petid")

	createPet := names["createpet"]
	assert.Contains(t, createPet.InputSchema["properties"], "body_name")
}

func TestSynthesizeToolsFromOpenAPI_ExcludeOperations(t *testing.T) {
	doc, err := restadapter.LoadOpenAPISpec(context.Background(), "", sampleOpenAPISpec)
	require.NoError(t, err)

	tools, err := restadapter.SynthesizeToolsFromOpenAPI(doc, "https://api.example.com", []string{"createPet"})
	require.NoError(t, err)
	require.Len(t, tools, 1)
	assert.Equal(t, "getpet", tools[0].Name)
}

func TestSynthesizeManualEndpointTool(t *testing.T) {
	tool, err := restadapter.SynthesizeManualEndpointTool(model.ManualRestOperation{
		Method:      "GET",
		Path:        "/v1/current",
		ToolName:    "get_current",
		Description: "Use when the caller needs current weather for a city",
		Parameters: []types.RestParameter{
			{Name: "city", In: "query", Type: "string", Required: true, Description: "City name"},
		},
	})
	require.NoError(t, err)
	assert.Equal(t, "get_current", tool.Name)
	assert.Equal(t, "GET", tool.RestMeta.Method)
}

func TestExecutor_CallTool(t *testing.T) {
	var gotMethod, gotPath, gotQuery string
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotMethod = r.Method
		gotPath = r.URL.Path
		gotQuery = r.URL.Query().Get("city")
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"temp":72}`))
	}))
	defer upstream.Close()

	spec := `openapi: 3.0.3
info:
  title: Weather
  version: 1.0.0
paths:
  /v1/current:
    get:
      operationId: getCurrent
      summary: Use when current weather is needed
      parameters:
        - name: city
          in: query
          required: true
          schema:
            type: string
      responses:
        "200":
          description: ok
`
	doc, err := restadapter.LoadOpenAPISpec(context.Background(), "", spec)
	require.NoError(t, err)
	tools, err := restadapter.SynthesizeToolsFromOpenAPI(doc, upstream.URL, nil)
	require.NoError(t, err)
	require.Len(t, tools, 1)

	server := &model.McpServer{
		Name:       "weather",
		ServerKind: types.ServerKindRestOpenAPI,
		Transport:  types.TransportRest,
	}
	conf := model.RestConfig{BaseURL: upstream.URL, Auth: model.RestAuthConfig{Type: types.RestAuthNone}}
	configJSON, err := json.Marshal(conf)
	require.NoError(t, err)
	server.Config = configJSON

	toolModel := &model.Tool{Name: tools[0].Name, Description: tools[0].Description}
	require.NoError(t, toolModel.SetRestOperationMeta(&tools[0].RestMeta))

	executor := restadapter.NewExecutor(nil, nil)
	result, err := executor.CallTool(context.Background(), server, toolModel, map[string]any{"city": "Austin"})
	require.NoError(t, err)
	require.NotNil(t, result)
	assert.Equal(t, http.MethodGet, gotMethod)
	assert.Equal(t, "/v1/current", gotPath)
	assert.Equal(t, "Austin", gotQuery)
}

func TestExecutor_ApplyAPIKeyAuth(t *testing.T) {
	var gotHeader string
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotHeader = r.Header.Get("X-API-Key")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"ok":true}`))
	}))
	defer upstream.Close()

	server := &model.McpServer{Name: "svc", Transport: types.TransportRest}
	conf := model.RestConfig{
		BaseURL: upstream.URL,
		Auth: model.RestAuthConfig{
			Type:         types.RestAuthAPIKey,
			APIKeyHeader: "X-API-Key",
			APIKeyValue:  "secret-key",
		},
	}
	configJSON, err := json.Marshal(conf)
	require.NoError(t, err)
	server.Config = configJSON

	meta := &model.RestOperationMeta{Method: http.MethodGet, Path: "/health"}
	toolModel := &model.Tool{Name: "health"}
	require.NoError(t, toolModel.SetRestOperationMeta(meta))

	executor := restadapter.NewExecutor(nil, nil)
	_, err = executor.CallTool(context.Background(), server, toolModel, map[string]any{})
	require.NoError(t, err)
	assert.Equal(t, "secret-key", gotHeader)
}
