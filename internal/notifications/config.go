package notifications

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

const (
	EnvNotificationsEnabled       = "NOTIFICATIONS_ENABLED"
	EnvNotificationsKafkaTopic    = "NOTIFICATIONS_KAFKA_TOPIC"
	EnvNotificationsAppName       = "NOTIFICATIONS_APP_NAME"
	EnvNotificationsFromEmail     = "NOTIFICATIONS_FROM_EMAIL"
	EnvNotificationsDashboardURL  = "NOTIFICATIONS_DASHBOARD_BASE_URL"
	EnvKafkaBootstrapServers      = "KAFKA_BOOTSTRAP_SERVERS"
	EnvKafkaSecurityProtocol      = "KAFKA_SECURITY_PROTOCOL"
	EnvKafkaSASLMechanisms        = "KAFKA_SASL_MECHANISMS"
	EnvKafkaSASLUsername          = "KAFKA_SASL_USERNAME"
	EnvKafkaSASLPassword          = "KAFKA_SASL_PASSWORD"
	EnvKafkaSASLPasswordFile      = "KAFKA_SASL_PASSWORD_FILE"
	EnvKafkaClientID              = "KAFKA_CLIENT_ID"
	EnvKafkaSessionTimeoutMS      = "KAFKA_SESSION_TIMEOUT_MS"
	EnvKafkaConfigFile            = "KAFKA_CONFIG_FILE"
)

// Config holds notification and Kafka producer settings.
type Config struct {
	Enabled       bool
	Topic         string
	AppName       string
	FromEmail     string
	DashboardURL  string // full URL including #/ hash route (see NOTIFICATIONS_DASHBOARD_BASE_URL)
	Bootstrap     string
	SecurityProto string
	SASLMechanism string
	SASLUsername  string
	SASLPassword  string
	ClientID      string
	SessionTimeoutMS int
}

// LoadConfigFromEnv reads notification settings from environment variables.
func LoadConfigFromEnv(parseBool func(string, bool) bool) (Config, error) {
	cfg := Config{
		Enabled:       parseBool(EnvNotificationsEnabled, false),
		Topic:         envDefault(EnvNotificationsKafkaTopic, "notifications"),
		AppName:       envDefault(EnvNotificationsAppName, "sami-mcp-gateway"),
		FromEmail:     strings.TrimSpace(os.Getenv(EnvNotificationsFromEmail)),
		DashboardURL:  strings.TrimSpace(os.Getenv(EnvNotificationsDashboardURL)),
		SecurityProto: envDefault(EnvKafkaSecurityProtocol, "SASL_SSL"),
		SASLMechanism: envDefault(EnvKafkaSASLMechanisms, "PLAIN"),
		SessionTimeoutMS: 45000,
	}

	if raw := strings.TrimSpace(os.Getenv(EnvKafkaSessionTimeoutMS)); raw != "" {
		ms, err := strconv.Atoi(raw)
		if err != nil || ms < 1 {
			return cfg, fmt.Errorf("invalid %s=%q", EnvKafkaSessionTimeoutMS, raw)
		}
		cfg.SessionTimeoutMS = ms
	}

	if path := strings.TrimSpace(os.Getenv(EnvKafkaConfigFile)); path != "" {
		if err := mergePropertiesFile(&cfg, path); err != nil {
			return cfg, err
		}
	}

	if v := strings.TrimSpace(os.Getenv(EnvKafkaBootstrapServers)); v != "" {
		cfg.Bootstrap = v
	}
	if v := strings.TrimSpace(os.Getenv(EnvKafkaSASLUsername)); v != "" {
		cfg.SASLUsername = v
	}
	pw, err := envOrFile(EnvKafkaSASLPassword, EnvKafkaSASLPasswordFile)
	if err != nil {
		return cfg, err
	}
	if pw != "" {
		cfg.SASLPassword = pw
	}
	if v := strings.TrimSpace(os.Getenv(EnvKafkaClientID)); v != "" {
		cfg.ClientID = v
	}

	return cfg, nil
}

// ValidateForEnabled returns an error when required Kafka settings are missing.
func (c Config) ValidateForEnabled() error {
	if !c.Enabled {
		return nil
	}
	if c.Bootstrap == "" {
		return fmt.Errorf("%s is required when %s=true", EnvKafkaBootstrapServers, EnvNotificationsEnabled)
	}
	if c.SASLUsername == "" {
		return fmt.Errorf("%s is required when %s=true", EnvKafkaSASLUsername, EnvNotificationsEnabled)
	}
	if c.SASLPassword == "" {
		return fmt.Errorf("%s or %s is required when %s=true", EnvKafkaSASLPassword, EnvKafkaSASLPasswordFile, EnvNotificationsEnabled)
	}
	if strings.TrimSpace(c.Topic) == "" {
		return fmt.Errorf("%s must not be empty", EnvNotificationsKafkaTopic)
	}
	if strings.TrimSpace(c.AppName) == "" {
		return fmt.Errorf("%s must not be empty", EnvNotificationsAppName)
	}
	return nil
}

func envDefault(key, def string) string {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		return v
	}
	return def
}

func envOrFile(envVar, fileVar string) (string, error) {
	if v := strings.TrimSpace(os.Getenv(envVar)); v != "" {
		return v, nil
	}
	path := strings.TrimSpace(os.Getenv(fileVar))
	if path == "" {
		return "", nil
	}
	data, err := os.ReadFile(path)
	if err != nil {
		return "", fmt.Errorf("read %s: %w", fileVar, err)
	}
	return strings.TrimSpace(string(data)), nil
}

func mergePropertiesFile(cfg *Config, path string) error {
	f, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("open %s: %w", EnvKafkaConfigFile, err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		kv := strings.SplitN(line, "=", 2)
		if len(kv) != 2 {
			continue
		}
		key := strings.TrimSpace(kv[0])
		val := strings.TrimSpace(kv[1])
		switch key {
		case "bootstrap.servers":
			if cfg.Bootstrap == "" {
				cfg.Bootstrap = val
			}
		case "security.protocol":
			if strings.TrimSpace(os.Getenv(EnvKafkaSecurityProtocol)) == "" {
				cfg.SecurityProto = val
			}
		case "sasl.mechanisms":
			if strings.TrimSpace(os.Getenv(EnvKafkaSASLMechanisms)) == "" {
				cfg.SASLMechanism = val
			}
		case "sasl.username":
			if cfg.SASLUsername == "" {
				cfg.SASLUsername = val
			}
		case "sasl.password":
			if cfg.SASLPassword == "" {
				cfg.SASLPassword = val
			}
		case "client.id":
			if cfg.ClientID == "" {
				cfg.ClientID = val
			}
		case "session.timeout.ms":
			if strings.TrimSpace(os.Getenv(EnvKafkaSessionTimeoutMS)) == "" {
				ms, err := strconv.Atoi(val)
				if err == nil && ms > 0 {
					cfg.SessionTimeoutMS = ms
				}
			}
		}
	}
	return scanner.Err()
}
