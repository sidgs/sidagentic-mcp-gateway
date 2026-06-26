package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/pkg/types"
)

func (s *Server) listSkillSetsHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		items, err := s.skillSetService.ListSkillSets(c.Request.Context())
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if items == nil {
			items = []types.SkillSetSummary{}
		}
		c.JSON(http.StatusOK, items)
	}
}

func (s *Server) getSkillSetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		detail, err := s.skillSetService.GetSkillSetDetail(c.Request.Context(), c.Param("name"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, detail)
	}
}

func (s *Server) createSkillSetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.CreateSkillSetRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if _, err := s.skillSetService.CreateSkillSet(c.Request.Context(), &req); err != nil {
			handleServiceError(c, err)
			return
		}
		detail, err := s.skillSetService.GetSkillSetDetail(c.Request.Context(), req.Name)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusCreated, detail)
	}
}

func (s *Server) updateSkillSetHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req types.UpdateSkillSetRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if _, err := s.skillSetService.UpdateSkillSet(c.Request.Context(), c.Param("name"), &req); err != nil {
			handleServiceError(c, err)
			return
		}
		detail, err := s.skillSetService.GetSkillSetDetail(c.Request.Context(), c.Param("name"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, detail)
	}
}

func (s *Server) tenantSkillSetListHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		detail, err := s.skillSetService.GetSkillSetDetail(c.Request.Context(), c.Param("name"))
		if err != nil {
			handleServiceError(c, err)
			return
		}
		summaries := make([]types.SkillVersionSummary, 0, len(detail.Members))
		for _, m := range detail.Members {
			summaries = append(summaries, types.SkillVersionSummary{
				Name: m.Name, Version: m.Version, Description: m.Description, Status: m.Status,
			})
		}
		c.JSON(http.StatusOK, summaries)
	}
}

func (s *Server) tenantSkillSetSkillHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		setName := c.Param("name")
		skillName := c.Param("skillname")
		version := c.Param("version")
		ok, err := s.skillSetService.IsMember(c.Request.Context(), setName, skillName, version)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": "skill version not in skill set"})
			return
		}
		sv, sk, err := s.skillService.GetSkillVersion(c.Request.Context(), skillName, version)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		respondSkillDetail(c, sv, sk.Name)
	}
}

func (s *Server) tenantSkillSetReferenceHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		setName := c.Param("name")
		skillName := c.Param("skillname")
		version := c.Param("version")
		filename := c.Param("filename")
		ok, err := s.skillSetService.IsMember(c.Request.Context(), setName, skillName, version)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": "skill version not in skill set"})
			return
		}
		content, err := s.skillService.GetReferenceContent(c.Request.Context(), skillName, version, filename)
		if err != nil {
			handleServiceError(c, err)
			return
		}
		c.JSON(http.StatusOK, types.SkillReferenceContentResponse{
			Filename:        filename,
			MarkdownContent: content,
		})
	}
}
