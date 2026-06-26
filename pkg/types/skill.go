package types

// SkillScriptInput is a script file bundled with a skill version.
type SkillScriptInput struct {
	Filename    string `json:"filename"`
	CodeContent string `json:"code_content"`
}

// SkillReferenceInput is a reference doc bundled with a skill version.
type SkillReferenceInput struct {
	Filename         string `json:"filename"`
	MarkdownContent  string `json:"markdown_content"`
}

// SkillVersionSummary is the token-optimized list shape for agents.
type SkillVersionSummary struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Version     string `json:"version"`
	Description string `json:"description"`
	Status      string `json:"status"`
	DLCStatus   string `json:"dlc_status"`
	Locked      bool   `json:"locked"`
}

// SkillVersionDetail is the full skill version record.
type SkillVersionDetail struct {
	SkillVersionSummary
	License       string            `json:"license,omitempty"`
	Compatibility string            `json:"compatibility,omitempty"`
	Metadata      map[string]string `json:"metadata,omitempty"`
	AllowedTools  []string          `json:"allowed_tools,omitempty"`
	BodyContent   string            `json:"body_content"`
	Scripts       []string          `json:"scripts"`
	References    []string          `json:"references"`
}

// SkillVersionEditableDetail adds bundled resource content for admin edit forms.
type SkillVersionEditableDetail struct {
	SkillVersionDetail
	ScriptFiles    []SkillScriptInput    `json:"script_files"`
	ReferenceFiles []SkillReferenceInput `json:"reference_files"`
}

// CreateSkillVersionRequest registers a new skill version.
type CreateSkillVersionRequest struct {
	Name          string                `json:"name"`
	Version       string                `json:"version"`
	Description   string                `json:"description"`
	License       string                `json:"license,omitempty"`
	Compatibility string                `json:"compatibility,omitempty"`
	Metadata      map[string]string     `json:"metadata,omitempty"`
	AllowedTools  []string              `json:"allowed_tools,omitempty"`
	BodyContent   string                `json:"body_content"`
	Status        string                `json:"status,omitempty"`
	DLCStatus     string                `json:"dlc_status,omitempty"`
	Scripts       []SkillScriptInput    `json:"scripts,omitempty"`
	References    []SkillReferenceInput `json:"references,omitempty"`
}

// UpdateSkillVersionRequest updates mutable skill version content.
type UpdateSkillVersionRequest struct {
	Description   string                `json:"description"`
	License       string                `json:"license,omitempty"`
	Compatibility string                `json:"compatibility,omitempty"`
	Metadata      map[string]string     `json:"metadata,omitempty"`
	AllowedTools  []string              `json:"allowed_tools,omitempty"`
	BodyContent   string                `json:"body_content"`
	Scripts       []SkillScriptInput    `json:"scripts,omitempty"`
	References    []SkillReferenceInput `json:"references,omitempty"`
}

// TransitionSkillStatusRequest changes lifecycle status.
type TransitionSkillStatusRequest struct {
	Status string `json:"status"`
}

// SetSkillDLCStatusRequest changes DLC readiness.
type SetSkillDLCStatusRequest struct {
	DLCStatus string `json:"dlc_status"`
}

// SetSkillLockRequest locks or unlocks a version.
type SetSkillLockRequest struct {
	Locked bool `json:"locked"`
}

// SkillSetMemberInput identifies a skill version for set membership.
type SkillSetMemberInput struct {
	SkillVersionID string `json:"skill_version_id,omitempty"`
	SkillName      string `json:"skill_name,omitempty"`
	Version        string `json:"version,omitempty"`
}

// SkillSetMemberSummary is a member entry in skill set responses.
type SkillSetMemberSummary struct {
	SkillVersionID string `json:"skill_version_id"`
	Name           string `json:"name"`
	Version        string `json:"version"`
	Description    string `json:"description"`
	Status         string `json:"status"`
}

// SkillSetSummary is the list shape for skill sets.
type SkillSetSummary struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

// SkillSetDetail includes members and security option.
type SkillSetDetail struct {
	SkillSetSummary
	SecurityOption string                  `json:"security_option"`
	Members        []SkillSetMemberSummary `json:"members"`
}

// CreateSkillSetRequest creates a skill set with members.
type CreateSkillSetRequest struct {
	Name            string                `json:"name"`
	Description     string                `json:"description"`
	SecurityOption  string                `json:"security_option,omitempty"`
	Members         []SkillSetMemberInput `json:"members"`
}

// UpdateSkillSetRequest updates a skill set.
type UpdateSkillSetRequest struct {
	Description    string                `json:"description"`
	SecurityOption string                `json:"security_option,omitempty"`
	Members        []SkillSetMemberInput `json:"members,omitempty"`
}

// SkillReferenceContentResponse returns on-demand reference markdown.
type SkillReferenceContentResponse struct {
	Filename         string `json:"filename"`
	MarkdownContent  string `json:"markdown_content"`
}
