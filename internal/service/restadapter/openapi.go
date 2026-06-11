package restadapter

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
	"regexp"
	"strings"
	"time"
	"unicode"

	"github.com/getkin/kin-openapi/openapi3"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
	"gopkg.in/yaml.v3"
)

var nonToolNameChars = regexp.MustCompile(`[^a-z0-9_]+`)

// LoadOpenAPISpec loads an OpenAPI 3 spec from URL or inline content.
func LoadOpenAPISpec(ctx context.Context, specURL, specInline string) (*openapi3.T, error) {
	var data []byte
	var err error

	switch {
	case specURL != "":
		data, err = fetchSpec(ctx, specURL)
	case specInline != "":
		data = []byte(specInline)
	default:
		return nil, fmt.Errorf("openapi spec URL or inline content is required")
	}
	if err != nil {
		return nil, err
	}

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true

	if jsonLike(data) {
		doc, err := loader.LoadFromData(data)
		if err != nil {
			return nil, fmt.Errorf("failed to parse OpenAPI JSON: %w", err)
		}
		return doc, nil
	}

	var asAny any
	if err := yaml.Unmarshal(data, &asAny); err != nil {
		return nil, fmt.Errorf("failed to parse OpenAPI YAML: %w", err)
	}
	normalized, err := yaml.Marshal(asAny)
	if err != nil {
		return nil, err
	}
	doc, err := loader.LoadFromData(normalized)
	if err != nil {
		return nil, fmt.Errorf("failed to load OpenAPI document: %w", err)
	}
	if err := doc.Validate(ctx); err != nil {
		log.Printf("[WARN] OpenAPI validation warnings: %v", err)
	}
	return doc, nil
}

func fetchSpec(ctx context.Context, specURL string) ([]byte, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, specURL, nil)
	if err != nil {
		return nil, err
	}
	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch OpenAPI spec: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("failed to fetch OpenAPI spec: HTTP %d", resp.StatusCode)
	}
	return io.ReadAll(resp.Body)
}

func jsonLike(data []byte) bool {
	trimmed := strings.TrimSpace(string(data))
	return strings.HasPrefix(trimmed, "{") || strings.HasPrefix(trimmed, "[")
}

// SynthesizeToolsFromOpenAPI converts OpenAPI operations into MCP tool definitions.
func SynthesizeToolsFromOpenAPI(doc *openapi3.T, baseURL string, excluded []string) ([]SynthesizedTool, error) {
	if doc == nil || doc.Paths == nil {
		return nil, fmt.Errorf("OpenAPI document has no paths")
	}

	excludedSet := make(map[string]struct{}, len(excluded))
	for _, opID := range excluded {
		excludedSet[opID] = struct{}{}
	}

	usedNames := make(map[string]struct{})
	var tools []SynthesizedTool

	for path, pathItem := range doc.Paths.Map() {
		if pathItem == nil {
			continue
		}
		for method, op := range pathItemOperations(pathItem) {
			if op == nil {
				continue
			}
			opID := op.OperationID
			if opID == "" {
				opID = fallbackOperationID(method, path)
			}
			if _, skip := excludedSet[opID]; skip {
				continue
			}

			toolName := sanitizeToolName(opID)
			toolName = dedupeToolName(toolName, usedNames)
			usedNames[toolName] = struct{}{}

			desc := buildToolDescription(op.Summary, op.Description)
			properties := make(map[string]any)
			required := make([]string, 0)
			var paramMappings []model.RestParamMapping
			var bodyFields []model.RestBodyField

			for _, paramRef := range op.Parameters {
				if paramRef == nil || paramRef.Value == nil {
					continue
				}
				p := paramRef.Value
				argName := sanitizeToolName(p.Name)
				fieldType, enumVals := openAPISchemaType(p.Schema)
				properties[argName] = inputSchemaProperty(fieldType, p.Description, p.Required, enumVals)
				if p.Required {
					required = append(required, argName)
				}
				paramMappings = append(paramMappings, model.RestParamMapping{
					ArgName:     argName,
					Name:        p.Name,
					In:          p.In,
					Required:    p.Required,
					Description: p.Description,
					Type:        fieldType,
				})
			}

			if op.RequestBody != nil && op.RequestBody.Value != nil {
				for _, mediaType := range op.RequestBody.Value.Content {
					if mediaType == nil || mediaType.Schema == nil || mediaType.Schema.Value == nil {
						continue
					}
					flattenBodySchema(mediaType.Schema.Value, "body", []string{}, &properties, &required, &bodyFields)
					break
				}
			}

			inputSchema := buildInputSchema(properties, required)
			tools = append(tools, SynthesizedTool{
				Name:        toolName,
				Description: desc,
				InputSchema: inputSchema,
				RestMeta: model.RestOperationMeta{
					OperationID: opID,
					Method:      strings.ToUpper(method),
					Path:        path,
					Parameters:  paramMappings,
					BodyFields:  bodyFields,
				},
			})
		}
	}

	if len(tools) == 0 {
		return nil, fmt.Errorf("no operations found in OpenAPI spec after applying exclusions")
	}

	_ = baseURL
	return tools, nil
}

