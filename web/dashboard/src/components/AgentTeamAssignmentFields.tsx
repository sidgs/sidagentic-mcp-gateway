import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { api } from "@/lib/api";
import type { DashboardTeam } from "@/lib/types";

interface AgentTeamAssignmentFieldsProps {
  value: number[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
}

export function AgentTeamAssignmentFields({ value, onChange, disabled }: AgentTeamAssignmentFieldsProps) {
  const [teams, setTeams] = useState<DashboardTeam[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        setTeams(await api.teams("agent"));
      } catch {
        setTeams([]);
      }
    })();
  }, []);

  const selected = teams.filter((team) => value.includes(team.id));

  return (
    <>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Agent teams
      </Typography>
      <Autocomplete
        multiple
        options={teams}
        getOptionLabel={(option) => option.name}
        value={selected}
        disabled={disabled}
        onChange={(_, next) => onChange(next.map((team) => team.id))}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder="Optional — share with agent team members"
            helperText="Apps with no agent teams are visible only to the owner."
          />
        )}
      />
    </>
  );
}
