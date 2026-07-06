import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { api } from "../lib/api";
import { SkillSetSummaryCard } from "./SkillSetMemberCard";
import type { DashboardSkillSetSummary } from "../lib/types";

export function SkillSetsListPanel({ onOpenSet }: { onOpenSet: (name: string) => void }) {
  const [sets, setSets] = useState<DashboardSkillSetSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await api.skillSets();
      setSets(resp.skill_sets ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load skill sets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  if (loading) {
    return <Typography>Loading skill sets…</Typography>;
  }

  return (
    <Box>
      {error ? <Typography color="error">{error}</Typography> : null}
      {sets.length === 0 ? (
        <Typography color="text.secondary">No skill sets configured yet.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: 1.5,
          }}
        >
          {sets.map((set) => (
            <SkillSetSummaryCard
              key={set.name}
              name={set.name}
              description={set.description}
              memberCount={set.member_count}
              onOpen={() => onOpenSet(set.name)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
