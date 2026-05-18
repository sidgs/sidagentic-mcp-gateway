package cmd

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/mcpjungle/mcpjungle/internal/configresolver"
	"github.com/mcpjungle/mcpjungle/pkg/cliapp"
	"github.com/mcpjungle/mcpjungle/pkg/types"
	"github.com/spf13/cobra"
)

var createCmd = &cobra.Command{
	Use:   "create",
	Short: "Create entities in mcpjungle",
	Annotations: map[string]string{
		"group": string(subCommandGroupAdvanced),
		"order": "4",
	},
}

var createUserCmd = &cobra.Command{
	Use: "user [username] | --conf <file>",
	Args: func(cmd *cobra.Command, args []string) error {
		// if a config file is provided, no positional args are expected
		if createUserCmdConfigFilePath != "" {
			return cobra.ExactArgs(0)(cmd, args)
		}
		return cobra.ExactArgs(1)(cmd, args)
	},
	Short: "Create a new user (Enterprise mode)",
	Long: "Create a new standard user in MCPJungle.\n" +
		"A user can make authenticated requests to the MCPJungle API server and perform limited actions like:\n" +
		"- List and view MCP servers & tools\n" +
		"- Check tool usage and invoke them\n\n" +
		"This operation generates a unique access token for the user to use when making requests.\n" +
		"It is mandatory to either specify the username or a config file.\n" +
		"This command is only available in Enterprise mode.",
	RunE: runCreateUser,
}

var createToolGroupCmd = &cobra.Command{
	Use:   "group --conf <file>",
	Short: "Create a Group of MCP Tools",
	Long: "Create a new Group of MCP Tools by supplying a configuration file.\n" +
		"A group lets you expose only a handful of Tools that you choose.\n" +
		"This limits the number of tools your MCP client sees, increasing calling accuracy of the LLM.\n\n" +
		"You can include tools by:\n" +
		"  - Specifying individual tools with 'included_tools'\n" +
		"  - Including all tools from servers with 'included_servers'\n" +
		"  - Excluding specific tools with 'excluded_tools'\n\n" +
		"Once you create a tool group, it is accessible as a streamable http MCP server at the following endpoint:\n" +
		"    /v0/groups/{group_name}/mcp\n",
	RunE: runCreateToolGroup,
}

var createPromptGroupCmd = &cobra.Command{
	Use:   "prompt-group --conf <file>",
	Short: "Create a group of MCP prompts",
	Long: "Create a prompt group that exposes a subset of MCP prompts at a dedicated URL.\n\n" +
		"Configure members with 'included_prompts', 'included_servers', and optional 'excluded_prompts'.\n\n" +
		"Clients connect at:\n" +
		"    /v0/prompt-groups/{group_name}/mcp\n",
	RunE: runCreatePromptGroup,
}

var (
	createUserCmdAccessToken    string
	createUserCmdConfigFilePath string

	createToolGroupConfigFilePath string

	createPromptGroupConfigFilePath string
)

func init() {
	createUserCmd.Flags().StringVar(
		&createUserCmdAccessToken,
		"access-token",
		"",
		"Custom access token for the user. If not provided, a random token will be generated.",
	)
	createUserCmd.Flags().StringVarP(
		&createUserCmdConfigFilePath,
		"conf",
		"c",
		"",
		"Path to a JSON configuration file for the user.\n"+
			"If provided, the user will be created using the configuration in the file.\n"+
			"All other flags will be ignored.",
	)

	createToolGroupCmd.Flags().StringVarP(
		&createToolGroupConfigFilePath,
		"conf",
		"c",
		"",
		"Path to a JSON configuration file for the Group",
	)
	_ = createToolGroupCmd.MarkFlagRequired("conf")

	createPromptGroupCmd.Flags().StringVarP(
		&createPromptGroupConfigFilePath,
		"conf",
		"c",
		"",
		"Path to a JSON configuration file for the prompt group",
	)
	_ = createPromptGroupCmd.MarkFlagRequired("conf")

	createCmd.AddCommand(createUserCmd)
	createCmd.AddCommand(createToolGroupCmd)
	createCmd.AddCommand(createPromptGroupCmd)

	rootCmd.AddCommand(createCmd)
}

func runCreateUser(cmd *cobra.Command, args []string) error {
	user := &types.CreateOrUpdateUserRequest{}

	if createUserCmdConfigFilePath == "" {
		// no config file provided, use command line args
		user = &types.CreateOrUpdateUserRequest{
			Username:    args[0],
			AccessToken: createUserCmdAccessToken,
		}
	} else {
		// config file provided, ignore command line args and read from file
		config, err := readUserConfig(createUserCmdConfigFilePath)
		if err != nil {
			return err
		}
		if config.Username == "" {
			return fmt.Errorf("config file must define a username")
		}
		accessToken, err := resolveAccessTokenFromConfig(config.AccessToken, config.AccessTokenRef)
		if err != nil {
			return err
		}
		if accessToken == "" {
			return fmt.Errorf("config file must supply a custom access token")
		}
		user = &types.CreateOrUpdateUserRequest{
			Username:    config.Username,
			AccessToken: accessToken,
		}
	}
	resp, err := apiClient.CreateUser(user)
	if err != nil {
		return err
	}
	if resp.AccessToken == "" {
		return fmt.Errorf("server returned an empty access token, this was unexpected")
	}

	cmd.Printf("User '%s' created successfully\n", user.Username)
	cmd.Println("The user should now run the following command to log into mcpjungle:")
	cmd.Println()
	cmd.Printf("    %s login %s\n", cliapp.ExecutableName, resp.AccessToken)
	cmd.Println()

	return nil
}

