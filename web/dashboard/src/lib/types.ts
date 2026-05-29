export type AppSection =
  | "home"
  | "servers"
  | "tools"
  | "tool_groups"
  | "prompt_groups"
  | "agent_apps"
  | "prompts"
  | "resources"
  | "diagnostics";

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
}

export interface DashboardServerConfigSummary {
  kind: string;
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

export interface DashboardRegisterServerInput {
  name: string;
  transport: "stdio" | "streamable_http" | "sse";
  description?: string;
  url?: string;
  bearer_token?: string;
  headers?: Record<string, string>;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  session_mode?: "stateless" | "stateful";
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
  oauth_token_url: string;
  tool_group_endpoints: DashboardAgentAppGroupEndpoints[];
  prompt_group_endpoints: DashboardAgentAppGroupEndpoints[];
}

export interface DashboardAgentAppsResponse {
  apps: DashboardAgentApp[];
}

export interface DashboardCreateAgentAppInput {
  name: string;
  description?: string;
  /** Exactly one of tool_group_names or prompt_group_names must contain a single group name. */
  tool_group_names?: string[];
  prompt_group_names?: string[];
}

/** Body for PATCH /dashboard/agent-apps/:id (all fields optional). */
export interface DashboardPatchAgentAppInput {
  name?: string;
  description?: string;
  status?: string;
  /** Exact XOR single-group rule; see CreateAgentAppInput. */
  tool_group_names?: string[];
  prompt_group_names?: string[];
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
  };
  client_secret: string;
  oauth_token_url?: string;
}
