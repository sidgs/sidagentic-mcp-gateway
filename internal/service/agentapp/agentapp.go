// Package agentapp manages tenant agent-apps (portal credentials for group-scoped MCP).
package agentapp

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/mcpjungle/mcpjungle/internal"
	"github.com/mcpjungle/mcpjungle/internal/agentappauth"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"github.com/mcpjungle/mcpjungle/pkg/apierrors"
	"github.com/mcpjungle/mcpjungle/pkg/tenant"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

const jwtIssuer = "mcp-gateway-agent-app"

// DefaultAccessTokenTTL is the lifetime for minted Bearer JWTs.
const DefaultAccessTokenTTL = time.Hour

// bearerClaims are signed JWT claims for agent-app MCP access.
type bearerClaims struct {
	AgentAppID int64  `json:"aid"`
	TenantID   string `json:"tid"`
	jwt.RegisteredClaims
}

// Service persists agent-apps and mints agent-app Bearer tokens.
type Service struct {
	db        *gorm.DB
	jwtSecret []byte
}

// New creates an agent-app service. jwtSigningKey must be non-empty for token mint and Bearer JWT validation.
func New(db *gorm.DB, jwtSigningKey string) *Service {
	key := strings.TrimSpace(jwtSigningKey)
	var secret []byte
	if key != "" {
		secret = []byte(key)
	}
	return &Service{db: db, jwtSecret: secret}
}

func (s *Service) jwtEnabled() bool {
	return len(s.jwtSecret) > 0
}

// JWTConfigured reports whether AGENT_APP_JWT_SIGNING_KEY was set (Bearer JWT mint/validation).
func (s *Service) JWTConfigured() bool {
	return s.jwtEnabled()
}

func (s *Service) dbTenant(ctx context.Context) *gorm.DB {
	return s.db.WithContext(ctx).Where("tenant_id = ?", tenant.MustFromContext(ctx))
}

// GenerateCredentials produces a new client_id and plaintext client_secret.
func GenerateCredentials() (clientID, secretPlain string, err error) {
	clientID, err = internal.GenerateAccessToken()
	if err != nil {
		return "", "", err
	}
	secretPlain, err = internal.GenerateAccessToken()
	if err != nil {
		return "", "", err
	}
	secretPlain = secretPlain + "_" + clientID[:8]
	return clientID, secretPlain, nil
}

func hashSecret(plain string) (string, error) {
	h, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(h), nil
}

func checkSecret(hash, plain string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(plain)) == nil
}

func marshalNames(names []string) (datatypes.JSON, error) {
	if names == nil {
		names = []string{}
	}
	b, err := json.Marshal(names)
	if err != nil {
		return nil, err
	}
	return b, nil
}

// normalizeGroupNames trims entries, drops blanks, and removes duplicates (first occurrence wins).
func normalizeGroupNames(names []string) []string {
	if len(names) == 0 {
		return []string{}
	}
	seen := make(map[string]struct{}, len(names))
	out := make([]string, 0, len(names))
	for _, raw := range names {
		n := strings.TrimSpace(raw)
		if n == "" {
			continue
		}
		if _, ok := seen[n]; ok {
			continue
		}
		seen[n] = struct{}{}
		out = append(out, n)
	}
	return out
}

func validateAgentAppGroupAttachment(toolGroups, promptGroups []string) error {
	nt := normalizeGroupNames(toolGroups)
	np := normalizeGroupNames(promptGroups)
	if len(nt) > 1 {
		return fmt.Errorf("agent app may reference at most one tool group: %w", apierrors.ErrInvalidInput)
	}
	if len(np) > 1 {
		return fmt.Errorf("agent app may reference at most one prompt group: %w", apierrors.ErrInvalidInput)
	}
	switch {
	case len(nt) == 1 && len(np) == 0:
		return nil
	case len(nt) == 0 && len(np) == 1:
		return nil
	default:
		return fmt.Errorf(
			"agent app must reference exactly one tool group or exactly one prompt group: %w",
			apierrors.ErrInvalidInput,
		)
	}
}

