// Package migrations provides database migration functionality for the SAMI MCP Gateway application.
package migrations

import (
	"fmt"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
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
	if err := ensureUserIdentityColumns(db); err != nil {
		return err
	}
	if err := db.AutoMigrate(&model.User{}); err != nil {
		return fmt.Errorf("auto‑migration failed for User model: %v", err)
	}
	if err := db.AutoMigrate(&model.ToolGroup{}); err != nil {
		return fmt.Errorf("auto‑migration failed for ToolGroup model: %v", err)
	}
	if err := db.AutoMigrate(&model.PromptGroup{}); err != nil {
		return fmt.Errorf("auto-migration failed for PromptGroup model: %v", err)
	}
	if err := db.AutoMigrate(&model.AgentApp{}); err != nil {
		return fmt.Errorf("auto-migration failed for AgentApp model: %v", err)
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
	if err := db.AutoMigrate(&model.ToolInvocationEvent{}); err != nil {
		return fmt.Errorf("auto-migration failed for ToolInvocationEvent model: %v", err)
	}
	if err := db.AutoMigrate(&model.Skill{}); err != nil {
		return fmt.Errorf("auto-migration failed for Skill model: %v", err)
	}
	if err := db.AutoMigrate(&model.SkillVersion{}); err != nil {
		return fmt.Errorf("auto-migration failed for SkillVersion model: %v", err)
	}
	if err := db.AutoMigrate(&model.SkillSet{}); err != nil {
		return fmt.Errorf("auto-migration failed for SkillSet model: %v", err)
	}
	if err := db.AutoMigrate(&model.SkillSetMember{}); err != nil {
		return fmt.Errorf("auto-migration failed for SkillSetMember model: %v", err)
	}
	if err := db.AutoMigrate(&model.SkillScript{}); err != nil {
		return fmt.Errorf("auto-migration failed for SkillScript model: %v", err)
	}
	if err := db.AutoMigrate(&model.SkillReference{}); err != nil {
		return fmt.Errorf("auto-migration failed for SkillReference model: %v", err)
	}
	if err := db.AutoMigrate(&model.Team{}); err != nil {
		return fmt.Errorf("auto-migration failed for Team model: %v", err)
	}
	if err := db.AutoMigrate(&model.TeamMember{}); err != nil {
		return fmt.Errorf("auto-migration failed for TeamMember model: %v", err)
	}
	if err := db.AutoMigrate(&model.TeamResourceAssignment{}); err != nil {
		return fmt.Errorf("auto-migration failed for TeamResourceAssignment model: %v", err)
	}
	if err := backfillServerKind(db); err != nil {
		return err
	}
	if err := backfillAdminRole(db); err != nil {
		return err
	}
	return backfillTenantColumns(db)
}

func ensureUserIdentityColumns(db *gorm.DB) error {
	stmts := []string{
		`ALTER TABLE users ADD COLUMN IF NOT EXISTS email varchar(320) NOT NULL DEFAULT ''`,
		`ALTER TABLE users ADD COLUMN IF NOT EXISTS oidc_sub varchar(255) NOT NULL DEFAULT ''`,
	}
	for _, q := range stmts {
		if err := db.Exec(q).Error; err != nil {
			return fmt.Errorf("users identity columns: %w", err)
		}
	}
	indexStmts := []string{
		`CREATE UNIQUE INDEX IF NOT EXISTS ux_user_tenant_email ON users (tenant_id, email) WHERE email <> ''`,
		`CREATE UNIQUE INDEX IF NOT EXISTS ux_user_tenant_oidc_sub ON users (tenant_id, oidc_sub) WHERE oidc_sub <> ''`,
	}
	for _, q := range indexStmts {
		if err := db.Exec(q).Error; err != nil {
			return fmt.Errorf("users identity indexes: %w", err)
		}
	}
	return nil
}

func backfillAdminRole(db *gorm.DB) error {
	if err := db.Exec(
		"UPDATE users SET role = ? WHERE role = ?",
		string(types.UserRoleAdministrator),
		string(types.UserRoleAdmin),
	).Error; err != nil {
		return fmt.Errorf("admin role backfill: %w", err)
	}
	return nil
}

func backfillServerKind(db *gorm.DB) error {
	if err := db.Exec(
		"UPDATE mcp_servers SET server_kind = ? WHERE server_kind = '' OR server_kind IS NULL",
		string(types.ServerKindMCPProtocol),
	).Error; err != nil {
		return fmt.Errorf("server_kind backfill mcp_servers: %w", err)
	}
	return nil
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
		ns.TableName("ToolGroup"),
		ns.TableName("PromptGroup"),
		ns.TableName("AgentApp"),
		ns.TableName("Skill"),
		ns.TableName("SkillSet"),
		ns.TableName("Team"),
		ns.TableName("TeamMember"),
		ns.TableName("TeamResourceAssignment"),
		ns.TableName("UpstreamOAuthPendingSession"),
		ns.TableName("UpstreamOAuthToken"),
	} {
		if err := db.Exec("UPDATE "+table+" SET tenant_id = ? WHERE tenant_id = '' OR tenant_id IS NULL", def).Error; err != nil {
			return fmt.Errorf("tenant backfill %s: %w", table, err)
		}
	}
	return nil
}
