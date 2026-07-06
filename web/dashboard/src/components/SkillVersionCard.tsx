import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import type { DashboardSkillVersionSummary } from "../lib/types";

function statusChipColor(status: string): "success" | "warning" | "default" | "error" {
  switch (status) {
    case "active":
      return "success";
    case "preview":
      return "warning";
    case "deprecated":
    case "retired":
      return "error";
    default:
      return "default";
  }
}

export function SkillVersionCard({
  skill,
  onEdit,
  onActivate,
  onToggleLock,
  onDelete,
}: {
  skill: DashboardSkillVersionSummary;
  onEdit: () => void;
  onActivate: () => void;
  onToggleLock: () => void;
  onDelete: () => void;
}) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        borderColor: "divider",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={1.25} sx={{ flex: 1 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              v{skill.version}
            </Typography>
            {skill.locked ? (
              <Typography variant="caption" color="warning.main" sx={{ fontWeight: 600 }}>
                Locked
              </Typography>
            ) : (
              <Typography variant="caption" color="text.secondary">
                Open
              </Typography>
            )}
          </Box>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Chip size="small" label={skill.status} color={statusChipColor(skill.status)} />
            <Chip size="small" variant="outlined" label={skill.dlc_status} />
          </Stack>
        </Stack>

        {skill.description ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {skill.description}
          </Typography>
        ) : null}

        <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", justifyContent: "flex-end", pt: 0.5 }}>
          <Button size="small" onClick={onEdit}>
            Edit
          </Button>
          <Button size="small" onClick={onActivate}>
            Activate
          </Button>
          <Button size="small" onClick={onToggleLock}>
            {skill.locked ? "Unlock" : "Lock"}
          </Button>
          <Button size="small" color="error" disabled={skill.locked} onClick={onDelete}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
