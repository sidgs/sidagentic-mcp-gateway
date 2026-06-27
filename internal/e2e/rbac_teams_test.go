package e2e_test

import (
	"encoding/json"
	"net/http"
	"testing"

	"sami.io/mcpgateway/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestE2E_DashboardRBAC_DevModeAutoProvisionUser(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)

	resp := env.do(t, http.MethodGet, "/dashboard/me", nil, "")
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)

	var body map[string]any
	require.NoError(t, json.NewDecoder(resp.Body).Decode(&body))
	assert.Equal(t, "user", body["role"])
	assert.NotZero(t, body["user_id"])
}

func TestE2E_DashboardRBAC_UserCreatesAgentTeam(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)

	resp := env.do(t, http.MethodPost, "/dashboard/teams", map[string]any{
		"name": "shared-apps",
		"type": "agent",
	}, "")
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)

	var team map[string]any
	require.NoError(t, json.NewDecoder(resp.Body).Decode(&team))
	assert.Equal(t, "agent", team["type"])
	assert.Equal(t, "shared-apps", team["name"])
}

func TestE2E_DashboardRBAC_UserCannotCreateProviderTeam(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)

	resp := env.do(t, http.MethodPost, "/dashboard/teams", map[string]any{
		"name": "provider-only",
		"type": "provider",
	}, "")
	defer drain(resp)
	assert.Equal(t, http.StatusForbidden, resp.StatusCode)
}

func TestE2E_DashboardRBAC_SystemSectionForbiddenForUser(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)

	resp := env.do(t, http.MethodGet, "/dashboard/diagnostics", nil, "")
	defer drain(resp)
	assert.Equal(t, http.StatusForbidden, resp.StatusCode)
}