func (s *Service) validateAttachedGroups(ctx context.Context, toolGroups, promptGroups []string) error {
	tid := tenant.MustFromContext(ctx)
	for _, n := range toolGroups {
		n = strings.TrimSpace(n)
		if n == "" {
			return fmt.Errorf("empty tool group name: %w", apierrors.ErrInvalidInput)
		}
		var count int64
		if err := s.db.WithContext(ctx).Model(&model.ToolGroup{}).Where("tenant_id = ? AND name = ?", tid, n).Count(&count).Error; err != nil {
			return err
		}
		if count == 0 {
			return fmt.Errorf("tool group %q does not exist: %w", n, apierrors.ErrInvalidInput)
		}
	}
	for _, n := range promptGroups {
		n = strings.TrimSpace(n)
		if n == "" {
			return fmt.Errorf("empty prompt group name: %w", apierrors.ErrInvalidInput)
		}
		var count int64
		if err := s.db.WithContext(ctx).Model(&model.PromptGroup{}).Where("tenant_id = ? AND name = ?", tid, n).Count(&count).Error; err != nil {
			return err
		}
		if count == 0 {
			return fmt.Errorf("prompt group %q does not exist: %w", n, apierrors.ErrInvalidInput)
		}
	}
	return nil
}

// Create persists a new agent-app and returns the plaintext secret once.
func (s *Service) Create(ctx context.Context, ownerScopeKey, name, description string, toolGroups, promptGroups []string) (*model.AgentApp, string, error) {
	name = strings.TrimSpace(name)
	if name == "" {
		return nil, "", fmt.Errorf("name is required: %w", apierrors.ErrInvalidInput)
	}
	ownerScopeKey = strings.TrimSpace(ownerScopeKey)
	if ownerScopeKey == "" {
		return nil, "", fmt.Errorf("owner scope is required: %w", apierrors.ErrInvalidInput)
	}
	toolGroups = normalizeGroupNames(toolGroups)
	promptGroups = normalizeGroupNames(promptGroups)
	if err := validateAgentAppGroupAttachment(toolGroups, promptGroups); err != nil {
		return nil, "", err
	}
	if err := s.validateAttachedGroups(ctx, toolGroups, promptGroups); err != nil {
		return nil, "", err
	}
	clientID, secretPlain, err := GenerateCredentials()
	if err != nil {
		return nil, "", err
	}
	hash, err := hashSecret(secretPlain)
	if err != nil {
		return nil, "", err
	}
	tgJSON, err := marshalNames(toolGroups)
	if err != nil {
		return nil, "", err
	}
	pgJSON, err := marshalNames(promptGroups)
	if err != nil {
		return nil, "", err
	}
	app := &model.AgentApp{
		TenantID:         tenant.MustFromContext(ctx),
		OwnerScopeKey:    ownerScopeKey,
		Name:             name,
		Description:      strings.TrimSpace(description),
		ClientID:         clientID,
		SecretHash:       hash,
		Status:           model.AgentAppStatusEnabled,
		ToolGroupNames:   tgJSON,
		PromptGroupNames: pgJSON,
	}
	if err := s.dbTenant(ctx).Create(app).Error; err != nil {
		return nil, "", err
	}
	return app, secretPlain, nil
}

// ListByOwnerScope lists apps for an owner scope key.
func (s *Service) ListByOwnerScope(ctx context.Context, ownerScopeKey string) ([]model.AgentApp, error) {
	ownerScopeKey = strings.TrimSpace(ownerScopeKey)
	var apps []model.AgentApp
	if err := s.dbTenant(ctx).Where("owner_scope_key = ?", ownerScopeKey).Order("name ASC").Find(&apps).Error; err != nil {
		return nil, err
	}
	return apps, nil
}

