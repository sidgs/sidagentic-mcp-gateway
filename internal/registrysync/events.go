// Package registrysync propagates registry mutation signals across gateway replicas via Redis pub/sub.
package registrysync

import "encoding/json"

const Version = 1

// EventType identifies which in-memory reload action subscribers should perform.
type EventType string

const (
	EventToolGroupReload     EventType = "tool_group.reload"
	EventToolGroupDelete     EventType = "tool_group.delete"
	EventPromptGroupReload   EventType = "prompt_group.reload"
	EventPromptGroupDelete   EventType = "prompt_group.delete"
	EventServerCatalogReload EventType = "server.catalog_reload"
	EventServerPurge         EventType = "server.purge"
	EventRegistryFullReload  EventType = "registry.full_reload"
)

// Event is the JSON payload published on the registry sync channel.
type Event struct {
	V        int       `json:"v"`
	Type     EventType `json:"type"`
	TenantID string    `json:"tenant_id"`
	Name     string    `json:"name,omitempty"`
	OriginID string    `json:"origin_id"`
}

// Marshal serializes the event for Redis pub/sub.
func (e Event) Marshal() ([]byte, error) {
	ev := e
	if ev.V == 0 {
		ev.V = Version
	}
	return json.Marshal(ev)
}

// ParseEvent decodes a subscriber message payload.
func ParseEvent(payload []byte) (Event, error) {
	var ev Event
	if err := json.Unmarshal(payload, &ev); err != nil {
		return Event{}, err
	}
	return ev, nil
}

// ToolGroupReload builds a tool group reload event.
func ToolGroupReload(tenantID, name, originID string) Event {
	return Event{V: Version, Type: EventToolGroupReload, TenantID: tenantID, Name: name, OriginID: originID}
}

// ToolGroupDelete builds a tool group delete event.
func ToolGroupDelete(tenantID, name, originID string) Event {
	return Event{V: Version, Type: EventToolGroupDelete, TenantID: tenantID, Name: name, OriginID: originID}
}

// PromptGroupReload builds a prompt group reload event.
func PromptGroupReload(tenantID, name, originID string) Event {
	return Event{V: Version, Type: EventPromptGroupReload, TenantID: tenantID, Name: name, OriginID: originID}
}

// PromptGroupDelete builds a prompt group delete event.
func PromptGroupDelete(tenantID, name, originID string) Event {
	return Event{V: Version, Type: EventPromptGroupDelete, TenantID: tenantID, Name: name, OriginID: originID}
}

// ServerCatalogReload builds a server catalog reload event.
func ServerCatalogReload(tenantID, serverName, originID string) Event {
	return Event{V: Version, Type: EventServerCatalogReload, TenantID: tenantID, Name: serverName, OriginID: originID}
}

// ServerPurge builds a server purge event.
func ServerPurge(tenantID, serverName, originID string) Event {
	return Event{V: Version, Type: EventServerPurge, TenantID: tenantID, Name: serverName, OriginID: originID}
}

// RegistryFullReload builds a full local reconcile event.
func RegistryFullReload(originID string) Event {
	return Event{V: Version, Type: EventRegistryFullReload, OriginID: originID}
}
