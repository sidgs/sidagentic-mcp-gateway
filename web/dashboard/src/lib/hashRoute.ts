import type { AppSection } from "./types";
import { usesHashRouting } from "./runtimeConfig";

const SECTIONS = new Set<string>([
  "home",
  "servers",
  "tools",
  "tool_groups",
  "prompt_groups",
  "skills",
  "skill_sets",
  "agent_apps",
  "teams",
  "users",
  "prompts",
  "resources",
  "diagnostics",
  "observability",
  "lineage",
]);

/** Canonical hash for a dashboard section (`#/home`). */
export function appSectionToHash(section: AppSection): string {
  return `#/${section}`;
}

export type ToolGroupFormMode = "create" | "edit" | null;

export type SkillFormMode = "create" | "add-version" | "edit" | "import";

export type SkillSetFormMode = "create" | "edit" | null;

export type HashRoute = {
  section: AppSection | null;
  agentAppId: number | null;
  serverName: string | null;
  toolGroupName: string | null;
  toolGroupFormMode: ToolGroupFormMode;
  toolGroupEditName: string | null;
  promptGroupName: string | null;
  toolCanonicalName: string | null;
  promptCanonicalName: string | null;
  skillFormMode: SkillFormMode | null;
  skillName: string | null;
  skillVersion: string | null;
  skillSetName: string | null;
  skillSetFormMode: SkillSetFormMode;
};

function decodeRouteSegment(parts: string[], fromIndex: number): string | null {
  return decodeRouteSegmentRange(parts, fromIndex, parts.length);
}

function decodeRouteSegmentRange(parts: string[], fromIndex: number, toIndexExclusive: number): string | null {
  if (fromIndex >= toIndexExclusive || fromIndex >= parts.length) {
    return null;
  }
  const raw = parts.slice(fromIndex, toIndexExclusive).join("/");
  try {
    const decoded = decodeURIComponent(raw);
    return decoded.length > 0 ? decoded : null;
  } catch {
    return null;
  }
}

function parseToolGroupSubroute(parts: string[]): Pick<
  HashRoute,
  "toolGroupName" | "toolGroupFormMode" | "toolGroupEditName"
> {
  if (parts.length < 2) {
    return { toolGroupName: null, toolGroupFormMode: null, toolGroupEditName: null };
  }
  if (parts[1] === "new" && parts.length === 2) {
    return { toolGroupName: null, toolGroupFormMode: "create", toolGroupEditName: null };
  }
  if (parts.length >= 3 && parts[parts.length - 1] === "edit") {
    return {
      toolGroupName: null,
      toolGroupFormMode: "edit",
      toolGroupEditName: decodeRouteSegmentRange(parts, 1, parts.length - 1),
    };
  }
  return {
    toolGroupName: decodeRouteSegment(parts, 1),
    toolGroupFormMode: null,
    toolGroupEditName: null,
  };
}

function parseSkillSetSubroute(parts: string[]): Pick<HashRoute, "skillSetName" | "skillSetFormMode"> {
  if (parts.length < 2) {
    return { skillSetName: null, skillSetFormMode: null };
  }
  if (parts[1] === "new" && parts.length === 2) {
    return { skillSetName: null, skillSetFormMode: "create" };
  }
  if (parts.length >= 3 && parts[parts.length - 1] === "edit") {
    return {
      skillSetName: decodeRouteSegmentRange(parts, 1, parts.length - 1),
      skillSetFormMode: "edit",
    };
  }
  return {
    skillSetName: decodeRouteSegment(parts, 1),
    skillSetFormMode: null,
  };
}