// SynthesizeManualEndpointTool builds a single tool from a manual REST operation definition.
func SynthesizeManualEndpointTool(op model.ManualRestOperation) (SynthesizedTool, error) {
	if op.Method == "" || op.Path == "" || op.ToolName == "" {
		return SynthesizedTool{}, fmt.Errorf("method, path, and tool_name are required")
	}

	toolName := sanitizeToolName(op.ToolName)
	desc := op.Description
	if desc == "" {
		desc = fmt.Sprintf("Use when the caller needs to invoke %s %s", strings.ToUpper(op.Method), op.Path)
	} else if !strings.HasPrefix(strings.ToLower(strings.TrimSpace(desc)), "use when") {
		trimmed := strings.TrimSpace(desc)
		if len(trimmed) > 0 {
			desc = "Use when " + strings.ToLower(trimmed)
		}
	}

	properties := make(map[string]any)
	required := make([]string, 0)
	var paramMappings []model.RestParamMapping

	for _, p := range op.Parameters {
		argName := sanitizeToolName(p.Name)
		fieldType := p.Type
		if fieldType == "" {
			fieldType = "string"
		}
		properties[argName] = inputSchemaProperty(fieldType, p.Description, p.Required, nil)
		if p.Required {
			required = append(required, argName)
		}
		paramMappings = append(paramMappings, model.RestParamMapping{
			ArgName:     argName,
			Name:        p.Name,
			In:          p.In,
			Required:    p.Required,
			Description: p.Description,
			Type:        fieldType,
		})
	}

	return SynthesizedTool{
		Name:        toolName,
		Description: desc,
		InputSchema: buildInputSchema(properties, required),
		RestMeta: model.RestOperationMeta{
			OperationID: op.ToolName,
			Method:      strings.ToUpper(op.Method),
			Path:        op.Path,
			Parameters:  paramMappings,
		},
	}, nil
}

