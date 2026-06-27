// Package dbconfig resolves Postgres connection settings from environment variables.
package dbconfig

import (
	"fmt"
	"net/url"
	"os"
)

const (
	// DatabaseURLEnvVar is the primary Postgres connection string env var.
	DatabaseURLEnvVar = "DATABASE_URL"

	postgresHostEnvVar     = "POSTGRES_HOST"
	postgresPortEnvVar     = "POSTGRES_PORT"
	postgresUserEnvVar     = "POSTGRES_USER"
	postgresPasswordEnvVar = "POSTGRES_PASSWORD"
	postgresDBEnvVar       = "POSTGRES_DB"
)

// ResolveDSN returns a Postgres DSN from DATABASE_URL or POSTGRES_* env vars.
func ResolveDSN() (string, error) {
	dsn := os.Getenv(DatabaseURLEnvVar)
	if dsn != "" {
		return dsn, nil
	}
	pgDSN, ok, err := resolvePostgresDSN()
	if err != nil {
		return "", err
	}
	if !ok {
		return "", fmt.Errorf("database not configured: set %s or POSTGRES_HOST (and related POSTGRES_* vars)", DatabaseURLEnvVar)
	}
	return pgDSN, nil
}

func resolvePostgresDSN() (string, bool, error) {
	host := os.Getenv(postgresHostEnvVar)
	if host == "" {
		return "", false, nil
	}
	port := os.Getenv(postgresPortEnvVar)
	if port == "" {
		port = "5432"
	}
	dbName, err := envOrFile(postgresDBEnvVar)
	if err != nil {
		return "", false, fmt.Errorf("failed to get postgres DB name: %w", err)
	}
	if dbName == "" {
		dbName = "postgres"
	}
	pgUser, err := envOrFile(postgresUserEnvVar)
	if err != nil {
		return "", false, fmt.Errorf("failed to get postgres user: %w", err)
	}
	if pgUser == "" {
		pgUser = "postgres"
	}
	password, err := envOrFile(postgresPasswordEnvVar)
	if err != nil {
		return "", false, fmt.Errorf("failed to get postgres password: %w", err)
	}
	dsn := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		url.QueryEscape(pgUser),
		url.QueryEscape(password),
		host,
		port,
		url.QueryEscape(dbName),
	)
	return dsn, true, nil
}

func envOrFile(key string) (string, error) {
	if v := os.Getenv(key); v != "" {
		return v, nil
	}
	fileKey := key + "_FILE"
	path := os.Getenv(fileKey)
	if path == "" {
		return "", nil
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return "", fmt.Errorf("read %s: %w", fileKey, err)
	}
	return string(data), nil
}

// FlywayJDBCURL converts a postgres:// DSN to a Flyway JDBC URL and credentials.
func FlywayJDBCURL(dsn string) (jdbcURL, user, password string, err error) {
	u, err := url.Parse(dsn)
	if err != nil {
		return "", "", "", fmt.Errorf("parse database URL: %w", err)
	}
	if u.Scheme != "postgres" && u.Scheme != "postgresql" {
		return "", "", "", fmt.Errorf("unsupported database URL scheme %q (Postgres required)", u.Scheme)
	}
	user = u.User.Username()
	password, _ = u.User.Password()
	host := u.Hostname()
	port := u.Port()
	if port == "" {
		port = "5432"
	}
	dbName := u.Path
	if len(dbName) > 0 && dbName[0] == '/' {
		dbName = dbName[1:]
	}
	if dbName == "" {
		dbName = "postgres"
	}
	jdbcURL = fmt.Sprintf("jdbc:postgresql://%s:%s/%s", host, port, dbName)
	if sslmode := u.Query().Get("sslmode"); sslmode != "" {
		jdbcURL += "?sslmode=" + url.QueryEscape(sslmode)
	}
	return jdbcURL, user, password, nil
}
