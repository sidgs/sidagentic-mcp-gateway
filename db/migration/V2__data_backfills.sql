-- Idempotent data backfills ported from internal/migrations/migration.go.
-- Placeholder defaultTenantId is set in db/flyway.conf (default: sami).

UPDATE mcp_servers
SET server_kind = 'mcp_protocol'
WHERE server_kind = '' OR server_kind IS NULL;

UPDATE users
SET role = 'administrator'
WHERE role = 'admin';

UPDATE teams t
SET created_by_user_id = owner.user_id
FROM (
    SELECT DISTINCT ON (team_id) team_id, user_id
    FROM team_members
    WHERE role = 'owner'
    ORDER BY team_id, id
) owner
WHERE t.id = owner.team_id
  AND (t.created_by_user_id IS NULL OR t.created_by_user_id = 0);

UPDATE mcp_servers
SET tenant_id = '${defaultTenantId}'
WHERE tenant_id = '' OR tenant_id IS NULL;

UPDATE tools
SET tenant_id = COALESCE((SELECT tenant_id FROM mcp_servers WHERE mcp_servers.id = tools.server_id), '${defaultTenantId}')
WHERE tenant_id = '' OR tenant_id IS NULL;

UPDATE prompts
SET tenant_id = COALESCE((SELECT tenant_id FROM mcp_servers WHERE mcp_servers.id = prompts.server_id), '${defaultTenantId}')
WHERE tenant_id = '' OR tenant_id IS NULL;

UPDATE resources
SET tenant_id = COALESCE((SELECT tenant_id FROM mcp_servers WHERE mcp_servers.id = resources.server_id), '${defaultTenantId}')
WHERE tenant_id = '' OR tenant_id IS NULL;

UPDATE server_configs SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE users SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE tool_groups SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE prompt_groups SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE agent_apps SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE skills SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE skill_sets SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE teams SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE team_members SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE team_resource_assignments SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE upstream_o_auth_pending_sessions SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;
UPDATE upstream_o_auth_tokens SET tenant_id = '${defaultTenantId}' WHERE tenant_id = '' OR tenant_id IS NULL;

INSERT INTO tenants (id, name, status, mode, owner_email, created_on, updated_on, created_by, updated_by)
SELECT '${defaultTenantId}', '${defaultTenantId}', 'active', 'normal', '', NOW(), NOW(), 'system', 'system'
WHERE NOT EXISTS (SELECT 1 FROM tenants WHERE id = '${defaultTenantId}');

INSERT INTO tenant_memberships (tenant_id, oidc_sub, email, role, created_on, updated_on, created_by, updated_by)
SELECT
    '${defaultTenantId}',
    CASE
        WHEN COALESCE(NULLIF(TRIM(oidc_sub), ''), '') = '' THEN 'email:' || LOWER(TRIM(email))
        ELSE TRIM(oidc_sub)
    END,
    LOWER(TRIM(COALESCE(email, ''))),
    CASE role
        WHEN 'admin' THEN 'administrator'
        WHEN 'administrator' THEN 'administrator'
        WHEN 'provider' THEN 'provider'
        WHEN 'auditor' THEN 'auditor'
        ELSE 'user'
    END,
    NOW(),
    NOW(),
    'system',
    'system'
FROM users
WHERE tenant_id = '${defaultTenantId}'
  AND (
    COALESCE(NULLIF(TRIM(oidc_sub), ''), '') <> ''
    OR COALESCE(NULLIF(TRIM(email), ''), '') <> ''
  )
ON CONFLICT (tenant_id, oidc_sub) DO NOTHING;
