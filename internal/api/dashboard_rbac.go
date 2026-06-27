package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/authz"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

func (s *Server) teamIDsForResource(c *gin.Context, resourceType types.TeamResourceType, resourceName string) (providerTeamIDs, userTeamIDs []uint, err error) {
	if s.teamService == nil {
		return nil, nil, nil
	}
	providerTeamIDs, err = s.teamService.ProviderTeamIDsForResource(c.Request.Context(), resourceType, resourceName)
	if err != nil {
		return nil, nil, err
	}
	userTeamIDs, err = s.teamService.UserTeamIDsForResource(c.Request.Context(), resourceType, resourceName)
	if err != nil {
		return nil, nil, err
	}
	return providerTeamIDs, userTeamIDs, nil
}

func (s *Server) canSeeCatalog(c *gin.Context, p *authz.Principal, resourceType types.TeamResourceType, resourceName string) (bool, error) {
	providerTeamIDs, userTeamIDs, err := s.teamIDsForResource(c, resourceType, resourceName)
	if err != nil {
		return false, err
	}
	return p.CanSeeCatalogItem(resourceType, resourceName, providerTeamIDs, userTeamIDs), nil
}

func (s *Server) canManageCatalog(c *gin.Context, p *authz.Principal, resourceType types.TeamResourceType, resourceName string) (bool, error) {
	if !p.CanWrite() {
		return false, nil
	}
	providerTeamIDs, _, err := s.teamIDsForResource(c, resourceType, resourceName)
	if err != nil {
		return false, err
	}
	return p.CanManageCatalogItem(resourceType, providerTeamIDs), nil
}

func (s *Server) inheritServerTeamVisibility(c *gin.Context, p *authz.Principal, serverName string, resourceType types.TeamResourceType) (bool, error) {
	providerTeamIDs, userTeamIDs, err := s.teamIDsForResource(c, types.TeamResourceServer, serverName)
	if err != nil {
		return false, err
	}
	return p.CanSeeCatalogItem(resourceType, serverName, providerTeamIDs, userTeamIDs), nil
}

func (s *Server) inheritServerTeamManage(c *gin.Context, p *authz.Principal, serverName string, resourceType types.TeamResourceType) (bool, error) {
	providerTeamIDs, _, err := s.teamIDsForResource(c, types.TeamResourceServer, serverName)
	if err != nil {
		return false, err
	}
	return p.CanManageCatalogItem(resourceType, providerTeamIDs), nil
}

func (s *Server) forbidAuditorWrite(c *gin.Context) bool {
	p, ok := dashboardPrincipalFromContext(c)
	if ok && p.IsAuditor() {
		c.JSON(http.StatusForbidden, gin.H{"error": "auditor role is read-only"})
		return true
	}
	return false
}

func (s *Server) forbidUnlessProviderWrite(c *gin.Context) bool {
	p := mustDashboardPrincipal(c)
	if p.IsAuditor() {
		c.JSON(http.StatusForbidden, gin.H{"error": "auditor role is read-only"})
		return true
	}
	if !p.HasAtLeast(types.UserRoleProvider) {
		c.JSON(http.StatusForbidden, gin.H{"error": "provider role required"})
		return true
	}
	return false
}

func teamTypeFromRequest(raw string) (types.TeamType, bool) {
	switch types.TeamType(raw) {
	case types.TeamTypeProvider, types.TeamTypeUser, types.TeamTypeAgent:
		return types.TeamType(raw), true
	default:
		return "", false
	}
}

func memberRoleFromRequest(raw string) (types.TeamMemberRole, bool) {
	switch types.TeamMemberRole(raw) {
	case types.TeamMemberRoleManager, types.TeamMemberRoleMember:
		return types.TeamMemberRole(raw), true
	default:
		return "", false
	}
}

func userToPublic(u model.User) types.User {
	return types.User{
		Username: u.Username,
		Role:     string(u.EffectiveRole()),
		Email:    u.Email,
	}
}
