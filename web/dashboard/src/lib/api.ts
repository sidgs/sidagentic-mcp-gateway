import type {
  DashboardAuthStatusResponse,
  DashboardCreatePromptGroupInput,
  DashboardCreateToolGroupInput,
  DashboardDiagnosticsResponse,
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

function normalizeHttpPathPrefix(prefix: string): string {
  const trimmed = prefix.trim();
  if (trimmed === "") return "";
  return trimmed.replace(/\/$/, "");
}

// When set, JSON API URLs are root-relative: /<VITE_HTTP_PATH_PREFIX>/dashboard/... (not under
// Vite BASE_URL). When unset, URLs are relative to BASE_URL so a dashboard mounted only under
// VITE_DASHBOARD_BASE still reaches /<base>/dashboard/... on the same host.
const gatewayHttpPrefix = normalizeHttpPathPrefix(
  typeof import.meta.env.VITE_HTTP_PATH_PREFIX === "string" ? import.meta.env.VITE_HTTP_PATH_PREFIX : ""
);

/** Absolute path from the origin (includes HTTP path prefix when set). */
function gatewayOriginPath(absPathUnderGatewayMount: string): string {
  const path = absPathUnderGatewayMount.startsWith("/")
    ? absPathUnderGatewayMount
    : `/${absPathUnderGatewayMount}`;
  if (gatewayHttpPrefix !== "") return `${gatewayHttpPrefix}${path}`;
  return path;
}

function dashboardFetchURL(absPathUnderGatewayMount: string): string {
  const originPath = gatewayOriginPath(absPathUnderGatewayMount);
  if (gatewayHttpPrefix !== "") {
    return originPath;
  }
  const base = import.meta.env.BASE_URL;
  const normalized = originPath.startsWith("/") ? originPath.slice(1) : originPath;
  return base + normalized;
}

async function requestJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(dashboardFetchURL(path), {
    ...init,
    headers: {
      Accept: "application/json",
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

  if (response.status === 401 && typeof payload.login_path === "string") {
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
};
