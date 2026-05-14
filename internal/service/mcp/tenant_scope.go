package mcp

import (
	"context"

	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"gorm.io/gorm"
)

func (m *MCPService) dbTenant(ctx context.Context) *gorm.DB {
	tid := tenant.MustFromContext(ctx)
	return m.db.WithContext(ctx).Where("tenant_id = ?", tid)
}