// GetOwned returns an app by ID if it belongs to ownerScopeKey.
func (s *Service) GetOwned(ctx context.Context, id uint, ownerScopeKey string) (*model.AgentApp, error) {
	var app model.AgentApp
	if err := s.dbTenant(ctx).Where("id = ? AND owner_scope_key = ?", id, strings.TrimSpace(ownerScopeKey)).First(&app).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("agent-app not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &app, nil
}

// UpdatePatch updates name, description, status, and/or attachments when non-nil.
func (s *Service) UpdatePatch(ctx context.Context, id uint, ownerScopeKey string, name, description *string, status *model.AgentAppStatus, toolGroups, promptGroups *[]string) (*model.AgentApp, error) {
	app, err := s.GetOwned(ctx, id, ownerScopeKey)
	if err != nil {
		return nil, err
	}
	if name != nil {
		v := strings.TrimSpace(*name)
		if v == "" {
			return nil, fmt.Errorf("name is required: %w", apierrors.ErrInvalidInput)
		}
		app.Name = v
	}
	if description != nil {
		app.Description = strings.TrimSpace(*description)
	}
	if status != nil {
		switch *status {
		case model.AgentAppStatusEnabled, model.AgentAppStatusDisabled:
			app.Status = *status
		default:
			return nil, fmt.Errorf("invalid status: %w", apierrors.ErrInvalidInput)
		}
	}

	curTG, err := app.GetToolGroups()
	if err != nil {
		return nil, err
	}
	curPG, err := app.GetPromptGroups()
	if err != nil {
		return nil, err
	}
	tg := normalizeGroupNames(curTG)
	pg := normalizeGroupNames(curPG)
	if toolGroups != nil {
		tg = normalizeGroupNames(*toolGroups)
		if len(tg) > 0 {
			pg = []string{}
		}
	}
	if promptGroups != nil {
		pg = normalizeGroupNames(*promptGroups)
		if len(pg) > 0 {
			tg = []string{}
		}
	}
	if err := validateAgentAppGroupAttachment(tg, pg); err != nil {
		return nil, err
	}
	if err := s.validateAttachedGroups(ctx, tg, pg); err != nil {
		return nil, err
	}
	tgj, err := marshalNames(tg)
	if err != nil {
		return nil, err
	}
	pgj, err := marshalNames(pg)
	if err != nil {
		return nil, err
	}
	app.ToolGroupNames = tgj
	app.PromptGroupNames = pgj

	if err := s.dbTenant(ctx).Save(app).Error; err != nil {
		return nil, err
	}
	return app, nil
}

// Delete removes an agent-app owned by ownerScopeKey.
func (s *Service) Delete(ctx context.Context, id uint, ownerScopeKey string) error {
	res := s.dbTenant(ctx).Where("id = ? AND owner_scope_key = ?", id, strings.TrimSpace(ownerScopeKey)).Delete(&model.AgentApp{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return fmt.Errorf("agent-app not found: %w", apierrors.ErrNotFound)
	}
	return nil
}

// RotateSecret replaces the client secret; returns plaintext once.
func (s *Service) RotateSecret(ctx context.Context, id uint, ownerScopeKey string) (secretPlain string, err error) {
	app, err := s.GetOwned(ctx, id, ownerScopeKey)
	if err != nil {
		return "", err
	}
	secretPlain, err = generateSecretPlain()
	if err != nil {
		return "", err
	}
	hash, err := hashSecret(secretPlain)
	if err != nil {
		return "", err
	}
	app.SecretHash = hash
	if err := s.dbTenant(ctx).Model(&model.AgentApp{}).Where("id = ?", app.ID).Update("secret_hash", hash).Error; err != nil {
		return "", err
	}
	return secretPlain, nil
}

func generateSecretPlain() (string, error) {
	a, err := internal.GenerateAccessToken()
	if err != nil {
		return "", err
	}
	b, err := internal.GenerateAccessToken()
	if err != nil {
		return "", err
	}
	if len(b) < 8 {
		return "", fmt.Errorf("unexpected token length")
	}
	return a + "_" + b[:16], nil
}

// GetByClientID loads an agent-app by tenant + client_id (for Basic auth and token endpoint).
func (s *Service) GetByClientID(ctx context.Context, clientID string) (*model.AgentApp, error) {
	clientID = strings.TrimSpace(clientID)
	var app model.AgentApp
	if err := s.dbTenant(ctx).Where("client_id = ?", clientID).First(&app).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("agent-app not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &app, nil
}

// AuthenticateClientCredentials validates client_id + secret and returns the app row.
func (s *Service) AuthenticateClientCredentials(ctx context.Context, clientID, secretPlain string) (*model.AgentApp, error) {
	app, err := s.GetByClientID(ctx, clientID)
	if err != nil {
		return nil, err
	}
	if !checkSecret(app.SecretHash, secretPlain) {
		return nil, fmt.Errorf("invalid credentials: %w", apierrors.ErrUnauthorized)
	}
	return app, nil
}

// GetByID loads by primary key within tenant.
func (s *Service) GetByID(ctx context.Context, id uint) (*model.AgentApp, error) {
	var app model.AgentApp
	if err := s.dbTenant(ctx).Where("id = ?", id).First(&app).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("agent-app not found: %w", apierrors.ErrNotFound)
		}
		return nil, err
	}
	return &app, nil
}

// MintAccessToken issues a signed JWT for an enabled agent-app.
func (s *Service) MintAccessToken(app *model.AgentApp) (string, int64, error) {
	if !s.jwtEnabled() {
		return "", 0, fmt.Errorf("agent-app JWT signing is not configured: %w", apierrors.ErrUnauthorized)
	}
	if app == nil || !app.IsEnabled() {
		return "", 0, fmt.Errorf("agent-app is disabled: %w", apierrors.ErrUnauthorized)
	}
	now := time.Now()
	exp := now.Add(DefaultAccessTokenTTL)
	claims := bearerClaims{
		AgentAppID: int64(app.ID),
		TenantID:   app.TenantID,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    jwtIssuer,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(exp),
		},
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := tok.SignedString(s.jwtSecret)
	if err != nil {
		return "", 0, err
	}
	return signed, int64(DefaultAccessTokenTTL.Seconds()), nil
}

// PrincipalForApp builds MCP authorization principal from a loaded app row.
func PrincipalForApp(app *model.AgentApp) (*agentappauth.Principal, error) {
	tg, err := app.GetToolGroups()
	if err != nil {
		return nil, err
	}
	pg, err := app.GetPromptGroups()
	if err != nil {
		return nil, err
	}
	return &agentappauth.Principal{
		AgentAppID:   app.ID,
		ToolGroups:   tg,
		PromptGroups: pg,
	}, nil
}

// ResolvePrincipalFromBearerJWT verifies a JWT and loads a fresh enabled app row from the database.
func (s *Service) ResolvePrincipalFromBearerJWT(ctx context.Context, bearer string) (*agentappauth.Principal, error) {
	if !s.jwtEnabled() {
		return nil, fmt.Errorf("agent-app JWT signing is not configured: %w", apierrors.ErrUnauthorized)
	}
	bearer = strings.TrimSpace(bearer)
	claims := bearerClaims{}
	parsed, err := jwt.ParseWithClaims(bearer, &claims, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return s.jwtSecret, nil
	})
	if err != nil || !parsed.Valid {
		return nil, fmt.Errorf("invalid agent-app token: %w", apierrors.ErrUnauthorized)
	}
	if claims.Issuer != jwtIssuer {
		return nil, fmt.Errorf("invalid agent-app token issuer: %w", apierrors.ErrUnauthorized)
	}
	if claims.TenantID != tenant.MustFromContext(ctx) {
		return nil, fmt.Errorf("tenant mismatch: %w", apierrors.ErrUnauthorized)
	}
	app, err := s.GetByID(ctx, uint(claims.AgentAppID))
	if err != nil {
		return nil, err
	}
	if !app.IsEnabled() {
		return nil, fmt.Errorf("agent-app is disabled: %w", apierrors.ErrUnauthorized)
	}
	return PrincipalForApp(app)
}

// ResolvePrincipalFromBasic authenticates Basic credentials and returns a principal from DB.
func (s *Service) ResolvePrincipalFromBasic(ctx context.Context, clientID, secretPlain string) (*agentappauth.Principal, error) {
	app, err := s.AuthenticateClientCredentials(ctx, clientID, secretPlain)
	if err != nil {
		return nil, err
	}
	if !app.IsEnabled() {
		return nil, fmt.Errorf("agent-app is disabled: %w", apierrors.ErrUnauthorized)
	}
	return PrincipalForApp(app)
}
