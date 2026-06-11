// Package mcp provides MCP (Model Context Protocol) service functionality for the SAMI MCP Gateway application.
package mcp

import (
	"context"
	"fmt"
	"sync"

	mcpgotransport "github.com/mark3labs/mcp-go/client/transport"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"sami.io/mcpgateway/internal/registrysync"
	"sami.io/mcpgateway/internal/service/restadapter"
	"sami.io/mcpgateway/internal/telemetry"
	"gorm.io/gorm"
)

// ServiceConfig holds the configuration parameters for initializing the MCPService.
type ServiceConfig struct {
	DB *gorm.DB

	McpProxyServer    *server.MCPServer
	SseMcpProxyServer *server.MCPServer

	Metrics telemetry.CustomMetrics

	McpServerInitReqTimeout int

	// SessionManager manages persistent connections for MCP servers configured in stateful mode.
	// If nil, a default SessionManager will be created.
	SessionManager *SessionManager
}

// MCPService coordinates operations amongst the registry database, mcp proxy server and upstream MCP servers.
// It is responsible for maintaining data consistency and providing a unified interface for MCP operations.
type MCPService struct {
	db *gorm.DB

	mcpProxyServer    *server.MCPServer
	sseMcpProxyServer *server.MCPServer

	// toolInstances keeps track of all the in-memory mcp.Tool instances, keyed by their unique names.
	toolInstances map[string]mcp.Tool
	mu            sync.RWMutex

	// promptProxyNames and resourceProxyURIs track global proxy membership for purge/reconcile without DB.
	promptProxyNames  map[string]struct{}
	resourceProxyURIs map[string]struct{}
	proxyCatalogMu    sync.RWMutex

	notifier registrysync.Notifier
	originID string

	// toolDeletionCallback is a callback that gets invoked when one or more tools is removed
	// (deregistered or disabled) from sami-mcp-gateway.
	toolDeletionCallback ToolDeletionCallback
	// toolAdditionCallback is a callback that gets invoked when one or more tools is added
	// (registered or (re)enabled) in sami-mcp-gateway.
	toolAdditionCallback ToolAdditionCallback

	// promptDeletionCallback is invoked when prompts are removed from the global MCP proxy (deregister/disable).
	promptDeletionCallback PromptDeletionCallback
	// promptAdditionCallback is invoked when a prompt is added to the global proxy (register/re-enable).
	promptAdditionCallback PromptAdditionCallback

	metrics telemetry.CustomMetrics

	mcpServerInitReqTimeoutSec int

	// sessionManager manages persistent connections for MCP servers configured in stateful mode.
	sessionManager *SessionManager

	// restExecutor executes tool calls against REST/OpenAPI upstream servers.
	restExecutor *restadapter.Executor
}

// NewMCPService creates a new instance of MCPService.
// It initializes the MCP proxy server by loading all registered tools, prompts and resources from the database.
func NewMCPService(c *ServiceConfig) (*MCPService, error) {
	if c == nil {
		return nil, fmt.Errorf("service config is nil")
	}
	if c.DB == nil {
		return nil, fmt.Errorf("database connection is nil")
	}
	if c.McpProxyServer == nil || c.SseMcpProxyServer == nil {
		return nil, fmt.Errorf("mcp proxy servers must not be nil")
	}

	// Use the provided session manager, or create a default one if not provided
	sessionManager := c.SessionManager
	if sessionManager == nil {
		sessionManager = NewSessionManager(&SessionManagerConfig{
			DB:                c.DB,
			IdleTimeoutSec:    DefaultSessionIdleTimeoutSec,
			InitReqTimeoutSec: c.McpServerInitReqTimeout,
		})
	}

	s := &MCPService{
		db: c.DB,

		mcpProxyServer:    c.McpProxyServer,
		sseMcpProxyServer: c.SseMcpProxyServer,

		toolInstances:     make(map[string]mcp.Tool),
		mu:                sync.RWMutex{},
		promptProxyNames:  make(map[string]struct{}),
		resourceProxyURIs: make(map[string]struct{}),
		proxyCatalogMu:    sync.RWMutex{},
		notifier:          registrysync.NoopNotifier{},

		// initialize the callbacks to NOOP functions
		toolDeletionCallback: func(toolNames ...string) {},
		toolAdditionCallback: func(toolName string) error { return nil },

		promptDeletionCallback: func(qualifiedPromptNames ...string) {},
		promptAdditionCallback: func(qualifiedPromptName string) error { return nil },

		metrics: c.Metrics,

		mcpServerInitReqTimeoutSec: c.McpServerInitReqTimeout,

		sessionManager: sessionManager,
		restExecutor: restadapter.NewExecutor(c.DB, func(ctx context.Context, tenantID, serverName string) (*mcpgotransport.Token, error) {
			return loadUpstreamOAuthTokenForREST(ctx, c.DB, tenantID, serverName)
		}),
	}
	if err := s.initMCPProxyServer(); err != nil {
		return nil, fmt.Errorf("failed to initialize MCP proxy server: %w", err)
	}
	return s, nil
}

// Shutdown gracefully shuts down the MCP service, closing all stateful sessions.
func (m *MCPService) Shutdown() {
	if m.sessionManager != nil {
		m.sessionManager.Shutdown()
	}
}
