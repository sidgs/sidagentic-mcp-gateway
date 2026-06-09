package registrysync_test

import (
	"context"
	"sync"
	"testing"
	"time"

	"github.com/alicebob/miniredis/v2"
	"github.com/redis/go-redis/v9"
	"github.com/stretchr/testify/require"
	"sami.io/mcpgateway/internal/registrysync"
)

func TestRedisNotifierPublishSubscribe(t *testing.T) {
	mr, err := miniredis.Run()
	require.NoError(t, err)
	defer mr.Close()

	client := redis.NewClient(&redis.Options{Addr: mr.Addr()})
	defer func() { _ = client.Close() }()

	const channel = "test:registry:v1"
	writer := registrysync.NewRedisNotifier(client, channel, "pod-a")

	var wg sync.WaitGroup
	wg.Add(1)
	received := make(chan registrysync.Event, 1)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		defer wg.Done()
		_ = registrysync.Subscribe(ctx, client, channel, func(ev registrysync.Event) {
			select {
			case received <- ev:
			default:
			}
		})
	}()

	time.Sleep(50 * time.Millisecond)
	writer.Notify(context.Background(), registrysync.ToolGroupReload("tenant-1", "grp", "pod-a"))

	select {
	case ev := <-received:
		require.Equal(t, registrysync.EventToolGroupReload, ev.Type)
		require.Equal(t, "tenant-1", ev.TenantID)
		require.Equal(t, "grp", ev.Name)
		require.Equal(t, "pod-a", ev.OriginID)
	case <-time.After(time.Second):
		t.Fatal("timed out waiting for registry sync event")
	}

	cancel()
	wg.Wait()
}

func TestParseEventRoundTrip(t *testing.T) {
	ev := registrysync.ServerCatalogReload("tenant", "srv", "origin")
	payload, err := ev.Marshal()
	require.NoError(t, err)

	parsed, err := registrysync.ParseEvent(payload)
	require.NoError(t, err)
	require.Equal(t, registrysync.EventServerCatalogReload, parsed.Type)
	require.Equal(t, "tenant", parsed.TenantID)
	require.Equal(t, "srv", parsed.Name)
	require.Equal(t, "origin", parsed.OriginID)
	require.Equal(t, registrysync.Version, parsed.V)
}
