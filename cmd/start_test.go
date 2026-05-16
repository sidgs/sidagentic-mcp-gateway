package cmd

import (
	"os"
	"path/filepath"
	"reflect"
	"testing"
	"time"

	"github.com/mcpjungle/mcpjungle/pkg/testhelpers"
	"github.com/mcpjungle/mcpjungle/pkg/version"
)

func TestStartCommandStructure(t *testing.T) {
	t.Run("start command has correct properties", func(t *testing.T) {
		if startServerCmd.Use != "start" {
			t.Errorf("Expected start command Use to be 'start', got %s", startServerCmd.Use)
		}
		if startServerCmd.Short != "Start the MCPJungle server" {
			t.Errorf("Expected start command Short to be 'Start the MCPJungle server', got %s", startServerCmd.Short)
		}
	})

	t.Run("start command has correct annotations", func(t *testing.T) {
		if startServerCmd.Annotations == nil {
			t.Fatal("Start command missing annotations")
		}

		group, hasGroup := startServerCmd.Annotations["group"]
		if !hasGroup {
			t.Fatal("Start command missing 'group' annotation")
		}
		if group != string(subCommandGroupBasic) {
			t.Errorf("Expected start command group to be 'basic', got %s", group)
		}

		order, hasOrder := startServerCmd.Annotations["order"]
		if !hasOrder {
			t.Fatal("Start command missing 'order' annotation")
		}
		if order != "1" {
			t.Errorf("Expected start command order to be '1', got %s", order)
		}
	})
}

func TestStartCommandFlags(t *testing.T) {
	t.Run("start command has port flag", func(t *testing.T) {
		if portFlag := startServerCmd.Flags().Lookup("port"); portFlag == nil {
			t.Fatal("Start command missing 'port' flag")
		} else if portFlag.Usage == "" {
			t.Error("Port flag should have usage description")
		}
	})

	t.Run("start command has enterprise flag", func(t *testing.T) {
		if enterpriseFlag := startServerCmd.Flags().Lookup("enterprise"); enterpriseFlag == nil {
			t.Fatal("Start command missing 'enterprise' flag")
		} else if enterpriseFlag.Usage == "" {
			t.Error("enterprise flag should have usage description")
		}
	})

	t.Run("start command has prod flag", func(t *testing.T) {
		if prodFlag := startServerCmd.Flags().Lookup("prod"); prodFlag == nil {
			t.Fatal("Start command missing 'prod' flag")
		} else if prodFlag.Usage == "" {
			t.Error("prod flag should have usage description")
		}
	})
}

func TestNewProxyServers_AdvertiseCurrentVersion(t *testing.T) {
	mcpProxyServer, sseMcpProxyServer := newProxyServers()

	testhelpers.AssertMCPServerInfo(
		t,
		mcpProxyServer,
		"MCPJungle Proxy MCP Server",
		version.GetVersion(),
	)
	testhelpers.AssertMCPServerInfo(
		t,
		sseMcpProxyServer,
		"MCPJungle Proxy MCP Server for SSE transport",
		version.GetVersion(),
	)
}

// Helper to set and unset env vars for a test
func withEnv(env map[string]string, fn func()) {
	originals := make(map[string]string)
	for k, v := range env {
		originals[k] = os.Getenv(k)
		os.Setenv(k, v)
	}
	fn()
	for k, v := range originals {
		os.Setenv(k, v)
	}
}

// Helper to create a temp file with content
func writeTempFile(t *testing.T, content string) string {
	t.Helper()
	tmp := t.TempDir()
	f := filepath.Join(tmp, "val")
	if err := os.WriteFile(f, []byte(content), 0o600); err != nil {
		t.Fatalf("failed to write temp file: %v", err)
	}
	return f
}

