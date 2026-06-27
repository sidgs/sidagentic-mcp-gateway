import type { AppSection } from "./types";
import { canSeeNavSection, normalizeRole, type UserRole } from "./rbac";

export interface NavSectionItem {
  key: AppSection;
  label: string;
}

export type NavGroupId = "providers" | "products" | "system";

export type NavMenuEntry =
  | { kind: "item"; key: AppSection; label: string }
  | { kind: "group"; id: NavGroupId; label: string; items: NavSectionItem[] };

export const NAV_GROUPS: NavGroupId[] = ["providers", "products", "system"];

export const NAV_MENU: NavMenuEntry[] = [
  { kind: "item", key: "home", label: "Home" },
  {
    kind: "group",
    id: "providers",
    label: "Providers",
    items: [
      { key: "servers", label: "Servers" },
      { key: "tools", label: "Tools" },
      { key: "prompts", label: "Prompts" },
      { key: "resources", label: "Resources" },
      { key: "skills", label: "Skills" },
    ],
  },
  {
    kind: "group",
    id: "products",
    label: "Products",
    items: [
      { key: "tool_groups", label: "Tool Groups" },
      { key: "prompt_groups", label: "Prompt Groups" },
      { key: "skill_sets", label: "Skill Sets" },
    ],
  },
  { kind: "item", key: "agent_apps", label: "Agent Apps" },
  { kind: "item", key: "teams", label: "Teams" },
  {
    kind: "group",
    id: "system",
    label: "System",
    items: [
      { key: "users", label: "Users" },
      { key: "tenant_admin", label: "Tenant Admin" },
      { key: "observability", label: "Observability" },
      { key: "lineage", label: "Lineage" },
      { key: "diagnostics", label: "System Info" },
    ],
  },
];

export const NAV_GROUPS_STORAGE_KEY = "dashboard-nav-groups";

export type NavGroupExpandedState = Record<NavGroupId, boolean>;

export const DEFAULT_NAV_GROUP_STATE: NavGroupExpandedState = {
  providers: true,
  products: true,
  system: true,
};

function flattenNavMenu(menu: NavMenuEntry[]): NavSectionItem[] {
  const items: NavSectionItem[] = [];
  for (const entry of menu) {
    if (entry.kind === "item") {
      items.push({ key: entry.key, label: entry.label });
    } else {
      items.push(...entry.items);
    }
  }
  return items;
}

export const ALL_NAV_SECTIONS: NavSectionItem[] = flattenNavMenu(NAV_MENU);

export const COMPONENT_NAV_SECTIONS: NavSectionItem[] = ALL_NAV_SECTIONS.filter(
  (item) => item.key !== "home",
);

export function findNavGroupForSection(section: AppSection): NavGroupId | null {
  for (const entry of NAV_MENU) {
    if (entry.kind === "group" && entry.items.some((item) => item.key === section)) {
      return entry.id;
    }
  }
  return null;
}

export function readNavGroupState(): NavGroupExpandedState {
  try {
    const saved = window.localStorage.getItem(NAV_GROUPS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<NavGroupExpandedState>;
      return {
        providers: parsed.providers ?? DEFAULT_NAV_GROUP_STATE.providers,
        products: parsed.products ?? DEFAULT_NAV_GROUP_STATE.products,
        system: parsed.system ?? DEFAULT_NAV_GROUP_STATE.system,
      };
    }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_NAV_GROUP_STATE };
}

export function writeNavGroupState(state: NavGroupExpandedState): void {
  try {
    window.localStorage.setItem(NAV_GROUPS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function filterNavMenu(menu: NavMenuEntry[], excludeHome: boolean): NavMenuEntry[] {
  if (!excludeHome) {
    return menu;
  }
  return menu.filter((entry) => entry.kind !== "item" || entry.key !== "home");
}

export function filterNavMenuByRole(menu: NavMenuEntry[], role?: UserRole, platformAdmin?: boolean): NavMenuEntry[] {
  const effectiveRole = normalizeRole(role);
  const filtered: NavMenuEntry[] = [];
  for (const entry of menu) {
    if (entry.kind === "item") {
      if (canSeeNavSection(entry.key, effectiveRole, platformAdmin)) {
        filtered.push(entry);
      }
      continue;
    }
    const items = entry.items.filter((item) => canSeeNavSection(item.key, effectiveRole, platformAdmin));
    if (items.length > 0) {
      filtered.push({ ...entry, items });
    }
  }
  return filtered;
}
