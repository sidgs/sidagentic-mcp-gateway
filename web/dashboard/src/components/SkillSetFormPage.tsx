import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../lib/api";
import { SkillSetMemberCard } from "./SkillSetMemberCard";
import type {
  DashboardSkillSet,
  DashboardSkillSetMember,
  DashboardSkillVersionSummary,
} from "../lib/types";

const SECURITY_OPTIONS = ["open", "api_key", "basic", "bearer"] as const;

function memberKey(m: Pick<DashboardSkillSetMember, "name" | "version">): string {
  return `${m.name}@${m.version}`;
}

export function SkillSetFormPage({
  mode,
  skillSetName,
  onCancel,
  onSaved,
}: {
  mode: "create" | "edit";
  skillSetName: string | null;
  onCancel: () => void;
  onSaved: (name: string) => void;
}) {
  const [skills, setSkills] = useState<DashboardSkillVersionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    security_option: "basic",
    members: [] as DashboardSkillSetMember[],
    addMemberKey: "",
  });

  const activeSkills = useMemo(
    () => skills.filter((s) => s.status === "active"),
    [skills],
  );

  const memberKeys = useMemo(
    () => new Set(form.members.map(memberKey)),
    [form.members],
  );

  const addableSkills = useMemo(
    () => activeSkills.filter((s) => !memberKeys.has(`${s.name}@${s.version}`)),
    [activeSkills, memberKeys],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const skillResp = await api.skills();
      setSkills(skillResp.skills ?? []);
      if (mode === "edit" && skillSetName) {
        const detail: DashboardSkillSet = await api.getSkillSet(skillSetName);
        setForm({
          name: detail.name,
          description: detail.description,
          security_option: detail.security_option || "basic",
          members: [...detail.members],
          addMemberKey: "",
        });
      } else {
        setForm({
          name: "",
          description: "",
          security_option: "basic",
          members: [],
          addMemberKey: "",
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load skill set");
    } finally {
      setLoading(false);
    }
  }, [mode, skillSetName]);

  useEffect(() => {
    void load();
  }, [load]);

  function addMember() {
    const key = form.addMemberKey.trim();
    if (!key) {
      return;
    }
    const [skillName, version] = key.split("@");
    if (!skillName || !version) {
      return;
    }
    const skill = activeSkills.find((s) => s.name === skillName && s.version === version);
    if (!skill || memberKeys.has(key)) {
      return;
    }
    setForm((prev) => ({
      ...prev,
      addMemberKey: "",
      members: [
        ...prev.members,
        {
          skill_version_id: skill.id,
          name: skill.name,
          version: skill.version,
          description: skill.description,
          status: skill.status,
        },
      ],
    }));
  }

  function removeMember(skillVersionId: string) {
    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.skill_version_id !== skillVersionId),
    }));
  }

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const members = form.members.map((m) => ({
        skill_version_id: m.skill_version_id,
        skill_name: m.name,
        version: m.version,
      }));
      if (mode === "create") {
        const name = form.name.trim();
        await api.createSkillSet({
          name,
          description: form.description.trim(),
          security_option: form.security_option,
          members,
        });
        onSaved(name);
        return;
      }
      if (!skillSetName) {
        return;
      }
      await api.updateSkillSet(skillSetName, {
        description: form.description.trim(),
        security_option: form.security_option,
        members,
      });
      onSaved(skillSetName);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save skill set");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Typography>Loading…</Typography>;
  }

  return (
    <Stack spacing={2}>
      {error ? <Typography color="error">{error}</Typography> : null}
      <TextField
        label="Name"
        value={form.name}
        disabled={mode === "edit"}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        helperText={mode === "edit" ? "Skill set name cannot be changed" : undefined}
      />
      <TextField
        label="Description"
        multiline
        minRows={2}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <TextField
        select
        label="Security"
        value={form.security_option}
        onChange={(e) => setForm({ ...form, security_option: e.target.value })}
      >
        {SECURITY_OPTIONS.map((v) => (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        ))}
      </TextField>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Skills in set
        </Typography>
        {form.members.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No skills attached yet.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 1.5,
            }}
          >
            {form.members.map((member) => (
              <SkillSetMemberCard
                key={member.skill_version_id}
                member={member}
                action={
                  <Button size="small" color="error" onClick={() => removeMember(member.skill_version_id)}>
                    Remove
                  </Button>
                }
              />
            ))}
          </Box>
        )}
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: { sm: "flex-start" } }}>
        <TextField
          select
          fullWidth
          label="Add active skill"
          value={form.addMemberKey}
          onChange={(e) => setForm({ ...form, addMemberKey: e.target.value })}
          helperText="Only active skill versions can be attached"
        >
          <MenuItem value="">Select skill…</MenuItem>
          {addableSkills.map((s) => (
            <MenuItem key={s.id} value={`${s.name}@${s.version}`}>
              {s.name} @ {s.version}
            </MenuItem>
          ))}
        </TextField>
        <Button sx={{ mt: { sm: 1 } }} variant="outlined" onClick={addMember} disabled={!form.addMemberKey}>
          Add
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
        <Button onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => void submit()}
          disabled={saving || !form.description.trim() || (mode === "create" && !form.name.trim())}
        >
          {saving ? "Saving…" : mode === "create" ? "Create" : "Save"}
        </Button>
      </Stack>
    </Stack>
  );
}
