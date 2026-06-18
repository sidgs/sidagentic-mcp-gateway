package mcp

import (
	"context"
	"fmt"
	"time"

	"github.com/mark3labs/mcp-go/mcp"
	"sami.io/mcpgateway/internal/agentappauth"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/mcpgatewayctx"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
)

func authorizeProxyServerAccess(ctx context.Context, serverName string) error {
	serverMode := ctx.Value("mode").(model.ServerMode)
	if !model.IsEnterpriseMode(serverMode) {
		return nil
	}

	if mcpgatewayctx.GlobalMCPAPIKeyAuth(ctx) {
		return nil
	}

	if mcpgatewayctx.OpenGroupMCP(ctx) {
		if _, ok := mcpgatewayctx.ToolGroupRoute(ctx); ok {
			return nil
		}
		if _, ok := mcpgatewayctx.PromptGroupRoute(ctx); ok {
			return nil
		}
	}

	if aa, ok := agentappauth.PrincipalFromContext(ctx); ok {
		if tg, ok := mcpgatewayctx.ToolGroupRoute(ctx); ok {
			if aa.AllowsToolGroup(tg) {
				return nil
			}
			return fmt.Errorf("agent-app is not authorized for tool group %s", tg)
		}
		if pg, ok := mcpgatewayctx.PromptGroupRoute(ctx); ok {
			if aa.AllowsPromptGroup(pg) {
				return nil
			}
			return fmt.Errorf("agent-app is not authorized for prompt group %s", pg)
		}
		return fmt.Errorf("agent-app requires group-scoped MCP endpoint")
	}

	return fmt.Errorf("missing MCP authentication")
}

func resolveProxyTenant(ctx context.Context, name, mismatchMsg string) (effectiveTenant, canonical string, lookupCtx context.Context, err error) {
	prefixTenant, canonical, qualified := tenant.SplitProxyToolName(name)
	if !qualified {
		canonical = name
	}

	reqTenant, hasReqTenant := tenant.FromContext(ctx)
	switch {
	case qualified:
		effectiveTenant = prefixTenant
		if hasReqTenant && effectiveTenant != reqTenant {
			return "", "", ctx, fmt.Errorf("%s: %w", mismatchMsg, apierrors.ErrInvalidInput)
		}
	case hasReqTenant:
		effectiveTenant = reqTenant
	default:
		effectiveTenant = tenant.MustFromContext(ctx)
	}

	lookupCtx = ctx
	if id, ok := tenant.PresentID(effectiveTenant); ok {
		lookupCtx = tenant.WithContext(ctx, id)
	}

	return effectiveTenant, canonical, lookupCtx, nil
}

// MCPProxyToolCallHandler handles tool calls for the MCP proxy server
// by forwarding the request to the appropriate upstream MCP server and
// relaying the response back.
func (m *MCPService) MCPProxyToolCallHandler(ctx context.Context, request mcp.CallToolRequest) (*mcp.CallToolResult, error) {
	started := time.Now()
	outcome := telemetry.ToolCallOutcomeSuccess

	name := request.Params.Name
	effectiveTenant, canonicalToolName, lookupCtx, err := resolveProxyTenant(
		ctx, name, "tool tenant does not match request tenant",
	)
	if err != nil {
		return nil, err
	}

	serverName, toolName, ok := splitServerToolName(canonicalToolName)
	if !ok {
		return nil, fmt.Errorf("tool name does not contain a %s separator: %w", serverToolNameSep, apierrors.ErrInvalidInput)
	}

	if err := authorizeProxyServerAccess(ctx, serverName); err != nil {
		return nil, err
	}

	defer func() {
		elapsed := time.Since(started)
		m.metrics.RecordToolCall(ctx, serverName, toolName, outcome, elapsed)
		m.recordToolUsage(ctx, serverName, toolName, model.ToolInvocationSourceMCPProxy, outcome, elapsed)
	}()

	server, err := m.GetMcpServer(lookupCtx, serverName)
	if err != nil {
		outcome = telemetry.ToolCallOutcomeError

		return nil, fmt.Errorf(
			"failed to get details about MCP server %s from DB: %w", serverName, err,
		)
	}
	if id, ok := tenant.PresentID(effectiveTenant); ok && server.TenantID != id {
		return nil, fmt.Errorf("tool tenant does not match server record: %w", apierrors.ErrInvalidInput)
	}

	if server.IsRestServer() {
		args := request.GetArguments()
		res, err := m.callRestTool(ctx, server, toolName, args)
		if err != nil {
			outcome = telemetry.ToolCallOutcomeError
		}
		return res, err
	}

	session, err := m.getSession(ctx, server)
	if err != nil {
		outcome = telemetry.ToolCallOutcomeError
		return nil, err
	}
	defer session.closeIfApplicable()

	request.Params.Name = toolName
	request.Header = nil

	res, err := session.client.CallTool(ctx, request)
	if err != nil {
		outcome = telemetry.ToolCallOutcomeError
		session.invalidateOnError(err)
	}

	return res, err
}

