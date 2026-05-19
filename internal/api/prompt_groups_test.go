package api

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
)

func TestGetPromptGroupEndpoints_IncludesHTTPPathPrefix(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/api/v1/sami-mcp-gateway"}

	c, _ := gin.CreateTestContext(nil)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request = c.Request.WithContext(tenant.WithContext(context.Background(), tenant.DefaultID))
	c.Request.Host = "apps.example.com"
	c.Request.Header.Set("X-Forwarded-Proto", "https")

	got := s.getPromptGroupEndpoints(c, "my-group")

	testhelpers.AssertEqual(t, "https://apps.example.com/api/v1/sami-mcp-gateway/sami/v0/prompt-groups/my-group/mcp", got.StreamableHTTPEndpoint)
	testhelpers.AssertEqual(t, "https://apps.example.com/api/v1/sami-mcp-gateway/sami/v0/prompt-groups/my-group/sse", got.SSEEndpoint)
	testhelpers.AssertEqual(t, "https://apps.example.com/api/v1/sami-mcp-gateway/sami/v0/prompt-groups/my-group/message", got.SSEMessageEndpoint)
}

func TestGetPromptGroupEndpoints_NoHTTPPathPrefix(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{}

	c, _ := gin.CreateTestContext(nil)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request = c.Request.WithContext(tenant.WithContext(context.Background(), tenant.DefaultID))
	c.Request.Host = "localhost:8080"

	got := s.getPromptGroupEndpoints(c, "g")

	testhelpers.AssertEqual(t, "http://localhost:8080/sami/v0/prompt-groups/g/mcp", got.StreamableHTTPEndpoint)
	testhelpers.AssertEqual(t, "http://localhost:8080/sami/v0/prompt-groups/g/sse", got.SSEEndpoint)
	testhelpers.AssertEqual(t, "http://localhost:8080/sami/v0/prompt-groups/g/message", got.SSEMessageEndpoint)
}
