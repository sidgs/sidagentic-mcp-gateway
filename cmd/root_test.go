package cmd

import (
	"testing"

	"github.com/mcpjungle/mcpjungle/pkg/cliapp"
)

func TestRootCommandStructure(t *testing.T) {
	if rootCmd.Use != cliapp.ExecutableName {
		t.Errorf("Expected root command Use to be %q, got %s", cliapp.ExecutableName, rootCmd.Use)
	}
	if rootCmd.Short != "MCP Gateway for AI Agents" {
		t.Errorf("Expected root command Short to be 'MCP Gateway for AI Agents', got %s", rootCmd.Short)
	}
}
