package api

import (
	"os"
	"testing"
)

func TestIsPlatformAdminEmail(t *testing.T) {
	t.Setenv("PLATFORM_ADMIN_LIST", "Admin@Example.com, ops@example.com")
	if !isPlatformAdminEmail("admin@example.com") {
		t.Fatal("expected case-insensitive match")
	}
	if isPlatformAdminEmail("user@example.com") {
		t.Fatal("expected non-admin to be rejected")
	}
}

func TestParsePlatformAdminListEmpty(t *testing.T) {
	_ = os.Unsetenv("PLATFORM_ADMIN_LIST")
	list := parsePlatformAdminList()
	if len(list) != 0 {
		t.Fatalf("expected empty list, got %v", list)
	}
}
