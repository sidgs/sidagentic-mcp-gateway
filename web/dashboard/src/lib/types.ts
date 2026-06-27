export type AppSection =
  | "home"
  | "servers"
  | "tools"
  | "tool_groups"
  | "prompt_groups"
  | "skills"
  | "skill_sets"
  | "agent_apps"
  | "teams"
  | "users"
  | "prompts"
  | "resources"
  | "diagnostics"
  | "observability"
  | "lineage";

export type TeamType = "provider" | "user" | "agent";

export interface DashboardTeamMembership {
  id: number;
  name: string;
  type: TeamType;
  member_role: string;
}

export interface DashboardTeam {
  id: number;
  tenant_id: string;
  name: string;
  type: TeamType;
  created_by_user_id: number;
}

export interface DashboardTeamMember {
  user_id: number;
  username?: string;
  email?: string;
  role: string;
}

export interface DashboardTeamDetail {
  team: DashboardTeam;
  members: DashboardTeamMember[];
}

export interface DashboardUser {
  id?: number;
  username: string;
  role: string;
  email?: string;
}

export interface DashboardMeResponse {
  authenticated: boolean;
  email?: string;
  sub?: string;
  role: string;
  user_id: number;
  teams: DashboardTeamMembership[];
}

export interface DashboardEmptyState {
  title: string;
  description: string;
  commands?: string[];
}

export interface DashboardEndpoint {
  label: string;
  url: string;
}

export interface DashboardOverviewResponse {
  status: "running" | "degraded" | "unknown";
  mode: string;
  version: string;
  endpoints: DashboardEndpoint[];
  server_count: number;
  tool_count: number;
  prompt_count: number;
  resource_count: number;
  empty_state?: DashboardEmptyState;
  troubleshooting?: string[];
  /** Present when Cognito/OIDC dashboard login is enabled on the gateway. */
  oidc_login_path?: string;
  /** Sign out clears the OIDC session and returns to the dashboard entry URL. */
  oidc_logout_path?: string;
}

/** Response from GET /dashboard/auth-status (no login required when OIDC is on). */
export interface DashboardAuthStatusResponse {
  authenticated: boolean;
  oidc_enabled: boolean;
  login_path?: string;
  logout_path?: string;
  email?: string;
  sub?: string;
  role?: string;
  user_id?: number;
  teams?: DashboardTeamMembership[];
}

export type ServerKind = "mcp_protocol" | "rest_openapi" | "rest_endpoint";

export type RestAuthType = "none" | "api_key" | "basic" | "bearer" | "oauth";

export interface DashboardRestAuthConfig {
  type?: RestAuthType;
  api_key_header?: string;
  api_key_query?: string;
  api_key_value?: string;
  username?: string;
  password?: string;
  headers?: Record<string, string>;
}

export interface DashboardRestParameter {
  name: string;
  in: string;
  type?: string;
  required?: boolean;
  description?: string;
}

export interface DashboardServerConfigSummary {
  kind: string;
  server_kind?: string;
  transport?: string;
  target?: string;
  command?: string;
  argument_count?: number;
  env_keys?: string[];
  header_keys?: string[];
  session_mode?: string;
  description?: string;
  sanitized_summary: string;
}

export interface DashboardServer {
  name: string;
  server_kind?: string;
  transport: string;
  enabled: boolean;
  status: "connected" | "reachable" | "failed" | "unknown";
  tool_count: number;
  prompt_count: number;
  resource_count: number;
  last_discovered_at?: string;
  updated_at?: string;
  connection_summary: string;
  config_summary: DashboardServerConfigSummary;
}

export interface DashboardServersResponse {
  servers: DashboardServer[];
  empty_state?: DashboardEmptyState;
}

export interface DashboardTool {
  name: string;
  canonical_name: string;
  server: string;
  description: string;
  enabled: boolean;
  server_enabled: boolean;
  input_schema?: Record<string, unknown>;
  input_preview?: string;
  transport?: string;
  server_status?: string;
  annotation_keys?: string[];
}

export interface DashboardToolsResponse {
  tools: DashboardTool[];
  empty_state?: DashboardEmptyState;
}

export type GroupSecurityOption = "open" | "api_key" | "basic" | "bearer";

export interface DashboardToolGroupTool {
  name: string;
  canonical_name: string;
  server: string;
  description?: string;
}

export interface DashboardToolGroup {
  name: string;
  description?: string;
  security_option: GroupSecurityOption;
  included_tools: string[];
  included_servers: string[];
  excluded_tools: string[];
  tool_count: number;
  tools: DashboardToolGroupTool[];
  streamable_http_endpoint: string;
  sse_endpoint: string;
  sse_message_endpoint: string;
}

export interface DashboardToolGroupsResponse {
  tool_groups: DashboardToolGroup[];
  empty_state?: DashboardEmptyState;
}

export interface DashboardPromptGroupPrompt {
  name: string;
  canonical_name: string;
  server: string;
  description?: string;
}