func runCreateToolGroup(cmd *cobra.Command, args []string) error {
	group, err := readToolGroupConfig(createToolGroupConfigFilePath)
	if err != nil {
		return fmt.Errorf("failed to read config file %s: %w", createToolGroupConfigFilePath, err)
	}

	resp, err := apiClient.CreateToolGroup(group)
	if err != nil {
		return fmt.Errorf("failed to create tool group: %w", err)
	}

	cmd.Printf("Tool Group %s created successfully\n", group.Name)
	cmd.Print("It is now accessible at the following streamable http endpoint:\n\n")
	cmd.Println("    " + resp.StreamableHTTPEndpoint + "\n")

	cmd.Print("Tools using the SSE (server-sent events) transport are accessible at:\n\n")
	cmd.Println("    " + resp.SSEEndpoint)
	cmd.Println("    " + resp.SSEMessageEndpoint + "\n")

	return nil
}

func runCreatePromptGroup(cmd *cobra.Command, args []string) error {
	group, err := readPromptGroupConfig(createPromptGroupConfigFilePath)
	if err != nil {
		return fmt.Errorf("failed to read config file %s: %w", createPromptGroupConfigFilePath, err)
	}

	resp, err := apiClient.CreatePromptGroup(group)
	if err != nil {
		return fmt.Errorf("failed to create prompt group: %w", err)
	}

	cmd.Printf("Prompt group %s created successfully\n", group.Name)
	cmd.Print("Streamable HTTP endpoint:\n\n")
	cmd.Println("    " + resp.StreamableHTTPEndpoint + "\n")
	cmd.Print("SSE endpoints:\n\n")
	cmd.Println("    " + resp.SSEEndpoint)
	cmd.Println("    " + resp.SSEMessageEndpoint + "\n")
	return nil
}

func readPromptGroupConfig(filePath string) (*types.PromptGroup, error) {
	var input types.PromptGroup
	data, err := os.ReadFile(filePath)
	if err != nil {
		return &input, fmt.Errorf("failed to read config file %s: %w", filePath, err)
	}
	if err := json.Unmarshal(data, &input); err != nil {
		return &input, fmt.Errorf("failed to parse config file: %w", err)
	}
	if err := configresolver.ResolveEnvVars(&input); err != nil {
		return &input, fmt.Errorf("failed to resolve config file environment variables: %w", err)
	}
	return &input, nil
}

func readToolGroupConfig(filePath string) (*types.ToolGroup, error) {
	var input types.ToolGroup

	data, err := os.ReadFile(filePath)
	if err != nil {
		return &input, fmt.Errorf("failed to read config file %s: %w", filePath, err)
	}
	if err := json.Unmarshal(data, &input); err != nil {
		return &input, fmt.Errorf("failed to parse config file: %w", err)
	}
	if err := configresolver.ResolveEnvVars(&input); err != nil {
		return &input, fmt.Errorf("failed to resolve config file environment variables: %w", err)
	}

	return &input, nil
}

// readUserConfig reads the user configuration from a JSON file.
func readUserConfig(filePath string) (*types.UserConfig, error) {
	var input types.UserConfig

	data, err := os.ReadFile(filePath)
	if err != nil {
		return &input, fmt.Errorf("failed to read config file %s: %w", filePath, err)
	}
	if err := json.Unmarshal(data, &input); err != nil {
		return &input, fmt.Errorf("failed to parse config file: %w", err)
	}
	if err := configresolver.ResolveEnvVars(&input); err != nil {
		return &input, fmt.Errorf("failed to resolve config file environment variables: %w", err)
	}

	return &input, nil
}

// parseAllowList parses a comma-separated string of allowed MCP servers into a slice.
func parseAllowList(input string, cmd *cobra.Command) []string {
	allowList := make([]string, 0)
	for _, s := range strings.Split(input, ",") {
		trimmed := strings.TrimSpace(s)
		if trimmed != "" {
			allowList = append(allowList, trimmed)
		}
		if trimmed == types.AllowAllMcpServers {
			warnAllowAll(cmd)
		}
	}

	return allowList
}

// resolveAccessTokenFromConfig resolves the access token from the provided config.
// Precedence:
// 1. Direct access token string
// 2. Environment variable specified in accessTokenRef.Env
// 3. File specified in accessTokenRef.File
// If none are provided, returns an empty string.
func resolveAccessTokenFromConfig(accessToken string, accessTokenRef types.AccessTokenRef) (string, error) {
	if accessToken != "" {
		return accessToken, nil
	}

	if accessTokenRef.Env != "" {
		value, ok := os.LookupEnv(accessTokenRef.Env)
		if ok {
			trimmed := strings.TrimSpace(value)
			if trimmed != "" {
				return trimmed, nil
			}
		}
		if accessTokenRef.File == "" {
			return "", fmt.Errorf("environment variable %s is not set or empty", accessTokenRef.Env)
		}
	}

	if accessTokenRef.File != "" {
		data, err := os.ReadFile(accessTokenRef.File)
		if err != nil {
			return "", fmt.Errorf("failed to read access token file %s: %w", accessTokenRef.File, err)
		}
		trimmed := strings.TrimSpace(string(data))
		if trimmed == "" {
			return "", fmt.Errorf("access token file %s is empty", accessTokenRef.File)
		}
		return trimmed, nil
	}

	return "", nil
}

// warnAllowAll displays a warning message about using a wildcard in the allow list.
func warnAllowAll(cmd *cobra.Command) {
	cmd.Println("NOTE: This client will have access to all MCP Servers because a wildcard is used.")
	cmd.Println("This practice is highly discouraged!")
	cmd.Println()
}
