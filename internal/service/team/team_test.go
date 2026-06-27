package team_test

import (
	"context"
	"testing"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/internal/service/team"
	"sami.io/mcpgateway/internal/service/user"
	"sami.io/mcpgateway/pkg/tenant"
	"sami.io/mcpgateway/pkg/types"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupTeamTest(t *testing.T) (*gorm.DB, context.Context) {
	t.Helper()
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	require.NoError(t, db.AutoMigrate(&model.User{}, &model.Team{}, &model.TeamMember{}, &model.TeamResourceAssignment{}))
	ctx := tenant.WithContext(context.Background(), tenant.DefaultID)
	return db, ctx
}

func TestCreateAgentTeamAndAssignApp(t *testing.T) {
	db, ctx := setupTeamTest(t)
	usrSvc := user.NewUserService(db)
	teamSvc := team.NewService(db)

	owner, err := usrSvc.CreateUser(ctx, &model.User{Username: "owner"})
	require.NoError(t, err)

	created, err := teamSvc.CreateTeam(ctx, "apps", types.TeamTypeAgent, owner.ID)
	require.NoError(t, err)
	require.Equal(t, types.TeamTypeAgent, created.Type)

	require.NoError(t, teamSvc.SetAgentAppTeams(ctx, 42, []uint{created.ID}))
	ids, err := teamSvc.AgentTeamIDsForApp(ctx, 42)
	require.NoError(t, err)
	require.Equal(t, []uint{created.ID}, ids)
}

func TestIsTeamMemberRole(t *testing.T) {
	require.True(t, model.IsTeamMemberRole(types.TeamMemberRoleOwner))
	require.True(t, model.IsTeamMemberRole(types.TeamMemberRoleManager))
	require.True(t, model.IsTeamMemberRole(types.TeamMemberRoleMember))
	require.True(t, model.CanManageTeamMembers(types.TeamMemberRoleManager))
}

func TestTeamsAreTenantScoped(t *testing.T) {
	db, ctx := setupTeamTest(t)
	usrSvc := user.NewUserService(db)
	teamSvc := team.NewService(db)

	owner, err := usrSvc.CreateUser(ctx, &model.User{Username: "owner"})
	require.NoError(t, err)

	created, err := teamSvc.CreateTeam(ctx, "sami-team", types.TeamTypeAgent, owner.ID)
	require.NoError(t, err)
	require.Equal(t, tenant.DefaultID, created.TenantID)

	ctxOther := tenant.WithContext(context.Background(), "other-tenant")
	otherOwner, err := usrSvc.CreateUser(ctxOther, &model.User{Username: "other-owner"})
	require.NoError(t, err)
	otherTeam, err := teamSvc.CreateTeam(ctxOther, "other-team", types.TeamTypeAgent, otherOwner.ID)
	require.NoError(t, err)
	require.Equal(t, "other-tenant", otherTeam.TenantID)

	_, err = teamSvc.GetTeam(ctx, otherTeam.ID)
	require.Error(t, err)

	teams, err := teamSvc.ListTeams(ctx, nil)
	require.NoError(t, err)
	require.Len(t, teams, 1)
	require.Equal(t, created.ID, teams[0].ID)

	err = teamSvc.AddMember(ctx, created.ID, otherOwner.ID, types.TeamMemberRoleMember)
	require.Error(t, err)

	err = teamSvc.SetAgentAppTeams(ctxOther, 99, []uint{created.ID})
	require.Error(t, err)
}