func TestLoadOIDCSettingsFromEnv(t *testing.T) {
	t.Run("nil when all unset", func(t *testing.T) {
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:    "",
			CognitoClientIDEnvVar:     "",
			CognitoClientSecretEnvVar: "",
			CognitoRegionEnvVar:       "",
		}, func() {
			got, err := loadOIDCSettingsFromEnv()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got != nil {
				t.Fatal("expected nil OIDC settings")
			}
		})
	})
	t.Run("error when partial configuration", func(t *testing.T) {
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:    "https://issuer.example/",
			CognitoClientIDEnvVar:     "",
			CognitoClientSecretEnvVar: "",
		}, func() {
			_, err := loadOIDCSettingsFromEnv()
			if err == nil {
				t.Fatal("expected error for partial Cognito OIDC env")
			}
		})
	})
	t.Run("loads full configuration and trims issuer", func(t *testing.T) {
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:    "https://issuer.example/",
			CognitoClientIDEnvVar:     "client-id",
			CognitoClientSecretEnvVar: "secret",
			CognitoRegionEnvVar:       "us-east-1",
		}, func() {
			got, err := loadOIDCSettingsFromEnv()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got.IssuerURL != "https://issuer.example" {
				t.Fatalf("issuer: got %q", got.IssuerURL)
			}
			if got.ClientID != "client-id" || got.ClientSecret != "secret" {
				t.Fatalf("unexpected client id/secret")
			}
			if got.Region != "us-east-1" {
				t.Fatalf("region: got %q", got.Region)
			}
		})
	})
	t.Run("COGNITO_CLIENT_SECRET_FILE when env empty", func(t *testing.T) {
		secretPath := writeTempFile(t, "file-secret-val")
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:              "https://issuer.example/",
			CognitoClientIDEnvVar:               "id",
			CognitoClientSecretEnvVar:           "",
			CognitoClientSecretEnvVar + "_FILE": secretPath,
		}, func() {
			got, err := loadOIDCSettingsFromEnv()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got.ClientSecret != "file-secret-val" {
				t.Fatalf("secret from file: got %q", got.ClientSecret)
			}
		})
	})
	t.Run("OIDC_SCOPES comma-separated; openid prepended", func(t *testing.T) {
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:    "https://issuer.example/",
			CognitoClientIDEnvVar:     "client-id",
			CognitoClientSecretEnvVar: "secret",
			OIDCScopesEnvVar:          "email, profile",
		}, func() {
			got, err := loadOIDCSettingsFromEnv()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			want := []string{"openid", "email", "profile"}
			if !reflect.DeepEqual(got.Scopes, want) {
				t.Fatalf("scopes: got %#v want %#v", got.Scopes, want)
			}
		})
	})
	t.Run("OIDC_SCOPES keeps single openid", func(t *testing.T) {
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:    "https://issuer.example/",
			CognitoClientIDEnvVar:     "id",
			CognitoClientSecretEnvVar: "secret",
			OIDCScopesEnvVar:          "openid email phone",
		}, func() {
			got, err := loadOIDCSettingsFromEnv()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			want := []string{"openid", "email", "phone"}
			if !reflect.DeepEqual(got.Scopes, want) {
				t.Fatalf("scopes: got %#v want %#v", got.Scopes, want)
			}
		})
	})
	t.Run("OIDC_SCOPES empty tokens error", func(t *testing.T) {
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:    "https://issuer.example/",
			CognitoClientIDEnvVar:     "id",
			CognitoClientSecretEnvVar: "secret",
			OIDCScopesEnvVar:          " , \t ,",
		}, func() {
			_, err := loadOIDCSettingsFromEnv()
			if err == nil {
				t.Fatal("expected error")
			}
		})
	})
	t.Run("Scopes nil when OIDC_SCOPES unset", func(t *testing.T) {
		withEnv(map[string]string{
			CognitoIssuerURLEnvVar:    "https://issuer.example/",
			CognitoClientIDEnvVar:     "id",
			CognitoClientSecretEnvVar: "secret",
			OIDCScopesEnvVar:          "",
		}, func() {
			got, err := loadOIDCSettingsFromEnv()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got.Scopes != nil {
				t.Fatalf("expected nil Scopes, got %#v", got.Scopes)
			}
		})
	})
}

