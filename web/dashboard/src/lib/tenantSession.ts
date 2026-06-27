const TENANT_JWT_KEY = "dashboard_tenant_jwt";
const TENANT_ID_KEY = "dashboard_active_tenant_id";

function storage(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function getTenantJWT(): string | null {
  const store = storage();
  if (!store) {
    return null;
  }
  const value = store.getItem(TENANT_JWT_KEY)?.trim();
  return value ? value : null;
}

export function getActiveTenantId(): string | null {
  const store = storage();
  if (!store) {
    return null;
  }
  const value = store.getItem(TENANT_ID_KEY)?.trim();
  return value ? value : null;
}

export function setTenantSession(tenantId: string, accessToken: string): void {
  const store = storage();
  if (!store) {
    return;
  }
  store.setItem(TENANT_ID_KEY, tenantId.trim());
  store.setItem(TENANT_JWT_KEY, accessToken.trim());
}

export function clearTenantSession(): void {
  const store = storage();
  if (!store) {
    return;
  }
  store.removeItem(TENANT_ID_KEY);
  store.removeItem(TENANT_JWT_KEY);
}

export function hasTenantSession(): boolean {
  return Boolean(getTenantJWT() && getActiveTenantId());
}

export interface TenantJWTClaims {
  sub?: string;
  email?: string;
  tenantId?: string;
  role?: string;
  platformAdmin?: boolean;
  expiresAt?: number;
}

function claimString(claims: Record<string, unknown>, key: string): string | undefined {
  const value = claims[key];
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function claimBool(claims: Record<string, unknown>, key: string): boolean | undefined {
  const value = claims[key];
  return typeof value === "boolean" ? value : undefined;
}

/** Decode tenant-scoped dashboard JWT minted by select-tenant (signature verified server-side). */
export function parseTenantJWTClaims(token: string): TenantJWTClaims {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("tenant JWT is not valid");
  }
  let payloadRaw: string;
  try {
    payloadRaw = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    throw new Error("tenant JWT payload could not be decoded");
  }
  let claims: Record<string, unknown>;
  try {
    claims = JSON.parse(payloadRaw) as Record<string, unknown>;
  } catch {
    throw new Error("tenant JWT payload is not valid JSON");
  }

  const tenantId =
    claimString(claims, "tenant_id") ??
    claimString(claims, "custom:tenant_id") ??
    claimString(claims, "tenantId");

  let expiresAt: number | undefined;
  const exp = claims.exp;
  if (typeof exp === "number" && Number.isFinite(exp)) {
    expiresAt = exp;
  }

  return {
    sub: claimString(claims, "sub"),
    email: claimString(claims, "email"),
    tenantId,
    role: claimString(claims, "role"),
    platformAdmin: claimBool(claims, "platform_admin"),
    expiresAt,
  };
}

export function readTenantSessionClaims(): TenantJWTClaims | null {
  const token = getTenantJWT();
  if (!token) {
    return null;
  }
  try {
    return parseTenantJWTClaims(token);
  } catch {
    return null;
  }
}

export function getTenantAuthHeaders(): Record<string, string> {
  const jwt = getTenantJWT();
  const tenantId = getActiveTenantId();
  if (!jwt || !tenantId) {
    return {};
  }
  return {
    Authorization: `Bearer ${jwt}`,
    "X-Tenant-ID": tenantId,
  };
}
