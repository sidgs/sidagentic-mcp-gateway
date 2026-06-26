import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../lib/api";
import type {
  DashboardSkillSet,
  DashboardSkillSetSummary,
  DashboardSkillVersionSummary,
} from "../lib/types";

export function SkillSetsCatalogPanel() {
  const [sets, setSets] = useState<DashboardSkillSetSummary[]>([]);
  const [skills, setSkills] = useState<DashboardSkillVersionSummary[]>([]);
  const [selected, setSelected] = useState<DashboardSkillSet | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    security_option: "basic",
    memberKey: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeSkills = useMemo(
    () => skills.filter((s) => s.status === "active"),
    [skills],
  );

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [setResp, skillResp] = await Promise.all([api.skillSets(), api.skills()]);
      setSets(setResp.skill_sets ?? []);
      setSkills(skillResp.skills ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load skill sets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function openDetail(name: string) {
    setSelected(await api.getSkillSet(name));
  }

  async function submitCreate() {
    const [skillName, version] = form.memberKey.split("@");
    await api.createSkillSet({
      name: form.name,
      description: form.description,
      security_option: form.security_option,
      members: skillName && version ? [{ skill_name: skillName.trim(), version: version.trim() }] : [],
    });
    setOpen(false);
    setForm({ name: "", description: "", security_option: "basic", memberKey: "" });
    await reload();
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Group pinned active skill versions for tenant catalog access.
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Skill Set
        </Button>
      </Stack>
      {error ? <Typography color="error">{error}</Typography> : null}
      {loading ? <Typography>Loading skill sets…</Typography> : null}
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
        {sets.map((set) => (
          <Box key={set.name} className="section-card" sx={{ p: 2, minWidth: 280, cursor: "pointer" }} onClick={() => void openDetail(set.name)}>
            <Typography variant="h6">{set.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {set.description}
            </Typography>
            <Chip size="small" label={`${set.member_count} skills`} sx={{ mt: 1 }} />
          </Box>
        ))}
      </Stack>

      {selected ? (
        <Box className="section-card" sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">{selected.name}</Typography>
            <Button color="error" onClick={async () => { await api.deleteSkillSet(selected.name); setSelected(null); await reload(); }}>
              Delete
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 1 }}>{selected.description}</Typography>
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            Catalog: {selected.catalog_endpoint}
          </Typography>
          <Stack spacing={1} sx={{ mt: 2 }}>
            {selected.members.map((m) => (
              <Typography key={m.skill_version_id} variant="body2">
                {m.name} @ {m.version} — {m.status}
              </Typography>
            ))}
          </Stack>
        </Box>
      ) : null}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Skill Set</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
              {["open", "api_key", "basic", "bearer"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Active skill member"
              value={form.memberKey}
              onChange={(e) => setForm({ ...form, memberKey: e.target.value })}
              helperText="Only active skill versions can be attached"
            >
              <MenuItem value="">None</MenuItem>
              {activeSkills.map((s) => (
                <MenuItem key={s.id} value={`${s.name}@${s.version}`}>
                  {s.name} @ {s.version}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => void submitCreate()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
