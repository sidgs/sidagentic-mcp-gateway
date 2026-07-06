// Package skill manages tenant skill catalog versions.
package skill

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

var ErrSkillVersionNotFound = fmt.Errorf("skill version not found: %w", apierrors.ErrNotFound)

// Service persists and queries skill catalog data.
type Service struct {
	db *gorm.DB
}

// New creates a skill service.
func New(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) dbTenant(ctx context.Context) *gorm.DB {
	return s.db.WithContext(ctx).Where("tenant_id = ?", tenant.MustFromContext(ctx))
}

type versionContentInput struct {
	Description   string
	License       string
	Compatibility string
	Metadata      map[string]string
	AllowedTools  []string
	BodyContent   string
	Scripts       []types.SkillScriptInput
	References    []types.SkillReferenceInput
}

// CreateSkillVersion upserts the skill identity and inserts a new version.
func (s *Service) CreateSkillVersion(ctx context.Context, req *types.CreateSkillVersionRequest) (*model.SkillVersion, error) {
	name := strings.TrimSpace(req.Name)
	version := strings.TrimSpace(req.Version)
	if err := ValidateSkillName(name); err != nil {
		return nil, err
	}
	if err := ValidateSkillVersion(version); err != nil {
		return nil, err
	}
	status := types.NormalizeSkillStatus(req.Status)
	if status != types.SkillStatusPreview {
		return nil, fmt.Errorf("new skill versions must start in preview status: %w", apierrors.ErrInvalidInput)
	}
	dlc := types.NormalizeSkillDLCStatus(req.DLCStatus)
	if err := validateVersionContent(req.Description, req.Compatibility, req.BodyContent, req.Scripts, req.References); err != nil {
		return nil, err
	}
	metaJSON, err := marshalMetadata(req.Metadata)
	if err != nil {
		return nil, err
	}
	toolsJSON, err := marshalStringSlice(req.AllowedTools)
	if err != nil {
		return nil, err
	}

	var created model.SkillVersion
	err = s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		tid := tenant.MustFromContext(ctx)
		var sk model.Skill
		err := tx.Where("tenant_id = ? AND name = ?", tid, name).First(&sk).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			sk = model.Skill{TenantID: tid, Name: name}
			if err := tx.Create(&sk).Error; err != nil {
				return err
			}
		} else if err != nil {
			return err
		}

		var existing int64
		if err := tx.Model(&model.SkillVersion{}).Where("skill_id = ? AND version = ?", sk.ID, version).Count(&existing).Error; err != nil {
			return err
		}
		if existing > 0 {
			return fmt.Errorf("skill version %q already exists: %w", version, apierrors.ErrInvalidInput)
		}

		sv := model.SkillVersion{
			SkillID:       sk.ID,
			Version:       version,
			Description:   strings.TrimSpace(req.Description),
			License:       strings.TrimSpace(req.License),
			Compatibility: strings.TrimSpace(req.Compatibility),
			Metadata:      metaJSON,
			AllowedTools:  toolsJSON,
			BodyContent:   req.BodyContent,
			Status:        status,
			DLCStatus:     dlc,
			Locked:        false,
		}
		if err := tx.Create(&sv).Error; err != nil {
			return err
		}
		if err := replaceScriptsReferences(tx, sv.ID, req.Scripts, req.References); err != nil {
			return err
		}
		created = sv
		return nil
	})
	if err != nil {
		return nil, err
	}
	return s.loadVersionByID(ctx, created.ID)
}

// UpdateSkillVersion updates mutable content when not locked.
func (s *Service) UpdateSkillVersion(ctx context.Context, name, version string, req *types.UpdateSkillVersionRequest) (*model.SkillVersion, error) {
	sv, sk, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return nil, err
	}
	if !IsVersionMutable(sv.Locked) {
		return nil, fmt.Errorf("skill version is locked: %w", apierrors.ErrInvalidInput)
	}
	if err := validateVersionContent(req.Description, req.Compatibility, req.BodyContent, req.Scripts, req.References); err != nil {
		return nil, err
	}
	metaJSON, err := marshalMetadata(req.Metadata)
	if err != nil {
		return nil, err
	}
	toolsJSON, err := marshalStringSlice(req.AllowedTools)
	if err != nil {
		return nil, err
	}

	err = s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		updates := map[string]interface{}{
			"description":   strings.TrimSpace(req.Description),
			"license":       strings.TrimSpace(req.License),
			"compatibility": strings.TrimSpace(req.Compatibility),
			"metadata":      metaJSON,
			"allowed_tools": toolsJSON,
			"body_content":  req.BodyContent,
		}
		if err := tx.Model(&model.SkillVersion{}).Where("id = ?", sv.ID).Updates(updates).Error; err != nil {
			return err
		}
		return replaceScriptsReferences(tx, sv.ID, req.Scripts, req.References)
	})
	if err != nil {
		return nil, err
	}
	_ = sk
	return s.loadVersionByID(ctx, sv.ID)
}

