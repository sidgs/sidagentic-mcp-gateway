-- Baseline schema for SAMI MCP Gateway (generated from GORM models).
-- For existing databases created by GORM AutoMigrate, baseline before first migrate:
--   flyway baseline -baselineVersion=1

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.9 (Debian 17.9-1.pgdg13+1)
-- Dumped by pg_dump version 17.9 (Debian 17.9-1.pgdg13+1)


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it




--
-- Name: agent_apps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.agent_apps (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) NOT NULL,
    owner_scope_key character varying(768) NOT NULL,
    name text NOT NULL,
    description text,
    client_id character varying(128) NOT NULL,
    secret_hash text NOT NULL,
    status character varying(32) DEFAULT 'enabled'::character varying NOT NULL,
    tool_group_names jsonb,
    prompt_group_names jsonb,
    skill_set_names jsonb
);


--
-- Name: agent_apps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.agent_apps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: agent_apps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.agent_apps_id_seq OWNED BY public.agent_apps.id;


--
-- Name: mcp_servers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mcp_servers (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name text NOT NULL,
    server_kind character varying(32) DEFAULT 'mcp_protocol'::character varying NOT NULL,
    transport character varying(30) NOT NULL,
    enabled boolean DEFAULT true,
    description text,
    config jsonb NOT NULL,
    session_mode character varying(20) DEFAULT 'stateless'::character varying
);


--
-- Name: mcp_servers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mcp_servers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mcp_servers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mcp_servers_id_seq OWNED BY public.mcp_servers.id;


--
-- Name: prompt_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prompt_groups (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name text NOT NULL,
    description text,
    security_option character varying(32) DEFAULT 'basic'::character varying NOT NULL,
    included_prompts jsonb,
    included_servers jsonb,
    excluded_prompts jsonb
);


--
-- Name: prompt_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.prompt_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prompt_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.prompt_groups_id_seq OWNED BY public.prompt_groups.id;


--
-- Name: prompts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prompts (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name text NOT NULL,
    enabled boolean DEFAULT true,
    description text,
    arguments jsonb,
    server_id bigint NOT NULL
);


--
-- Name: prompts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.prompts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: prompts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.prompts_id_seq OWNED BY public.prompts.id;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resources (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    uri text NOT NULL,
    original_uri text NOT NULL,
    name text NOT NULL,
    enabled boolean DEFAULT true,
    description text,
    mime_type text,
    annotations jsonb,
    meta jsonb,
    server_id bigint NOT NULL
);


--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.resources_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- Name: server_configs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.server_configs (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    mode character varying(12) NOT NULL,
    initialized boolean DEFAULT false NOT NULL
);


--
-- Name: server_configs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.server_configs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: server_configs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.server_configs_id_seq OWNED BY public.server_configs.id;


--
-- Name: skill_references; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_references (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    skill_version_id uuid NOT NULL,
    filename character varying(255) NOT NULL,
    markdown_content text NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL
);


--
-- Name: skill_scripts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_scripts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    skill_version_id uuid NOT NULL,
    filename character varying(255) NOT NULL,
    code_content text NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL
);


--
-- Name: skill_set_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_set_members (
    skill_set_id uuid NOT NULL,
    skill_version_id uuid NOT NULL
);


--
-- Name: skill_sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_sets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name character varying(64) NOT NULL,
    description character varying(1024) NOT NULL,
    security_option character varying(32) DEFAULT 'basic'::character varying NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL
);


--
-- Name: skill_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skill_versions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    skill_id uuid NOT NULL,
    version character varying(32) NOT NULL,
    description character varying(1024) NOT NULL,
    license text,
    compatibility character varying(500),
    metadata jsonb,
    allowed_tools jsonb,
    body_content text NOT NULL,
    status character varying(16) DEFAULT 'preview'::character varying NOT NULL,
    dlc_status character varying(16) DEFAULT 'development'::character varying NOT NULL,
    locked boolean DEFAULT false NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL
);


--
-- Name: skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name character varying(64) NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL
);


--
-- Name: team_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_members (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    team_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role character varying(32) NOT NULL
);


--
-- Name: team_members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_members_id_seq OWNED BY public.team_members.id;


--
-- Name: team_resource_assignments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_resource_assignments (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    team_id bigint NOT NULL,
    resource_type character varying(64) NOT NULL,
    resource_name character varying(255) NOT NULL
);


