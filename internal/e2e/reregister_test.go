package e2e_test

import (
	"net/http"
	"testing"

	"sami.io/mcpgateway/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestE2E_DevMode_ReregisterServer(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)
	registerEverythingServer(t, env)

	listBefore := env.do(t, http.MethodGet, "/api/v0/tools", nil, env.globalMCPAPIKey)
	defer drain(listBefore)
	require.Equal(t, http.StatusOK, listBefore.StatusCode)
	var toolsBefore []map[string]any
	decodeJSON(t, listBefore, &toolsBefore)
	require.NotEmpty(t, toolsBefore)

	resp := env.do(t, http.MethodPost, "/api/v0/servers/everything/reregister", nil, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusOK, resp.StatusCode)

	var server map[string]any
	decodeJSON(t, resp, &server)
	assert.Equal(t, "everything", server["name"])

	listAfter := env.do(t, http.MethodGet, "/api/v0/tools", nil, env.globalMCPAPIKey)
	defer drain(listAfter)
	require.Equal(t, http.StatusOK, listAfter.StatusCode)
	var toolsAfter []map[string]any
	decodeJSON(t, listAfter, &toolsAfter)
	assert.ElementsMatch(t, toolNames(toolsBefore), toolNames(toolsAfter))
}

func TestE2E_DevMode_ReregisterMissingServer(t *testing.T) {
	env := setupE2EServer(t, model.ModeDev)

	resp := env.do(t, http.MethodPost, "/api/v0/servers/missing/reregister", nil, env.globalMCPAPIKey)
	defer drain(resp)
	require.Equal(t, http.StatusNotFound, resp.StatusCode)
}
