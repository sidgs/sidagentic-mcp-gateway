// Package model provides data models for the SAMI MCP Gateway application.
package model

import (
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/gorm"
)

// User represents an authenticated, human user in enterprise mode.
// A user can be an admin or a regular user.
// There are no users if sami-mcp-gateway is running in development mode.
type User struct {
	gorm.Model

	TenantID string `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_user_tenant_username;uniqueIndex:ux_user_tenant_token"`

	Username    string         `json:"username" gorm:"uniqueIndex:ux_user_tenant_username;not null"`
	Role        types.UserRole `json:"role" gorm:"not null"`
	AccessToken string         `json:"access_token" gorm:"uniqueIndex:ux_user_tenant_token;not null"`
}
