import Chip from "@mui/material/Chip";

const tonePalette: Record<string, "success" | "warning" | "error" | "default"> = {
  good: "success",
  warn: "warning",
  bad: "error",
  muted: "default",
};

export function StatusBadge({ tone, text }: { tone: string; text: string }) {
  const statusColor = tonePalette[tone] ?? "default";
  return (
    <Chip label={text} size="small" variant="outlined" color={statusColor} sx={{ textTransform: "capitalize" }} />
  );
}
