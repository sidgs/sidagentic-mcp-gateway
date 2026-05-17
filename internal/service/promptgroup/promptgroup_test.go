package promptgroup

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/mark3labs/mcp-go/server"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/internal/service/mcp"
	"github.com/mcpjungle/mcpjungle/internal/service/toolgroup"
	"github.com/mcpjungle/mcpjungle/internal/telemetry"
	"github.com/mcpjungle/mcpjungle/pkg/testhelpers"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"gorm.io/datatypes"
)

func TestCreatePromptGroup_Success(t *testing.T) {
	setup := testhelpers.SetupTestDB(t)
	t.Cleanup(setup.Cleanup)

	cfgJSON := []byte(`{"command":"/bin/true"}`)
	srv := &model.McpServer{
		TenantID:  tenant.DefaultID,
		Name:      "up",
		Transport: types.TransportStdio,
		Config:    datatypes.JSON(cfgJSON),
		Enabled:   true,
	}
	if err := setup.DB.Create(srv).Error; err != nil {
		t.Fatal(err)
	}
	p := model.Prompt{
		TenantID:    tenant.DefaultID,
		ServerID:    srv.ID,
		Name:        "welcome",
		Enabled:     true,
		Description: "hi",
		Arguments:   datatypes.JSON([]byte(`[]`)),
	}
	if err := setup.DB.Create(&p).Error; err != nil {
		t.Fatal(err)
	}

	proxy := server.NewMCPServer(
		"test proxy",
		"0.0.1",
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcp.ProxyToolFilter),
	)
	sse := server.NewMCPServer(
		"test sse",
		"0.0.1",
		server.WithResourceCapabilities(false, false),
		server.WithToolCapabilities(true),
		server.WithPromptCapabilities(true),
		server.WithToolFilter(mcp.ProxyToolFilter),
	)
	mcpService, err := mcp.NewMCPService(&mcp.ServiceConfig{
		DB:                      setup.DB,
		McpProxyServer:          proxy,
		SseMcpProxyServer:       sse,
		Metrics:                 telemetry.NewNoopCustomMetrics(),
		McpServerInitReqTimeout: 5,
	})
	if err != nil {
		t.Fatal(err)
	}

	// Mirror production ordering: register tool groups before prompt groups on the MCP service.
	if _, err := toolgroup.NewToolGroupService(setup.DB, mcpService); err != nil {
		t.Fatal(err)
	}

	pgSvc, err := NewPromptGroupService(setup.DB, mcpService)
	if err != nil {
		t.Fatal(err)
	}

	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	inc, err := json.Marshal([]string{"up__welcome"})
	if err != nil {
		t.Fatal(err)
	}
	group := &model.PromptGroup{Name: "g1", Description: "d", IncludedPrompts: datatypes.JSON(inc)}
	if err := pgSvc.CreatePromptGroup(ctx, group); err != nil {
		t.Fatal(err)
	}

	mcpSrv, ok := pgSvc.GetPromptGroupMCPServer(tenant.DefaultID, "g1")
	if !ok || mcpSrv == nil {
		t.Fatal("expected MCP server instance for prompt group")
	}
}