// mcpProxyResourceHandler handles resource reads for the MCP proxy server
// by forwarding the request to the appropriate upstream MCP server and
// relaying the response back.
func (m *MCPService) mcpProxyResourceHandler(ctx context.Context, request mcp.ReadResourceRequest) ([]mcp.ResourceContents, error) {
	resource, err := m.GetResource(ctx, request.Params.URI)
	if err != nil {
		return nil, fmt.Errorf("failed to get resource %s from DB: %w", request.Params.URI, err)
	}

	if resource.Server.TenantID != tenant.MustFromContext(ctx) {
		return nil, fmt.Errorf("resource tenant does not match request tenant: %w", apierrors.ErrInvalidInput)
	}

	if err := authorizeProxyServerAccess(ctx, resource.Server.Name); err != nil {
		return nil, err
	}

	session, err := m.getSession(ctx, &resource.Server)
	if err != nil {
		return nil, err
	}
	defer session.closeIfApplicable()

	request.Params.URI = resource.OriginalURI

	request.Header = nil

	res, err := session.client.ReadResource(ctx, request)
	if err != nil {
		session.invalidateOnError(err)
		return nil, err
	}

	return rewriteResourceContentsURI(res.Contents, resource.URI), nil
}

// mcpProxyPromptHandler handles prompt requests for the MCP proxy server
// by forwarding the request to the appropriate upstream MCP server and
// relaying the response back.
func (m *MCPService) mcpProxyPromptHandler(ctx context.Context, request mcp.GetPromptRequest) (*mcp.GetPromptResult, error) {
	started := time.Now()
	outcome := telemetry.PromptCallOutcomeSuccess

	name := request.Params.Name
	effectiveTenant, canonicalPromptName, lookupCtx, err := resolveProxyTenant(
		ctx, name, "prompt tenant does not match request tenant",
	)
	if err != nil {
		return nil, err
	}

	serverName, promptName, ok := splitServerPromptName(canonicalPromptName)
	if !ok {
		return nil, fmt.Errorf("prompt name does not contain a %s separator: %w", serverPromptNameSep, apierrors.ErrInvalidInput)
	}

	if err := authorizeProxyServerAccess(ctx, serverName); err != nil {
		return nil, err
	}

	defer func() {
		m.metrics.RecordPromptCall(ctx, serverName, promptName, outcome, time.Since(started))
	}()

	server, err := m.GetMcpServer(lookupCtx, serverName)
	if err != nil {
		outcome = telemetry.PromptCallOutcomeError

		return nil, fmt.Errorf(
			"failed to get details about MCP server %s from DB: %w", serverName, err,
		)
	}
	if id, ok := tenant.PresentID(effectiveTenant); ok && server.TenantID != id {
		return nil, fmt.Errorf("prompt tenant does not match server record: %w", apierrors.ErrInvalidInput)
	}

	session, err := m.getSession(ctx, server)
	if err != nil {
		outcome = telemetry.PromptCallOutcomeError
		return nil, err
	}
	defer session.closeIfApplicable()

	request.Params.Name = promptName
	request.Header = nil

	res, err := session.client.GetPrompt(ctx, request)
	if err != nil {
		outcome = telemetry.PromptCallOutcomeError
		session.invalidateOnError(err)
	}

	return res, err
}

