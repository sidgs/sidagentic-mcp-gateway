package migrations

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"testing"
	"time"

	"sami.io/mcpgateway/internal/db"
	"sami.io/mcpgateway/internal/dbconfig"
	"github.com/testcontainers/testcontainers-go"
	"github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
	gormpostgres "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// SetupTestDB starts Postgres, applies Flyway migrations, and returns a GORM handle.
func SetupTestDB(t *testing.T) (*gorm.DB, func()) {
	t.Helper()
	if dsn := os.Getenv("TEST_DATABASE_URL"); dsn != "" {
		if err := CommandWithDSN(dsn, "migrate"); err != nil {
			t.Fatalf("flyway migrate: %v", err)
		}
		gdb, err := db.NewDBConnection(dsn)
		if err != nil {
			t.Fatalf("connect test database: %v", err)
		}
		return gdb, func() {}
	}
	ctx := context.Background()
	pgContainer, err := postgres.Run(ctx,
		"postgres:17",
		postgres.WithDatabase("test"),
		postgres.WithUsername("test"),
		postgres.WithPassword("test"),
		testcontainers.WithWaitStrategy(
			wait.ForLog("database system is ready to accept connections").
				WithOccurrence(2).
				WithStartupTimeout(60*time.Second),
		),
	)
	if err != nil {
		t.Fatalf("start postgres container: %v", err)
	}
	cleanup := func() {
		_ = pgContainer.Terminate(ctx)
	}
	host, err := pgContainer.Host(ctx)
	if err != nil {
		cleanup()
		t.Fatalf("postgres host: %v", err)
	}
	port, err := pgContainer.MappedPort(ctx, "5432/tcp")
	if err != nil {
		cleanup()
		t.Fatalf("postgres port: %v", err)
	}
	dsn := fmt.Sprintf("postgres://test:test@%s:%s/test?sslmode=disable", host, port.Port())
	if err := runFlywayDocker(ctx, dsn); err != nil {
		cleanup()
		t.Fatalf("flyway migrate: %v", err)
	}
	gdb, err := gorm.Open(gormpostgres.Open(dsn), &gorm.Config{})
	if err != nil {
		cleanup()
		t.Fatalf("connect migrated database: %v", err)
	}
	return gdb, cleanup
}

// CommandWithDSN runs Flyway against an explicit Postgres DSN.
func CommandWithDSN(dsn, command string, args ...string) error {
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
	if _, err := exec.LookPath("flyway"); err == nil {
		cmd := exec.Command("flyway", cmdArgs...)
		cmd.Env = append(os.Environ(),
			"FLYWAY_URL="+jdbcURL,
			"FLYWAY_USER="+user,
			"FLYWAY_PASSWORD="+password,
		)
		out, runErr := cmd.CombinedOutput()
		if len(out) > 0 {
			fmt.Print(string(out))
		}
		return runErr
	}
	return runFlywayDocker(context.Background(), dsn, append([]string{command}, args...)...)
}

func runFlywayDocker(ctx context.Context, dsn string, flywayArgs ...string) error {
	jdbcURL, user, password, err := dbconfig.FlywayJDBCURL(dsn)
	if err != nil {
		return err
	}
	root, err := repoRoot()
	if err != nil {
		return err
	}
	if len(flywayArgs) == 0 {
		flywayArgs = []string{"migrate"}
	}
	args := []string{
		"run", "--rm",
		"-v", filepath.Join(root, "db/migration") + ":/flyway/sql",
		"-v", filepath.Join(root, "db/flyway.conf") + ":/flyway/conf/flyway.conf",
		"-e", "FLYWAY_URL=" + jdbcURL,
		"-e", "FLYWAY_USER=" + user,
		"-e", "FLYWAY_PASSWORD=" + password,
		"-e", "FLYWAY_LOCATIONS=filesystem:/flyway/sql",
		"flyway/flyway:10-alpine",
		"-configFiles=/flyway/conf/flyway.conf",
	}
	args = append(args, flywayArgs...)
	cmd := exec.CommandContext(ctx, "docker", args...)
	out, err := cmd.CombinedOutput()
	if len(out) > 0 {
		fmt.Print(string(out))
	}
	if err != nil {
		return fmt.Errorf("docker flyway: %w", err)
	}
	return nil
}

func repoRoot() (string, error) {
	wd, err := os.Getwd()
	if err != nil {
		return "", err
	}
	dir := wd
	for {
		if _, err := os.Stat(filepath.Join(dir, "go.mod")); err == nil {
			return dir, nil
		}
		parent := filepath.Dir(dir)
		if parent == dir {
			return wd, nil
		}
		dir = parent
	}
}
