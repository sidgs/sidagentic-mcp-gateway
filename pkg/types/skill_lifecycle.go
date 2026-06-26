package types

import (
	"fmt"
	"strings"

	"sami.io/mcpgateway/pkg/apierrors"
)

const (
	SkillStatusPreview    = "preview"
	SkillStatusActive     = "active"
	SkillStatusDeprecated = "deprecated"
	SkillStatusRetired    = "retired"

	SkillDLCDevelopment = "development"
	SkillDLCTesting     = "testing"
	SkillDLCReleased    = "released"
)

var validSkillStatuses = map[string]struct{}{
	SkillStatusPreview:    {},
	SkillStatusActive:     {},
	SkillStatusDeprecated: {},
	SkillStatusRetired:    {},
}

var validSkillDLCStatuses = map[string]struct{}{
	SkillDLCDevelopment: {},
	SkillDLCTesting:     {},
	SkillDLCReleased:    {},
}

// NormalizeSkillStatus returns a validated skill version status or preview as default.
func NormalizeSkillStatus(s string) string {
	s = normalizeEnum(s)
	if _, ok := validSkillStatuses[s]; ok {
		return s
	}
	return SkillStatusPreview
}

// NormalizeSkillDLCStatus returns a validated DLC status or development as default.
func NormalizeSkillDLCStatus(s string) string {
	s = normalizeEnum(s)
	if _, ok := validSkillDLCStatuses[s]; ok {
		return s
	}
	return SkillDLCDevelopment
}

// ValidateSkillStatus returns an error when status is not a known value.
func ValidateSkillStatus(status string) error {
	if _, ok := validSkillStatuses[normalizeEnum(status)]; !ok {
		return fmt.Errorf("invalid skill status %q: %w", status, apierrors.ErrInvalidInput)
	}
	return nil
}

// ValidateSkillDLCStatus returns an error when dlc_status is not a known value.
func ValidateSkillDLCStatus(dlcStatus string) error {
	if _, ok := validSkillDLCStatuses[normalizeEnum(dlcStatus)]; !ok {
		return fmt.Errorf("invalid skill dlc_status %q: %w", dlcStatus, apierrors.ErrInvalidInput)
	}
	return nil
}

// CanAttachToSkillSet reports whether a version may be added to a skill set.
func CanAttachToSkillSet(status string) bool {
	return normalizeEnum(status) == SkillStatusActive
}

// CanSetActiveOrDeprecated reports whether status may transition to active or deprecated.
func CanSetActiveOrDeprecated(dlcStatus string) bool {
	return normalizeEnum(dlcStatus) == SkillDLCReleased
}

// ValidateSkillStatusTransition enforces DLC gating for active/deprecated transitions.
func ValidateSkillStatusTransition(newStatus, dlcStatus string) error {
	newStatus = normalizeEnum(newStatus)
	if err := ValidateSkillStatus(newStatus); err != nil {
		return err
	}
	if (newStatus == SkillStatusActive || newStatus == SkillStatusDeprecated) && !CanSetActiveOrDeprecated(dlcStatus) {
		return fmt.Errorf(
			"status %q requires dlc_status %q: %w",
			newStatus, SkillDLCReleased, apierrors.ErrInvalidInput,
		)
	}
	return nil
}

func normalizeEnum(s string) string {
	return strings.ToLower(strings.TrimSpace(s))
}
