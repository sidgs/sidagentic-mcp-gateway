package registrysync

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

// RedisNotifier publishes registry events over Redis pub/sub.
type RedisNotifier struct {
	client   *redis.Client
	channel  string
	originID string
}

// NewRedisNotifier creates a notifier that stamps originID on outbound events.
func NewRedisNotifier(client *redis.Client, channel, originID string) *RedisNotifier {
	return &RedisNotifier{
		client:   client,
		channel:  channel,
		originID: originID,
	}
}

// Notify publishes an event to the registry sync channel.
func (n *RedisNotifier) Notify(ctx context.Context, ev Event) {
	if n == nil || n.client == nil {
		return
	}
	ev.OriginID = n.originID
	payload, err := ev.Marshal()
	if err != nil {
		log.Printf("[registrysync] marshal event: %v", err)
		return
	}
	if err := n.client.Publish(ctx, n.channel, payload).Err(); err != nil {
		log.Printf("[registrysync] publish %s: %v", ev.Type, err)
	}
}

// Subscribe listens for registry events and dispatches them to handler until ctx is cancelled.
func Subscribe(ctx context.Context, client *redis.Client, channel string, handler func(Event)) error {
	pubsub := client.Subscribe(ctx, channel)
	defer func() {
		_ = pubsub.Close()
	}()

	ch := pubsub.Channel()
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case msg, ok := <-ch:
			if !ok {
				return nil
			}
			ev, err := ParseEvent([]byte(msg.Payload))
			if err != nil {
				log.Printf("[registrysync] parse event: %v", err)
				continue
			}
			handler(ev)
		}
	}
}
