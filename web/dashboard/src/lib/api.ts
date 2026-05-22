import type {
  DashboardAgentApp,
  DashboardAgentAppsResponse,
  DashboardAuthStatusResponse,
  DashboardCreateAgentAppInput,
  DashboardCreateAgentAppResponse,
  DashboardPatchAgentAppInput,
  DashboardCreatePromptGroupInput,
  DashboardCreateToolGroupInput,
  DashboardDiagnosticsResponse,
  DashboardToolGroup,
  DashboardPromptGroup,
  DashboardUpdateToolGroupInput,
  DashboardUpdatePromptGroupInput,
  DashboardOAuthSessionResponse,
  DashboardOverviewResponse,
  DashboardPromptsResponse,
  DashboardRegisterServerInput,
  DashboardRegisterServerResponse,
  DashboardResourcesResponse,
  DashboardPromptGroupsResponse,
  DashboardServersResponse,
  DashboardToolGroupsResponse,
  DashboardToolsResponse,
} from "./types";
import { DashboardAuthRequiredError } from "./auth";
import { getExternalAuthHeaders } from "./embedAuth";
import { isExternalAuthMode, resolveHttpPathPrefix } from "./runtimeConfig";

function normalizeHttpPathPrefix(prefix: string): string {
  const trimmed = prefix.trim();
  if (trimmed === "") return "";
  return trimmed.replace(/\/$/, "");
}

// When set, JSON API URLs are root-relative: /<httpPathPrefix>/dashboard/... (not under
// Vite BASE_URL). When unset, URLs are relative to BASE_URL so a dashboard mounted only under
// VITE_DASHBOARD_BASE still reaches /<base>/dashboard/... on the same host.
function gatewayHttpPrefix(): string {
  return normalizeHttpPathPrefix(resolveHttpPathPrefix());
}

/** Absolute path from the origin (includes HTTP path prefix when set). */
function gatewayOriginPath(absPathUnderGatewayMount: string): string {
  const path = absPathUnderGatewayMount.startsWith("/")
    ? absPathUnderGatewayMount
    : `/${absPathUnderGatewayMount}`;
  const prefix = gatewayHttpPrefix();
  if (prefix !== "") return `${prefix}${path}`;
  return path;
}

function dashboardFetchURL(absPathUnderGatewayMount: string): string {
  const originPath = gatewayOriginPath(absPathUnderGatewayMount);
  const prefix = gatewayHttpPrefix();
  if (prefix !== "") {
    return originPath;
  }
  const base = import.meta.env.BASE_URL;
  const normalized = originPath.startsWith("/") ? originPath.slice(1) : originPath;
  return base + normalized;
}

async function requestJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const embedHeaders = isExternalAuthMode() ? getExternalAuthHeaders() : {};
  const response = await fetch(dashboardFetchURL(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...embedHeaders,
      ...(init?.headers ?? {}),
    },
  });

  const raw = await response.text();
  const ct = response.headers.get("content-type") ?? "";
  let parsed: unknown;
  if (raw.length > 0 && ct.includes("application/json")) {
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch {
      parsed = undefined;
    }
  }

  const payload = (parsed !== undefined && typeof parsed === "object" && parsed !== null
    ? parsed
    : {}) as { error?: string; login_path?: string };

  if (response.status === 401 && typeof payload.login_path === "string" && !isExternalAuthMode()) {
    const lp = payload.login_path.trim();
    if (lp.length > 0) {
      throw new DashboardAuthRequiredError(lp);
    }
  }

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    if (typeof payload.error === "string" && payload.error.trim() !== "") {
      message = payload.error.trim();
    }
    throw new Error(message);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return parsed as T;
}

export const api = {
  authStatus: () => requestJSON<DashboardAuthStatusResponse>("/dashboard/auth-status"),
  overview: () => requestJSON<DashboardOverviewResponse>("/dashboard/overview"),
  servers: () => requestJSON<DashboardServersResponse>("/dashboard/servers"),
  tools: () => requestJSON<DashboardToolsResponse>("/dashboard/tools"),
  toolGroups: () => requestJSON<DashboardToolGroupsResponse>("/dashboard/tool-groups"),
  promptGroups: () => requestJSON<DashboardPromptGroupsResponse>("/dashboard/prompt-groups"),
  prompts: () => requestJSON<DashboardPromptsResponse>("/dashboard/prompts"),
  resources: () => requestJSON<DashboardResourcesResponse>("/dashboard/resources"),
  diagnostics: () => requestJSON<DashboardDiagnosticsResponse>("/dashboard/diagnostics"),
  registerServer: (body: DashboardRegisterServerInput) =>
    requestJSON<DashboardRegisterServerResponse>("/dashboard/servers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  getServerConfig: (name: string) =>
    requestJSON<DashboardRegisterServerInput>(`/dashboard/servers/${encodeURIComponent(name)}/config`),
  updateServer: (name: string, body: DashboardRegisterServerInput) =>
    requestJSON<DashboardRegisterServerResponse>(`/dashboard/servers/${encodeURIComponent(name)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  getOAuthSession: (sessionID: string) =>
    requestJSON<DashboardOAuthSessionResponse>(
      `/dashboard/oauth/session/${encodeURIComponent(sessionID)}`
    ),
  createToolGroup: (body: DashboardCreateToolGroupInput) =>
    requestJSON("/dashboard/tool-groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  updateToolGroup: (name: string, body: DashboardUpdateToolGroupInput) =>
    requestJSON<DashboardToolGroup>(`/dashboard/tool-groups/${encodeURIComponent(name)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  deleteToolGroup: (name: string) =>
    requestJSON(`/dashboard/tool-groups/${encodeURIComponent(name)}`, {
      method: "DELETE",
    }),
  createPromptGroup: (body: DashboardCreatePromptGroupInput) =>
    requestJSON("/dashboard/prompt-groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  updatePromptGroup: (name: string, body: DashboardUpdatePromptGroupInput) =>
    requestJSON<DashboardPromptGroup>(`/dashboard/prompt-groups/${encodeURIComponent(name)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  deletePromptGroup: (name: string) =>
    requestJSON(`/dashboard/prompt-groups/${encodeURIComponent(name)}`, {
      method: "DELETE",
    }),
  deleteServer: (name: string) =>
    requestJSON(`/dashboard/servers/${encodeURIComponent(name)}`, {
      method: "DELETE",
    }),
  setServerEnabled: (name: string, enabled: boolean) =>
    requestJSON(`/dashboard/servers/${encodeURIComponent(name)}/enabled`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    }),
  setToolEnabled: (name: string, enabled: boolean) =>
    requestJSON(`/dashboard/tools/${encodeURIComponent(name)}/enabled`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    }),
  setPromptEnabled: (name: string, enabled: boolean) =>
    requestJSON(`/dashboard/prompts/${encodeURIComponent(name)}/enabled`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    }),

  agentApps: () => requestJSON<DashboardAgentAppsResponse>("/dashboard/agent-apps"),
  createAgentApp: (body: DashboardCreateAgentAppInput) =>
    requestJSON<DashboardCreateAgentAppResponse>("/dashboard/agent-apps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  patchAgentApp: (id: number, body: DashboardPatchAgentAppInput) =>
    requestJSON<DashboardAgentApp>(`/dashboard/agent-apps/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  deleteAgentApp: (id: number) =>
    requestJSON(`/dashboard/agent-apps/${id}`, {
      method: "DELETE",
    }),
  rotateAgentAppSecret: (id: number) =>
    requestJSON<{ client_secret: string }>(`/dashboard/agent-apps/${id}/rotate-secret`, {
      method: "POST",
    }),
};
