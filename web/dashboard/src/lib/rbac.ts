export type UserRole = "user" | "provider" | "administrator" | "auditor";

const ROLE_RANK: Record<UserRole, number> = {
  user: 1,
  provider: 2,
  administrator: 3,
  auditor: -1,
};

export function normalizeRole(role?: string | null): UserRole {
  switch (role) {
    case "administrator":
    case "admin":
      return "administrator";
    case "provider":
      return "provider";
    case "auditor":
      return "auditor";
    default:
      return "user";
  }
}

export function hasAtLeastRole(role: UserRole | undefined, min: UserRole): boolean {
  const r = role ?? "user";
  if (r === "auditor") {
    return false;
  }
  return (ROLE_RANK[r] ?? 1) >= (ROLE_RANK[min] ?? 1);
}

export function canAccessSystemSection(role?: UserRole): boolean {
  const r = role ?? "user";
  return r === "administrator" || r === "auditor";
}

export function canManageUsers(role?: UserRole): boolean {
  return role === "administrator";
}

export function canWriteDashboard(role?: UserRole): boolean {
  return role !== "auditor";
}

export function canSeeNavSection(section: string, role?: UserRole): boolean {
  const r = role ?? "user";
  switch (section) {
    case "home":
    case "tool_groups":
    case "prompt_groups":
    case "skill_sets":
    case "agent_apps":
    case "teams":
      return true;
    case "servers":
    case "tools":
    case "prompts":
    case "resources":
    case "skills":
      return hasAtLeastRole(r, "provider") || r === "auditor";
    case "observability":
    case "lineage":
    case "diagnostics":
      return canAccessSystemSection(r);
    case "users":
      return canManageUsers(r) || r === "auditor";
    default:
      return true;
  }
}

export function canCreateTeamType(type: "provider" | "user" | "agent", role?: UserRole): boolean {
  const r = role ?? "user";
  if (!canWriteDashboard(r)) {
    return false;
  }
  switch (type) {
    case "provider":
      return hasAtLeastRole(r, "provider");
    case "user":
      return r === "administrator";
    case "agent":
      return hasAtLeastRole(r, "user");
    default:
      return false;
  }
}
