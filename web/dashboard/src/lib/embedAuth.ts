import { EmbedAuthMissingError } from "./auth";
import { getDashboardRuntimeConfig, isExternalAuthMode } from "./runtimeConfig";

export const EMBED_TOKEN_STORAGE_KEY = "tenant_id_token";

export interface EmbedClaims {
  email?: string;
  sub?: string;
  tenantId?: string;
}

/** @deprecated Use isExternalAuthMode() — kept for embed SPA build compatibility. */
export function isEmbedMode(): boolean {
  return isExternalAuthMode();
}

export function readEmbedToken(): string | null {
  try {
    const token = window.localStorage.getItem(EMBED_TOKEN_STORAGE_KEY);
    if (token === null) {
      return null;
    }
    const trimmed = token.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

/** Token from component props or localStorage (embed iframe). */
export function resolveExternalAuthToken(): string | null {
  const fromProps = getDashboardRuntimeConfig()?.token?.trim();
  if (fromProps) {
    return fromProps;
  }
  return readEmbedToken();
}

function claimString(claims: Record<string, unknown>, key: string): string | undefined {
  const value = claims[key];
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Decode JWT payload for display and request headers (signature verified server-side). */
export function parseEmbedClaims(token: string): EmbedClaims {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new EmbedAuthMissingError("tenant_id_token is not a valid JWT");
  }
  let payloadRaw: string;
  try {
    payloadRaw = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    throw new EmbedAuthMissingError("tenant_id_token JWT payload could not be decoded");
  }
  let claims: Record<string, unknown>;
  try {
    claims = JSON.parse(payloadRaw) as Record<string, unknown>;
  } catch {
    throw new EmbedAuthMissingError("tenant_id_token JWT payload is not valid JSON");
  }

  const tenantId =
    claimString(claims, "tenant_id") ??
    claimString(claims, "custom:tenant_id") ??
    claimString(claims, "tenantId");

  return {
    email: claimString(claims, "email"),
    sub: claimString(claims, "sub"),
    tenantId,
  };
}

export function getExternalAuthHeaders(): Record<string, string> {
  if (!isExternalAuthMode()) {
    return {};
  }

  const token = resolveExternalAuthToken();
  if (token === null) {
    const cfg = getDashboardRuntimeConfig();
    if (cfg?.mode === "component") {
      throw new EmbedAuthMissingError(
        "Missing token prop — pass token to <MCPGatewayDashboard /> or set localStorage tenant_id_token",
      );
    }
    throw new EmbedAuthMissingError(
      `Missing ${EMBED_TOKEN_STORAGE_KEY} in localStorage — parent app must set it before loading the embed`,
    );
  }

  const claims = parseEmbedClaims(token);
  const tenantOverride = getDashboardRuntimeConfig()?.tenantId?.trim();
  const tenantId = tenantOverride || claims.tenantId;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (tenantId) {
    headers["X-Tenant-ID"] = tenantId;
  }
  return headers;
}

/** @deprecated Use getExternalAuthHeaders(). */
export function getEmbedAuthHeaders(): Record<string, string> {
  return getExternalAuthHeaders();
}
