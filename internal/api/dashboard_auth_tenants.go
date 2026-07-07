package api

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v4"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/service/tenantregistry"
	"sami.io/mcpgateway/pkg/auditctx"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
)

const tenantJWTExpiry = 8 * time.Hour

type tenantBearerClaims = platformBearerClaims

func (s *Server) mintTenantJWT(sub, email, tenantID string, role types.UserRole, platformAdmin bool) (string, int64, error) {
	if s.platformJWTSecret == "" && !s.platformJWTAllowUnsigned {
		return "", 0, http.ErrNotSupported
	}
	now := time.Now().UTC()
	exp := now.Add(tenantJWTExpiry)
	claims := platformBearerClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Subject:   sub,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(exp),
			Audience:  jwt.ClaimStrings{s.platformJWTAud},
		},
		Email:          email,
		TenantID:       tenantID,
		CustomTenantID: tenantID,
		Role:           string(role),
		PlatformAdmin:  platformAdmin,
	}
	var (
		signed string
		err    error
	)
	if s.platformJWTSecret != "" {
		tok := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		signed, err = tok.SignedString([]byte(s.platformJWTSecret))
	} else {
		tok := jwt.NewWithClaims(jwt.SigningMethodNone, claims)
		signed, err = tok.SignedString(jwt.UnsafeAllowNoneSignatureType)
	}
	if err != nil {
		return "", 0, err
	}
	return signed, exp.Unix(), nil
}

func (s *Server) identityFromRequest(c *gin.Context) (sub, email string, platformAdmin bool, ok bool) {
	if sess, ok := s.validDashboardUserFromRequest(c); ok {
		sub = sess.Sub
		email = sess.Email
		platformAdmin = sess.PlatformAdmin || isPlatformAdminEmail(email)
		return sub, email, platformAdmin, true
	}
	if mode, exists := c.Get("mode"); exists {
		if m, ok := mode.(model.ServerMode); ok && m == model.ModeDev {
			return "dev:dashboard", "dev@dashboard.local", false, true
		}
	}
	return "", "", false, false
}

func (s *Server) dashboardAuthTenantsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.tenantRegistry == nil {
			c.JSON(http.StatusOK, types.ListAccessibleTenantsResponse{Tenants: []types.AccessibleTenant{}})
			return
		}
		_, email, platformAdmin, ok := s.identityFromRequest(c)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}
		tenants, memberships, err := s.tenantRegistry.ListForIdentity(c.Request.Context(), email, platformAdmin)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		now := time.Now().UTC()
		out := make([]types.AccessibleTenant, 0, len(tenants))
		for _, t := range tenants {
			role := string(types.UserRoleAdministrator)
			if platformAdmin {
				if m, ok := memberships[t.ID]; ok {
					role = string(m.Role)
				}
			} else if m, ok := memberships[t.ID]; ok {
				role = string(m.Role)
			}
			accessible, reason := tenantregistry.CanLogin(&t, platformAdmin, now)
			out = append(out, types.AccessibleTenant{
				ID: t.ID, Name: t.Name, Status: types.TenantStatus(t.Status), Mode: types.TenantMode(t.Mode),
				RetireAt: t.RetireAt, Role: role, Accessible: accessible, Reason: reason,
			})
		}
		c.JSON(http.StatusOK, types.ListAccessibleTenantsResponse{
			PlatformAdmin: platformAdmin,
			Tenants:       out,
		})
	}
}

func (s *Server) dashboardSelectTenantHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.tenantRegistry == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "tenant registry unavailable"})
			return
		}
		sub, email, platformAdmin, ok := s.identityFromRequest(c)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}
		var req types.SelectTenantRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}
		tid := strings.TrimSpace(req.TenantID)
		if err := tenant.Validate(tid); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		trow, err := s.tenantRegistry.Get(c.Request.Context(), tid)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		now := time.Now().UTC()
		if okLogin, reason := tenantregistry.CanLogin(trow, platformAdmin, now); !okLogin {
			c.JSON(http.StatusForbidden, gin.H{"error": reason})
			return
		}
		role := types.UserRoleAdministrator
		if !platformAdmin {
			mem, err := s.tenantRegistry.MembershipForIdentity(c.Request.Context(), tid, email)
			if err != nil {
				c.JSON(http.StatusForbidden, gin.H{"error": "not a member of this tenant"})
				return
			}
			role = mem.Role
		} else if mem, err := s.tenantRegistry.MembershipForIdentity(c.Request.Context(), tid, email); err == nil {
			role = mem.Role
		}
		token, exp, err := s.mintTenantJWT(sub, email, tid, role, platformAdmin)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to mint tenant token"})
			return
		}
		c.JSON(http.StatusOK, types.SelectTenantResponse{
			AccessToken: token, TenantID: tid, Role: string(role), PlatformAdmin: platformAdmin, ExpiresAt: exp,
		})
	}
}

func (s *Server) requirePlatformAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		sub, email, platformAdmin, ok := s.identityFromRequest(c)
		if !ok || !platformAdmin {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "platform administrator required"})
			return
		}
		actor := actorFromSession(sub, email, 0)
		c.Request = c.Request.WithContext(auditctx.WithActor(c.Request.Context(), actor))
		c.Next()
	}
}

func (s *Server) dashboardPlatformListTenantsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		rows, err := s.tenantRegistry.List(c.Request.Context(), true)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		out := make([]types.TenantPublic, 0, len(rows))
		for _, row := range rows {
			out = append(out, tenantregistry.ToTenantPublic(row))
		}
		c.JSON(http.StatusOK, out)
	}
}

