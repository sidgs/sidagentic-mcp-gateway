import { useCallback, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { api } from "@/lib/api";
import { canCreateTeamType, canWriteDashboard, normalizeRole, type UserRole } from "@/lib/rbac";
import type { DashboardTeam, DashboardTeamDetail, TeamType } from "@/lib/types";

interface TeamsPageProps {
  role?: UserRole;
  userId?: number;
  initialType?: TeamType;
}

export function TeamsPage({ role, userId, initialType = "agent" }: TeamsPageProps) {
  const effectiveRole = normalizeRole(role);
  const [teamType, setTeamType] = useState<TeamType>(initialType);
  const [teams, setTeams] = useState<DashboardTeam[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<DashboardTeamDetail | null>(null);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTeams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await api.teams(teamType);
      setTeams(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load teams");
    } finally {
      setLoading(false);
    }
  }, [teamType]);

  useEffect(() => {
    void loadTeams();
    setSelectedId(null);
    setDetail(null);
  }, [loadTeams]);

  useEffect(() => {
    if (selectedId == null) {
      setDetail(null);
      return;
    }
    void (async () => {
      try {
        setDetail(await api.team(selectedId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load team");
      }
    })();
  }, [selectedId]);

  async function createTeam() {
    if (!newName.trim()) {
      return;
    }
    try {
      await api.createTeam({ name: newName.trim(), type: teamType });
      setNewName("");
      await loadTeams();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create team");
    }
  }

  const canWrite = canWriteDashboard(effectiveRole);
  const canCreate = canCreateTeamType(teamType, effectiveRole);

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "center" }}>
        <TextField
          select
          size="small"
          label="Team type"
          value={teamType}
          onChange={(e) => setTeamType(e.target.value as TeamType)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="agent">Agent teams</MenuItem>
          <MenuItem value="provider">Provider teams</MenuItem>
          <MenuItem value="user">User teams</MenuItem>
        </TextField>
        {canCreate && canWrite ? (
          <>
            <TextField
              size="small"
              label="New team name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" onClick={() => void createTeam()} disabled={!newName.trim()}>
              Create team
            </Button>
          </>
        ) : null}
      </Stack>

      {error ? <Alert severity="error">{error}</Alert> : null}
      {loading ? <Typography color="text.secondary">Loading teams…</Typography> : null}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Paper sx={{ p: 2, flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Teams
          </Typography>
          {teams.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              No teams yet.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {teams.map((team) => (
                <Button
                  key={team.id}
                  variant={selectedId === team.id ? "contained" : "outlined"}
                  onClick={() => setSelectedId(team.id)}
                  sx={{ justifyContent: "flex-start" }}
                >
                  {team.name}
                </Button>
              ))}
            </Stack>
          )}
        </Paper>

        <Paper sx={{ p: 2, flex: 1.2, minWidth: 0 }}>
          {detail ? (
            <Stack spacing={1.5}>
              <Typography variant="h6">{detail.team.name}</Typography>
              <Chip size="small" label={detail.team.type} />
              <Typography variant="subtitle2">Members</Typography>
              {detail.members.length === 0 ? (
                <Typography color="text.secondary" variant="body2">
                  No members.
                </Typography>
              ) : (
                detail.members.map((member) => (
                  <Stack key={member.user_id} direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2">
                      {member.username || member.email || `User #${member.user_id}`}
                    </Typography>
                    <Chip size="small" label={member.role} />
                    {member.user_id === userId ? (
                      <Chip size="small" color="primary" label="you" />
                    ) : null}
                  </Stack>
                ))
              )}
            </Stack>
          ) : (
            <Box>
              <Typography color="text.secondary" variant="body2">
                Select a team to view members.
              </Typography>
            </Box>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
}
