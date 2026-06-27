package cmd

import (
	"fmt"

	"sami.io/mcpgateway/internal/migrations"
	"github.com/spf13/cobra"
)

var migrateBaselineVersion int

var migrateCmd = &cobra.Command{
	Use:   "migrate",
	Short: "Run Flyway database migrations",
	Long: `Apply versioned SQL migrations using the Flyway CLI (must be on PATH).

Requires DATABASE_URL or POSTGRES_* environment variables.

For production/K8s, use the Dockerfile.migrate image as a Job instead of this command.`,
	Annotations: map[string]string{
		"group": string(subCommandGroupAdvanced),
		"order": "15",
	},
}

var migrateRunCmd = &cobra.Command{
	Use:   "run",
	Short: "Apply pending migrations",
	RunE: func(cmd *cobra.Command, _ []string) error {
		if err := migrations.Migrate(); err != nil {
			return err
		}
		fmt.Println("migrations applied")
		return nil
	},
}

var migrateInfoCmd = &cobra.Command{
	Use:   "info",
	Short: "Show migration status",
	RunE: func(_ *cobra.Command, _ []string) error {
		return migrations.Info()
	},
}

var migrateValidateCmd = &cobra.Command{
	Use:   "validate",
	Short: "Validate applied migrations",
	RunE: func(_ *cobra.Command, _ []string) error {
		return migrations.Validate()
	},
}

var migrateBaselineCmd = &cobra.Command{
	Use:   "baseline",
	Short: "Baseline an existing database at a version without running migrations",
	Long: `Mark an existing schema as already migrated up to a version.
Use once when cutting over from GORM AutoMigrate, e.g. --version 1.`,
	RunE: func(_ *cobra.Command, _ []string) error {
		if migrateBaselineVersion < 1 {
			return fmt.Errorf("--version must be >= 1")
		}
		return migrations.Baseline(migrateBaselineVersion)
	},
}

func init() {
	migrateBaselineCmd.Flags().IntVar(&migrateBaselineVersion, "version", 1, "baseline version")
	migrateCmd.AddCommand(migrateRunCmd)
	migrateCmd.AddCommand(migrateInfoCmd)
	migrateCmd.AddCommand(migrateValidateCmd)
	migrateCmd.AddCommand(migrateBaselineCmd)
	rootCmd.AddCommand(migrateCmd)
}
