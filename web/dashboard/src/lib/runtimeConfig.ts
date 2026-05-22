import type { AppSection } from "./types";

export type DashboardHostMode = "standalone" | "embed" | "component";

export interface DashboardRuntimeConfig {
  mode: DashboardHostMode;
  token?: string;
  tenantId?: string;
  httpPathPrefix: string;
  defaultSection: AppSection;
}

let activeConfig: DashboardRuntimeConfig | null = null;

export function setDashboardRuntimeConfig(config: DashboardRuntimeConfig | null): void {
  activeConfig = config;
}

export function getDashboardRuntimeConfig(): DashboardRuntimeConfig | null {
  return activeConfig;
}

/** Hosted embed SPA or React component — uses Bearer token auth instead of OIDC cookies. */
export function isExternalAuthMode(): boolean {
  const cfg = activeConfig;
  if (cfg?.mode === "embed" || cfg?.mode === "component") {
    return true;
  }
  return import.meta.env.VITE_EMBED_MODE === "true";
}

function normalizeHttpPathPrefix(prefix: string): string {
  const trimmed = prefix.trim();
  if (trimmed === "") {
    return "";
  }
  return trimmed.replace(/\/$/, "");
}

export function resolveHttpPathPrefix(): string {
  if (activeConfig !== null) {
    return activeConfig.httpPathPrefix;
  }
  const env =
    typeof import.meta.env.VITE_HTTP_PATH_PREFIX === "string" ? import.meta.env.VITE_HTTP_PATH_PREFIX : "";
  return normalizeHttpPathPrefix(env);
}

export function resolveDefaultAppSection(): AppSection {
  if (isExternalAuthMode()) {
    return activeConfig?.defaultSection ?? "servers";
  }
  return "home";
}

/** Component mode keeps section state in React only (no `window.location.hash` updates). */
export function usesHashRouting(): boolean {
  return activeConfig?.mode !== "component";
}
