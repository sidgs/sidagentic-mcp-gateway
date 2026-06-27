package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

func (s *Server) dashboardListUsersHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.userService == nil {
			c.JSON(http.StatusOK, []gin.H{})
			return
		}
		p := mustDashboardPrincipal(c)
		if !p.CanManageUsers() && !p.IsAuditor() {
			c.JSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		users, err := s.userService.ListUsers(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		out := make([]gin.H, 0, len(users))
		for _, u := range users {
			out = append(out, gin.H{
				"id":       u.ID,
				"username": u.Username,
				"role":     string(u.EffectiveRole()),
				"email":    u.Email,
			})
		}
		c.JSON(http.StatusOK, out)
	}
}

func (s *Server) dashboardCreateUserHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.userService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "users unavailable"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		if !p.CanManageUsers() {
			c.JSON(http.StatusForbidden, gin.H{"error": "administrator role required"})
			return
		}
		var req types.CreateOrUpdateUserRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		role := types.UserRoleUser
		if req.Role != "" {
			role = types.NormalizeUserRole(types.UserRole(req.Role))
		}
		user, err := s.userService.CreateUser(c.Request.Context(), &model.User{
			Username:    req.Username,
			AccessToken: req.AccessToken,
			Role:        role,
			Email:       req.Email,
			OIDCSub:     req.OIDCSub,
		})
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusCreated, types.CreateOrUpdateUserResponse{
			Username:    user.Username,
			Role:        string(user.EffectiveRole()),
			AccessToken: user.AccessToken,
			Email:       user.Email,
		})
	}
}

func (s *Server) dashboardPatchUserRoleHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.userService == nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "users unavailable"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		if !p.CanManageUsers() {
			c.JSON(http.StatusForbidden, gin.H{"error": "administrator role required"})
			return
		}
		id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id64 == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
			return
		}
		var req struct {
			Role string `json:"role"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		user, err := s.userService.UpdateRole(c.Request.Context(), uint(id64), types.NormalizeUserRole(types.UserRole(req.Role)))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, userToPublic(*user))
	}
}

func (s *Server) dashboardDeleteUserHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if s.userService == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		if s.forbidAuditorWrite(c) {
			return
		}
		p := mustDashboardPrincipal(c)
		if !p.CanManageUsers() {
			c.JSON(http.StatusForbidden, gin.H{"error": "administrator role required"})
			return
		}
		id64, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil || id64 == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
			return
		}
		user, err := s.userService.GetByID(c.Request.Context(), uint(id64))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if err := s.userService.DeleteUser(c.Request.Context(), user.Username); err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"deleted": true})
	}
}
