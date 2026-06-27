package model

import (
	"context"
	"testing"
	"time"

	"sami.io/mcpgateway/pkg/auditctx"
)

type auditStub struct {
	AuditFields
}

func (a auditStub) GetAuditFields() *AuditFields { return &a.AuditFields }

func TestStampCreateAndUpdate(t *testing.T) {
	now := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	rec := &auditStub{}
	StampCreate(rec, "alice@example.com", now)
	if rec.CreatedBy != "alice@example.com" || rec.UpdatedBy != "alice@example.com" {
		t.Fatalf("create audit actors: %+v", rec.AuditFields)
	}
	if !rec.CreatedOn.Equal(now) || !rec.UpdatedOn.Equal(now) {
		t.Fatalf("create audit timestamps: %+v", rec.AuditFields)
	}

	later := now.Add(time.Hour)
	StampUpdate(rec, "bob@example.com", later)
	if rec.CreatedBy != "alice@example.com" {
		t.Fatalf("update should preserve created_by, got %q", rec.CreatedBy)
	}
	if rec.UpdatedBy != "bob@example.com" || !rec.UpdatedOn.Equal(later) {
		t.Fatalf("update audit fields: %+v", rec.AuditFields)
	}
}

func TestStampCreateFromCtxUsesActor(t *testing.T) {
	rec := &auditStub{}
	ctx := auditctx.WithActor(context.Background(), "ctx-actor@example.com")
	StampCreateFromCtx(ctx, rec)
	if rec.CreatedBy != "ctx-actor@example.com" {
		t.Fatalf("expected actor from context, got %q", rec.CreatedBy)
	}
}
