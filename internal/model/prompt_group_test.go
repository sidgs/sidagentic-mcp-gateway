package model

import (
	"context"
	"encoding/json"
	"testing"

	"gorm.io/datatypes"
)

type mockPromptResolver struct {
	serverPrompts map[string][]Prompt
}

func (m *mockPromptResolver) ListPromptsByServer(ctx context.Context, serverName string) ([]Prompt, error) {
	if prompts, ok := m.serverPrompts[serverName]; ok {
		return prompts, nil
	}
	return []Prompt{}, nil
}

func TestPromptGroup_GetPrompts(t *testing.T) {
	raw, _ := json.Marshal([]string{"a__p1", "b__p2"})
	g := &PromptGroup{IncludedPrompts: datatypes.JSON(raw)}
	out, err := g.GetPrompts()
	if err != nil || len(out) != 2 {
		t.Fatalf("GetPrompts: %v %+v", err, out)
	}
}

func TestPromptGroup_ResolveEffectivePrompts(t *testing.T) {
	resolver := &mockPromptResolver{
		serverPrompts: map[string][]Prompt{
			"srv1": {
				{Name: "srv1__welcome"},
				{Name: "srv1__review"},
			},
		},
	}

	t.Run("included only", func(t *testing.T) {
		inc, _ := json.Marshal([]string{"manual__x"})
		g := &PromptGroup{IncludedPrompts: datatypes.JSON(inc)}
		r, err := g.ResolveEffectivePrompts(context.Background(), resolver)
		if err != nil || len(r) != 1 || r[0] != "manual__x" {
			t.Fatalf("got %v %v", r, err)
		}
	})

	t.Run("servers minus excluded", func(t *testing.T) {
		srvs, _ := json.Marshal([]string{"srv1"})
		excl, _ := json.Marshal([]string{"srv1__review"})
		g := &PromptGroup{IncludedServers: datatypes.JSON(srvs), ExcludedPrompts: datatypes.JSON(excl)}
		r, err := g.ResolveEffectivePrompts(context.Background(), resolver)
		if err != nil || len(r) != 1 || r[0] != "srv1__welcome" {
			t.Fatalf("got %v %v", r, err)
		}
	})
}
