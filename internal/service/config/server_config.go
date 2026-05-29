// Package config provides configuration service functionality for the SAMI MCP Gateway application.
package config

import (
	"context"
	"errors"
	"fmt"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/tenant"
	"gorm.io/gorm"
)

// ServerConfigService provides methods to manage server configuration in the database.
type ServerConfigService struct {
	db *gorm.DB
}

func NewServerConfigService(db *gorm.DB) *ServerConfigService {
	return &ServerConfigService{db: db}
}

// GetConfig retrieves the server configuration from the database.
// If no configuration exists, it returns a default uninitialized config.
func (s *ServerConfigService) GetConfig(ctx context.Context) (model.ServerConfig, error) {
	tid := tenant.MustFromContext(ctx)
	var config model.ServerConfig
	err := s.db.WithContext(ctx).Where("tenant_id = ?", tid).First(&config).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return model.ServerConfig{TenantID: tid, Initialized: false}, nil
	}
	if err != nil {
		return model.ServerConfig{}, fmt.Errorf("failed to fetch server configuration from db: %v", err)
	}
	return config, nil
}

// Init initializes the server configuration in the database.
// It is an idempotent operation. It returns true if the config was created or
// updated from an uninitialized row. If the config is already initialized, it
// returns false and does nothing else.
func (s *ServerConfigService) Init(ctx context.Context, mode model.ServerMode) (bool, error) {
	tid := tenant.MustFromContext(ctx)
	config, err := s.GetConfig(ctx)
	if err != nil {
		return false, err
	}
	if config.Initialized {
		return false, nil
	}
	if config.ID == 0 {
		config = model.ServerConfig{
			TenantID:    tid,
			Mode:        mode,
			Initialized: true,
		}
		return true, s.db.WithContext(ctx).Create(&config).Error
	}
	config.Mode = mode
	config.Initialized = true
	return true, s.db.WithContext(ctx).Save(&config).Error
}
