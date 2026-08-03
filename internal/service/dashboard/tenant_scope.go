package dashboard

import (
	"context"
	"fmt"

	"sami.io/mcpgateway/pkg/tenant"
	"gorm.io/gorm"
)

func (s *Service) dbTenant(ctx context.Context) *gorm.DB {
	tid := tenant.MustFromContext(ctx)
	return s.db.WithContext(ctx).Where("tenant_id = ?", tid)
}

// dbTenantModel scopes queries to the active tenant on a specific table. Always
// use this instead of reusing a dbTenant chain after Find/Model on another table.
// The tenant filter is table-qualified so joins to other tenant_id columns stay unambiguous.
func modelTableName(db *gorm.DB, model any) string {
	if db.Statement != nil {
		if db.Statement.Table != "" {
			return db.Statement.Table
		}
		if db.Statement.Schema != nil && db.Statement.Schema.Table != "" {
			return db.Statement.Schema.Table
		}
		if err := db.Statement.Parse(model); err == nil && db.Statement.Schema != nil && db.Statement.Schema.Table != "" {
			return db.Statement.Schema.Table
		}
	}
	stmt := &gorm.Statement{DB: db}
	if err := stmt.Parse(model); err == nil && stmt.Schema != nil {
		return stmt.Schema.Table
	}
	return ""
}

func (s *Service) dbTenantModel(ctx context.Context, model any) *gorm.DB {
	tid := tenant.MustFromContext(ctx)
	db := s.db.WithContext(ctx).Model(model)
	table := modelTableName(db, model)
	if table == "" {
		return db.Where("tenant_id = ?", tid)
	}
	return db.Where(fmt.Sprintf("%s.tenant_id = ?", table), tid)
}
