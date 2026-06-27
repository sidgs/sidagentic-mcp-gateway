// Package migrations runs Flyway database migrations for SAMI MCP Gateway.
package migrations

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"sami.io/mcpgateway/internal/dbconfig"
)

const defaultFlywayConf = "db/flyway.conf"

// Command runs a Flyway CLI command (migrate, info, validate, baseline, ...).
func Command(command string, args ...string) error {
	dsn, err := dbconfig.ResolveDSN()
	if err != nil {
		return err
	}
	jdbcURL, user, password, err := dbconfig.FlywayJDBCURL(dsn)
	if err != nil {
		return err
	}
	confPath, err := flywayConfigPath()
	if err != nil {
		return err
	}
	cmdArgs := []string{"-configFiles=" + confPath, command}
	cmdArgs = append(cmdArgs, args...)
	cmd := exec.Command("flyway", cmdArgs...)
	cmd.Env = append(os.Environ(),
		"FLYWAY_URL="+jdbcURL,
		"FLYWAY_USER="+user,
		"FLYWAY_PASSWORD="+password,
	)
	out, err := cmd.CombinedOutput()
	if len(out) > 0 {
		fmt.Print(string(out))
	}
	if err != nil {
		return fmt.Errorf("flyway %s: %w", command, err)
	}
	return nil
}

// Migrate applies pending Flyway migrations.
func Migrate() error {
	return Command("migrate")
}

// Info prints Flyway migration status.
func Info() error {
	return Command("info")
}

// Validate checks applied migrations against available scripts.
func Validate() error {
	return Command("validate")
}

// Baseline marks an existing database at the given version without running migrations.
func Baseline(version int) error {
	return Command("baseline", fmt.Sprintf("-baselineVersion=%d", version))
}

func flywayConfigPath() (string, error) {
	if p := strings.TrimSpace(os.Getenv("FLYWAY_CONFIG")); p != "" {
		return p, nil
	}
	wd, err := os.Getwd()
	if err != nil {
		return defaultFlywayConf, nil
	}
	candidate := filepath.Join(wd, defaultFlywayConf)
	if _, err := os.Stat(candidate); err == nil {
		return candidate, nil
	}
	return defaultFlywayConf, nil
}
