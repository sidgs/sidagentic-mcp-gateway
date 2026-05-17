package api

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"slices"
	"strings"
	"time"

	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/mcpjungle/mcpjungle/internal/model"
	"golang.org/x/oauth2"
)

const (
	oauthStateCookieName  = "mcpgw_oauth_state"
	oidcSessionCookieName = "mcpgw_oidc_session"

	stateCookieTTL           = 10 * time.Minute
	oidcSessionSkew          = 30 * time.Second
	jsonAcceptPrefix         = "application/json"
	defaultOIDCSessionMaxTTL = 3 * 24 * time.Hour
)

// OIDCSettings is optional Cognito (or compatible) OpenID Connect client configuration.
// When non-nil and fully populated by the caller (issuer, client id, secret),
// Cognito-backed browser login is enabled at /login, /auth/callback, and /logout under HTTPPathPrefix.
type OIDCSettings struct {
	IssuerURL    string
	ClientID     string
	ClientSecret string
	Region       string // informational; optional — not needed for go-oidc when IssuerURL is set
	// Scopes, when non-empty, replaces the default OAuth2 scope list (openid email profile).
	Scopes []string
}

type oidcServerSession struct {
	ExpiresAt time.Time `json:"expires_at"`
	Sub       string    `json:"sub"`
	Email     string    `json:"email,omitempty"`
}

func (s *Server) oidcConfigured() bool {
	return s.oidcSettings != nil
}

func oauthCookiePath(prefix string) string {
	prefix = NormalizeHTTPPathPrefix(prefix)
	if prefix == "" {
		return "/"
	}
	return prefix
}

// normalizeOAuth2AuthorizeRedirectURI validates COGNITO_REDIRECT_URI: non-empty absolute http(s) URL (OAuth2 redirect_uri).
func normalizeOAuth2AuthorizeRedirectURI(raw string) (string, error) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return "", nil
	}
	u, err := url.Parse(raw)
	if err != nil {
		return "", fmt.Errorf("parse redirect URI: %w", err)
	}
	if strings.TrimSpace(u.Scheme) == "" || strings.TrimSpace(u.Host) == "" {
		return "", errors.New("COGNITO_REDIRECT_URI must be an absolute URL with scheme and host (e.g. https://example.com/path/auth/callback)")
	}
	switch strings.ToLower(u.Scheme) {
	case "http", "https":
		return u.String(), nil
	default:
		return "", fmt.Errorf("COGNITO_REDIRECT_URI unsupported scheme %q (use http or https)", u.Scheme)
	}
}

// oauthRedirectURL builds the OAuth2 redirect_uri passed to Cognito (must match Cognito app client settings).
// When CognitoOAuthRedirectURI is configured (COGNITO_REDIRECT_URI env), it is used as-is instead of deriving from the request Host.
func (s *Server) oauthRedirectURL(c *gin.Context) string {
	if s.cognitoOAuthRedirectURI != "" {
		return s.cognitoOAuthRedirectURI
	}
	root := strings.TrimRight(s.publicGatewayRoot(c), "/")
	return root + "/auth/callback"
}

// normalizePostLoginRedirectURL validates POST_LOGIN_REDIRECT_URL: absolute http(s), or root-relative single-slash path.
func normalizePostLoginRedirectURL(raw string) (string, error) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return "", errors.New("empty POST_LOGIN_REDIRECT_URL")
	}
	u, err := url.Parse(raw)
	if err != nil {
		return "", fmt.Errorf("parse redirect URL: %w", err)
	}
	if u.Scheme != "" {
		switch strings.ToLower(u.Scheme) {
		case "http", "https":
			if u.Host == "" {
				return "", errors.New("absolute POST_LOGIN_REDIRECT_URL missing host")
			}
			return u.String(), nil
		default:
			return "", fmt.Errorf("unsupported scheme %q (use http or https)", u.Scheme)
		}
	}
	if !strings.HasPrefix(raw, "/") {
		return "", errors.New("relative POST_LOGIN_REDIRECT_URL must start with /")
	}
	if strings.HasPrefix(raw, "//") {
		return "", errors.New("relative POST_LOGIN_REDIRECT_URL must not start with //")
	}
	return raw, nil
}

// effectivePostLoginRedirect returns POST_LOGIN_REDIRECT_URL when set; otherwise the gateway mount root ("/" or "{prefix}/").
// Used after OIDC callback and after clearing the session at /logout.
func (s *Server) effectivePostLoginRedirect() string {
	if s.postLoginRedirectURL != "" {
		return s.postLoginRedirectURL
	}
	dest := "/"
	if pp := NormalizeHTTPPathPrefix(s.httpPathPrefix); pp != "" {
		dest = pp + "/"
	}
	return dest
}

