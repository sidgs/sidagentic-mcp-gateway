import type { DashboardSkillVersionDetail, DashboardUpdateSkillInput } from "./types";

export type SkillContentForm = {
  description: string;
  license: string;
  compatibility: string;
  body_content: string;
  allowed_tools: string;
  script_files: { filename: string; code_content: string }[];
  reference_files: { filename: string; markdown_content: string }[];
};

export type SkillCreateForm = SkillContentForm & {
  name: string;
  version: string;
};

export const emptySkillContent = (): SkillContentForm => ({
  description: "",
  license: "",
  compatibility: "",
  body_content: "# Instructions\n",
  allowed_tools: "",
  script_files: [],
  reference_files: [],
});

export const emptySkillCreateForm = (): SkillCreateForm => ({
  name: "",
  version: "1.0.0",
  ...emptySkillContent(),
});

export function skillDetailToForm(detail: DashboardSkillVersionDetail): SkillContentForm {
  return {
    description: detail.description,
    license: detail.license ?? "",
    compatibility: detail.compatibility ?? "",
    body_content: detail.body_content,
    allowed_tools: (detail.allowed_tools ?? []).join(", "),
    script_files: detail.script_files ?? [],
    reference_files: detail.reference_files ?? [],
  };
}

/** Suggest the next patch version for semver-like labels (e.g. 1.0.0 -> 1.0.1). */
export function suggestNextVersion(version: string): string {
  const match = version.trim().match(/^(\d+)\.(\d+)\.(\d+)(.*)$/);
  if (!match) {
    return "";
  }
  const patch = Number.parseInt(match[3], 10) + 1;
  return `${match[1]}.${match[2]}.${patch}${match[4]}`;
}

export function createFormFromDetail(
  detail: DashboardSkillVersionDetail,
  versionOverride?: string,
): SkillCreateForm {
  return {
    name: detail.name,
    version: versionOverride ?? suggestNextVersion(detail.version),
    ...skillDetailToForm(detail),
  };
}

export function formToUpdatePayload(form: SkillContentForm): DashboardUpdateSkillInput {
  return {
    description: form.description.trim(),
    license: form.license.trim() || undefined,
    compatibility: form.compatibility.trim() || undefined,
    body_content: form.body_content,
    allowed_tools: form.allowed_tools
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    scripts: form.script_files.filter((s) => s.filename.trim()),
    references: form.reference_files.filter((r) => r.filename.trim()),
  };
}
