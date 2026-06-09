package registrysync

import "context"

// Notifier publishes registry sync events to peer gateway pods.
type Notifier interface {
	Notify(ctx context.Context, ev Event)
}
