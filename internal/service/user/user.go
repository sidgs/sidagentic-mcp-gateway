// Package user provides user service functionality for the SAMI MCP Gateway application.
package user

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"sami.io/mcpgateway/internal"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/notifications"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/auditctx"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/gorm"
)

// UserService provides methods to manage users in the SAMI MCP Gateway system.
type UserService struct {
	db         *gorm.DB
	dispatcher *notifications.Dispatcher
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{db: db}
}

// SetNotificationDispatcher wires optional email notifications.
func (u *UserService) SetNotificationDispatcher(d *notifications.Dispatcher) {
	u.dispatcher = d
}

func (u *UserService) dbTenant(ctx context.Context) *gorm.DB {
	return u.db.WithContext(ctx).Where("tenant_id = ?", tenant.MustFromContext(ctx))
}

// CreateAdminUser creates an administrator user in the SAMI MCP Gateway system.
func (u *UserService) CreateAdminUser(ctx context.Context) (*model.User, error) {
	tid := tenant.MustFromContext(ctx)
	token, err := internal.GenerateAccessToken()
	if err != nil {
		return nil, err
	}
	user := model.User{
		TenantID:    tid,
		Username:    "admin",
		Role:        types.UserRoleAdministrator,
		AccessToken: token,
	}
	model.StampCreateFromCtx(ctx, &user)
	if err := u.db.WithContext(ctx).Create(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to create admin user: %w", err)
	}
	return &user, nil
}

// GetBootstrapAdminUser returns the built-in enterprise admin user (username "admin"),
// or (nil, nil) if none exists for the tenant.
func (u *UserService) GetBootstrapAdminUser(ctx context.Context) (*model.User, error) {
	tid := tenant.MustFromContext(ctx)
	var user model.User
	err := u.db.WithContext(ctx).Where(
		"tenant_id = ? AND username = ? AND role IN ?",
		tid,
		"admin",
		[]types.UserRole{types.UserRoleAdministrator, types.UserRoleAdmin},
	).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to load bootstrap admin user: %w", err)
	}
	return &user, nil
}

// GetUserByAccessToken returns a user associated with the provided access token.
func (u *UserService) GetUserByAccessToken(ctx context.Context, token string) (*model.User, error) {
	var user model.User
	if err := u.dbTenant(ctx).Where("access_token = ?", token).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user not found: %w", apierrors.ErrNotFound)
		}
		return nil, fmt.Errorf("failed to verify token: %w", err)
	}
	return &user, nil
}

func (u *UserService) GetByID(ctx context.Context, id uint) (*model.User, error) {
	var user model.User
	if err := u.dbTenant(ctx).Where("id = ?", id).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &user, nil
}