func TestGetOIDCSessionTTL(t *testing.T) {
	t.Run("defaults to 3 days", func(t *testing.T) {
		withEnv(map[string]string{
			OIDCSessionTTLEnvVar: "",
		}, func() {
			d, err := getOIDCSessionTTL()
			if err != nil {
				t.Fatalf("unexpected err: %v", err)
			}
			if d != defaultOIDCSessionTTLSeconds*time.Second {
				t.Fatalf("got %v", d)
			}
		})
	})
	t.Run("parses positive seconds", func(t *testing.T) {
		withEnv(map[string]string{
			OIDCSessionTTLEnvVar: "3600",
		}, func() {
			d, err := getOIDCSessionTTL()
			if err != nil {
				t.Fatalf("unexpected err: %v", err)
			}
			if d != time.Hour {
				t.Fatalf("got %v", d)
			}
		})
	})
	t.Run("rejects non-positive", func(t *testing.T) {
		for _, v := range []string{"0", "-5", "nope"} {
			withEnv(map[string]string{
				OIDCSessionTTLEnvVar: v,
			}, func() {
				_, err := getOIDCSessionTTL()
				if err == nil {
					t.Fatalf("expected error for %q", v)
				}
			})
		}
	})
}

func TestNewRedisClientFromEnv(t *testing.T) {
	t.Run("nil when redis unset", func(t *testing.T) {
		withEnv(map[string]string{
			RedisURLEnvVar:  "",
			RedisAddrEnvVar: "",
		}, func() {
			c, err := newRedisClientFromEnv()
			if err != nil {
				t.Fatal(err)
			}
			if c != nil {
				t.Fatal("expected nil client")
			}
		})
	})
	t.Run("builds client from REDIS_URL", func(t *testing.T) {
		withEnv(map[string]string{
			RedisURLEnvVar:  "redis://:unused@localhost:6380/3",
			RedisAddrEnvVar: "",
		}, func() {
			c, err := newRedisClientFromEnv()
			if err != nil {
				t.Fatal(err)
			}
			defer func() { _ = c.Close() }()
			if c == nil {
				t.Fatal("expected redis client")
			}
			opts := c.Options()
			if opts.Addr != "localhost:6380" || opts.DB != 3 {
				t.Fatalf("unexpected client options Addr=%s DB=%d", opts.Addr, opts.DB)
			}
		})
	})
}

func TestGetPostgresDSN(t *testing.T) {
	baseEnv := map[string]string{
		PostgresHostEnvVar:     "localhost",
		PostgresPortEnvVar:     "5433",
		PostgresUserEnvVar:     "user",
		PostgresPasswordEnvVar: "pass",
		PostgresDBEnvVar:       "mydb",
	}

	t.Run("returns false if POSTGRES_HOST is not set", func(t *testing.T) {
		withEnv(map[string]string{
			PostgresHostEnvVar: "",
		}, func() {
			dsn, ok, err := getPostgresDSN()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if ok {
				t.Errorf("expected ok=false, got true")
			}
			if dsn != "" {
				t.Errorf("expected empty dsn, got %q", dsn)
			}
		})
	})

	t.Run("uses all env vars", func(t *testing.T) {
		withEnv(baseEnv, func() {
			dsn, ok, err := getPostgresDSN()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !ok {
				t.Errorf("expected ok=true, got false")
			}
			want := "postgres://user:pass@localhost:5433/mydb"
			if dsn != want {
				t.Errorf("expected dsn %q, got %q", want, dsn)
			}
		})
	})

	t.Run("uses defaults for missing optional vars", func(t *testing.T) {
		withEnv(map[string]string{
			PostgresHostEnvVar: "host",
		}, func() {
			dsn, ok, err := getPostgresDSN()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !ok {
				t.Errorf("expected ok=true, got false")
			}
			want := "postgres://postgres:@host:5432/postgres"
			if dsn != want {
				t.Errorf("expected dsn %q, got %q", want, dsn)
			}
		})
	})

	t.Run("uses _FILE env for DB, user, password", func(t *testing.T) {
		dbFile := writeTempFile(t, "filedb")
		userFile := writeTempFile(t, "fileuser")
		passFile := writeTempFile(t, "filepass")
		withEnv(map[string]string{
			PostgresHostEnvVar:               "host",
			PostgresDBEnvVar + "_FILE":       dbFile,
			PostgresUserEnvVar + "_FILE":     userFile,
			PostgresPasswordEnvVar + "_FILE": passFile,
		}, func() {
			dsn, ok, err := getPostgresDSN()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !ok {
				t.Errorf("expected ok=true, got false")
			}
			want := "postgres://fileuser:filepass@host:5432/filedb"
			if dsn != want {
				t.Errorf("expected dsn %q, got %q", want, dsn)
			}
		})
	})

	t.Run("env var takes precedence over _FILE", func(t *testing.T) {
		dbFile := writeTempFile(t, "filedb")
		withEnv(map[string]string{
			PostgresHostEnvVar:         "host",
			PostgresDBEnvVar:           "envdb",
			PostgresDBEnvVar + "_FILE": dbFile,
		}, func() {
			dsn, ok, err := getPostgresDSN()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !ok {
				t.Errorf("expected ok=true, got false")
			}
			want := "postgres://postgres:@host:5432/envdb"
			if dsn != want {
				t.Errorf("expected dsn %q, got %q", want, dsn)
			}
		})
	})

	t.Run("returns error if _FILE cannot be read", func(t *testing.T) {
		withEnv(map[string]string{
			PostgresHostEnvVar:         "host",
			PostgresDBEnvVar + "_FILE": "/nonexistent/file",
		}, func() {
			_, ok, err := getPostgresDSN()
			if err == nil {
				t.Fatal("expected error, got nil")
			}
			if ok {
				t.Errorf("expected ok=false, got true")
			}
		})
	})

	t.Run("trims whitespace from _FILE values", func(t *testing.T) {
		dbFile := writeTempFile(t, "  dbwithspace \n")
		withEnv(map[string]string{
			PostgresHostEnvVar:         "host",
			PostgresDBEnvVar + "_FILE": dbFile,
		}, func() {
			dsn, ok, err := getPostgresDSN()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !ok {
				t.Errorf("expected ok=true, got false")
			}
			want := "postgres://postgres:@host:5432/dbwithspace"
			if dsn != want {
				t.Errorf("expected dsn %q, got %q", want, dsn)
			}
		})
	})

	t.Run("empty password is allowed", func(t *testing.T) {
		withEnv(map[string]string{
			PostgresHostEnvVar: "host",
			PostgresUserEnvVar: "user",
		}, func() {
			dsn, ok, err := getPostgresDSN()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if !ok {
				t.Errorf("expected ok=true, got false")
			}
			want := "postgres://user:@host:5432/postgres"
			if dsn != want {
				t.Errorf("expected dsn %q, got %q", want, dsn)
			}
		})
	})
}

