// Package skillset manages tenant skill set groupings.
package skillset

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/service/skill"
	"sami.io/mcpgateway/internal/service/toolgroup"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/gorm"
)

var ErrSkillSetNotFound = fmt.Errorf("skill set not found: %w", apierrors.ErrNotFound)

// Service manages skill sets and membership.
type Service struct {
	db          *gorm.DB
	skillService *skill.Service
}

// New creates a skill set service.
func New(db *gorm.DB, skillService *skill.Service) *Service {
	return &Service{db: db, skillService: skillService}
}

func (s *Service) dbTenant(ctx context.Context) *gorm.DB {
	return s.db.WithContext(ctx).Where("tenant_id = ?", tenant.MustFromContext(ctx))
}

// CreateSkillSet persists a new skill set with members.
func (s *Service) CreateSkillSet(ctx context.Context, req *types.CreateSkillSetRequest) (*model.SkillSet, error) {
	name := strings.TrimSpace(req.Name)
	if name == "" {
		return nil, fmt.Errorf("name is required: %w", apierrors.ErrInvalidInput)
	}
	if !toolgroup.ValidGroupName.MatchString(name) {
		return nil, fmt.Errorf("invalid skill set name: %w", apierrors.ErrInvalidInput)
	}
	desc := strings.TrimSpace(req.Description)
	if desc == "" || len(desc) > 1024 {
		return nil, fmt.Errorf("description must be 1-1024 characters: %w", apierrors.ErrInvalidInput)
	}
	sec := types.NormalizeGroupSecurityOption(req.SecurityOption)

	versionIDs, err := s.resolveMembers(ctx, req.Members)
	if err != nil {
		return nil, err
	}

	var created model.SkillSet
	err = s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		set := model.SkillSet{
			TenantID:       tenant.MustFromContext(ctx),
			Name:           name,
			Description:    desc,
			SecurityOption: sec,
		}
		if err := tx.Create(&set).Error; err != nil {
			return err
		}
		for _, vid := range versionIDs {
			m := model.SkillSetMember{SkillSetID: set.ID, SkillVersionID: vid}
			if err := tx.Create(&m).Error; err != nil {
				return err
			}
		}
		created = set
		return nil
	})
	if err != nil {
		return nil, err
	}
	return s.GetSkillSet(ctx, name)
}

// UpdateSkillSet updates description, security, and/or members.
func (s *Service) UpdateSkillSet(ctx context.Context, name string, req *types.UpdateSkillSetRequest) (*model.SkillSet, error) {
	set, err := s.GetSkillSet(ctx, name)
	if err != nil {
		return nil, err
	}
	updates := map[string]interface{}{}
	if req.Description != "" {
		desc := strings.TrimSpace(req.Description)
		if len(desc) == 0 || len(desc) > 1024 {
			return nil, fmt.Errorf("description must be 1-1024 characters: %w", apierrors.ErrInvalidInput)
		}
		updates["description"] = desc
	}
	if req.SecurityOption != "" {
		updates["security_option"] = types.NormalizeGroupSecurityOption(req.SecurityOption)
	}

	err = s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if len(updates) > 0 {
			if err := tx.Model(&model.SkillSet{}).Where("id = ?", set.ID).Updates(updates).Error; err != nil {
				return err
			}
		}
		if req.Members != nil {
			versionIDs, err := s.resolveMembers(ctx, req.Members)
			if err != nil {
				return err
			}
			if err := tx.Where("skill_set_id = ?", set.ID).Delete(&model.SkillSetMember{}).Error; err != nil {
				return err
			}
			for _, vid := range versionIDs {
				m := model.SkillSetMember{SkillSetID: set.ID, SkillVersionID: vid}
				if err := tx.Create(&m).Error; err != nil {
					return err
				}
			}
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return s.GetSkillSet(ctx, name)
}

// ListSkillSets returns summaries for the tenant.
func (s *Service) ListSkillSets(ctx context.Context) ([]types.SkillSetSummary, error) {
	var sets []model.SkillSet
	if err := s.dbTenant(ctx).Order("name ASC").Find(&sets).Error; err != nil {
		return nil, err
	}
	out := make([]types.SkillSetSummary, len(sets))
	for i, set := range sets {
		out[i] = types.SkillSetSummary{Name: set.Name, Description: set.Description}
	}
	return out, nil
}

// GetSkillSet loads a skill set with members preloaded.
func (s *Service) GetSkillSet(ctx context.Context, name string) (*model.SkillSet, error) {
	name = strings.TrimSpace(name)
	var set model.SkillSet
	if err := s.dbTenant(ctx).Preload("Members").Where("name = ?", name).First(&set).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrSkillSetNotFound
		}
		return nil, err
	}
	return &set, nil
}