--
-- Name: team_resource_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_resource_assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_resource_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_resource_assignments_id_seq OWNED BY public.team_resource_assignments.id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teams (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name character varying(255) NOT NULL,
    type character varying(32) NOT NULL,
    created_by_user_id bigint NOT NULL
);


--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: tenant_memberships; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenant_memberships (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) NOT NULL,
    oidc_sub character varying(255) NOT NULL,
    email character varying(320) DEFAULT ''::character varying NOT NULL,
    role character varying(32) DEFAULT 'user'::character varying NOT NULL
);


--
-- Name: tenant_memberships_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenant_memberships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tenant_memberships_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenant_memberships_id_seq OWNED BY public.tenant_memberships.id;


--
-- Name: tenants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenants (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(32) DEFAULT 'active'::character varying NOT NULL,
    mode character varying(32) DEFAULT 'normal'::character varying NOT NULL,
    retire_at timestamp with time zone,
    owner_email character varying(320) DEFAULT ''::character varying NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL
);


--
-- Name: tool_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tool_groups (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name text NOT NULL,
    description text,
    security_option character varying(32) DEFAULT 'basic'::character varying NOT NULL,
    included_tools jsonb,
    included_servers jsonb,
    excluded_tools jsonb
);


--
-- Name: tool_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tool_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tool_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tool_groups_id_seq OWNED BY public.tool_groups.id;


--
-- Name: tool_invocation_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tool_invocation_events (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    agent_app_id bigint,
    tool_group_name character varying(255),
    mcp_server_name character varying(255) NOT NULL,
    tool_name character varying(255) NOT NULL,
    outcome character varying(16) NOT NULL,
    latency_ms bigint NOT NULL,
    source character varying(32) NOT NULL,
    auth_kind character varying(32) NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying
);


--
-- Name: tool_invocation_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tool_invocation_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tool_invocation_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tool_invocation_events_id_seq OWNED BY public.tool_invocation_events.id;


--
-- Name: tools; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tools (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    name text NOT NULL,
    enabled boolean DEFAULT true,
    description text,
    input_schema jsonb,
    annotations jsonb,
    rest_operation jsonb,
    server_id bigint NOT NULL
);


--
-- Name: tools_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tools_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tools_id_seq OWNED BY public.tools.id;


--
-- Name: upstream_o_auth_pending_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.upstream_o_auth_pending_sessions (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    session_id text NOT NULL,
    server_name text NOT NULL,
    transport character varying(30) NOT NULL,
    server_input jsonb NOT NULL,
    force boolean DEFAULT false NOT NULL,
    redirect_uri text,
    client_id text,
    client_secret text,
    scopes jsonb,
    state text NOT NULL,
    code_verifier text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    initiated_by text
);


--
-- Name: upstream_o_auth_pending_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.upstream_o_auth_pending_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upstream_o_auth_pending_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.upstream_o_auth_pending_sessions_id_seq OWNED BY public.upstream_o_auth_pending_sessions.id;


--
-- Name: upstream_o_auth_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.upstream_o_auth_tokens (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    server_name text NOT NULL,
    transport character varying(30) NOT NULL,
    client_id text,
    client_secret text,
    redirect_uri text,
    scopes jsonb,
    access_token text,
    token_type text,
    refresh_token text,
    scope text,
    expires_at timestamp with time zone
);


--
-- Name: upstream_o_auth_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.upstream_o_auth_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upstream_o_auth_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.upstream_o_auth_tokens_id_seq OWNED BY public.upstream_o_auth_tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    created_on timestamp with time zone,
    created_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    updated_on timestamp with time zone,
    updated_by character varying(320) DEFAULT 'system'::character varying NOT NULL,
    deleted_at timestamp with time zone,
    tenant_id character varying(255) DEFAULT 'sami'::character varying NOT NULL,
    username text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL,
    access_token text NOT NULL,
    email character varying(320),
    oidc_sub character varying(255)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: agent_apps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agent_apps ALTER COLUMN id SET DEFAULT nextval('public.agent_apps_id_seq'::regclass);


--
-- Name: mcp_servers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mcp_servers ALTER COLUMN id SET DEFAULT nextval('public.mcp_servers_id_seq'::regclass);


--
-- Name: prompt_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prompt_groups ALTER COLUMN id SET DEFAULT nextval('public.prompt_groups_id_seq'::regclass);


