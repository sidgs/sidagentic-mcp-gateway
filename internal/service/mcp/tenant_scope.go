package mcp

import (
	"context"

	"sami.io/mcpgateway/pkg/tenant"
	"gorm.io/gorm"
)

func (m *MCPService) dbTenant(ctx context.Context) *gorm.DB {
	tid := tenant.MustFromContext(ctx)
	return m.db.WithContext(ctx).Where("tenant_id = ?", tid)
}
