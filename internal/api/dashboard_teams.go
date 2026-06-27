package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/authz"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

func (s *Server) dashboardListTeamsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.teamService == nil {
			c.JSON(http.StatusOK, []types.TeamPublic{})
			return
		}
		p := mustDashboardPrincipal(c)
		var teamType *types.TeamType
		if raw := c.Query("type"); raw != "" {
			t, ok := teamTypeFromRequest(raw)
			if !ok {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team type"})
				return
			}
			teamType = &t
		}
		teams, err := s.teamService.ListTeams(c.Request.Context(), teamType)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		out := make([]types.TeamPublic, 0, len(teams))
		for _, team := range teams {
			if !s.canSeeTeam(p, &team) {
				continue
			}
			out = append(out, types.TeamPublic{
				ID:              team.ID,
				Name:            team.Name,
				Type:            string(team.Type),
				CreatedByUserID: team.CreatedByUserID,
			})
		}
		c.JSON(http.StatusOK, out)
	}
}

func (s *Server) canSeeTeam(p *authz.Principal, team *model.Team) bool {
	if p.EffectiveRole() == types.UserRoleAdministrator || p.IsAuditor() {
		return true
	}
	if p.IsMemberOfTeam(team.ID) {
		return true
	}
	switch team.Type {
	case types.TeamTypeProvider:
		return p.HasAtLeast(types.UserRoleProvider)
	case types.TeamTypeUser:
		return false
	case types.TeamTypeAgent:
		return p.HasAtLeast(types.UserRoleUser)
	default:
		return false
	}
}

func (s *Server) dashboardCreateTeamHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.teamService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "teams unavailable"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		var req struct {
			Name string `json:"name"`
			Type string `json:"type"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		teamType, ok := teamTypeFromRequest(req.Type)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team type"})
			return
		}
		if !p.CanCreateTeamType(teamType) {
			c.JSON(http.StatusForbidden, gin.H{"error": "cannot create this team type"})
			return
		}
		team, err := s.teamService.CreateTeam(c.Request.Context(), req.Name, teamType, p.UserID)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusCreated, types.TeamPublic{
			ID:              team.ID,
			Name:            team.Name,
			Type:            string(team.Type),
			CreatedByUserID: team.CreatedByUserID,
		})
	}
}

func (s *Server) dashboardGetTeamHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.teamService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		p := mustDashboardPrincipal(c)
		id, err := parseTeamID(c)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team id"})
			return
		}
		team, err := s.teamService.GetTeam(c.Request.Context(), id)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if !s.canSeeTeam(p, team) {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		members, err := s.teamService.ListMembers(c.Request.Context(), id)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		resp := types.TeamDetailResponse{
			Team: types.TeamPublic{
				ID:              team.ID,
				Name:            team.Name,
				Type:            string(team.Type),
				CreatedByUserID: team.CreatedByUserID,
			},
			Members: make([]types.TeamMemberPublic, 0, len(members)),
		}
		for _, m := range members {
			pub := types.TeamMemberPublic{UserID: m.UserID, Role: string(m.Role)}
			if s.userService != nil {
				if u, err := s.userService.GetByID(c.Request.Context(), m.UserID); err == nil {
					pub.Username = u.Username
					pub.Email = u.Email
				}
			}
			resp.Members = append(resp.Members, pub)
		}
		c.JSON(http.StatusOK, resp)
	}
}

func (s *Server) dashboardDeleteTeamHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.teamService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		id, err := parseTeamID(c)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team id"})
			return
		}
		team, err := s.teamService.GetTeam(c.Request.Context(), id)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if team.CreatedByUserID != p.UserID && !p.CanManageUsers() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		if err := s.teamService.DeleteTeam(c.Request.Context(), id); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"deleted": true})
	}
}

func (s *Server) dashboardAddTeamMemberHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.teamService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "teams unavailable"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		id, err := parseTeamID(c)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team id"})
			return
		}
		if !p.CanManageMembersOfTeam(id) && !p.CanManageUsers() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		var req types.AddTeamMemberRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		role, ok := memberRoleFromRequest(req.Role)
		if !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid member role"})
			return
		}
		if err := s.teamService.AddMember(c.Request.Context(), id, req.UserID, role); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"added": true})
	}
}

func (s *Server) dashboardRemoveTeamMemberHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.teamService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "teams unavailable"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		id, err := parseTeamID(c)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team id"})
			return
		}
		userID64, err := strconv.ParseUint(c.Param("userId"), 10, 64)
		if err != nil || userID64 == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
			return
		}
		if !p.CanManageMembersOfTeam(id) && !p.CanManageUsers() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		if err := s.teamService.RemoveMember(c.Request.Context(), id, uint(userID64)); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"removed": true})
	}
}

func (s *Server) dashboardSetTeamAssignmentsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.teamService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "teams unavailable"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		id, err := parseTeamID(c)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team id"})
			return
		}
		team, err := s.teamService.GetTeam(c.Request.Context(), id)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if !p.CanManageMembersOfTeam(id) && !p.CanManageUsers() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		var req types.SetTeamAssignmentsRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := s.teamService.SetAssignments(c.Request.Context(), id, team.Type, req.Assignments); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"updated": true})
	}
}

func parseTeamID(c *gin.Context) (uint, error) {
	id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil || id64 == 0 {
		return 0, err
	}
	return uint(id64), nil
}