// TransitionStatus changes lifecycle status with DLC gating.
func (s *Service) TransitionStatus(ctx context.Context, name, version, newStatus string) (*model.SkillVersion, error) {
	sv, _, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return nil, err
	}
	if err := types.ValidateSkillStatusTransition(newStatus, sv.DLCStatus); err != nil {
		return nil, err
	}
	newStatus = types.NormalizeSkillStatus(newStatus)
	if err := s.db.WithContext(ctx).Model(&model.SkillVersion{}).Where("id = ?", sv.ID).Update("status", newStatus).Error; err != nil {
		return nil, err
	}
	return s.loadVersionByID(ctx, sv.ID)
}

// SetDLCStatus updates DLC readiness when not locked.
func (s *Service) SetDLCStatus(ctx context.Context, name, version, dlcStatus string) (*model.SkillVersion, error) {
	sv, _, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return nil, err
	}
	if !IsVersionMutable(sv.Locked) {
		return nil, fmt.Errorf("skill version is locked: %w", apierrors.ErrInvalidInput)
	}
	if err := types.ValidateSkillDLCStatus(dlcStatus); err != nil {
		return nil, err
	}
	dlcStatus = types.NormalizeSkillDLCStatus(dlcStatus)
	if err := s.db.WithContext(ctx).Model(&model.SkillVersion{}).Where("id = ?", sv.ID).Update("dlc_status", dlcStatus).Error; err != nil {
		return nil, err
	}
	return s.loadVersionByID(ctx, sv.ID)
}

// SetLocked locks or unlocks a version.
func (s *Service) SetLocked(ctx context.Context, name, version string, locked bool) (*model.SkillVersion, error) {
	sv, _, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return nil, err
	}
	if err := s.db.WithContext(ctx).Model(&model.SkillVersion{}).Where("id = ?", sv.ID).Update("locked", locked).Error; err != nil {
		return nil, err
	}
	return s.loadVersionByID(ctx, sv.ID)
}

// DeleteSkillVersion removes a version when allowed.
func (s *Service) DeleteSkillVersion(ctx context.Context, name, version string) error {
	sv, sk, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return err
	}
	if sv.Locked {
		return fmt.Errorf("cannot delete locked skill version: %w", apierrors.ErrInvalidInput)
	}
	var memberCount int64
	if err := s.db.WithContext(ctx).Model(&model.SkillSetMember{}).Where("skill_version_id = ?", sv.ID).Count(&memberCount).Error; err != nil {
		return err
	}
	if memberCount > 0 {
		return fmt.Errorf("skill version is attached to a skill set: %w", apierrors.ErrInvalidInput)
	}
	return s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Delete(&model.SkillVersion{}, "id = ?", sv.ID).Error; err != nil {
			return err
		}
		var remaining int64
		if err := tx.Model(&model.SkillVersion{}).Where("skill_id = ?", sk.ID).Count(&remaining).Error; err != nil {
			return err
		}
		if remaining == 0 {
			if err := tx.Delete(&model.Skill{}, "id = ?", sk.ID).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

// ListSkillSummaries returns all version summaries for the tenant.
func (s *Service) ListSkillSummaries(ctx context.Context) ([]types.SkillVersionSummary, error) {
	tid := tenant.MustFromContext(ctx)
	var rows []struct {
		ID          uuid.UUID
		Name        string
		Version     string
		Description string
		Status      string
		DLCStatus   string
		Locked      bool
	}
	err := s.db.WithContext(ctx).
		Table("skill_versions").
		Select("skill_versions.id, skills.name, skill_versions.version, skill_versions.description, skill_versions.status, skill_versions.dlc_status, skill_versions.locked").
		Joins("JOIN skills ON skills.id = skill_versions.skill_id").
		Where("skills.tenant_id = ?", tid).
		Order("skills.name ASC, skill_versions.version ASC").
		Scan(&rows).Error
	if err != nil {
		return nil, err
	}
	out := make([]types.SkillVersionSummary, len(rows))
	for i, r := range rows {
		out[i] = types.SkillVersionSummary{
			ID: r.ID.String(), Name: r.Name, Version: r.Version,
			Description: r.Description, Status: r.Status, DLCStatus: r.DLCStatus, Locked: r.Locked,
		}
	}
	return out, nil
}

// GetSkillVersion loads a full version by name and version label.
func (s *Service) GetSkillVersion(ctx context.Context, name, version string) (*model.SkillVersion, *model.Skill, error) {
	sv, sk, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return nil, nil, err
	}
	loaded, err := s.loadVersionByID(ctx, sv.ID)
	if err != nil {
		return nil, nil, err
	}
	return loaded, sk, nil
}

