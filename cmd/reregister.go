package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var reregisterMCPServerCmd = &cobra.Command{
	Use:   "reregister",
	Short: "Re-register an MCP Server",
	Long: "Reconnect to an existing MCP server using stored configuration, clear its catalog " +
		"from the registry cache and database, rebuild tools, prompts, and resources from upstream, " +
		"and resync tool groups and prompt groups that reference the server.",
	Args: cobra.ExactArgs(1),
	RunE: runReregisterMCPServer,
	Annotations: map[string]string{
		"group": string(subCommandGroupBasic),
		"order": "5",
	},
}

func init() {
	rootCmd.AddCommand(reregisterMCPServerCmd)
}

func runReregisterMCPServer(cmd *cobra.Command, args []string) error {
	server := args[0]
	result, err := apiClient.ReregisterServer(server)
	if err != nil {
		return fmt.Errorf("failed to re-register MCP server %s: %w", server, err)
	}
	fmt.Printf("Successfully re-registered MCP server %s\n", result.Name)
	fmt.Println("Tools, prompts, and resources were refreshed from upstream.")
	fmt.Println("Dependent tool groups and prompt groups were resynced.")
	return nil
}
