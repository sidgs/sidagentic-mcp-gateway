-- Skills Catalog: multi-version skills, skill sets, scripts, and references.

CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(255) NOT NULL DEFAULT 'sami',
    name VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ux_skill_tenant_name UNIQUE (tenant_id, name),
    CONSTRAINT chk_skill_name CHECK (
        length(name) BETWEEN 1 AND 64
        AND name ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    )
);

CREATE INDEX IF NOT EXISTS idx_skills_tenant_id ON skills (tenant_id);

CREATE TABLE IF NOT EXISTS skill_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID NOT NULL REFERENCES skills (id) ON DELETE CASCADE,
    version VARCHAR(32) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    license TEXT,
    compatibility VARCHAR(500),
    metadata JSONB,
    allowed_tools TEXT[],
    body_content TEXT NOT NULL,
    status VARCHAR(16) NOT NULL DEFAULT 'preview',
    dlc_status VARCHAR(16) NOT NULL DEFAULT 'development',
    locked BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ux_skill_version UNIQUE (skill_id, version),
    CONSTRAINT chk_skill_version_format CHECK (
        version ~ '^[0-9]+(\.[0-9]+)*(-[a-z0-9]+)?$'
    ),
    CONSTRAINT chk_skill_version_status CHECK (
        status IN ('preview', 'active', 'deprecated', 'retired')
    ),
    CONSTRAINT chk_skill_version_dlc_status CHECK (
        dlc_status IN ('development', 'testing', 'released')
    )
);

CREATE INDEX IF NOT EXISTS idx_skill_versions_skill_id ON skill_versions (skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_versions_status ON skill_versions (status);

CREATE TABLE IF NOT EXISTS skill_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(255) NOT NULL DEFAULT 'sami',
    name VARCHAR(64) NOT NULL,
    description VARCHAR(1024) NOT NULL,
    security_option VARCHAR(32) NOT NULL DEFAULT 'basic',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ux_skillset_tenant_name UNIQUE (tenant_id, name)
);

CREATE INDEX IF NOT EXISTS idx_skill_sets_tenant_id ON skill_sets (tenant_id);

CREATE TABLE IF NOT EXISTS skill_set_members (
    skill_set_id UUID NOT NULL REFERENCES skill_sets (id) ON DELETE CASCADE,
    skill_version_id UUID NOT NULL REFERENCES skill_versions (id) ON DELETE CASCADE,
    PRIMARY KEY (skill_set_id, skill_version_id)
);

CREATE INDEX IF NOT EXISTS idx_skill_set_members_version ON skill_set_members (skill_version_id);

CREATE TABLE IF NOT EXISTS skill_scripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_version_id UUID NOT NULL REFERENCES skill_versions (id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    code_content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ux_skill_script_filename UNIQUE (skill_version_id, filename)
);

CREATE INDEX IF NOT EXISTS idx_skill_scripts_version ON skill_scripts (skill_version_id);

CREATE TABLE IF NOT EXISTS skill_references (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_version_id UUID NOT NULL REFERENCES skill_versions (id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    markdown_content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT ux_skill_reference_filename UNIQUE (skill_version_id, filename)
);

CREATE INDEX IF NOT EXISTS idx_skill_references_version ON skill_references (skill_version_id);
