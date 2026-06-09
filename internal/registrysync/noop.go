package registrysync

import "context"

// NoopNotifier drops events when registry sync is disabled.
type NoopNotifier struct{}

// Notify implements Notifier.
func (NoopNotifier) Notify(context.Context, Event) {}
