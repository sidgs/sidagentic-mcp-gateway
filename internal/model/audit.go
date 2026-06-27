package model

import (
	"context"
	"time"

	"sami.io/mcpgateway/pkg/auditctx"
	"gorm.io/gorm"
)

// AuditFields records who created/updated a row and when.
// Timestamp columns stay nullable in the schema so legacy rows can migrate from created_at/updated_at.
type AuditFields struct {
	CreatedOn time.Time `json:"created_on" gorm:"column:created_on"`
	CreatedBy string    `json:"created_by" gorm:"size:320;not null;default:system"`
	UpdatedOn time.Time `json:"updated_on" gorm:"column:updated_on"`
	UpdatedBy string    `json:"updated_by" gorm:"size:320;not null;default:system"`
}

// BaseModel replaces gorm.Model with explicit audit metadata.
type BaseModel struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	AuditFields
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// Auditable is implemented by models embedding AuditFields.
type Auditable interface {
	GetAuditFields() *AuditFields
}

func (a *AuditFields) GetAuditFields() *AuditFields { return a }

// StampCreate sets create and update audit fields on a new row.
func StampCreate(rec Auditable, actor string, now time.Time) {
	if actor == "" {
		actor = auditctx.SystemActor
	}
	if now.IsZero() {
		now = time.Now().UTC()
	}
	af := rec.GetAuditFields()
	af.CreatedOn = now
	af.UpdatedOn = now
	af.CreatedBy = actor
	af.UpdatedBy = actor
}

// StampUpdate sets update audit fields on an existing row.
func StampUpdate(rec Auditable, actor string, now time.Time) {
	if actor == "" {
		actor = auditctx.SystemActor
	}
	if now.IsZero() {
		now = time.Now().UTC()
	}
	af := rec.GetAuditFields()
	if af.CreatedOn.IsZero() {
		af.CreatedOn = now
		af.CreatedBy = actor
	}
	af.UpdatedOn = now
	af.UpdatedBy = actor
}

// StampCreateFromCtx stamps create fields using the actor from context.
func StampCreateFromCtx(ctx context.Context, rec Auditable) {
	StampCreate(rec, auditctx.ActorFrom(ctx), time.Now().UTC())
}

// StampUpdateFromCtx stamps update fields using the actor from context.
func StampUpdateFromCtx(ctx context.Context, rec Auditable) {
	StampUpdate(rec, auditctx.ActorFrom(ctx), time.Now().UTC())
}
