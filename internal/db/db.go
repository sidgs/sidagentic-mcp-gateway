// Package db provides database functionality for the SAMI MCP Gateway application.
package db

import (
	"fmt"

	"sami.io/mcpgateway/internal/dbconfig"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// NewDBConnection creates a Postgres connection from a non-empty DSN.
func NewDBConnection(dsn string) (*gorm.DB, error) {
	if dsn == "" {
		return nil, fmt.Errorf("database DSN is required (Postgres only; set %s or POSTGRES_* env vars)", dbconfig.DatabaseURLEnvVar)
	}
	c := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	}
	db, err := gorm.Open(postgres.Open(dsn), c)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	return db, nil
}

// SchemaReady reports whether core gateway tables exist (Flyway migrations applied).
func SchemaReady(db *gorm.DB) (bool, error) {
	var count int64
	err := db.Raw(
		`SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = CURRENT_SCHEMA() AND table_name = 'mcp_servers'`,
	).Scan(&count).Error
	if err != nil {
		return false, err
	}
	return count > 0, nil
}
