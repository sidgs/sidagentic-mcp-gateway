// Package registrycoord applies cross-pod registry sync events to in-memory MCP state.
// It lives outside internal/registrysync to avoid import cycles with service packages.
package registrycoord

import (
	"context"
	"log"

	"sami.io/mcpgateway/internal/registrysync"
	"sami.io/mcpgateway/internal/service/mcp"
	"sami.io/mcpgateway/internal/service/promptgroup"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/pkg/tenant"
)

// SSEInvalidator drops cached SSE MCP sessions for tool/prompt groups.
type SSEInvalidator interface {
	InvalidateToolGroupSSECache(tenantID, groupName string)
	InvalidatePromptGroupSSECache(tenantID, groupName string)
}

// Coordinator applies registry sync events by re-reading Postgres and updating in-memory proxies.
type Coordinator struct {
	originID       string
	toolGroups     *toolgroup.ToolGroupService
	promptGroups   *promptgroup.PromptGroupService
	mcpService     *mcp.MCPService
	sseInvalidator SSEInvalidator
}

// NewCoordinator wires reload handlers for subscriber dispatch.
func NewCoordinator(
	originID string,
	toolGroups *toolgroup.ToolGroupService,
	promptGroups *promptgroup.PromptGroupService,
	mcpService *mcp.MCPService,
	sseInvalidator SSEInvalidator,
) *Coordinator {
	return &Coordinator{
		originID:       originID,
		toolGroups:     toolGroups,
		promptGroups:   promptGroups,
		mcpService:     mcpService,
		sseInvalidator: sseInvalidator,
	}
}

// Handle processes a single registry event. Handlers are idempotent.
func (c *Coordinator) Handle(ctx context.Context, ev registrysync.Event) {
	if c == nil {
		return
	}
	if ev.OriginID != "" && ev.OriginID == c.originID {
		return
	}

	switch ev.Type {
	case registrysync.EventToolGroupReload:
		if ev.TenantID == "" || ev.Name == "" {
			return
		}
		gctx := tenant.WithContext(ctx, ev.TenantID)
		if err := c.toolGroups.ReloadFromDB(gctx, ev.TenantID, ev.Name); err != nil {
			log.Printf("[registrysync] tool_group.reload %s/%s: %v", ev.TenantID, ev.Name, err)
		}
		if c.sseInvalidator != nil {
			c.sseInvalidator.InvalidateToolGroupSSECache(ev.TenantID, ev.Name)
		}
	case registrysync.EventToolGroupDelete:
		if ev.TenantID == "" || ev.Name == "" {
			return
		}
		c.toolGroups.RemoveFromMemory(ev.TenantID, ev.Name)
		if c.sseInvalidator != nil {
			c.sseInvalidator.InvalidateToolGroupSSECache(ev.TenantID, ev.Name)
		}
	case registrysync.EventPromptGroupReload:
		if ev.TenantID == "" || ev.Name == "" {
			return
		}
		gctx := tenant.WithContext(ctx, ev.TenantID)
		if err := c.promptGroups.ReloadFromDB(gctx, ev.TenantID, ev.Name); err != nil {
			log.Printf("[registrysync] prompt_group.reload %s/%s: %v", ev.TenantID, ev.Name, err)
		}
		if c.sseInvalidator != nil {
			c.sseInvalidator.InvalidatePromptGroupSSECache(ev.TenantID, ev.Name)
		}
	case registrysync.EventPromptGroupDelete:
		if ev.TenantID == "" || ev.Name == "" {
			return
		}
		c.promptGroups.RemoveFromMemory(ev.TenantID, ev.Name)
		if c.sseInvalidator != nil {
			c.sseInvalidator.InvalidatePromptGroupSSECache(ev.TenantID, ev.Name)
		}
	case registrysync.EventServerCatalogReload:
		if ev.TenantID == "" || ev.Name == "" {
			return
		}
		gctx := tenant.WithContext(ctx, ev.TenantID)
		if err := c.mcpService.ReloadServerCatalogFromDB(gctx, ev.TenantID, ev.Name); err != nil {
			log.Printf("[registrysync] server.catalog_reload %s/%s: %v", ev.TenantID, ev.Name, err)
		}
	case registrysync.EventServerPurge:
		if ev.TenantID == "" || ev.Name == "" {
			return
		}
		c.mcpService.PurgeServerFromProxy(ev.TenantID, ev.Name)
	case registrysync.EventRegistryFullReload:
		if err := c.FullReload(ctx); err != nil {
			log.Printf("[registrysync] registry.full_reload: %v", err)
		}
	default:
		log.Printf("[registrysync] unknown event type %q", ev.Type)
	}
}

// FullReload re-runs startup initialization paths locally (safety net).
func (c *Coordinator) FullReload(ctx context.Context) error {
	if err := c.mcpService.ReconcileGlobalProxyFromDB(ctx); err != nil {
		return err
	}
	if err := c.toolGroups.ReloadAllFromDB(ctx); err != nil {
		return err
	}
	return c.promptGroups.ReloadAllFromDB(ctx)
}
