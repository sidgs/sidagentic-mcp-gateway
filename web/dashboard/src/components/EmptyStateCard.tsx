import { CopyButton } from "./CopyButton";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { DashboardEmptyState } from "@/lib/types";
import { monospaceFontFamily } from "@/theme";

export function EmptyStateCard({ emptyState }: { emptyState: DashboardEmptyState }) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, bgcolor: "#f6f8fa", p: 2 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="caption" sx={{ letterSpacing: "0.12em", fontWeight: 600 }}>
            Empty state
          </Typography>
          <Typography variant="h6" component="h3" sx={{ mt: 1, mb: 0 }}>
            {emptyState.title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {emptyState.description}
          </Typography>
        </Box>
        {emptyState.commands && emptyState.commands.length > 0 ? (
          <Stack spacing={1}>
            {emptyState.commands.map((command) => (
              <Paper
                key={command}
                variant="outlined"
                sx={{ px: 1.25, py: 0.75, bgcolor: "#fff", display: "flex", alignItems: "center", gap: 1 }}
              >
                <Typography
                  component="code"
                  variant="body2"
                  sx={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: monospaceFontFamily,
                  }}
                >
                  {command}
                </Typography>
                <CopyButton ariaLabel="Copy command" title="Copy command" value={command} />
              </Paper>
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
}
