import type { AppSection } from "./types";

const SECTIONS = new Set<string>([
  "home",
  "servers",
  "tools",
  "tool_groups",
  "prompt_groups",
  "prompts",
  "resources",
  "diagnostics",
]);

/** Canonical hash for a dashboard section (`#/home`). */
export function appSectionToHash(section: AppSection): string {
  return `#/${section}`;
}

/** Parse `#`, `#/servers`, `#servers`, or `#/servers/extra` → section or null if unknown/empty. */
export function parseAppSectionFromHash(): AppSection | null {
  let h = window.location.hash.replace(/^#/, "");
  if (h.startsWith("/")) {
    h = h.slice(1);
  }
  const segment = h.split("/")[0]?.trim();
  if (!segment || !SECTIONS.has(segment)) {
    return null;
  }
  return segment as AppSection;
}

export function getSectionFromHashOrDefault(fallback: AppSection): AppSection {
  return parseAppSectionFromHash() ?? fallback;
}
