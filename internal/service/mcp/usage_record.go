package mcp

import (
	"context"
	"time"

	"sami.io/mcpgateway/internal/service/usage"
	"sami.io/mcpgateway/internal/telemetry"
)

func (m *MCPService) recordToolUsage(
	ctx context.Context,
	serverName, toolName, source string,
	outcome telemetry.ToolCallOutcome,
	elapsed time.Duration,
) {
	if m.usageRecorder == nil {
		return
	}
	m.usageRecorder.RecordToolInvocation(ctx, usage.ToolInvocationParams{
		MCPServerName: serverName,
		ToolName:      toolName,
		Outcome:       outcome,
		Latency:       elapsed,
		Source:        source,
	})
}