func (s *Server) oidcLazyProvider(ctx context.Context) (*oidc.Provider, error) {
	s.oidcProviderMu.Lock()
	defer s.oidcProviderMu.Unlock()
	if s.oidcCachedProvider != nil {
		return s.oidcCachedProvider, nil
	}
	if s.oidcSettings == nil {
		return nil, errors.New("oidc settings not configured")
	}
	p, err := oidc.NewProvider(ctx, s.oidcSettings.IssuerURL)
	if err != nil {
		return nil, fmt.Errorf("oidc NewProvider for %s: %w", s.oidcSettings.IssuerURL, err)
	}
	s.oidcCachedProvider = p
	log.Printf("[oidc] OIDC issuer discovered: %s\n", s.oidcSettings.IssuerURL)
	return p, nil
}

func defaultOIDCOAuth2Scopes() []string {
	return []string{oidc.ScopeOpenID, "email", "profile"}
}

func (s *Server) newOAuth2Config(p *oidc.Provider, redirect string) oauth2.Config {
	scopes := defaultOIDCOAuth2Scopes()
	if s.oidcSettings != nil && len(s.oidcSettings.Scopes) > 0 {
		scopes = slices.Clone(s.oidcSettings.Scopes)
	}
	return oauth2.Config{
		ClientID:     s.oidcSettings.ClientID,
		ClientSecret: s.oidcSettings.ClientSecret,
		RedirectURL:  redirect,
		Endpoint:     p.Endpoint(),
		Scopes:       scopes,
	}
}

func randomHexToken(nBytes int) (string, error) {
	b := make([]byte, nBytes)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// cognitoOAuthLogin starts the authorization-code flow against Cognito.
func (s *Server) cognitoOAuthLoginHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !s.oidcConfigured() {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		ctx := c.Request.Context()
		provider, err := s.oidcLazyProvider(ctx)
		if err != nil {
			log.Printf("[oidc] login: provider init failed: %v\n", err)
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "OIDC provider unavailable"})
			return
		}
		state, err := randomHexToken(16)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate oauth state"})
			return
		}
		conf := s.newOAuth2Config(provider, s.oauthRedirectURL(c))
		redirect := conf.AuthCodeURL(state)

		ok := s.oauthCookieSecure(c)
		http.SetCookie(c.Writer, &http.Cookie{
			Name:     oauthStateCookieName,
			Value:    state,
			Path:     oauthCookiePath(s.httpPathPrefix),
			MaxAge:   int(stateCookieTTL.Seconds()),
			HttpOnly: true,
			Secure:   ok,
			SameSite: http.SameSiteLaxMode,
		})
		c.Redirect(http.StatusFound, redirect)
	}
}

// cognitoOAuthCallback completes the authorization-code flow, verifies the ID token, and sets a session cookie.
func (s *Server) cognitoOAuthCallbackHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !s.oidcConfigured() {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		ctx := c.Request.Context()
		provider, err := s.oidcLazyProvider(ctx)
		if err != nil {
			log.Printf("[oidc] callback: provider init failed: %v\n", err)
			c.JSON(http.StatusServiceUnavailable, gin.H{"error": "OIDC provider unavailable"})
			return
		}

		stateCookie, err := c.Request.Cookie(oauthStateCookieName)
		if err != nil || stateCookie.Value == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "missing oauth state cookie"})
			return
		}
		qState := c.Query("state")
		if qState == "" || qState != stateCookie.Value {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid oauth state"})
			return
		}
		code := c.Query("code")
		if code == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "missing authorization code"})
			return
		}

		conf := s.newOAuth2Config(provider, s.oauthRedirectURL(c))
		oauth2Tok, err := conf.Exchange(ctx, code)
		if err != nil {
			log.Printf("[oidc] token exchange failed: %v\n", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "token exchange failed"})
			return
		}

		rawIDToken, ok := oauth2Tok.Extra("id_token").(string)
		if !ok || rawIDToken == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "id_token missing in token response"})
			return
		}

		verifier := provider.Verifier(&oidc.Config{ClientID: s.oidcSettings.ClientID})
		idTok, err := verifier.Verify(ctx, rawIDToken)
		if err != nil {
			log.Printf("[oidc] id_token verify failed: %v\n", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid id_token"})
			return
		}

		parts := strings.Split(rawIDToken, ".")
		if len(parts) != 3 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid jwt format"})
			return
		}
		payloadBytes, err := jwt.DecodeSegment(parts[1])
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "jwt payload decode failed"})
			return
		}
		claims := jwt.MapClaims{}
		if err := json.Unmarshal(payloadBytes, &claims); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "jwt claims parse failed"})
			return
		}

		expiresAt, redisTTL := s.computeSessionExpiryAndTTL(idTok)

		sessionID, err := randomHexToken(32)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "session id"})
			return
		}
		sub := ""
		if v, ok := claims["sub"].(string); ok {
			sub = v
		}
		email, _ := claims["email"].(string)

		sess := oidcServerSession{
			ExpiresAt: expiresAt,
			Sub:       sub,
			Email:     email,
		}
		if err := s.oidcSessionStore.Set(ctx, sessionID, sess, redisTTL); err != nil {
			log.Printf("[oidc] session store set failed: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to persist session"})
			return
		}

		okSecure := s.oauthCookieSecure(c)

		expirePast := &http.Cookie{
			Name:     oauthStateCookieName,
			Value:    "",
			Path:     oauthCookiePath(s.httpPathPrefix),
			MaxAge:   -1,
			HttpOnly: true,
			Secure:   okSecure,
			SameSite: http.SameSiteLaxMode,
		}
		http.SetCookie(c.Writer, expirePast)

		http.SetCookie(c.Writer, &http.Cookie{
			Name:     oidcSessionCookieName,
			Value:    sessionID,
			Path:     oauthCookiePath(s.httpPathPrefix),
			MaxAge:   oauthSessionCookieMaxAge(expiresAt),
			HttpOnly: true,
			Secure:   okSecure,
			SameSite: http.SameSiteLaxMode,
		})

		c.Redirect(http.StatusFound, s.effectivePostLoginRedirect())
	}
}

