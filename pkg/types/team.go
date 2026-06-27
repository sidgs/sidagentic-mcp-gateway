package types

// TeamType distinguishes provider, user, and agent teams.
type TeamType string

const (
	TeamTypeProvider TeamType = "provider"
	TeamTypeUser     TeamType = "user"
	TeamTypeAgent    TeamType = "agent"
)

// TeamMemberRole is a membership role within a team.
type TeamMemberRole string

const (
	TeamMemberRoleOwner   TeamMemberRole = "owner"
	TeamMemberRoleManager TeamMemberRole = "manager"
	TeamMemberRoleMember  TeamMemberRole = "member"
)

// TeamResourceType identifies assignable catalog resources.
type TeamResourceType string

const (
	TeamResourceServer      TeamResourceType = "server"
	TeamResourceSkill       TeamResourceType = "skill"
	TeamResourceToolGroup   TeamResourceType = "tool_group"
	TeamResourcePromptGroup TeamResourceType = "prompt_group"
	TeamResourceSkillSet    TeamResourceType = "skill_set"
	TeamResourceAgentApp    TeamResourceType = "agent_app"
)

// AllowedResourceTypesForTeamType returns resource types assignable to the given team type.
func AllowedResourceTypesForTeamType(teamType TeamType) []TeamResourceType {
	switch teamType {
	case TeamTypeProvider:
		return []TeamResourceType{TeamResourceServer, TeamResourceSkill}
	case TeamTypeUser:
		return []TeamResourceType{
			TeamResourceServer,
			TeamResourceSkill,
			TeamResourceToolGroup,
			TeamResourcePromptGroup,
			TeamResourceSkillSet,
		}
	case TeamTypeAgent:
		return []TeamResourceType{TeamResourceAgentApp}
	default:
		return nil
	}
}

// ResourceTypeAllowedForTeamType reports whether resourceType can be assigned to teamType.
func ResourceTypeAllowedForTeamType(teamType TeamType, resourceType TeamResourceType) bool {
	for _, allowed := range AllowedResourceTypesForTeamType(teamType) {
		if allowed == resourceType {
			return true
		}
	}
	return false
}

type TeamPublic struct {
	ID        uint   `json:"id"`
	TenantID  string `json:"tenant_id"`
	Name      string `json:"name"`
	Type      string `json:"type"`
	CreatedBy string `json:"created_by"`
}

type TeamMemberPublic struct {
	UserID   uint   `json:"user_id"`
	Username string `json:"username,omitempty"`
	Email    string `json:"email,omitempty"`
	Role     string `json:"role"`
}

type TeamDetailResponse struct {
	Team    TeamPublic         `json:"team"`
	Members []TeamMemberPublic `json:"members"`
}

type TeamAssignmentRequest struct {
	ResourceType string `json:"resource_type"`
	ResourceName string `json:"resource_name"`
}

type SetTeamAssignmentsRequest struct {
	Assignments []TeamAssignmentRequest `json:"assignments"`
}

type AddTeamMemberRequest struct {
	UserID uint   `json:"user_id"`
	Role   string `json:"role"`
}
