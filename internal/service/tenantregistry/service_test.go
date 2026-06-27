package tenantregistry

import (
	"context"
	"testing"
	"time"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/testhelpers"
)

func TestCanLoginLifecycle(t *testing.T) {
	now := time.Date(2026, 6, 1, 12, 0, 0, 0, time.UTC)
	retireAt := now.Add(-time.Hour)

	tests := []struct {
		name          string
		tenant        model.Tenant
		platformAdmin bool
		want          bool
	}{
		{
			name:   "active tenant",
			tenant: model.Tenant{Status: model.TenantStatusActive},
			want:   true,
		},
		{
			name:          "suspended blocked for user",
			tenant:        model.Tenant{Status: model.TenantStatusSuspended},
			platformAdmin: false,
			want:          false,
		},
		{
			name:          "suspended allowed for platform admin",
			tenant:        model.Tenant{Status: model.TenantStatusSuspended},
			platformAdmin: true,
			want:          true,
		},
		{
			name:   "removed blocked for everyone",
			tenant: model.Tenant{Status: model.TenantStatusRemoved},
			want:   false,
		},
		{
			name:          "retired past date blocked for user",
			tenant:        model.Tenant{Status: model.TenantStatusRetired, RetireAt: &retireAt},
			platformAdmin: false,
			want:          false,
		},
		{
			name:          "retired past date allowed for platform admin",
			tenant:        model.Tenant{Status: model.TenantStatusRetired, RetireAt: &retireAt},
			platformAdmin: true,
			want:          true,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got, _ := CanLogin(&tc.tenant, tc.platformAdmin, now)
			if got != tc.want {
				t.Fatalf("CanLogin() = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestCanMutateReadOnly(t *testing.T) {
	active := &model.Tenant{Status: model.TenantStatusActive, Mode: model.TenantModeNormal}
	readOnly := &model.Tenant{Status: model.TenantStatusActive, Mode: model.TenantModeReadOnly}

	if !CanMutate(active, false) {
		t.Fatal("expected active tenant to allow mutations")
	}
	if CanMutate(readOnly, false) {
		t.Fatal("expected read-only tenant to block non-platform mutations")
	}
	if !CanMutate(readOnly, true) {
		t.Fatal("expected platform admin to mutate read-only tenant")
	}
}

func TestCreateTenantAndMembership(t *testing.T) {
	setup, _ := testhelpers.SetupUserTest(t)
	defer setup.Cleanup()

	svc := NewService(setup.DB)
	ctx := context.Background()
	row, err := svc.Create(ctx, "acme", "Acme Corp", "owner@example.com")
	if err != nil {
		t.Fatalf("Create: %v", err)
	}
	if row.ID != "acme" || row.Status != model.TenantStatusActive {
		t.Fatalf("unexpected tenant: %+v", row)
	}

	members, err := svc.ListMemberships(ctx, "acme")
	if err != nil {
		t.Fatalf("ListMembers: %v", err)
	}
	if len(members) != 1 || members[0].Email != "owner@example.com" {
		t.Fatalf("expected owner membership, got %+v", members)
	}
}
