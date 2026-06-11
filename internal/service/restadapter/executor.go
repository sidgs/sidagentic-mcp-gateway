package restadapter

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"github.com/mark3labs/mcp-go/mcp"
	mcpgotransport "github.com/mark3labs/mcp-go/client/transport"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/gorm"
)

// OAuthTokenLoader loads stored upstream OAuth tokens for REST calls.
type OAuthTokenLoader func(ctx context.Context, tenantID, serverName string) (*mcpgotransport.Token, error)

// Executor executes REST tool calls against upstream HTTP APIs.
type Executor struct {
	DB          *gorm.DB
	LoadOAuth   OAuthTokenLoader
	HTTPClient  *http.Client
}

// NewExecutor creates a REST tool executor with sensible defaults.
func NewExecutor(db *gorm.DB, loadOAuth OAuthTokenLoader) *Executor {
	return &Executor{
		DB:        db,
		LoadOAuth: loadOAuth,
		HTTPClient: &http.Client{
			Timeout: 60 * time.Second,
		},
	}
}

// CallTool executes a REST operation and returns an MCP tool result.
func (e *Executor) CallTool(
	ctx context.Context,
	server *model.McpServer,
	tool *model.Tool,
	args map[string]any,
) (*mcp.CallToolResult, error) {
	conf, err := server.GetRestConfig()
	if err != nil {
		return nil, err
	}
	meta, err := tool.GetRestOperationMeta()
	if err != nil {
		return nil, err
	}
	if meta == nil {
		return nil, fmt.Errorf("tool %s has no REST operation metadata", tool.Name)
	}

	targetURL, err := buildRequestURL(conf.BaseURL, meta.Path, meta.Parameters, args)
	if err != nil {
		return nil, err
	}

	var body io.Reader
	if len(meta.BodyFields) > 0 {
		payload, err := buildRequestBody(meta.BodyFields, args)
		if err != nil {
			return nil, err
		}
		if len(payload) > 0 {
			body = bytes.NewReader(payload)
		}
	}

	req, err := http.NewRequestWithContext(ctx, meta.Method, targetURL, body)
	if err != nil {
		return nil, err
	}

	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	applyHeaderParams(req, meta.Parameters, args)
	if err := e.applyAuth(ctx, req, server, conf.Auth); err != nil {
		return nil, err
	}

	resp, err := e.HTTPClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("REST request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read REST response: %w", err)
	}

	return formatToolResult(resp.StatusCode, respBody), nil
}

func buildRequestURL(baseURL, path string, params []model.RestParamMapping, args map[string]any) (string, error) {
	base, err := url.Parse(strings.TrimRight(baseURL, "/"))
	if err != nil {
		return "", fmt.Errorf("invalid base_url: %w", err)
	}

	resolvedPath := path
	query := url.Values{}

	for _, p := range params {
		raw, ok := args[p.ArgName]
		if !ok {
			if p.Required {
				return "", fmt.Errorf("missing required parameter %q", p.ArgName)
			}
			continue
		}
		value := fmt.Sprint(raw)
		switch strings.ToLower(p.In) {
		case "path":
			resolvedPath = strings.ReplaceAll(resolvedPath, "{"+p.Name+"}", url.PathEscape(value))
		case "query":
			query.Set(p.Name, value)
		case "header":
			// headers applied later
		}
	}

	full, err := url.Parse(resolvedPath)
	if err != nil {
		return "", fmt.Errorf("invalid path %q: %w", path, err)
	}
	if !full.IsAbs() {
		full = base.ResolveReference(full)
	} else {
		full.Scheme = base.Scheme
		full.Host = base.Host
	}
	if encoded := query.Encode(); encoded != "" {
		full.RawQuery = encoded
	}
	return full.String(), nil
}

func applyHeaderParams(req *http.Request, params []model.RestParamMapping, args map[string]any) {
	for _, p := range params {
		if strings.ToLower(p.In) != "header" {
			continue
		}
		if raw, ok := args[p.ArgName]; ok {
			req.Header.Set(p.Name, fmt.Sprint(raw))
		}
	}
}

func buildRequestBody(fields []model.RestBodyField, args map[string]any) ([]byte, error) {
	root := make(map[string]any)
	hasValue := false

	for _, field := range fields {
		raw, ok := args[field.ArgName]
		if !ok {
			if field.Required {
				return nil, fmt.Errorf("missing required body field %q", field.ArgName)
			}
			continue
		}
		hasValue = true
		value, err := coerceBodyValue(raw, field.Type)
		if err != nil {
			return nil, err
		}
		setNestedValue(root, field.JSONPath, value)
	}

	if !hasValue {
		return nil, nil
	}
	return json.Marshal(root)
}

