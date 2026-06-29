package notifications

// TemplateData holds common fields for notification templates.
type TemplateData struct {
	TenantID     string
	TenantName   string
	TeamName     string
	UserEmail    string
	Username     string
	Role         string
	OldRole      string
	NewRole      string
	ActorEmail   string
	DashboardURL string
	AppName      string
	ClientID     string
	ClientSecret string
	OwnerEmail   string
}
