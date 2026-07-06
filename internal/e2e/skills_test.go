package e2e_test

import (
	"net/http"
	"testing"

	"sami.io/mcpgateway/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func createTestSkill(t *testing.T, env *e2eEnv, name, version string) {
	t.Helper()
	resp := env.do(t, http.MethodPost, "/api/v0/skills", map[string]any{
		"name":          name,
		"version":       version,
		"description":   "Test skill for " + name,
		"body_content":  "# Instructions\nDo the thing.",
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)
}

func activateSkillVersion(t *testing.T, env *e2eEnv, name, version string) {
	t.Helper()
	resp := env.do(t, http.MethodPatch, "/api/v0/skills/"+name+"/versions/"+version+"/dlc-status", map[string]any{
		"dlc_status": "released",
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)

	resp = env.do(t, http.MethodPatch, "/api/v0/skills/"+name+"/versions/"+version+"/status", map[string]any{
		"status": "active",
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)
}

func TestE2E_DevMode_Skill_Create_List_Get(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)
	createTestSkill(t, env, "pdf-processing", "1.0.0")

	resp := env.do(t, http.MethodGet, "/api/v0/skills", nil, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var list []map[string]any
	decodeJSON(t, resp, &list)
	require.Len(t, list, 1)
	assert.Equal(t, "pdf-processing", list[0]["name"])
	assert.Equal(t, "1.0.0", list[0]["version"])
	assert.Equal(t, "preview", list[0]["status"])
	assert.Equal(t, "development", list[0]["dlc_status"])
	_, hasBody := list[0]["body_content"]
	assert.False(t, hasBody)

	resp = env.do(t, http.MethodGet, "/api/v0/skills/pdf-processing/versions/1.0.0", nil, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var detail map[string]any
	decodeJSON(t, resp, &detail)
	assert.Equal(t, "# Instructions\nDo the thing.", detail["body_content"])
}

func TestE2E_DevMode_Skill_LifecycleAndSkillSet(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)
	createTestSkill(t, env, "data-analysis", "1.0.0")

	resp := env.do(t, http.MethodPatch, "/api/v0/skills/data-analysis/versions/1.0.0/status", map[string]any{
		"status": "active",
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusBadRequest, resp.StatusCode)

	activateSkillVersion(t, env, "data-analysis", "1.0.0")

	resp = env.do(t, http.MethodPost, "/api/v0/skillsets", map[string]any{
		"name":        "analytics-set",
		"description": "Analytics skills",
		"members": []map[string]any{
			{"skill_name": "data-analysis", "version": "1.0.0"},
		},
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)

	resp = env.do(t, http.MethodGet, "/api/v0/skillsets/analytics-set", nil, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var setDetail map[string]any
	decodeJSON(t, resp, &setDetail)
	members, ok := setDetail["members"].([]any)
	require.True(t, ok)
	require.Len(t, members, 1)
}

func TestE2E_DevMode_Skill_Update(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)
	createTestSkill(t, env, "editable-skill", "1.0.0")

	resp := env.do(t, http.MethodPut, "/api/v0/skills/editable-skill/versions/1.0.0", map[string]any{
		"description":  "Updated description",
		"body_content": "# Updated\nNew instructions.",
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var detail map[string]any
	decodeJSON(t, resp, &detail)
	assert.Equal(t, "Updated description", detail["description"])
	assert.Equal(t, "# Updated\nNew instructions.", detail["body_content"])
}

func TestE2E_DevMode_Skill_LockedBlocksUpdate(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)
	createTestSkill(t, env, "locked-skill", "1.0.0")

	resp := env.do(t, http.MethodPatch, "/api/v0/skills/locked-skill/versions/1.0.0/lock", map[string]any{
		"locked": true,
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)

	resp = env.do(t, http.MethodPut, "/api/v0/skills/locked-skill/versions/1.0.0", map[string]any{
		"description":  "changed",
		"body_content": "new body",
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusBadRequest, resp.StatusCode)
}

func TestE2E_DevMode_SkillSet_TenantRoute_Open(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)
	createTestSkill(t, env, "tenant-skill", "2.0.0")
	activateSkillVersion(t, env, "tenant-skill", "2.0.0")

	resp := env.do(t, http.MethodPost, "/api/v0/skillsets", map[string]any{
		"name":             "open-set",
		"description":      "Open catalog",
		"security_option": "open",
		"members": []map[string]any{
			{"skill_name": "tenant-skill", "version": "2.0.0"},
		},
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)

	resp = env.do(t, http.MethodGet, "/sami/v0/skillsets/open-set/skills", nil, "")
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)
	var catalog []map[string]any
	decodeJSON(t, resp, &catalog)
	require.Len(t, catalog, 1)
	assert.Equal(t, "tenant-skill", catalog[0]["name"])
	assert.Equal(t, "2.0.0", catalog[0]["version"])
	assert.NotEmpty(t, catalog[0]["id"])
	assert.Equal(t, "# Instructions\nDo the thing.", catalog[0]["body_content"])
}

func TestE2E_DevMode_AgentApp_SkillSetAttachment(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)
	registerEverythingServer(t, env)

	resp := env.do(t, http.MethodPost, "/api/v0/tool-groups", map[string]any{
		"name":           "agent-tg",
		"included_tools": []string{"everything__echo"},
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)

	resp = env.do(t, http.MethodPost, "/api/v0/skillsets", map[string]any{
		"name":        "app-set",
		"description": "For agent app",
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)

	resp = env.do(t, http.MethodPost, "/api/v0/agent-apps", map[string]any{
		"name":             "skill-app",
		"tool_group_names": []string{"agent-tg"},
		"skill_set_names":  []string{"app-set"},
	}, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusCreated, resp.StatusCode)
	var createResp map[string]any
	decodeJSON(t, resp, &createResp)
	app, ok := createResp["app"].(map[string]any)
	require.True(t, ok)
	tg, ok := app["tool_group_names"].([]any)
	require.True(t, ok)
	require.Len(t, tg, 1)
	ss, ok := app["skill_set_names"].([]any)
	require.True(t, ok)
	require.Len(t, ss, 1)
}
