package model

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

// Skill is the logical identity for a named skill within a tenant.
type Skill struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	TenantID  string    `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_skill_tenant_name"`
	Name      string    `json:"name" gorm:"size:64;not null;uniqueIndex:ux_skill_tenant_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Versions []SkillVersion `json:"-" gorm:"foreignKey:SkillID;constraint:OnDelete:CASCADE"`
}

func (Skill) TableName() string { return "skills" }

func (s *Skill) BeforeCreate(_ *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}

// SkillVersion holds versioned skill content and lifecycle state.
type SkillVersion struct {
	ID            uuid.UUID      `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	SkillID       uuid.UUID      `json:"skill_id" gorm:"type:uuid;not null;uniqueIndex:ux_skill_version"`
	Version       string         `json:"version" gorm:"size:32;not null;uniqueIndex:ux_skill_version"`
	Description   string         `json:"description" gorm:"size:1024;not null"`
	License       string         `json:"license,omitempty" gorm:"type:text"`
	Compatibility string         `json:"compatibility,omitempty" gorm:"size:500"`
	Metadata      datatypes.JSON `json:"metadata,omitempty" gorm:"type:jsonb"`
	AllowedTools  datatypes.JSON `json:"allowed_tools,omitempty" gorm:"type:jsonb"`
	BodyContent   string         `json:"body_content" gorm:"type:text;not null"`
	Status        string         `json:"status" gorm:"size:16;not null;default:preview"`
	DLCStatus     string         `json:"dlc_status" gorm:"size:16;not null;default:development;column:dlc_status"`
	Locked        bool           `json:"locked" gorm:"not null;default:false"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`

	Skill      Skill            `json:"-" gorm:"foreignKey:SkillID;constraint:OnDelete:CASCADE"`
	Scripts    []SkillScript    `json:"-" gorm:"foreignKey:SkillVersionID;constraint:OnDelete:CASCADE"`
	References []SkillReference `json:"-" gorm:"foreignKey:SkillVersionID;constraint:OnDelete:CASCADE"`
}

func (SkillVersion) TableName() string { return "skill_versions" }

func (sv *SkillVersion) BeforeCreate(_ *gorm.DB) error {
	if sv.ID == uuid.Nil {
		sv.ID = uuid.New()
	}
	return nil
}

// SkillSet groups pinned skill versions for agent catalog access.
type SkillSet struct {
	ID             uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	TenantID       string    `json:"tenant_id" gorm:"size:255;not null;default:sami;uniqueIndex:ux_skillset_tenant_name"`
	Name           string    `json:"name" gorm:"size:64;not null;uniqueIndex:ux_skillset_tenant_name"`
	Description    string    `json:"description" gorm:"size:1024;not null"`
	SecurityOption string    `json:"security_option" gorm:"size:32;not null;default:basic"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`

	Members []SkillSetMember `json:"-" gorm:"foreignKey:SkillSetID;constraint:OnDelete:CASCADE"`
}

func (SkillSet) TableName() string { return "skill_sets" }

func (s *SkillSet) BeforeCreate(_ *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}

// SkillSetMember links a skill set to a specific skill version.
type SkillSetMember struct {
	SkillSetID      uuid.UUID `json:"skill_set_id" gorm:"type:uuid;primaryKey"`
	SkillVersionID  uuid.UUID `json:"skill_version_id" gorm:"type:uuid;primaryKey"`
	SkillVersion    SkillVersion `json:"-" gorm:"foreignKey:SkillVersionID;constraint:OnDelete:CASCADE"`
}

func (SkillSetMember) TableName() string { return "skill_set_members" }

// SkillScript is executable code attached to a skill version.
type SkillScript struct {
	ID             uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	SkillVersionID uuid.UUID `json:"skill_version_id" gorm:"type:uuid;not null;uniqueIndex:ux_skill_script_filename"`
	Filename       string    `json:"filename" gorm:"size:255;not null;uniqueIndex:ux_skill_script_filename"`
	CodeContent    string    `json:"code_content" gorm:"type:text;not null"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func (SkillScript) TableName() string { return "skill_scripts" }

func (s *SkillScript) BeforeCreate(_ *gorm.DB) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	return nil
}

// SkillReference is reference documentation attached to a skill version.
type SkillReference struct {
	ID               uuid.UUID `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	SkillVersionID   uuid.UUID `json:"skill_version_id" gorm:"type:uuid;not null;uniqueIndex:ux_skill_reference_filename"`
	Filename         string    `json:"filename" gorm:"size:255;not null;uniqueIndex:ux_skill_reference_filename"`
	MarkdownContent  string    `json:"markdown_content" gorm:"type:text;not null"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

func (SkillReference) TableName() string { return "skill_references" }

func (r *SkillReference) BeforeCreate(_ *gorm.DB) error {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	return nil
}
