package mcp

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"github.com/mark3labs/mcp-go/mcp"
	mcpgotransport "github.com/mark3labs/mcp-go/client/transport"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/service/restadapter"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
)

func (m *MCPService) registerRestMcpServer(ctx context.Context, s *model.McpServer, input *types.RegisterServerInput) error {
	if err := validateServerName(s.Name); err != nil {
		return err
	}

	s.Enabled = true
	s.TenantID = tenant.MustFromContext(ctx)

	conf, err := s.GetRestConfig()
	if err != nil {
		return err
	}
	if err := validateURL(conf.BaseURL); err != nil {
		return fmt.Errorf("invalid base_url: %w", err)
	}

	synthTools, err := m.synthesizeRestTools(ctx, s, conf)
	if err != nil {
		return err
	}
	if len(synthTools) == 0 {
		return fmt.Errorf("no REST tools synthesized for server %s", s.Name)
	}

	if err := m.restExecutor.ProbeConnectivity(ctx, conf, s); err != nil {
		if conf.Auth.Type == types.RestAuthOAuth {
			return err
		}
		log.Printf("[WARN] REST connectivity probe for server %s: %v", s.Name, err)
	}

	if err := m.db.Create(s).Error; err != nil {
		return fmt.Errorf("failed to register REST server: %w", err)
	}

	if err := m.persistRestTools(ctx, s, synthTools); err != nil {
		return err
	}

	m.notifyServerCatalogReload(ctx, s.Name)
	return nil
}

func (m *MCPService) synthesizeRestTools(ctx context.Context, s *model.McpServer, conf *model.RestConfig) ([]restadapter.SynthesizedTool, error) {
	switch s.ServerKind {
	case types.ServerKindRestOpenAPI:
		doc, err := restadapter.LoadOpenAPISpec(ctx, conf.OpenAPISpecURL, conf.OpenAPISpecInline)
		if err != nil {
			return nil, err
		}
		return restadapter.SynthesizeToolsFromOpenAPI(doc, conf.BaseURL, conf.ExcludedOperations)
	case types.ServerKindRestEndpoint:
		if conf.ManualOperation == nil {
			return nil, fmt.Errorf("manual REST operation is required for rest_endpoint servers")
		}
		tool, err := restadapter.SynthesizeManualEndpointTool(*conf.ManualOperation)
		if err != nil {
			return nil, err
		}
		return []restadapter.SynthesizedTool{tool}, nil
	default:
		return nil, fmt.Errorf("unsupported REST server kind %q", s.ServerKind)
	}
}

func (m *MCPService) persistRestTools(ctx context.Context, s *model.McpServer, synthTools []restadapter.SynthesizedTool) error {
	for _, synth := range synthTools {
		schemaJSON, err := json.Marshal(synth.InputSchema)
		if err != nil {
			return fmt.Errorf("failed to marshal input schema for tool %s: %w", synth.Name, err)
		}

		toolModel := &model.Tool{
			TenantID:    s.TenantID,
			ServerID:    s.ID,
			Name:        synth.Name,
			Description: synth.Description,
			InputSchema: schemaJSON,
		}
		if err := toolModel.SetRestOperationMeta(&synth.RestMeta); err != nil {
			return err
		}
		if err := m.dbTenant(ctx).Create(toolModel).Error; err != nil {
			log.Printf("[ERROR] failed to register REST tool %s in DB: %v", synth.Name, err)
			continue
		}

		mcpTool, err := convertToolModelToMcpObject(toolModel)
		if err != nil {
			return fmt.Errorf("failed to convert REST tool %s: %w", synth.Name, err)
		}
		canonical := mergeServerToolNames(s.Name, synth.Name)
		mcpTool.Name = tenant.QualifyProxyName(s.TenantID, canonical)
		m.mcpProxyServer.AddTool(mcpTool, m.MCPProxyToolCallHandler)
		m.addToolInstance(mcpTool)
		m.notifyToolAddition(mcpTool.Name)
	}
	return nil
}

func (m *MCPService) callRestTool(
	ctx context.Context,
	server *model.McpServer,
	toolName string,
	args map[string]any,
) (*mcp.CallToolResult, error) {
	tools, err := m.ListToolsByServer(ctx, server.Name)
	if err != nil {
		return nil, err
	}
	var toolModel *model.Tool
	for i := range tools {
		if tools[i].Name == toolName {
			toolModel = &tools[i]
			break
		}
	}
	if toolModel == nil {
		return nil, fmt.Errorf("REST tool %s not found on server %s", toolName, server.Name)
	}
	return m.restExecutor.CallTool(ctx, server, toolModel, args)
}

func (m *MCPService) rebuildRestServerCatalog(ctx context.Context, existing *model.McpServer) error {
	conf, err := existing.GetRestConfig()
	if err != nil {
		return err
	}
	synthTools, err := m.synthesizeRestTools(ctx, existing, conf)
	if err != nil {
		return err
	}
	if err := m.deregisterServerTools(ctx, existing); err != nil {
		return err
	}
	return m.persistRestTools(ctx, existing, synthTools)
}

func isUnauthorizedProbeError(err error) bool {
	return err != nil && errors.Is(err, mcpgotransport.ErrUnauthorized)
}

func restAuthToTypes(auth model.RestAuthConfig) *types.RestAuthConfig {
	return &types.RestAuthConfig{
		Type:         auth.Type,
		APIKeyHeader: auth.APIKeyHeader,
		APIKeyQuery:  auth.APIKeyQuery,
		APIKeyValue:  auth.APIKeyValue,
		Username:     auth.Username,
		Password:     auth.Password,
		Headers:      auth.Headers,
	}
}
