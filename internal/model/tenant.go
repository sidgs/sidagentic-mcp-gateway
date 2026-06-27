package model

import (
	"time"

	"sami.io/mcpgateway/pkg/types"
)

// TenantStatus is the lifecycle status of a tenant registry row.
type TenantStatus string

const (
	TenantStatusActive    TenantStatus = "active"
	TenantStatusSuspended TenantStatus = "suspended"
	TenantStatusRetired   TenantStatus = "retired"
	TenantStatusRemoved   TenantStatus = "removed"
)

// TenantMode controls whether mutations are allowed for non-platform admins.
type TenantMode string

const (
	TenantModeNormal   TenantMode = "normal"
	TenantModeReadOnly TenantMode = "read_only"
)

// Tenant is the platform registry entry for a tenant.
type Tenant struct {
	ID         string       `json:"id" gorm:"primaryKey;size:255"`
	Name       string       `json:"name" gorm:"size:255;not null"`
	Status     TenantStatus `json:"status" gorm:"size:32;not null;default:active;index"`
	Mode       TenantMode   `json:"mode" gorm:"size:32;not null;default:normal"`
	RetireAt   *time.Time   `json:"retire_at,omitempty"`
	OwnerEmail string       `json:"owner_email" gorm:"size:320;not null;default:''"`
	AuditFields
}

func (Tenant) TableName() string { return "tenants" }

// TenantMembership links a global identity to a tenant with a role.
type TenantMembership struct {
	BaseModel
	TenantID string         `json:"tenant_id" gorm:"size:255;not null;uniqueIndex:ux_tenant_membership_tenant_sub;index"`
	OIDCSub  string         `json:"oidc_sub" gorm:"column:oidc_sub;size:255;not null;uniqueIndex:ux_tenant_membership_tenant_sub;index"`
	Email    string         `json:"email" gorm:"size:320;not null;default:'';index"`
	Role     types.UserRole `json:"role" gorm:"size:32;not null;default:user"`
}

func (TenantMembership) TableName() string { return "tenant_memberships" }
