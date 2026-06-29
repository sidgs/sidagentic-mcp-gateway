package user

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/notifications"
	"sami.io/mcpgateway/pkg/auditctx"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type captureNotifier struct {
	last notifications.EmailNotification
	n    int
}

func (c *captureNotifier) Notify(_ context.Context, msg notifications.EmailNotification) {
	c.last = msg
	c.n++
}

func (c *captureNotifier) Close() {}

func TestUserServiceUpdateRoleNotifies(t *testing.T) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, db.AutoMigrate(&model.User{}))

	cap := &captureNotifier{}
	cfg := notifications.Config{Enabled: true, AppName: "test-app"}
	d, err := notifications.NewDispatcher(cfg, cap)
	require.NoError(t, err)

	svc := NewUserService(db)
	svc.SetNotificationDispatcher(d)

	ctx := tenant.WithContext(auditctx.WithActor(context.Background(), "admin@example.com"), "acme")
	user := model.User{
		TenantID:    "acme",
		Username:    "alice",
		Email:       "alice@example.com",
		Role:        types.UserRoleUser,
		AccessToken: "token-alice-123456789012345678901234567890",
	}
	require.NoError(t, db.Create(&user).Error)

	_, err = svc.UpdateRole(ctx, user.ID, types.UserRoleAdministrator)
	require.NoError(t, err)
	require.Equal(t, 1, cap.n)
	require.Equal(t, []string{"alice@example.com"}, cap.last.To)
	require.Contains(t, cap.last.Body, "administrator")
}