func flattenBodySchema(
	schema *openapi3.Schema,
	prefix string,
	jsonPath []string,
	properties *map[string]any,
	required *[]string,
	bodyFields *[]model.RestBodyField,
) {
	if schema == nil {
		return
	}
	if len(schema.Enum) > 0 {
		argName := sanitizeToolName(prefix)
		enumVals := make([]string, 0, len(schema.Enum))
		for _, v := range schema.Enum {
			enumVals = append(enumVals, fmt.Sprint(v))
		}
		(*properties)[argName] = inputSchemaProperty("string", schema.Description, false, enumVals)
		*bodyFields = append(*bodyFields, model.RestBodyField{
			ArgName:     argName,
			JSONPath:    append([]string{}, jsonPath...),
			Type:        "string",
			Description: schema.Description,
			Enum:        enumVals,
		})
		return
	}

	if schema.Type != nil && schema.Type.Is(openapi3.TypeObject) {
		if schema.Properties == nil {
			return
		}
		for name, propRef := range schema.Properties {
			if propRef == nil || propRef.Value == nil {
				continue
			}
			nextPrefix := prefix + "_" + name
			nextPath := append(append([]string{}, jsonPath...), name)
			isRequired := containsString(schema.Required, name)
			if propRef.Value.Type != nil && propRef.Value.Type.Is(openapi3.TypeObject) {
				flattenBodySchema(propRef.Value, nextPrefix, nextPath, properties, required, bodyFields)
				continue
			}
			fieldType, enumVals := openAPISchemaType(propRef)
			argName := sanitizeToolName(nextPrefix)
			(*properties)[argName] = inputSchemaProperty(fieldType, propRef.Value.Description, isRequired, enumVals)
			if isRequired {
				*required = append(*required, argName)
			}
			*bodyFields = append(*bodyFields, model.RestBodyField{
				ArgName:     argName,
				JSONPath:    nextPath,
				Type:        fieldType,
				Required:    isRequired,
				Description: propRef.Value.Description,
				Enum:        enumVals,
			})
		}
		return
	}

	{
		argName := sanitizeToolName(prefix)
		fieldType, enumVals := schemaTypeFromOpenAPI(schema)
		(*properties)[argName] = inputSchemaProperty(fieldType, schema.Description, false, enumVals)
		*bodyFields = append(*bodyFields, model.RestBodyField{
			ArgName:     argName,
			JSONPath:    append([]string{}, jsonPath...),
			Type:        fieldType,
			Description: schema.Description,
			Enum:        enumVals,
		})
	}
}

func openAPISchemaType(ref *openapi3.SchemaRef) (string, []string) {
	if ref == nil || ref.Value == nil {
		return "string", nil
	}
	return schemaTypeFromOpenAPI(ref.Value)
}

func schemaTypeFromOpenAPI(schema *openapi3.Schema) (string, []string) {
	if schema == nil {
		return "string", nil
	}
	if len(schema.Enum) > 0 {
		enumVals := make([]string, 0, len(schema.Enum))
		for _, v := range schema.Enum {
			enumVals = append(enumVals, fmt.Sprint(v))
		}
		return "string", enumVals
	}
	if schema.Type != nil {
		switch {
		case schema.Type.Is(openapi3.TypeInteger):
			return "integer", nil
		case schema.Type.Is(openapi3.TypeNumber):
			return "number", nil
		case schema.Type.Is(openapi3.TypeBoolean):
			return "boolean", nil
		}
	}
	return "string", nil
}

func pathItemOperations(pathItem *openapi3.PathItem) map[string]*openapi3.Operation {
	if pathItem == nil {
		return nil
	}
	ops := make(map[string]*openapi3.Operation)
	if pathItem.Get != nil {
		ops[http.MethodGet] = pathItem.Get
	}
	if pathItem.Post != nil {
		ops[http.MethodPost] = pathItem.Post
	}
	if pathItem.Put != nil {
		ops[http.MethodPut] = pathItem.Put
	}
	if pathItem.Patch != nil {
		ops[http.MethodPatch] = pathItem.Patch
	}
	if pathItem.Delete != nil {
		ops[http.MethodDelete] = pathItem.Delete
	}
	if pathItem.Head != nil {
		ops[http.MethodHead] = pathItem.Head
	}
	if pathItem.Options != nil {
		ops[http.MethodOptions] = pathItem.Options
	}
	return ops
}

func buildToolDescription(summary, description string) string {
	base := strings.TrimSpace(summary)
	if base == "" {
		base = strings.TrimSpace(description)
	}
	if base == "" {
		return "Use when the caller needs to invoke this REST API operation"
	}
	lower := strings.ToLower(base)
	if strings.HasPrefix(lower, "use when") {
		return base
	}
	return "Use when " + lower
}

