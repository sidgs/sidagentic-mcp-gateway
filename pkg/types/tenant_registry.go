package types

import "time"

type TenantStatus string

const (
	TenantStatusActive    TenantStatus = "active"
	TenantStatusSuspended TenantStatus = "suspended"
	TenantStatusRetired   TenantStatus = "retired"
	TenantStatusRemoved   TenantStatus = "removed"
)

type TenantMode string

const (
	TenantModeNormal   TenantMode = "normal"
	TenantModeReadOnly TenantMode = "read_only"
)

type AuditPublic struct {
	CreatedOn time.Time `json:"created_on"`
	CreatedBy string    `json:"created_by"`
	UpdatedOn time.Time `json:"updated_on"`
	UpdatedBy string    `json:"updated_by"`
}

type TenantPublic struct {
	ID         string       `json:"id"`
	Name       string       `json:"name"`
	Status     TenantStatus `json:"status"`
	Mode       TenantMode   `json:"mode"`
	RetireAt   *time.Time   `json:"retire_at,omitempty"`
	OwnerEmail string       `json:"owner_email"`
	AuditPublic
}

type TenantMembershipPublic struct {
	ID       uint   `json:"id"`
	TenantID string `json:"tenant_id"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	AuditPublic
}

type AccessibleTenant struct {
	ID         string       `json:"id"`
	Name       string       `json:"name"`
	Status     TenantStatus `json:"status"`
	Mode       TenantMode   `json:"mode"`
	RetireAt   *time.Time   `json:"retire_at,omitempty"`
	Role       string       `json:"role,omitempty"`
	Accessible bool         `json:"accessible"`
	Reason     string       `json:"reason,omitempty"`
}

type ListAccessibleTenantsResponse struct {
	PlatformAdmin bool               `json:"platform_admin"`
	Tenants       []AccessibleTenant `json:"tenants"`
}

type SelectTenantRequest struct {
	TenantID string `json:"tenant_id"`
}

type SelectTenantResponse struct {
	AccessToken   string `json:"access_token"`
	TenantID      string `json:"tenant_id"`
	Role          string `json:"role"`
	PlatformAdmin bool   `json:"platform_admin"`
	ExpiresAt     int64  `json:"expires_at"`
}

type CreateTenantRequest struct {
	ID         string `json:"tenant_id"`
	Name       string `json:"name"`
	OwnerEmail string `json:"owner_email"`
}

type UpdateTenantRequest struct {
	Name     *string       `json:"name,omitempty"`
	Status   *TenantStatus `json:"status,omitempty"`
	Mode     *TenantMode   `json:"mode,omitempty"`
	RetireAt *time.Time    `json:"retire_at,omitempty"`
}

type RetireTenantRequest struct {
	RetireAt time.Time `json:"retire_at"`
}

type SetTenantModeRequest struct {
	Mode TenantMode `json:"mode"`
}

type AddTenantMemberRequest struct {
	Email string `json:"email"`
	Role  string `json:"role"`
}

type PatchTenantMemberRequest struct {
	Role string `json:"role"`
}
