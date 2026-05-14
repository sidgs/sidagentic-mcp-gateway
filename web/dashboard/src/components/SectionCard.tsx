import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      component="section"
      variant="outlined"
      sx={{
        p: "14px",
        borderRadius: "16px",
        boxShadow: "0 1px 2px rgba(27, 31, 36, 0.06), 0 8px 24px rgba(27, 31, 36, 0.04)",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{
          mb: 1.5,
          alignItems: { xs: "stretch", sm: "flex-start" },
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
          <Typography variant="caption" sx={{ letterSpacing: "0.12em", fontWeight: 600, fontSize: "0.74rem" }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="h6" component="h3" sx={{ mt: 0.5, mb: 0, fontWeight: 600 }}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {action}
      </Stack>
      {children}
    </Paper>
  );
}