export interface DashboardPromptGroup {
  name: string;
  description?: string;
  security_option: GroupSecurityOption;
  prompt_count: number;
  prompts: DashboardPromptGroupPrompt[];
  streamable_http_endpoint: string;
  sse_endpoint: string;
  sse_message_endpoint: string;
}

export interface DashboardPromptGroupsResponse {
  prompt_groups: DashboardPromptGroup[];
  empty_state?: DashboardEmptyState;
}

export interface DashboardPrompt {
  name: string;
  canonical_name: string;
  server: string;
  description: string;
  enabled: boolean;
  server_enabled: boolean;
  arguments?: Array<Record<string, unknown>>;
  arguments_preview?: string;
  transport?: string;
  server_status?: string;
}

export interface DashboardPromptsResponse {
  prompts: DashboardPrompt[];
  empty_state?: DashboardEmptyState;
}

export interface DashboardResource {
  uri: string;
  name: string;
  server: string;
  description: string;
  mime_type?: string;
  enabled: boolean;
  transport?: string;
  server_status?: string;
}

export interface DashboardResourcesResponse {
  resources: DashboardResource[];
  empty_state?: DashboardEmptyState;
}

export interface DashboardDiagnosticsResponse {
  version: string;
  mode: string;
  config_source?: string;
  config_path?: string;
  database: string;
  enabled_transports: string[];
  metrics_endpoint?: string;
  primary_endpoint: string;
  troubleshooting_hints: string[];
  server_count: number;
  tool_count: number;
  prompt_count: number;
  resource_count: number;
  empty_state?: DashboardEmptyState;
}

export interface DashboardLineageNode {
  id: string;
  kind: "agent_app" | "tool_group" | "server" | "tool" | string;
  label: string;
  meta?: Record<string, string>;
}

export interface DashboardLineageEdge {
  id: string;
  source: string;
  target: string;
  kind: string;
  label?: string;
  weight?: number;
}

export interface DashboardLineageResponse {
  usage_window?: string;
  nodes: DashboardLineageNode[];
  edges: DashboardLineageEdge[];
  empty_state?: DashboardEmptyState;
}

export type ObservabilityRange = "24h" | "7d" | "30d";

export interface DashboardObservabilitySummary {
  total_calls: number;
  success_calls: number;
  error_calls: number;
  success_rate: number;
  active_agents: number;
  active_tools: number;
  active_tool_sets: number;
  avg_latency_ms: number;
}

export interface DashboardAgentUsage {
  agent_app_id?: number;
  agent_name: string;
  client_id?: string;
  total_calls: number;
  success_calls: number;
  error_calls: number;
  success_rate: number;
  avg_latency_ms: number;
}

export interface DashboardToolTraffic {
  mcp_server_name: string;
  tool_name: string;
  canonical_name: string;
  total_calls: number;
  success_calls: number;
  error_calls: number;
  success_rate: number;
  avg_latency_ms: number;
  p95_latency_ms: number;
}

export interface DashboardToolGroupTraffic {
  tool_group_name: string;
  total_calls: number;
  success_calls: number;
  error_calls: number;
  success_rate: number;
  avg_latency_ms: number;
}

export interface DashboardTimeBucket {
  timestamp: string;
  total_calls: number;
  success_calls: number;
  error_calls: number;
}

export interface DashboardObservabilityResponse {
  range: string;
  from: string;
  to: string;
  summary: DashboardObservabilitySummary;
  by_agent: DashboardAgentUsage[];
  top_tools: DashboardToolTraffic[];
  top_tool_groups: DashboardToolGroupTraffic[];
  tool_traffic: DashboardToolTraffic[];
  call_volume_series: DashboardTimeBucket[];
  empty_state?: DashboardEmptyState;
}

export interface DashboardRegisterServerInput {
  name: string;
  server_kind?: ServerKind;
  transport: "stdio" | "streamable_http" | "sse" | "rest";
  description?: string;
  url?: string;
  bearer_token?: string;
  headers?: Record<string, string>;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  session_mode?: "stateless" | "stateful";
  base_url?: string;
  openapi_spec_url?: string;
  openapi_spec?: string;
  excluded_operations?: string[];
  rest_auth?: DashboardRestAuthConfig;
  method?: string;
  path?: string;
  tool_name?: string;
  tool_description?: string;
  parameters?: DashboardRestParameter[];
  /** Present in GET /dashboard/servers/:name/config when upstream OAuth metadata exists; not sent on create. */
  oauth_redirect_uri?: string;
  oauth_client_id?: string;
  oauth_client_secret?: string;
  oauth_scopes?: string[];
}

export interface DashboardCreateToolGroupInput {
  name: string;
  description?: string;
  tools: string[];
  included_servers?: string[];
  excluded_tools?: string[];
  security_option?: GroupSecurityOption;
}

export interface DashboardCreatePromptGroupInput {
  name: string;
  description?: string;
  prompts: string[];
  security_option?: GroupSecurityOption;
}