func coerceBodyValue(raw any, fieldType string) (any, error) {
	switch fieldType {
	case "integer":
		switch v := raw.(type) {
		case float64:
			return int(v), nil
		case int:
			return v, nil
		case string:
			return strconv.Atoi(v)
		}
	case "number":
		switch v := raw.(type) {
		case float64:
			return v, nil
		case int:
			return float64(v), nil
		case string:
			return strconv.ParseFloat(v, 64)
		}
	case "boolean":
		switch v := raw.(type) {
		case bool:
			return v, nil
		case string:
			return strconv.ParseBool(v)
		}
	}
	return raw, nil
}

func setNestedValue(root map[string]any, path []string, value any) {
	if len(path) == 0 {
		return
	}
	current := root
	for i := 0; i < len(path)-1; i++ {
		key := path[i]
		next, ok := current[key].(map[string]any)
		if !ok {
			next = make(map[string]any)
			current[key] = next
		}
		current = next
	}
	current[path[len(path)-1]] = value
}

func (e *Executor) applyAuth(ctx context.Context, req *http.Request, server *model.McpServer, auth model.RestAuthConfig) error {
	for k, v := range auth.Headers {
		if strings.EqualFold(k, "Authorization") {
			continue
		}
		req.Header.Set(k, v)
	}

	switch auth.Type {
	case "", types.RestAuthNone:
		return nil
	case types.RestAuthAPIKey:
		if auth.APIKeyHeader != "" && auth.APIKeyValue != "" {
			req.Header.Set(auth.APIKeyHeader, auth.APIKeyValue)
		}
		if auth.APIKeyQuery != "" && auth.APIKeyValue != "" {
			q := req.URL.Query()
			q.Set(auth.APIKeyQuery, auth.APIKeyValue)
			req.URL.RawQuery = q.Encode()
		}
		return nil
	case types.RestAuthBasic:
		if auth.Username == "" {
			return fmt.Errorf("basic auth requires username")
		}
		creds := base64.StdEncoding.EncodeToString([]byte(auth.Username + ":" + auth.Password))
		req.Header.Set("Authorization", "Basic "+creds)
		return nil
	case types.RestAuthBearer:
		token := auth.BearerToken
		if token == "" {
			return fmt.Errorf("bearer auth requires bearer_token")
		}
		req.Header.Set("Authorization", "Bearer "+token)
		return nil
	case types.RestAuthOAuth:
		if e.LoadOAuth == nil {
			return fmt.Errorf("oauth auth is not configured")
		}
		token, err := e.LoadOAuth(ctx, server.TenantID, server.Name)
		if err != nil {
			return fmt.Errorf("failed to load upstream OAuth token: %w", err)
		}
		if token == nil || token.AccessToken == "" {
			return fmt.Errorf("no upstream OAuth token available for server %s", server.Name)
		}
		tokenType := token.TokenType
		if tokenType == "" {
			tokenType = "Bearer"
		}
		req.Header.Set("Authorization", tokenType+" "+token.AccessToken)
		return nil
	default:
		return fmt.Errorf("unsupported REST auth type %q", auth.Type)
	}
}

func formatToolResult(statusCode int, body []byte) *mcp.CallToolResult {
	text := fmt.Sprintf("HTTP %d\n", statusCode)
	if len(body) == 0 {
		text += "(empty body)"
		return mcp.NewToolResultText(text)
	}

	var parsed any
	if err := json.Unmarshal(body, &parsed); err == nil {
		pretty, err := json.MarshalIndent(parsed, "", "  ")
		if err == nil {
			text += string(pretty)
			return mcp.NewToolResultText(text)
		}
	}
	text += string(body)
	return mcp.NewToolResultText(text)
}

// ProbeConnectivity performs a lightweight HTTP probe against the REST base URL.
func (e *Executor) ProbeConnectivity(ctx context.Context, conf *model.RestConfig, server *model.McpServer) error {
	target := strings.TrimRight(conf.BaseURL, "/")
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, target, nil)
	if err != nil {
		return err
	}
	if err := e.applyAuth(ctx, req, server, conf.Auth); err != nil {
		return err
	}
	resp, err := e.HTTPClient.Do(req)
	if err != nil {
		return fmt.Errorf("REST connectivity probe failed: %w", err)
	}
	defer resp.Body.Close()
	_, _ = io.Copy(io.Discard, resp.Body)

	if resp.StatusCode == http.StatusUnauthorized && conf.Auth.Type == types.RestAuthOAuth {
		return mcpgotransport.ErrUnauthorized
	}
	if resp.StatusCode >= 500 {
		return fmt.Errorf("REST connectivity probe returned HTTP %d", resp.StatusCode)
	}
	return nil
}
