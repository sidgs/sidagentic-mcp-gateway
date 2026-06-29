package notifications

import (
	"bytes"
	"embed"
	"fmt"
	"strings"
	"text/template"
)

//go:embed templates/*
var templateFS embed.FS

type templateRegistry struct {
	subjects map[string]*template.Template
	bodies   map[string]*template.Template
}

func newTemplateRegistry() (*templateRegistry, error) {
	names := []string{
		"team_member_added",
		"team_member_removed",
		"tenant_member_added",
		"tenant_member_removed",
		"user_role_updated",
		"tenant_membership_role_updated",
		"tenant_owner_invite",
		"agent_app_credentials",
	}
	r := &templateRegistry{
		subjects: make(map[string]*template.Template, len(names)),
		bodies:   make(map[string]*template.Template, len(names)),
	}
	for _, name := range names {
		subjPath := "templates/" + name + ".subject.tmpl"
		bodyPath := "templates/" + name + ".body.tmpl"
		subjRaw, err := templateFS.ReadFile(subjPath)
		if err != nil {
			return nil, fmt.Errorf("read %s: %w", subjPath, err)
		}
		bodyRaw, err := templateFS.ReadFile(bodyPath)
		if err != nil {
			return nil, fmt.Errorf("read %s: %w", bodyPath, err)
		}
		subjT, err := template.New(name + "_subject").Parse(string(subjRaw))
		if err != nil {
			return nil, fmt.Errorf("parse %s: %w", subjPath, err)
		}
		bodyT, err := template.New(name + "_body").Parse(string(bodyRaw))
		if err != nil {
			return nil, fmt.Errorf("parse %s: %w", bodyPath, err)
		}
		r.subjects[name] = subjT
		r.bodies[name] = bodyT
	}
	return r, nil
}

func (r *templateRegistry) render(name string, data TemplateData) (subject, body string, err error) {
	subjT, ok := r.subjects[name]
	if !ok {
		return "", "", fmt.Errorf("unknown template %q", name)
	}
	bodyT, ok := r.bodies[name]
	if !ok {
		return "", "", fmt.Errorf("unknown template %q", name)
	}
	var subjBuf, bodyBuf bytes.Buffer
	if err := subjT.Execute(&subjBuf, data); err != nil {
		return "", "", fmt.Errorf("render subject %s: %w", name, err)
	}
	if err := bodyT.Execute(&bodyBuf, data); err != nil {
		return "", "", fmt.Errorf("render body %s: %w", name, err)
	}
	return strings.TrimSpace(subjBuf.String()), strings.TrimSpace(bodyBuf.String()), nil
}
