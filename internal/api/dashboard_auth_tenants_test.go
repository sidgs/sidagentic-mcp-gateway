package api

import (
	"testing"

	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/stretchr/testify/require"
	"sami.io/mcpgateway/pkg/types"
)

func TestMintTenantJWT_UnsignedWhenAllowed(t *testing.T) {
	s := &Server{
		platformJWTAud:           defaultPlatformJWTAud,
		platformJWTAllowUnsigned: true,
	}

	token, exp, err := s.mintTenantJWT("user-sub", "user@example.com", "sid-agentic", types.UserRoleAdministrator, true)
	require.NoError(t, err)
	require.NotZero(t, exp)
	require.NotEmpty(t, token)

	claims := &platformBearerClaims{}
	parsed, err := jwt.ParseWithClaims(token, claims, func(t *jwt.Token) (interface{}, error) {
		require.Equal(t, jwt.SigningMethodNone, t.Method)
		return jwt.UnsafeAllowNoneSignatureType, nil
	})
	require.NoError(t, err)
	require.True(t, parsed.Valid)
	require.Equal(t, "user-sub", claims.Subject)
	require.Equal(t, "sid-agentic", claims.TenantID)
	require.True(t, claims.PlatformAdmin)
}

func TestMintTenantJWT_RequiresSecretOrUnsigned(t *testing.T) {
	s := &Server{platformJWTAud: defaultPlatformJWTAud}

	_, _, err := s.mintTenantJWT("user-sub", "user@example.com", "sid-agentic", types.UserRoleUser, false)
	require.Error(t, err)
}
