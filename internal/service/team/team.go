package team

import (
	"context"
	"errors"
	"fmt"
	"strings"

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

func (s *Service) dbTenant(ctx context.Context) *gorm.DB {
	return s.db.WithContext(ctx).Where("tenant_id = ?", tenant.MustFromContext(ctx))
}

func (s *Service) userInTenant(ctx context.Context, userID uint) (*model.User, error) {
	var user model.User
	if err := s.dbTenant(ctx).Where("id = ?", userID).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &user, nil
}

func (s *Service) CreateTeam(ctx context.Context, name string, teamType types.TeamType, createdByUserID uint) (*model.Team, error) {
	name = strings.TrimSpace(name)
	if name == "" {
		return nil, fmt.Errorf("team name is required: %w", apierrors.ErrInvalidInput)
	}
	if _, err := s.userInTenant(ctx, createdByUserID); err != nil {
		return nil, err
	}
	tid := tenant.MustFromContext(ctx)
	team := model.Team{
		TenantID:        tid,
		Name:            name,
		Type:            teamType,
		CreatedByUserID: createdByUserID,
	}
	model.StampCreateFromCtx(ctx, &team)
	if err := s.db.WithContext(ctx).Create(&team).Error; err != nil {
		return nil, fmt.Errorf("create team: %w", err)
	}
	member := model.TeamMember{
		TenantID: team.TenantID,
		TeamID:   team.ID,
		UserID:   createdByUserID,
		Role:     types.TeamMemberRoleOwner,
	}
	model.StampCreateFromCtx(ctx, &member)
	if err := s.db.WithContext(ctx).Create(&member).Error; err != nil {
		return nil, fmt.Errorf("create team owner membership: %w", err)
	}
	return &team, nil
}

func (s *Service) GetTeam(ctx context.Context, id uint) (*model.Team, error) {
	var team model.Team
	if err := s.dbTenant(ctx).Where("id = ?", id).First(&team).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("team not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &team, nil
}

func (s *Service) ListTeams(ctx context.Context, teamType *types.TeamType) ([]model.Team, error) {
	q := s.dbTenant(ctx).Order("name ASC")
	if teamType != nil {
		q = q.Where("type = ?", *teamType)
	}
	var teams []model.Team
	if err := q.Find(&teams).Error; err != nil {
		return nil, err
	}
	return teams, nil
}

func (s *Service) DeleteTeam(ctx context.Context, id uint) error {
	res := s.dbTenant(ctx).Where("id = ?", id).Delete(&model.Team{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return fmt.Errorf("team not found: %w", apierrors.ErrNotFound)
	}
	if err := s.dbTenant(ctx).Where("team_id = ?", id).Delete(&model.TeamMember{}).Error; err != nil {
		return err
	}
	return s.dbTenant(ctx).Where("team_id = ?", id).Delete(&model.TeamResourceAssignment{}).Error
}

func (s *Service) ListMembers(ctx context.Context, teamID uint) ([]model.TeamMember, error) {
	if _, err := s.GetTeam(ctx, teamID); err != nil {
		return nil, err
	}
	var members []model.TeamMember
	if err := s.dbTenant(ctx).Where("team_id = ?", teamID).Order("id ASC").Find(&members).Error; err != nil {
		return nil, err
	}
	return members, nil
}

func (s *Service) AddMember(ctx context.Context, teamID, userID uint, role types.TeamMemberRole) error {
	team, err := s.GetTeam(ctx, teamID)
	if err != nil {
		return err
	}
	if _, err := s.userInTenant(ctx, userID); err != nil {
		return err
	}
	if role == types.TeamMemberRoleOwner {
		return fmt.Errorf("cannot add another owner: %w", apierrors.ErrInvalidInput)
	}
	if role != types.TeamMemberRoleManager && role != types.TeamMemberRoleMember {
		return fmt.Errorf("invalid member role: %w", apierrors.ErrInvalidInput)
	}
	member := model.TeamMember{
		TenantID: team.TenantID,
		TeamID:   teamID,
		UserID:   userID,
		Role:     role,
	}
	if err := s.db.WithContext(ctx).Create(&member).Error; err != nil {
		return fmt.Errorf("add team member: %w", err)
	}
	if s.dispatcher != nil {
		if u, err := s.userInTenant(ctx, userID); err == nil && u.Email != "" {
			s.dispatcher.TeamMemberAdded(ctx, u.Email, u.Username, team.Name, team.TenantID, string(role), auditctx.ActorFrom(ctx))
		}
	}
	return nil
}

func (s *Service) RemoveMember(ctx context.Context, teamID, userID uint) error {
	team, err := s.GetTeam(ctx, teamID)
	if err != nil {
		return err
	}
	var member model.TeamMember
	if err := s.dbTenant(ctx).Where("team_id = ? AND user_id = ?", teamID, userID).First(&member).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return fmt.Errorf("member not found: %w", apierrors.ErrNotFound)
		}
		return err
	}
	if member.Role == types.TeamMemberRoleOwner {
		return fmt.Errorf("cannot remove team owner: %w", apierrors.ErrInvalidInput)
	}
	var removedUser *model.User
	if s.dispatcher != nil {
		removedUser, _ = s.userInTenant(ctx, userID)
	}
	if err := s.dbTenant(ctx).Where("team_id = ? AND user_id = ?", teamID, userID).Delete(&model.TeamMember{}).Error; err != nil {
		return err
	}
	if s.dispatcher != nil && removedUser != nil && removedUser.Email != "" {
		s.dispatcher.TeamMemberRemoved(ctx, removedUser.Email, removedUser.Username, team.Name, team.TenantID, auditctx.ActorFrom(ctx))
	}
	return nil
}

func (s *Service) ListMembershipsForUser(ctx context.Context, userID uint) ([]model.TeamMember, error) {
	var members []model.TeamMember
	if err := s.dbTenant(ctx).Where("user_id = ?", userID).Find(&members).Error; err != nil {
		return nil, err
	}
	return members, nil
}

func (s *Service) SetAssignments(ctx context.Context, teamID uint, teamType types.TeamType, assignments []types.TeamAssignmentRequest) error {
	team, err := s.GetTeam(ctx, teamID)
	if err != nil {
		return err
	}
	if team.Type != teamType {
		return fmt.Errorf("team type mismatch: %w", apierrors.ErrInvalidInput)
	}
	for _, a := range assignments {
		rt := types.TeamResourceType(strings.TrimSpace(a.ResourceType))
		if !types.ResourceTypeAllowedForTeamType(teamType, rt) {
			return fmt.Errorf("resource type %s not allowed for team type %s: %w", rt, teamType, apierrors.ErrInvalidInput)
		}
	}
	if err := s.dbTenant(ctx).Where("team_id = ?", teamID).Delete(&model.TeamResourceAssignment{}).Error; err != nil {
		return err
	}
	for _, a := range assignments {
		name := strings.TrimSpace(a.ResourceName)
		if name == "" {
			continue
		}
		row := model.TeamResourceAssignment{
			TenantID:     team.TenantID,
			TeamID:       teamID,
			ResourceType: types.TeamResourceType(strings.TrimSpace(a.ResourceType)),
			ResourceName: name,
		}
		if err := s.db.WithContext(ctx).Create(&row).Error; err != nil {
			return fmt.Errorf("assign resource: %w", err)
		}
	}
	return nil
}

func (s *Service) ListAssignmentsForTeam(ctx context.Context, teamID uint) ([]model.TeamResourceAssignment, error) {
	if _, err := s.GetTeam(ctx, teamID); err != nil {
		return nil, err
	}
	var rows []model.TeamResourceAssignment
	if err := s.dbTenant(ctx).Where("team_id = ?", teamID).Find(&rows).Error; err != nil {
		return nil, err
	}
	return rows, nil
}

func (s *Service) TeamIDsForResource(ctx context.Context, resourceType types.TeamResourceType, resourceName string, teamType types.TeamType) ([]uint, error) {
	tid := tenant.MustFromContext(ctx)
	var rows []model.TeamResourceAssignment
	if err := s.db.WithContext(ctx).
		Model(&model.TeamResourceAssignment{}).
		Where("team_resource_assignments.tenant_id = ?", tid).
		Joins("JOIN teams ON teams.id = team_resource_assignments.team_id AND teams.tenant_id = team_resource_assignments.tenant_id").
		Where("team_resource_assignments.resource_type = ? AND team_resource_assignments.resource_name = ? AND teams.type = ?",
			resourceType, resourceName, teamType).
		Find(&rows).Error; err != nil {
		return nil, err
	}
	ids := make([]uint, 0, len(rows))
	for _, r := range rows {
		ids = append(ids, r.TeamID)
	}
	return ids, nil
}

func (s *Service) AssignResourceToTeams(ctx context.Context, resourceType types.TeamResourceType, resourceName string, teamIDs []uint) error {
	if len(teamIDs) == 0 {
		return s.dbTenant(ctx).
			Where("resource_type = ? AND resource_name = ?", resourceType, resourceName).
			Delete(&model.TeamResourceAssignment{}).Error
	}
	var teams []model.Team
	if err := s.dbTenant(ctx).Where("id IN ?", teamIDs).Find(&teams).Error; err != nil {
		return err
	}
	if len(teams) != len(teamIDs) {
		return fmt.Errorf("one or more teams not found: %w", apierrors.ErrInvalidInput)
	}
	expectedType, ok := teamTypeForResource(resourceType)
	if !ok {
		return fmt.Errorf("unsupported resource type: %w", apierrors.ErrInvalidInput)
	}
	for _, t := range teams {
		if t.Type != expectedType {
			return fmt.Errorf("team %s type mismatch for resource %s: %w", t.Name, resourceType, apierrors.ErrInvalidInput)
		}
	}
	if err := s.dbTenant(ctx).
		Where("resource_type = ? AND resource_name = ?", resourceType, resourceName).
		Delete(&model.TeamResourceAssignment{}).Error; err != nil {
		return err
	}
	for _, t := range teams {
		row := model.TeamResourceAssignment{
			TenantID:     t.TenantID,
			TeamID:       t.ID,
			ResourceType: resourceType,
			ResourceName: resourceName,
		}
		if err := s.db.WithContext(ctx).Create(&row).Error; err != nil {
			return err
		}
	}
	return nil
}

func teamTypeForResource(resourceType types.TeamResourceType) (types.TeamType, bool) {
	switch resourceType {
	case types.TeamResourceServer, types.TeamResourceSkill:
		return "", false // ambiguous — caller must specify provider vs user teams separately
	case types.TeamResourceToolGroup, types.TeamResourcePromptGroup, types.TeamResourceSkillSet:
		return types.TeamTypeUser, true
	case types.TeamResourceAgentApp:
		return types.TeamTypeAgent, true
	default:
		return "", false
	}
}

func (s *Service) AssignResourceToTeamsOfType(ctx context.Context, resourceType types.TeamResourceType, resourceName string, teamType types.TeamType, teamIDs []uint) error {
	teamsByID := make(map[uint]model.Team, len(teamIDs))
	for _, id := range teamIDs {
		if id == 0 {
			continue
		}
		team, err := s.GetTeam(ctx, id)
		if err != nil {
			return err
		}
		if team.Type != teamType {
			return fmt.Errorf("team type mismatch: %w", apierrors.ErrInvalidInput)
		}
		if !types.ResourceTypeAllowedForTeamType(teamType, resourceType) {
			return fmt.Errorf("resource not allowed for team type: %w", apierrors.ErrInvalidInput)
		}
		teamsByID[id] = *team
	}
	if err := s.dbTenant(ctx).
		Where(`resource_type = ? AND resource_name = ? AND team_id IN (
			SELECT id FROM teams WHERE tenant_id = ? AND type = ?
		)`, resourceType, resourceName, tenant.MustFromContext(ctx), teamType).
		Delete(&model.TeamResourceAssignment{}).Error; err != nil {
		return err
	}
	if len(teamIDs) == 0 {
		return nil
	}
	for _, teamID := range teamIDs {
		if teamID == 0 {
			continue
		}
		team := teamsByID[teamID]
		row := model.TeamResourceAssignment{
			TenantID:     team.TenantID,
			TeamID:       teamID,
			ResourceType: resourceType,
			ResourceName: resourceName,
		}
		if err := s.db.WithContext(ctx).Create(&row).Error; err != nil {
			return err
		}
	}
	return nil
}

func (s *Service) AgentTeamIDsForApp(ctx context.Context, appID uint) ([]uint, error) {
	name := fmt.Sprintf("%d", appID)
	return s.TeamIDsForResource(ctx, types.TeamResourceAgentApp, name, types.TeamTypeAgent)
}

func (s *Service) ProviderTeamIDsForResource(ctx context.Context, resourceType types.TeamResourceType, resourceName string) ([]uint, error) {
	return s.TeamIDsForResource(ctx, resourceType, resourceName, types.TeamTypeProvider)
}

func (s *Service) UserTeamIDsForResource(ctx context.Context, resourceType types.TeamResourceType, resourceName string) ([]uint, error) {
	return s.TeamIDsForResource(ctx, resourceType, resourceName, types.TeamTypeUser)
}

func (s *Service) ListVisibleAgentAppIDs(ctx context.Context, principalUserID uint, ownerScopeKey string, agentTeamIDs []uint) ([]uint, error) {
	var owned []model.AgentApp
	if err := s.dbTenant(ctx).Where("owner_scope_key = ?", ownerScopeKey).Find(&owned).Error; err != nil {
		return nil, err
	}
	seen := map[uint]struct{}{}
	var ids []uint
	for _, app := range owned {
		if _, ok := seen[app.ID]; !ok {
			seen[app.ID] = struct{}{}
			ids = append(ids, app.ID)
		}
	}
	if len(agentTeamIDs) == 0 {
		return ids, nil
	}
	var rows []model.TeamResourceAssignment
	if err := s.dbTenant(ctx).
		Where("resource_type = ? AND team_id IN ?", types.TeamResourceAgentApp, agentTeamIDs).
		Find(&rows).Error; err != nil {
		return nil, err
	}
	for _, row := range rows {
		var appID uint
		if _, err := fmt.Sscanf(row.ResourceName, "%d", &appID); err != nil || appID == 0 {
			continue
		}
		if _, ok := seen[appID]; !ok {
			seen[appID] = struct{}{}
			ids = append(ids, appID)
		}
	}
	_ = principalUserID
	return ids, nil
}

func (s *Service) SetAgentAppTeams(ctx context.Context, appID uint, teamIDs []uint) error {
	return s.AssignResourceToTeamsOfType(ctx, types.TeamResourceAgentApp, fmt.Sprintf("%d", appID), types.TeamTypeAgent, teamIDs)
}
