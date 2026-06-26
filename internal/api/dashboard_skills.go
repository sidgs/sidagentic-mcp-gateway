package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/pkg/types"
)

type dashboardSkillsResponse struct {
	Skills []types.SkillVersionSummary `json:"skills"`
}

func (s *Server) dashboardSkillsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		items, err := s.skillService.ListSkillSummaries(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if items == nil {
			items = []types.SkillVersionSummary{}
		}
		c.JSON(http.StatusOK, dashboardSkillsResponse{Skills: items})
	}
}

func (s *Server) dashboardGetSkillVersionHandler() gin.HandlerFunc {
	return s.getSkillVersionHandler()
}

func (s *Server) dashboardCreateSkillVersionHandler() gin.HandlerFunc {
	return s.createSkillVersionHandler()
}

func (s *Server) dashboardUpdateSkillVersionHandler() gin.HandlerFunc {
	return s.updateSkillVersionHandler()
}

func (s *Server) dashboardTransitionSkillStatusHandler() gin.HandlerFunc {
	return s.transitionSkillStatusHandler()
}

func (s *Server) dashboardSetSkillDLCStatusHandler() gin.HandlerFunc {
	return s.setSkillDLCStatusHandler()
}

func (s *Server) dashboardSetSkillLockHandler() gin.HandlerFunc {
	return s.setSkillLockHandler()
}

func (s *Server) dashboardDeleteSkillVersionHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if err := s.skillService.DeleteSkillVersion(c.Request.Context(), c.Param("name"), c.Param("version")); err != nil {
			handleServiceError(c, err)
			return
		}
		c.Status(http.StatusNoContent)
	}
}
