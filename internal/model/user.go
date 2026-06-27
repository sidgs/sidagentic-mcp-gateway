// Package model provides data models for the SAMI MCP Gateway application.
package model

import (
	"sami.io/mcpgateway/pkg/types"
)

// User represents an authenticated, human user in enterprise mode.
type User struct {
	BaseModel

	TenantID string `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_user_tenant_username;uniqueIndex:ux_user_tenant_token"`

	Username    string         `json:"username" gorm:"uniqueIndex:ux_user_tenant_username;not null"`
	Role        types.UserRole `json:"role" gorm:"not null;default:user"`
	AccessToken string         `json:"access_token" gorm:"uniqueIndex:ux_user_tenant_token;not null"`
	Email       string         `json:"email,omitempty" gorm:"size:320"`
	OIDCSub     string         `json:"oidc_sub,omitempty" gorm:"size:255;column:oidc_sub"`
}

// EffectiveRole returns the normalized role for authorization.
func (u *User) EffectiveRole() types.UserRole {
	return types.NormalizeUserRole(u.Role)
}
