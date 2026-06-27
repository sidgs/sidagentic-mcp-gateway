package types

// AccessTokenRef tells the CLI where to load a token (environment variable and/or file).
type AccessTokenRef struct {
	Env  string `json:"env,omitempty"`
	File string `json:"file,omitempty"`
}

// UserRole represents the role of a user in the SAMI MCP Gateway system.
type UserRole string

const (
	UserRoleAdministrator UserRole = "administrator"
	UserRoleProvider      UserRole = "provider"
	UserRoleUser          UserRole = "user"
	UserRoleAuditor       UserRole = "auditor"

	// UserRoleAdmin is the legacy enterprise admin role; normalized to administrator.
	UserRoleAdmin UserRole = "admin"
)

// NormalizeUserRole maps legacy and empty roles to the canonical role set.
func NormalizeUserRole(role UserRole) UserRole {
	switch role {
	case UserRoleAdministrator, UserRoleAdmin:
		return UserRoleAdministrator
	case UserRoleProvider:
		return UserRoleProvider
	case UserRoleAuditor:
		return UserRoleAuditor
	case UserRoleUser, "":
		return UserRoleUser
	default:
		return UserRoleUser
	}
}

// UserRoleRank returns the write-hierarchy rank for cumulative role checks.
// Auditor is outside the write hierarchy and returns -1.
func UserRoleRank(role UserRole) int {
	switch NormalizeUserRole(role) {
	case UserRoleUser:
		return 1
	case UserRoleProvider:
		return 2
	case UserRoleAdministrator:
		return 3
	case UserRoleAuditor:
		return -1
	default:
		return 1
	}
}

// HasAtLeastUserRole reports whether role meets or exceeds minRole in the write hierarchy.
func HasAtLeastUserRole(role, minRole UserRole) bool {
	if NormalizeUserRole(role) == UserRoleAuditor {
		return false
	}
	return UserRoleRank(role) >= UserRoleRank(minRole)
}

// UserConfig describes the JSON configuration for creating a user.
type UserConfig struct {
	Username       string `json:"name"`
	AccessToken    string `json:"access_token"`
	AccessTokenRef AccessTokenRef `json:"access_token_ref"`
}

// User represents an authenticated, human user in sami-mcp-gateway.
type User struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	Email    string `json:"email,omitempty"`
}

type CreateOrUpdateUserRequest struct {
	Username    string `json:"username"`
	AccessToken string `json:"access_token,omitempty"`
	Role        string `json:"role,omitempty"`
	Email       string `json:"email,omitempty"`
	OIDCSub     string `json:"oidc_sub,omitempty"`
}

type CreateOrUpdateUserResponse struct {
	Username    string `json:"username"`
	Role        string `json:"role"`
	AccessToken string `json:"access_token"`
	Email       string `json:"email,omitempty"`
}

type DashboardTeamMembership struct {
	ID          uint   `json:"id"`
	Name        string `json:"name"`
	Type        string `json:"type"`
	MemberRole  string `json:"member_role"`
}

type DashboardMeResponse struct {
	Authenticated bool                      `json:"authenticated"`
	Email         string                    `json:"email,omitempty"`
	Sub           string                    `json:"sub,omitempty"`
	Role          string                    `json:"role"`
	TenantID      string                    `json:"tenant_id"`
	PlatformAdmin bool                      `json:"platform_admin"`
	UserID        uint                      `json:"user_id"`
	Teams         []DashboardTeamMembership `json:"teams"`
}
