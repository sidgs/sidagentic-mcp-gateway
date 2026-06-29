package notifications

import "context"

// NoopNotifier drops notifications when notifications are disabled.
type NoopNotifier struct{}

// Notify implements Notifier.
func (NoopNotifier) Notify(context.Context, EmailNotification) {}

// Close implements Notifier.
func (NoopNotifier) Close() {}
