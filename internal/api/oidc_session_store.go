package api

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
)

// oidcSessionStore persists dashboard OIDC browser sessions (opaque cookie → user claims).
// Redis is used when configured; otherwise an in-process map is used (single-replica only).
type oidcSessionStore interface {
	Set(ctx context.Context, sessionID string, sess oidcServerSession, ttl time.Duration) error
	Get(ctx context.Context, sessionID string) (oidcServerSession, bool)
	Delete(ctx context.Context, sessionID string) error
}

// --- in-memory implementation ---

type memoryOIDCSessionStore struct {
	mu sync.Mutex
	m  map[string]oidcServerSession
}

func newMemoryOIDCSessionStore() *memoryOIDCSessionStore {
	return &memoryOIDCSessionStore{m: make(map[string]oidcServerSession)}
}

func (m *memoryOIDCSessionStore) Set(_ context.Context, sessionID string, sess oidcServerSession, _ time.Duration) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.expireLocked(time.Now())
	m.m[sessionID] = sess
	return nil
}

func (m *memoryOIDCSessionStore) Get(_ context.Context, sessionID string) (oidcServerSession, bool) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.expireLocked(time.Now())
	sess, ok := m.m[sessionID]
	if !ok {
		return oidcServerSession{}, false
	}
	if time.Now().After(sess.ExpiresAt.Add(oidcSessionSkew)) {
		delete(m.m, sessionID)
		return oidcServerSession{}, false
	}
	return sess, true
}

func (m *memoryOIDCSessionStore) Delete(_ context.Context, sessionID string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.m, sessionID)
	return nil
}

func (m *memoryOIDCSessionStore) expireLocked(now time.Time) {
	const maxSweep = 10000
	if len(m.m) == 0 {
		return
	}
	n := 0
	for sid, sess := range m.m {
		if now.After(sess.ExpiresAt.Add(oidcSessionSkew)) {
			delete(m.m, sid)
			n++
			if n >= maxSweep {
				return
			}
		}
	}
}

// --- Redis implementation ---

type redisOIDCSessionStore struct {
	rdb    *redis.Client
	prefix string
}

func newRedisOIDCSessionStore(rdb *redis.Client, keyPrefix string) *redisOIDCSessionStore {
	if keyPrefix == "" {
		keyPrefix = "mcpgw:oidc:session:"
	}
	return &redisOIDCSessionStore{rdb: rdb, prefix: keyPrefix}
}

func (r *redisOIDCSessionStore) key(sessionID string) string {
	return r.prefix + sessionID
}

func (r *redisOIDCSessionStore) Set(ctx context.Context, sessionID string, sess oidcServerSession, ttl time.Duration) error {
	if ttl < time.Second {
		ttl = time.Second
	}
	b, err := json.Marshal(sess)
	if err != nil {
		return err
	}
	return r.rdb.Set(ctx, r.key(sessionID), b, ttl).Err()
}

func (r *redisOIDCSessionStore) Get(ctx context.Context, sessionID string) (oidcServerSession, bool) {
	b, err := r.rdb.Get(ctx, r.key(sessionID)).Bytes()
	if err != nil {
		if errors.Is(err, redis.Nil) {
			return oidcServerSession{}, false
		}
		log.Printf("[oidc] redis session get: %v\n", err)
		return oidcServerSession{}, false
	}
	var sess oidcServerSession
	if err := json.Unmarshal(b, &sess); err != nil {
		log.Printf("[oidc] redis session decode: %v\n", err)
		return oidcServerSession{}, false
	}
	if time.Now().After(sess.ExpiresAt.Add(oidcSessionSkew)) {
		_ = r.Delete(ctx, sessionID)
		return oidcServerSession{}, false
	}
	return sess, true
}

func (r *redisOIDCSessionStore) Delete(ctx context.Context, sessionID string) error {
	return r.rdb.Del(ctx, r.key(sessionID)).Err()
}
