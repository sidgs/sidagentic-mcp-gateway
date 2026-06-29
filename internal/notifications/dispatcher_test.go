package notifications

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/require"
)

type recordingNotifier struct {
	msgs []EmailNotification
}

func (r *recordingNotifier) Notify(_ context.Context, msg EmailNotification) {
	r.msgs = append(r.msgs, msg)
}

func (r *recordingNotifier) Close() {}

func testConfig() Config {
	return Config{
		Enabled:      true,
		AppName:      "sami-mcp-gateway-test",
		FromEmail:    "noreply@example.com",
		DashboardURL: "https://gateway.example.com/dashboard",
	}
}

func TestDispatcherTeamMemberAdded(t *testing.T) {
	rec := &recordingNotifier{}
	d, err := NewDispatcher(testConfig(), rec)
	require.NoError(t, err)

	d.TeamMemberAdded(context.Background(), "member@example.com", "member", "Engineering", "acme", "member", "admin@example.com")
	require.Len(t, rec.msgs, 1)

	msg := rec.msgs[0]
	require.Equal(t, []string{"member@example.com"}, msg.To)
	require.Equal(t, "noreply@example.com", msg.From)
	require.Equal(t, "sami-mcp-gateway-test", msg.App)
	require.Contains(t, msg.Sub, "Engineering")
	require.Contains(t, msg.Body, "Engineering")
	require.Contains(t, msg.Body, "admin@example.com")

	raw, err := msg.MarshalJSON()
	require.NoError(t, err)
	var m map[string]any
	require.NoError(t, json.Unmarshal(raw, &m))
	require.Len(t, m, 5)
	require.Equal(t, "member@example.com", m["to"].([]any)[0])
}

func TestDispatcherSkipsEmptyRecipient(t *testing.T) {
	rec := &recordingNotifier{}
	d, err := NewDispatcher(testConfig(), rec)
	require.NoError(t, err)

	d.UserRoleUpdated(context.Background(), "", "user", "acme", "user", "administrator", "admin@example.com")
	require.Empty(t, rec.msgs)
}

func TestEmailNotificationMarshalOmitsEmptyFrom(t *testing.T) {
	raw, err := EmailNotification{
		To:   []string{"a@example.com"},
		Sub:  "subject",
		Body: "body",
		App:  "app",
	}.MarshalJSON()
	require.NoError(t, err)
	require.NotContains(t, string(raw), "from")
}

func TestAllTemplatesRender(t *testing.T) {
	reg, err := newTemplateRegistry()
	require.NoError(t, err)
	data := TemplateData{
		TenantID: "acme", TenantName: "Acme Corp", TeamName: "Eng",
		UserEmail: "user@example.com", Username: "user", Role: "member",
		OldRole: "user", NewRole: "administrator", ActorEmail: "admin@example.com",
		DashboardURL: "https://example.com", AppName: "My App",
		ClientID: "cid", ClientSecret: "secret", OwnerEmail: "owner@example.com",
	}
	for name := range reg.subjects {
		sub, body, err := reg.render(name, data)
		require.NoError(t, err, name)
		require.NotEmpty(t, sub, name)
		require.NotEmpty(t, body, name)
	}
}

func TestLoadConfigFromEnvDefaults(t *testing.T) {
	t.Setenv(EnvNotificationsEnabled, "false")
	t.Setenv(EnvKafkaBootstrapServers, "")
	cfg, err := LoadConfigFromEnv(parseTestBool)
	require.NoError(t, err)
	require.False(t, cfg.Enabled)
	require.Equal(t, "notifications", cfg.Topic)
	require.Equal(t, "sami-mcp-gateway", cfg.AppName)
}

func TestValidateForEnabledRequiresKafka(t *testing.T) {
	cfg := Config{Enabled: true}
	require.Error(t, cfg.ValidateForEnabled())
}

func parseTestBool(envVar string, defaultVal bool) bool {
	switch envVar {
	case EnvNotificationsEnabled:
		return false
	default:
		return defaultVal
	}
}
