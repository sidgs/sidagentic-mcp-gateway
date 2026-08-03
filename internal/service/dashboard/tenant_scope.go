package dashboard

import (
	"context"

	"sami.io/mcpgateway/pkg/tenant"
	"gorm.io/gorm"
)

func (s *Service) dbTenant(ctx context.Context) *gorm.DB {
	tid := tenant.MustFromContext(ctx)
	return s.db.WithContext(ctx).Where("tenant_id = ?", tid)
}

// dbTenantModel scopes queries to the active tenant on a specific table. Always
// use this instead of reusing a dbTenant chain after Find/Model on another table.
func (s *Service) dbTenantModel(ctx context.Context, model any) *gorm.DB {
	tid := tenant.MustFromContext(ctx)
	return s.db.WithContext(ctx).Model(model).Where("tenant_id = ?", tid)
}
