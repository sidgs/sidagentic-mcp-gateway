import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { AccessibleTenant } from "@/lib/types";
import { formatUserRoleLabel } from "@/lib/rbac";

interface TenantPickerPageProps {
  tenants: AccessibleTenant[];
  platformAdmin: boolean;
  email?: string;
  loading?: boolean;
  error?: string | null;
  onSelect: (tenantId: string) => void | Promise<void>;
}

function statusColor(status: string): "success" | "warning" | "error" | "default" {
  switch (status) {
    case "active":
      return "success";
    case "suspended":
    case "retired":
      return "warning";
    case "removed":
      return "error";
    default:
      return "default";
  }
}

export function TenantPickerPage({
  tenants,
  platformAdmin,
  email,
  loading = false,
  error,
  onSelect,
}: TenantPickerPageProps) {
  const [selectingId, setSelectingId] = useState<string | null>(null);

  async function handleSelect(tenant: AccessibleTenant) {
    if (!tenant.accessible || loading) {
      return;
    }
    setSelectingId(tenant.id);
    try {
      await onSelect(tenant.id);
    } finally {
      setSelectingId(null);
    }
  }

  return (
    <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, maxWidth: 640, width: "100%" }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Select tenant
          </Typography>
          <Typography color="text.secondary">
            {email
              ? `Signed in as ${email}. Choose a tenant workspace to continue.`
              : "Choose a tenant workspace to continue."}
          </Typography>
          {platformAdmin ? (
            <Chip size="small" label="Platform administrator" color="primary" sx={{ mt: 1 }} />
          ) : null}
        </Box>

        {error ? <Alert severity="error">{error}</Alert> : null}

        {tenants.length === 0 ? (
          <Alert severity="info">No tenants are available for your account.</Alert>
        ) : (
          <Stack spacing={1}>
            {tenants.map((tenant) => {
              const disabled = !tenant.accessible || loading;
              const row = (
                <Paper
                  key={tenant.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    opacity: disabled ? 0.65 : 1,
                    borderColor: disabled ? "divider" : "primary.light",
                  }}
                >
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: { sm: "center" } }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {tenant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tenant.id}
                        {tenant.role ? ` · ${formatUserRoleLabel(tenant.role)}` : ""}
                      </Typography>
                      <Stack direction="row" spacing={0.5} sx={{ mt: 0.75, flexWrap: "wrap" }}>
                        <Chip size="small" label={tenant.status} color={statusColor(tenant.status)} />
                        {tenant.mode === "read_only" ? (
                          <Chip size="small" label="read only" variant="outlined" />
                        ) : null}
                      </Stack>
                      {!tenant.accessible && tenant.reason ? (
                        <Typography variant="caption" color="error.main" sx={{ display: "block", mt: 0.5 }}>
                          {tenant.reason}
                        </Typography>
                      ) : null}
                    </Box>
                    <Button
                      variant="contained"
                      disabled={disabled || selectingId === tenant.id}
                      onClick={() => void handleSelect(tenant)}
                    >
                      {selectingId === tenant.id ? "Opening…" : "Open"}
                    </Button>
                  </Stack>
                </Paper>
              );
              return disabled && tenant.reason ? (
                <Tooltip key={tenant.id} title={tenant.reason}>
                  <Box>{row}</Box>
                </Tooltip>
              ) : (
                row
              );
            })}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
