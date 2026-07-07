package tenantregistry

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/notifications"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/auditctx"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/gorm"
)

type Service struct {
	db         *gorm.DB
	dispatcher *notifications.Dispatcher
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}

// SetNotificationDispatcher wires optional email notifications.
func (s *Service) SetNotificationDispatcher(d *notifications.Dispatcher) {
	s.dispatcher = d
}

func (s *Service) Get(ctx context.Context, id string) (*model.Tenant, error) {
	id = strings.TrimSpace(id)
	var t model.Tenant
	if err := s.db.WithContext(ctx).Where("id = ?", id).First(&t).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("tenant not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &t, nil
}

func (s *Service) List(ctx context.Context, includeRemoved bool) ([]model.Tenant, error) {
	q := s.db.WithContext(ctx).Order("name ASC")
	if !includeRemoved {
		q = q.Where("status <> ?", model.TenantStatusRemoved)
	}
	var rows []model.Tenant
	if err := q.Find(&rows).Error; err != nil {
		return nil, err
	}
	return rows, nil
}

func (s *Service) Create(ctx context.Context, id, name, ownerEmail string) (*model.Tenant, error) {
	id = strings.TrimSpace(id)
	name = strings.TrimSpace(name)
	ownerEmail = strings.TrimSpace(strings.ToLower(ownerEmail))
	if err := tenant.Validate(id); err != nil {
		return nil, err
	}
	if name == "" {
		return nil, fmt.Errorf("tenant name is required: %w", apierrors.ErrInvalidInput)
	}
	if ownerEmail == "" {
		return nil, fmt.Errorf("owner email is required: %w", apierrors.ErrInvalidInput)
	}
	row := model.Tenant{
		ID:         id,
		Name:       name,
		Status:     model.TenantStatusActive,
		Mode:       model.TenantModeNormal,
		OwnerEmail: ownerEmail,
	}
	model.StampCreateFromCtx(ctx, &row)
	if err := s.db.WithContext(ctx).Create(&row).Error; err != nil {
		return nil, fmt.Errorf("create tenant: %w", err)
	}
	mem := model.TenantMembership{
		TenantID: id,
		OIDCSub:  pendingSubForEmail(ownerEmail),
		Email:    ownerEmail,
		Role:     types.UserRoleAdministrator,
	}
	model.StampCreateFromCtx(ctx, &mem)
	if err := s.db.WithContext(ctx).Create(&mem).Error; err != nil {
		return nil, fmt.Errorf("create tenant owner membership: %w", err)
	}
	if s.dispatcher != nil {
		s.dispatcher.TenantOwnerInvite(ctx, ownerEmail, id, name, auditctx.ActorFrom(ctx))
	}
	return &row, nil
}

func (s *Service) Update(ctx context.Context, id string, fn func(*model.Tenant) error) (*model.Tenant, error) {
	row, err := s.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	if err := fn(row); err != nil {
		return nil, err
	}
	model.StampUpdateFromCtx(ctx, row)
	if err := s.db.WithContext(ctx).Save(row).Error; err != nil {
		return nil, err
	}
	return row, nil
}

func (s *Service) SetStatus(ctx context.Context, id string, status model.TenantStatus, retireAt *time.Time) (*model.Tenant, error) {
	return s.Update(ctx, id, func(t *model.Tenant) error {
		t.Status = status
		if status == model.TenantStatusRetired {
			t.RetireAt = retireAt
		}
		return nil
	})
}

func (s *Service) SetMode(ctx context.Context, id string, mode model.TenantMode) (*model.Tenant, error) {
	return s.Update(ctx, id, func(t *model.Tenant) error {
		t.Mode = mode
		return nil
	})
}

func (s *Service) ListMemberships(ctx context.Context, tenantID string) ([]model.TenantMembership, error) {
	var rows []model.TenantMembership
	if err := s.db.WithContext(ctx).Where("tenant_id = ?", tenantID).Order("email ASC").Find(&rows).Error; err != nil {
		return nil, err
	}
	return rows, nil
}

func (s *Service) AddMember(ctx context.Context, tenantID, email string, role types.UserRole) (*model.TenantMembership, error) {
	if _, err := s.Get(ctx, tenantID); err != nil {
		return nil, err
	}
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" {
		return nil, fmt.Errorf("email is required: %w", apierrors.ErrInvalidInput)
	}
	role = types.NormalizeUserRole(role)
	row := model.TenantMembership{
		TenantID: tenantID,
		OIDCSub:  pendingSubForEmail(email),
		Email:    email,
		Role:     role,
	}
	model.StampCreateFromCtx(ctx, &row)
	if err := s.db.WithContext(ctx).Create(&row).Error; err != nil {
		return nil, fmt.Errorf("add tenant member: %w", err)
	}
	if s.dispatcher != nil {
		t, _ := s.Get(ctx, tenantID)
		tenantName := tenantID
		if t != nil {
			tenantName = t.Name
		}
		s.dispatcher.TenantMemberAdded(ctx, email, tenantID, tenantName, string(role), auditctx.ActorFrom(ctx))
	}
	return &row, nil
}

