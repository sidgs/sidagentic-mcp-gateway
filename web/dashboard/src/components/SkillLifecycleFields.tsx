import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import {
  formatSkillDlcLabel,
  formatSkillStatusLabel,
  SKILL_DLC_VALUES,
  SKILL_STATUS_VALUES,
  type SkillLifecycleForm,
} from "../lib/skillLifecycle";

export function SkillLifecycleFields({
  form,
  setForm,
  statusDisabled,
  dlcDisabled,
}: {
  form: SkillLifecycleForm;
  setForm: (next: SkillLifecycleForm) => void;
  statusDisabled?: boolean;
  dlcDisabled?: boolean;
}) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <FormControl size="small" sx={{ minWidth: 180 }} disabled={statusDisabled}>
        <InputLabel id="skill-status-label">Status</InputLabel>
        <Select
          labelId="skill-status-label"
          label="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as SkillLifecycleForm["status"] })}
        >
          {SKILL_STATUS_VALUES.map((status) => (
            <MenuItem key={status} value={status}>
              {formatSkillStatusLabel(status)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Lifecycle state for this version</FormHelperText>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180 }} disabled={dlcDisabled}>
        <InputLabel id="skill-dlc-label">DLC</InputLabel>
        <Select
          labelId="skill-dlc-label"
          label="DLC"
          value={form.dlc_status}
          onChange={(e) => setForm({ ...form, dlc_status: e.target.value as SkillLifecycleForm["dlc_status"] })}
        >
          {SKILL_DLC_VALUES.map((dlcStatus) => (
            <MenuItem key={dlcStatus} value={dlcStatus}>
              {formatSkillDlcLabel(dlcStatus)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {dlcDisabled
            ? "Unlock this version to change DLC status"
            : "Release readiness before activating"}
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}
