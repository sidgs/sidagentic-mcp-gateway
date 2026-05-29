package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/internal/model"
)

func (s *Server) registerInitServerHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Mode model.ServerMode `json:"mode" binding:"required,oneof=development enterprise production"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: " + err.Error()})
			return
		}
		created, err := s.BootstrapServerIfUninitialized(c.Request.Context(), req.Mode)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize server: " + err.Error()})
			return
		}
		if !created {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Server is already initialized"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "Server initialized successfully"})
	}
}
