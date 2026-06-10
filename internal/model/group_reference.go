package model

import "strings"

const serverEntityNameSep = "__"

// GroupReferencesServer reports whether a group configuration references the given MCP server
// through included_servers or explicit included entity names prefixed with serverName__.
func GroupReferencesServer(includedServers, includedEntities []string, serverName string) bool {
	for _, s := range includedServers {
		if s == serverName {
			return true
		}
	}
	prefix := serverName + serverEntityNameSep
	for _, entity := range includedEntities {
		if strings.HasPrefix(entity, prefix) {
			return true
		}
	}
	return false
}
