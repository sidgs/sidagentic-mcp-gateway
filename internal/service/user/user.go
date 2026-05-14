// Package user provides user service functionality for the MCPJungle application.
package user

import (
	"context"
	"errors"
	"fmt"

	"github.com/mcpjungle/mcpjungle/internal"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/apierrors"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"gorm.io/gorm"
)

// UserService provides methods to manage users in the MCPJungle system.
type UserService struct {
	db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{db: db}
}

// CreateAdminUser creates an admin user in the MCPJungle system.
func (u *UserService) CreateAdminUser(ctx context.Context) (*model.User, error) {
	tid := tenant.MustFromContext(ctx)
	token, err := internal.GenerateAccessToken()
	if err != nil {
		return nil, err
	}
	user := model.User{
		TenantID:    tid,
		Username:    "admin",
		Role:        types.UserRoleAdmin,
		AccessToken: token,
	}
	if err := u.db.WithContext(ctx).Create(&user).Error; err != nil {
		return nil, fmt.Errorf("failed to create admin user: %w", err)
	}
	return &user, nil
}

// GetUserByAccessToken returns a user associated with the provided access token.
// If no user is found, an error is returned.
func (u *UserService) GetUserByAccessToken(ctx context.Context, token string) (*model.User, error) {
	tid := tenant.MustFromContext(ctx)
	var user model.User
	if err := u.db.WithContext(ctx).Where("tenant_id = ? AND access_token = ?", tid, token).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user not found: %w", apierrors.ErrNotFound)
		}
		return nil, fmt.Errorf("failed to verify token: %w", err)
	}
	return &user, nil
}

// CreateUser creates a new user with the specified username.
// This method currently only supports creating a standard user, ie, user with the "user" role.
func (u *UserService) CreateUser(ctx context.Context, input *model.User) (*model.User, error) {
	tid := tenant.MustFromContext(ctx)
	user := model.User{
		TenantID: tid,
		Username: input.Username,
		Role:     types.UserRoleUser,
	}
	if input.AccessToken == "" {
		// no custom access token provided, generate a new one
		token, err := internal.GenerateAccessToken()
		if err != nil {
			return nil, err
		}
		user.AccessToken = token
	} else {
		// validate the user-provided custom access token
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

// UpdateUser updates an existing user's information based on the provided input.
// Currently it only supports updating the user's access token.
func (u *UserService) UpdateUser(ctx context.Context, input *model.User) (*model.User, error) {
	tid := tenant.MustFromContext(ctx)
	var user model.User
	err := u.db.WithContext(ctx).Where("tenant_id = ? AND username = ?", tid, input.Username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user with username %s not found: %w", input.Username, apierrors.ErrNotFound)
		}
		return nil, fmt.Errorf("failed to find user: %w", err)
	}

	if input.AccessToken == "" {
		return nil, fmt.Errorf("access token cannot be empty: %w", apierrors.ErrInvalidInput)
	}
	// validate the user-provided custom access token
	if err := internal.ValidateAccessToken(input.AccessToken); err != nil {
		return nil, fmt.Errorf("invalid access token: %v: %w", err, apierrors.ErrInvalidInput)
	}
	user.AccessToken = input.AccessToken

	err = u.db.WithContext(ctx).Save(&user).Error
	if err != nil {
		return nil, fmt.Errorf("failed to update user: %w", err)
	}
	return &user, nil
}

// ListUsers retrieves all users from the database.
func (u *UserService) ListUsers(ctx context.Context) ([]model.User, error) {
	tid := tenant.MustFromContext(ctx)
	var users []model.User
	if err := u.db.WithContext(ctx).Where("tenant_id = ?", tid).Find(&users).Error; err != nil {
		return nil, fmt.Errorf("failed to list users: %w", err)
	}
	return users, nil
}

// DeleteUser removes a user with the specified username from the database.
// If a user's role is admin, the deletion will be rejected.
func (u *UserService) DeleteUser(ctx context.Context, username string) error {
	tid := tenant.MustFromContext(ctx)
	var user model.User
	err := u.db.WithContext(ctx).Where("tenant_id = ? AND username = ?", tid, username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fmt.Errorf("user with username %s not found: %w", username, apierrors.ErrNotFound)
		}
		return fmt.Errorf("failed to find user: %w", err)
	}

	if user.Role == types.UserRoleAdmin {
		return fmt.Errorf("cannot delete an admin user: %w", apierrors.ErrInvalidInput)
	}

	err = u.db.WithContext(ctx).Unscoped().Where("tenant_id = ? AND username = ?", tid, username).Delete(&model.User{}).Error
	if err != nil {
		return fmt.Errorf("failed to delete user: %w", err)
	}
	return nil
}
