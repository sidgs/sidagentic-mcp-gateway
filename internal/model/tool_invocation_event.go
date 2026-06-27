package model

import (
	"time"
)

const (
	ToolInvocationOutcomeSuccess = "success"
	ToolInvocationOutcomeError   = "error"

	ToolInvocationSourceMCPProxy   = "mcp_proxy"
	ToolInvocationSourceRESTInvoke = "rest_invoke"

	ToolInvocationAuthAgentApp = "agent_app"
	ToolInvocationAuthAPIKey   = "api_key"
	ToolInvocationAuthOpen     = "open"
	ToolInvocationAuthUnknown  = "unknown"
)

// ToolInvocationEvent records a single tool call for observability and analytics.
type ToolInvocationEvent struct {
	ID            uint      `gorm:"primaryKey"`
	CreatedOn     time.Time `gorm:"column:created_on;index"`
	CreatedBy     string    `gorm:"size:320;not null;default:system"`
	TenantID      string    `gorm:"size:255;not null;default:sami;index:idx_tool_inv_tenant_created,priority:1"`
	AgentAppID    *uint     `gorm:"index:idx_tool_inv_agent_created,priority:1"`
	ToolGroupName string    `gorm:"size:255;index:idx_tool_inv_group_created,priority:1"`
	MCPServerName string    `gorm:"size:255;not null;index:idx_tool_inv_tool_created,priority:1"`
	ToolName      string    `gorm:"size:255;not null;index:idx_tool_inv_tool_created,priority:2"`
	Outcome       string    `gorm:"size:16;not null"`
	LatencyMs     int64     `gorm:"not null"`
	Source        string    `gorm:"size:32;not null"`
	AuthKind      string    `gorm:"size:32;not null"`
}
