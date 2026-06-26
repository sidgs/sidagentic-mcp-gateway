import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../lib/api";
import type { DashboardSkillVersionSummary } from "../lib/types";

export function SkillsCatalogPanel() {
  const [skills, setSkills] = useState<DashboardSkillVersionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    version: "1.0.0",
    description: "",
    body_content: "# Instructions\n",
  });

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await api.skills();
      setSkills(resp.skills ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load skills");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const grouped = useMemo(() => {
    const map = new Map<string, DashboardSkillVersionSummary[]>();
    for (const s of skills) {
      const list = map.get(s.name) ?? [];
      list.push(s);
      map.set(s.name, list);
    }
    return map;
  }, [skills]);

  async function submitCreate() {
    await api.createSkill(form);
    setOpen(false);
    setForm({ name: "", version: "1.0.0", description: "", body_content: "# Instructions\n" });
    await reload();
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Agent Skills catalog with versioned lifecycle (Preview / Active / Deprecated / Retired).
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Register Skill
        </Button>
      </Stack>
      {error ? <Typography color="error">{error}</Typography> : null}
      {loading ? <Typography>Loading skills…</Typography> : null}
      {!loading && skills.length === 0 ? (
        <Typography color="text.secondary">No skills registered yet.</Typography>
      ) : null}
      {Array.from(grouped.entries()).map(([name, versions]) => (
        <Box key={name} className="section-card" sx={{ p: 2 }}>
          <Typography variant="h6">{name}</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Version</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>DLC</TableCell>
                <TableCell>Lock</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {versions.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>{v.version}</TableCell>
                  <TableCell>{v.description}</TableCell>
                  <TableCell>
                    <Chip size="small" label={v.status} />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" variant="outlined" label={v.dlc_status} />
                  </TableCell>
                  <TableCell>{v.locked ? "Locked" : "Open"}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        onClick={async () => {
                          await api.setSkillDLCStatus(name, v.version, "released");
                          await api.transitionSkillStatus(name, v.version, "active");
                          await reload();
                        }}
                      >
                        Activate
                      </Button>
                      <Button
                        size="small"
                        onClick={async () => {
                          await api.setSkillLock(name, v.version, !v.locked);
                          await reload();
                        }}
                      >
                        {v.locked ? "Unlock" : "Lock"}
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={async () => {
                          await api.deleteSkillVersion(name, v.version);
                          await reload();
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ))}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Register Skill</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField
              label="Version"
              value={form.version}
              onChange={(e) => setForm({ ...form, version: e.target.value })}
            />
            <TextField
              label="Description"
              multiline
              minRows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <TextField
              label="Body (Markdown)"
              multiline
              minRows={6}
              value={form.body_content}
              onChange={(e) => setForm({ ...form, body_content: e.target.value })}
            />
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