func (u *UserService) GetByOIDCSub(ctx context.Context, sub string) (*model.User, error) {
	sub = strings.TrimSpace(sub)
	if sub == "" {
		return nil, nil
	}
	var user model.User
	err := u.dbTenant(ctx).Where("oidc_sub = ?", sub).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *UserService) GetByEmail(ctx context.Context, email string) (*model.User, error) {
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" {
		return nil, nil
	}
	var user model.User
	err := u.dbTenant(ctx).Where("LOWER(email) = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// UpsertFromDashboardSession finds or creates a dashboard user for the OIDC/JWT session.
func (u *UserService) UpsertFromDashboardSession(ctx context.Context, sub, email string, bootstrapAdmin bool, sessionRole types.UserRole) (*model.User, error) {
	sub = strings.TrimSpace(sub)
	email = strings.TrimSpace(email)
	if sub == "" && email == "" {
		return nil, fmt.Errorf("session identity required: %w", apierrors.ErrInvalidInput)
	}
	if existing, err := u.GetByOIDCSub(ctx, sub); err != nil {
		return nil, err
	} else if existing != nil {
		return u.syncSessionUser(ctx, existing, bootstrapAdmin, sessionRole)
	}
	if email != "" {
		if existing, err := u.GetByEmail(ctx, email); err != nil {
			return nil, err
		} else if existing != nil {
			if sub != "" && existing.OIDCSub == "" {
				existing.OIDCSub = sub
				model.StampUpdateFromCtx(ctx, existing)
				if err := u.db.WithContext(ctx).Save(existing).Error; err != nil {
					return nil, err
				}
			}
			return u.syncSessionUser(ctx, existing, bootstrapAdmin, sessionRole)
		}
	}
	token, err := internal.GenerateAccessToken()
	if err != nil {
		return nil, err
	}
	username := dashboardUsername(sub, email)
	role := types.UserRoleUser
	if bootstrapAdmin {
		role = types.UserRoleAdministrator
	}
	if sessionRole != "" {
		role = types.NormalizeUserRole(sessionRole)
	}
	user := model.User{
		TenantID:    tenant.MustFromContext(ctx),
		Username:    username,
		Role:        role,
		AccessToken: token,
		OIDCSub:     sub,
	}
	if email != "" {
		user.Email = email
	}
	model.StampCreateFromCtx(ctx, &user)
	if err := u.db.WithContext(ctx).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *UserService) syncSessionUser(ctx context.Context, user *model.User, bootstrapAdmin bool, sessionRole types.UserRole) (*model.User, error) {
	user, err := u.maybeUpgradeBootstrapAdmin(ctx, user, bootstrapAdmin)
	if err != nil {
		return nil, err
	}
	if sessionRole != "" {
		normalized := types.NormalizeUserRole(sessionRole)
		if user.Role != normalized {
			user.Role = normalized
			model.StampUpdateFromCtx(ctx, user)
			if err := u.db.WithContext(ctx).Save(user).Error; err != nil {
				return nil, err
			}
		}
	}
	return user, nil
}

func (u *UserService) maybeUpgradeBootstrapAdmin(ctx context.Context, user *model.User, bootstrapAdmin bool) (*model.User, error) {
	if !bootstrapAdmin || user.EffectiveRole() == types.UserRoleAdministrator {
		return user, nil
	}
	user.Role = types.UserRoleAdministrator
	model.StampUpdateFromCtx(ctx, user)
	if err := u.db.WithContext(ctx).Save(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func dashboardUsername(sub, email string) string {
	if email != "" {
		at := strings.Index(email, "@")
		if at > 0 {
			return strings.ToLower(email[:at])
		}
		return strings.ToLower(email)
	}
	if len(sub) > 64 {
		return "user-" + sub[:32]
	}
	return "user-" + sub
}

// CreateUser creates a new user with the specified username and optional role.
func (u *UserService) CreateUser(ctx context.Context, input *model.User) (*model.User, error) {
	tid := tenant.MustFromContext(ctx)
	role := types.NormalizeUserRole(input.Role)
	if role == types.UserRoleUser && input.Role == "" {
		role = types.UserRoleUser
	}
	user := model.User{
		TenantID: tid,
		Username: input.Username,
		Role:     role,
		Email:    strings.TrimSpace(input.Email),
		OIDCSub:  strings.TrimSpace(input.OIDCSub),
	}
	if input.AccessToken == "" {
		token, err := internal.GenerateAccessToken()
		if err != nil {
			return nil, err
		}
		user.AccessToken = token
	} else {
		if err := internal.ValidateAccessToken(input.AccessToken); err != nil {
			return nil, fmt.Errorf("invalid access token: %v: %w", err, apierrors.ErrInvalidInput)
		}
		user.AccessToken = input.AccessToken
	}
	if err := u.db.WithContext(ctx).Create(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}
	return &user, nil
}

func (u *UserService) UpdateRole(ctx context.Context, userID uint, role types.UserRole) (*model.User, error) {
	user, err := u.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	oldRole := user.Role
	user.Role = types.NormalizeUserRole(role)
	if err := u.db.WithContext(ctx).Save(user).Error; err != nil {
		return nil, err
	}
	if u.dispatcher != nil && user.Email != "" && oldRole != user.Role {
		u.dispatcher.UserRoleUpdated(ctx, user.Email, user.Username, user.TenantID, string(oldRole), string(user.Role), auditctx.ActorFrom(ctx))
	}
	return user, nil
}

// UpdateUser updates an existing user's access token.
func (u *UserService) UpdateUser(ctx context.Context, input *model.User) (*model.User, error) {
	var user model.User
	err := u.dbTenant(ctx).Where("username = ?", input.Username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user with username %s not found: %w", input.Username, apierrors.ErrNotFound)
		}
		return nil, fmt.Errorf("failed to find user: %w", err)
	}
	if input.AccessToken == "" {
		return nil, fmt.Errorf("access token cannot be empty: %w", apierrors.ErrInvalidInput)
	}
	if err := internal.ValidateAccessToken(input.AccessToken); err != nil {
		return nil, fmt.Errorf("invalid access token: %v: %w", err, apierrors.ErrInvalidInput)
	}
	user.AccessToken = input.AccessToken
	if err := u.db.WithContext(ctx).Save(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to update user: %w", err)
	}
	return &user, nil
}

// ListUsers retrieves all users from the database.
func (u *UserService) ListUsers(ctx context.Context) ([]model.User, error) {
	var users []model.User
	if err := u.dbTenant(ctx).Order("username ASC").Find(&users).Error; err != nil {
		return nil, fmt.Errorf("failed to list users: %w", err)
	}
	return users, nil
}

// DeleteUser removes a user with the specified username from the database.
func (u *UserService) DeleteUser(ctx context.Context, username string) error {
	var user model.User
	err := u.dbTenant(ctx).Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fmt.Errorf("user with username %s not found: %w", username, apierrors.ErrNotFound)
		}
		return fmt.Errorf("failed to find user: %w", err)
	}
	if user.EffectiveRole() == types.UserRoleAdministrator {
		return fmt.Errorf("cannot delete an administrator user: %w", apierrors.ErrInvalidInput)
	}
	return u.dbTenant(ctx).Unscoped().Where("username = ?", username).Delete(&model.User{}).Error
}
