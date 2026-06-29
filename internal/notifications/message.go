package notifications

import "encoding/json"

// EmailNotification is the Kafka message payload for the downstream email service.
type EmailNotification struct {
	To   []string `json:"to"`
	From string   `json:"from,omitempty"`
	Sub  string   `json:"sub"`
	Body string   `json:"body"`
	App  string   `json:"app"`
}

// MarshalJSON omits empty from and ensures only schema-allowed fields are emitted.
func (n EmailNotification) MarshalJSON() ([]byte, error) {
	m := map[string]any{
		"to":   n.To,
		"sub":  n.Sub,
		"body": n.Body,
		"app":  n.App,
	}
	if n.From != "" {
		m["from"] = n.From
	}
	return json.Marshal(m)
}
