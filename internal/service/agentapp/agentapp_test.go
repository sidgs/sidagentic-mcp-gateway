package agentapp

import (
	"context"
	"encoding/json"
	"errors"
	"testing"

	"sami.io/mcpgateway/internal/migrations"
	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/apierrors"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/testhelpers"
	"sami.io/mcpgateway/pkg/types"
	"github.com/stretchr/testify/require"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

func mustJSONSlice(t *testing.T, s []string) datatypes.JSON {
	t.Helper()
	b, err := json.Marshal(s)
	require.NoError(t, err)
	return datatypes.JSON(b)
}

func insertToolGroupRow(t *testing.T, db *gorm.DB, name string) {
	t.Helper()
	g := &model.ToolGroup{
		TenantID:       tenant.DefaultID,
		Name:           name,
		Description:    "t",
		SecurityOption: types.GroupSecurityOpen,
		IncludedTools:  mustJSONSlice(t, []string{"srv__noop"}),
		IncludedServers:  mustJSONSlice(t, nil),
		ExcludedTools:    mustJSONSlice(t, nil),
	}
	require.NoError(t, db.Create(g).Error)
}

func insertPromptGroupRow(t *testing.T, db *gorm.DB, name string) {
	t.Helper()
	g := &model.PromptGroup{
		TenantID:        tenant.DefaultID,
		Name:            name,
		Description:     "p",
		SecurityOption:  types.GroupSecurityOpen,
		IncludedPrompts: mustJSONSlice(t, []string{"srv__noop"}),
		IncludedServers: mustJSONSlice(t, nil),
		ExcludedPrompts: mustJSONSlice(t, nil),
	}
	require.NoError(t, db.Create(g).Error)
}

func setupAgentAppTestDB(t *testing.T) *gorm.DB {
	t.Helper()
	setup := testhelpers.SetupTestDB(t)
	db := setup.DB
	require.NoError(t, migrations.Migrate(db))
	return db
}

func TestValidateAgentAppGroupAttachment(t *testing.T) {
	require.NoError(t, validateAgentAppGroupAttachment([]string{"a"}, nil))
	require.NoError(t, validateAgentAppGroupAttachment([]string{"a"}, []string{}))
	require.NoError(t, validateAgentAppGroupAttachment(nil, []string{"b"}))
	require.NoError(t, validateAgentAppGroupAttachment([]string{}, []string{"b"}))

	err := validateAgentAppGroupAttachment(nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	err = validateAgentAppGroupAttachment([]string{"a"}, []string{"b"})
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	err = validateAgentAppGroupAttachment([]string{"a", "b"}, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	err = validateAgentAppGroupAttachment([]string{}, []string{})
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))
}

func TestServiceCreate_RequiresExactlyOneGroup(t *testing.T) {
	db := setupAgentAppTestDB(t)
	svc := New(db, "test-signing-key-secret-min-length-ok")
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	insertToolGroupRow(t, db, "tg1")
	insertToolGroupRow(t, db, "tg2")
	insertPromptGroupRow(t, db, "pg1")

	_, _, err := svc.Create(ctx, "owner", "app0", "", nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	_, _, err = svc.Create(ctx, "owner", "app0", "", []string{"tg1", "tg2"}, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	_, _, err = svc.Create(ctx, "owner", "app0", "", []string{"tg1"}, []string{"pg1"})
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	app, _, err := svc.Create(ctx, "owner", "ok-tool", "", []string{"tg1"}, nil)
	require.NoError(t, err)
	tg, err := app.GetToolGroups()
	require.NoError(t, err)
	require.Equal(t, []string{"tg1"}, tg)
	pg, err := app.GetPromptGroups()
	require.NoError(t, err)
	require.Empty(t, pg)

	app2, _, err := svc.Create(ctx, "owner", "ok-prompt", "", nil, []string{"pg1"})
	require.NoError(t, err)
	pg2, err := app2.GetPromptGroups()
	require.NoError(t, err)
	require.Equal(t, []string{"pg1"}, pg2)
}

func TestServiceUpdatePatch_MutualExclusionAndValidateOnSave(t *testing.T) {
	db := setupAgentAppTestDB(t)
	svc := New(db, "test-signing-key-secret-min-length-ok")
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	insertToolGroupRow(t, db, "tg1")
	insertToolGroupRow(t, db, "tg2")
	insertPromptGroupRow(t, db, "pg1")

	app, _, err := svc.Create(ctx, "owner", "app", "", []string{"tg1"}, nil)
	require.NoError(t, err)

	tg2 := []string{"tg2"}
	pgEmpty := []string{}
	_, err = svc.UpdatePatch(ctx, app.ID, "owner", nil, nil, nil, &tg2, &pgEmpty)
	require.NoError(t, err)
	refreshed, err := svc.GetOwned(ctx, app.ID, "owner")
	require.NoError(t, err)
	tgn, err := refreshed.GetToolGroups()
	require.NoError(t, err)
	require.Equal(t, []string{"tg2"}, tgn)

	pg1 := []string{"pg1"}
	toolsEmpty := []string{}
	_, err = svc.UpdatePatch(ctx, app.ID, "owner", nil, nil, nil, &toolsEmpty, &pg1)
	require.NoError(t, err)
	refreshed, err = svc.GetOwned(ctx, app.ID, "owner")
	require.NoError(t, err)
	pgn, err := refreshed.GetPromptGroups()
	require.NoError(t, err)
	require.Equal(t, []string{"pg1"}, pgn)
	tgn, err = refreshed.GetToolGroups()
	require.NoError(t, err)
	require.Empty(t, tgn)

	// Name-only patch on valid app should succeed.
	newName := "renamed"
	_, err = svc.UpdatePatch(ctx, app.ID, "owner", &newName, nil, nil, nil, nil)
	require.NoError(t, err)
}

func TestServiceUpdatePatch_InvalidLegacyBlocksSave(t *testing.T) {
	db := setupAgentAppTestDB(t)
	svc := New(db, "test-signing-key-secret-min-length-ok")
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	insertToolGroupRow(t, db, "tg1")

	app := &model.AgentApp{
		TenantID:         tenant.DefaultID,
		OwnerScopeKey:    "owner",
		Name:             "broken",
		ClientID:         "c1",
		SecretHash:       "$2a$10$abcdefghijklmnopqrstuv", // fake bcrypt-shaped
		Status:           model.AgentAppStatusEnabled,
		ToolGroupNames:   mustJSONSlice(t, nil),
		PromptGroupNames: mustJSONSlice(t, nil),
	}
	require.NoError(t, db.Create(app).Error)

	newName := "still-broken"
	_, err := svc.UpdatePatch(ctx, app.ID, "owner", &newName, nil, nil, nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))
}
