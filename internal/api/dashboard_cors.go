package api

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	dashboardEmbedAllowedHeaders = "Authorization, X-Tenant-ID, Accept, Content-Type"
	dashboardEmbedAllowedMethods = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
)

// parseDashboardEmbedAllowedOrigins splits a comma-separated allow-list (empty entries dropped).
func parseDashboardEmbedAllowedOrigins(raw string) []string {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return nil
	}
	var out []string
	for _, part := range strings.Split(raw, ",") {
		o := strings.TrimSpace(part)
		if o != "" {
			out = append(out, o)
		}
	}
	return out
}

func originAllowed(origin string, allowed []string) bool {
	if origin == "" {
		return false
	}
	for _, a := range allowed {
		if origin == a {
			return true
		}
	}
	return false
}

// dashboardEmbedCORS adds CORS headers for cross-origin embed dashboard API calls when allowed origins are configured.
func (s *Server) dashboardEmbedCORS() gin.HandlerFunc {
	allowed := s.dashboardEmbedAllowedOrigins
	return func(c *gin.Context) {
		if len(allowed) == 0 {
			c.Next()
			return
		}
		origin := strings.TrimSpace(c.GetHeader("Origin"))
		if origin != "" && originAllowed(origin, allowed) {
			c.Header("Access-Control-Allow-Origin", origin)
			c.Header("Vary", "Origin")
			c.Header("Access-Control-Allow-Headers", dashboardEmbedAllowedHeaders)
			c.Header("Access-Control-Allow-Methods", dashboardEmbedAllowedMethods)
		}
		if c.Request.Method == http.MethodOptions {
			if origin != "" && originAllowed(origin, allowed) {
				c.AbortWithStatus(http.StatusNoContent)
				return
			}
			c.AbortWithStatus(http.StatusForbidden)
			return
		}
		c.Next()
	}
}