// GetReferenceContent returns markdown for a reference file.
func (s *Service) GetReferenceContent(ctx context.Context, name, version, filename string) (string, error) {
	sv, _, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return "", err
	}
	filename = strings.TrimSpace(filename)
	if err := ValidateResourceFilename(filename); err != nil {
		return "", err
	}
	var ref model.SkillReference
	if err := s.db.WithContext(ctx).Where("skill_version_id = ? AND filename = ?", sv.ID, filename).First(&ref).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", fmt.Errorf("reference not found: %w", apierrors.ErrNotFound)
		}
		return "", err
	}
	return ref.MarkdownContent, nil
}

// GetScriptContent returns source code for a script file.
func (s *Service) GetScriptContent(ctx context.Context, name, version, filename string) (string, error) {
	sv, _, err := s.getVersionRecord(ctx, name, version)
	if err != nil {
		return "", err
	}
	filename = strings.TrimSpace(filename)
	if err := ValidateResourceFilename(filename); err != nil {
		return "", err
	}
	var script model.SkillScript
	if err := s.db.WithContext(ctx).Where("skill_version_id = ? AND filename = ?", sv.ID, filename).First(&script).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", fmt.Errorf("script not found: %w", apierrors.ErrNotFound)
		}
		return "", err
	}
	return script.CodeContent, nil
}

// ResolveVersionByID loads a version with skill for tenant scope checks.
func (s *Service) ResolveVersionByID(ctx context.Context, versionID uuid.UUID) (*model.SkillVersion, *model.Skill, error) {
	var sv model.SkillVersion
	if err := s.db.WithContext(ctx).First(&sv, "id = ?", versionID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, ErrSkillVersionNotFound
		}
		return nil, nil, err
	}
	var sk model.Skill
	if err := s.dbTenant(ctx).First(&sk, "id = ?", sv.SkillID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, ErrSkillVersionNotFound
		}
		return nil, nil, err
	}
	return &sv, &sk, nil
}

// ResolveVersionByNameVersion resolves a tenant-scoped version.
func (s *Service) ResolveVersionByNameVersion(ctx context.Context, name, version string) (*model.SkillVersion, *model.Skill, error) {
	return s.getVersionRecord(ctx, name, version)
}

// ToDetail converts a loaded version to API detail.
func ToDetail(sv *model.SkillVersion, skillName string) (*types.SkillVersionDetail, error) {
	meta, err := unmarshalMetadata(sv.Metadata)
	if err != nil {
		return nil, err
	}
	tools, err := unmarshalStringSlice(sv.AllowedTools)
	if err != nil {
		return nil, err
	}
	scripts := make([]string, len(sv.Scripts))
	for i, sc := range sv.Scripts {
		scripts[i] = sc.Filename
	}
	refs := make([]string, len(sv.References))
	for i, r := range sv.References {
		refs[i] = r.Filename
	}
	return &types.SkillVersionDetail{
		SkillVersionSummary: types.SkillVersionSummary{
			ID: sv.ID.String(), Name: skillName, Version: sv.Version,
			Description: sv.Description, Status: sv.Status, DLCStatus: sv.DLCStatus, Locked: sv.Locked,
		},
		License: sv.License, Compatibility: sv.Compatibility,
		Metadata: meta, AllowedTools: tools, BodyContent: sv.BodyContent,
		Scripts: scripts, References: refs,
	}, nil
}

// ToEditableDetail converts a loaded version to an admin edit shape with resource content.
func ToEditableDetail(sv *model.SkillVersion, skillName string) (*types.SkillVersionEditableDetail, error) {
	base, err := ToDetail(sv, skillName)
	if err != nil {
		return nil, err
	}
	scriptFiles := make([]types.SkillScriptInput, len(sv.Scripts))
	for i, sc := range sv.Scripts {
		scriptFiles[i] = types.SkillScriptInput{Filename: sc.Filename, CodeContent: sc.CodeContent}
	}
	refFiles := make([]types.SkillReferenceInput, len(sv.References))
	for i, r := range sv.References {
		refFiles[i] = types.SkillReferenceInput{Filename: r.Filename, MarkdownContent: r.MarkdownContent}
	}
	return &types.SkillVersionEditableDetail{
		SkillVersionDetail: *base,
		ScriptFiles:        scriptFiles,
		ReferenceFiles:     refFiles,
	}, nil
}

