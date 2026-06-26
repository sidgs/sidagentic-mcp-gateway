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

func insertSkillSetRow(t *testing.T, db *gorm.DB, name string) {
	t.Helper()
	g := &model.SkillSet{
		TenantID:       tenant.DefaultID,
		Name:           name,
		Description:    "skills",
		SecurityOption: types.GroupSecurityOpen,
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
	require.NoError(t, validateAgentAppGroupAttachment([]string{"a"}, nil, nil))
	require.NoError(t, validateAgentAppGroupAttachment([]string{"a"}, []string{}, []string{"s1", "s2"}))
	require.NoError(t, validateAgentAppGroupAttachment(nil, []string{"b"}, nil))
	require.NoError(t, validateAgentAppGroupAttachment(nil, []string{"b"}, []string{"s1"}))

	err := validateAgentAppGroupAttachment(nil, nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	err = validateAgentAppGroupAttachment(nil, nil, []string{"s1"})
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	err = validateAgentAppGroupAttachment([]string{"a"}, []string{"b"}, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	err = validateAgentAppGroupAttachment([]string{"a", "b"}, nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	err = validateAgentAppGroupAttachment([]string{}, []string{}, []string{})
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))
}

func TestServiceCreate_RequiresExactlyOneMCPGroup(t *testing.T) {
	db := setupAgentAppTestDB(t)
	svc := New(db, "test-signing-key-secret-min-length-ok")
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	insertToolGroupRow(t, db, "tg1")
	insertToolGroupRow(t, db, "tg2")
	insertPromptGroupRow(t, db, "pg1")
	insertSkillSetRow(t, db, "ss1")
	insertSkillSetRow(t, db, "ss2")

	_, _, err := svc.Create(ctx, "owner", "app0", "", nil, nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	_, _, err = svc.Create(ctx, "owner", "app0", "", nil, nil, []string{"ss1"})
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	_, _, err = svc.Create(ctx, "owner", "app0", "", []string{"tg1", "tg2"}, nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	_, _, err = svc.Create(ctx, "owner", "app0", "", []string{"tg1"}, []string{"pg1"}, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))

	app, _, err := svc.Create(ctx, "owner", "ok-tool", "", []string{"tg1"}, nil, nil)
	require.NoError(t, err)
	tg, err := app.GetToolGroups()
	require.NoError(t, err)
	require.Equal(t, []string{"tg1"}, tg)

	app2, _, err := svc.Create(ctx, "owner", "ok-prompt", "", nil, []string{"pg1"}, nil)
	require.NoError(t, err)
	pg2, err := app2.GetPromptGroups()
	require.NoError(t, err)
	require.Equal(t, []string{"pg1"}, pg2)

	app3, _, err := svc.Create(ctx, "owner", "ok-tool-and-sets", "", []string{"tg1"}, nil, []string{"ss1", "ss2"})
	require.NoError(t, err)
	ss, err := app3.GetSkillSets()
	require.NoError(t, err)
	require.Equal(t, []string{"ss1", "ss2"}, ss)
	tg3, err := app3.GetToolGroups()
	require.NoError(t, err)
	require.Equal(t, []string{"tg1"}, tg3)
}

func TestServiceUpdatePatch_MutualExclusionAndValidateOnSave(t *testing.T) {
	db := setupAgentAppTestDB(t)
	svc := New(db, "test-signing-key-secret-min-length-ok")
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	insertToolGroupRow(t, db, "tg1")
	insertToolGroupRow(t, db, "tg2")
	insertPromptGroupRow(t, db, "pg1")
	insertSkillSetRow(t, db, "ss1")
	insertSkillSetRow(t, db, "ss2")

	app, _, err := svc.Create(ctx, "owner", "app", "", []string{"tg1"}, nil, []string{"ss1"})
	require.NoError(t, err)

	tg2 := []string{"tg2"}
	pgEmpty := []string{}
	_, err = svc.UpdatePatch(ctx, app.ID, "owner", nil, nil, nil, &tg2, &pgEmpty, nil)
	require.NoError(t, err)
	refreshed, err := svc.GetOwned(ctx, app.ID, "owner")
	require.NoError(t, err)
	ss, err := refreshed.GetSkillSets()
	require.NoError(t, err)
	require.Equal(t, []string{"ss1"}, ss)

	pg1 := []string{"pg1"}
	toolsEmpty := []string{}
	_, err = svc.UpdatePatch(ctx, app.ID, "owner", nil, nil, nil, &toolsEmpty, &pg1, nil)
	require.NoError(t, err)

	multiSS := []string{"ss1", "ss2"}
	_, err = svc.UpdatePatch(ctx, app.ID, "owner", nil, nil, nil, nil, nil, &multiSS)
	require.NoError(t, err)
	refreshed, err = svc.GetOwned(ctx, app.ID, "owner")
	require.NoError(t, err)
	ss, err = refreshed.GetSkillSets()
	require.NoError(t, err)
	require.Equal(t, []string{"ss1", "ss2"}, ss)

	newName := "renamed"
	_, err = svc.UpdatePatch(ctx, app.ID, "owner", &newName, nil, nil, nil, nil, nil)
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
		SecretHash:       "$2a$10$abcdefghijklmnopqrstuv",
		Status:           model.AgentAppStatusEnabled,
		ToolGroupNames:   mustJSONSlice(t, nil),
		PromptGroupNames: mustJSONSlice(t, nil),
		SkillSetNames:    mustJSONSlice(t, nil),
	}
	require.NoError(t, db.Create(app).Error)

	newName := "still-broken"
	_, err := svc.UpdatePatch(ctx, app.ID, "owner", &newName, nil, nil, nil, nil, nil)
	require.Error(t, err)
	require.True(t, errors.Is(err, apierrors.ErrInvalidInput))
}
