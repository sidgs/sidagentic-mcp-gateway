package api

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/authz"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/auditctx"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
)

const dashboardPrincipalKey = "dashboard_principal"

func (s *Server) isBootstrapAdmin(sub, email string) bool {
	bootstrapSub := strings.TrimSpace(os.Getenv("BOOTSTRAP_ADMIN_SUB"))
	bootstrapEmail := strings.TrimSpace(strings.ToLower(os.Getenv("BOOTSTRAP_ADMIN_EMAIL")))
	if bootstrapSub != "" && sub == bootstrapSub {
		return true
	}
	if bootstrapEmail != "" && strings.EqualFold(email, bootstrapEmail) {
		return true
	}
	return false
}

func (s *Server) requireDashboardPrincipal() gin.HandlerFunc {
	return func(c *gin.Context) {
		principal, err := s.buildDashboardPrincipal(c)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.Set(dashboardPrincipalKey, principal)
		c.Next()
	}
}

func (s *Server) buildDashboardPrincipal(c *gin.Context) (*authz.Principal, error) {
	if s.userService == nil {
		return nil, apierrors.ErrUnauthorized
	}
	sess, ok := s.validDashboardUserFromRequest(c)
	sub := ""
	email := ""
	sessionRole := types.UserRole("")
	platformAdmin := false
	if ok {
		sub = sess.Sub
		email = sess.Email
		sessionRole = types.NormalizeUserRole(types.UserRole(sess.Role))
		platformAdmin = sess.PlatformAdmin || isPlatformAdminEmail(email)
	} else if mode, exists := c.Get("mode"); exists {
		if m, ok := mode.(model.ServerMode); ok && m == model.ModeDev {
			sub = "dev:dashboard"
			email = "dev@dashboard.local"
		}
	}
	if sub == "" && email == "" {
		return nil, apierrors.ErrUnauthorized
	}
	user, err := s.userService.UpsertFromDashboardSession(
		c.Request.Context(),
		sub,
		email,
		s.isBootstrapAdmin(sub, email),
		sessionRole,
	)
	if err != nil {
		return nil, err
	}
	ownerScope, err := agentAppOwnerScopeFromDashboard(s, c)
	if err != nil {
		// Dev mode without session still gets principal via Upsert above.
		if sub == "dev:dashboard" {
			ownerScope = "dev:dashboard"
		} else {
			return nil, err
		}
	}
	role := user.EffectiveRole()
	if sessionRole != "" && sessionRole != types.UserRoleUser {
		role = sessionRole
	}
	principal := &authz.Principal{
		UserID:          user.ID,
		Username:      user.Username,
		Email:         user.Email,
		Sub:           sub,
		Role:          role,
		IsPlatformAdmin: platformAdmin,
		OwnerScopeKey: ownerScope,
	}
	c.Request = c.Request.WithContext(auditctx.WithActor(c.Request.Context(), actorFromSession(sub, email, user.ID)))
	if s.teamService != nil {
		memberships, err := s.teamService.ListMembershipsForUser(c.Request.Context(), user.ID)
		if err != nil {
			return nil, err
		}
		for _, m := range memberships {
			team, err := s.teamService.GetTeam(c.Request.Context(), m.TeamID)
			if err != nil {
				continue
			}
			principal.TeamMemberships = append(principal.TeamMemberships, authz.TeamMembership{
				TeamID:     team.ID,
				TeamName:   team.Name,
				TeamType:   team.Type,
				MemberRole: m.Role,
			})
		}
	}
	return principal, nil
}

func dashboardPrincipalFromContext(c *gin.Context) (*authz.Principal, bool) {
	v, ok := c.Get(dashboardPrincipalKey)
	if !ok {
		return nil, false
	}
	p, ok := v.(*authz.Principal)
	return p, ok
}

func mustDashboardPrincipal(c *gin.Context) *authz.Principal {
	p, ok := dashboardPrincipalFromContext(c)
	if !ok || p == nil {
		panic("dashboard principal missing")
	}
	return p
}

func (s *Server) rejectAuditorWrites() gin.HandlerFunc {
	return func(c *gin.Context) {
		switch c.Request.Method {
		case http.MethodPost, http.MethodPut, http.MethodPatch, http.MethodDelete:
			if p, ok := dashboardPrincipalFromContext(c); ok && p.IsAuditor() {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "auditor role is read-only"})
				return
			}
		}
		c.Next()
	}
}

func (s *Server) requireAdministrator() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		if !p.CanManageUsers() {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "administrator role required"})
			return
		}
		c.Next()
	}
}

func (s *Server) dashboardMeHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		p := mustDashboardPrincipal(c)
		c.JSON(http.StatusOK, s.principalToMeResponse(c, p))
	}
}

func (s *Server) principalToMeResponse(c *gin.Context, p *authz.Principal) types.DashboardMeResponse {
	teams := make([]types.DashboardTeamMembership, 0, len(p.TeamMemberships))
	for _, m := range p.TeamMemberships {
		teams = append(teams, types.DashboardTeamMembership{
			ID:         m.TeamID,
			Name:       m.TeamName,
			Type:       string(m.TeamType),
			MemberRole: string(m.MemberRole),
		})
	}
	return types.DashboardMeResponse{
		Authenticated: true,
		Email:         p.Email,
		Sub:           p.Sub,
		Role:          string(p.EffectiveRole()),
		TenantID:      tenant.MustFromContext(c.Request.Context()),
		PlatformAdmin: p.IsPlatformAdmin,
		UserID:        p.UserID,
		Teams:         teams,
	}
}
