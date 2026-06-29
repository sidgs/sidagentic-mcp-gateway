package notifications

import "context"

// Notifier publishes email notification payloads.
type Notifier interface {
	Notify(ctx context.Context, msg EmailNotification)
	Close()
}
