package api

import (
	"crypto/rand"
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"io"
	"math/big"
	"net/http"
	"net/http/cookiejar"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/stretchr/testify/require"
)

func rsaJWKForTests(pub *rsa.PublicKey, kid string) map[string]string {
	return map[string]string{
		"kty": "RSA",
		"kid": kid,
		"use": "sig",
		"alg": "RS256",
		"n":   base64.RawURLEncoding.EncodeToString(pub.N.Bytes()),
		"e":   base64.RawURLEncoding.EncodeToString(big.NewInt(int64(pub.E)).Bytes()),
	}
}

func signTestIDToken(priv *rsa.PrivateKey, iss, aud, kid string) (string, error) {
	now := time.Now()
	claims := jwt.MapClaims{
		"sub": "integration-subject",
		"iss": iss,
		"aud": aud,
		"iat": float64(now.Unix()),
		"exp": float64(now.Add(time.Hour).Unix()),
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	tok.Header["kid"] = kid
	return tok.SignedString(priv)
}

func TestOAuthRedirectMatchesGatewayPrefixAndHost(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/pfx"}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "svc.local"
	require.Equal(t, "http://svc.local/pfx/auth/callback", s.oauthRedirectURL(c))
}

func TestOAuthRedirectUsesXForwardedProtoHTTPS(t *testing.T) {
	gin.SetMode(gin.TestMode)
	s := &Server{httpPathPrefix: "/pfx"}
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Request = httptest.NewRequest(http.MethodGet, "/", nil)
	c.Request.Host = "app.example.dev"
	c.Request.Header.Set("X-Forwarded-Proto", "https")
	require.Equal(t, "https://app.example.dev/pfx/auth/callback", s.oauthRedirectURL(c))
}

func TestOIDCAuthorizationCodeAgainstMockIssuer(t *testing.T) {
	gin.SetMode(gin.TestMode)

	const (
		clientID           = "test-client-id"
		clientSecret       = "test-client-secret"
		kid                = "test-kid"
		mockAuthCode       = "mock-auth-code"
		httpPathPrefixTest = "/api/v1/test-gw"
	)

	priv, err := rsa.GenerateKey(rand.Reader, 2048)
	require.NoError(t, err)

	pubAny := priv.Public()
	pub, ok := pubAny.(*rsa.PublicKey)
	require.True(t, ok)

	var issuerBase string
	wantRedirectURI := ""

	oidcMux := http.NewServeMux()
	oidcMux.HandleFunc("/.well-known/openid-configuration", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		require.NoError(t, json.NewEncoder(w).Encode(map[string]string{
			"issuer":                 issuerBase,
			"authorization_endpoint": issuerBase + "/oauth2/authorize",
			"token_endpoint":         issuerBase + "/oauth2/token",
			"jwks_uri":               issuerBase + "/jwks",
		}))
	})
	oidcMux.HandleFunc("/jwks", func(w http.ResponseWriter, r *http.Request) {
		key := rsaJWKForTests(pub, kid)
		w.Header().Set("Content-Type", "application/json")
		require.NoError(t, json.NewEncoder(w).Encode(map[string]any{"keys": []any{key}}))
	})
	oidcMux.HandleFunc("/oauth2/authorize", func(w http.ResponseWriter, r *http.Request) {
		q := r.URL.Query()
		if q.Get("client_id") != clientID {
			http.Error(w, "bad client", http.StatusBadRequest)
			return
		}
		redir := q.Get("redirect_uri")
		if redir != wantRedirectURI {
			http.Error(w, "unexpected redirect_uri", http.StatusBadRequest)
			return
		}
		st := q.Get("state")
		uu, err := url.Parse(redir)
		if err != nil {
			http.Error(w, "bad redirect", http.StatusBadRequest)
			return
		}
		qb := uu.Query()
		qb.Set("code", mockAuthCode)
		qb.Set("state", st)
		uu.RawQuery = qb.Encode()
		http.Redirect(w, r, uu.String(), http.StatusFound)
	})
	oidcMux.HandleFunc("/oauth2/token", func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			http.Error(w, "bad body", http.StatusBadRequest)
			return
		}
		if r.Form.Get("grant_type") != "authorization_code" || r.Form.Get("code") != mockAuthCode {
			http.Error(w, "bad grant/code", http.StatusBadRequest)
			return
		}
		if r.Form.Get("client_id") != clientID || r.Form.Get("client_secret") != clientSecret {
			http.Error(w, "creds", http.StatusUnauthorized)
			return
		}
		if r.Form.Get("redirect_uri") != wantRedirectURI {
			http.Error(w, "redirect mismatch", http.StatusBadRequest)
			return
		}
		rawTok, tokErr := signTestIDToken(priv, issuerBase, clientID, kid)
		if tokErr != nil {
			http.Error(w, tokErr.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		require.NoError(t, json.NewEncoder(w).Encode(map[string]string{
			"id_token":     rawTok,
			"access_token": "opaque",
			"token_type":   "Bearer",
			"expires_in":   "3599",
		}))
	})

	oidcSrv := httptest.NewServer(oidcMux)
	defer oidcSrv.Close()
	issuerBase = strings.TrimSuffix(oidcSrv.URL, "/")

	apiSvr := newTestAPIServer(t, httpPathPrefixTest, &OIDCSettings{
		IssuerURL:    issuerBase,
		ClientID:     clientID,
		ClientSecret: clientSecret,
	})
	require.NoError(t, apiSvr.InitDev())

	gwSrv := httptest.NewServer(apiSvr.Router())
	defer gwSrv.Close()

	wantRedirectURI = gwSrv.URL + httpPathPrefixTest + "/auth/callback"

	t.Run("public auth-status and gated overview JSON", func(t *testing.T) {
		anon := &http.Client{}
		asResp, err := anon.Get(gwSrv.URL + httpPathPrefixTest + "/dashboard/auth-status")
		require.NoError(t, err)
		asBody, err := io.ReadAll(asResp.Body)
		require.NoError(t, err)
		require.NoError(t, asResp.Body.Close())
		require.Equal(t, http.StatusOK, asResp.StatusCode)
		var as map[string]any
		require.NoError(t, json.Unmarshal(asBody, &as))
		require.False(t, as["authenticated"].(bool))
		require.True(t, as["oidc_enabled"].(bool))
		lp, ok := as["login_path"].(string)
		require.True(t, ok)
		require.Contains(t, lp, "/login")

		ovReq, err := http.NewRequest(http.MethodGet, gwSrv.URL+httpPathPrefixTest+"/dashboard/overview", nil)
		require.NoError(t, err)
		ovReq.Header.Set("Accept", "application/json")
		overviewAnon, err := anon.Do(ovReq)
		require.NoError(t, err)
		defer overviewAnon.Body.Close()
		require.Equal(t, http.StatusUnauthorized, overviewAnon.StatusCode)
	})

	jar, err := cookiejar.New(nil)
	require.NoError(t, err)
	client := &http.Client{Jar: jar}

	resp, err := client.Get(gwSrv.URL + httpPathPrefixTest + "/login")
	require.NoError(t, err)
	_ = resp.Body.Close()
	require.Equal(t, http.StatusOK, resp.StatusCode)

	req, err := http.NewRequest(http.MethodGet, gwSrv.URL+httpPathPrefixTest+"/dashboard/overview", nil)
	require.NoError(t, err)
	req.Header.Set("Accept", "application/json")
	overview, err := client.Do(req)
	require.NoError(t, err)
	defer overview.Body.Close()
	require.Equal(t, http.StatusOK, overview.StatusCode)
}
