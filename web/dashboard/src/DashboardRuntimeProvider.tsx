import { useEffect, type ReactNode } from "react";
import type { AppSection } from "@/lib/types";
import {
  setDashboardRuntimeConfig,
  type DashboardHostMode,
} from "@/lib/runtimeConfig";

function normalizeHttpPathPrefix(prefix: string): string {
  const trimmed = prefix.trim();
  if (trimmed === "") {
    return "";
  }
  return trimmed.replace(/\/$/, "");
}

export interface DashboardRuntimeProviderProps {
  children: ReactNode;
  mode: DashboardHostMode;
  token?: string;
  tenantId?: string;
  httpPathPrefix?: string;
  defaultSection?: AppSection;
}

export function DashboardRuntimeProvider({
  children,
  mode,
  token,
  tenantId,
  httpPathPrefix,
  defaultSection = "servers",
}: DashboardRuntimeProviderProps) {
  const envPrefix =
    typeof import.meta.env.VITE_HTTP_PATH_PREFIX === "string"
      ? import.meta.env.VITE_HTTP_PATH_PREFIX
      : "";

  setDashboardRuntimeConfig({
    mode,
    token: token?.trim() || undefined,
    tenantId: tenantId?.trim() || undefined,
    httpPathPrefix: normalizeHttpPathPrefix(httpPathPrefix ?? envPrefix),
    defaultSection: mode === "standalone" ? "home" : defaultSection,
  });

  useEffect(() => () => setDashboardRuntimeConfig(null), []);

  return children;
}