func (s *Service) getVersionRecord(ctx context.Context, name, version string) (*model.SkillVersion, *model.Skill, error) {
	name = strings.TrimSpace(name)
	version = strings.TrimSpace(version)
	var sk model.Skill
	if err := s.dbTenant(ctx).Where("name = ?", name).First(&sk).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, ErrSkillVersionNotFound
		}
		return nil, nil, err
	}
	var sv model.SkillVersion
	if err := s.db.WithContext(ctx).Where("skill_id = ? AND version = ?", sk.ID, version).First(&sv).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil, ErrSkillVersionNotFound
		}
		return nil, nil, err
	}
	return &sv, &sk, nil
}

func (s *Service) loadVersionByID(ctx context.Context, id uuid.UUID) (*model.SkillVersion, error) {
	var sv model.SkillVersion
	if err := s.db.WithContext(ctx).Preload("Scripts").Preload("References").First(&sv, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrSkillVersionNotFound
		}
		return nil, err
	}
	return &sv, nil
}

func validateVersionContent(desc, compat, body string, scripts []types.SkillScriptInput, refs []types.SkillReferenceInput) error {
	if err := ValidateDescription(desc); err != nil {
		return err
	}
	if err := ValidateCompatibility(compat); err != nil {
		return err
	}
	if err := ValidateBodyContent(body); err != nil {
		return err
	}
	scriptNames := make([]string, 0, len(scripts))
	for _, sc := range scripts {
		if err := ValidateResourceFilename(sc.Filename); err != nil {
			return err
		}
		scriptNames = append(scriptNames, strings.TrimSpace(sc.Filename))
	}
	if _, err := CollectScriptFilenames(scriptNames); err != nil {
		return err
	}
	refNames := make([]string, 0, len(refs))
	for _, r := range refs {
		if err := ValidateResourceFilename(r.Filename); err != nil {
			return err
		}
		refNames = append(refNames, strings.TrimSpace(r.Filename))
	}
	if _, err := CollectReferenceFilenames(refNames); err != nil {
		return err
	}
	return ValidateBodyResourceLinks(body, scriptNames, refNames)
}

func replaceScriptsReferences(tx *gorm.DB, versionID uuid.UUID, scripts []types.SkillScriptInput, refs []types.SkillReferenceInput) error {
	if err := tx.Where("skill_version_id = ?", versionID).Delete(&model.SkillScript{}).Error; err != nil {
		return err
	}
	if err := tx.Where("skill_version_id = ?", versionID).Delete(&model.SkillReference{}).Error; err != nil {
		return err
	}
	for _, sc := range scripts {
		row := model.SkillScript{
			SkillVersionID: versionID,
			Filename:       strings.TrimSpace(sc.Filename),
			CodeContent:    sc.CodeContent,
		}
		if err := tx.Create(&row).Error; err != nil {
			return err
		}
	}
	for _, r := range refs {
		row := model.SkillReference{
			SkillVersionID:  versionID,
			Filename:        strings.TrimSpace(r.Filename),
			MarkdownContent: r.MarkdownContent,
		}
		if err := tx.Create(&row).Error; err != nil {
			return err
		}
	}
	return nil
}

func marshalMetadata(m map[string]string) (datatypes.JSON, error) {
	if m == nil {
		return datatypes.JSON([]byte("{}")), nil
	}
	b, err := json.Marshal(m)
	if err != nil {
		return nil, err
	}
	return datatypes.JSON(b), nil
}

func marshalStringSlice(items []string) (datatypes.JSON, error) {
	if items == nil {
		items = []string{}
	}
	b, err := json.Marshal(items)
	if err != nil {
		return nil, err
	}
	return datatypes.JSON(b), nil
}

func unmarshalMetadata(raw datatypes.JSON) (map[string]string, error) {
	if raw == nil || len(raw) == 0 {
		return map[string]string{}, nil
	}
	var m map[string]string
	if err := json.Unmarshal(raw, &m); err != nil {
		return nil, err
	}
	if m == nil {
		m = map[string]string{}
	}
	return m, nil
}

func unmarshalStringSlice(raw datatypes.JSON) ([]string, error) {
	if raw == nil || len(raw) == 0 {
		return []string{}, nil
	}
	var items []string
	if err := json.Unmarshal(raw, &items); err != nil {
		return nil, err
	}
	if items == nil {
		items = []string{}
	}
	return items, nil
}
