package authz_test

import (
	"testing"

	"sami.io/mcpgateway/internal/authz"
	"sami.io/mcpgateway/pkg/types"
)

func TestHasAtLeastUserRole(t *testing.T) {
	t.Parallel()
	if !types.HasAtLeastUserRole(types.UserRoleProvider, types.UserRoleUser) {
		t.Fatal("provider should inherit user")
	}
	if !types.HasAtLeastUserRole(types.UserRoleAdministrator, types.UserRoleProvider) {
		t.Fatal("administrator should inherit provider")
	}
	if types.HasAtLeastUserRole(types.UserRoleUser, types.UserRoleProvider) {
		t.Fatal("user should not satisfy provider")
	}
	if types.HasAtLeastUserRole(types.UserRoleAuditor, types.UserRoleUser) {
		t.Fatal("auditor is outside write hierarchy")
	}
}

func TestPrincipalAgentAppVisibility(t *testing.T) {
	t.Parallel()
	owner := &authz.Principal{
		Role:          types.UserRoleUser,
		OwnerScopeKey: "oidc:owner",
	}
	if !owner.CanSeeAgentApp("oidc:owner", nil) {
		t.Fatal("owner should see own app")
	}
	if owner.CanSeeAgentApp("oidc:other", nil) {
		t.Fatal("non-owner should not see app without agent teams")
	}
	member := &authz.Principal{
		Role: types.UserRoleUser,
		TeamMemberships: []authz.TeamMembership{
			{TeamID: 7, TeamType: types.TeamTypeAgent, MemberRole: types.TeamMemberRoleMember},
		},
	}
	if !member.CanSeeAgentApp("oidc:other", []uint{7}) {
		t.Fatal("team member should see assigned app")
	}
}

func TestNormalizeUserRole(t *testing.T) {
	t.Parallel()
	if types.NormalizeUserRole(types.UserRoleAdmin) != types.UserRoleAdministrator {
		t.Fatal("legacy admin should normalize to administrator")
	}
	if types.NormalizeUserRole("") != types.UserRoleUser {
		t.Fatal("empty role should default to user")
	}
}
