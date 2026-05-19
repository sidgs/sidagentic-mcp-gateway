package types

import (
	"fmt"
	"strings"

	"sami.io/mcpgateway/pkg/apierrors"
)

// MCP group endpoint security (tool groups and prompt groups).
const (
	GroupSecurityOpen   = "open"
	GroupSecurityAPIKey = "api_key"
	GroupSecurityBasic  = "basic"
	GroupSecurityBearer = "bearer"
)

// NormalizeGroupSecurityOption returns a canonical value or default "basic" when empty.
func NormalizeGroupSecurityOption(raw string) string {
	s := strings.TrimSpace(strings.ToLower(raw))
	if s == "" {
		return GroupSecurityBasic
	}
	return s
}

// ValidateGroupSecurityOption returns an error if s is not a supported option.
func ValidateGroupSecurityOption(s string) error {
	switch NormalizeGroupSecurityOption(s) {
	case GroupSecurityOpen, GroupSecurityAPIKey, GroupSecurityBasic, GroupSecurityBearer:
		return nil
	default:
		return fmt.Errorf("invalid security_option %q: must be one of open, api_key, basic, bearer: %w", s, apierrors.ErrInvalidInput)
	}
}
