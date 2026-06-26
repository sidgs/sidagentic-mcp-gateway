import { useCallback, useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
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

export interface SkillsCatalogPanelProps {
  onAddVersion: (name: string) => void;
  onEditSkill: (name: string, version: string) => void;
}

const STATUS_OPTIONS = ["all", "preview", "active", "deprecated", "retired"] as const;
const DLC_OPTIONS = ["all", "development", "testing", "released"] as const;
const LOCK_OPTIONS = ["all", "locked", "open"] as const;

type StatusFilter = (typeof STATUS_OPTIONS)[number];
type DlcFilter = (typeof DLC_OPTIONS)[number];
type LockFilter = (typeof LOCK_OPTIONS)[number];

function skillMatchesSearch(skill: DashboardSkillVersionSummary, term: string): boolean {
  const haystack = `${skill.name} ${skill.version} ${skill.description}`.toLowerCase();
  return haystack.includes(term);
}

export function SkillsCatalogPanel({ onAddVersion, onEditSkill }: SkillsCatalogPanelProps) {
  const [skills, setSkills] = useState<DashboardSkillVersionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dlcFilter, setDlcFilter] = useState<DlcFilter>("all");
  const [lockFilter, setLockFilter] = useState<LockFilter>("all");

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

  const filtersActive =
    search.trim().length > 0 || statusFilter !== "all" || dlcFilter !== "all" || lockFilter !== "all";

  const filteredSkills = useMemo(() => {
    const term = search.trim().toLowerCase();
    return skills.filter((skill) => {
      if (term && !skillMatchesSearch(skill, term)) {
        return false;
      }
      if (statusFilter !== "all" && skill.status !== statusFilter) {
        return false;
      }
      if (dlcFilter !== "all" && skill.dlc_status !== dlcFilter) {
        return false;
      }
      if (lockFilter === "locked" && !skill.locked) {
        return false;
      }
      if (lockFilter === "open" && skill.locked) {
        return false;
      }
      return true;
    });
  }, [skills, search, statusFilter, dlcFilter, lockFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, DashboardSkillVersionSummary[]>();
    for (const s of filteredSkills) {
      const list = map.get(s.name) ?? [];
      list.push(s);
      map.set(s.name, list);
    }
    for (const [, versions] of map) {
      versions.sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filteredSkills]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setDlcFilter("all");
    setLockFilter("all");
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={1.5}
        sx={{ alignItems: { lg: "flex-end" }, flexWrap: "wrap" }}
      >
        <TextField
          size="small"
          placeholder="Search name, version, or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: "1 1 240px", minWidth: 220 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="skills-status-filter-label">Status</InputLabel>
          <Select
            labelId="skills-status-filter-label"
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <MenuItem value="all">All statuses</MenuItem>
            <MenuItem value="preview">Preview</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="deprecated">Deprecated</MenuItem>
            <MenuItem value="retired">Retired</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="skills-dlc-filter-label">DLC</InputLabel>
          <Select
            labelId="skills-dlc-filter-label"
            label="DLC"
            value={dlcFilter}
            onChange={(e) => setDlcFilter(e.target.value as DlcFilter)}
          >
            <MenuItem value="all">All DLC</MenuItem>
            <MenuItem value="development">Development</MenuItem>
            <MenuItem value="testing">Testing</MenuItem>
            <MenuItem value="released">Released</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="skills-lock-filter-label">Lock</InputLabel>
          <Select
            labelId="skills-lock-filter-label"
            label="Lock"
            value={lockFilter}
            onChange={(e) => setLockFilter(e.target.value as LockFilter)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="locked">Locked</MenuItem>
          </Select>
        </FormControl>
        {filtersActive ? (
          <Button size="small" onClick={clearFilters} sx={{ mb: { xs: 0, lg: 0.25 } }}>
            Clear filters
          </Button>
        ) : null}
      </Stack>

      <Typography variant="body2" color="text.secondary">
        {loading
          ? "Loading skills…"
          : filtersActive
            ? `Showing ${filteredSkills.length} of ${skills.length} versions`
            : `${skills.length} version${skills.length === 1 ? "" : "s"} across the catalog`}
      </Typography>

      {error ? <Typography color="error">{error}</Typography> : null}
      {!loading && skills.length === 0 ? (
        <Typography color="text.secondary">No skills registered yet.</Typography>
      ) : null}
      {!loading && skills.length > 0 && filteredSkills.length === 0 ? (
        <Typography color="text.secondary">No skills match your search or filters.</Typography>
      ) : null}

      {grouped.map(([name, versions]) => (
        <Box key={name} className="section-card" sx={{ p: 2 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography variant="h6">{name}</Typography>
              <Chip size="small" variant="outlined" label={`${versions.length} shown`} />
            </Stack>
            <Button size="small" onClick={() => onAddVersion(name)}>
              Add version
            </Button>
          </Stack>
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
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", flexWrap: "wrap" }}>
                      <Button size="small" onClick={() => onEditSkill(name, v.version)}>
                        Edit
                      </Button>
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
                        disabled={v.locked}
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
    </Stack>
  );
}