function parseSkillSubroute(parts: string[]): Pick<HashRoute, "skillFormMode" | "skillName" | "skillVersion"> {
  if (parts.length < 2) {
    return { skillFormMode: null, skillName: null, skillVersion: null };
  }
  if (parts[1] === "new" && parts.length === 2) {
    return { skillFormMode: "create", skillName: null, skillVersion: null };
  }
  if (parts[1] === "import" && parts.length === 2) {
    return { skillFormMode: "import", skillName: null, skillVersion: null };
  }
  const versionsIndex = parts.indexOf("versions", 1);
  if (versionsIndex === -1 || versionsIndex === 1) {
    return { skillFormMode: null, skillName: null, skillVersion: null };
  }
  const skillName = decodeRouteSegmentRange(parts, 1, versionsIndex);
  if (versionsIndex + 1 >= parts.length) {
    return { skillFormMode: null, skillName: null, skillVersion: null };
  }
  if (parts[versionsIndex + 1] === "new" && parts.length === versionsIndex + 2) {
    return { skillFormMode: "add-version", skillName, skillVersion: null };
  }
  const skillVersion = decodeRouteSegmentRange(parts, versionsIndex + 1, versionsIndex + 2);
  if (parts.length === versionsIndex + 3 && parts[parts.length - 1] === "edit") {
    return { skillFormMode: "edit", skillName, skillVersion };
  }
  return { skillFormMode: null, skillName: null, skillVersion: null };
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
      toolGroupFormMode: null,
      toolGroupEditName: null,
      promptGroupName: null,
      toolCanonicalName: null,
      promptCanonicalName: null,
      skillFormMode: null,
      skillName: null,
      skillVersion: null,
      skillSetName: null,
      skillSetFormMode: null,
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
  const toolGroupRoute =
    section === "tool_groups"
      ? parseToolGroupSubroute(parts)
      : { toolGroupName: null, toolGroupFormMode: null, toolGroupEditName: null };
  const promptGroupName = section === "prompt_groups" ? decodeRouteSegment(parts, 1) : null;
  const toolCanonicalName = section === "tools" ? decodeRouteSegment(parts, 1) : null;
  const promptCanonicalName = section === "prompts" ? decodeRouteSegment(parts, 1) : null;
  const skillRoute =
    section === "skills"
      ? parseSkillSubroute(parts)
      : { skillFormMode: null, skillName: null, skillVersion: null };
  const skillSetRoute =
    section === "skill_sets"
      ? parseSkillSetSubroute(parts)
      : { skillSetName: null, skillSetFormMode: null };

  return {
    section,
    agentAppId: section === "agent_apps" ? agentAppId : null,
    serverName: section === "servers" ? serverName : null,
    toolGroupName: section === "tool_groups" ? toolGroupRoute.toolGroupName : null,
    toolGroupFormMode: section === "tool_groups" ? toolGroupRoute.toolGroupFormMode : null,
    toolGroupEditName: section === "tool_groups" ? toolGroupRoute.toolGroupEditName : null,
    promptGroupName: section === "prompt_groups" ? promptGroupName : null,
    toolCanonicalName: section === "tools" ? toolCanonicalName : null,
    promptCanonicalName: section === "prompts" ? promptCanonicalName : null,
    skillFormMode: section === "skills" ? skillRoute.skillFormMode : null,
    skillName: section === "skills" ? skillRoute.skillName : null,
    skillVersion: section === "skills" ? skillRoute.skillVersion : null,
    skillSetName: section === "skill_sets" ? skillSetRoute.skillSetName : null,
    skillSetFormMode: section === "skill_sets" ? skillSetRoute.skillSetFormMode : null,
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

/** Bookmarkable hash for creating a tool group. */
export function toolGroupCreateHash(): string {
  return "#/tool_groups/new";
}

/** Bookmarkable hash for editing a tool group (name is URL-encoded). */
export function toolGroupEditHash(name: string): string {
  return `#/tool_groups/${encodeURIComponent(name)}/edit`;
}

/** Bookmarkable hash with a prompt group expanded (name is URL-encoded). */
export function promptGroupDetailHash(name: string): string {
  return `#/prompt_groups/${encodeURIComponent(name)}`;
}

/** Bookmarkable hash for a single tool detail view (canonical name is URL-encoded). */
export function toolDetailHash(canonicalName: string): string {
  return `#/tools/${encodeURIComponent(canonicalName)}`;
}

/** Bookmarkable hash for the skills list. */
export function skillsListHash(): string {
  return "#/skills";
}

/** Bookmarkable hash for importing a skill from JSON or YAML. */
export function skillImportHash(): string {
  return "#/skills/import";
}

/** Bookmarkable hash for registering a new skill. */
export function skillCreateHash(): string {
  return "#/skills/new";
}

/** Bookmarkable hash for adding a version to an existing skill. */
export function skillAddVersionHash(name: string): string {
  return `#/skills/${encodeURIComponent(name)}/versions/new`;
}

/** Bookmarkable hash for editing a skill version. */
export function skillEditHash(name: string, version: string): string {
  return `#/skills/${encodeURIComponent(name)}/versions/${encodeURIComponent(version)}/edit`;
}

/** Bookmarkable hash for the skill sets list. */
export function skillSetsListHash(): string {
  return "#/skill_sets";
}

/** Bookmarkable hash for creating a skill set. */
export function skillSetCreateHash(): string {
  return "#/skill_sets/new";
}

/** Bookmarkable hash for a skill set detail view (name is URL-encoded). */
export function skillSetDetailHash(name: string): string {
  return `#/skill_sets/${encodeURIComponent(name)}`;
}

/** Bookmarkable hash for editing a skill set (name is URL-encoded). */
export function skillSetEditHash(name: string): string {
  return `#/skill_sets/${encodeURIComponent(name)}/edit`;
}

/** Bookmarkable hash for a single prompt detail view (canonical name is URL-encoded). */
export function promptDetailHash(canonicalName: string): string {
  return `#/prompts/${encodeURIComponent(canonicalName)}`;
}

export function getSectionFromHashOrDefault(fallback: AppSection): AppSection {
  return parseAppSectionFromHash() ?? fallback;
}

/** Updates the URL hash when hash routing is enabled (skipped in React component mode). */
export function setDashboardLocationHash(hash: string): void {
  if (!usesHashRouting()) {
    return;
  }
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  }
}

/** Replaces the URL when hash routing is enabled (skipped in React component mode). */
export function replaceDashboardLocation(pathname: string, search: string, hash: string): void {
  if (!usesHashRouting()) {
    return;
  }
  window.history.replaceState(null, "", `${pathname}${search}${hash}`);
}
