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
import { SkillContentFields, SkillIdentityFields } from "./SkillContentFields";

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
        if (!skillName || !skillVersion || locked) {
          return;
        }
        await api.updateSkill(skillName, skillVersion, formToUpdatePayload(editForm));
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

  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary">
        {formTitle(mode, skillName, skillVersion)}
      </Typography>

      {loading ? <Typography>Loading skill…</Typography> : null}

      {!loading && isEdit && locked ? (
        <Alert severity="info">This version is locked. Unlock it from the skills list before editing content.</Alert>
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
          disabled={loading || saving || readOnly}
          onClick={() => void submit()}
        >
          {isEdit ? "Save changes" : "Create skill"}
        </Button>
      </Stack>
    </Stack>
  );
}