// GetSkillSetDetail returns API detail with member summaries.
func (s *Service) GetSkillSetDetail(ctx context.Context, name string) (*types.SkillSetDetail, error) {
	set, err := s.GetSkillSet(ctx, name)
	if err != nil {
		return nil, err
	}
	members, err := s.memberSummaries(ctx, set)
	if err != nil {
		return nil, err
	}
	return &types.SkillSetDetail{
		SkillSetSummary: types.SkillSetSummary{Name: set.Name, Description: set.Description},
		SecurityOption:  types.NormalizeGroupSecurityOption(set.SecurityOption),
		Members:         members,
	}, nil
}

// MemberSummariesForSet builds member summaries for a loaded set.
func (s *Service) MemberSummariesForSet(ctx context.Context, set *model.SkillSet) ([]types.SkillSetMemberSummary, error) {
	return s.memberSummaries(ctx, set)
}

// DeleteSkillSet removes a skill set.
func (s *Service) DeleteSkillSet(ctx context.Context, name string) error {
	set, err := s.GetSkillSet(ctx, name)
	if err != nil {
		return err
	}
	return s.dbTenant(ctx).Delete(set).Error
}

// IsMember checks whether a skill version is in the named set for the tenant.
func (s *Service) IsMember(ctx context.Context, setName, skillName, version string) (bool, error) {
	set, err := s.GetSkillSet(ctx, setName)
	if err != nil {
		return false, err
	}
	sv, sk, err := s.skillService.ResolveVersionByNameVersion(ctx, skillName, version)
	if err != nil {
		return false, err
	}
	_ = sk
	for _, m := range set.Members {
		if m.SkillVersionID == sv.ID {
			return true, nil
		}
	}
	return false, nil
}

func (s *Service) memberSummaries(ctx context.Context, set *model.SkillSet) ([]types.SkillSetMemberSummary, error) {
	if len(set.Members) == 0 {
		return []types.SkillSetMemberSummary{}, nil
	}
	versionIDs := make([]uuid.UUID, len(set.Members))
	for i, m := range set.Members {
		versionIDs[i] = m.SkillVersionID
	}
	var versions []model.SkillVersion
	if err := s.db.WithContext(ctx).Where("id IN ?", versionIDs).Find(&versions).Error; err != nil {
		return nil, err
	}
	byID := make(map[uuid.UUID]model.SkillVersion, len(versions))
	for _, v := range versions {
		byID[v.ID] = v
	}
	skillIDs := make([]uuid.UUID, 0, len(versions))
	for _, v := range versions {
		skillIDs = append(skillIDs, v.SkillID)
	}
	var skills []model.Skill
	if err := s.dbTenant(ctx).Where("id IN ?", skillIDs).Find(&skills).Error; err != nil {
		return nil, err
	}
	skillNames := make(map[uuid.UUID]string, len(skills))
	for _, sk := range skills {
		skillNames[sk.ID] = sk.Name
	}
	out := make([]types.SkillSetMemberSummary, 0, len(set.Members))
	for _, m := range set.Members {
		v, ok := byID[m.SkillVersionID]
		if !ok {
			continue
		}
		out = append(out, types.SkillSetMemberSummary{
			SkillVersionID: v.ID.String(),
			Name:           skillNames[v.SkillID],
			Version:        v.Version,
			Description:    v.Description,
			Status:         v.Status,
		})
	}
	return out, nil
}

func (s *Service) resolveMembers(ctx context.Context, members []types.SkillSetMemberInput) ([]uuid.UUID, error) {
	if len(members) == 0 {
		return []uuid.UUID{}, nil
	}
	seen := make(map[uuid.UUID]struct{}, len(members))
	out := make([]uuid.UUID, 0, len(members))
	for _, m := range members {
		var sv *model.SkillVersion
		var err error
		if id := strings.TrimSpace(m.SkillVersionID); id != "" {
			parsed, parseErr := uuid.Parse(id)
			if parseErr != nil {
				return nil, fmt.Errorf("invalid skill_version_id: %w", apierrors.ErrInvalidInput)
			}
			sv, _, err = s.skillService.ResolveVersionByID(ctx, parsed)
		} else {
			sv, _, err = s.skillService.ResolveVersionByNameVersion(ctx, m.SkillName, m.Version)
		}
		if err != nil {
			return nil, err
		}
		if !types.CanAttachToSkillSet(sv.Status) {
			return nil, fmt.Errorf(
				"skill %q version %q must be active to attach to a skill set (status=%q): %w",
				m.SkillName, m.Version, sv.Status, apierrors.ErrInvalidInput,
			)
		}
		if _, dup := seen[sv.ID]; dup {
			return nil, fmt.Errorf("duplicate skill version in members: %w", apierrors.ErrInvalidInput)
		}
		seen[sv.ID] = struct{}{}
		out = append(out, sv.ID)
	}
	return out, nil
}
