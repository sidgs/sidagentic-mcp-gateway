package api

import (
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v4"
	"sami.io/mcpgateway/pkg/tenant"
)

const defaultPlatformJWTAud = "sami-cms"

type dashboardAuthSource string

const (
	dashboardAuthCognitoCookie  dashboardAuthSource = "cognito_cookie"
	dashboardAuthCognitoBearer  dashboardAuthSource = "cognito_bearer"
	dashboardAuthPlatformBearer dashboardAuthSource = "platform_bearer"
)

// dashboardUserSession is an authenticated dashboard UI user (Cognito or platform JWT).
type dashboardUserSession struct {
	ExpiresAt time.Time
	Sub       string
	Email     string
	Source    dashboardAuthSource
}

func (s *Server) platformJWTConfigured() bool {
	return s.platformJWTSecret != "" || s.platformJWTAllowUnsigned
}

func bearerTokenFromRequest(c *gin.Context) (string, bool) {
	authHeader := strings.TrimSpace(c.GetHeader("Authorization"))
	const bearerPrefix = "Bearer "
	if len(authHeader) <= len(bearerPrefix) || !strings.EqualFold(authHeader[:len(bearerPrefix)], bearerPrefix) {
		return "", false
	}
	rawToken := strings.TrimSpace(authHeader[len(bearerPrefix):])
	if rawToken == "" {
		return "", false
	}
	return rawToken, true
}

type platformBearerClaims struct {
	jwt.RegisteredClaims
	Email          string `json:"email"`
	TenantID       string `json:"tenant_id"`
	CustomTenantID string `json:"custom:tenant_id"`
}

func (s *Server) parsePlatformBearerToken(rawToken string) (*platformBearerClaims, bool) {
	claims := &platformBearerClaims{}
	parsed, err := jwt.ParseWithClaims(rawToken, claims, func(t *jwt.Token) (interface{}, error) {
		switch t.Method.(type) {
		case *jwt.SigningMethodHMAC:
			if s.platformJWTSecret == "" {
				return nil, jwt.ErrSignatureInvalid
			}
			return []byte(s.platformJWTSecret), nil
		default:
			if s.platformJWTAllowUnsigned && t.Method == jwt.SigningMethodNone {
				return jwt.UnsafeAllowNoneSignatureType, nil
			}
			return nil, jwt.ErrSignatureInvalid
		}
	})
	if err != nil || parsed == nil || !parsed.Valid {
		return nil, false
	}
	return claims, true
}

func (s *Server) platformSessionFromClaims(c *gin.Context, claims *platformBearerClaims) (*dashboardUserSession, bool) {
	if claims == nil || claims.Subject == "" {
		return nil, false
	}
	if claims.ExpiresAt != nil && claims.ExpiresAt.Time.Before(time.Now()) {
		return nil, false
	}

	if s.platformJWTAud != "" {
		if !audienceMatches(claims.Audience, s.platformJWTAud) {
			return nil, false
		}
	}

	jwtTenant := tenantIDFromOIDCBearerClaims(&oidcBearerClaims{
		Email:          claims.Email,
		TenantID:       claims.TenantID,
		CustomTenantID: claims.CustomTenantID,
	})
	headerTenant := strings.TrimSpace(c.GetHeader(tenant.HeaderName))
	if jwtTenant != "" && headerTenant != "" && jwtTenant != headerTenant {
		return nil, false
	}

	expiresAt := time.Now().Add(24 * time.Hour)
	if claims.ExpiresAt != nil {
		expiresAt = claims.ExpiresAt.Time
	}

	return &dashboardUserSession{
		ExpiresAt: expiresAt,
		Sub:       claims.Subject,
		Email:     strings.TrimSpace(claims.Email),
		Source:    dashboardAuthPlatformBearer,
	}, true
}

func (s *Server) validPlatformBearerFromRequest(c *gin.Context) (*dashboardUserSession, bool) {
	if !s.platformJWTConfigured() {
		return nil, false
	}
	rawToken, ok := bearerTokenFromRequest(c)
	if !ok {
		return nil, false
	}

	claims, ok := s.parsePlatformBearerToken(rawToken)
	if !ok {
		return nil, false
	}
	return s.platformSessionFromClaims(c, claims)
}

func audienceMatches(aud jwt.ClaimStrings, expected string) bool {
	expected = strings.TrimSpace(expected)
	if expected == "" {
		return true
	}
	for _, v := range aud {
		if strings.TrimSpace(v) == expected {
			return true
		}
	}
	return false
}

func oidcSessionToDashboard(sess *oidcServerSession, source dashboardAuthSource) *dashboardUserSession {
	if sess == nil {
		return nil
	}
	return &dashboardUserSession{
		ExpiresAt: sess.ExpiresAt,
		Sub:       sess.Sub,
		Email:     sess.Email,
		Source:    source,
	}
}

// validDashboardUserFromRequest accepts Cognito cookie/bearer or platform bearer tokens.
func (s *Server) validDashboardUserFromRequest(c *gin.Context) (*dashboardUserSession, bool) {
	if sess, ok := s.validOIDCSessionFromRequest(c); ok {
		return oidcSessionToDashboard(sess, dashboardAuthCognitoCookie), true
	}
	if sess, ok := s.validOIDCBearerFromRequest(c); ok {
		return oidcSessionToDashboard(sess, dashboardAuthCognitoBearer), true
	}
	return s.validPlatformBearerFromRequest(c)
}