func (s *Service) PatchMemberRole(ctx context.Context, tenantID string, membershipID uint, role types.UserRole) (*model.TenantMembership, error) {
	var row model.TenantMembership
	if err := s.db.WithContext(ctx).Where("id = ? AND tenant_id = ?", membershipID, tenantID).First(&row).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("membership not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	oldRole := row.Role
	row.Role = types.NormalizeUserRole(role)
	model.StampUpdateFromCtx(ctx, &row)
	if err := s.db.WithContext(ctx).Save(&row).Error; err != nil {
		return nil, err
	}
	if s.dispatcher != nil && row.Email != "" {
		t, _ := s.Get(ctx, tenantID)
		tenantName := tenantID
		if t != nil {
			tenantName = t.Name
		}
		s.dispatcher.TenantMembershipRoleUpdated(ctx, row.Email, tenantID, tenantName, string(oldRole), string(row.Role), auditctx.ActorFrom(ctx))
	}
	return &row, nil
}

func (s *Service) RemoveMember(ctx context.Context, tenantID string, membershipID uint) error {
	var row model.TenantMembership
	if err := s.db.WithContext(ctx).Where("id = ? AND tenant_id = ?", membershipID, tenantID).First(&row).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fmt.Errorf("membership not found: %w", apierrors.ErrNotFound)
		}
		return err
	}
	res := s.db.WithContext(ctx).Where("id = ? AND tenant_id = ?", membershipID, tenantID).Delete(&model.TenantMembership{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return fmt.Errorf("membership not found: %w", apierrors.ErrNotFound)
	}
	if s.dispatcher != nil && row.Email != "" {
		t, _ := s.Get(ctx, tenantID)
		tenantName := tenantID
		if t != nil {
			tenantName = t.Name
		}
		s.dispatcher.TenantMemberRemoved(ctx, row.Email, tenantID, tenantName, auditctx.ActorFrom(ctx))
	}
	return nil
}

func (s *Service) MembershipForIdentity(ctx context.Context, tenantID, email string) (*model.TenantMembership, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" {
		return nil, fmt.Errorf("email required: %w", apierrors.ErrInvalidInput)
	}
	var row model.TenantMembership
	if err := s.db.WithContext(ctx).Where("tenant_id = ? AND email = ?", tenantID, email).First(&row).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("membership not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &row, nil
}

func (s *Service) ListForIdentity(ctx context.Context, email string, platformAdmin bool) ([]model.Tenant, map[string]model.TenantMembership, error) {
	if platformAdmin {
		tenants, err := s.List(ctx, false)
		if err != nil {
			return nil, nil, err
		}
		return tenants, map[string]model.TenantMembership{}, nil
	}
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" {
		return nil, nil, nil
	}
	var memberships []model.TenantMembership
	q := s.db.WithContext(ctx).Where("email = ?", email)
	if err := q.Find(&memberships).Error; err != nil {
		return nil, nil, err
	}
	if len(memberships) == 0 {
		return nil, nil, nil
	}
	ids := make([]string, 0, len(memberships))
	byTenant := make(map[string]model.TenantMembership, len(memberships))
	for _, m := range memberships {
		ids = append(ids, m.TenantID)
		byTenant[m.TenantID] = m
	}
	var tenants []model.Tenant
	if err := s.db.WithContext(ctx).Where("id IN ? AND status <> ?", ids, model.TenantStatusRemoved).Order("name ASC").Find(&tenants).Error; err != nil {
		return nil, nil, err
	}
	return tenants, byTenant, nil
}

// CanLogin reports whether the tenant allows login for the given caller.
func CanLogin(t *model.Tenant, platformAdmin bool, now time.Time) (bool, string) {
	if t == nil {
		return false, "tenant not found"
	}
	switch t.Status {
	case model.TenantStatusRemoved:
		return false, "tenant removed"
	case model.TenantStatusSuspended:
		if !platformAdmin {
			return false, "tenant suspended"
		}
	case model.TenantStatusRetired:
		if t.RetireAt != nil && now.After(*t.RetireAt) && !platformAdmin {
			return false, "tenant retired"
		}
	}
	return true, ""
}

// CanMutate reports whether non-platform-admin mutations are allowed.
func CanMutate(t *model.Tenant, platformAdmin bool) bool {
	if t == nil {
		return false
	}
	if platformAdmin {
		return t.Status != model.TenantStatusRemoved
	}
	if t.Mode == model.TenantModeReadOnly {
		return false
	}
	ok, _ := CanLogin(t, false, time.Now().UTC())
	return ok && t.Status == model.TenantStatusActive
}

func ToTenantPublic(t model.Tenant) types.TenantPublic {
	return types.TenantPublic{
		ID: t.ID, Name: t.Name, Status: types.TenantStatus(t.Status), Mode: types.TenantMode(t.Mode),
		RetireAt: t.RetireAt, OwnerEmail: t.OwnerEmail,
		AuditPublic: types.AuditPublic{CreatedOn: t.CreatedOn, CreatedBy: t.CreatedBy, UpdatedOn: t.UpdatedOn, UpdatedBy: t.UpdatedBy},
	}
}

func ToMembershipPublic(m model.TenantMembership) types.TenantMembershipPublic {
	return types.TenantMembershipPublic{
		ID: m.ID, TenantID: m.TenantID, Email: m.Email, Role: string(m.Role),
		AuditPublic: types.AuditPublic{CreatedOn: m.CreatedOn, CreatedBy: m.CreatedBy, UpdatedOn: m.UpdatedOn, UpdatedBy: m.UpdatedBy},
	}
}

func pendingSubForEmail(email string) string {
	return "email:" + strings.TrimSpace(strings.ToLower(email))
}
