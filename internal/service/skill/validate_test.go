package skill

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestValidateSkillName(t *testing.T) {
	require.NoError(t, ValidateSkillName("pdf-processing"))
	require.Error(t, ValidateSkillName("PDF"))
	require.Error(t, ValidateSkillName("-bad"))
}

func TestValidateBodyResourceLinks(t *testing.T) {
	body := "# Guide\nSee [ref](references/guide.md)\n"
	require.NoError(t, ValidateBodyResourceLinks(body, nil, []string{"guide.md"}))
	require.Error(t, ValidateBodyResourceLinks(body, nil, []string{"other.md"}))
}
