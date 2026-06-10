package model

import "testing"

func TestGroupReferencesServer(t *testing.T) {
	tests := []struct {
		name             string
		includedServers  []string
		includedEntities []string
		serverName       string
		want             bool
	}{
		{
			name:            "included server match",
			includedServers: []string{"upstream", "other"},
			serverName:      "upstream",
			want:            true,
		},
		{
			name:             "included entity prefix match",
			includedEntities: []string{"upstream__echo", "other__ping"},
			serverName:       "upstream",
			want:             true,
		},
		{
			name:            "no reference",
			includedServers: []string{"other"},
			includedEntities: []string{
				"other__echo",
			},
			serverName: "upstream",
			want:       false,
		},
		{
			name:             "partial prefix is not a match",
			includedEntities: []string{"upstream_extra__echo"},
			serverName:       "upstream",
			want:             false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := GroupReferencesServer(tt.includedServers, tt.includedEntities, tt.serverName)
			if got != tt.want {
				t.Fatalf("GroupReferencesServer() = %v, want %v", got, tt.want)
			}
		})
	}
}
