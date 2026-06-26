import { useCallback, useEffect, useMemo, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { api } from "@/lib/api";
import { DashboardAuthRequiredError, EmbedAuthMissingError, redirectToGatewayLogin } from "@/lib/auth";
import {
  getExternalAuthHeaders,
  parseEmbedClaims,
  resolveExternalAuthToken,
} from "@/lib/embedAuth";
import {
  isComponentMode,
  isExternalAuthMode,
  resolveDefaultAppSection,
  usesHashRouting,
} from "@/lib/runtimeConfig";
import {
  appAgentAppDetailHash,
  appSectionToHash,
  parseAppSectionFromHash,
  parseHashRoute,
  promptDetailHash,
  promptGroupDetailHash,
  replaceDashboardLocation,
  serverDetailHash,
  setDashboardLocationHash,
  toolDetailHash,
  toolGroupCreateHash,
  toolGroupDetailHash,
  toolGroupEditHash,
  type ToolGroupFormMode,
} from "@/lib/hashRoute";
import type {
  AppSection,
  DashboardAgentApp,
  DashboardAgentAppGroupEndpoints,
  DashboardAgentAppsResponse,
  DashboardAuthStatusResponse,
  DashboardCreateAgentAppInput,
  DashboardPatchAgentAppInput,
  DashboardCreatePromptGroupInput,
  DashboardCreateToolGroupInput,
  DashboardUpdatePromptGroupInput,
  DashboardUpdateToolGroupInput,
  DashboardDiagnosticsResponse,
  DashboardLineageResponse,
  DashboardObservabilityResponse,
  ObservabilityRange,
  GroupSecurityOption,
  DashboardOAuthAuthorizationRequired,
  DashboardOverviewResponse,
  DashboardPrompt,
  DashboardPromptsResponse,
  DashboardPromptGroup,
  DashboardPromptGroupsResponse,
  DashboardRegisterServerInput,
  DashboardRegisterServerResponse,
  DashboardResource,
  DashboardRestParameter,
  RestAuthType,
  ServerKind,
  DashboardResourcesResponse,
  DashboardServer,
  DashboardServersResponse,
  DashboardToolGroup,
  DashboardToolGroupsResponse,
  DashboardTool,
  DashboardToolsResponse,
} from "@/lib/types";
import { CopyButton } from "@/components/CopyButton";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { HomePage } from "@/components/HomePage";
import { NavSidebar } from "@/components/NavSidebar";
import { NavTabs } from "@/components/NavTabs";
import { LineagePage } from "@/components/LineagePage";
import { ObservabilityPage } from "@/components/ObservabilityPage";
import { SectionCard } from "@/components/SectionCard";
import { SkillsSection } from "@/components/SkillsSection";
import { SkillSetsCatalogPanel } from "@/components/SkillSetsCatalogPanel";
import { StatusBadge } from "@/components/StatusBadge";
import { monospaceFontFamily } from "@/theme";

/** Bash single-quoted string literal (escapes embedded `'`). */
function bashSingleQuoted(s: string): string {
  return `'${s.replace(/'/g, `'\\''`)}'`;
}

/** Example curl for agent-app OAuth token (client_credentials); secret is a placeholder. */
function agentAppOAuthTokenCurlCommand(oauthTokenURL: string, clientId: string): string {
  return [
    `curl -sS -X POST ${bashSingleQuoted(oauthTokenURL)} \\`,
    `  -H ${bashSingleQuoted("Content-Type: application/x-www-form-urlencoded")} \\`,
    `  --data-urlencode ${bashSingleQuoted("grant_type=client_credentials")} \\`,
    `  --data-urlencode ${bashSingleQuoted(`client_id=${clientId}`)} \\`,
    `  --data-urlencode ${bashSingleQuoted("client_secret=YOUR_CLIENT_SECRET")}`,
  ].join("\n");
}

const GROUP_SECURITY_OPTIONS: { value: GroupSecurityOption; label: string }[] = [
  { value: "open", label: "Open (no auth)" },
  { value: "api_key", label: "API key (client id in X-API-Key)" },
  { value: "basic", label: "Basic auth" },
  { value: "bearer", label: "Bearer (agent-app JWT)" },
];

function groupSecurityLabel(value: string): string {
  const row = GROUP_SECURITY_OPTIONS.find((o) => o.value === value);
  return row?.label ?? value;
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 16 16" width="18">
      <path
        d="M2.75 4.25h10.5M6.25 2.75h3.5m-5.75 1.5.44 7.04A1.5 1.5 0 0 0 5.94 12.75h4.12a1.5 1.5 0 0 0 1.5-1.46L12 4.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M6.5 6.5v3.5M9.5 6.5v3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 16 16" width="18">
      <path
        d="M10.5 2.5 13.5 5.5M2 14l3-.75 8.75-8.75a1.4 1.4 0 0 0-2-2L3.25 11.25 2 14Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

type LoadState = "idle" | "checking_session" | "loading" | "ready" | "error";
type FeedbackTone = "success" | "error";

interface DashboardData {
  overview?: DashboardOverviewResponse;
  servers?: DashboardServersResponse;
  tools?: DashboardToolsResponse;
  toolGroups?: DashboardToolGroupsResponse;
  promptGroups?: DashboardPromptGroupsResponse;
  prompts?: DashboardPromptsResponse;
  resources?: DashboardResourcesResponse;
  diagnostics?: DashboardDiagnosticsResponse;
  agentApps?: DashboardAgentAppsResponse;
  skillSets?: { skill_sets: { name: string; description: string; member_count: number }[] };
}

interface FeedbackMessage {
  tone: FeedbackTone;
  message: string;
}

interface KeyValueRow {
  key: string;
  value: string;
}

interface RestParameterRow {
  name: string;
  in: "path" | "query" | "header";
  type: string;
  required: boolean;
  description: string;
}

type UpstreamType = ServerKind;

interface RegisterServerFormState {
  name: string;
  description: string;
  upstream_type: UpstreamType;
  transport: "stdio" | "streamable_http" | "sse" | "rest";
  session_mode: "stateless" | "stateful";
  command: string;
  args_text: string;
  env_rows: KeyValueRow[];
  url: string;
  bearer_token: string;
  header_rows: KeyValueRow[];
  base_url: string;
  spec_source: "url" | "inline";
  openapi_spec_url: string;
  openapi_spec_inline: string;
  excluded_operations_text: string;
  method: string;
  path: string;
  tool_name: string;
  tool_description: string;
  parameter_rows: RestParameterRow[];
  rest_auth_type: RestAuthType;
  api_key_header: string;
  api_key_query: string;
  api_key_value: string;
  basic_username: string;
  basic_password: string;
  oauth_redirect_uri: string;
  oauth_client_id: string;
  oauth_client_secret: string;
  oauth_scopes_text: string;
}

interface RegisterOAuthState {
  authorization: DashboardOAuthAuthorizationRequired;
  hasOpenedBrowser: boolean;
  error: string;
}

interface ToolGroupFormState {
  name: string;
  description: string;
  securityOption: GroupSecurityOption;
  selectedTools: string[];
  selectedServers: string[];
  excludedTools: string[];
}

type ToolGroupFormTab = "servers" | "include" | "exclude" | "effective";
type ToolGroupDetailTab = "detail" | "effective";

interface EffectiveToolPreviewItem {
  canonical_name: string;
  name: string;
  server: string;
}

function computeIncludedToolNames(
  catalog: DashboardTool[],
  selectedTools: string[],
  selectedServers: string[],
): string[] {
  const included = new Set<string>(selectedTools);
  for (const serverName of selectedServers) {
    for (const tool of catalog) {
      const canonicalName = tool.canonical_name;
      if (tool.server === serverName && tool.enabled && tool.server_enabled && canonicalName) {
        included.add(canonicalName);
      }
    }
  }
  return Array.from(included).sort();
}

function computeEffectiveToolNames(
  catalog: DashboardTool[],
  selectedTools: string[],
  selectedServers: string[],
  excludedTools: string[],
): string[] {
  const excluded = new Set(excludedTools);
  return computeIncludedToolNames(catalog, selectedTools, selectedServers).filter(
    (toolName) => !excluded.has(toolName),
  );
}

function buildEffectiveToolPreviewItems(
  catalog: DashboardTool[],
  effectiveNames: string[],
): EffectiveToolPreviewItem[] {
  const catalogByCanonical = new Map(catalog.map((tool) => [tool.canonical_name, tool]));
  return effectiveNames.map((canonicalName) => {
    const tool = catalogByCanonical.get(canonicalName);
    return {
      canonical_name: canonicalName,
      name: tool?.name ?? canonicalName,
      server: tool?.server ?? "Unknown",
    };
  });
}

interface PromptGroupFormState {
  name: string;
  description: string;
  securityOption: GroupSecurityOption;
  selectedPrompts: string[];
}

interface SchemaFieldSummary {
  path: string;
  type: string;
  required: boolean;
  description?: string;
  enumValues?: string[];
  defaultValue?: string;
  note?: string;
}

function maybeRedirectDashboardAuth(error: unknown): boolean {
  if (isExternalAuthMode()) {
    return false;
  }
  if (error instanceof DashboardAuthRequiredError) {
    redirectToGatewayLogin(error.loginPath);
    return true;
  }
  return false;
}

function coerceComponentSection(section: AppSection): AppSection {
  if (isComponentMode() && section === "home") {
    const fallback = resolveDefaultAppSection();
    return fallback === "home" ? "servers" : fallback;
  }
  return section;
}

function resolveInitialAppSection(): AppSection {
  if (usesHashRouting()) {
    return coerceComponentSection(parseHashRoute().section ?? resolveDefaultAppSection());
  }
  return coerceComponentSection(resolveDefaultAppSection());
}

const sectionMeta: Record<AppSection, { title: string; subtitle: string }> = {
  home: {
    title: "Home",
    subtitle: "",
  },
  servers: {
    title: "Servers",
    subtitle: "",
  },
  tools: {
    title: "Tools",
    subtitle: "All discovered tools across registered servers.",
  },
  tool_groups: {
    title: "Tool Groups",
    subtitle: "",
  },
  prompt_groups: {
    title: "Prompt Groups",
    subtitle: "Expose a curated subset of prompts at dedicated MCP URLs.",
  },
  skills: {
    title: "Skills",
    subtitle: "Versioned Agent Skills catalog with lifecycle and DLC status.",
  },
  skill_sets: {
    title: "Skill Sets",
    subtitle: "Group pinned active skill versions for tenant catalog access.",
  },
  prompts: {
    title: "Prompts",
    subtitle: "Prompt templates currently exposed through MCP Gateway.",
  },
  resources: {
    title: "Resources",
    subtitle: "Resources registered and proxied through the gateway.",
  },
  agent_apps: {
    title: "Agent Apps",
    subtitle: "OAuth clients scoped to attached tool, prompt, or skill set groups.",
  },
  diagnostics: {
    title: "System Info",
    subtitle: "",
  },
  observability: {
    title: "Observability",
    subtitle: "Agent-to-tool traceability, popular tools, and traffic metrics.",
  },
  lineage: {
    title: "Lineage",
    subtitle: "Discover how agent apps, tool groups, servers, and tools connect.",
  },
};

function shortVersion(version?: string) {
  if (!version) {
    return "";
  }
  const match = version.match(/v?\d+\.\d+\.\d+/);
  if (match) {
    return match[0];
  }
  return version.length > 16 ? version.slice(0, 16) : version;
}

function mergeSortedUniqueNames(available: string[], selected: string[]): string[] {
  return [...new Set([...available, ...selected])].sort((a, b) => a.localeCompare(b));
}

function transportLabel(value?: string) {
  return value ? value.split("_").join(" ") : "unknown";
}

function serverKindLabel(kind?: string) {
  switch (kind) {
    case "rest_openapi":
      return "REST (OpenAPI)";
    case "rest_endpoint":
      return "REST (endpoint)";
    case "mcp_protocol":
      return "MCP protocol";
    default:
      return kind ? kind.split("_").join(" ") : "Unknown";
  }
}

function resolveServerKind(server: DashboardServer): string {
  return server.server_kind || server.config_summary.server_kind || server.config_summary.kind || "mcp_protocol";
}

function isRestUpstream(form: RegisterServerFormState) {
  return form.upstream_type === "rest_openapi" || form.upstream_type === "rest_endpoint";
}

function parseExcludedOperations(text: string): string[] {
  return text
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function excludedOperationsToText(values?: string[]) {
  return (values ?? []).join("\n");
}

function createEmptyRestParameterRow(): RestParameterRow {
  return { name: "", in: "query", type: "string", required: false, description: "" };
}

function splitOAuthScopes(text: string) {
  return text
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function serverConnectionTone(status: DashboardServer["status"]): "good" | "warn" | "bad" | "muted" {
  switch (status) {
    case "connected":
    case "reachable":
      return "good";
    case "failed":
      return "bad";
    default:
      return "muted";
  }
}

function serverConnectionLabel(status: DashboardServer["status"]): string {
  return status.split("_").join(" ");
}

function toolDescription(tool: DashboardTool) {
  return tool.description || "No description";
}

function promptDescription(prompt: DashboardPrompt) {
  return prompt.description || "No description";
}

function resourceDescription(resource: DashboardResource) {
  return resource.description || "No description";
}

function prettyJSON(value?: Record<string, unknown>) {
  if (!value) {
    return "No schema available.";
  }
  return JSON.stringify(value, null, 2);
}

function prettyPromptArguments(value?: Array<Record<string, unknown>>) {
  if (!value || value.length === 0) {
    return "No arguments";
  }
  return JSON.stringify(value, null, 2);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function schemaTypeLabel(schema: Record<string, unknown>) {
  const type = schema.type;
  if (typeof type === "string") {
    return type;
  }
  if (Array.isArray(type) && type.every((item) => typeof item === "string")) {
    return type.join(" | ");
  }
  if (isRecord(schema.properties)) {
    return "object";
  }
  if (schema.items) {
    return "array";
  }
  if (Array.isArray(schema.enum) && schema.enum.length > 0) {
    return "enum";
  }
  return "unknown";
}

function formatSchemaValue(value: unknown) {
  if (value === undefined) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

function schemaNote(schema: Record<string, unknown>) {
  const notes: string[] = [];
  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    notes.push(`${schema.oneOf.length} oneOf variants`);
  }
  if (Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
    notes.push(`${schema.anyOf.length} anyOf variants`);
  }
  if (schema.additionalProperties === true) {
    notes.push("additional properties allowed");
  }
  return notes.join(", ");
}

function collectSchemaFields(
  schema: Record<string, unknown>,
  path: string,
  required: boolean,
  fields: SchemaFieldSummary[],
) {
  const entry: SchemaFieldSummary = {
    path,
    type: schemaTypeLabel(schema),
    required,
  };

  if (typeof schema.description === "string" && schema.description.trim()) {
    entry.description = schema.description;
  }
  if (Array.isArray(schema.enum) && schema.enum.length > 0) {
    entry.enumValues = schema.enum.map((value) => formatSchemaValue(value));
  }
  if (schema.default !== undefined) {
    entry.defaultValue = formatSchemaValue(schema.default);
  }
  const note = schemaNote(schema);
  if (note) {
    entry.note = note;
  }
  fields.push(entry);

  if (isRecord(schema.properties)) {
    const requiredFields = new Set(
      Array.isArray(schema.required) ? schema.required.filter((value): value is string => typeof value === "string") : [],
    );
    Object.entries(schema.properties).forEach(([key, value]) => {
      if (!isRecord(value)) {
        return;
      }
      const childPath = path ? `${path}.${key}` : key;
      collectSchemaFields(value, childPath, requiredFields.has(key), fields);
    });
  }

  if (schema.items && isRecord(schema.items)) {
    collectSchemaFields(schema.items, `${path}[]`, true, fields);
  }
}

function parseToolSchemaFields(schema?: Record<string, unknown>) {
  if (!schema) {
    return [] as SchemaFieldSummary[];
  }

  const fields: SchemaFieldSummary[] = [];
  if (isRecord(schema.properties)) {
    const requiredFields = new Set(
      Array.isArray(schema.required) ? schema.required.filter((value): value is string => typeof value === "string") : [],
    );
    Object.entries(schema.properties).forEach(([key, value]) => {
      if (!isRecord(value)) {
        return;
      }
      collectSchemaFields(value, key, requiredFields.has(key), fields);
    });
    return fields;
  }

  collectSchemaFields(schema, "(root)", true, fields);
  return fields;
}

function parsePromptArgumentFields(argumentsValue?: Array<Record<string, unknown>>) {
  if (!argumentsValue || argumentsValue.length === 0) {
    return [] as SchemaFieldSummary[];
  }

  const fields: SchemaFieldSummary[] = [];

  argumentsValue.forEach((argument, index) => {
    const name =
      (typeof argument.name === "string" && argument.name) ||
      (typeof argument.title === "string" && argument.title) ||
      `arg${index + 1}`;

    const entry: SchemaFieldSummary = {
      path: name,
      // Prompt arguments are string-like by default unless the backend explicitly provides a schema type.
      type: (() => {
        const explicitType = schemaTypeLabel(argument);
        return explicitType === "unknown" ? "string" : explicitType;
      })(),
      required: Boolean(argument.required),
    };

    if (typeof argument.description === "string" && argument.description.trim()) {
      entry.description = argument.description;
    }
    if (Array.isArray(argument.enum) && argument.enum.length > 0) {
      entry.enumValues = argument.enum.map((value) => formatSchemaValue(value));
    }
    if (argument.default !== undefined) {
      entry.defaultValue = formatSchemaValue(argument.default);
    }
    const note = schemaNote(argument);
    if (note) {
      entry.note = note;
    }
    fields.push(entry);

    if (isRecord(argument.properties)) {
      const requiredFields = new Set(
        Array.isArray(argument.required)
          ? argument.required.filter((value): value is string => typeof value === "string")
          : [],
      );
      Object.entries(argument.properties).forEach(([key, value]) => {
        if (!isRecord(value)) {
          return;
        }
        collectSchemaFields(value, `${name}.${key}`, requiredFields.has(key), fields);
      });
    }

    if (argument.items && isRecord(argument.items)) {
      collectSchemaFields(argument.items, `${name}[]`, true, fields);
    }
  });

  return fields;
}

function createEmptyPair(): KeyValueRow {
  return { key: "", value: "" };
}

function createInitialRegisterForm(): RegisterServerFormState {
  return {
    name: "",
    description: "",
    upstream_type: "mcp_protocol",
    transport: "streamable_http",
    session_mode: "stateless",
    command: "",
    args_text: "",
    env_rows: [createEmptyPair()],
    url: "",
    bearer_token: "",
    header_rows: [createEmptyPair()],
    base_url: "",
    spec_source: "url",
    openapi_spec_url: "",
    openapi_spec_inline: "",
    excluded_operations_text: "",
    method: "GET",
    path: "",
    tool_name: "",
    tool_description: "",
    parameter_rows: [createEmptyRestParameterRow()],
    rest_auth_type: "none",
    api_key_header: "",
    api_key_query: "",
    api_key_value: "",
    basic_username: "",
    basic_password: "",
    oauth_redirect_uri: "",
    oauth_client_id: "",
    oauth_client_secret: "",
    oauth_scopes_text: "",
  };
}

function upstreamTypeFromConfig(input: DashboardRegisterServerInput): UpstreamType {
  if (input.server_kind === "rest_openapi" || input.server_kind === "rest_endpoint") {
    return input.server_kind;
  }
  if (input.transport === "rest") {
    return "rest_openapi";
  }
  return "mcp_protocol";
}

function registerFormFromConfig(
  input: DashboardRegisterServerInput,
  editing: boolean,
): RegisterServerFormState {
  const envEntries = input.env ? Object.entries(input.env) : [];
  const env_rows =
    envEntries.length > 0
      ? envEntries.map(([key, value]) => ({ key, value: String(value) }))
      : [createEmptyPair()];
  const headerEntries = input.headers ? Object.entries(input.headers) : [];
  const header_rows =
    headerEntries.length > 0
      ? headerEntries.map(([key, value]) => ({ key, value: String(value) }))
      : [createEmptyPair()];
  const upstream_type = upstreamTypeFromConfig(input);
  const parameter_rows =
    input.parameters && input.parameters.length > 0
      ? input.parameters.map((param) => ({
          name: param.name,
          in: (param.in === "path" || param.in === "header" ? param.in : "query") as RestParameterRow["in"],
          type: param.type || "string",
          required: Boolean(param.required),
          description: param.description ?? "",
        }))
      : [createEmptyRestParameterRow()];

  const restAuth = input.rest_auth;
  const restAuthType = restAuth?.type ?? "none";

  return {
    name: input.name,
    description: input.description ?? "",
    upstream_type,
    transport:
      upstream_type === "mcp_protocol"
        ? (input.transport === "stdio" || input.transport === "sse"
            ? input.transport
            : "streamable_http")
        : "rest",
    session_mode: input.session_mode ?? "stateless",
    command: input.command ?? "",
    args_text: (input.args ?? []).join("\n"),
    env_rows,
    url: input.url ?? "",
    bearer_token: input.bearer_token ?? "",
    header_rows,
    base_url: input.base_url ?? input.url ?? "",
    spec_source: input.openapi_spec ? "inline" : "url",
    openapi_spec_url: input.openapi_spec_url ?? "",
    openapi_spec_inline: input.openapi_spec ?? "",
    excluded_operations_text: excludedOperationsToText(input.excluded_operations),
    method: input.method ?? "GET",
    path: input.path ?? "",
    tool_name: input.tool_name ?? "",
    tool_description: input.tool_description ?? "",
    parameter_rows,
    rest_auth_type: restAuthType,
    api_key_header: restAuth?.api_key_header ?? "",
    api_key_query: restAuth?.api_key_query ?? "",
    api_key_value: editing ? "" : restAuth?.api_key_value ?? "",
    basic_username: restAuth?.username ?? "",
    basic_password: editing ? "" : restAuth?.password ?? "",
    oauth_redirect_uri: input.oauth_redirect_uri ?? "",
    oauth_client_id: input.oauth_client_id ?? "",
    oauth_client_secret: editing ? "" : input.oauth_client_secret ?? "",
    oauth_scopes_text: (input.oauth_scopes ?? []).join("\n"),
  };
}

function rowsToMap(rows: KeyValueRow[]) {
  const output: Record<string, string> = {};
  rows.forEach((row) => {
    const key = row.key.trim();
    if (!key) {
      return;
    }
    output[key] = row.value;
  });
  return output;
}

function splitArgs(input: string) {
  return input
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getRegisterValidationError(form: RegisterServerFormState, editing: boolean) {
  if (!form.name.trim()) {
    return "Server name is required.";
  }

  if (isRestUpstream(form)) {
    if (!form.base_url.trim()) {
      return "Base URL is required for REST servers.";
    }
    if (form.upstream_type === "rest_openapi") {
      if (form.spec_source === "url" && !form.openapi_spec_url.trim()) {
        return "OpenAPI spec URL is required when using URL spec source.";
      }
      if (form.spec_source === "inline" && !form.openapi_spec_inline.trim()) {
        return "Inline OpenAPI spec is required when using inline spec source.";
      }
    }
    if (form.upstream_type === "rest_endpoint") {
      if (!form.method.trim()) {
        return "HTTP method is required for REST endpoint servers.";
      }
      if (!form.path.trim()) {
        return "Path is required for REST endpoint servers.";
      }
      if (!form.tool_name.trim()) {
        return "Tool name is required for REST endpoint servers.";
      }
    }
    switch (form.rest_auth_type) {
      case "api_key":
        if (!form.api_key_header.trim() && !form.api_key_query.trim()) {
          return "API key header or query parameter name is required for API key auth.";
        }
        if (!form.api_key_value.trim() && !editing) {
          return "API key value is required for API key auth.";
        }
        break;
      case "basic":
        if (!form.basic_username.trim()) {
          return "Username is required for basic auth.";
        }
        if (!form.basic_password.trim() && !editing) {
          return "Password is required for basic auth.";
        }
        break;
      case "bearer":
        if (!form.bearer_token.trim() && !editing) {
          return "Bearer token is required for bearer auth.";
        }
        break;
      case "oauth":
        if (!form.oauth_redirect_uri.trim()) {
          return "OAuth redirect URI is required for OAuth auth.";
        }
        break;
    }
    return "";
  }

  if (form.transport === "stdio" && !form.command.trim()) {
    return "Command is required for stdio servers.";
  }
  if ((form.transport === "streamable_http" || form.transport === "sse") && !form.url.trim()) {
    return "Target URL is required for HTTP and SSE servers.";
  }
  return "";
}

function buildRestAuthPayload(form: RegisterServerFormState): DashboardRegisterServerInput["rest_auth"] {
  const auth: NonNullable<DashboardRegisterServerInput["rest_auth"]> = {
    type: form.rest_auth_type,
  };
  if (form.rest_auth_type === "api_key") {
    auth.api_key_header = form.api_key_header.trim();
    auth.api_key_query = form.api_key_query.trim();
    if (form.api_key_value.trim()) {
      auth.api_key_value = form.api_key_value.trim();
    }
  }
  if (form.rest_auth_type === "basic") {
    auth.username = form.basic_username.trim();
    if (form.basic_password.trim()) {
      auth.password = form.basic_password.trim();
    }
  }
  return auth;
}

function buildRegisterPayload(form: RegisterServerFormState): DashboardRegisterServerInput {
  if (isRestUpstream(form)) {
    const payload: DashboardRegisterServerInput = {
      name: form.name.trim(),
      description: form.description.trim(),
      server_kind: form.upstream_type,
      transport: "rest",
      base_url: form.base_url.trim(),
      rest_auth: buildRestAuthPayload(form),
    };

    if (form.upstream_type === "rest_openapi") {
      if (form.spec_source === "url") {
        payload.openapi_spec_url = form.openapi_spec_url.trim();
      } else if (form.openapi_spec_inline.trim()) {
        payload.openapi_spec = form.openapi_spec_inline.trim();
      }
      const excluded = parseExcludedOperations(form.excluded_operations_text);
      if (excluded.length > 0) {
        payload.excluded_operations = excluded;
      }
    }

    if (form.upstream_type === "rest_endpoint") {
      payload.method = form.method.trim().toUpperCase();
      payload.path = form.path.trim();
      payload.tool_name = form.tool_name.trim();
      payload.tool_description = form.tool_description.trim();
      const parameters: DashboardRestParameter[] = form.parameter_rows
        .filter((row) => row.name.trim())
        .map((row) => ({
          name: row.name.trim(),
          in: row.in,
          type: row.type.trim() || "string",
          required: row.required,
          description: row.description.trim() || undefined,
        }));
      if (parameters.length > 0) {
        payload.parameters = parameters;
      }
    }

    if (form.rest_auth_type === "bearer" && form.bearer_token.trim()) {
      payload.bearer_token = form.bearer_token.trim();
    }
    if (form.rest_auth_type === "oauth") {
      payload.oauth_redirect_uri = form.oauth_redirect_uri.trim();
      if (form.oauth_client_id.trim()) {
        payload.oauth_client_id = form.oauth_client_id.trim();
      }
      if (form.oauth_client_secret.trim()) {
        payload.oauth_client_secret = form.oauth_client_secret.trim();
      }
      const scopes = splitOAuthScopes(form.oauth_scopes_text);
      if (scopes.length > 0) {
        payload.oauth_scopes = scopes;
      }
    }

    return payload;
  }

  const payload: DashboardRegisterServerInput = {
    name: form.name.trim(),
    description: form.description.trim(),
    server_kind: "mcp_protocol",
    transport: form.transport,
    session_mode: form.session_mode,
  };

  if (form.transport === "stdio") {
    payload.command = form.command.trim();
    payload.args = splitArgs(form.args_text);
    const env = rowsToMap(form.env_rows);
    if (Object.keys(env).length > 0) {
      payload.env = env;
    }
    return payload;
  }

  payload.url = form.url.trim();
  if (form.bearer_token.trim()) {
    payload.bearer_token = form.bearer_token.trim();
  }
  if (form.transport === "streamable_http") {
    const headers = rowsToMap(form.header_rows);
    if (Object.keys(headers).length > 0) {
      payload.headers = headers;
    }
  }
  return payload;
}

function createInitialToolGroupForm(): ToolGroupFormState {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedTools: [],
    selectedServers: [],
    excludedTools: [],
  };
}

function createInitialPromptGroupForm(): PromptGroupFormState {
  return {
    name: "",
    description: "",
    securityOption: "basic",
    selectedPrompts: [],
  };
}

export default function App() {
  const externalAuth = isExternalAuthMode();
  const componentMode = isComponentMode();
  const [section, setSection] = useState<AppSection>(resolveInitialAppSection);
  const [authSession, setAuthSession] = useState<DashboardAuthStatusResponse | null>(null);

  const selectSection = useCallback((next: AppSection) => {
    if (componentMode && next === "home") {
      return;
    }
    if (
      !externalAuth &&
      authSession?.oidc_enabled &&
      !authSession.authenticated &&
      next !== "home"
    ) {
      const lp = authSession.login_path?.trim();
      if (lp) {
        redirectToGatewayLogin(lp);
      }
      return;
    }
    setSection(next);
    if (usesHashRouting()) {
      setDashboardLocationHash(appSectionToHash(next));
    } else {
      setToolGroupFormMode(null);
      setToolGroupEditingName(null);
      if (next === "tool_groups") {
        setExpandedToolGroup(null);
      }
    }
  }, [authSession, componentMode, externalAuth]);

  const [loadState, setLoadState] = useState<LoadState>("checking_session");
  const [errorMessage, setErrorMessage] = useState("");
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const [data, setData] = useState<DashboardData>({});
  const [observabilityRange, setObservabilityRange] = useState<ObservabilityRange>("24h");
  const [observabilityData, setObservabilityData] = useState<DashboardObservabilityResponse | null>(null);
  const [observabilityLoading, setObservabilityLoading] = useState(false);
  const [observabilityError, setObservabilityError] = useState<string | null>(null);
  const [lineageData, setLineageData] = useState<DashboardLineageResponse | null>(null);
  const [lineageLoading, setLineageLoading] = useState(false);
  const [lineageError, setLineageError] = useState<string | null>(null);
  const [serverFilter, setServerFilter] = useState("");
  const [toolFilter, setToolFilter] = useState("");
  const [toolServerFilter, setToolServerFilter] = useState("all");
  const [promptFilter, setPromptFilter] = useState("");
  const [toolGroupToolFilter, setToolGroupToolFilter] = useState("");
  const [toolGroupToolServerFilter, setToolGroupToolServerFilter] = useState("all");
  const [toolGroupFormTab, setToolGroupFormTab] = useState<ToolGroupFormTab>("servers");
  const [toolGroupDetailTab, setToolGroupDetailTab] = useState<ToolGroupDetailTab>("detail");
  const [promptGroupPromptFilter, setPromptGroupPromptFilter] = useState("");
  const [promptGroupPromptServerFilter, setPromptGroupPromptServerFilter] = useState("all");
  const [expandedServer, setExpandedServer] = useState<string | null>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    return r.section === "servers" ? r.serverName : null;
  });
  const [expandedTool, setExpandedTool] = useState<string | null>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    return r.section === "tools" ? r.toolCanonicalName : null;
  });
  const [expandedToolGroup, setExpandedToolGroup] = useState<string | null>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    if (r.section !== "tool_groups" || r.toolGroupFormMode !== null) {
      return null;
    }
    return r.toolGroupName;
  });
  const [toolGroupFormMode, setToolGroupFormMode] = useState<ToolGroupFormMode>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    return r.section === "tool_groups" ? r.toolGroupFormMode : null;
  });
  const [expandedPromptGroup, setExpandedPromptGroup] = useState<string | null>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    return r.section === "prompt_groups" ? r.promptGroupName : null;
  });
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    return r.section === "prompts" ? r.promptCanonicalName : null;
  });
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerServerEditingName, setRegisterServerEditingName] = useState<string | null>(null);
  const [registerConfigLoading, setRegisterConfigLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterServerFormState>(createInitialRegisterForm());
  const [registerError, setRegisterError] = useState("");
  const [registerOAuth, setRegisterOAuth] = useState<RegisterOAuthState | null>(null);
  const [toolGroupEditingName, setToolGroupEditingName] = useState<string | null>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    return r.section === "tool_groups" && r.toolGroupFormMode === "edit" ? r.toolGroupEditName : null;
  });
  const [toolGroupForm, setToolGroupForm] = useState<ToolGroupFormState>(createInitialToolGroupForm());
  const [toolGroupError, setToolGroupError] = useState("");
  const [promptGroupOpen, setPromptGroupOpen] = useState(false);
  const [promptGroupEditingName, setPromptGroupEditingName] = useState<string | null>(null);
  const [promptGroupForm, setPromptGroupForm] = useState<PromptGroupFormState>(createInitialPromptGroupForm());
  const [promptGroupError, setPromptGroupError] = useState("");
  const [agentAppDialogOpen, setAgentAppDialogOpen] = useState(false);
  const [agentAppEditingId, setAgentAppEditingId] = useState<number | null>(null);
  const [agentAppName, setAgentAppName] = useState("");
  const [agentAppDescription, setAgentAppDescription] = useState("");
  const [agentAppToolGroup, setAgentAppToolGroup] = useState("");
  const [agentAppPromptGroup, setAgentAppPromptGroup] = useState("");
  const [agentAppSkillSets, setAgentAppSkillSets] = useState<string[]>([]);
  const [agentAppLegacyConfigInvalid, setAgentAppLegacyConfigInvalid] = useState(false);
  const [agentAppCreateError, setAgentAppCreateError] = useState("");
  const [agentAppSecretReveal, setAgentAppSecretReveal] = useState<{ title: string; secret: string } | null>(
    null,
  );
  const [agentAppDetailId, setAgentAppDetailId] = useState<number | null>(() => {
    if (!usesHashRouting()) return null;
    const r = parseHashRoute();
    return r.section === "agent_apps" ? r.agentAppId : null;
  });
  const [busyKeys, setBusyKeys] = useState<Record<string, boolean>>({});

  /** Ensure canonical `#/section` when hash is missing or invalid (bookmarkable URLs). */
  useEffect(() => {
    if (!usesHashRouting()) {
      return;
    }
    if (parseAppSectionFromHash() !== null) {
      return;
    }
    const { pathname, search } = window.location;
    replaceDashboardLocation(pathname, search, appSectionToHash(resolveDefaultAppSection()));
    setSection(resolveDefaultAppSection());
    setAgentAppDetailId(null);
    setExpandedServer(null);
    setExpandedToolGroup(null);
    setToolGroupFormMode(null);
    setToolGroupEditingName(null);
    setExpandedPromptGroup(null);
    setExpandedTool(null);
    setExpandedPrompt(null);
  }, []);

  /** Back/forward and manual hash edits → active section */
  useEffect(() => {
    if (!usesHashRouting()) {
      return;
    }
    function onHashChange() {
      const r = parseHashRoute();
      if (r.section === null) {
        return;
      }
      if (
        !externalAuth &&
        authSession?.oidc_enabled &&
        !authSession.authenticated &&
        r.section !== "home"
      ) {
        const { pathname, search } = window.location;
        replaceDashboardLocation(pathname, search, appSectionToHash("home"));
        setSection("home");
        setAgentAppDetailId(null);
        setExpandedServer(null);
        setExpandedToolGroup(null);
        setToolGroupFormMode(null);
        setToolGroupEditingName(null);
        setExpandedPromptGroup(null);
        setExpandedTool(null);
        setExpandedPrompt(null);
        return;
      }
      setSection(r.section);
      setAgentAppDetailId(r.section === "agent_apps" ? r.agentAppId : null);
      setExpandedServer(r.section === "servers" ? r.serverName : null);
      setExpandedToolGroup(
        r.section === "tool_groups" && r.toolGroupFormMode === null ? r.toolGroupName : null,
      );
      setToolGroupFormMode(r.section === "tool_groups" ? r.toolGroupFormMode : null);
      setToolGroupEditingName(
        r.section === "tool_groups" && r.toolGroupFormMode === "edit" ? r.toolGroupEditName : null,
      );
      setExpandedPromptGroup(r.section === "prompt_groups" ? r.promptGroupName : null);
      setExpandedTool(r.section === "tools" ? r.toolCanonicalName : null);
      setExpandedPrompt(r.section === "prompts" ? r.promptCanonicalName : null);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [authSession]);

  async function fetchDashboardPanelsAfterOverview(overview: DashboardOverviewResponse) {
    const [servers, tools, toolGroups, promptGroups, prompts, resources, diagnostics, agentApps, skillSets] =
      await Promise.all([
      api.servers(),
      api.tools(),
      api.toolGroups(),
      api.promptGroups(),
      api.prompts(),
      api.resources(),
      api.diagnostics(),
      api.agentApps(),
      api.skillSets(),
    ]);
    return { overview, servers, tools, toolGroups, promptGroups, prompts, resources, diagnostics, agentApps, skillSets };
  }

  async function fetchFullDashboard() {
    const [overview, servers, tools, toolGroups, promptGroups, prompts, resources, diagnostics, agentApps, skillSets] =
      await Promise.all([
      api.overview(),
      api.servers(),
      api.tools(),
      api.toolGroups(),
      api.promptGroups(),
      api.prompts(),
      api.resources(),
      api.diagnostics(),
      api.agentApps(),
      api.skillSets(),
    ]);
    return { overview, servers, tools, toolGroups, promptGroups, prompts, resources, diagnostics, agentApps, skillSets };
  }

  function applyDashboardPayload(payload: Required<DashboardData>) {
    const { overview, servers, tools, toolGroups, promptGroups, prompts, resources, diagnostics, agentApps, skillSets } =
      payload;
    setData({
      overview,
      servers,
      tools,
      toolGroups,
      promptGroups,
      prompts,
      resources,
      diagnostics,
      agentApps,
      skillSets,
    });
    setExpandedServer((current) => {
      if (current === null) {
        return null;
      }
      if (servers.servers.some((s) => s.name === current)) {
        return current;
      }
      const { pathname, search } = window.location;
      replaceDashboardLocation(pathname, search, appSectionToHash("servers"));
      return null;
    });
    setExpandedTool((current) => {
      if (current === null) {
        return null;
      }
      if (tools.tools.some((tool) => tool.canonical_name === current)) {
        return current;
      }
      const { pathname, search } = window.location;
      replaceDashboardLocation(pathname, search, appSectionToHash("tools"));
      return null;
    });
    setExpandedToolGroup((current) => {
      if (current === null) {
        return null;
      }
      if (toolGroups.tool_groups.some((group) => group.name === current)) {
        return current;
      }
      const { pathname, search } = window.location;
      replaceDashboardLocation(pathname, search, appSectionToHash("tool_groups"));
      return null;
    });
    setExpandedPromptGroup((current) => {
      if (current === null) {
        return null;
      }
      if (promptGroups.prompt_groups.some((group) => group.name === current)) {
        return current;
      }
      const { pathname, search } = window.location;
      replaceDashboardLocation(pathname, search, appSectionToHash("prompt_groups"));
      return null;
    });
    setExpandedPrompt((current) => {
      if (current === null) {
        return null;
      }
      if (prompts.prompts.some((prompt) => prompt.canonical_name === current)) {
        return current;
      }
      const { pathname, search } = window.location;
      replaceDashboardLocation(pathname, search, appSectionToHash("prompts"));
      return null;
    });
    setAgentAppDetailId((current) => {
      if (current === null) {
        return null;
      }
      if (agentApps.apps.some((a) => a.id === current)) {
        return current;
      }
      const { pathname, search } = window.location;
      replaceDashboardLocation(pathname, search, appSectionToHash("agent_apps"));
      return null;
    });
  }

  /** Probe auth (public when OIDC is on); load dashboard data only when allowed. */
  async function bootstrapDashboard() {
    setLoadState("checking_session");
    setErrorMessage("");
    try {
      if (externalAuth) {
        const token = resolveExternalAuthToken();
        if (token === null) {
          throw new EmbedAuthMissingError(
            "Missing authentication token — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token",
          );
        }
        const claims = parseEmbedClaims(token);
        getExternalAuthHeaders();
        setAuthSession({
          authenticated: true,
          oidc_enabled: true,
          email: claims.email,
          sub: claims.sub,
        });
        setLoadState("loading");
        const overviewRes = await api.overview();
        const payload = await fetchDashboardPanelsAfterOverview(overviewRes);
        applyDashboardPayload(payload);
        setLoadState("ready");
        return;
      }

      const authRes = await api.authStatus();
      setAuthSession(authRes);

      if (!authRes.oidc_enabled || authRes.authenticated) {
        setLoadState("loading");
        const overviewRes = await api.overview();
        const payload = await fetchDashboardPanelsAfterOverview(overviewRes);
        applyDashboardPayload(payload);
        setLoadState("ready");
        return;
      }

      setData({});
      const hashSection = parseAppSectionFromHash();
      if (hashSection !== null && hashSection !== "home") {
        const { pathname, search } = window.location;
        replaceDashboardLocation(pathname, search, appSectionToHash("home"));
        setSection("home");
        setAgentAppDetailId(null);
        setExpandedServer(null);
        setExpandedToolGroup(null);
        setExpandedPromptGroup(null);
        setExpandedTool(null);
        setExpandedPrompt(null);
      }
      setLoadState("ready");
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(message);
      setLoadState("error");
    }
  }

  async function loadDashboardData(silent = false) {
    if (!silent) {
      setLoadState("loading");
    }
    setErrorMessage("");
    try {
      const payload = await fetchFullDashboard();
      applyDashboardPayload(payload);
      setLoadState("ready");
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrorMessage(message);
      setLoadState("error");
    }
  }

  async function loadObservability(range: ObservabilityRange = observabilityRange) {
    setObservabilityLoading(true);
    setObservabilityError(null);
    try {
      const payload = await api.observability({ range, limit: 10 });
      setObservabilityData(payload);
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Failed to load observability metrics";
      setObservabilityError(message);
    } finally {
      setObservabilityLoading(false);
    }
  }

  useEffect(() => {
    void bootstrapDashboard();
  }, []);

  useEffect(() => {
    if (section !== "observability" || loadState !== "ready") {
      return;
    }
    void loadObservability(observabilityRange);
  }, [section, observabilityRange, loadState]);

  async function loadLineage() {
    setLineageLoading(true);
    setLineageError(null);
    try {
      const payload = await api.lineage({ range: "7d" });
      setLineageData(payload);
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Failed to load lineage graph";
      setLineageError(message);
    } finally {
      setLineageLoading(false);
    }
  }

  useEffect(() => {
    if (section !== "lineage" || loadState !== "ready") {
      return;
    }
    void loadLineage();
  }, [section, loadState]);

  const filteredServers = useMemo(() => {
    const servers = data.servers?.servers ?? [];
    if (!serverFilter.trim()) {
      return servers;
    }
    const term = serverFilter.toLowerCase();
    return servers.filter(
      (server) =>
        server.name.toLowerCase().includes(term) ||
        server.transport.toLowerCase().includes(term) ||
        resolveServerKind(server).toLowerCase().includes(term) ||
        serverKindLabel(resolveServerKind(server)).toLowerCase().includes(term) ||
        server.connection_summary.toLowerCase().includes(term),
    );
  }, [data.servers?.servers, serverFilter]);

  const filteredTools = useMemo(() => {
    let tools = data.tools?.tools ?? [];
    if (toolServerFilter !== "all") {
      tools = tools.filter((tool) => tool.server === toolServerFilter);
    }
    if (!toolFilter.trim()) {
      return tools;
    }
    const term = toolFilter.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(term) ||
        tool.server.toLowerCase().includes(term) ||
        tool.canonical_name.toLowerCase().includes(term) ||
        toolDescription(tool).toLowerCase().includes(term),
    );
  }, [data.tools?.tools, toolFilter, toolServerFilter]);

  const uniqueToolServers = useMemo(() => {
    const servers = new Set((data.tools?.tools ?? []).map((tool) => tool.server));
    return Array.from(servers).sort();
  }, [data.tools?.tools]);

  const availableToolGroupTools = useMemo(() => {
    let tools = data.tools?.tools ?? [];
    if (toolGroupToolServerFilter !== "all") {
      tools = tools.filter((tool) => tool.server === toolGroupToolServerFilter);
    }
    if (!toolGroupToolFilter.trim()) {
      return tools;
    }
    const term = toolGroupToolFilter.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(term) ||
        tool.canonical_name.toLowerCase().includes(term) ||
        tool.server.toLowerCase().includes(term) ||
        toolDescription(tool).toLowerCase().includes(term),
    );
  }, [data.tools?.tools, toolGroupToolFilter, toolGroupToolServerFilter]);

  const availableToolGroupServers = useMemo(() => {
    return [...(data.servers?.servers ?? [])]
      .filter((server) => server.enabled)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data.servers?.servers]);

  const toolGroupIncludedToolNames = useMemo(
    () =>
      computeIncludedToolNames(
        data.tools?.tools ?? [],
        toolGroupForm.selectedTools,
        toolGroupForm.selectedServers,
      ),
    [data.tools?.tools, toolGroupForm.selectedTools, toolGroupForm.selectedServers],
  );

  const availableToolGroupExclusionTools = useMemo(() => {
    const catalogByCanonical = new Map(
      (data.tools?.tools ?? []).map((tool) => [tool.canonical_name, tool]),
    );
    return toolGroupIncludedToolNames.map((canonicalName) => {
      const tool = catalogByCanonical.get(canonicalName);
      if (tool) {
        return tool;
      }
      return {
        name: canonicalName,
        canonical_name: canonicalName,
        server: "Unknown",
        description: "",
        enabled: true,
        server_enabled: true,
      } satisfies DashboardTool;
    });
  }, [data.tools?.tools, toolGroupIncludedToolNames]);

  const toolGroupEffectivePreview = useMemo(
    () =>
      computeEffectiveToolNames(
        data.tools?.tools ?? [],
        toolGroupForm.selectedTools,
        toolGroupForm.selectedServers,
        toolGroupForm.excludedTools,
      ),
    [
      data.tools?.tools,
      toolGroupForm.selectedTools,
      toolGroupForm.selectedServers,
      toolGroupForm.excludedTools,
    ],
  );

  const toolGroupEffectivePreviewItems = useMemo(
    () => buildEffectiveToolPreviewItems(data.tools?.tools ?? [], toolGroupEffectivePreview),
    [data.tools?.tools, toolGroupEffectivePreview],
  );

  const toolGroupEffectivePreviewCopyText = useMemo(
    () => toolGroupEffectivePreview.join("\n"),
    [toolGroupEffectivePreview],
  );

  const uniquePromptServers = useMemo(() => {
    const servers = new Set((data.prompts?.prompts ?? []).map((prompt) => prompt.server));
    return Array.from(servers).sort();
  }, [data.prompts?.prompts]);

  const availablePromptGroupPrompts = useMemo(() => {
    let prompts = data.prompts?.prompts ?? [];
    if (promptGroupPromptServerFilter !== "all") {
      prompts = prompts.filter((prompt) => prompt.server === promptGroupPromptServerFilter);
    }
    if (!promptGroupPromptFilter.trim()) {
      return prompts;
    }
    const term = promptGroupPromptFilter.toLowerCase();
    return prompts.filter(
      (prompt) =>
        prompt.name.toLowerCase().includes(term) ||
        prompt.canonical_name.toLowerCase().includes(term) ||
        prompt.server.toLowerCase().includes(term) ||
        promptDescription(prompt).toLowerCase().includes(term),
    );
  }, [data.prompts?.prompts, promptGroupPromptFilter, promptGroupPromptServerFilter]);

  const filteredPrompts = useMemo(() => {
    const prompts = data.prompts?.prompts ?? [];
    if (!promptFilter.trim()) {
      return prompts;
    }
    const term = promptFilter.toLowerCase();
    return prompts.filter(
      (prompt) =>
        prompt.name.toLowerCase().includes(term) ||
        prompt.canonical_name.toLowerCase().includes(term) ||
        prompt.server.toLowerCase().includes(term) ||
        promptDescription(prompt).toLowerCase().includes(term),
    );
  }, [data.prompts?.prompts, promptFilter]);

  const agentAppToolGroupSelectOptions = useMemo(
    () =>
      [...(data.toolGroups?.tool_groups ?? [])]
        .map((g) => g.name)
        .sort((a, b) => a.localeCompare(b)),
    [data.toolGroups?.tool_groups],
  );

  const agentAppPromptGroupSelectOptions = useMemo(
    () =>
      [...(data.promptGroups?.prompt_groups ?? [])]
        .map((g) => g.name)
        .sort((a, b) => a.localeCompare(b)),
    [data.promptGroups?.prompt_groups],
  );

  const agentAppToolGroupMenuNames = useMemo(
    () => mergeSortedUniqueNames(agentAppToolGroupSelectOptions, agentAppToolGroup ? [agentAppToolGroup] : []),
    [agentAppToolGroupSelectOptions, agentAppToolGroup],
  );

  const agentAppPromptGroupMenuNames = useMemo(
    () => mergeSortedUniqueNames(agentAppPromptGroupSelectOptions, agentAppPromptGroup ? [agentAppPromptGroup] : []),
    [agentAppPromptGroupSelectOptions, agentAppPromptGroup],
  );

  const agentAppSkillSetSelectOptions = useMemo(
    () =>
      [...(data.skillSets?.skill_sets ?? [])]
        .map((g) => g.name)
        .sort((a, b) => a.localeCompare(b)),
    [data.skillSets?.skill_sets],
  );

  const agentAppSkillSetMenuNames = useMemo(
    () => mergeSortedUniqueNames(agentAppSkillSetSelectOptions, agentAppSkillSets),
    [agentAppSkillSetSelectOptions, agentAppSkillSets],
  );

  const selectedAgentApp = useMemo(() => {
    const apps = data.agentApps?.apps;
    if (!apps?.length || agentAppDetailId === null) {
      return null;
    }
    return apps.find((a) => a.id === agentAppDetailId) ?? null;
  }, [data.agentApps?.apps, agentAppDetailId]);

  const selectedServer = useMemo(() => {
    const list = data.servers?.servers;
    if (!list?.length || expandedServer === null) {
      return null;
    }
    return list.find((s) => s.name === expandedServer) ?? null;
  }, [data.servers?.servers, expandedServer]);

  const selectedToolGroup = useMemo(() => {
    const groups = data.toolGroups?.tool_groups;
    if (!groups?.length || expandedToolGroup === null) {
      return null;
    }
    return groups.find((g) => g.name === expandedToolGroup) ?? null;
  }, [data.toolGroups?.tool_groups, expandedToolGroup]);

  const editingToolGroup = useMemo(() => {
    const groups = data.toolGroups?.tool_groups;
    if (!groups?.length || toolGroupFormMode !== "edit" || !toolGroupEditingName) {
      return null;
    }
    return groups.find((g) => g.name === toolGroupEditingName) ?? null;
  }, [data.toolGroups?.tool_groups, toolGroupFormMode, toolGroupEditingName]);

  useEffect(() => {
    setToolGroupDetailTab("detail");
  }, [expandedToolGroup]);

  useEffect(() => {
    if (toolGroupFormMode !== "create" && toolGroupFormMode !== "edit") {
      return;
    }
    setToolGroupFormTab("servers");
    if (toolGroupFormMode !== "create") {
      return;
    }
    setToolGroupForm(createInitialToolGroupForm());
    setToolGroupError("");
    setToolGroupToolFilter("");
    setToolGroupToolServerFilter("all");
    setToolGroupEditingName(null);
  }, [toolGroupFormMode, toolGroupEditingName]);

  useEffect(() => {
    if (toolGroupFormMode !== "edit" || !toolGroupEditingName) {
      return;
    }
    const group = data.toolGroups?.tool_groups.find((item) => item.name === toolGroupEditingName);
    if (!group) {
      return;
    }
    setToolGroupForm({
      name: group.name,
      description: group.description ?? "",
      securityOption: group.security_option,
      selectedTools: group.included_tools ?? [],
      selectedServers: group.included_servers ?? [],
      excludedTools: group.excluded_tools ?? [],
    });
    setToolGroupError("");
    setToolGroupToolFilter("");
    setToolGroupToolServerFilter("all");
  }, [toolGroupFormMode, toolGroupEditingName, data.toolGroups?.tool_groups]);

  useEffect(() => {
    const included = new Set(
      computeIncludedToolNames(
        data.tools?.tools ?? [],
        toolGroupForm.selectedTools,
        toolGroupForm.selectedServers,
      ),
    );
    setToolGroupForm((current) => {
      const nextExcluded = current.excludedTools.filter((toolName) => included.has(toolName));
      if (nextExcluded.length === current.excludedTools.length) {
        return current;
      }
      return { ...current, excludedTools: nextExcluded };
    });
  }, [data.tools?.tools, toolGroupForm.selectedTools, toolGroupForm.selectedServers]);

  const selectedPromptGroup = useMemo(() => {
    const groups = data.promptGroups?.prompt_groups;
    if (!groups?.length || expandedPromptGroup === null) {
      return null;
    }
    return groups.find((g) => g.name === expandedPromptGroup) ?? null;
  }, [data.promptGroups?.prompt_groups, expandedPromptGroup]);

  const selectedTool = useMemo(() => {
    const tools = data.tools?.tools;
    if (!tools?.length || expandedTool === null) {
      return null;
    }
    return tools.find((t) => t.canonical_name === expandedTool) ?? null;
  }, [data.tools?.tools, expandedTool]);

  const selectedPrompt = useMemo(() => {
    const prompts = data.prompts?.prompts;
    if (!prompts?.length || expandedPrompt === null) {
      return null;
    }
    return prompts.find((p) => p.canonical_name === expandedPrompt) ?? null;
  }, [data.prompts?.prompts, expandedPrompt]);

  const overview = data.overview;
  const diagnostics = data.diagnostics;
  const agentApps = data.agentApps;
  const needsDashboardAuth =
    !externalAuth && authSession !== null && authSession.oidc_enabled && !authSession.authenticated;
  const dashboardSignOutHref =
    !externalAuth && authSession?.oidc_enabled && authSession.authenticated
      ? (overview?.oidc_logout_path ?? authSession.logout_path)
      : undefined;
  const embedSignedInEmail =
    externalAuth && !componentMode ? authSession?.email?.trim() : undefined;
  const currentSectionMeta = sectionMeta[section];

  function setBusy(key: string, value: boolean) {
    setBusyKeys((current) => {
      const next = { ...current };
      if (value) {
        next[key] = true;
      } else {
        delete next[key];
      }
      return next;
    });
  }

  function isBusy(key: string) {
    return Boolean(busyKeys[key]);
  }

  async function runMutation(key: string, action: () => Promise<void>, successMessage: string) {
    setFeedback(null);
    setBusy(key, true);
    try {
      await action();
      await loadDashboardData(true);
      setFeedback({ tone: "success", message: successMessage });
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Request failed";
      setFeedback({ tone: "error", message });
      throw error;
    } finally {
      setBusy(key, false);
    }
  }

  function updateRegisterField<K extends keyof RegisterServerFormState>(field: K, value: RegisterServerFormState[K]) {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  }

  function updateKeyValueRow(
    field: "env_rows" | "header_rows",
    index: number,
    key: "key" | "value",
    value: string,
  ) {
    setRegisterForm((current) => {
      const rows = current[field].map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: value } : row,
      );
      return { ...current, [field]: rows };
    });
  }

  function addKeyValueRow(field: "env_rows" | "header_rows") {
    setRegisterForm((current) => ({ ...current, [field]: [...current[field], createEmptyPair()] }));
  }

  function removeKeyValueRow(field: "env_rows" | "header_rows", index: number) {
    setRegisterForm((current) => {
      const rows = current[field].filter((_, rowIndex) => rowIndex !== index);
      return { ...current, [field]: rows.length > 0 ? rows : [createEmptyPair()] };
    });
  }

  function updateRestParameterRow(
    index: number,
    key: keyof RestParameterRow,
    value: RestParameterRow[keyof RestParameterRow],
  ) {
    setRegisterForm((current) => {
      const rows = current.parameter_rows.map((row, rowIndex) =>
        rowIndex === index ? { ...row, [key]: value } : row,
      );
      return { ...current, parameter_rows: rows };
    });
  }

  function addRestParameterRow() {
    setRegisterForm((current) => ({
      ...current,
      parameter_rows: [...current.parameter_rows, createEmptyRestParameterRow()],
    }));
  }

  function removeRestParameterRow(index: number) {
    setRegisterForm((current) => {
      const rows = current.parameter_rows.filter((_, rowIndex) => rowIndex !== index);
      return {
        ...current,
        parameter_rows: rows.length > 0 ? rows : [createEmptyRestParameterRow()],
      };
    });
  }

  function updateUpstreamType(value: UpstreamType) {
    setRegisterForm((current) => ({
      ...current,
      upstream_type: value,
      transport: value === "mcp_protocol" ? "streamable_http" : "rest",
    }));
  }

  const registerEditing = registerServerEditingName !== null;
  const registerSecretHelper = registerEditing ? "Leave blank to keep the current value." : undefined;

  function renderRestAuthFields() {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Upstream authentication
        </Typography>
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="reg-rest-auth">Auth type</InputLabel>
            <Select
              labelId="reg-rest-auth"
              label="Auth type"
              value={registerForm.rest_auth_type}
              onChange={(event) =>
                updateRegisterField("rest_auth_type", event.target.value as RestAuthType)
              }
            >
              <MenuItem value="none">none</MenuItem>
              <MenuItem value="api_key">api_key</MenuItem>
              <MenuItem value="basic">basic</MenuItem>
              <MenuItem value="bearer">bearer</MenuItem>
              <MenuItem value="oauth">oauth</MenuItem>
            </Select>
          </FormControl>

          {registerForm.rest_auth_type === "api_key" ? (
            <>
              <TextField
                label="API key header"
                fullWidth
                size="small"
                placeholder="X-API-Key"
                value={registerForm.api_key_header}
                onChange={(event) => updateRegisterField("api_key_header", event.target.value)}
              />
              <TextField
                label="API key query param"
                fullWidth
                size="small"
                placeholder="api_key"
                value={registerForm.api_key_query}
                onChange={(event) => updateRegisterField("api_key_query", event.target.value)}
              />
              <TextField
                label="API key value"
                fullWidth
                size="small"
                type="password"
                value={registerForm.api_key_value}
                onChange={(event) => updateRegisterField("api_key_value", event.target.value)}
                helperText={registerSecretHelper}
              />
            </>
          ) : null}

          {registerForm.rest_auth_type === "basic" ? (
            <>
              <TextField
                label="Username"
                fullWidth
                size="small"
                value={registerForm.basic_username}
                onChange={(event) => updateRegisterField("basic_username", event.target.value)}
              />
              <TextField
                label="Password"
                fullWidth
                size="small"
                type="password"
                value={registerForm.basic_password}
                onChange={(event) => updateRegisterField("basic_password", event.target.value)}
                helperText={registerSecretHelper}
              />
            </>
          ) : null}

          {registerForm.rest_auth_type === "bearer" ? (
            <TextField
              label="Bearer token"
              fullWidth
              size="small"
              type="password"
              value={registerForm.bearer_token}
              onChange={(event) => updateRegisterField("bearer_token", event.target.value)}
              helperText={registerSecretHelper}
            />
          ) : null}

          {registerForm.rest_auth_type === "oauth" ? (
            <>
              <TextField
                label="OAuth redirect URI"
                fullWidth
                size="small"
                value={registerForm.oauth_redirect_uri}
                onChange={(event) => updateRegisterField("oauth_redirect_uri", event.target.value)}
              />
              <TextField
                label="OAuth client ID"
                fullWidth
                size="small"
                value={registerForm.oauth_client_id}
                onChange={(event) => updateRegisterField("oauth_client_id", event.target.value)}
              />
              <TextField
                label="OAuth client secret"
                fullWidth
                size="small"
                type="password"
                value={registerForm.oauth_client_secret}
                onChange={(event) => updateRegisterField("oauth_client_secret", event.target.value)}
                helperText={registerSecretHelper}
              />
              <TextField
                label="OAuth scopes"
                fullWidth
                size="small"
                multiline
                minRows={2}
                placeholder="scope.one&#10;scope.two"
                value={registerForm.oauth_scopes_text}
                onChange={(event) => updateRegisterField("oauth_scopes_text", event.target.value)}
              />
            </>
          ) : null}
        </Stack>
      </Box>
    );
  }

  function openRegisterModal() {
    setRegisterForm(createInitialRegisterForm());
    setRegisterServerEditingName(null);
    setRegisterConfigLoading(false);
    setRegisterError("");
    setRegisterOAuth(null);
    setRegisterOpen(true);
  }

  function closeRegisterModal() {
    setRegisterOpen(false);
    setRegisterServerEditingName(null);
    setRegisterConfigLoading(false);
    setRegisterError("");
    setRegisterOAuth(null);
    setRegisterForm(createInitialRegisterForm());
  }

  async function openEditServerModal(serverName: string) {
    setRegisterError("");
    setRegisterOAuth(null);
    setRegisterServerEditingName(serverName);
    setRegisterOpen(true);
    setRegisterConfigLoading(true);
    setRegisterForm(createInitialRegisterForm());
    try {
      const config = await api.getServerConfig(serverName);
      setRegisterForm(registerFormFromConfig(config, true));
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Failed to load server configuration";
      setFeedback({ tone: "error", message });
      closeRegisterModal();
    } finally {
      setRegisterConfigLoading(false);
    }
  }

  function resetRegisterOAuthStep(message = "") {
    setRegisterOAuth(null);
    setRegisterError(message);
  }

  function navigateToToolGroupList() {
    if (usesHashRouting()) {
      setDashboardLocationHash(appSectionToHash("tool_groups"));
      return;
    }
    setExpandedToolGroup(null);
    setToolGroupFormMode(null);
    setToolGroupEditingName(null);
  }

  function openToolGroupCreatePage() {
    if (usesHashRouting()) {
      setDashboardLocationHash(toolGroupCreateHash());
      return;
    }
    setExpandedToolGroup(null);
    setToolGroupFormMode("create");
  }

  function openToolGroupEditPage(group: DashboardToolGroup) {
    if (usesHashRouting()) {
      setDashboardLocationHash(toolGroupEditHash(group.name));
      return;
    }
    setExpandedToolGroup(null);
    setToolGroupEditingName(group.name);
    setToolGroupFormMode("edit");
  }

  function closeToolGroupFormPage() {
    const editing = toolGroupEditingName;
    if (usesHashRouting()) {
      if (toolGroupFormMode === "edit" && editing) {
        setDashboardLocationHash(toolGroupDetailHash(editing));
      } else {
        navigateToToolGroupList();
      }
      return;
    }
    setToolGroupFormMode(null);
    setToolGroupEditingName(null);
    setToolGroupForm(createInitialToolGroupForm());
    setToolGroupError("");
    if (toolGroupFormMode === "edit" && editing) {
      setExpandedToolGroup(editing);
    } else {
      setExpandedToolGroup(null);
    }
  }

  function toggleToolGroupSelection(canonicalName: string) {
    setToolGroupForm((current) => ({
      ...current,
      selectedTools: current.selectedTools.includes(canonicalName)
        ? current.selectedTools.filter((name) => name !== canonicalName)
        : [...current.selectedTools, canonicalName],
    }));
  }

  function removeToolGroupSelection(canonicalName: string) {
    setToolGroupForm((current) => ({
      ...current,
      selectedTools: current.selectedTools.filter((name) => name !== canonicalName),
    }));
  }

  function toggleToolGroupServerSelection(serverName: string) {
    setToolGroupForm((current) => ({
      ...current,
      selectedServers: current.selectedServers.includes(serverName)
        ? current.selectedServers.filter((name) => name !== serverName)
        : [...current.selectedServers, serverName],
    }));
  }

  function removeToolGroupServerSelection(serverName: string) {
    setToolGroupForm((current) => ({
      ...current,
      selectedServers: current.selectedServers.filter((name) => name !== serverName),
    }));
  }

  function toggleToolGroupExclusion(canonicalName: string) {
    setToolGroupForm((current) => ({
      ...current,
      excludedTools: current.excludedTools.includes(canonicalName)
        ? current.excludedTools.filter((name) => name !== canonicalName)
        : [...current.excludedTools, canonicalName],
    }));
  }

  function removeToolGroupExclusion(canonicalName: string) {
    setToolGroupForm((current) => ({
      ...current,
      excludedTools: current.excludedTools.filter((name) => name !== canonicalName),
    }));
  }

  function openPromptGroupModal() {
    setPromptGroupEditingName(null);
    setPromptGroupForm(createInitialPromptGroupForm());
    setPromptGroupError("");
    setPromptGroupPromptFilter("");
    setPromptGroupPromptServerFilter("all");
    setPromptGroupOpen(true);
  }

  function openPromptGroupModalForEdit(group: DashboardPromptGroup) {
    setPromptGroupEditingName(group.name);
    setPromptGroupForm({
      name: group.name,
      description: group.description ?? "",
      securityOption: group.security_option,
      selectedPrompts: group.prompts.map((p) => p.canonical_name),
    });
    setPromptGroupError("");
    setPromptGroupPromptFilter("");
    setPromptGroupPromptServerFilter("all");
    setPromptGroupOpen(true);
  }

  function closePromptGroupModal() {
    setPromptGroupOpen(false);
    setPromptGroupEditingName(null);
    setPromptGroupForm(createInitialPromptGroupForm());
    setPromptGroupError("");
  }

  function togglePromptGroupSelection(canonicalName: string) {
    setPromptGroupForm((current) => ({
      ...current,
      selectedPrompts: current.selectedPrompts.includes(canonicalName)
        ? current.selectedPrompts.filter((name) => name !== canonicalName)
        : [...current.selectedPrompts, canonicalName],
    }));
  }

  function removePromptGroupSelection(canonicalName: string) {
    setPromptGroupForm((current) => ({
      ...current,
      selectedPrompts: current.selectedPrompts.filter((name) => name !== canonicalName),
    }));
  }

  async function submitRegisterServer() {
    const validationError = getRegisterValidationError(registerForm, registerServerEditingName !== null);
    if (validationError) {
      setRegisterError(validationError);
      return;
    }

    setRegisterError("");
    try {
      setFeedback(null);
      setBusy("register-server", true);
      const editing = registerServerEditingName;
      if (editing) {
        await api.updateServer(editing, buildRegisterPayload(registerForm));
        await loadDashboardData(true);
        setFeedback({ tone: "success", message: `Server ${registerForm.name.trim()} updated.` });
        closeRegisterModal();
        return;
      }
      const response: DashboardRegisterServerResponse = await api.registerServer(buildRegisterPayload(registerForm));
      if (response.authorization_required) {
        setRegisterOAuth({
          authorization: response.authorization_required,
          hasOpenedBrowser: false,
          error: "",
        });
        setFeedback(null);
        return;
      }
      await loadDashboardData(true);
      setFeedback({ tone: "success", message: `Server ${registerForm.name.trim()} registered.` });
      closeRegisterModal();
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Request failed";
      setRegisterError(message);
      setFeedback({ tone: "error", message });
    } finally {
      setBusy("register-server", false);
    }
  }

  function startRegisterOAuth() {
    if (!registerOAuth) {
      return;
    }
    window.open(registerOAuth.authorization.authorization_url, "_blank", "noopener,noreferrer");
    setRegisterOAuth((current) =>
      current
        ? {
            ...current,
            hasOpenedBrowser: true,
            error: "",
          }
        : current,
    );
  }

  useEffect(() => {
    if (!registerOAuth?.hasOpenedBrowser) {
      return;
    }

    let cancelled = false
    const sessionID = registerOAuth.authorization.session_id

    async function pollOAuthSession() {
      try {
        const response = await api.getOAuthSession(sessionID)
        if (cancelled) {
          return
        }
        if (response.status === "pending") {
          return
        }
        if (response.status === "completed") {
          await loadDashboardData(true)
          if (cancelled) {
            return
          }
          setFeedback({
            tone: "success",
            message: `Server ${response.server_name ?? registerForm.name.trim()} registered.`,
          })
          closeRegisterModal()
          return
        }

        setRegisterOAuth((current) =>
          current
            ? {
                ...current,
                hasOpenedBrowser: false,
                error: response.error || "OAuth authorization could not be completed. Start registration again.",
              }
            : current,
        )
      } catch (error) {
        if (cancelled) {
          return
        }
        if (maybeRedirectDashboardAuth(error)) {
          return
        }
        const message = error instanceof Error ? error.message : "Failed to check OAuth authorization state."
        setRegisterOAuth((current) =>
          current
            ? {
                ...current,
                hasOpenedBrowser: false,
                error: message,
              }
            : current,
        )
      }
    }

    void pollOAuthSession()
    const timer = window.setInterval(() => {
      void pollOAuthSession()
    }, 2000)

    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [registerOAuth?.authorization.session_id, registerOAuth?.hasOpenedBrowser])

  async function toggleServerEnabled(server: DashboardServer) {
    const nextEnabled = !server.enabled;
    await runMutation(
      `server-toggle:${server.name}`,
      async () => {
        await api.setServerEnabled(server.name, nextEnabled);
      },
      `${server.name} ${nextEnabled ? "enabled" : "disabled"}.`,
    );
  }

  async function deleteServer(server: DashboardServer) {
    const confirmed = window.confirm(
      `Delete server "${server.name}"? This removes the registration and all discovered tools, prompts, and resources from MCP Gateway.`,
    );
    if (!confirmed) {
      return;
    }
    await runMutation(
      `server-delete:${server.name}`,
      async () => {
        await api.deleteServer(server.name);
      },
      `${server.name} deleted.`,
    );
    if (expandedServer === server.name) {
      setExpandedServer(null);
      const { pathname, search } = window.location;
      replaceDashboardLocation(pathname, search, appSectionToHash("servers"));
    }
  }

  async function reregisterServer(server: DashboardServer) {
    const confirmed = window.confirm(
      `Re-register server "${server.name}"? This refreshes tools, prompts, and resources from upstream and resyncs dependent tool and prompt groups.`,
    );
    if (!confirmed) {
      return;
    }
    await runMutation(
      `server-reregister:${server.name}`,
      async () => {
        await api.reregisterServer(server.name);
      },
      `${server.name} re-registered.`,
    );
  }

  async function toggleToolEnabled(tool: DashboardTool) {
    const nextEnabled = !tool.enabled;
    await runMutation(
      `tool-toggle:${tool.canonical_name}`,
      async () => {
        await api.setToolEnabled(tool.canonical_name, nextEnabled);
      },
      `${tool.canonical_name} ${nextEnabled ? "enabled" : "disabled"}.`,
    );
  }

  async function togglePromptEnabled(prompt: DashboardPrompt) {
    const nextEnabled = !prompt.enabled;
    await runMutation(
      `prompt-toggle:${prompt.canonical_name}`,
      async () => {
        await api.setPromptEnabled(prompt.canonical_name, nextEnabled);
      },
      `${prompt.canonical_name} ${nextEnabled ? "enabled" : "disabled"}.`,
    );
  }

  async function submitToolGroup() {
    const editing = toolGroupEditingName;
    const name = editing ?? toolGroupForm.name.trim();
    if (!name) {
      setToolGroupError("Group name is required.");
      return;
    }
    const effectiveTools = computeEffectiveToolNames(
      data.tools?.tools ?? [],
      toolGroupForm.selectedTools,
      toolGroupForm.selectedServers,
      toolGroupForm.excludedTools,
    );
    if (effectiveTools.length === 0) {
      setToolGroupError("Add at least one included tool or server so the group exposes tools.");
      return;
    }
    if (!editing && (data.toolGroups?.tool_groups ?? []).some((group) => group.name === name)) {
      setToolGroupError("A tool group with that name already exists.");
      return;
    }

    setToolGroupError("");
    setFeedback(null);
    const busyKey = editing ? "tool-group-save" : "tool-group-create";
    setBusy(busyKey, true);
    try {
      if (editing) {
        await api.updateToolGroup(editing, {
          description: toolGroupForm.description.trim(),
          tools: toolGroupForm.selectedTools,
          included_servers: toolGroupForm.selectedServers,
          excluded_tools: toolGroupForm.excludedTools,
          security_option: toolGroupForm.securityOption,
        });
        await loadDashboardData(true);
        setFeedback({ tone: "success", message: `Tool group ${editing} updated.` });
      } else {
        const payload: DashboardCreateToolGroupInput = {
          name,
          description: toolGroupForm.description.trim(),
          tools: toolGroupForm.selectedTools,
          included_servers: toolGroupForm.selectedServers,
          excluded_tools: toolGroupForm.excludedTools,
          security_option: toolGroupForm.securityOption,
        };
        await api.createToolGroup(payload);
        await loadDashboardData(true);
        setFeedback({ tone: "success", message: `Tool group ${name} created.` });
      }
      if (usesHashRouting()) {
        setDashboardLocationHash(editing ? toolGroupDetailHash(editing) : toolGroupDetailHash(name));
      } else {
        setToolGroupFormMode(null);
        setToolGroupEditingName(null);
        setToolGroupForm(createInitialToolGroupForm());
        setToolGroupError("");
        setExpandedToolGroup(editing ?? name);
      }
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Request failed";
      setToolGroupError(message);
      setFeedback({ tone: "error", message });
    } finally {
      setBusy(busyKey, false);
    }
  }

  async function submitPromptGroup() {
    const editing = promptGroupEditingName;
    const name = editing ?? promptGroupForm.name.trim();
    if (!name) {
      setPromptGroupError("Group name is required.");
      return;
    }
    if (promptGroupForm.selectedPrompts.length === 0) {
      setPromptGroupError("Select at least one prompt.");
      return;
    }
    if (!editing && (data.promptGroups?.prompt_groups ?? []).some((group) => group.name === name)) {
      setPromptGroupError("A prompt group with that name already exists.");
      return;
    }

    setPromptGroupError("");
    setFeedback(null);
    const busyKey = editing ? "prompt-group-save" : "prompt-group-create";
    setBusy(busyKey, true);
    try {
      if (editing) {
        await api.updatePromptGroup(editing, {
          description: promptGroupForm.description.trim(),
          prompts: promptGroupForm.selectedPrompts,
          security_option: promptGroupForm.securityOption,
        });
        await loadDashboardData(true);
        setFeedback({ tone: "success", message: `Prompt group ${editing} updated.` });
      } else {
        const payload: DashboardCreatePromptGroupInput = {
          name,
          description: promptGroupForm.description.trim(),
          prompts: promptGroupForm.selectedPrompts,
          security_option: promptGroupForm.securityOption,
        };
        await api.createPromptGroup(payload);
        await loadDashboardData(true);
        setFeedback({ tone: "success", message: `Prompt group ${name} created.` });
      }
      closePromptGroupModal();
      setDashboardLocationHash(editing ? promptGroupDetailHash(editing) : promptGroupDetailHash(name));
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Request failed";
      setPromptGroupError(message);
      setFeedback({ tone: "error", message });
    } finally {
      setBusy(busyKey, false);
    }
  }

  async function deleteToolGroup(group: DashboardToolGroup) {
    const confirmed = window.confirm(`Delete tool group "${group.name}"?`);
    if (!confirmed) {
      return;
    }
    await runMutation(
      `tool-group-delete:${group.name}`,
      async () => {
        await api.deleteToolGroup(group.name);
      },
      `${group.name} deleted.`,
    );
  }

  async function deletePromptGroup(group: DashboardPromptGroup) {
    const confirmed = window.confirm(`Delete prompt group "${group.name}"?`);
    if (!confirmed) {
      return;
    }
    await runMutation(
      `prompt-group-delete:${group.name}`,
      async () => {
        await api.deletePromptGroup(group.name);
      },
      `${group.name} deleted.`,
    );
  }

  function openAgentAppModal() {
    setAgentAppEditingId(null);
    setAgentAppName("");
    setAgentAppDescription("");
    setAgentAppToolGroup("");
    setAgentAppPromptGroup("");
    setAgentAppSkillSets([]);
    setAgentAppLegacyConfigInvalid(false);
    setAgentAppCreateError("");
    setAgentAppDialogOpen(true);
  }

  function openAgentAppModalForEdit(app: DashboardAgentApp) {
    setAgentAppEditingId(app.id);
    setAgentAppName(app.name);
    setAgentAppDescription(app.description ?? "");
    setAgentAppCreateError("");
    const tg = app.tool_group_names ?? [];
    const pg = app.prompt_group_names ?? [];
    const ss = app.skill_set_names ?? [];
    const bad =
      (tg.length !== 1 && pg.length !== 1) ||
      tg.length > 1 ||
      pg.length > 1;
    if (bad) {
      setAgentAppToolGroup("");
      setAgentAppPromptGroup("");
      setAgentAppSkillSets([]);
      setAgentAppLegacyConfigInvalid(true);
    } else {
      setAgentAppLegacyConfigInvalid(false);
      setAgentAppToolGroup(tg[0] ?? "");
      setAgentAppPromptGroup(pg[0] ?? "");
      setAgentAppSkillSets(ss);
    }
    setAgentAppDialogOpen(true);
  }

  function closeAgentAppModal() {
    setAgentAppDialogOpen(false);
    setAgentAppCreateError("");
    setAgentAppEditingId(null);
    setAgentAppName("");
    setAgentAppDescription("");
    setAgentAppToolGroup("");
    setAgentAppPromptGroup("");
    setAgentAppSkillSets([]);
    setAgentAppLegacyConfigInvalid(false);
  }

  async function submitAgentAppModal() {
    const name = agentAppName.trim();
    if (!name) {
      setAgentAppCreateError("Name is required.");
      return;
    }
    const toolGroupNames = agentAppToolGroup.trim() ? [agentAppToolGroup.trim()] : [];
    const promptGroupNames = agentAppPromptGroup.trim() ? [agentAppPromptGroup.trim()] : [];
    const skillSetNames = agentAppSkillSets.map((n) => n.trim()).filter(Boolean);
    const mcpAttached = toolGroupNames.length + promptGroupNames.length;
    if (mcpAttached !== 1) {
      setAgentAppCreateError("Select exactly one tool group or one prompt group.");
      return;
    }
    setAgentAppCreateError("");
    setFeedback(null);
    const editingId = agentAppEditingId;
    const busyKey = editingId !== null ? `agent-app-edit:${editingId}` : "agent-app-create";
    setBusy(busyKey, true);
    try {
      if (editingId !== null) {
        const patch: DashboardPatchAgentAppInput = {
          name,
          description: agentAppDescription.trim(),
          tool_group_names: toolGroupNames,
          prompt_group_names: promptGroupNames,
          skill_set_names: skillSetNames,
        };
        await api.patchAgentApp(editingId, patch);
        closeAgentAppModal();
        await loadDashboardData(true);
        setFeedback({ tone: "success", message: `${name} updated.` });
        return;
      }
      const payload: DashboardCreateAgentAppInput = {
        name,
        description: agentAppDescription.trim() || undefined,
        tool_group_names: toolGroupNames,
        prompt_group_names: promptGroupNames,
        skill_set_names: skillSetNames,
      };
      const res = await api.createAgentApp(payload);
      setAgentAppSecretReveal({
        title: `Client secret for ${res.app.name}`,
        secret: res.client_secret,
      });
      closeAgentAppModal();
      await loadDashboardData(true);
      setDashboardLocationHash(appAgentAppDetailHash(res.app.id));
      setFeedback({
        tone: "success",
        message: `${res.app.name} created. Copy the client secret from the dialog — it will not be shown again.`,
      });
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Request failed";
      setAgentAppCreateError(message);
      setFeedback({ tone: "error", message });
    } finally {
      setBusy(busyKey, false);
    }
  }

  async function deleteAgentApp(app: DashboardAgentApp) {
    const confirmed = window.confirm(`Delete agent app "${app.name}"? This cannot be undone.`);
    if (!confirmed) {
      return;
    }
    await runMutation(
      `agent-app-delete:${app.id}`,
      async () => {
        await api.deleteAgentApp(app.id);
      },
      `${app.name} deleted.`,
    );
  }

  async function toggleAgentAppStatus(app: DashboardAgentApp) {
    const nextStatus = app.status === "enabled" ? "disabled" : "enabled";
    await runMutation(
      `agent-app-status:${app.id}`,
      async () => {
        await api.patchAgentApp(app.id, { status: nextStatus });
      },
      nextStatus === "enabled" ? `${app.name} enabled.` : `${app.name} disabled.`,
    );
  }

  async function rotateAgentAppSecret(app: DashboardAgentApp) {
    const confirmed = window.confirm(
      `Rotate secret for "${app.name}"? The previous secret stops working immediately.`,
    );
    if (!confirmed) {
      return;
    }
    setFeedback(null);
    setBusy(`agent-app-rotate:${app.id}`, true);
    try {
      const res = await api.rotateAgentAppSecret(app.id);
      setAgentAppSecretReveal({
        title: `New client secret for ${app.name}`,
        secret: res.client_secret,
      });
      await loadDashboardData(true);
      setFeedback({
        tone: "success",
        message: `Secret rotated for ${app.name}. Copy it from the dialog — it will not be shown again.`,
      });
    } catch (error) {
      if (maybeRedirectDashboardAuth(error)) {
        return;
      }
      const message = error instanceof Error ? error.message : "Request failed";
      setFeedback({ tone: "error", message });
    } finally {
      setBusy(`agent-app-rotate:${app.id}`, false);
    }
  }

  function renderAgentAppGroupEndpoints(
    title: string,
    endpoints: DashboardAgentAppGroupEndpoints[] | null | undefined,
  ) {
    if (!endpoints?.length) {
      return null;
    }
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Stack spacing={2}>
          {endpoints.map((ge) => (
            <Paper key={ge.name} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                {ge.name}
              </Typography>
              <div className="tool-group-endpoints">
                <div className="tool-group-endpoint-row">
                  <span className="tool-group-endpoint-label">Streamable HTTP</span>
                  <div className="tool-group-endpoint-value">
                    <code className="detail-target-code" title={ge.streamable_http_endpoint}>
                      {ge.streamable_http_endpoint}
                    </code>
                    <CopyButton
                      ariaLabel="Copy Streamable HTTP endpoint"
                      title="Copy Streamable HTTP endpoint"
                      value={ge.streamable_http_endpoint}
                    />
                  </div>
                </div>
                <div className="tool-group-endpoint-row">
                  <span className="tool-group-endpoint-label">SSE</span>
                  <div className="tool-group-endpoint-stack">
                    <div className="tool-group-endpoint-value">
                      <code className="detail-target-code" title={ge.sse_endpoint}>
                        {ge.sse_endpoint}
                      </code>
                      <CopyButton ariaLabel="Copy SSE endpoint" title="Copy SSE endpoint" value={ge.sse_endpoint} />
                    </div>
                    {ge.sse_message_endpoint ? (
                      <div className="tool-group-endpoint-value">
                        <code className="detail-target-code" title={ge.sse_message_endpoint}>
                          {ge.sse_message_endpoint}
                        </code>
                        <CopyButton
                          ariaLabel="Copy SSE message endpoint"
                          title="Copy SSE message endpoint"
                          value={ge.sse_message_endpoint}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Paper>
          ))}
        </Stack>
      </Box>
    );
  }

  function renderToolGroupFormPanel() {
    const isEditing = toolGroupFormMode === "edit";
    return (
      <div className="tool-group-form-page">
        <Stack spacing={2}>
          <TextField
            label="Group name"
            placeholder="coding"
            fullWidth
            size="small"
            value={toolGroupForm.name}
            disabled={isEditing}
            helperText={isEditing ? "Group name cannot be changed." : undefined}
            onChange={(event) => setToolGroupForm((current) => ({ ...current, name: event.target.value }))}
          />
          <TextField
            label="Description"
            placeholder="Tools useful for coding workflows"
            fullWidth
            size="small"
            value={toolGroupForm.description}
            onChange={(event) =>
              setToolGroupForm((current) => ({ ...current, description: event.target.value }))
            }
          />
          <FormControl size="small" fullWidth>
            <InputLabel id="tg-mcp-security-label">MCP security</InputLabel>
            <Select
              labelId="tg-mcp-security-label"
              label="MCP security"
              value={toolGroupForm.securityOption}
              onChange={(event) =>
                setToolGroupForm((current) => ({
                  ...current,
                  securityOption: event.target.value as GroupSecurityOption,
                }))
              }
            >
              {GROUP_SECURITY_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="tool-group-sections">
            <div className="tool-group-tools-tabs panel">
              <Tabs
                aria-label="Tool group configuration"
                onChange={(_, value: ToolGroupFormTab) => setToolGroupFormTab(value)}
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  minHeight: 48,
                  px: 1,
                  "& .MuiTab-root": {
                    minHeight: 48,
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                  },
                }}
                value={toolGroupFormTab}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label={`Include servers (${toolGroupForm.selectedServers.length})`} value="servers" />
                <Tab label={`Include tools (${toolGroupForm.selectedTools.length})`} value="include" />
                <Tab label={`Exclude tools (${toolGroupForm.excludedTools.length})`} value="exclude" />
                <Tab label={`Effective tools (${toolGroupEffectivePreview.length})`} value="effective" />
              </Tabs>

              {toolGroupFormTab === "servers" ? (
            <section className="tool-group-section tool-group-tab-panel">
              <div className="tool-group-section-header">
                <strong>Included servers</strong>
                <span className="tool-group-section-hint">All tools from selected servers are added.</span>
              </div>
              <div className="tool-group-builder">
                <div className="tool-group-selector">
                  <div className="tool-group-selector-header">
                    <span>Available servers</span>
                  </div>
                  {availableToolGroupServers.length > 0 ? (
                    <div className="tool-pick-list tool-pick-list-compact">
                      {availableToolGroupServers.map((server) => {
                        const selected = toolGroupForm.selectedServers.includes(server.name);
                        return (
                          <button
                            className={`tool-pick-item ${selected ? "is-selected" : ""}`}
                            key={server.name}
                            onClick={() => toggleToolGroupServerSelection(server.name)}
                            type="button"
                          >
                            <div className="table-primary">{server.name}</div>
                            <div className="table-secondary">{server.tool_count} tools</div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="empty-inline">Register enabled MCP servers first.</p>
                  )}
                </div>
                <div className="tool-group-selector">
                  <div className="tool-group-selector-header">
                    <span>Selected servers</span>
                  </div>
                  {toolGroupForm.selectedServers.length > 0 ? (
                    <div className="selected-tool-list">
                      {toolGroupForm.selectedServers.map((serverName) => (
                        <button
                          className="selected-tool-chip"
                          key={serverName}
                          onClick={() => removeToolGroupServerSelection(serverName)}
                          type="button"
                        >
                          <code>{serverName}</code>
                          <span>Remove</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-inline">No servers selected.</p>
                  )}
                </div>
              </div>
            </section>
              ) : null}

              {toolGroupFormTab === "include" ? (
            <section className="tool-group-section tool-group-tab-panel">
              <div className="tool-group-section-header">
                <strong>Included tools</strong>
                <span className="tool-group-section-hint">Explicit canonical tools to add.</span>
              </div>
              <div className="tool-group-builder">
                <div className="tool-group-selector">
                  <div className="tool-group-selector-header">
                    <span>Available tools</span>
                  </div>
                  {(data.tools?.tools.length ?? 0) > 0 ? (
                    <>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 1 }}>
                        <TextField
                          placeholder="Search tools"
                          size="small"
                          value={toolGroupToolFilter}
                          onChange={(event) => setToolGroupToolFilter(event.target.value)}
                          sx={{ flex: 1, minWidth: 0 }}
                        />
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                          <InputLabel id="tg-server-filter">Server</InputLabel>
                          <Select
                            labelId="tg-server-filter"
                            label="Server"
                            value={toolGroupToolServerFilter}
                            onChange={(event) => setToolGroupToolServerFilter(event.target.value)}
                          >
                            <MenuItem value="all">All servers</MenuItem>
                            {uniqueToolServers.map((server) => (
                              <MenuItem key={server} value={server}>
                                {server}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <div className="tool-pick-list tool-pick-list-compact">
                        {availableToolGroupTools.map((tool) => {
                          const selected = toolGroupForm.selectedTools.includes(tool.canonical_name);
                          return (
                            <button
                              className={`tool-pick-item ${selected ? "is-selected" : ""}`}
                              key={tool.canonical_name}
                              onClick={() => toggleToolGroupSelection(tool.canonical_name)}
                              type="button"
                            >
                              <div className="table-primary">{tool.name}</div>
                              <code className="identifier-code" title={tool.canonical_name}>
                                {tool.canonical_name}
                              </code>
                              <div className="table-secondary">{tool.server}</div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="empty-inline">Register MCP servers first so tools are available to group.</p>
                  )}
                </div>
                <div className="tool-group-selector">
                  <div className="tool-group-selector-header">
                    <span>Selected tools</span>
                  </div>
                  {toolGroupForm.selectedTools.length > 0 ? (
                    <div className="selected-tool-list">
                      {toolGroupForm.selectedTools.map((toolName) => (
                        <button
                          className="selected-tool-chip"
                          key={toolName}
                          onClick={() => removeToolGroupSelection(toolName)}
                          type="button"
                        >
                          <code>{toolName}</code>
                          <span>Remove</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-inline">No tools selected.</p>
                  )}
                </div>
              </div>
            </section>
              ) : null}

              {toolGroupFormTab === "exclude" ? (
            <section className="tool-group-section tool-group-tab-panel">
              <div className="tool-group-section-header">
                <strong>Excluded tools</strong>
                <span className="tool-group-section-hint">
                  Remove tools from the included set; only currently included tools can be excluded.
                </span>
              </div>
              <div className="tool-group-builder">
                <div className="tool-group-selector">
                  <div className="tool-group-selector-header">
                    <span>Included tools</span>
                  </div>
                  {availableToolGroupExclusionTools.length > 0 ? (
                    <div className="tool-pick-list tool-pick-list-compact">
                      {availableToolGroupExclusionTools.map((tool) => {
                        const excluded = toolGroupForm.excludedTools.includes(tool.canonical_name);
                        return (
                          <button
                            className={`tool-pick-item tool-pick-item-excluded ${excluded ? "is-selected" : ""}`}
                            key={`exclude-${tool.canonical_name}`}
                            onClick={() => toggleToolGroupExclusion(tool.canonical_name)}
                            type="button"
                          >
                            <div className="table-primary">{tool.name}</div>
                            <code className="identifier-code" title={tool.canonical_name}>
                              {tool.canonical_name}
                            </code>
                            <div className="table-secondary">{tool.server}</div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="empty-inline">Add included tools or servers first to choose exclusions.</p>
                  )}
                </div>
                <div className="tool-group-selector">
                  <div className="tool-group-selector-header">
                    <span>Excluded tools</span>
                  </div>
                  {toolGroupForm.excludedTools.length > 0 ? (
                    <div className="selected-tool-list">
                      {toolGroupForm.excludedTools.map((toolName) => (
                        <button
                          className="selected-tool-chip selected-tool-chip-excluded"
                          key={toolName}
                          onClick={() => removeToolGroupExclusion(toolName)}
                          type="button"
                        >
                          <code>{toolName}</code>
                          <span>Remove</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-inline">No exclusions.</p>
                  )}
                </div>
              </div>
            </section>
              ) : null}

              {toolGroupFormTab === "effective" ? (
            <section className="tool-group-section tool-group-tab-panel tool-group-preview">
              <div className="tool-group-section-header tool-group-preview-header">
                <div>
                  <strong>Effective tools preview</strong>
                  <span className="tool-group-section-hint">
                    {toolGroupEffectivePreview.length} tool
                    {toolGroupEffectivePreview.length === 1 ? "" : "s"} after resolution
                    {toolGroupForm.excludedTools.length > 0 ? " (excluded tools omitted)" : ""}
                  </span>
                </div>
                {toolGroupEffectivePreview.length > 0 ? (
                  <CopyButton
                    ariaLabel="Copy all effective tools"
                    title="Copy all effective tools (one canonical name per line)"
                    value={toolGroupEffectivePreviewCopyText}
                  />
                ) : null}
              </div>
              {toolGroupEffectivePreview.length > 0 ? (
                <div className="tool-group-effective-table">
                  <div className="tool-group-effective-table-head">
                    <span>Tool</span>
                    <span>Canonical name</span>
                    <span>Server</span>
                    <span className="tool-group-effective-copy-col">Copy</span>
                  </div>
                  <div className="tool-group-effective-table-body">
                    {toolGroupEffectivePreviewItems.map((item) => (
                      <div className="tool-group-effective-table-row" key={item.canonical_name}>
                        <span className="table-primary">{item.name}</span>
                        <code className="identifier-code" title={item.canonical_name}>
                          {item.canonical_name}
                        </code>
                        <span className="table-secondary">{item.server}</span>
                        <span className="tool-group-effective-copy-col">
                          <CopyButton
                            ariaLabel={`Copy ${item.canonical_name}`}
                            title={`Copy ${item.canonical_name}`}
                            value={item.canonical_name}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="empty-inline">Add included tools or servers to preview the effective set.</p>
              )}
            </section>
              ) : null}
            </div>
          </div>

          {toolGroupError ? (
            <Typography color="error" variant="body2">
              {toolGroupError}
            </Typography>
          ) : null}

          <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", pt: 1 }}>
            <Button variant="outlined" onClick={closeToolGroupFormPage}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={isBusy("tool-group-create") || isBusy("tool-group-save")}
              onClick={() => void submitToolGroup()}
            >
              {isBusy("tool-group-create") || isBusy("tool-group-save")
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "+ Add Tool Group"}
            </Button>
          </Stack>
        </Stack>
      </div>
    );
  }

  function renderToolGroupDetailPanel(group: DashboardToolGroup) {
    return (
      <>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }}>
          <IconButton
            aria-label="Edit tool group"
            disabled={isBusy("tool-group-save") || isBusy("tool-group-create")}
            onClick={(e) => {
              e.stopPropagation();
              openToolGroupEditPage(group);
            }}
            title="Edit tool group"
            size="small"
          >
            <PencilIcon />
          </IconButton>
          <IconButton
            aria-label="Delete tool group"
            color="error"
            disabled={isBusy(`tool-group-delete:${group.name}`)}
            onClick={(e) => {
              e.stopPropagation();
              void deleteToolGroup(group);
            }}
            title="Delete tool group"
            size="small"
          >
            <TrashIcon />
          </IconButton>
        </Stack>
        <div className="tool-detail-panel">
          <div className="tool-group-tools-tabs panel">
            <Tabs
              aria-label="Tool group detail sections"
              onChange={(_, value: ToolGroupDetailTab) => setToolGroupDetailTab(value)}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                minHeight: 48,
                px: 1,
                "& .MuiTab-root": {
                  minHeight: 48,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                },
              }}
              value={toolGroupDetailTab}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Tool group details" value="detail" />
              <Tab label={`Effective tools (${group.tool_count})`} value="effective" />
            </Tabs>

            {toolGroupDetailTab === "detail" ? (
              <div className="tool-group-tab-panel">
                <dl className="tool-detail-meta">
                  <div className="tool-detail-description">
                    <dt>MCP security</dt>
                    <dd>
                      {groupSecurityLabel(group.security_option)}{" "}
                      <code className="identifier-code">({group.security_option})</code>
                    </dd>
                  </div>
                </dl>
                {group.description ? (
                  <dl className="tool-detail-meta">
                    <div className="tool-detail-description">
                      <dt>Description</dt>
                      <dd>{group.description}</dd>
                    </div>
                  </dl>
                ) : null}
                <div className="tool-schema-section">
                  <div className="tool-schema-header">
                    <h4>MCP endpoints</h4>
                  </div>
                  <div className="tool-group-endpoints">
                    <div className="tool-group-endpoint-row">
                      <span className="tool-group-endpoint-label">Streamable HTTP</span>
                      <div className="tool-group-endpoint-value">
                        <code className="detail-target-code" title={group.streamable_http_endpoint}>
                          {group.streamable_http_endpoint}
                        </code>
                        <CopyButton
                          ariaLabel="Copy Streamable HTTP endpoint"
                          title="Copy Streamable HTTP endpoint"
                          value={group.streamable_http_endpoint}
                        />
                      </div>
                    </div>
                    <div className="tool-group-endpoint-row">
                      <span className="tool-group-endpoint-label">SSE</span>
                      <div className="tool-group-endpoint-stack">
                        <div className="tool-group-endpoint-value">
                          <code className="detail-target-code" title={group.sse_endpoint}>
                            {group.sse_endpoint}
                          </code>
                          <CopyButton
                            ariaLabel="Copy SSE endpoint"
                            title="Copy SSE endpoint"
                            value={group.sse_endpoint}
                          />
                        </div>
                        <div className="tool-group-endpoint-value">
                          <code className="detail-target-code" title={group.sse_message_endpoint}>
                            {group.sse_message_endpoint}
                          </code>
                          <CopyButton
                            ariaLabel="Copy SSE message endpoint"
                            title="Copy SSE message endpoint"
                            value={group.sse_message_endpoint}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tool-schema-section">
                  <div className="tool-schema-header">
                    <h4>Group configuration</h4>
                  </div>
                  <dl className="tool-detail-meta">
                    <div className="tool-detail-description">
                      <dt>Included servers</dt>
                      <dd>
                        {(group.included_servers ?? []).length > 0 ? (
                          <div className="tool-group-config-chips">
                            {group.included_servers.map((serverName) => (
                              <code className="identifier-code" key={serverName}>
                                {serverName}
                              </code>
                            ))}
                          </div>
                        ) : (
                          <span className="table-secondary">None</span>
                        )}
                      </dd>
                    </div>
                    <div className="tool-detail-description">
                      <dt>Included tools</dt>
                      <dd>
                        {(group.included_tools ?? []).length > 0 ? (
                          <div className="tool-group-config-chips">
                            {group.included_tools.map((toolName) => (
                              <code className="identifier-code" key={toolName}>
                                {toolName}
                              </code>
                            ))}
                          </div>
                        ) : (
                          <span className="table-secondary">None</span>
                        )}
                      </dd>
                    </div>
                    <div className="tool-detail-description">
                      <dt>Excluded tools</dt>
                      <dd>
                        {(group.excluded_tools ?? []).length > 0 ? (
                          <div className="tool-group-config-chips">
                            {group.excluded_tools.map((toolName) => (
                              <code className="identifier-code" key={toolName}>
                                {toolName}
                              </code>
                            ))}
                          </div>
                        ) : (
                          <span className="table-secondary">None</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ) : null}

            {toolGroupDetailTab === "effective" ? (
              <div className="tool-group-tab-panel tool-group-preview">
                <div className="tool-group-section-header tool-group-preview-header">
                  <div>
                    <strong>Effective tools</strong>
                    <span className="tool-group-section-hint">
                      {group.tool_count} tool{group.tool_count === 1 ? "" : "s"} in this group
                    </span>
                  </div>
                  {group.tools.length > 0 ? (
                    <CopyButton
                      ariaLabel="Copy all effective tools"
                      title="Copy all effective tools (one canonical name per line)"
                      value={group.tools.map((tool) => tool.canonical_name).join("\n")}
                    />
                  ) : null}
                </div>
                {group.tools.length > 0 ? (
                  <div className="tool-group-effective-table">
                    <div className="tool-group-effective-table-head">
                      <span>Tool</span>
                      <span>Canonical name</span>
                      <span>Server</span>
                      <span className="tool-group-effective-copy-col">Copy</span>
                    </div>
                    <div className="tool-group-effective-table-body">
                      {group.tools.map((tool) => (
                        <div className="tool-group-effective-table-row" key={tool.canonical_name}>
                          <span className="table-primary">{tool.name}</span>
                          <code className="identifier-code" title={tool.canonical_name}>
                            {tool.canonical_name}
                          </code>
                          <span className="table-secondary">{tool.server}</span>
                          <span className="tool-group-effective-copy-col">
                            <CopyButton
                              ariaLabel={`Copy ${tool.canonical_name}`}
                              title={`Copy ${tool.canonical_name}`}
                              value={tool.canonical_name}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="empty-inline">No tools in this group.</p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  function renderPromptGroupDetailPanel(group: DashboardPromptGroup) {
    return (
      <>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", flexWrap: "wrap", mb: 2 }}>
          <IconButton
            aria-label="Edit prompt group"
            disabled={isBusy("prompt-group-save") || isBusy("prompt-group-create")}
            onClick={(e) => {
              e.stopPropagation();
              openPromptGroupModalForEdit(group);
            }}
            title="Edit prompt group"
            size="small"
          >
            <PencilIcon />
          </IconButton>
          <IconButton
            aria-label="Delete prompt group"
            color="error"
            disabled={isBusy(`prompt-group-delete:${group.name}`)}
            onClick={(e) => {
              e.stopPropagation();
              void deletePromptGroup(group);
            }}
            title="Delete prompt group"
            size="small"
          >
            <TrashIcon />
          </IconButton>
        </Stack>
        <div className="tool-detail-panel">
          <div className="tool-detail-header">
            <p className="panel-label">Prompt group details</p>
          </div>
          <dl className="tool-detail-meta">
            <div className="tool-detail-description">
              <dt>MCP security</dt>
              <dd>
                {groupSecurityLabel(group.security_option)}{" "}
                <code className="identifier-code">({group.security_option})</code>
              </dd>
            </div>
          </dl>
          {group.description ? (
            <dl className="tool-detail-meta">
              <div className="tool-detail-description">
                <dt>Description</dt>
                <dd>{group.description}</dd>
              </div>
            </dl>
          ) : null}
          <div className="tool-schema-section">
            <div className="tool-schema-header">
              <h4>MCP endpoints</h4>
            </div>
            <div className="tool-group-endpoints">
              <div className="tool-group-endpoint-row">
                <span className="tool-group-endpoint-label">Streamable HTTP</span>
                <div className="tool-group-endpoint-value">
                  <code className="detail-target-code" title={group.streamable_http_endpoint}>
                    {group.streamable_http_endpoint}
                  </code>
                  <CopyButton
                    ariaLabel="Copy Streamable HTTP endpoint"
                    title="Copy Streamable HTTP endpoint"
                    value={group.streamable_http_endpoint}
                  />
                </div>
              </div>
              <div className="tool-group-endpoint-row">
                <span className="tool-group-endpoint-label">SSE</span>
                <div className="tool-group-endpoint-stack">
                  <div className="tool-group-endpoint-value">
                    <code className="detail-target-code" title={group.sse_endpoint}>
                      {group.sse_endpoint}
                    </code>
                    <CopyButton ariaLabel="Copy SSE endpoint" title="Copy SSE endpoint" value={group.sse_endpoint} />
                  </div>
                  <div className="tool-group-endpoint-value">
                    <code className="detail-target-code" title={group.sse_message_endpoint}>
                      {group.sse_message_endpoint}
                    </code>
                    <CopyButton
                      ariaLabel="Copy SSE message endpoint"
                      title="Copy SSE message endpoint"
                      value={group.sse_message_endpoint}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tool-schema-section">
            <div className="tool-schema-header">
              <h4>Included prompts</h4>
            </div>
            {group.prompts.length > 0 ? (
              <div className="schema-field-list">
                {group.prompts.map((prompt) => (
                  <article className="schema-field-card" key={prompt.canonical_name}>
                    <div className="schema-field-head">
                      <code>{prompt.canonical_name}</code>
                      <span className="schema-type-pill">
                        <code>{prompt.server}</code>
                      </span>
                    </div>
                    <dl className="schema-field-meta">
                      {prompt.description ? (
                        <div>
                          <dt>Description</dt>
                          <dd>{prompt.description}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-inline">No prompts in this group.</p>
            )}
          </div>
        </div>
      </>
    );
  }

  function renderServerDetailPanel(server: DashboardServer) {
    const serverKind = resolveServerKind(server);
    const isRestServer = server.transport === "rest" || serverKind.startsWith("rest");
    return (
      <>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }}>
          <CopyButton ariaLabel="Copy server name" title="Copy server name" value={server.name} />
          <Button variant="outlined" size="small" onClick={() => void openEditServerModal(server.name)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            disabled={isBusy(`server-toggle:${server.name}`)}
            onClick={() => void toggleServerEnabled(server)}
          >
            {isBusy(`server-toggle:${server.name}`)
              ? "Saving..."
              : server.enabled
                ? "Disable"
                : "Enable"}
          </Button>
          <Button
            variant="outlined"
            size="small"
            disabled={isBusy(`server-reregister:${server.name}`)}
            onClick={() => void reregisterServer(server)}
          >
            {isBusy(`server-reregister:${server.name}`) ? "Re-registering..." : "Re-register"}
          </Button>
          <IconButton
            aria-label="Delete server"
            color="error"
            disabled={isBusy(`server-delete:${server.name}`)}
            onClick={() => void deleteServer(server)}
            title="Delete server"
            size="small"
          >
            <TrashIcon />
          </IconButton>
        </Stack>
        <div className="tool-detail-panel">
          <div className="tool-detail-header">
            <p className="panel-label">Server details</p>
          </div>
          {!server.enabled ? (
            <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
              This server is registered but currently not exposed to MCP clients.
            </Typography>
          ) : null}
          <dl className="tool-detail-meta">
            <div className="tool-detail-description">
              <dt>Server kind</dt>
              <dd>
                <StatusBadge text={serverKindLabel(serverKind)} tone="muted" />
              </dd>
            </div>
            <div className="tool-detail-description">
              <dt>Transport</dt>
              <dd>
                <code>{transportLabel(server.transport)}</code>
              </dd>
            </div>
            <div className="tool-detail-description">
              <dt>Connection</dt>
              <dd>
                <div className="tool-state-line">
                  <StatusBadge
                    text={serverConnectionLabel(server.status)}
                    tone={serverConnectionTone(server.status)}
                  />
                </div>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                  {server.connection_summary}
                </Typography>
              </dd>
            </div>
            <div className="tool-detail-description">
              <dt>Catalog</dt>
              <dd>
                {server.tool_count} tools · {server.prompt_count} prompts · {server.resource_count} resources
              </dd>
            </div>
            {server.last_discovered_at ? (
              <div className="tool-detail-description">
                <dt>Last discovered</dt>
                <dd>
                  <code>{server.last_discovered_at}</code>
                </dd>
              </div>
            ) : null}
            {server.updated_at ? (
              <div className="tool-detail-description">
                <dt>Updated</dt>
                <dd>
                  <code>{server.updated_at}</code>
                </dd>
              </div>
            ) : null}
            {server.config_summary.description ? (
              <div className="tool-detail-description">
                <dt>Description</dt>
                <dd>{server.config_summary.description}</dd>
              </div>
            ) : null}
          </dl>

          <div className="server-detail" style={{ marginTop: "1rem" }}>
            <dl>
              <div>
                <dt>{isRestServer ? "Base URL" : "Target"}</dt>
                <dd>
                  <div className="detail-copy-row">
                    <code className="detail-target-code">
                      {server.config_summary.target ?? server.config_summary.command ?? "Unknown"}
                    </code>
                    {server.config_summary.target || server.config_summary.command ? (
                      <CopyButton
                        ariaLabel={isRestServer ? "Copy base URL" : "Copy target"}
                        title={isRestServer ? "Copy base URL" : "Copy target"}
                        value={server.config_summary.target ?? server.config_summary.command ?? ""}
                      />
                    ) : null}
                  </div>
                </dd>
              </div>
              {!isRestServer ? (
                <div>
                  <dt>Session mode</dt>
                  <dd>
                    <code>{server.config_summary.session_mode ?? "Unknown"}</code>
                  </dd>
                </div>
              ) : null}
              {!isRestServer ? (
                <div>
                  <dt>Header keys</dt>
                  <dd>
                    <code>{server.config_summary.header_keys?.join(", ") || "None"}</code>
                  </dd>
                </div>
              ) : null}
              {!isRestServer ? (
                <div>
                  <dt>Env keys</dt>
                  <dd>
                    <code>{server.config_summary.env_keys?.join(", ") || "None"}</code>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </>
    );
  }

  function renderToolDetailPanel(tool: DashboardTool) {
    const fields = parseToolSchemaFields(tool.input_schema);
    return (
      <>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }}>
          <CopyButton
            ariaLabel="Copy canonical name"
            title="Copy canonical name"
            value={tool.canonical_name}
          />
          <Button
            variant="outlined"
            size="small"
            disabled={isBusy(`tool-toggle:${tool.canonical_name}`)}
            onClick={(e) => {
              e.stopPropagation();
              void toggleToolEnabled(tool);
            }}
          >
            {isBusy(`tool-toggle:${tool.canonical_name}`)
              ? "Saving..."
              : tool.enabled
                ? "Disable"
                : "Enable"}
          </Button>
        </Stack>
        <div className="tool-detail-panel">
          <div className="tool-detail-header">
            <p className="panel-label">Tool details</p>
          </div>

          <dl className="tool-detail-meta">
            <div className="tool-detail-description">
              <dt>Server</dt>
              <dd>
                <code>{tool.server}</code>
              </dd>
            </div>
            <div className="tool-detail-description">
              <dt>Canonical name</dt>
              <dd>
                <code className="identifier-code">{tool.canonical_name}</code>
              </dd>
            </div>
            <div className="tool-detail-description">
              <dt>Status</dt>
              <dd>
                <div className="tool-state-line">
                  <StatusBadge
                    text={tool.enabled ? "Enabled" : "Disabled"}
                    tone={tool.enabled ? "good" : "muted"}
                  />
                  {!tool.server_enabled ? <StatusBadge text="Server disabled" tone="warn" /> : null}
                </div>
              </dd>
            </div>
          </dl>

          <dl className="tool-detail-meta">
            <div className="tool-detail-description">
              <dt>Description</dt>
              <dd>{toolDescription(tool)}</dd>
            </div>
          </dl>

          <div className="tool-schema-section">
            <div className="tool-schema-header">
              <h4>Input fields</h4>
            </div>
            {fields.length > 0 ? (
              <div className="schema-field-list">
                {fields.map((field) => (
                  <article className="schema-field-card" key={field.path}>
                    <div className="schema-field-head">
                      <code>{field.path}</code>
                      <span className="schema-type-pill">
                        <code>{field.type}</code>
                      </span>
                    </div>
                    <dl className="schema-field-meta">
                      <div>
                        <dt>Required</dt>
                        <dd>{field.required ? "yes" : "no"}</dd>
                      </div>
                      {field.description ? (
                        <div>
                          <dt>Description</dt>
                          <dd>{field.description}</dd>
                        </div>
                      ) : null}
                      {field.enumValues?.length ? (
                        <div>
                          <dt>Enum</dt>
                          <dd>
                            <code>{field.enumValues.join(", ")}</code>
                          </dd>
                        </div>
                      ) : null}
                      {field.defaultValue ? (
                        <div>
                          <dt>Default</dt>
                          <dd>
                            <code>{field.defaultValue}</code>
                          </dd>
                        </div>
                      ) : null}
                      {field.note ? (
                        <div>
                          <dt>Notes</dt>
                          <dd>{field.note}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-inline">No structured input fields were provided.</p>
            )}
          </div>

          <details className="raw-schema-disclosure">
            <summary>Raw schema</summary>
            <div className="raw-schema-code-wrap">
              <CopyButton
                ariaLabel="Copy raw schema"
                title="Copy raw schema"
                value={prettyJSON(tool.input_schema)}
              />
              <pre className="schema-code">
                <code>{prettyJSON(tool.input_schema)}</code>
              </pre>
            </div>
          </details>
        </div>
      </>
    );
  }

  function renderPromptDetailPanel(prompt: DashboardPrompt) {
    const fields = parsePromptArgumentFields(prompt.arguments);
    return (
      <>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", justifyContent: "flex-end", mb: 2 }}>
          <CopyButton
            ariaLabel="Copy canonical name"
            title="Copy canonical name"
            value={prompt.canonical_name}
          />
          <Button
            variant="outlined"
            size="small"
            disabled={isBusy(`prompt-toggle:${prompt.canonical_name}`)}
            onClick={(e) => {
              e.stopPropagation();
              void togglePromptEnabled(prompt);
            }}
          >
            {isBusy(`prompt-toggle:${prompt.canonical_name}`)
              ? "Saving..."
              : prompt.enabled
                ? "Disable"
                : "Enable"}
          </Button>
        </Stack>
        <div className="tool-detail-panel">
          <div className="tool-detail-header">
            <p className="panel-label">Prompt details</p>
          </div>

          <dl className="tool-detail-meta">
            <div className="tool-detail-description">
              <dt>Server</dt>
              <dd>
                <code>{prompt.server}</code>
              </dd>
            </div>
            <div className="tool-detail-description">
              <dt>Canonical name</dt>
              <dd>
                <code className="identifier-code">{prompt.canonical_name}</code>
              </dd>
            </div>
            <div className="tool-detail-description">
              <dt>Status</dt>
              <dd>
                <div className="tool-state-line">
                  <StatusBadge
                    text={prompt.enabled ? "Enabled" : "Disabled"}
                    tone={prompt.enabled ? "good" : "muted"}
                  />
                  {!prompt.server_enabled ? <StatusBadge text="Server disabled" tone="warn" /> : null}
                </div>
              </dd>
            </div>
          </dl>

          <dl className="tool-detail-meta">
            <div className="tool-detail-description">
              <dt>Description</dt>
              <dd>{promptDescription(prompt)}</dd>
            </div>
          </dl>

          <div className="tool-schema-section">
            <div className="tool-schema-header">
              <h4>Arguments</h4>
            </div>
            {fields.length > 0 ? (
              <div className="schema-field-list">
                {fields.map((field) => (
                  <article className="schema-field-card" key={field.path}>
                    <div className="schema-field-head">
                      <code>{field.path}</code>
                      <span className="schema-type-pill">
                        <code>{field.type}</code>
                      </span>
                    </div>
                    <dl className="schema-field-meta">
                      <div>
                        <dt>Required</dt>
                        <dd>{field.required ? "yes" : "no"}</dd>
                      </div>
                      {field.description ? (
                        <div>
                          <dt>Description</dt>
                          <dd>{field.description}</dd>
                        </div>
                      ) : null}
                      {field.enumValues?.length ? (
                        <div>
                          <dt>Enum</dt>
                          <dd>
                            <code>{field.enumValues.join(", ")}</code>
                          </dd>
                        </div>
                      ) : null}
                      {field.defaultValue ? (
                        <div>
                          <dt>Default</dt>
                          <dd>
                            <code>{field.defaultValue}</code>
                          </dd>
                        </div>
                      ) : null}
                      {field.note ? (
                        <div>
                          <dt>Notes</dt>
                          <dd>{field.note}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-inline">No arguments.</p>
            )}
          </div>

          <details className="raw-schema-disclosure">
            <summary>Raw arguments</summary>
            <div className="raw-schema-actions">
              <CopyButton
                ariaLabel="Copy raw arguments"
                title="Copy raw arguments"
                value={prettyPromptArguments(prompt.arguments)}
              />
            </div>
            <pre className="schema-code">
              <code>{prettyPromptArguments(prompt.arguments)}</code>
            </pre>
          </details>
        </div>
      </>
    );
  }

  function renderAgentAppDetailPanel(app: DashboardAgentApp) {
    const oauthCurlExample = agentAppOAuthTokenCurlCommand(app.oauth_token_url, app.client_id);
    return (
      <>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: { sm: "flex-start" }, mb: 1 }}
        >
          <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", mb: 0.5 }}>
              <StatusBadge
                tone={app.status === "enabled" ? "good" : "muted"}
                text={app.status === "enabled" ? "enabled" : "disabled"}
              />
            </Stack>
            {app.description ? (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {app.description}
              </Typography>
            ) : null}
          </Box>
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0, flexWrap: "wrap" }}>
            <IconButton
              aria-label={`Edit ${app.name}`}
              color="primary"
              size="small"
              disabled={isBusy(`agent-app-edit:${app.id}`)}
              onClick={(e) => {
                e.stopPropagation();
                openAgentAppModalForEdit(app);
              }}
              title="Edit agent app"
            >
              <PencilIcon />
            </IconButton>
            <Button
              size="small"
              variant="outlined"
              disabled={isBusy(`agent-app-status:${app.id}`)}
              onClick={(e) => {
                e.stopPropagation();
                void toggleAgentAppStatus(app);
              }}
            >
              {app.status === "enabled" ? "Disable" : "Enable"}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              disabled={isBusy(`agent-app-rotate:${app.id}`)}
              onClick={(e) => {
                e.stopPropagation();
                void rotateAgentAppSecret(app);
              }}
            >
              Rotate secret
            </Button>
            <IconButton
              aria-label={`Delete ${app.name}`}
              color="error"
              size="small"
              disabled={isBusy(`agent-app-delete:${app.id}`)}
              onClick={(e) => {
                e.stopPropagation();
                void deleteAgentApp(app);
              }}
              title="Delete agent app"
            >
              <TrashIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 0.5 }}>
          Client ID
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1, flexWrap: "wrap" }}>
          <Typography
            component="code"
            variant="body2"
            sx={{ wordBreak: "break-all", fontFamily: monospaceFontFamily }}
          >
            {app.client_id}
          </Typography>
          <CopyButton ariaLabel="Copy client ID" title="Copy client ID" value={app.client_id} />
        </Stack>
        <Typography variant="caption" color="text.secondary">
          Attached group:{" "}
          {app.tool_group_names?.length === 1
            ? `${app.tool_group_names[0]} (tool)`
            : app.prompt_group_names?.length === 1
              ? `${app.prompt_group_names[0]} (prompt)`
              : "— (invalid or unset — edit to fix)"}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 0.5 }}>
          Skill sets:{" "}
          {app.skill_set_names?.length ? (
            <Stack direction="row" spacing={0.5} component="span" sx={{ display: "inline-flex", flexWrap: "wrap", gap: 0.5, verticalAlign: "middle" }}>
              {app.skill_set_names.map((name) => (
                <Chip key={name} label={name} size="small" variant="outlined" />
              ))}
            </Stack>
          ) : (
            "—"
          )}
        </Typography>

        <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            OAuth token URL
          </Typography>
          <div className="tool-group-endpoint-row">
            <div className="tool-group-endpoint-value">
              <code className="detail-target-code" title={app.oauth_token_url}>
                {app.oauth_token_url}
              </code>
              <CopyButton ariaLabel="Copy OAuth token URL" title="Copy OAuth token URL" value={app.oauth_token_url} />
            </div>
          </div>
          <Accordion
            variant="outlined"
            disableGutters
            sx={{
              mt: 1.5,
              borderRadius: 2,
              "&:before": { display: "none" },
              boxShadow: "none",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
              <Typography variant="subtitle2">Get a Bearer token (curl)</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Replace <code>YOUR_CLIENT_SECRET</code> with the secret from when you created or last rotated this app.
                The response JSON includes <code>access_token</code>, <code>token_type</code> (Bearer), and{" "}
                <code>expires_in</code> (seconds).
              </Typography>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: "grey.50" }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: "flex-start" }}>
                  <Typography
                    component="pre"
                    sx={{
                      flex: 1,
                      m: 0,
                      overflow: "auto",
                      fontSize: "0.75rem",
                      lineHeight: 1.5,
                      fontFamily: monospaceFontFamily,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                    }}
                  >
                    {oauthCurlExample}
                  </Typography>
                  <CopyButton ariaLabel="Copy curl command" title="Copy curl command" value={oauthCurlExample} />
                </Stack>
              </Paper>
              <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 1.5 }}>
                You can also POST JSON with <code>grant_type</code>, <code>client_id</code>, and{" "}
                <code>client_secret</code> fields and <code>Content-Type: application/json</code>.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {renderAgentAppGroupEndpoints("Tool group MCP URLs", app.tool_group_endpoints)}
        {renderAgentAppGroupEndpoints("Prompt group MCP URLs", app.prompt_group_endpoints)}
        {renderAgentAppGroupEndpoints("Skill set catalog URLs", app.skill_set_endpoints)}
      </>
    );
  }

  const dashboardReady = loadState === "ready";
  const showNav = dashboardReady && !needsDashboardAuth;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: componentMode ? "column" : "row",
        minHeight: externalAuth ? "100%" : "100vh",
        bgcolor: "background.default",
      }}
    >
      {showNav && !componentMode ? (
        <NavSidebar
          active={section}
          onSelect={selectSection}
          signOutHref={dashboardSignOutHref}
          embedMode={externalAuth}
          signedInEmail={embedSignedInEmail}
        />
      ) : null}
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          overflowX: "auto",
          ...(dashboardReady
            ? { p: componentMode ? "12px 18px 18px" : "18px" }
            : {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                minHeight: componentMode ? "100%" : "100vh",
              }),
        }}
      >
        {showNav && componentMode ? (
          <NavTabs active={section} onSelect={selectSection} />
        ) : null}
        {dashboardReady ? (
        <Stack component="header" direction={{ xs: "column", lg: "row" }} spacing={2} sx={{ mb: 2 }}>
          {section === "home" ? (
            <Box sx={{ flex: "1 1 auto", minWidth: 0 }} aria-hidden />
          ) : (
          <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
            <Typography variant="h4" component="h1" sx={{ mt: "2px", fontWeight: 700, lineHeight: 1.1 }}>
              {currentSectionMeta.title}
            </Typography>
            {currentSectionMeta.subtitle ? (
              <Typography color="text.secondary" sx={{ mt: "6px" }}>
                {currentSectionMeta.subtitle}
              </Typography>
            ) : null}
          </Box>
          )}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-end",
              maxWidth: { lg: 720 },
            }}
          >
            {overview?.endpoints[0] ? (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  minWidth: 0,
                  maxWidth: "100%",
                  px: 1,
                  py: 0.75,
                  borderRadius: "14px",
                  border: 1,
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  Global Endpoint
                </Typography>
                <Typography
                  component="code"
                  variant="body2"
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: monospaceFontFamily,
                  }}
                  title={overview.endpoints[0].url}
                >
                  {overview.endpoints[0].url}
                </Typography>
                <CopyButton ariaLabel="Copy global endpoint" title="Copy global endpoint" value={overview.endpoints[0].url} />
              </Stack>
            ) : null}
          </Stack>
        </Stack>
        ) : null}

        {dashboardReady && feedback ? (
          <Alert
            severity={feedback.tone === "success" ? "success" : "error"}
            sx={{ mb: 2 }}
            onClose={() => setFeedback(null)}
          >
            <strong>{feedback.tone === "success" ? "Updated" : "Request failed"}</strong>
            <span> {feedback.message}</span>
          </Alert>
        ) : null}

        {loadState === "checking_session" ? (
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }}>
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <CircularProgress />
              <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
                Starting dashboard
              </Typography>
              <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                Checking gateway access and sign-in requirements.
              </Typography>
            </Stack>
          </Paper>
        ) : null}

        {loadState === "loading" ? (
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, maxWidth: 480, width: "100%" }}>
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <CircularProgress />
              <Typography variant="h5" component="h2">
                Loading dashboard
              </Typography>
              <Typography color="text.secondary" sx={{ textAlign: "center" }}>
                Querying local MCP Gateway state, servers, tools, prompts, and resources.
              </Typography>
            </Stack>
          </Paper>
        ) : null}

        {loadState === "error" ? (
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, borderColor: "error.light", maxWidth: 560, width: "100%" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Dashboard API unavailable
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Failed to load dashboard data from the local server.
            </Typography>
            <Typography
              component="code"
              sx={{
                display: "block",
                mt: 2,
                p: 1.5,
                bgcolor: "grey.100",
                borderRadius: 1,
                fontFamily: monospaceFontFamily,
                wordBreak: "break-word",
              }}
            >
              {errorMessage}
            </Typography>
          </Paper>
        ) : null}

        {loadState === "ready" ? (
          <div className="flex flex-col gap-[14px]">
            {!componentMode && section === "home" ? (
              <HomePage
                overview={overview}
                auth={authSession ?? undefined}
                onNavigate={selectSection}
              />
            ) : needsDashboardAuth ? (
              <Paper variant="outlined" sx={{ p: 4, maxWidth: 560, borderRadius: 2, mx: "auto" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Sign in required
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Use the gateway sign-in flow to manage servers, tools, prompts, resources, and diagnostics.
                </Typography>
                {authSession?.login_path ? (
                  <Button variant="contained" component="a" href={authSession.login_path}>
                    Sign in
                  </Button>
                ) : null}
              </Paper>
            ) : (
              <>
            {section === "servers" && data.servers ? (
              <>
                {overview ? (
                  <section className="dense-metrics-grid">
                    <div className="metric-card compact-metric">
                      <span>Servers</span>
                      <strong>{overview.server_count}</strong>
                    </div>
                    <div className="metric-card compact-metric">
                      <span>Tools</span>
                      <strong>{overview.tool_count}</strong>
                    </div>
                    <div className="metric-card compact-metric">
                      <span>Prompts</span>
                      <strong>{overview.prompt_count}</strong>
                    </div>
                    <div className="metric-card compact-metric">
                      <span>Resources</span>
                      <strong>{overview.resource_count}</strong>
                    </div>
                  </section>
                ) : null}

                {expandedServer !== null ? (
                  <SectionCard
                    title={selectedServer?.name ?? expandedServer}
                    subtitle="Registered MCP servers"
                    action={
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: { sm: "center" } }}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setDashboardLocationHash(appSectionToHash("servers"));
                          }}
                        >
                          ← All servers
                        </Button>
                        <Button variant="contained" onClick={openRegisterModal}>
                          + Add Server
                        </Button>
                      </Stack>
                    }
                  >
                    {selectedServer ? (
                      renderServerDetailPanel(selectedServer)
                    ) : (
                      <Stack spacing={2} sx={{ py: 2 }}>
                        <Typography color="text.secondary" variant="body2">
                          This server does not exist or was removed. Bookmarked URLs stay valid only while the server is
                          registered.
                        </Typography>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setDashboardLocationHash(appSectionToHash("servers"));
                          }}
                        >
                          Back to all servers
                        </Button>
                      </Stack>
                    )}
                  </SectionCard>
                ) : (
                  <SectionCard
                    title="Servers"
                    subtitle="Registered MCP servers"
                    action={
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: { sm: "center" } }}>
                        <TextField
                          size="small"
                          placeholder="Search servers"
                          value={serverFilter}
                          onChange={(event) => setServerFilter(event.target.value)}
                          sx={{ minWidth: { sm: 220 } }}
                        />
                        <Button variant="contained" onClick={openRegisterModal}>
                          + Add Server
                        </Button>
                      </Stack>
                    }
                  >
                    {data.servers.empty_state && filteredServers.length === 0 ? (
                      <EmptyStateCard emptyState={data.servers.empty_state} />
                    ) : (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                          gap: 1.5,
                        }}
                      >
                        {filteredServers.map((server) => {
                          const muted = !server.enabled;
                          return (
                            <Paper
                              key={server.name}
                              role="link"
                              tabIndex={0}
                              aria-label={`Open server ${server.name}`}
                              onClick={() => {
                                setDashboardLocationHash(serverDetailHash(server.name));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setDashboardLocationHash(serverDetailHash(server.name));
                                }
                              }}
                              elevation={0}
                              variant="outlined"
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                cursor: "pointer",
                                borderColor: "divider",
                                opacity: muted ? 0.82 : 1,
                                transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                                "&:hover": {
                                  borderColor: "primary.light",
                                  bgcolor: "action.hover",
                                  boxShadow: 1,
                                },
                                "&:focus-visible": {
                                  outline: "2px solid",
                                  outlineColor: "primary.main",
                                  outlineOffset: 2,
                                },
                              }}
                            >
                              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                {server.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block", mb: 1, wordBreak: "break-word" }}
                              >
                                {server.connection_summary}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                                <code>{transportLabel(server.transport)}</code>
                              </Typography>
                              <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                                <StatusBadge
                                  text={serverKindLabel(resolveServerKind(server))}
                                  tone="muted"
                                />
                                <StatusBadge
                                  text={server.enabled ? "Enabled" : "Disabled"}
                                  tone={server.enabled ? "good" : "muted"}
                                />
                                <StatusBadge
                                  text={serverConnectionLabel(server.status)}
                                  tone={serverConnectionTone(server.status)}
                                />
                              </Stack>
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                                {server.tool_count} tools · {server.prompt_count} prompts · {server.resource_count}{" "}
                                resources
                              </Typography>
                              <Typography variant="caption" color="primary" sx={{ display: "block", mt: 1 }}>
                                View details →
                              </Typography>
                            </Paper>
                          );
                        })}
                      </Box>
                    )}
                  </SectionCard>
                )}
              </>
            ) : null}

            {section === "tools" && data.tools ? (
              expandedTool !== null ? (
                <SectionCard
                  title={selectedTool?.name ?? expandedTool ?? "Tool"}
                  subtitle="Discovered tools across registered servers"
                  action={
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setDashboardLocationHash(appSectionToHash("tools"));
                      }}
                    >
                      ← All tools
                    </Button>
                  }
                >
                  {selectedTool ? (
                    renderToolDetailPanel(selectedTool)
                  ) : (
                    <Stack spacing={2} sx={{ py: 2 }}>
                      <Typography color="text.secondary" variant="body2">
                        This tool does not exist or was removed. Bookmarked URLs stay valid only while the tool is
                        present in the catalog.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setDashboardLocationHash(appSectionToHash("tools"));
                        }}
                      >
                        Back to all tools
                      </Button>
                    </Stack>
                  )}
                </SectionCard>
              ) : (
                <SectionCard
                  title="Tools"
                  subtitle="Discovered tools across registered servers"
                  action={
                    <div className="toolbar-cluster">
                      <input
                        className="table-filter compact-filter"
                        onChange={(event) => setToolFilter(event.target.value)}
                        placeholder="Search tools"
                        value={toolFilter}
                      />
                      <select
                        className="table-filter compact-filter compact-select"
                        onChange={(event) => setToolServerFilter(event.target.value)}
                        value={toolServerFilter}
                      >
                        <option value="all">All servers</option>
                        {uniqueToolServers.map((server) => (
                          <option key={server} value={server}>
                            {server}
                          </option>
                        ))}
                      </select>
                    </div>
                  }
                >
                  {data.tools.empty_state && filteredTools.length === 0 ? (
                    <EmptyStateCard emptyState={data.tools.empty_state} />
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 1.5,
                      }}
                    >
                      {filteredTools.map((tool) => {
                        const muted = !tool.enabled || !tool.server_enabled;
                        return (
                          <Paper
                            key={tool.canonical_name}
                            role="link"
                            tabIndex={0}
                            aria-label={`Open tool ${tool.name}`}
                            onClick={() => {
                              setDashboardLocationHash(toolDetailHash(tool.canonical_name));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setDashboardLocationHash(toolDetailHash(tool.canonical_name));
                              }
                            }}
                            elevation={0}
                            variant="outlined"
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              cursor: "pointer",
                              borderColor: "divider",
                              opacity: muted ? 0.82 : 1,
                              transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                              "&:hover": {
                                borderColor: "primary.light",
                                bgcolor: "action.hover",
                                boxShadow: 1,
                              },
                              "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: "primary.main",
                                outlineOffset: 2,
                              },
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                              {tool.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, wordBreak: "break-all" }}>
                              <code>{tool.canonical_name}</code>
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                              <code>{tool.server}</code>
                            </Typography>
                            <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                              <StatusBadge
                                text={tool.enabled ? "Enabled" : "Disabled"}
                                tone={tool.enabled ? "good" : "muted"}
                              />
                              {!tool.server_enabled ? <StatusBadge text="Server off" tone="warn" /> : null}
                            </Stack>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {toolDescription(tool)}
                            </Typography>
                            <Typography variant="caption" color="primary" sx={{ display: "block", mt: 1 }}>
                              View details →
                            </Typography>
                          </Paper>
                        );
                      })}
                    </Box>
                  )}
                </SectionCard>
              )
            ) : null}

            {section === "tool_groups" && data.toolGroups ? (
              toolGroupFormMode !== null ? (
                <SectionCard
                  title={toolGroupFormMode === "edit" ? "Edit Tool Group" : "Add Tool Group"}
                  subtitle={
                    toolGroupFormMode === "edit"
                      ? (editingToolGroup?.name ?? toolGroupEditingName ?? "")
                      : "Configure included servers, tools, and exclusions."
                  }
                  action={
                    <Button variant="outlined" onClick={closeToolGroupFormPage}>
                      {toolGroupFormMode === "edit" && toolGroupEditingName
                        ? `← ${toolGroupEditingName}`
                        : "← All tool groups"}
                    </Button>
                  }
                >
                  {toolGroupFormMode === "edit" && toolGroupEditingName && !editingToolGroup ? (
                    <Stack spacing={2} sx={{ py: 2 }}>
                      <Typography color="text.secondary" variant="body2">
                        This tool group does not exist or was deleted.
                      </Typography>
                      <Button variant="contained" onClick={navigateToToolGroupList}>
                        Back to all tool groups
                      </Button>
                    </Stack>
                  ) : (
                    renderToolGroupFormPanel()
                  )}
                </SectionCard>
              ) : expandedToolGroup !== null ? (
                <SectionCard
                  title={selectedToolGroup?.name ?? expandedToolGroup}
                  subtitle=""
                  action={
                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                      <Button variant="outlined" onClick={navigateToToolGroupList}>
                        ← All tool groups
                      </Button>
                      <Button variant="contained" onClick={openToolGroupCreatePage}>
                        + Add Tool Group
                      </Button>
                    </Stack>
                  }
                >
                  {selectedToolGroup ? (
                    renderToolGroupDetailPanel(selectedToolGroup)
                  ) : (
                    <Stack spacing={2} sx={{ py: 2 }}>
                      <Typography color="text.secondary" variant="body2">
                        This tool group does not exist or was deleted.
                      </Typography>
                      <Button variant="contained" onClick={navigateToToolGroupList}>
                        Back to all tool groups
                      </Button>
                    </Stack>
                  )}
                </SectionCard>
              ) : (
                <SectionCard
                  title="Configured tool groups"
                  subtitle=""
                  action={
                    <Button variant="contained" onClick={openToolGroupCreatePage}>
                      + Add Tool Group
                    </Button>
                  }
                >
                  {data.toolGroups.empty_state && data.toolGroups.tool_groups.length === 0 ? (
                    <EmptyStateCard emptyState={data.toolGroups.empty_state} />
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 1.5,
                      }}
                    >
                      {data.toolGroups.tool_groups.map((group) => (
                        <Paper
                          key={group.name}
                          role="link"
                          tabIndex={0}
                          aria-label={`Open tool group ${group.name}`}
                          onClick={() => {
                            setDashboardLocationHash(toolGroupDetailHash(group.name));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setDashboardLocationHash(toolGroupDetailHash(group.name));
                            }
                          }}
                          elevation={0}
                          variant="outlined"
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            cursor: "pointer",
                            borderColor: "divider",
                            transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                            "&:hover": {
                              borderColor: "primary.light",
                              bgcolor: "action.hover",
                              boxShadow: 1,
                            },
                            "&:focus-visible": {
                              outline: "2px solid",
                              outlineColor: "primary.main",
                              outlineOffset: 2,
                            },
                          }}
                        >
                          <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start", mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1, minWidth: 0 }}>
                              {group.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              component="span"
                              sx={{ fontWeight: 600, color: "text.secondary", flexShrink: 0 }}
                            >
                              {group.tool_count} tools
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                            <code title={groupSecurityLabel(group.security_option)}>{group.security_option}</code>
                          </Typography>
                          {group.description ? (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {group.description}
                            </Typography>
                          ) : (
                            <Typography variant="caption" color="text.disabled">
                              No description
                            </Typography>
                          )}
                          <Typography variant="caption" color="primary" sx={{ display: "block", mt: 1 }}>
                            View details →
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  )}
                </SectionCard>
              )
            ) : null}

            {section === "skills" ? <SkillsSection /> : null}

            {section === "skill_sets" ? (
              <SectionCard title={currentSectionMeta.title} subtitle={currentSectionMeta.subtitle}>
                <SkillSetsCatalogPanel />
              </SectionCard>
            ) : null}

            {section === "prompt_groups" && data.promptGroups ? (
              expandedPromptGroup !== null ? (
                <SectionCard
                  title={selectedPromptGroup?.name ?? expandedPromptGroup}
                  subtitle=""
                  action={
                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setDashboardLocationHash(appSectionToHash("prompt_groups"));
                        }}
                      >
                        ← All prompt groups
                      </Button>
                      <Button variant="contained" onClick={openPromptGroupModal}>
                        + Add Prompt Group
                      </Button>
                    </Stack>
                  }
                >
                  {selectedPromptGroup ? (
                    renderPromptGroupDetailPanel(selectedPromptGroup)
                  ) : (
                    <Stack spacing={2} sx={{ py: 2 }}>
                      <Typography color="text.secondary" variant="body2">
                        This prompt group does not exist or was deleted.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setDashboardLocationHash(appSectionToHash("prompt_groups"));
                        }}
                      >
                        Back to all prompt groups
                      </Button>
                    </Stack>
                  )}
                </SectionCard>
              ) : (
                <SectionCard
                  title="Configured prompt groups"
                  subtitle=""
                  action={
                    <Button variant="contained" onClick={openPromptGroupModal}>
                      + Add Prompt Group
                    </Button>
                  }
                >
                  {data.promptGroups.empty_state && data.promptGroups.prompt_groups.length === 0 ? (
                    <EmptyStateCard emptyState={data.promptGroups.empty_state} />
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 1.5,
                      }}
                    >
                      {data.promptGroups.prompt_groups.map((group) => (
                        <Paper
                          key={group.name}
                          role="link"
                          tabIndex={0}
                          aria-label={`Open prompt group ${group.name}`}
                          onClick={() => {
                            setDashboardLocationHash(promptGroupDetailHash(group.name));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setDashboardLocationHash(promptGroupDetailHash(group.name));
                            }
                          }}
                          elevation={0}
                          variant="outlined"
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            cursor: "pointer",
                            borderColor: "divider",
                            transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                            "&:hover": {
                              borderColor: "primary.light",
                              bgcolor: "action.hover",
                              boxShadow: 1,
                            },
                            "&:focus-visible": {
                              outline: "2px solid",
                              outlineColor: "primary.main",
                              outlineOffset: 2,
                            },
                          }}
                        >
                          <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start", mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1, minWidth: 0 }}>
                              {group.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              component="span"
                              sx={{ fontWeight: 600, color: "text.secondary", flexShrink: 0 }}
                            >
                              {group.prompt_count} prompts
                            </Typography>
                          </Stack>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                            <code title={groupSecurityLabel(group.security_option)}>{group.security_option}</code>
                          </Typography>
                          {group.description ? (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {group.description}
                            </Typography>
                          ) : (
                            <Typography variant="caption" color="text.disabled">
                              No description
                            </Typography>
                          )}
                          <Typography variant="caption" color="primary" sx={{ display: "block", mt: 1 }}>
                            View details →
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  )}
                </SectionCard>
              )
            ) : null}

            {section === "prompts" && data.prompts ? (
              expandedPrompt !== null ? (
                <SectionCard
                  title={selectedPrompt?.name ?? expandedPrompt ?? "Prompt"}
                  subtitle="Discovered prompt templates"
                  action={
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setDashboardLocationHash(appSectionToHash("prompts"));
                      }}
                    >
                      ← All prompts
                    </Button>
                  }
                >
                  {selectedPrompt ? (
                    renderPromptDetailPanel(selectedPrompt)
                  ) : (
                    <Stack spacing={2} sx={{ py: 2 }}>
                      <Typography color="text.secondary" variant="body2">
                        This prompt does not exist or was removed. Bookmarked URLs stay valid only while the prompt is
                        in the catalog.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setDashboardLocationHash(appSectionToHash("prompts"));
                        }}
                      >
                        Back to all prompts
                      </Button>
                    </Stack>
                  )}
                </SectionCard>
              ) : (
                <SectionCard
                  title="Prompts"
                  subtitle="Discovered prompt templates"
                  action={
                    <div className="toolbar-cluster">
                      <input
                        className="table-filter compact-filter"
                        onChange={(event) => setPromptFilter(event.target.value)}
                        placeholder="Search prompts"
                        value={promptFilter}
                      />
                    </div>
                  }
                >
                  {data.prompts.empty_state && filteredPrompts.length === 0 ? (
                    <EmptyStateCard emptyState={data.prompts.empty_state} />
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 1.5,
                      }}
                    >
                      {filteredPrompts.map((prompt) => {
                        const muted = !prompt.enabled || !prompt.server_enabled;
                        return (
                          <Paper
                            key={prompt.canonical_name}
                            role="link"
                            tabIndex={0}
                            aria-label={`Open prompt ${prompt.name}`}
                            onClick={() => {
                              setDashboardLocationHash(promptDetailHash(prompt.canonical_name));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setDashboardLocationHash(promptDetailHash(prompt.canonical_name));
                              }
                            }}
                            elevation={0}
                            variant="outlined"
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              cursor: "pointer",
                              borderColor: "divider",
                              opacity: muted ? 0.82 : 1,
                              transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                              "&:hover": {
                                borderColor: "primary.light",
                                bgcolor: "action.hover",
                                boxShadow: 1,
                              },
                              "&:focus-visible": {
                                outline: "2px solid",
                                outlineColor: "primary.main",
                                outlineOffset: 2,
                              },
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                              {prompt.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, wordBreak: "break-all" }}>
                              <code>{prompt.canonical_name}</code>
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                              <code>{prompt.server}</code>
                            </Typography>
                            <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5, mb: 1 }}>
                              <StatusBadge
                                text={prompt.enabled ? "Enabled" : "Disabled"}
                                tone={prompt.enabled ? "good" : "muted"}
                              />
                              {!prompt.server_enabled ? <StatusBadge text="Server off" tone="warn" /> : null}
                            </Stack>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {promptDescription(prompt)}
                            </Typography>
                            <Typography variant="caption" color="primary" sx={{ display: "block", mt: 1 }}>
                              View details →
                            </Typography>
                          </Paper>
                        );
                      })}
                    </Box>
                  )}
                </SectionCard>
              )
            ) : null}

            {section === "resources" && data.resources ? (
              <SectionCard title="Resources" subtitle="Discovered MCP resources">
                {data.resources.empty_state && data.resources.resources.length === 0 ? (
                  <EmptyStateCard emptyState={data.resources.empty_state} />
                ) : (
                  <table className="data-table compact-table resources-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>URI</th>
                        <th>Server</th>
                        <th>MIME</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.resources.resources.map((resource) => (
                        <tr key={resource.uri}>
                          <td>{resource.name}</td>
                          <td>
                            <div className="inline-copy resource-uri-cell">
                              <code className="identifier-code" title={resource.uri}>
                                {resource.uri}
                              </code>
                              <CopyButton
                                ariaLabel="Copy resource URI"
                                title="Copy resource URI"
                                value={resource.uri}
                              />
                            </div>
                          </td>
                          <td>{resource.server}</td>
                          <td>
                            <code>{resource.mime_type || "Unknown"}</code>
                          </td>
                          <td>{resourceDescription(resource)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </SectionCard>
            ) : null}

            {section === "agent_apps" && data.agentApps ? (
              agentAppDetailId !== null ? (
                <SectionCard
                  title={selectedAgentApp?.name ?? `Agent app #${agentAppDetailId}`}
                  action={
                    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setDashboardLocationHash(appSectionToHash("agent_apps"));
                        }}
                      >
                        ← All apps
                      </Button>
                      <Button variant="contained" onClick={openAgentAppModal}>
                        + Create agent app
                      </Button>
                    </Stack>
                  }
                >
                  {selectedAgentApp ? (
                    renderAgentAppDetailPanel(selectedAgentApp)
                  ) : (
                    <Stack spacing={2} sx={{ py: 2 }}>
                      <Typography color="text.secondary" variant="body2">
                        This agent app does not exist or was deleted. Bookmarked URLs are only valid while the app is
                        present.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setDashboardLocationHash(appSectionToHash("agent_apps"));
                        }}
                      >
                        Back to all apps
                      </Button>
                    </Stack>
                  )}
                </SectionCard>
              ) : (
                <SectionCard
                  title="Agent apps"
                  action={
                    <Button variant="contained" onClick={openAgentAppModal}>
                      + Create agent app
                    </Button>
                  }
                >
                  {data.agentApps.apps.length === 0 ? (
                    <Typography color="text.secondary" variant="body2">
                      No agent apps yet. Create one to mint tokens scoped to specific tool and prompt groups.
                    </Typography>
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 1.5,
                      }}
                    >
                      {data.agentApps.apps.map((app) => (
                        <Paper
                          key={app.id}
                          role="link"
                          tabIndex={0}
                          aria-label={`Open ${app.name}`}
                          onClick={() => {
                            setDashboardLocationHash(appAgentAppDetailHash(app.id));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setDashboardLocationHash(appAgentAppDetailHash(app.id));
                            }
                          }}
                          elevation={0}
                          variant="outlined"
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            cursor: "pointer",
                            borderColor: "divider",
                            transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
                            "&:hover": {
                              borderColor: "primary.light",
                              bgcolor: "action.hover",
                              boxShadow: 1,
                            },
                            "&:focus-visible": {
                              outline: "2px solid",
                              outlineColor: "primary.main",
                              outlineOffset: 2,
                            },
                          }}
                        >
                          <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start", mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1, minWidth: 0 }}>
                              {app.name}
                            </Typography>
                            <StatusBadge
                              tone={app.status === "enabled" ? "good" : "muted"}
                              text={app.status === "enabled" ? "enabled" : "disabled"}
                            />
                          </Stack>
                          {app.description ? (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {app.description}
                            </Typography>
                          ) : (
                            <Typography variant="caption" color="text.disabled">
                              No description
                            </Typography>
                          )}
                          <Typography variant="caption" color="primary" sx={{ display: "block", mt: 1 }}>
                            View details →
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  )}
                </SectionCard>
              )
            ) : null}

            {section === "diagnostics" && diagnostics ? (
              <>
                <SectionCard title="System Info" subtitle="Runtime details">
                  <Box
                    sx={{
                      borderRadius: 2,
                      bgcolor: "grey.100",
                      border: 1,
                      borderColor: "divider",
                      px: 2.5,
                      py: 2,
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      This gateway is built for <strong>local productivity</strong> (fast iteration, minimal setup) and{" "}
                      <strong>shared deployments</strong> (prefix routing, optional SSO, Redis session store, and metrics).
                      Use the sidebar to configure servers, inspect catalogued tools, and tune what each client can see.
                    </Typography>
                  </Box>
                  <div className="diagnostics-grid compact-diagnostics-grid">
                    <div className="diag-card compact-metric">
                      <span>Version</span>
                      <strong>{shortVersion(diagnostics.version)}</strong>
                    </div>
                    <div className="diag-card compact-metric">
                      <span>Mode</span>
                      <strong>{diagnostics.mode}</strong>
                    </div>
                    <div className="diag-card compact-metric">
                      <span>Database</span>
                      <strong>{diagnostics.database}</strong>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Runtime details" subtitle="System information">
                  <dl className="diagnostic-list compact-diagnostic-list">
                    <div>
                      <dt>Full build</dt>
                      <dd>
                        <code>{diagnostics.version}</code>
                      </dd>
                    </div>
                    <div>
                      <dt>Global MCP Endpoint</dt>
                      <dd>
                        <code>{diagnostics.primary_endpoint}</code>
                      </dd>
                    </div>
                    <div>
                      <dt>Enabled transports</dt>
                      <dd>
                        <code>{diagnostics.enabled_transports.join(", ")}</code>
                      </dd>
                    </div>
                  </dl>
                </SectionCard>
              </>
            ) : null}

            {section === "observability" ? (
              <ObservabilityPage
                data={observabilityData}
                loading={observabilityLoading}
                error={observabilityError}
                range={observabilityRange}
                onRangeChange={setObservabilityRange}
                onRefresh={() => void loadObservability(observabilityRange)}
                metricsEndpoint={diagnostics?.metrics_endpoint}
              />
            ) : null}

            {section === "lineage" ? (
              <LineagePage data={lineageData} loading={lineageLoading} error={lineageError} />
            ) : null}
              </>
            )}
          </div>
        ) : null}

        <Dialog open={promptGroupOpen} onClose={closePromptGroupModal} maxWidth="md" fullWidth scroll="paper">
          <DialogTitle sx={{ pr: 6 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Box>
                <Typography variant="caption" sx={{ letterSpacing: "0.12em", fontWeight: 600 }}>
                  Prompt Groups
                </Typography>
                <Typography variant="h5" sx={{ mt: 0.5 }}>
                  {promptGroupEditingName ? "Edit Prompt Group" : "Add Prompt Group"}
                </Typography>
              </Box>
              <Button variant="outlined" size="small" onClick={closePromptGroupModal}>
                Close
              </Button>
            </Stack>
          </DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField
                label="Group name"
                placeholder="reviews"
                fullWidth
                size="small"
                value={promptGroupForm.name}
                disabled={promptGroupEditingName !== null}
                helperText={promptGroupEditingName ? "Group name cannot be changed." : undefined}
                onChange={(event) =>
                  setPromptGroupForm((current) => ({ ...current, name: event.target.value }))
                }
              />
              <TextField
                label="Description"
                placeholder="Prompts useful for PR review workflows"
                fullWidth
                size="small"
                value={promptGroupForm.description}
                onChange={(event) =>
                  setPromptGroupForm((current) => ({ ...current, description: event.target.value }))
                }
              />
              <FormControl size="small" fullWidth>
                <InputLabel id="pg-mcp-security-label">MCP security</InputLabel>
                <Select
                  labelId="pg-mcp-security-label"
                  label="MCP security"
                  value={promptGroupForm.securityOption}
                  onChange={(event) =>
                    setPromptGroupForm((current) => ({
                      ...current,
                      securityOption: event.target.value as GroupSecurityOption,
                    }))
                  }
                >
                  {GROUP_SECURITY_OPTIONS.map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                      {o.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className="tool-group-builder">
                <div className="tool-group-selector panel">
                  <div className="tool-group-selector-header">
                    <strong>Available prompts</strong>
                  </div>
                  {(data.prompts?.prompts.length ?? 0) > 0 ? (
                    <>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 1 }}>
                        <TextField
                          placeholder="Search prompts"
                          size="small"
                          value={promptGroupPromptFilter}
                          onChange={(event) => setPromptGroupPromptFilter(event.target.value)}
                          sx={{ flex: 1, minWidth: 0 }}
                        />
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                          <InputLabel id="pg-server-filter">Server</InputLabel>
                          <Select
                            labelId="pg-server-filter"
                            label="Server"
                            value={promptGroupPromptServerFilter}
                            onChange={(event) => setPromptGroupPromptServerFilter(event.target.value)}
                          >
                            <MenuItem value="all">All servers</MenuItem>
                            {uniquePromptServers.map((server) => (
                              <MenuItem key={server} value={server}>
                                {server}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <div className="tool-pick-list">
                        {availablePromptGroupPrompts.map((prompt) => {
                          const selected = promptGroupForm.selectedPrompts.includes(prompt.canonical_name);
                          return (
                            <button
                              className={`tool-pick-item ${selected ? "is-selected" : ""}`}
                              key={prompt.canonical_name}
                              onClick={() => togglePromptGroupSelection(prompt.canonical_name)}
                              type="button"
                            >
                              <div className="table-primary">{prompt.name}</div>
                              <code className="identifier-code" title={prompt.canonical_name}>
                                {prompt.canonical_name}
                              </code>
                              <div className="table-secondary">{prompt.server}</div>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="empty-inline">
                      Register MCP servers first so prompts are available to group.
                    </p>
                  )}
                </div>

                <div className="tool-group-selector panel">
                  <div className="tool-group-selector-header">
                    <strong>Selected prompts</strong>
                  </div>
                  {promptGroupForm.selectedPrompts.length > 0 ? (
                    <div className="selected-tool-list">
                      {promptGroupForm.selectedPrompts.map((promptName) => (
                        <button
                          className="selected-tool-chip"
                          key={promptName}
                          onClick={() => removePromptGroupSelection(promptName)}
                          type="button"
                        >
                          <code>{promptName}</code>
                          <span>Remove</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-inline">Select at least one prompt.</p>
                  )}
                </div>
              </div>

              {promptGroupError ? (
                <Typography color="error" variant="body2">
                  {promptGroupError}
                </Typography>
              ) : null}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button variant="outlined" onClick={closePromptGroupModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={isBusy("prompt-group-create") || isBusy("prompt-group-save")}
              onClick={() => void submitPromptGroup()}
            >
              {isBusy("prompt-group-create") || isBusy("prompt-group-save")
                ? "Saving..."
                : promptGroupEditingName
                  ? "Save changes"
                  : "+ Add Prompt Group"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={registerOpen} onClose={closeRegisterModal} maxWidth="sm" fullWidth scroll="paper">
          <DialogTitle sx={{ pr: 6 }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Box>
                <Typography variant="caption" sx={{ letterSpacing: "0.12em", fontWeight: 600 }}>
                  {registerServerEditingName ? "Edit server" : "Add server"}
                </Typography>
                <Typography variant="h5" sx={{ mt: 0.5 }}>
                  {registerOAuth
                    ? "Complete OAuth authorization"
                    : registerServerEditingName
                      ? "Edit server"
                      : isRestUpstream(registerForm)
                        ? "Register a REST server"
                        : "Register an MCP server"}
                </Typography>
              </Box>
              <Button variant="outlined" size="small" onClick={closeRegisterModal}>
                Close
              </Button>
            </Stack>
          </DialogTitle>

          <DialogContent dividers>
            {registerConfigLoading ? (
              <Stack sx={{ alignItems: "center", justifyContent: "center", py: 6 }}>
                <CircularProgress />
              </Stack>
            ) : registerOAuth ? (
              <Stack spacing={2} className="oauth-step">
                <Typography>
                  This server requires OAuth authorization. Continue in your browser to complete registration.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {registerOAuth.hasOpenedBrowser
                        ? "Waiting for OAuth authorization..."
                        : "Authorization required"}
                    </Typography>
                    {registerOAuth.authorization.expires_at ? (
                      <Typography variant="body2" color="text.secondary">
                        Expires {new Date(registerOAuth.authorization.expires_at).toLocaleTimeString()}
                      </Typography>
                    ) : null}
                  </Stack>
                </Paper>
                {registerOAuth.error ? (
                  <Typography color="error" variant="body2">
                    {registerOAuth.error}
                  </Typography>
                ) : null}
              </Stack>
            ) : (
              <Stack spacing={2}>
                <TextField
                  label="Server name"
                  placeholder={
                    isRestUpstream(registerForm)
                      ? "petstore"
                      : registerForm.transport === "streamable_http"
                        ? "context7"
                        : "filesystem"
                  }
                  fullWidth
                  size="small"
                  value={registerForm.name}
                  disabled={registerServerEditingName !== null}
                  onChange={(event) => updateRegisterField("name", event.target.value)}
                />
                <TextField
                  label="Description"
                  placeholder={
                    isRestUpstream(registerForm)
                      ? "Petstore REST API exposed as MCP tools"
                      : registerForm.transport === "streamable_http"
                        ? "context7 mcp server"
                        : "Local filesystem access"
                  }
                  fullWidth
                  size="small"
                  value={registerForm.description}
                  onChange={(event) => updateRegisterField("description", event.target.value)}
                />

                <FormControl fullWidth size="small">
                  <InputLabel id="reg-upstream-type">Upstream type</InputLabel>
                  <Select
                    labelId="reg-upstream-type"
                    label="Upstream type"
                    value={registerForm.upstream_type}
                    disabled={registerServerEditingName !== null}
                    onChange={(event) => updateUpstreamType(event.target.value as UpstreamType)}
                  >
                    <MenuItem value="mcp_protocol">MCP protocol server</MenuItem>
                    <MenuItem value="rest_openapi">REST API (OpenAPI)</MenuItem>
                    <MenuItem value="rest_endpoint">REST API (single endpoint)</MenuItem>
                  </Select>
                </FormControl>

                {!isRestUpstream(registerForm) ? (
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="reg-transport">Transport</InputLabel>
                      <Select
                        labelId="reg-transport"
                        label="Transport"
                        value={registerForm.transport}
                        disabled={registerServerEditingName !== null}
                        onChange={(event) =>
                          updateRegisterField(
                            "transport",
                            event.target.value as RegisterServerFormState["transport"],
                          )
                        }
                      >
                        <MenuItem value="stdio">stdio</MenuItem>
                        <MenuItem value="streamable_http">streamable_http</MenuItem>
                        <MenuItem value="sse">sse</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                      <InputLabel id="reg-session">Session mode</InputLabel>
                      <Select
                        labelId="reg-session"
                        label="Session mode"
                        value={registerForm.session_mode}
                        onChange={(event) =>
                          updateRegisterField(
                            "session_mode",
                            event.target.value as RegisterServerFormState["session_mode"],
                          )
                        }
                      >
                        <MenuItem value="stateless">stateless</MenuItem>
                        <MenuItem value="stateful">stateful</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                ) : (
                  <FormHelperText>Session mode is not applicable for REST adapters.</FormHelperText>
                )}

                {registerForm.upstream_type === "mcp_protocol" && registerForm.transport === "stdio" ? (
                  <Stack spacing={2}>
                    <TextField
                      label="Command"
                      placeholder="npx"
                      fullWidth
                      size="small"
                      value={registerForm.command}
                      onChange={(event) => updateRegisterField("command", event.target.value)}
                    />
                    <TextField
                      label="Arguments"
                      placeholder="-y\n@modelcontextprotocol/server-filesystem"
                      fullWidth
                      size="small"
                      multiline
                      minRows={3}
                      value={registerForm.args_text}
                      onChange={(event) => updateRegisterField("args_text", event.target.value)}
                    />
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Environment variables
                      </Typography>
                      <Stack spacing={1}>
                        {registerForm.env_rows.map((row, index) => (
                          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} key={`env-${index}`}>
                            <TextField
                              size="small"
                              label="KEY"
                              placeholder="KEY"
                              value={row.key}
                              onChange={(event) =>
                                updateKeyValueRow("env_rows", index, "key", event.target.value)
                              }
                              sx={{ flex: 1 }}
                            />
                            <TextField
                              size="small"
                              label="value"
                              placeholder="value"
                              value={row.value}
                              onChange={(event) =>
                                updateKeyValueRow("env_rows", index, "value", event.target.value)
                              }
                              sx={{ flex: 1 }}
                            />
                            <Button
                              variant="outlined"
                              onClick={() => removeKeyValueRow("env_rows", index)}
                              sx={{ alignSelf: { sm: "center" } }}
                            >
                              Remove
                            </Button>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => addKeyValueRow("env_rows")}
                      >
                        Add env var
                      </Button>
                    </Box>
                  </Stack>
                ) : registerForm.upstream_type === "mcp_protocol" ? (
                  <Stack spacing={2}>
                    <TextField
                      label="Target URL"
                      fullWidth
                      size="small"
                      placeholder={
                        registerForm.transport === "streamable_http"
                          ? "https://mcp.context7.com/mcp"
                          : "http://127.0.0.1:8000/mcp"
                      }
                      value={registerForm.url}
                      onChange={(event) => updateRegisterField("url", event.target.value)}
                    />
                    <TextField
                      label="Bearer token"
                      fullWidth
                      size="small"
                      type="password"
                      placeholder="Optional"
                      value={registerForm.bearer_token}
                      onChange={(event) => updateRegisterField("bearer_token", event.target.value)}
                      helperText={
                        registerServerEditingName !== null
                          ? "Leave blank to keep the current bearer token."
                          : undefined
                      }
                    />
                    {registerForm.transport === "streamable_http" ? (
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Headers
                        </Typography>
                        <Stack spacing={1}>
                          {registerForm.header_rows.map((row, index) => (
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} key={`header-${index}`}>
                              <TextField
                                size="small"
                                label="Header"
                                placeholder="Header"
                                value={row.key}
                                onChange={(event) =>
                                  updateKeyValueRow("header_rows", index, "key", event.target.value)
                                }
                                sx={{ flex: 1 }}
                              />
                              <TextField
                                size="small"
                                label="Value"
                                placeholder="Value"
                                value={row.value}
                                onChange={(event) =>
                                  updateKeyValueRow("header_rows", index, "value", event.target.value)
                                }
                                sx={{ flex: 1 }}
                              />
                              <Button
                                variant="outlined"
                                onClick={() => removeKeyValueRow("header_rows", index)}
                                sx={{ alignSelf: { sm: "center" } }}
                              >
                                Remove
                              </Button>
                            </Stack>
                          ))}
                        </Stack>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => addKeyValueRow("header_rows")}
                        >
                          Add header
                        </Button>
                      </Box>
                    ) : null}
                  </Stack>
                ) : registerForm.upstream_type === "rest_openapi" ? (
                  <Stack spacing={2}>
                    <TextField
                      label="Base URL"
                      fullWidth
                      size="small"
                      placeholder="https://api.example.com"
                      value={registerForm.base_url}
                      onChange={(event) => updateRegisterField("base_url", event.target.value)}
                    />
                    <FormControl fullWidth size="small">
                      <InputLabel id="reg-spec-source">OpenAPI spec source</InputLabel>
                      <Select
                        labelId="reg-spec-source"
                        label="OpenAPI spec source"
                        value={registerForm.spec_source}
                        onChange={(event) =>
                          updateRegisterField(
                            "spec_source",
                            event.target.value as RegisterServerFormState["spec_source"],
                          )
                        }
                      >
                        <MenuItem value="url">URL</MenuItem>
                        <MenuItem value="inline">Inline YAML/JSON</MenuItem>
                      </Select>
                    </FormControl>
                    {registerForm.spec_source === "url" ? (
                      <TextField
                        label="OpenAPI spec URL"
                        fullWidth
                        size="small"
                        placeholder="https://api.example.com/openapi.json"
                        value={registerForm.openapi_spec_url}
                        onChange={(event) => updateRegisterField("openapi_spec_url", event.target.value)}
                      />
                    ) : (
                      <TextField
                        label="Inline OpenAPI spec"
                        fullWidth
                        size="small"
                        multiline
                        minRows={6}
                        placeholder="openapi: 3.0.3..."
                        value={registerForm.openapi_spec_inline}
                        onChange={(event) => updateRegisterField("openapi_spec_inline", event.target.value)}
                        helperText={
                          registerEditing && registerForm.spec_source === "inline"
                            ? "Leave blank to keep the current inline spec."
                            : undefined
                        }
                      />
                    )}
                    <TextField
                      label="Excluded operations"
                      fullWidth
                      size="small"
                      multiline
                      minRows={3}
                      placeholder="deletePet&#10;updateUser"
                      value={registerForm.excluded_operations_text}
                      onChange={(event) =>
                        updateRegisterField("excluded_operations_text", event.target.value)
                      }
                      helperText="One OpenAPI operationId per line (optional)."
                    />
                    {renderRestAuthFields()}
                  </Stack>
                ) : (
                  <Stack spacing={2}>
                    <TextField
                      label="Base URL"
                      fullWidth
                      size="small"
                      placeholder="https://api.example.com"
                      value={registerForm.base_url}
                      onChange={(event) => updateRegisterField("base_url", event.target.value)}
                    />
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="reg-rest-method">HTTP method</InputLabel>
                        <Select
                          labelId="reg-rest-method"
                          label="HTTP method"
                          value={registerForm.method}
                          onChange={(event) => updateRegisterField("method", event.target.value)}
                        >
                          <MenuItem value="GET">GET</MenuItem>
                          <MenuItem value="POST">POST</MenuItem>
                          <MenuItem value="PUT">PUT</MenuItem>
                          <MenuItem value="PATCH">PATCH</MenuItem>
                          <MenuItem value="DELETE">DELETE</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Path"
                        fullWidth
                        size="small"
                        placeholder="/v1/current"
                        value={registerForm.path}
                        onChange={(event) => updateRegisterField("path", event.target.value)}
                      />
                    </Stack>
                    <TextField
                      label="Tool name"
                      fullWidth
                      size="small"
                      placeholder="get_current"
                      value={registerForm.tool_name}
                      onChange={(event) => updateRegisterField("tool_name", event.target.value)}
                    />
                    <TextField
                      label="Tool description"
                      fullWidth
                      size="small"
                      multiline
                      minRows={2}
                      placeholder="Use when the caller needs current weather for a city"
                      value={registerForm.tool_description}
                      onChange={(event) => updateRegisterField("tool_description", event.target.value)}
                    />
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Parameters
                      </Typography>
                      <Stack spacing={1}>
                        {registerForm.parameter_rows.map((row, index) => (
                          <Paper key={`param-${index}`} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                            <Stack spacing={1}>
                              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                                <TextField
                                  size="small"
                                  label="Name"
                                  value={row.name}
                                  onChange={(event) =>
                                    updateRestParameterRow(index, "name", event.target.value)
                                  }
                                  sx={{ flex: 1 }}
                                />
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                  <InputLabel id={`param-in-${index}`}>In</InputLabel>
                                  <Select
                                    labelId={`param-in-${index}`}
                                    label="In"
                                    value={row.in}
                                    onChange={(event) =>
                                      updateRestParameterRow(
                                        index,
                                        "in",
                                        event.target.value as RestParameterRow["in"],
                                      )
                                    }
                                  >
                                    <MenuItem value="path">path</MenuItem>
                                    <MenuItem value="query">query</MenuItem>
                                    <MenuItem value="header">header</MenuItem>
                                  </Select>
                                </FormControl>
                                <TextField
                                  size="small"
                                  label="Type"
                                  value={row.type}
                                  onChange={(event) =>
                                    updateRestParameterRow(index, "type", event.target.value)
                                  }
                                  sx={{ width: 120 }}
                                />
                              </Stack>
                              <TextField
                                size="small"
                                label="Description"
                                value={row.description}
                                onChange={(event) =>
                                  updateRestParameterRow(index, "description", event.target.value)
                                }
                                fullWidth
                              />
                              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                <Checkbox
                                  checked={row.required}
                                  onChange={(event) =>
                                    updateRestParameterRow(index, "required", event.target.checked)
                                  }
                                />
                                <Typography variant="body2">Required</Typography>
                                <Box sx={{ flex: 1 }} />
                                <Button variant="outlined" onClick={() => removeRestParameterRow(index)}>
                                  Remove
                                </Button>
                              </Stack>
                            </Stack>
                          </Paper>
                        ))}
                      </Stack>
                      <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={addRestParameterRow}>
                        Add parameter
                      </Button>
                    </Box>
                    {renderRestAuthFields()}
                  </Stack>
                )}

                {registerError ? (
                  <Typography color="error" variant="body2">
                    {registerError}
                  </Typography>
                ) : null}
              </Stack>
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2, flexWrap: "wrap", gap: 1 }}>
            {registerOAuth ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => resetRegisterOAuthStep("Start registration again to retry OAuth.")}
                >
                  Start over
                </Button>
                <Button variant="contained" onClick={startRegisterOAuth}>
                  {registerOAuth.hasOpenedBrowser ? "Open OAuth again" : "Continue OAuth"}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={closeRegisterModal}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={isBusy("register-server") || registerConfigLoading}
                  onClick={() => void submitRegisterServer()}
                >
                  {isBusy("register-server")
                    ? registerServerEditingName
                      ? "Saving..."
                      : "Registering..."
                    : registerServerEditingName
                      ? "Save changes"
                      : "+ Add Server"}
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>

        <Dialog open={agentAppDialogOpen} onClose={closeAgentAppModal} maxWidth="sm" fullWidth scroll="paper">
          <DialogTitle>{agentAppEditingId !== null ? "Edit agent app" : "Create agent app"}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField
                label="Name"
                fullWidth
                required
                size="small"
                value={agentAppName}
                onChange={(e) => setAgentAppName(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                size="small"
                multiline
                minRows={2}
                value={agentAppDescription}
                onChange={(e) => setAgentAppDescription(e.target.value)}
              />
              {agentAppLegacyConfigInvalid ? (
                <Alert severity="warning">
                  This app&apos;s saved configuration is invalid (must be exactly one tool group or one prompt group).
                  Choose one valid group below and save.
                </Alert>
              ) : null}
              <FormControl
                fullWidth
                size="small"
                disabled={
                  agentAppToolGroupSelectOptions.length === 0 && agentAppToolGroup === ""
                }
              >
                <InputLabel id="agent-app-tool-groups-label">Tool group</InputLabel>
                <Select
                  labelId="agent-app-tool-groups-label"
                  id="agent-app-tool-groups"
                  value={agentAppToolGroup}
                  label="Tool group"
                  onChange={(e) => {
                    const v = e.target.value;
                    setAgentAppToolGroup(v);
                    if (v !== "") {
                      setAgentAppPromptGroup("");
                    }
                  }}
                  MenuProps={{ slotProps: { paper: { sx: { maxHeight: 360 } } } }}
                >
                  <MenuItem value="">
                    <em>— None —</em>
                  </MenuItem>
                  {agentAppToolGroupMenuNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {agentAppToolGroupSelectOptions.length === 0
                    ? "No tool groups yet. Create one in the Tool groups section."
                    : "Pick exactly one tool group or one prompt group (not both). Choosing a tool group clears the prompt group."}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                size="small"
                disabled={
                  agentAppPromptGroupSelectOptions.length === 0 && agentAppPromptGroup === ""
                }
              >
                <InputLabel id="agent-app-prompt-groups-label">Prompt group</InputLabel>
                <Select
                  labelId="agent-app-prompt-groups-label"
                  id="agent-app-prompt-groups"
                  value={agentAppPromptGroup}
                  label="Prompt group"
                  onChange={(e) => {
                    const v = e.target.value;
                    setAgentAppPromptGroup(v);
                    if (v !== "") {
                      setAgentAppToolGroup("");
                    }
                  }}
                  MenuProps={{ slotProps: { paper: { sx: { maxHeight: 360 } } } }}
                >
                  <MenuItem value="">
                    <em>— None —</em>
                  </MenuItem>
                  {agentAppPromptGroupMenuNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {agentAppPromptGroupSelectOptions.length === 0
                    ? "No prompt groups yet. Create one in the Prompt groups section."
                    : "Choosing a prompt group clears the tool group."}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                size="small"
                disabled={
                  agentAppSkillSetSelectOptions.length === 0 && agentAppSkillSets.length === 0
                }
              >
                <InputLabel id="agent-app-skill-sets-label">Skill sets</InputLabel>
                <Select
                  labelId="agent-app-skill-sets-label"
                  id="agent-app-skill-sets"
                  multiple
                  value={agentAppSkillSets}
                  label="Skill sets"
                  onChange={(e) => {
                    const v = e.target.value;
                    setAgentAppSkillSets(typeof v === "string" ? v.split(",") : v);
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((name) => (
                        <Chip key={name} label={name} size="small" />
                      ))}
                    </Box>
                  )}
                  MenuProps={{ slotProps: { paper: { sx: { maxHeight: 360 } } } }}
                >
                  {agentAppSkillSetMenuNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {agentAppSkillSetSelectOptions.length === 0
                    ? "No skill sets yet. Create one in the Skill Sets section."
                    : "Optional. Attach zero or more skill sets in addition to the tool or prompt group."}
                </FormHelperText>
              </FormControl>
              {agentAppCreateError ? (
                <Typography color="error" variant="body2">
                  {agentAppCreateError}
                </Typography>
              ) : null}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button variant="outlined" onClick={closeAgentAppModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={
                agentAppEditingId !== null
                  ? isBusy(`agent-app-edit:${agentAppEditingId}`)
                  : isBusy("agent-app-create")
              }
              onClick={() => void submitAgentAppModal()}
            >
              {agentAppEditingId !== null
                ? isBusy(`agent-app-edit:${agentAppEditingId}`)
                  ? "Saving..."
                  : "Save changes"
                : isBusy("agent-app-create")
                  ? "Creating..."
                  : "Create"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={agentAppSecretReveal !== null}
          onClose={() => setAgentAppSecretReveal(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Client secret</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <Typography variant="body2">{agentAppSecretReveal?.title}</Typography>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Typography
                    component="code"
                    sx={{ flex: 1, wordBreak: "break-all", fontFamily: monospaceFontFamily }}
                  >
                    {agentAppSecretReveal?.secret}
                  </Typography>
                  <CopyButton
                    ariaLabel="Copy client secret"
                    title="Copy client secret"
                    value={agentAppSecretReveal?.secret ?? ""}
                  />
                </Stack>
              </Paper>
              <Typography variant="caption" color="text.secondary">
                Store this secret securely. It will not be shown again after you close this dialog.
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button variant="contained" onClick={() => setAgentAppSecretReveal(null)}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