--
-- Name: prompts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prompts ALTER COLUMN id SET DEFAULT nextval('public.prompts_id_seq'::regclass);


--
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- Name: server_configs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_configs ALTER COLUMN id SET DEFAULT nextval('public.server_configs_id_seq'::regclass);


--
-- Name: team_members id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members ALTER COLUMN id SET DEFAULT nextval('public.team_members_id_seq'::regclass);


--
-- Name: team_resource_assignments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_resource_assignments ALTER COLUMN id SET DEFAULT nextval('public.team_resource_assignments_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: tenant_memberships id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_memberships ALTER COLUMN id SET DEFAULT nextval('public.tenant_memberships_id_seq'::regclass);


--
-- Name: tool_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tool_groups ALTER COLUMN id SET DEFAULT nextval('public.tool_groups_id_seq'::regclass);


--
-- Name: tool_invocation_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tool_invocation_events ALTER COLUMN id SET DEFAULT nextval('public.tool_invocation_events_id_seq'::regclass);


--
-- Name: tools id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools ALTER COLUMN id SET DEFAULT nextval('public.tools_id_seq'::regclass);


--
-- Name: upstream_o_auth_pending_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upstream_o_auth_pending_sessions ALTER COLUMN id SET DEFAULT nextval('public.upstream_o_auth_pending_sessions_id_seq'::regclass);


--
-- Name: upstream_o_auth_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upstream_o_auth_tokens ALTER COLUMN id SET DEFAULT nextval('public.upstream_o_auth_tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: agent_apps agent_apps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agent_apps
    ADD CONSTRAINT agent_apps_pkey PRIMARY KEY (id);


--
-- Name: mcp_servers mcp_servers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mcp_servers
    ADD CONSTRAINT mcp_servers_pkey PRIMARY KEY (id);


--
-- Name: prompt_groups prompt_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prompt_groups
    ADD CONSTRAINT prompt_groups_pkey PRIMARY KEY (id);


--
-- Name: prompts prompts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prompts
    ADD CONSTRAINT prompts_pkey PRIMARY KEY (id);


--
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: server_configs server_configs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.server_configs
    ADD CONSTRAINT server_configs_pkey PRIMARY KEY (id);


--
-- Name: skill_references skill_references_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_references
    ADD CONSTRAINT skill_references_pkey PRIMARY KEY (id);


--
-- Name: skill_scripts skill_scripts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_scripts
    ADD CONSTRAINT skill_scripts_pkey PRIMARY KEY (id);


--
-- Name: skill_set_members skill_set_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_set_members
    ADD CONSTRAINT skill_set_members_pkey PRIMARY KEY (skill_set_id, skill_version_id);


--
-- Name: skill_sets skill_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_sets
    ADD CONSTRAINT skill_sets_pkey PRIMARY KEY (id);


--
-- Name: skill_versions skill_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_versions
    ADD CONSTRAINT skill_versions_pkey PRIMARY KEY (id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (id);


--
-- Name: team_resource_assignments team_resource_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_resource_assignments
    ADD CONSTRAINT team_resource_assignments_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: tenant_memberships tenant_memberships_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenant_memberships
    ADD CONSTRAINT tenant_memberships_pkey PRIMARY KEY (id);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: tool_groups tool_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tool_groups
    ADD CONSTRAINT tool_groups_pkey PRIMARY KEY (id);


--
-- Name: tool_invocation_events tool_invocation_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tool_invocation_events
    ADD CONSTRAINT tool_invocation_events_pkey PRIMARY KEY (id);


--
-- Name: tools tools_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_pkey PRIMARY KEY (id);


--
-- Name: upstream_o_auth_pending_sessions upstream_o_auth_pending_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upstream_o_auth_pending_sessions
    ADD CONSTRAINT upstream_o_auth_pending_sessions_pkey PRIMARY KEY (id);


--
-- Name: upstream_o_auth_tokens upstream_o_auth_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upstream_o_auth_tokens
    ADD CONSTRAINT upstream_o_auth_tokens_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_agent_apps_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_agent_apps_deleted_at ON public.agent_apps USING btree (deleted_at);


--
-- Name: idx_mcp_servers_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mcp_servers_deleted_at ON public.mcp_servers USING btree (deleted_at);


--
-- Name: idx_prompt_groups_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prompt_groups_deleted_at ON public.prompt_groups USING btree (deleted_at);


--
-- Name: idx_prompts_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prompts_deleted_at ON public.prompts USING btree (deleted_at);


--
-- Name: idx_prompts_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_prompts_tenant_id ON public.prompts USING btree (tenant_id);


--
-- Name: idx_resources_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_resources_deleted_at ON public.resources USING btree (deleted_at);


--
-- Name: idx_resources_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_resources_tenant_id ON public.resources USING btree (tenant_id);


--
-- Name: idx_server_configs_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_server_configs_deleted_at ON public.server_configs USING btree (deleted_at);


--
-- Name: idx_team_members_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_members_deleted_at ON public.team_members USING btree (deleted_at);


--
-- Name: idx_team_members_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_members_team_id ON public.team_members USING btree (team_id);


--
-- Name: idx_team_members_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_members_user_id ON public.team_members USING btree (user_id);


--
-- Name: idx_team_resource_assignments_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_resource_assignments_deleted_at ON public.team_resource_assignments USING btree (deleted_at);


--
-- Name: idx_team_resource_assignments_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_resource_assignments_team_id ON public.team_resource_assignments USING btree (team_id);


--
-- Name: idx_team_resource_lookup; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_team_resource_lookup ON public.team_resource_assignments USING btree (resource_type, resource_name);


--
-- Name: idx_teams_created_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teams_created_by_user_id ON public.teams USING btree (created_by_user_id);


--
-- Name: idx_teams_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_teams_deleted_at ON public.teams USING btree (deleted_at);


--
-- Name: idx_tenant_memberships_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_memberships_deleted_at ON public.tenant_memberships USING btree (deleted_at);


--
-- Name: idx_tenant_memberships_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_memberships_email ON public.tenant_memberships USING btree (email);


--
-- Name: idx_tenant_memberships_o_id_c_sub; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_memberships_o_id_c_sub ON public.tenant_memberships USING btree (oidc_sub);


--
-- Name: idx_tenant_memberships_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenant_memberships_tenant_id ON public.tenant_memberships USING btree (tenant_id);


--
-- Name: idx_tenants_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tenants_status ON public.tenants USING btree (status);


--
-- Name: idx_tool_groups_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tool_groups_deleted_at ON public.tool_groups USING btree (deleted_at);


--
-- Name: idx_tool_inv_agent_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tool_inv_agent_created ON public.tool_invocation_events USING btree (agent_app_id);


--
-- Name: idx_tool_inv_group_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tool_inv_group_created ON public.tool_invocation_events USING btree (tool_group_name);


--
-- Name: idx_tool_inv_tenant_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tool_inv_tenant_created ON public.tool_invocation_events USING btree (tenant_id);


--
-- Name: idx_tool_inv_tool_created; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tool_inv_tool_created ON public.tool_invocation_events USING btree (mcp_server_name, tool_name);


--
-- Name: idx_tool_invocation_events_created_on; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tool_invocation_events_created_on ON public.tool_invocation_events USING btree (created_on);


--
-- Name: idx_tools_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tools_deleted_at ON public.tools USING btree (deleted_at);


--
-- Name: idx_tools_tenant_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_tools_tenant_id ON public.tools USING btree (tenant_id);


--
-- Name: idx_upstream_o_auth_pending_sessions_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_upstream_o_auth_pending_sessions_deleted_at ON public.upstream_o_auth_pending_sessions USING btree (deleted_at);


--
-- Name: idx_upstream_o_auth_pending_sessions_expires_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_upstream_o_auth_pending_sessions_expires_at ON public.upstream_o_auth_pending_sessions USING btree (expires_at);


--
-- Name: idx_upstream_o_auth_pending_sessions_server_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_upstream_o_auth_pending_sessions_server_name ON public.upstream_o_auth_pending_sessions USING btree (server_name);


--
-- Name: idx_upstream_o_auth_tokens_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_upstream_o_auth_tokens_deleted_at ON public.upstream_o_auth_tokens USING btree (deleted_at);


--
-- Name: idx_users_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_deleted_at ON public.users USING btree (deleted_at);


--
-- Name: ux_agentapp_client; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_agentapp_client ON public.agent_apps USING btree (tenant_id, client_id);


--
-- Name: ux_agentapp_scope_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_agentapp_scope_name ON public.agent_apps USING btree (tenant_id, owner_scope_key, name);


--
-- Name: ux_mcp_server_tenant_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_mcp_server_tenant_name ON public.mcp_servers USING btree (tenant_id, name);


--
-- Name: ux_oauth_pending_session; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_oauth_pending_session ON public.upstream_o_auth_pending_sessions USING btree (tenant_id, session_id);


--
-- Name: ux_oauth_token_server; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_oauth_token_server ON public.upstream_o_auth_tokens USING btree (tenant_id, server_name);


--
-- Name: ux_promptgroup_tenant_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_promptgroup_tenant_name ON public.prompt_groups USING btree (tenant_id, name);


--
-- Name: ux_server_config_tenant; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_server_config_tenant ON public.server_configs USING btree (tenant_id);


--
-- Name: ux_skill_reference_filename; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_skill_reference_filename ON public.skill_references USING btree (skill_version_id, filename);


--
-- Name: ux_skill_script_filename; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_skill_script_filename ON public.skill_scripts USING btree (skill_version_id, filename);


--
-- Name: ux_skill_tenant_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_skill_tenant_name ON public.skills USING btree (tenant_id, name);


--
-- Name: ux_skill_version; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_skill_version ON public.skill_versions USING btree (skill_id, version);


--
-- Name: ux_skillset_tenant_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_skillset_tenant_name ON public.skill_sets USING btree (tenant_id, name);


--
-- Name: ux_team_member_tenant_team_user; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_team_member_tenant_team_user ON public.team_members USING btree (tenant_id, team_id, user_id);


--
-- Name: ux_team_resource_tenant_team_type_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_team_resource_tenant_team_type_name ON public.team_resource_assignments USING btree (tenant_id, team_id, resource_type, resource_name);


--
-- Name: ux_team_tenant_name_type; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_team_tenant_name_type ON public.teams USING btree (tenant_id, name, type);


--
-- Name: ux_tenant_membership_tenant_sub; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_tenant_membership_tenant_sub ON public.tenant_memberships USING btree (tenant_id, oidc_sub);


--
-- Name: ux_toolgroup_tenant_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_toolgroup_tenant_name ON public.tool_groups USING btree (tenant_id, name);


--
-- Name: ux_user_tenant_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_user_tenant_email ON public.users USING btree (tenant_id, email) WHERE ((email)::text <> ''::text);


--
-- Name: ux_user_tenant_oidc_sub; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_user_tenant_oidc_sub ON public.users USING btree (tenant_id, oidc_sub) WHERE ((oidc_sub)::text <> ''::text);


--
-- Name: ux_user_tenant_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_user_tenant_token ON public.users USING btree (tenant_id, access_token);


--
-- Name: ux_user_tenant_username; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ux_user_tenant_username ON public.users USING btree (tenant_id, username);


--
-- Name: prompts fk_prompts_server; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prompts
    ADD CONSTRAINT fk_prompts_server FOREIGN KEY (server_id) REFERENCES public.mcp_servers(id);


--
-- Name: resources fk_resources_server; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT fk_resources_server FOREIGN KEY (server_id) REFERENCES public.mcp_servers(id);


--
-- Name: skill_set_members fk_skill_set_members_skill_version; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_set_members
    ADD CONSTRAINT fk_skill_set_members_skill_version FOREIGN KEY (skill_version_id) REFERENCES public.skill_versions(id) ON DELETE CASCADE;


--
-- Name: skill_set_members fk_skill_sets_members; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_set_members
    ADD CONSTRAINT fk_skill_sets_members FOREIGN KEY (skill_set_id) REFERENCES public.skill_sets(id) ON DELETE CASCADE;


--
-- Name: skill_references fk_skill_versions_references; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_references
    ADD CONSTRAINT fk_skill_versions_references FOREIGN KEY (skill_version_id) REFERENCES public.skill_versions(id) ON DELETE CASCADE;


--
-- Name: skill_scripts fk_skill_versions_scripts; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_scripts
    ADD CONSTRAINT fk_skill_versions_scripts FOREIGN KEY (skill_version_id) REFERENCES public.skill_versions(id) ON DELETE CASCADE;


--
-- Name: skill_versions fk_skills_versions; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skill_versions
    ADD CONSTRAINT fk_skills_versions FOREIGN KEY (skill_id) REFERENCES public.skills(id) ON DELETE CASCADE;


--
-- Name: tools fk_tools_server; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT fk_tools_server FOREIGN KEY (server_id) REFERENCES public.mcp_servers(id);


--
-- PostgreSQL database dump complete
--