export interface DashboardUpdateToolGroupInput {
  description?: string;
  tools: string[];
  included_servers?: string[];
  excluded_tools?: string[];
  security_option?: GroupSecurityOption;
}

export interface DashboardUpdatePromptGroupInput {
  description?: string;
  prompts: string[];
  security_option?: GroupSecurityOption;
}

export interface DashboardOAuthAuthorizationRequired {
  session_id: string;
  authorization_url: string;
  expires_at: string;
}

export interface DashboardRegisterServerResponse {
  name?: string;
  transport?: string;
  enabled?: boolean;
  description?: string;
  authorization_required?: DashboardOAuthAuthorizationRequired;
}

export interface DashboardOAuthSessionResponse {
  session_id: string;
  status: "pending" | "completed" | "failed" | "expired";
  server_name?: string;
  expires_at?: string;
  error?: string;
}

export interface DashboardAgentAppGroupEndpoints {
  name: string;
  streamable_http_endpoint: string;
  sse_endpoint: string;
  sse_message_endpoint: string;
}

export interface DashboardAgentApp {
  id: number;
  name: string;
  description?: string;
  client_id: string;
  status: string;
  tool_group_names: string[];
  prompt_group_names: string[];
  skill_set_names: string[];
  agent_team_ids?: number[];
  oauth_token_url: string;
  tool_group_endpoints: DashboardAgentAppGroupEndpoints[];
  prompt_group_endpoints: DashboardAgentAppGroupEndpoints[];
  skill_set_endpoints: DashboardAgentAppGroupEndpoints[];
}

export interface DashboardSkillVersionSummary {
  id: string;
  name: string;
  version: string;
  description: string;
  status: string;
  dlc_status: string;
  locked: boolean;
}

export interface DashboardSkillVersionDetail extends DashboardSkillVersionSummary {
  license?: string;
  compatibility?: string;
  metadata?: Record<string, string>;
  allowed_tools?: string[];
  body_content: string;
  scripts: string[];
  references: string[];
  script_files?: { filename: string; code_content: string }[];
  reference_files?: { filename: string; markdown_content: string }[];
}

export interface DashboardSkillsResponse {
  skills: DashboardSkillVersionSummary[];
}

export interface DashboardSkillSetMember {
  skill_version_id: string;
  name: string;
  version: string;
  description: string;
  status: string;
}

export interface DashboardSkillSet {
  name: string;
  description: string;
  security_option: string;
  members: DashboardSkillSetMember[];
  member_count: number;
  catalog_endpoint: string;
}

export interface DashboardSkillSetSummary {
  name: string;
  description: string;
  member_count: number;
}

export interface DashboardSkillSetsResponse {
  skill_sets: DashboardSkillSetSummary[];
}

export interface DashboardCreateSkillInput {
  name: string;
  version: string;
  description: string;
  license?: string;
  compatibility?: string;
  body_content: string;
  allowed_tools?: string[];
  scripts?: { filename: string; code_content: string }[];
  references?: { filename: string; markdown_content: string }[];
}

export interface DashboardUpdateSkillInput {
  description: string;
  license?: string;
  compatibility?: string;
  body_content: string;
  allowed_tools?: string[];
  scripts?: { filename: string; code_content: string }[];
  references?: { filename: string; markdown_content: string }[];
}

export interface DashboardSkillSetMemberInput {
  skill_version_id?: string;
  skill_name?: string;
  version?: string;
}

export interface DashboardCreateSkillSetInput {
  name: string;
  description: string;
  security_option?: string;
  members: DashboardSkillSetMemberInput[];
}

export interface DashboardUpdateSkillSetInput {
  description?: string;
  security_option?: string;
  members?: DashboardSkillSetMemberInput[];
}

export interface DashboardAgentAppsResponse {
  apps: DashboardAgentApp[];
}

export interface DashboardCreateAgentAppInput {
  name: string;
  description?: string;
  /** Exactly one of tool_group_names or prompt_group_names must contain a single name; skill_set_names may list zero or more. */
  tool_group_names?: string[];
  prompt_group_names?: string[];
  skill_set_names?: string[];
  agent_team_ids?: number[];
}

/** Body for PATCH /dashboard/agent-apps/:id (all fields optional). */
export interface DashboardPatchAgentAppInput {
  name?: string;
  description?: string;
  status?: string;
  /** Exactly one tool or prompt group; optional skill sets. See CreateAgentAppInput. */
  tool_group_names?: string[];
  prompt_group_names?: string[];
  skill_set_names?: string[];
  agent_team_ids?: number[];
}

export interface DashboardCreateAgentAppResponse {
  app: {
    id: number;
    name: string;
    description?: string;
    client_id: string;
    status: string;
    tool_group_names: string[];
    prompt_group_names: string[];
    skill_set_names: string[];
  };
  client_secret: string;
  oauth_token_url?: string;
}