func oauthSessionCookieMaxAge(expiry time.Time) int {
	sec := int(time.Until(expiry)/time.Second) + 300
	if sec < 0 {
		return 0
	}
	return sec
}

// computeSessionExpiryAndTTL returns absolute session expiry (capped by JWT and max TTL) and Redis key TTL.
func (s *Server) computeSessionExpiryAndTTL(tok *oidc.IDToken) (exp time.Time, redisTTL time.Duration) {
	now := time.Now()
	maxCap := s.oidcSessionMaxTTL
	if maxCap <= 0 {
		maxCap = defaultOIDCSessionMaxTTL
	}
	jwtExp := sessionExpiry(tok)
	capExp := now.Add(maxCap)
	exp = jwtExp
	if exp.After(capExp) {
		exp = capExp
	}
	if !exp.After(now) {
		exp = now.Add(time.Second)
	}
	redisTTL = time.Until(exp)
	if redisTTL < time.Second {
		redisTTL = time.Second
	}
	return exp, redisTTL
}

func sessionExpiry(tok *oidc.IDToken) time.Time {
	exp := tok.Expiry
	if exp.IsZero() {
		exp = time.Now().Add(24 * time.Hour)
	}
	return exp
}

func (s *Server) cognitoLogoutHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !s.oidcConfigured() {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}

		sec := s.oauthCookieSecure(c)
		path := oauthCookiePath(s.httpPathPrefix)

		if ck, err := c.Request.Cookie(oidcSessionCookieName); err == nil && ck.Value != "" {
			_ = s.oidcSessionStore.Delete(c.Request.Context(), ck.Value)
		}

		expirePast := func(name string) {
			http.SetCookie(c.Writer, &http.Cookie{
				Name:     name,
				Value:    "",
				Path:     path,
				MaxAge:   -1,
				HttpOnly: true,
				Secure:   sec,
				SameSite: http.SameSiteLaxMode,
			})
		}
		expirePast(oidcSessionCookieName)
		expirePast(oauthStateCookieName)

		c.Redirect(http.StatusFound, s.effectivePostLoginRedirect())
	}
}

func (s *Server) validOIDCSessionFromRequest(c *gin.Context) (*oidcServerSession, bool) {
	if !s.oidcConfigured() {
		return nil, false
	}
	ck, err := c.Request.Cookie(oidcSessionCookieName)
	if err != nil || ck.Value == "" {
		return nil, false
	}
	sess, ok := s.oidcSessionStore.Get(c.Request.Context(), ck.Value)
	if !ok {
		return nil, false
	}
	return &sess, true
}

// requireDashboardModeOrOIDC allows the dashboard when the server is in dev mode, or when OIDC is enabled.
func (s *Server) requireDashboardModeOrOIDC() gin.HandlerFunc {
	return func(c *gin.Context) {
		modeVal, exists := c.Get("mode")
		if !exists {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "server mode not found in context"})
			return
		}
		currentMode, ok := modeVal.(model.ServerMode)
		if !ok {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "invalid server mode in context"})
			return
		}
		if currentMode == model.ModeDev {
			c.Next()
			return
		}
		if s.oidcConfigured() {
			c.Next()
			return
		}
		c.AbortWithStatus(http.StatusNotFound)
	}
}

// requireOIDCSessionIfEnabled redirects unauthenticated browser clients to /login when OIDC is enabled.
func (s *Server) requireOIDCSessionIfEnabled() gin.HandlerFunc {
	return func(c *gin.Context) {
		if !s.oidcConfigured() {
			c.Next()
			return
		}
		if _, ok := s.validOIDCSessionFromRequest(c); ok {
			c.Next()
			return
		}
		pp := NormalizeHTTPPathPrefix(s.httpPathPrefix)
		var dest string
		if pp == "" {
			dest = "/login"
		} else {
			dest = pp + "/login"
		}
		if prefersJSONAccepted(c.GetHeader("Accept")) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "authentication required", "login_path": dest})
			return
		}
		c.Redirect(http.StatusFound, dest)
		c.Abort()
	}
}

func prefersJSONAccepted(acceptHeader string) bool {
	h := strings.ToLower(strings.TrimSpace(acceptHeader))
	if h == "" {
		return false
	}
	for _, raw := range strings.Split(h, ",") {
		mt := strings.TrimSpace(strings.Split(raw, ";")[0])
		if strings.HasPrefix(strings.ToLower(mt), jsonAcceptPrefix) {
			return true
		}
	}
	return false
}
