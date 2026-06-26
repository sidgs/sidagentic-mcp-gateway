export const SKILL_STATUS_VALUES = ["preview", "active", "deprecated", "retired"] as const;
export const SKILL_DLC_VALUES = ["development", "testing", "released"] as const;

export type SkillStatus = (typeof SKILL_STATUS_VALUES)[number];
export type SkillDlcStatus = (typeof SKILL_DLC_VALUES)[number];

export type SkillLifecycleForm = {
  status: SkillStatus;
  dlc_status: SkillDlcStatus;
};

function isSkillStatus(value: string): value is SkillStatus {
  return (SKILL_STATUS_VALUES as readonly string[]).includes(value);
}

function isSkillDlcStatus(value: string): value is SkillDlcStatus {
  return (SKILL_DLC_VALUES as readonly string[]).includes(value);
}

export function normalizeSkillStatus(value: string): SkillStatus {
  const normalized = value.trim().toLowerCase();
  return isSkillStatus(normalized) ? normalized : "preview";
}

export function normalizeSkillDlcStatus(value: string): SkillDlcStatus {
  const normalized = value.trim().toLowerCase();
  return isSkillDlcStatus(normalized) ? normalized : "development";
}

export function emptySkillLifecycle(): SkillLifecycleForm {
  return { status: "preview", dlc_status: "development" };
}

export function skillDetailToLifecycle(detail: {
  status: string;
  dlc_status: string;
}): SkillLifecycleForm {
  return {
    status: normalizeSkillStatus(detail.status),
    dlc_status: normalizeSkillDlcStatus(detail.dlc_status),
  };
}

export function validateSkillLifecycle(form: SkillLifecycleForm): string | null {
  if (
    (form.status === "active" || form.status === "deprecated") &&
    form.dlc_status !== "released"
  ) {
    return 'Active and deprecated statuses require DLC status to be "released".';
  }
  return null;
}

export function formatSkillStatusLabel(status: SkillStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function formatSkillDlcLabel(dlcStatus: SkillDlcStatus): string {
  return dlcStatus.charAt(0).toUpperCase() + dlcStatus.slice(1);
}
