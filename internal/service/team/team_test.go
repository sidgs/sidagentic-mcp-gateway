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
