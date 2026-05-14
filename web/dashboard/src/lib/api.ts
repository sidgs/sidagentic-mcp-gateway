import type {
  DashboardCreateToolGroupInput,
  DashboardDiagnosticsResponse,
  DashboardOAuthSessionResponse,
  DashboardOverviewResponse,
  DashboardPromptsResponse,
  DashboardRegisterServerInput,
  DashboardRegisterServerResponse,
  DashboardResourcesResponse,
  DashboardServersResponse,
  DashboardToolGroupsResponse,
  DashboardToolsResponse,
} from "./types";

function normalizeHttpPathPrefix(prefix: string): string {
  const trimmed = prefix.trim();
  if (trimmed === "") return "";
  return trimmed.replace(/\/$/, "");
}

// When the UI is hosted at "/" (vite dev), this must mirror the API's HTTP_PATH_PREFIX so
// requests hit /api/v1/... instead of /. When the bundle is hosted under HTTP_PATH_PREFIX
// via VITE_DASHBOARD_BASE, leave unset so paths are /<prefix-relative>/dashboard/... only.
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
  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) {
        message = payload.error;
      }
    } catch {
      // keep the fallback message
    }
    throw new Error(message);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export const api = {
  overview: () => requestJSON<DashboardOverviewResponse>("/dashboard/overview"),
  servers: () => requestJSON<DashboardServersResponse>("/dashboard/servers"),
  tools: () => requestJSON<DashboardToolsResponse>("/dashboard/tools"),
  toolGroups: () => requestJSON<DashboardToolGroupsResponse>("/dashboard/tool-groups"),
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
