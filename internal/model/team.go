package model

import (
	"sami.io/mcpgateway/pkg/types"
)

// Team groups users for scoped access to catalog resources or agent apps.
type Team struct {
	BaseModel

	TenantID        string         `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_team_tenant_name_type"`
	Name            string         `json:"name" gorm:"size:255;not null;uniqueIndex:ux_team_tenant_name_type"`
	Type            types.TeamType `json:"type" gorm:"size:32;not null;uniqueIndex:ux_team_tenant_name_type"`
	CreatedByUserID uint           `json:"created_by_user_id" gorm:"not null;index"`
}

// TeamMember links a gateway user to a team with a membership role.
type TeamMember struct {
	BaseModel

	TenantID string               `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_team_member_tenant_team_user"`
	TeamID   uint                 `json:"team_id" gorm:"not null;uniqueIndex:ux_team_member_tenant_team_user;index"`
	UserID   uint                 `json:"user_id" gorm:"not null;uniqueIndex:ux_team_member_tenant_team_user;index"`
	Role     types.TeamMemberRole `json:"role" gorm:"size:32;not null"`
}

// IsTeamMemberRole counts owner, manager, and member as team members for visibility.
func IsTeamMemberRole(role types.TeamMemberRole) bool {
	switch role {
	case types.TeamMemberRoleOwner, types.TeamMemberRoleManager, types.TeamMemberRoleMember:
		return true
	default:
		return false
	}
}

// CanManageTeamMembers reports whether the membership role may add/remove members.
func CanManageTeamMembers(role types.TeamMemberRole) bool {
	switch role {
	case types.TeamMemberRoleOwner, types.TeamMemberRoleManager:
		return true
	default:
		return false
	}
}

// TeamResourceAssignment binds a resource to a team for scoped visibility or management.
type TeamResourceAssignment struct {
	BaseModel

	TenantID     string                 `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_team_resource_tenant_team_type_name"`
	TeamID       uint                   `json:"team_id" gorm:"not null;uniqueIndex:ux_team_resource_tenant_team_type_name;index"`
	ResourceType types.TeamResourceType `json:"resource_type" gorm:"size:64;not null;uniqueIndex:ux_team_resource_tenant_team_type_name;index:idx_team_resource_lookup,priority:2"`
	ResourceName string                 `json:"resource_name" gorm:"size:255;not null;uniqueIndex:ux_team_resource_tenant_team_type_name;index:idx_team_resource_lookup,priority:3"`
}
