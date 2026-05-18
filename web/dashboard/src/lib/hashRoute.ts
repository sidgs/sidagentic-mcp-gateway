import type { AppSection } from "./types";

const SECTIONS = new Set<string>([
  "home",
  "servers",
  "tools",
  "tool_groups",
  "prompt_groups",
  "agent_apps",
  "prompts",
  "resources",
  "diagnostics",
]);

/** Canonical hash for a dashboard section (`#/home`). */
export function appSectionToHash(section: AppSection): string {
  return `#/${section}`;
}

export type HashRoute = {
  section: AppSection | null;
  agentAppId: number | null;
  serverName: string | null;
  toolGroupName: string | null;
  promptGroupName: string | null;
  toolCanonicalName: string | null;
  promptCanonicalName: string | null;
};

function decodeRouteSegment(parts: string[], fromIndex: number): string | null {
  if (fromIndex >= parts.length) {
    return null;
  }
  const raw = parts.slice(fromIndex).join("/");
  try {
    const decoded = decodeURIComponent(raw);
    return decoded.length > 0 ? decoded : null;
  } catch {
    return null;
  }
}

/**
 * Parse hash into dashboard section and optional detail segments.
 * Examples: `#/agent_apps/42`, `#/servers/my-server`, `#/tools/canonical.name`, `#/prompts/my.prompt`,
 * `#/tool_groups/...`.
 */
export function parseHashRoute(): HashRoute {
  let h = window.location.hash.replace(/^#/, "");
  if (h.startsWith("/")) {
    h = h.slice(1);
  }
  const parts = h.split("/").map((p) => p.trim()).filter((p) => p.length > 0);
  if (parts.length === 0 || !SECTIONS.has(parts[0])) {
    return {
      section: null,
      agentAppId: null,
      serverName: null,
      toolGroupName: null,
      promptGroupName: null,
      toolCanonicalName: null,
      promptCanonicalName: null,
    };
  }
  const section = parts[0] as AppSection;

  let agentAppId: number | null = null;
  if (section === "agent_apps" && parts.length >= 2) {
    const id = Number.parseInt(parts[1], 10);
    if (Number.isFinite(id) && id > 0) {
      agentAppId = id;
    }
  }

  const serverName = section === "servers" ? decodeRouteSegment(parts, 1) : null;
  const toolGroupName = section === "tool_groups" ? decodeRouteSegment(parts, 1) : null;
  const promptGroupName = section === "prompt_groups" ? decodeRouteSegment(parts, 1) : null;
  const toolCanonicalName = section === "tools" ? decodeRouteSegment(parts, 1) : null;
  const promptCanonicalName = section === "prompts" ? decodeRouteSegment(parts, 1) : null;

  return {
    section,
    agentAppId: section === "agent_apps" ? agentAppId : null,
    serverName: section === "servers" ? serverName : null,
    toolGroupName: section === "tool_groups" ? toolGroupName : null,
    promptGroupName: section === "prompt_groups" ? promptGroupName : null,
    toolCanonicalName: section === "tools" ? toolCanonicalName : null,
    promptCanonicalName: section === "prompts" ? promptCanonicalName : null,
  };
}

/** Parse `#`, `#/servers`, `#servers`, or `#/servers/extra` → section or null if unknown/empty. */
export function parseAppSectionFromHash(): AppSection | null {
  return parseHashRoute().section;
}

/** Bookmarkable hash for a single agent app detail view. */
export function appAgentAppDetailHash(id: number): string {
  return `#/agent_apps/${id}`;
}

/** Bookmarkable hash for a single server detail view (name is URL-encoded). */
export function serverDetailHash(name: string): string {
  return `#/servers/${encodeURIComponent(name)}`;
}

/** Bookmarkable hash with a tool group expanded (name is URL-encoded). */
export function toolGroupDetailHash(name: string): string {
  return `#/tool_groups/${encodeURIComponent(name)}`;
}

/** Bookmarkable hash with a prompt group expanded (name is URL-encoded). */
export function promptGroupDetailHash(name: string): string {
  return `#/prompt_groups/${encodeURIComponent(name)}`;
}

/** Bookmarkable hash for a single tool detail view (canonical name is URL-encoded). */
export function toolDetailHash(canonicalName: string): string {
  return `#/tools/${encodeURIComponent(canonicalName)}`;
}

/** Bookmarkable hash for a single prompt detail view (canonical name is URL-encoded). */
export function promptDetailHash(canonicalName: string): string {
  return `#/prompts/${encodeURIComponent(canonicalName)}`;
}

export function getSectionFromHashOrDefault(fallback: AppSection): AppSection {
  return parseAppSectionFromHash() ?? fallback;
}
