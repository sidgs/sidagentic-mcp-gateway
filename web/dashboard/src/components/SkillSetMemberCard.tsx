import type { ReactNode } from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import type { DashboardSkillSetMember } from "../lib/types";

export function SkillSetMemberCard({
  member,
  action,
  onOpen,
}: {
  member: DashboardSkillSetMember;
  action?: ReactNode;
  onOpen?: () => void;
}) {
  const interactive = Boolean(onOpen);

  return (
    <Paper
      elevation={0}
      variant="outlined"
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onOpen}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen?.();
              }
            }
          : undefined
      }
      sx={{
        p: 1.5,
        borderRadius: 2,
        borderColor: "divider",
        cursor: interactive ? "pointer" : "default",
        transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
        ...(interactive
          ? {
              "&:hover": {
                borderColor: "primary.light",
                bgcolor: "action.hover",
                boxShadow: 1,
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }
          : {}),
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {member.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              v{member.version}
            </Typography>
          </Box>
          <Chip size="small" label={member.status} color={member.status === "active" ? "success" : "default"} />
        </Stack>
        {member.description ? (
          <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {member.description}
          </Typography>
        ) : null}
        {action ? (
          <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
            {action}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}

export function SkillSetSummaryCard({
  name,
  description,
  memberCount,
  onOpen,
}: {
  name: string;
  description: string;
  memberCount: number;
  onOpen: () => void;
}) {
  return (
    <Paper
      role="link"
      tabIndex={0}
      aria-label={`Open skill set ${name}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      elevation={0}
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        borderColor: "divider",
        transition: "border-color 120ms ease, background-color 120ms ease, box-shadow 120ms ease",
        "&:hover": {
          borderColor: "primary.light",
          bgcolor: "action.hover",
          boxShadow: 1,
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
        },
      }}
    >
      <Stack spacing={1}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {description}
        </Typography>
        <Chip size="small" variant="outlined" label={`${memberCount} skill${memberCount === 1 ? "" : "s"}`} sx={{ alignSelf: "flex-start" }} />
      </Stack>
    </Paper>
  );
}
