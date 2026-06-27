package migrations

import (
	"testing"

	"sami.io/mcpgateway/internal/model"
	"sami.io/mcpgateway/pkg/testhelpers"
)

func TestEnsureUserIdentityColumnsIdempotent(t *testing.T) {
	t.Helper()

	db, err := testhelpers.CreateTestDB()
	testhelpers.AssertNoError(t, err)

	err = db.AutoMigrate(&model.User{})
	testhelpers.AssertNoError(t, err)

	err = ensureUserIdentityColumns(db)
	testhelpers.AssertNoError(t, err)
	err = ensureUserIdentityColumns(db)
	testhelpers.AssertNoError(t, err)

	var user model.User
	err = db.Select("email", "oidc_sub").First(&user).Error
	testhelpers.AssertNoError(t, err)
}