func (s *Server) dashboardPlatformCreateTenantHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.CreateTenantRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}
		row, err := s.tenantRegistry.Create(c.Request.Context(), req.ID, req.Name, req.OwnerEmail)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		_ = s.ensureTenantBootstrap(c.Request.Context(), row.ID)
		c.JSON(http.StatusCreated, tenantregistry.ToTenantPublic(*row))
	}
}

func (s *Server) dashboardPlatformPatchTenantHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := strings.TrimSpace(c.Param("id"))
		var req types.UpdateTenantRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}
		row, err := s.tenantRegistry.Update(c.Request.Context(), id, func(t *model.Tenant) error {
			if req.Name != nil {
				t.Name = strings.TrimSpace(*req.Name)
			}
			if req.Status != nil {
				t.Status = model.TenantStatus(*req.Status)
			}
			if req.Mode != nil {
				t.Mode = model.TenantMode(*req.Mode)
			}
			if req.RetireAt != nil {
				t.RetireAt = req.RetireAt
			}
			return nil
		})
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, tenantregistry.ToTenantPublic(*row))
	}
}

func (s *Server) dashboardPlatformSuspendTenantHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := strings.TrimSpace(c.Param("id"))
		row, err := s.tenantRegistry.SetStatus(c.Request.Context(), id, model.TenantStatusSuspended, nil)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, tenantregistry.ToTenantPublic(*row))
	}
}

func (s *Server) dashboardPlatformRetireTenantHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := strings.TrimSpace(c.Param("id"))
		var req types.RetireTenantRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}
		at := req.RetireAt.UTC()
		row, err := s.tenantRegistry.SetStatus(c.Request.Context(), id, model.TenantStatusRetired, &at)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, tenantregistry.ToTenantPublic(*row))
	}
}

func (s *Server) dashboardPlatformRemoveTenantHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := strings.TrimSpace(c.Param("id"))
		row, err := s.tenantRegistry.SetStatus(c.Request.Context(), id, model.TenantStatusRemoved, nil)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, tenantregistry.ToTenantPublic(*row))
	}
}

func (s *Server) dashboardPlatformSetTenantModeHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := strings.TrimSpace(c.Param("id"))
		var req types.SetTenantModeRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}
		row, err := s.tenantRegistry.SetMode(c.Request.Context(), id, model.TenantMode(req.Mode))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, tenantregistry.ToTenantPublic(*row))
	}
}

func (s *Server) dashboardPlatformListMembersHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := strings.TrimSpace(c.Param("id"))
		rows, err := s.tenantRegistry.ListMemberships(c.Request.Context(), id)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		out := make([]types.TenantMembershipPublic, 0, len(rows))
		for _, row := range rows {
			out = append(out, tenantregistry.ToMembershipPublic(row))
		}
		c.JSON(http.StatusOK, out)
	}
}

func (s *Server) dashboardPlatformAddMemberHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := strings.TrimSpace(c.Param("id"))
		var req types.AddTenantMemberRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}
		row, err := s.tenantRegistry.AddMember(c.Request.Context(), id, req.Email, types.UserRole(req.Role))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusCreated, tenantregistry.ToMembershipPublic(*row))
	}
}

func (s *Server) dashboardPlatformPatchMemberHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		tenantID := strings.TrimSpace(c.Param("id"))
		memID, err := strconv.ParseUint(c.Param("membershipId"), 10, 64)
		if err != nil || memID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid membership id"})
			return
		}
		var req types.PatchTenantMemberRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}
		row, err := s.tenantRegistry.PatchMemberRole(c.Request.Context(), tenantID, uint(memID), types.UserRole(req.Role))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, tenantregistry.ToMembershipPublic(*row))
	}
}

func (s *Server) dashboardPlatformDeleteMemberHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		tenantID := strings.TrimSpace(c.Param("id"))
		memID, err := strconv.ParseUint(c.Param("membershipId"), 10, 64)
		if err != nil || memID == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid membership id"})
			return
		}
		if err := s.tenantRegistry.RemoveMember(c.Request.Context(), tenantID, uint(memID)); err != nil {
			handleServiceError(c, err)
			return
		}
		c.Status(http.StatusNoContent)
	}
}

func (s *Server) rejectReadOnlyTenantWrites() gin.HandlerFunc {
	return func(c *gin.Context) {
		switch c.Request.Method {
		case http.MethodPost, http.MethodPut, http.MethodPatch, http.MethodDelete:
			if s.tenantRegistry == nil {
				c.Next()
				return
			}
			tid := tenant.MustFromContext(c.Request.Context())
			trow, err := s.tenantRegistry.Get(c.Request.Context(), tid)
			if err != nil {
				c.Next()
				return
			}
			platformAdmin := false
			if p, ok := dashboardPrincipalFromContext(c); ok && p != nil {
				platformAdmin = p.IsPlatformAdmin
			} else {
				_, email, pa, ok := s.identityFromRequest(c)
				if ok {
					platformAdmin = pa
					_ = email
				}
			}
			if !tenantregistry.CanMutate(trow, platformAdmin) {
				c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "tenant is read-only or not active"})
				return
			}
		}
		c.Next()
	}
}

func (s *Server) requireTenantOperational() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.tenantRegistry == nil {
			c.Next()
			return
		}
		tid := tenant.MustFromContext(c.Request.Context())
		trow, err := s.tenantRegistry.Get(c.Request.Context(), tid)
		if err != nil {
			c.Next()
			return
		}
		platformAdmin := false
		if p, ok := dashboardPrincipalFromContext(c); ok && p != nil {
			platformAdmin = p.IsPlatformAdmin
		} else {
			_, _, pa, ok := s.identityFromRequest(c)
			if ok {
				platformAdmin = pa
			}
		}
		if okLogin, reason := tenantregistry.CanLogin(trow, platformAdmin, time.Now().UTC()); !okLogin {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": reason})
			return
		}
		c.Next()
	}
}
