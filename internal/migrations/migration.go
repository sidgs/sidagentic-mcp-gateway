// Package migrations provides database migration functionality for the MCPJungle application.
package migrations

import (
	"fmt"

	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

// Migrate performs the database migration for the application.
func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(&model.McpServer{}); err != nil {
		return fmt.Errorf("auto‑migration failed for McpServer model: %v", err)
	}
	if err := db.AutoMigrate(&model.Tool{}); err != nil {
		return fmt.Errorf("auto‑migration failed for Tool model: %v", err)
	}
	if err := db.AutoMigrate(&model.ServerConfig{}); err != nil {
		return fmt.Errorf("auto‑migration failed for ServerConfig model: %v", err)
	}
	if err := db.AutoMigrate(&model.User{}); err != nil {
		return fmt.Errorf("auto‑migration failed for User model: %v", err)
	}
	if err := db.AutoMigrate(&model.McpClient{}); err != nil {
		return fmt.Errorf("auto‑migration failed for McpClient model: %v", err)
	}
	if err := db.AutoMigrate(&model.ToolGroup{}); err != nil {
		return fmt.Errorf("auto‑migration failed for ToolGroup model: %v", err)
	}
	if err := db.AutoMigrate(&model.Prompt{}); err != nil {
		return fmt.Errorf("auto‑migration failed for Prompt model: %v", err)
	}
	if err := db.AutoMigrate(&model.Resource{}); err != nil {
		return fmt.Errorf("auto‑migration failed for Resource model: %v", err)
	}
	if err := db.AutoMigrate(&model.UpstreamOAuthPendingSession{}); err != nil {
		return fmt.Errorf("auto-migration failed for UpstreamOAuthPendingSession model: %v", err)
	}
	if err := db.AutoMigrate(&model.UpstreamOAuthToken{}); err != nil {
		return fmt.Errorf("auto-migration failed for UpstreamOAuthToken model: %v", err)
	}
	return backfillTenantColumns(db)
}

func backfillTenantColumns(db *gorm.DB) error {
	def := tenant.DefaultID
	if err := db.Exec("UPDATE mcp_servers SET tenant_id = ? WHERE tenant_id = '' OR tenant_id IS NULL", def).Error; err != nil {
		return fmt.Errorf("tenant backfill mcp_servers: %w", err)
	}
	stmts := []string{
		`UPDATE tools SET tenant_id = COALESCE((SELECT tenant_id FROM mcp_servers WHERE mcp_servers.id = tools.server_id), ?) WHERE tenant_id = '' OR tenant_id IS NULL`,
		`UPDATE prompts SET tenant_id = COALESCE((SELECT tenant_id FROM mcp_servers WHERE mcp_servers.id = prompts.server_id), ?) WHERE tenant_id = '' OR tenant_id IS NULL`,
		`UPDATE resources SET tenant_id = COALESCE((SELECT tenant_id FROM mcp_servers WHERE mcp_servers.id = resources.server_id), ?) WHERE tenant_id = '' OR tenant_id IS NULL`,
	}
	for _, q := range stmts {
		if err := db.Exec(q, def).Error; err != nil {
			return fmt.Errorf("tenant backfill: %w", err)
		}
	}
	ns := schema.NamingStrategy{}
	for _, table := range []string{
		ns.TableName("ServerConfig"),
		ns.TableName("User"),
		ns.TableName("McpClient"),
		ns.TableName("ToolGroup"),
		ns.TableName("UpstreamOAuthPendingSession"),
		ns.TableName("UpstreamOAuthToken"),
	} {
		if err := db.Exec("UPDATE "+table+" SET tenant_id = ? WHERE tenant_id = '' OR tenant_id IS NULL", def).Error; err != nil {
			return fmt.Errorf("tenant backfill %s: %w", table, err)
		}
	}
	return nil
}
