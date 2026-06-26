import YAML from "yaml";
import type { DashboardCreateSkillInput } from "./types";

export type SkillImportFormat = "json" | "yaml" | "auto";

const SKILL_NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SKILL_VERSION_RE = /^[0-9]+(\.[0-9]+)*(-[a-z0-9]+)?$/;

function asRecord(value: unknown, label: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function readString(obj: Record<string, unknown>, key: string, required = false): string {
  const raw = obj[key];
  if (raw === undefined || raw === null) {
    if (required) {
      throw new Error(`Missing required field "${key}".`);
    }
    return "";
  }
  if (typeof raw !== "string") {
    throw new Error(`Field "${key}" must be a string.`);
  }
  return raw.trim();
}

function readStringArray(obj: Record<string, unknown>, key: string): string[] {
  const raw = obj[key];
  if (raw === undefined || raw === null) {
    return [];
  }
  if (!Array.isArray(raw)) {
    throw new Error(`Field "${key}" must be an array of strings.`);
  }
  return raw
    .map((item, index) => {
      if (typeof item !== "string") {
        throw new Error(`Field "${key}[${index}]" must be a string.`);
      }
      return item.trim();
    })
    .filter(Boolean);
}

function readScriptFiles(raw: unknown): DashboardCreateSkillInput["scripts"] {
  if (raw === undefined || raw === null) {
    return [];
  }
  if (!Array.isArray(raw)) {
    throw new Error('Field "scripts" must be an array of { filename, code_content } objects.');
  }
  return raw.map((item, index) => {
    const obj = asRecord(item, `scripts[${index}]`);
    const filename = readString(obj, "filename", true);
    const code_content = readString(obj, "code_content", true);
    if (filename.includes("/") || filename.includes("\\")) {
      throw new Error(`scripts[${index}].filename must not contain path separators.`);
    }
    return { filename, code_content };
  });
}

function readReferenceFiles(raw: unknown): DashboardCreateSkillInput["references"] {
  if (raw === undefined || raw === null) {
    return [];
  }
  if (!Array.isArray(raw)) {
    throw new Error('Field "references" must be an array of { filename, markdown_content } objects.');
  }
  return raw.map((item, index) => {
    const obj = asRecord(item, `references[${index}]`);
    const filename = readString(obj, "filename", true);
    const markdown_content = readString(obj, "markdown_content", true);
    if (filename.includes("/") || filename.includes("\\")) {
      throw new Error(`references[${index}].filename must not contain path separators.`);
    }
    return { filename, markdown_content };
  });
}

function validateImportPayload(payload: DashboardCreateSkillInput): DashboardCreateSkillInput {
  if (!payload.name) {
    throw new Error('Field "name" is required.');
  }
  if (payload.name.length > 64 || !SKILL_NAME_RE.test(payload.name)) {
    throw new Error(
      'Field "name" must be 1-64 characters, lowercase alphanumeric with single hyphens (e.g. agent-conversation).',
    );
  }
  if (!payload.version) {
    throw new Error('Field "version" is required.');
  }
  if (payload.version.length > 32 || !SKILL_VERSION_RE.test(payload.version)) {
    throw new Error('Field "version" must be a semver-like value (e.g. 1.0.0).');
  }
  if (!payload.description) {
    throw new Error('Field "description" is required.');
  }
  if (payload.description.length > 1024) {
    throw new Error('Field "description" must be at most 1024 characters.');
  }
  if (payload.compatibility && payload.compatibility.length > 500) {
    throw new Error('Field "compatibility" must be at most 500 characters.');
  }
  if (!payload.body_content.trim()) {
    throw new Error('Field "body_content" is required.');
  }
  return payload;
}

function validateBatchUnique(skills: DashboardCreateSkillInput[]): void {
  const seen = new Set<string>();
  for (const skill of skills) {
    const key = `${skill.name}@${skill.version}`;
    if (seen.has(key)) {
      throw new Error(`Duplicate skill in import document: ${skill.name} @ ${skill.version}`);
    }
    seen.add(key);
  }
}

export function detectSkillImportFormat(text: string): Exclude<SkillImportFormat, "auto"> {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return "json";
  }
  return "yaml";
}

export function formatFromFilename(filename: string): SkillImportFormat {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".json")) {
    return "json";
  }
  if (lower.endsWith(".yaml") || lower.endsWith(".yml")) {
    return "yaml";
  }
  return "auto";
}

function isSkillObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return typeof obj.name === "string" && typeof obj.version === "string";
}

function normalizeImportItems(parsed: unknown): unknown[] {
  if (Array.isArray(parsed)) {
    return parsed;
  }
  if (parsed !== null && typeof parsed === "object") {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj.skills)) {
      return obj.skills;
    }
    if (isSkillObject(parsed)) {
      return [parsed];
    }
  }
  throw new Error(
    "Import document must be a skill object, an array of skills, or an object with a top-level skills array.",
  );
}

function parseStructuredImport(raw: unknown): DashboardCreateSkillInput {
  const obj = asRecord(raw, "Skill entry");
  const payload: DashboardCreateSkillInput = {
    name: readString(obj, "name", true),
    version: readString(obj, "version", true),
    description: readString(obj, "description", true),
    body_content: readString(obj, "body_content", true),
  };

  const license = readString(obj, "license");
  if (license) {
    payload.license = license;
  }
  const compatibility = readString(obj, "compatibility");
  if (compatibility) {
    payload.compatibility = compatibility;
  }

  const allowedTools = readStringArray(obj, "allowed_tools");
  if (allowedTools.length > 0) {
    payload.allowed_tools = allowedTools;
  }

  const scripts = readScriptFiles(obj.scripts);
  if (scripts && scripts.length > 0) {
    payload.scripts = scripts;
  }

  const references = readReferenceFiles(obj.references);
  if (references && references.length > 0) {
    payload.references = references;
  }

  return validateImportPayload(payload);
}

export function parseSkillImportText(text: string, format: SkillImportFormat = "auto"): DashboardCreateSkillInput[] {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Paste JSON or YAML, or choose a file to import.");
  }

  const resolvedFormat = format === "auto" ? detectSkillImportFormat(trimmed) : format;
  let parsed: unknown;
  try {
    if (resolvedFormat === "json") {
      parsed = JSON.parse(trimmed);
    } else {
      parsed = YAML.parse(trimmed);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid document";
    throw new Error(`Failed to parse ${resolvedFormat.toUpperCase()}: ${message}`);
  }

  const items = normalizeImportItems(parsed);
  if (items.length === 0) {
    throw new Error("Import document contains no skills.");
  }

  const skills = items.map((item, index) => {
    try {
      return parseStructuredImport(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid skill entry";
      const label =
        item !== null && typeof item === "object" && !Array.isArray(item)
          ? `${String((item as Record<string, unknown>).name ?? "unknown")} @ ${String((item as Record<string, unknown>).version ?? "?")}`
          : `entry ${index + 1}`;
      throw new Error(`Skill ${index + 1} (${label}): ${message}`);
    }
  });

  validateBatchUnique(skills);
  return skills;
}

export async function readSkillImportFile(file: File): Promise<{ text: string; format: SkillImportFormat }> {
  const text = await file.text();
  return { text, format: formatFromFilename(file.name) };
}
