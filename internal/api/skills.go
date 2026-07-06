package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	skillsvc "sami.io/mcpgateway/internal/service/skill"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/types"
)

func (s *Server) listSkillsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		items, err := s.skillService.ListSkillSummaries(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if items == nil {
			items = []types.SkillVersionSummary{}
		}
		c.JSON(http.StatusOK, items)
	}
}

func (s *Server) getSkillVersionHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		sv, sk, err := s.skillService.GetSkillVersion(c.Request.Context(), c.Param("name"), c.Param("version"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		respondSkillDetail(c, sv, sk.Name)
	}
}

func (s *Server) getSkillReferenceHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		content, err := s.skillService.GetReferenceContent(
			c.Request.Context(),
			c.Param("name"),
			c.Param("version"),
			c.Param("filename"),
		)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, types.SkillReferenceContentResponse{
			Filename:        c.Param("filename"),
			MarkdownContent: content,
		})
	}
}

func (s *Server) createSkillVersionHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.CreateSkillVersionRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		sv, err := s.skillService.CreateSkillVersion(c.Request.Context(), &req)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		respondSkillDetailCreated(c, sv, req.Name)
	}
}

func (s *Server) updateSkillVersionHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.UpdateSkillVersionRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		sv, err := s.skillService.UpdateSkillVersion(c.Request.Context(), c.Param("name"), c.Param("version"), &req)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		respondSkillDetail(c, sv, c.Param("name"))
	}
}

func (s *Server) transitionSkillStatusHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.TransitionSkillStatusRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		sv, err := s.skillService.TransitionStatus(c.Request.Context(), c.Param("name"), c.Param("version"), req.Status)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		respondSkillDetail(c, sv, c.Param("name"))
	}
}

func (s *Server) setSkillDLCStatusHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.SetSkillDLCStatusRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		sv, err := s.skillService.SetDLCStatus(c.Request.Context(), c.Param("name"), c.Param("version"), req.DLCStatus)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		respondSkillDetail(c, sv, c.Param("name"))
	}
}

func (s *Server) setSkillLockHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.SetSkillLockRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		sv, err := s.skillService.SetLocked(c.Request.Context(), c.Param("name"), c.Param("version"), req.Locked)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		respondSkillDetail(c, sv, c.Param("name"))
	}
}

func respondSkillDetail(c *gin.Context, sv *model.SkillVersion, skillName string) {
	detail, err := skillsvc.ToDetail(sv, skillName)
	if err != nil {
		handleServiceError(c, err)
		return
	}
	c.JSON(http.StatusOK, detail)
}

func respondSkillDetailCreated(c *gin.Context, sv *model.SkillVersion, skillName string) {
	detail, err := skillsvc.ToDetail(sv, skillName)
	if err != nil {
		handleServiceError(c, err)
		return
	}
	c.JSON(http.StatusCreated, detail)
}

func respondSkillEditableDetail(c *gin.Context, sv *model.SkillVersion, skillName string) {
	detail, err := skillsvc.ToEditableDetail(sv, skillName)
	if err != nil {
		handleServiceError(c, err)
		return
	}
	c.JSON(http.StatusOK, detail)
}
