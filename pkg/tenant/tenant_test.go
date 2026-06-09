package tenant

import "testing"

func TestQualifyProxyName(t *testing.T) {
	tests := []struct {
		name     string
		tenantID string
		canonical string
		want     string
	}{
		{
			name:      "present tenant",
			tenantID:  "sami",
			canonical: "github__create_pr",
			want:      "sami__github__create_pr",
		},
		{
			name:      "missing tenant",
			tenantID:  "",
			canonical: "github__create_pr",
			want:      "github__create_pr",
		},
		{
			name:      "whitespace tenant",
			tenantID:  "  ",
			canonical: "github__create_pr",
			want:      "github__create_pr",
		},
		{
			name:      "invalid tenant",
			tenantID:  "bad tenant",
			canonical: "github__create_pr",
			want:      "github__create_pr",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := QualifyProxyName(tt.tenantID, tt.canonical)
			if got != tt.want {
				t.Fatalf("QualifyProxyName() = %q, want %q", got, tt.want)
			}
		})
	}
}

func TestSplitProxyToolName(t *testing.T) {
	tests := []struct {
		name       string
		full       string
		wantTenant string
		wantRest   string
		wantQual   bool
	}{
		{
			name:       "qualified",
			full:       "sami__github__create_pr",
			wantTenant: "sami",
			wantRest:   "github__create_pr",
			wantQual:   true,
		},
		{
			name:       "qualified tool with extra underscores",
			full:       "sami__aws__ec2__create_sg",
			wantTenant: "sami",
			wantRest:   "aws__ec2__create_sg",
			wantQual:   true,
		},
		{
			name:     "legacy canonical",
			full:     "github__create_pr",
			wantRest: "github__create_pr",
		},
		{
			name:     "legacy canonical tool with extra underscores",
			full:     "aws__ec2__create_sg",
			wantRest: "aws__ec2__create_sg",
		},
		{
			name:     "no separator",
			full:     "create_pr",
			wantRest: "create_pr",
		},
		{
			name:     "invalid tenant prefix",
			full:     "bad tenant__github__create_pr",
			wantRest: "bad tenant__github__create_pr",
		},
		{
			name:     "tenant only",
			full:     "sami__create_pr",
			wantRest: "sami__create_pr",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotTenant, gotRest, gotQual := SplitProxyToolName(tt.full)
			if gotTenant != tt.wantTenant || gotRest != tt.wantRest || gotQual != tt.wantQual {
				t.Fatalf("SplitProxyToolName(%q) = (%q, %q, %v), want (%q, %q, %v)",
					tt.full, gotTenant, gotRest, gotQual, tt.wantTenant, tt.wantRest, tt.wantQual)
			}
		})
	}
}

func TestSessionAndGroupKeys(t *testing.T) {
	if got := SessionKey("sami", "github"); got != "sami__github" {
		t.Fatalf("SessionKey() = %q", got)
	}
	if got := SessionKey("", "github"); got != "github" {
		t.Fatalf("SessionKey() without tenant = %q", got)
	}
	if got := ToolGroupMapKey("sami", "ops"); got != "sami__ops" {
		t.Fatalf("ToolGroupMapKey() = %q", got)
	}
	if got := ToolGroupMapKey("", "ops"); got != "ops" {
		t.Fatalf("ToolGroupMapKey() without tenant = %q", got)
	}
	if got := PromptGroupMapKey("sami", "ops"); got != "pg__sami__ops" {
		t.Fatalf("PromptGroupMapKey() = %q", got)
	}
	if got := PromptGroupMapKey("", "ops"); got != "pg__ops" {
		t.Fatalf("PromptGroupMapKey() without tenant = %q", got)
	}
}