// MCPProxyPromptHandler forwards getPrompt to upstream MCP servers; exposed for prompt-group proxy servers.
func (m *MCPService) MCPProxyPromptHandler(ctx context.Context, request mcp.GetPromptRequest) (*mcp.GetPromptResult, error) {
	return m.mcpProxyPromptHandler(ctx, request)
}

// initMCPProxyServer initializes the MCP proxy server.
// It loads all the registered MCP tools, prompts and resources from the database into the proxy server.
func (m *MCPService) initMCPProxyServer() error {
	mcpServerModelsCache := make(map[string]*model.McpServer)

	var tools []model.Tool
	if err := m.db.Preload("Server").Find(&tools).Error; err != nil {
		return fmt.Errorf("failed to list tools from DB: %w", err)
	}

	for _, tm := range tools {
		if !tm.Enabled {
			continue
		}

		tool, err := convertToolModelToMcpObject(&tm)
		if err != nil {
			return fmt.Errorf("failed to convert tool model to MCP object for tool %s: %w", tm.Name, err)
		}

		canonical := mergeServerToolNames(tm.Server.Name, tm.Name)
		tool.Name = tenant.QualifyProxyName(tm.TenantID, canonical)

		var server *model.McpServer
		cacheKey := tenant.SessionKey(tm.TenantID, tm.Server.Name)
		server, exists := mcpServerModelsCache[cacheKey]
		if !exists {
			server = &tm.Server
			mcpServerModelsCache[cacheKey] = server
		}

		if server.Transport == types.TransportSSE {
			m.sseMcpProxyServer.AddTool(tool, m.MCPProxyToolCallHandler)
		} else {
			m.mcpProxyServer.AddTool(tool, m.MCPProxyToolCallHandler)
		}

		m.addToolInstance(tool)
	}

	var prompts []model.Prompt
	if err := m.db.Preload("Server").Find(&prompts).Error; err != nil {
		return fmt.Errorf("failed to list prompts from DB: %w", err)
	}

	for _, pm := range prompts {
		if !pm.Enabled {
			continue
		}

		prompt, err := convertPromptModelToMcpObject(&pm)
		if err != nil {
			return fmt.Errorf("failed to convert prompt model to MCP object for prompt %s: %w", pm.Name, err)
		}

		canonical := mergeServerPromptNames(pm.Server.Name, pm.Name)
		prompt.Name = tenant.QualifyProxyName(pm.TenantID, canonical)

		cacheKey := tenant.SessionKey(pm.TenantID, pm.Server.Name)
		server, exists := mcpServerModelsCache[cacheKey]
		if !exists {
			server = &pm.Server
			mcpServerModelsCache[cacheKey] = server
		}

		if server.Transport == types.TransportSSE {
			m.sseMcpProxyServer.AddPrompt(prompt, m.mcpProxyPromptHandler)
		} else {
			m.mcpProxyServer.AddPrompt(prompt, m.mcpProxyPromptHandler)
		}
		m.trackPromptProxyName(prompt.Name)
	}

	var resources []model.Resource
	if err := m.db.Preload("Server").Find(&resources).Error; err != nil {
		return fmt.Errorf("failed to list resources from DB: %w", err)
	}

	for _, rm := range resources {
		if !rm.Enabled {
			continue
		}

		resource, err := convertResourceModelToMcpObject(&rm)
		if err != nil {
			return fmt.Errorf("failed to convert resource model to MCP object for resource %s: %w", rm.URI, err)
		}
		resource.Name = mergeServerResourceNames(rm.Server.Name, rm.Name)

		if rm.Server.Transport == types.TransportSSE {
			m.sseMcpProxyServer.AddResource(resource, m.mcpProxyResourceHandler)
		} else {
			m.mcpProxyServer.AddResource(resource, m.mcpProxyResourceHandler)
		}
		m.trackResourceProxyURI(resource.URI)
	}

	return nil
}
