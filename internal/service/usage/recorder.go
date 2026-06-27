package usage

import (
	"context"
	"time"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/telemetry"
	"sami.io/mcpgateway/pkg/auditctx"
	"gorm.io/gorm"
)

// ToolInvocationParams describes a recorded tool call.
type ToolInvocationParams struct {
	MCPServerName string
	ToolName      string
	Outcome       telemetry.ToolCallOutcome
	Latency       time.Duration
	Source        string
}

// Recorder persists tool invocation events.
type Recorder interface {
	RecordToolInvocation(ctx context.Context, params ToolInvocationParams)
}

type gormRecorder struct {
	db *gorm.DB
}

// NewRecorder stores tool invocation events in the database.
func NewRecorder(db *gorm.DB) Recorder {
	return &gormRecorder{db: db}
}

type noopRecorder struct{}

// NewNoopRecorder discards invocation events (used in tests).
func NewNoopRecorder() Recorder {
	return noopRecorder{}
}

func (noopRecorder) RecordToolInvocation(context.Context, ToolInvocationParams) {}

func (r *gormRecorder) RecordToolInvocation(ctx context.Context, params ToolInvocationParams) {
	meta := MetadataFromContext(ctx)
	now := time.Now().UTC()
	event := model.ToolInvocationEvent{
		CreatedOn:     now,
		CreatedBy:     auditctx.SystemActor,
		TenantID:      meta.TenantID,
		AgentAppID:    meta.AgentAppID,
		ToolGroupName: meta.ToolGroupName,
		MCPServerName: params.MCPServerName,
		ToolName:      params.ToolName,
		Outcome:       string(params.Outcome),
		LatencyMs:     params.Latency.Milliseconds(),
		Source:        params.Source,
		AuthKind:      meta.AuthKind,
	}
	_ = r.db.WithContext(ctx).Create(&event).Error
}
