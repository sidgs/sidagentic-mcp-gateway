package api

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/mcpjungle/mcpjungle/pkg/testhelpers"
)

func TestGetPromptGroupEndpoints_IncludesHTTPPathPrefix(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/api/v1/sami-mcp-gateway"}

	c, _ := gin.CreateTestContext(nil)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "apps.example.com"
	c.Request.Header.Set("X-Forwarded-Proto", "https")

	got := s.getPromptGroupEndpoints(c, "my-group")

	testhelpers.AssertEqual(t, "https://apps.example.com/api/v1/sami-mcp-gateway/v0/prompt-groups/my-group/mcp", got.StreamableHTTPEndpoint)
	testhelpers.AssertEqual(t, "https://apps.example.com/api/v1/sami-mcp-gateway/v0/prompt-groups/my-group/sse", got.SSEEndpoint)
	testhelpers.AssertEqual(t, "https://apps.example.com/api/v1/sami-mcp-gateway/v0/prompt-groups/my-group/message", got.SSEMessageEndpoint)
}

func TestGetPromptGroupEndpoints_NoHTTPPathPrefix(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{}

	c, _ := gin.CreateTestContext(nil)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "localhost:8080"

	got := s.getPromptGroupEndpoints(c, "g")

	testhelpers.AssertEqual(t, "http://localhost:8080/v0/prompt-groups/g/mcp", got.StreamableHTTPEndpoint)
	testhelpers.AssertEqual(t, "http://localhost:8080/v0/prompt-groups/g/sse", got.SSEEndpoint)
	testhelpers.AssertEqual(t, "http://localhost:8080/v0/prompt-groups/g/message", got.SSEMessageEndpoint)
}
