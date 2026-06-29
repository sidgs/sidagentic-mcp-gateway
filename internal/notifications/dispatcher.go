package notifications

import (
	"context"
	"log"
	"strings"
)

// Dispatcher renders templates and publishes email notifications.
type Dispatcher struct {
	notifier  Notifier
	cfg       Config
	templates *templateRegistry
}

// NewDispatcher builds a dispatcher. notifier may be nil (treated as NoopNotifier).
func NewDispatcher(cfg Config, notifier Notifier) (*Dispatcher, error) {
	if notifier == nil {
		notifier = NoopNotifier{}
	}
	tmpl, err := newTemplateRegistry()
	if err != nil {
		return nil, err
	}
	return &Dispatcher{notifier: notifier, cfg: cfg, templates: tmpl}, nil
}

// Close shuts down the underlying notifier when it supports Close.
func (d *Dispatcher) Close() {
	if d == nil || d.notifier == nil {
		return
	}
	d.notifier.Close()
}

func (d *Dispatcher) enabled() bool {
	return d != nil && d.cfg.Enabled && d.notifier != nil
}

func (d *Dispatcher) publish(ctx context.Context, recipientEmail, templateName string, data TemplateData) {
	if !d.enabled() {
		return
	}
	recipientEmail = strings.TrimSpace(strings.ToLower(recipientEmail))
	if recipientEmail == "" {
		log.Printf("[notifications] skip %s: recipient email missing", templateName)
		return
	}
	data.DashboardURL = d.cfg.DashboardURL
	subject, body, err := d.templates.render(templateName, data)
	if err != nil {
		log.Printf("[notifications] render %s: %v", templateName, err)
		return
	}
	msg := EmailNotification{
		To:   []string{recipientEmail},
		Sub:  subject,
		Body: body,
		App:  d.cfg.AppName,
	}
	if d.cfg.FromEmail != "" {
		msg.From = d.cfg.FromEmail
	}
	d.notifier.Notify(ctx, msg)
}

// TeamMemberAdded notifies a user they were added to a team.
func (d *Dispatcher) TeamMemberAdded(ctx context.Context, userEmail, username, teamName, tenantID, role, actorEmail string) {
	d.publish(ctx, userEmail, "team_member_added", TemplateData{
		TenantID: tenantID, TeamName: teamName, UserEmail: userEmail, Username: username,
		Role: role, ActorEmail: actorEmail,
	})
}

// TeamMemberRemoved notifies a user they were removed from a team.
func (d *Dispatcher) TeamMemberRemoved(ctx context.Context, userEmail, username, teamName, tenantID, actorEmail string) {
	d.publish(ctx, userEmail, "team_member_removed", TemplateData{
		TenantID: tenantID, TeamName: teamName, UserEmail: userEmail, Username: username,
		ActorEmail: actorEmail,
	})
}

// TenantMemberAdded notifies a user they were added to a tenant.
func (d *Dispatcher) TenantMemberAdded(ctx context.Context, memberEmail, tenantID, tenantName, role, actorEmail string) {
	d.publish(ctx, memberEmail, "tenant_member_added", TemplateData{
		TenantID: tenantID, TenantName: tenantName, UserEmail: memberEmail, Role: role, ActorEmail: actorEmail,
	})
}

// TenantMemberRemoved notifies a user they were removed from a tenant.
func (d *Dispatcher) TenantMemberRemoved(ctx context.Context, memberEmail, tenantID, tenantName, actorEmail string) {
	d.publish(ctx, memberEmail, "tenant_member_removed", TemplateData{
		TenantID: tenantID, TenantName: tenantName, UserEmail: memberEmail, ActorEmail: actorEmail,
	})
}

// UserRoleUpdated notifies a tenant user their RBAC role changed.
func (d *Dispatcher) UserRoleUpdated(ctx context.Context, userEmail, username, tenantID, oldRole, newRole, actorEmail string) {
	d.publish(ctx, userEmail, "user_role_updated", TemplateData{
		TenantID: tenantID, UserEmail: userEmail, Username: username,
		OldRole: oldRole, NewRole: newRole, ActorEmail: actorEmail,
	})
}

// TenantMembershipRoleUpdated notifies a tenant membership role change.
func (d *Dispatcher) TenantMembershipRoleUpdated(ctx context.Context, memberEmail, tenantID, tenantName, oldRole, newRole, actorEmail string) {
	d.publish(ctx, memberEmail, "tenant_membership_role_updated", TemplateData{
		TenantID: tenantID, TenantName: tenantName, UserEmail: memberEmail,
		OldRole: oldRole, NewRole: newRole, ActorEmail: actorEmail,
	})
}

// TenantOwnerInvite invites the owner to a newly created tenant.
func (d *Dispatcher) TenantOwnerInvite(ctx context.Context, ownerEmail, tenantID, tenantName, actorEmail string) {
	d.publish(ctx, ownerEmail, "tenant_owner_invite", TemplateData{
		TenantID: tenantID, TenantName: tenantName, OwnerEmail: ownerEmail, ActorEmail: actorEmail,
	})
}

// AgentAppCredentials emails app credentials to the owner.
func (d *Dispatcher) AgentAppCredentials(ctx context.Context, ownerEmail, tenantID, appName, clientID, clientSecret string) {
	d.publish(ctx, ownerEmail, "agent_app_credentials", TemplateData{
		TenantID: tenantID, AppName: appName, UserEmail: ownerEmail,
		ClientID: clientID, ClientSecret: clientSecret,
	})
}
