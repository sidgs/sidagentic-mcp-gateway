package authz

import (
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

// TeamMembership summarizes a user's membership in one team.
type TeamMembership struct {
	TeamID     uint
	TeamName   string
	TeamType   types.TeamType
	MemberRole types.TeamMemberRole
}

// Principal is the authenticated dashboard operator.
type Principal struct {
	UserID          uint
	Username        string
	Email           string
	Sub             string
	Role            types.UserRole
	OwnerScopeKey   string
	TeamMemberships []TeamMembership
}

func (p *Principal) EffectiveRole() types.UserRole {
	if p == nil {
		return types.UserRoleUser
	}
	return types.NormalizeUserRole(p.Role)
}

func (p *Principal) IsAuditor() bool {
	return p.EffectiveRole() == types.UserRoleAuditor
}

func (p *Principal) HasAtLeast(min types.UserRole) bool {
	return types.HasAtLeastUserRole(p.EffectiveRole(), min)
}

func (p *Principal) CanWrite() bool {
	return p != nil && !p.IsAuditor()
}

func (p *Principal) TeamIDsOfType(teamType types.TeamType) []uint {
	if p == nil {
		return nil
	}
	var ids []uint
	for _, m := range p.TeamMemberships {
		if m.TeamType == teamType && model.IsTeamMemberRole(m.MemberRole) {
			ids = append(ids, m.TeamID)
		}
	}
	return ids
}

func (p *Principal) IsMemberOfTeam(teamID uint) bool {
	for _, m := range p.TeamMemberships {
		if m.TeamID == teamID && model.IsTeamMemberRole(m.MemberRole) {
			return true
		}
	}
	return false
}

func (p *Principal) CanManageMembersOfTeam(teamID uint) bool {
	for _, m := range p.TeamMemberships {
		if m.TeamID == teamID && model.CanManageTeamMembers(m.MemberRole) {
			return true
		}
	}
	return false
}

func (p *Principal) CanAccessSystemSection() bool {
	if p == nil {
		return false
	}
	return p.EffectiveRole() == types.UserRoleAdministrator || p.IsAuditor()
}

func (p *Principal) CanManageUsers() bool {
	return p != nil && p.EffectiveRole() == types.UserRoleAdministrator && p.CanWrite()
}

func (p *Principal) CanCreateTeamType(teamType types.TeamType) bool {
	if p == nil || !p.CanWrite() {
		return false
	}
	switch teamType {
	case types.TeamTypeProvider:
		return p.HasAtLeast(types.UserRoleProvider)
	case types.TeamTypeUser:
		return p.EffectiveRole() == types.UserRoleAdministrator
	case types.TeamTypeAgent:
		return p.HasAtLeast(types.UserRoleUser)
	default:
		return false
	}
}

func (p *Principal) CanWriteCatalogResource(resourceType types.TeamResourceType) bool {
	if !p.CanWrite() {
		return false
	}
	switch resourceType {
	case types.TeamResourceServer, types.TeamResourceSkill:
		return p.HasAtLeast(types.UserRoleProvider)
	case types.TeamResourceToolGroup, types.TeamResourcePromptGroup, types.TeamResourceSkillSet:
		return p.HasAtLeast(types.UserRoleProvider)
	default:
		return false
	}
}

func (p *Principal) CanWriteOwnAgentApp() bool {
	return p != nil && p.HasAtLeast(types.UserRoleUser) && p.CanWrite()
}

// CanSeeCatalogItem applies user-team and provider-team visibility for catalog reads.
func (p *Principal) CanSeeCatalogItem(
	resourceType types.TeamResourceType,
	resourceName string,
	providerTeamIDs []uint,
	userTeamIDs []uint,
) bool {
	if p == nil {
		return false
	}
	if p.EffectiveRole() == types.UserRoleAdministrator || p.IsAuditor() {
		return true
	}
	if !visibleByUserTeams(p, userTeamIDs) {
		return false
	}
	switch resourceType {
	case types.TeamResourceToolGroup, types.TeamResourcePromptGroup, types.TeamResourceSkillSet:
		return true
	}
	if !p.HasAtLeast(types.UserRoleProvider) {
		return false
	}
	return visibleByProviderTeams(p, providerTeamIDs)
}

func visibleByUserTeams(p *Principal, userTeamIDs []uint) bool {
	if len(userTeamIDs) == 0 {
		return true
	}
	principalTeams := p.TeamIDsOfType(types.TeamTypeUser)
	for _, id := range userTeamIDs {
		for _, pid := range principalTeams {
			if id == pid {
				return true
			}
		}
	}
	return false
}

func visibleByProviderTeams(p *Principal, providerTeamIDs []uint) bool {
	if p.EffectiveRole() == types.UserRoleAdministrator {
		return true
	}
	if len(providerTeamIDs) == 0 {
		return p.HasAtLeast(types.UserRoleProvider)
	}
	principalTeams := p.TeamIDsOfType(types.TeamTypeProvider)
	for _, id := range providerTeamIDs {
		for _, pid := range principalTeams {
			if id == pid {
				return true
			}
		}
	}
	return false
}

// CanManageCatalogItem applies provider-team write scoping for provider+ roles.
func (p *Principal) CanManageCatalogItem(
	resourceType types.TeamResourceType,
	providerTeamIDs []uint,
) bool {
	if !p.CanWriteCatalogResource(resourceType) {
		return false
	}
	if p.EffectiveRole() == types.UserRoleAdministrator {
		return true
	}
	return visibleByProviderTeams(p, providerTeamIDs)
}

// CanSeeAgentApp reports whether principal can view the given agent app.
func (p *Principal) CanSeeAgentApp(appOwnerScope string, agentTeamIDs []uint) bool {
	if p == nil {
		return false
	}
	if p.IsAuditor() {
		return canSeeAgentAppRead(p, appOwnerScope, agentTeamIDs)
	}
	if p.OwnerScopeKey != "" && p.OwnerScopeKey == appOwnerScope {
		return true
	}
	return canSeeAgentAppRead(p, appOwnerScope, agentTeamIDs)
}

func canSeeAgentAppRead(p *Principal, appOwnerScope string, agentTeamIDs []uint) bool {
	if p.OwnerScopeKey != "" && p.OwnerScopeKey == appOwnerScope {
		return true
	}
	if len(agentTeamIDs) == 0 {
		return false
	}
	principalTeams := p.TeamIDsOfType(types.TeamTypeAgent)
	for _, id := range agentTeamIDs {
		for _, pid := range principalTeams {
			if id == pid {
				return true
			}
		}
	}
	return false
}

// CanManageAgentApp reports whether principal can mutate the app.
func (p *Principal) CanManageAgentApp(appOwnerScope string, agentTeamIDs []uint) bool {
	if !p.CanWriteOwnAgentApp() {
		return false
	}
	if p.OwnerScopeKey != "" && p.OwnerScopeKey == appOwnerScope {
		return true
	}
	// Non-owners may not mutate even if they can see via agent team membership.
	return false
}
