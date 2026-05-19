package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var deleteCmd = &cobra.Command{
	Use:   "delete",
	Short: "Delete entities from sami-mcp-gateway",
	Annotations: map[string]string{
		"group": string(subCommandGroupAdvanced),
		"order": "5",
	},
}

var deleteUserCmd = &cobra.Command{
	Use:   "user [username]",
	Args:  cobra.ExactArgs(1),
	Short: "Delete a user (Enterprise mode)",
	Long:  "Delete a user from sami-mcp-gateway.\nThis instantly revokes all access of this user.",
	RunE:  runDeleteUser,
}

var deleteToolGroupCmd = &cobra.Command{
	Use:   "group [name]",
	Args:  cobra.ExactArgs(1),
	Short: "Delete a tool group",
	Long: "Delete a tool group from sami-mcp-gateway.\n" +
		"Once you delete a group, its endpoint is no longer available.\n" +
		"So make sure no MCP clients are relying on the endpoint before you delete a group.\n" +
		"NOTE: This command only deletes the group itself, not the tools included in it.\n" +
		"Tools are only deleted when you deregister a MCP server from sami-mcp-gateway.",
	RunE: runDeleteToolGroup,
}

var deletePromptGroupCmd = &cobra.Command{
	Use:   "prompt-group [name]",
	Args:  cobra.ExactArgs(1),
	Short: "Delete a prompt group",
	Long: "Delete a prompt group from sami-mcp-gateway. The dedicated /v0/prompt-groups/... endpoints stop serving that group.\n" +
		"Individual prompts remain registered until you deregister their MCP server or disable the prompt.",
	RunE: runDeletePromptGroup,
}

func init() {
	deleteCmd.AddCommand(deleteUserCmd)
	deleteCmd.AddCommand(deleteToolGroupCmd)
	deleteCmd.AddCommand(deletePromptGroupCmd)

	rootCmd.AddCommand(deleteCmd)
}

func runDeleteUser(cmd *cobra.Command, args []string) error {
	username := args[0]
	if err := apiClient.DeleteUser(username); err != nil {
		return fmt.Errorf("failed to delete the user: %w", err)
	}
	cmd.Printf("User '%s' deleted successfully (if they existed)\n", username)
	return nil
}

func runDeleteToolGroup(cmd *cobra.Command, args []string) error {
	name := args[0]
	if err := apiClient.DeleteToolGroup(name); err != nil {
		return fmt.Errorf("failed to delete the tool group: %w", err)
	}
	cmd.Printf("Tool group '%s' deleted successfully!\n", name)
	return nil
}

func runDeletePromptGroup(cmd *cobra.Command, args []string) error {
	name := args[0]
	if err := apiClient.DeletePromptGroup(name); err != nil {
		return fmt.Errorf("failed to delete the prompt group: %w", err)
	}
	cmd.Printf("Prompt group '%s' deleted successfully!\n", name)
	return nil
}
