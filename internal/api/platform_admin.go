package api

import (
	"fmt"
	"os"
	"strings"
)

func parsePlatformAdminList() map[string]struct{} {
	raw := strings.TrimSpace(os.Getenv("PLATFORM_ADMIN_LIST"))
	out := map[string]struct{}{}
	if raw == "" {
		return out
	}
	for _, part := range strings.Split(raw, ",") {
		email := strings.TrimSpace(strings.ToLower(part))
		if email != "" {
			out[email] = struct{}{}
		}
	}
	return out
}

func isPlatformAdminEmail(email string) bool {
	email = strings.TrimSpace(strings.ToLower(email))
	if email == "" {
		return false
	}
	_, ok := parsePlatformAdminList()[email]
	return ok
}

func actorFromSession(sub, email string, userID uint) string {
	if e := strings.TrimSpace(email); e != "" {
		return e
	}
	if s := strings.TrimSpace(sub); s != "" {
		return s
	}
	if userID != 0 {
		return fmtUserActor(userID)
	}
	return ""
}

func fmtUserActor(userID uint) string {
	return fmt.Sprintf("user:%d", userID)
}