func TestGetMcpServerInitReqTimeout(t *testing.T) {
	t.Run("returns default when unset or empty", func(t *testing.T) {
		withEnv(map[string]string{
			McpServerInitReqTimeoutSecEnvVar: "",
		}, func() {
			v, err := getMcpServerInitReqTimeout()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if v != McpServerInitRequestTimeoutSecondsDefault {
				t.Fatalf("expected default %d, got %d", McpServerInitRequestTimeoutSecondsDefault, v)
			}
		})
	})

	t.Run("parses valid integer value", func(t *testing.T) {
		withEnv(map[string]string{
			McpServerInitReqTimeoutSecEnvVar: "5",
		}, func() {
			v, err := getMcpServerInitReqTimeout()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if v != 5 {
				t.Fatalf("expected 5, got %d", v)
			}
		})
	})

	t.Run("trims whitespace before parsing", func(t *testing.T) {
		withEnv(map[string]string{
			McpServerInitReqTimeoutSecEnvVar: "  10 \n",
		}, func() {
			v, err := getMcpServerInitReqTimeout()
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if v != 10 {
				t.Fatalf("expected 10, got %d", v)
			}
		})
	})

	t.Run("returns error for non-integer", func(t *testing.T) {
		withEnv(map[string]string{
			McpServerInitReqTimeoutSecEnvVar: "abc",
		}, func() {
			_, err := getMcpServerInitReqTimeout()
			if err == nil {
				t.Fatal("expected error for non-integer value, got nil")
			}
		})
	})

	t.Run("returns error for values less than 1", func(t *testing.T) {
		cases := []string{"0", "-1"}
		for _, c := range cases {
			withEnv(map[string]string{
				McpServerInitReqTimeoutSecEnvVar: c,
			}, func() {
				_, err := getMcpServerInitReqTimeout()
				if err == nil {
					t.Fatalf("expected error for value %q, got nil", c)
				}
			})
		}
	})
}
