package skill

import (
	"fmt"
	"regexp"
	"strings"

	"sami.io/mcpgateway/pkg/apierrors"
)

var (
	ValidSkillName    = regexp.MustCompile(`^[a-z0-9]+(-[a-z0-9]+)*$`)
	ValidSkillVersion = regexp.MustCompile(`^[0-9]+(\.[0-9]+)*(-[a-z0-9]+)?$`)

	mdRefLink    = regexp.MustCompile(`\[[^\]]*\]\((references/[^/)]+)\)`)
	mdScriptLink = regexp.MustCompile(`\[[^\]]*\]\((scripts/[^/)]+)\)`)
	bareScript   = regexp.MustCompile(`(?m)^scripts/([^/\s]+)\s*$`)
	bareRef      = regexp.MustCompile(`(?m)^references/([^/\s]+)\s*$`)
)

// ValidateSkillName checks Agent Skills name rules.
func ValidateSkillName(name string) error {
	name = strings.TrimSpace(name)
	if len(name) == 0 || len(name) > 64 {
		return fmt.Errorf("skill name must be 1-64 characters: %w", apierrors.ErrInvalidInput)
	}
	if !ValidSkillName.MatchString(name) {
		return fmt.Errorf(
			"invalid skill name: must be lowercase alphanumeric with single hyphens: %w",
			apierrors.ErrInvalidInput,
		)
	}
	return nil
}

// ValidateSkillVersion checks semver-like version strings.
func ValidateSkillVersion(version string) error {
	version = strings.TrimSpace(version)
	if version == "" {
		return fmt.Errorf("version is required: %w", apierrors.ErrInvalidInput)
	}
	if len(version) > 32 || !ValidSkillVersion.MatchString(version) {
		return fmt.Errorf("invalid version format: %w", apierrors.ErrInvalidInput)
	}
	return nil
}

// ValidateDescription checks required description bounds.
func ValidateDescription(desc string) error {
	desc = strings.TrimSpace(desc)
	if len(desc) == 0 || len(desc) > 1024 {
		return fmt.Errorf("description must be 1-1024 characters: %w", apierrors.ErrInvalidInput)
	}
	return nil
}

// ValidateCompatibility checks optional compatibility bounds.
func ValidateCompatibility(compat string) error {
	compat = strings.TrimSpace(compat)
	if compat == "" {
		return nil
	}
	if len(compat) > 500 {
		return fmt.Errorf("compatibility must be at most 500 characters: %w", apierrors.ErrInvalidInput)
	}
	return nil
}

// ValidateBodyContent ensures body is non-empty.
func ValidateBodyContent(body string) error {
	if strings.TrimSpace(body) == "" {
		return fmt.Errorf("body_content is required: %w", apierrors.ErrInvalidInput)
	}
	return nil
}

// ValidateResourceFilename ensures a simple filename without path separators.
func ValidateResourceFilename(filename string) error {
	filename = strings.TrimSpace(filename)
	if filename == "" {
		return fmt.Errorf("filename is required: %w", apierrors.ErrInvalidInput)
	}
	if len(filename) > 255 || strings.Contains(filename, "/") || strings.Contains(filename, "\\") {
		return fmt.Errorf("invalid filename %q: %w", filename, apierrors.ErrInvalidInput)
	}
	return nil
}

// ValidateBodyResourceLinks ensures body links reference declared scripts/references.
func ValidateBodyResourceLinks(body string, scripts, references []string) error {
	scriptSet := make(map[string]struct{}, len(scripts))
	for _, s := range scripts {
		scriptSet[s] = struct{}{}
	}
	refSet := make(map[string]struct{}, len(references))
	for _, r := range references {
		refSet[r] = struct{}{}
	}

	check := func(prefix, full string, set map[string]struct{}) error {
		name := strings.TrimPrefix(full, prefix)
		if _, ok := set[name]; !ok {
			return fmt.Errorf(
				"body_content references %q but it is not declared in %s: %w",
				full, strings.TrimSuffix(prefix, "/"), apierrors.ErrInvalidInput,
			)
		}
		return nil
	}

	for _, m := range mdScriptLink.FindAllStringSubmatch(body, -1) {
		if err := check("scripts/", m[1], scriptSet); err != nil {
			return err
		}
	}
	for _, m := range mdRefLink.FindAllStringSubmatch(body, -1) {
		if err := check("references/", m[1], refSet); err != nil {
			return err
		}
	}
	for _, m := range bareScript.FindAllStringSubmatch(body, -1) {
		if _, ok := scriptSet[m[1]]; !ok {
			return fmt.Errorf(
				"body_content references script %q but it is not declared: %w",
				m[1], apierrors.ErrInvalidInput,
			)
		}
	}
	for _, m := range bareRef.FindAllStringSubmatch(body, -1) {
		if _, ok := refSet[m[1]]; !ok {
			return fmt.Errorf(
				"body_content references reference %q but it is not declared: %w",
				m[1], apierrors.ErrInvalidInput,
			)
		}
	}
	return nil
}

// CollectScriptFilenames returns trimmed unique script filenames from inputs.
func CollectScriptFilenames(scripts []string) ([]string, error) {
	return collectFilenames(scripts, "script")
}

func collectFilenames(items []string, kind string) ([]string, error) {
	seen := make(map[string]struct{}, len(items))
	out := make([]string, 0, len(items))
	for _, raw := range items {
		name := strings.TrimSpace(raw)
		if err := ValidateResourceFilename(name); err != nil {
			return nil, err
		}
		if _, dup := seen[name]; dup {
			return nil, fmt.Errorf("duplicate %s filename %q: %w", kind, name, apierrors.ErrInvalidInput)
		}
		seen[name] = struct{}{}
		out = append(out, name)
	}
	return out, nil
}

// CollectReferenceFilenames returns trimmed unique reference filenames.
func CollectReferenceFilenames(refs []string) ([]string, error) {
	return collectFilenames(refs, "reference")
}

// IsVersionMutable reports whether content edits are allowed.
func IsVersionMutable(locked bool) bool {
	return !locked
}
