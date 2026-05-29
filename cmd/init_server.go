package cmd

import (
	"fmt"

	"sami.io/mcpgateway/cmd/config"
	"github.com/spf13/cobra"
)

var initServerCmd = &cobra.Command{
	Use:   "init-server",
	Short: "Initialize the SAMI MCP Gateway Server (for Enterprise Mode only)",
	Long: "If the SAMI MCP Gateway Server was started in Enterprise Mode, use this command to initialize the server.\n" +
		"Initialization is required before you can use the server.\n",
	RunE: runInitServer,
	Annotations: map[string]string{
		"group": string(subCommandGroupAdvanced),
		"order": "6",
	},
}

func init() {
	rootCmd.AddCommand(initServerCmd)
}

func runInitServer(cmd *cobra.Command, args []string) error {
	fmt.Println("Initializing the SAMI MCP Gateway Server in Enterprise Mode...")
	if _, err := apiClient.InitServer(); err != nil {
		return fmt.Errorf("failed to initialize the server: %w", err)
	}

	cfg := &config.ClientConfig{
		RegistryURL: apiClient.BaseURL(),
	}
	if err := config.Save(cfg); err != nil {
		return fmt.Errorf("failed to create client configuration: %w", err)
	}

	cfgPath, err := config.AbsPath()
	if err != nil {
		return fmt.Errorf("failed to get client configuration path: %w", err)
	}
	fmt.Println("Server initialized. Registry URL saved to", cfgPath)
	fmt.Println("Use GLOBAL_MCP_API_KEY as X-API-Key or Authorization: Bearer <key> for /api/v0 and MCP access.")

	fmt.Println("All done!")
	return nil
}
