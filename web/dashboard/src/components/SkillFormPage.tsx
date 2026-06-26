import { useEffect, useState } from "react";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { api } from "../lib/api";
import type { SkillFormMode } from "../lib/hashRoute";
import {
  emptySkillContent,
  emptySkillCreateForm,
  formToUpdatePayload,
  skillDetailToForm,
  type SkillCreateForm,
} from "../lib/skillForm";
import {
  emptySkillLifecycle,
  skillDetailToLifecycle,
  validateSkillLifecycle,
  type SkillLifecycleForm,
} from "../lib/skillLifecycle";
import { SkillContentFields, SkillIdentityFields } from "./SkillContentFields";
import { SkillLifecycleFields } from "./SkillLifecycleFields";

export interface SkillFormPageProps {
  mode: SkillFormMode;
  skillName: string | null;
  skillVersion: string | null;
  onCancel: () => void;
  onSaved: () => void;
}

function formTitle(mode: SkillFormMode, skillName: string | null, skillVersion: string | null): string {
  switch (mode) {
    case "create":
      return "Register skill";
    case "add-version":
      return skillName ? `Add version — ${skillName}` : "Add version";
    case "edit":
      return skillName && skillVersion ? `Edit ${skillName} @ ${skillVersion}` : "Edit skill";
    default:
      return "Skill";
  }
}

export function SkillFormPage({ mode, skillName, skillVersion, onCancel, onSaved }: SkillFormPageProps) {
  const isEdit = mode === "edit";
  const [createForm, setCreateForm] = useState<SkillCreateForm>(() => {
    if (mode === "add-version" && skillName) {
      return { ...emptySkillCreateForm(), name: skillName, version: "" };
    }
    return emptySkillCreateForm();
  });
  const [editForm, setEditForm] = useState(emptySkillContent());
  const [lifecycleForm, setLifecycleForm] = useState<SkillLifecycleForm>(emptySkillLifecycle);
  const [originalLifecycle, setOriginalLifecycle] = useState<SkillLifecycleForm>(emptySkillLifecycle);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !skillName || !skillVersion) {
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    void api
      .getSkillVersion(skillName, skillVersion)
      .then((detail) => {
        if (cancelled) {
          return;
        }
        setEditForm(skillDetailToForm(detail));
        const lifecycle = skillDetailToLifecycle(detail);
        setLifecycleForm(lifecycle);
        setOriginalLifecycle(lifecycle);
        setLocked(detail.locked);
      })
      .catch((e) => {
        if (cancelled) {
          return;
        }
        setError(e instanceof Error ? e.message : "Failed to load skill");
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [isEdit, skillName, skillVersion]);

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      if (isEdit) {
        if (!skillName || !skillVersion) {
          return;
        }

        const lifecycleChanged =
          lifecycleForm.status !== originalLifecycle.status ||
          lifecycleForm.dlc_status !== originalLifecycle.dlc_status;

        if (lifecycleChanged) {
          const lifecycleError = validateSkillLifecycle(lifecycleForm);
          if (lifecycleError) {
            setError(lifecycleError);
            return;
          }
        }

        if (!locked) {
          await api.updateSkill(skillName, skillVersion, formToUpdatePayload(editForm));
        } else if (!lifecycleChanged) {
          return;
        }

        if (lifecycleForm.dlc_status !== originalLifecycle.dlc_status) {
          await api.setSkillDLCStatus(skillName, skillVersion, lifecycleForm.dlc_status);
        }
        if (lifecycleForm.status !== originalLifecycle.status) {
          await api.transitionSkillStatus(skillName, skillVersion, lifecycleForm.status);
        }
      } else {
        await api.createSkill({
          name: createForm.name.trim(),
          version: createForm.version.trim(),
          ...formToUpdatePayload(createForm),
        });
      }
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save skill");
    } finally {
      setSaving(false);
    }
  }

  const readOnly = isEdit && locked;
  const lifecycleChanged =
    lifecycleForm.status !== originalLifecycle.status ||
    lifecycleForm.dlc_status !== originalLifecycle.dlc_status;
  const canSave = !isEdit || !locked || lifecycleChanged;

  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary">
        {formTitle(mode, skillName, skillVersion)}
      </Typography>

      {loading ? <Typography>Loading skill…</Typography> : null}

      {!loading && isEdit && locked ? (
        <Alert severity="info">
          This version is locked. Unlock it from the skills list before editing content or DLC status. Lifecycle
          status can still be updated here.
        </Alert>
      ) : null}

      {!loading && !isEdit ? (
        <>
          <SkillIdentityFields
            form={createForm}
            setForm={setCreateForm}
            nameLocked={mode === "add-version"}
            disabled={saving}
          />
          <SkillContentFields form={createForm} setForm={(content) => setCreateForm({ ...createForm, ...content })} disabled={saving} />
        </>
      ) : null}

      {!loading && isEdit ? (
        <>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2">
              <strong>Name:</strong> {skillName}
            </Typography>
            <Typography variant="body2">
              <strong>Version:</strong> {skillVersion}
            </Typography>
          </Stack>
          <SkillLifecycleFields
            form={lifecycleForm}
            setForm={setLifecycleForm}
            statusDisabled={saving}
            dlcDisabled={readOnly || saving}
          />
          <SkillContentFields form={editForm} setForm={setEditForm} disabled={readOnly || saving} />
        </>
      ) : null}

      {error ? <Typography color="error">{error}</Typography> : null}

      <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
        <Button variant="outlined" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={loading || saving || !canSave}
          onClick={() => void submit()}
        >
          {isEdit ? "Save changes" : "Create skill"}
        </Button>
      </Stack>
    </Stack>
  );
}