func fallbackOperationID(method, path string) string {
	cleanPath := nonToolNameChars.ReplaceAllString(strings.ToLower(path), "_")
	cleanPath = strings.Trim(cleanPath, "_")
	return sanitizeToolName(method + "_" + cleanPath)
}

func sanitizeToolName(name string) string {
	name = strings.ToLower(name)
	name = nonToolNameChars.ReplaceAllString(name, "_")
	name = strings.Trim(name, "_")
	if name == "" {
		name = "operation"
	}
	if len(name) > 32 {
		name = name[:32]
		name = strings.TrimRight(name, "_")
	}
	if name[0] >= '0' && name[0] <= '9' {
		name = "op_" + name
		if len(name) > 32 {
			name = name[:32]
		}
	}
	return name
}

func dedupeToolName(name string, used map[string]struct{}) string {
	if _, exists := used[name]; !exists {
		return name
	}
	for i := 2; i < 100; i++ {
		candidate := fmt.Sprintf("%s_%d", trimToLen(name, 28), i)
		if _, exists := used[candidate]; !exists {
			return candidate
		}
	}
	return name + "_dup"
}

func trimToLen(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return strings.TrimRight(s[:max], "_")
}

func containsString(items []string, target string) bool {
	for _, item := range items {
		if item == target {
			return true
		}
	}
	return false
}

// RestAuthFromTypes converts API rest auth config to model config, merging bearer token.
func RestAuthFromTypes(input *types.RestAuthConfig, bearerToken string, headers map[string]string) model.RestAuthConfig {
	if input == nil {
		auth := model.RestAuthConfig{Type: types.RestAuthNone}
		if bearerToken != "" {
			auth.Type = types.RestAuthBearer
			auth.BearerToken = bearerToken
		}
		if len(headers) > 0 {
			auth.Headers = headers
		}
		return auth
	}
	auth := model.RestAuthConfig{
		Type:         input.Type,
		APIKeyHeader: input.APIKeyHeader,
		APIKeyQuery:  input.APIKeyQuery,
		APIKeyValue:  input.APIKeyValue,
		Username:     input.Username,
		Password:     input.Password,
		Headers:      input.Headers,
	}
	if auth.Type == "" {
		auth.Type = types.RestAuthNone
	}
	if bearerToken != "" && auth.Type == types.RestAuthNone {
		auth.Type = types.RestAuthBearer
		auth.BearerToken = bearerToken
	}
	if len(headers) > 0 {
		if auth.Headers == nil {
			auth.Headers = headers
		} else {
			for k, v := range headers {
				auth.Headers[k] = v
			}
		}
	}
	return auth
}

// IsValidRestAuthType checks auth type string.
func IsValidRestAuthType(t types.RestAuthType) bool {
	switch t {
	case types.RestAuthNone, types.RestAuthAPIKey, types.RestAuthBasic, types.RestAuthBearer, types.RestAuthOAuth:
		return true
	default:
		return t == ""
	}
}

// ValidateManualParameter checks manual REST parameter definitions.
func ValidateManualParameter(p types.RestParameter) error {
	if p.Name == "" {
		return fmt.Errorf("parameter name is required")
	}
	switch strings.ToLower(p.In) {
	case "path", "query", "header":
	default:
		return fmt.Errorf("parameter %s has unsupported location %q", p.Name, p.In)
	}
	if p.Type == "" {
		return nil
	}
	switch p.Type {
	case "string", "integer", "number", "boolean":
		return nil
	default:
		return fmt.Errorf("parameter %s has unsupported type %q", p.Name, p.Type)
	}
}

// SanitizeForLog returns a safe tool name fragment for logs.
func SanitizeForLog(s string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsPrint(r) {
			return r
		}
		return -1
	}, s)
}
