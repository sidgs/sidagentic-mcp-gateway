import { useCallback, useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { api } from "@/lib/api";
import { canManageUsers, canWriteDashboard, normalizeRole, type UserRole } from "@/lib/rbac";
import type { DashboardUser } from "@/lib/types";

interface UsersPageProps {
  role?: UserRole;
}

const ASSIGNABLE_ROLES = ["user", "provider", "administrator", "auditor"] as const;

export function UsersPage({ role }: UsersPageProps) {
  const effectiveRole = normalizeRole(role);
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [newRole, setNewRole] = useState<string>("user");

  const loadUsers = useCallback(async () => {
    setError(null);
    try {
      setUsers(await api.users());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function createUser() {
    if (!username.trim()) {
      return;
    }
    try {
      await api.createUser({ username: username.trim(), role: newRole });
      setUsername("");
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    }
  }

  async function updateRole(userId: number, roleValue: string) {
    try {
      await api.patchUserRole(userId, roleValue);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    }
  }

  const canWrite = canWriteDashboard(effectiveRole) && canManageUsers(effectiveRole);

  return (
    <Stack spacing={2}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      {canWrite ? (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <TextField
            size="small"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            select
            size="small"
            label="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            sx={{ minWidth: 160 }}
          >
            {ASSIGNABLE_ROLES.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={() => void createUser()} disabled={!username.trim()}>
            Add user
          </Button>
        </Stack>
      ) : null}

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Gateway users
        </Typography>
        {users.length === 0 ? (
          <Typography color="text.secondary" variant="body2">
            No users found.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {users.map((user) => (
              <Stack
                key={user.username}
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ alignItems: { sm: "center" } }}
              >
                <Typography variant="body2" sx={{ minWidth: 140 }}>
                  {user.username}
                </Typography>
                <Typography color="text.secondary" variant="body2" sx={{ flex: 1 }}>
                  {user.email || "—"}
                </Typography>
                {canWrite ? (
                  <TextField
                    select
                    size="small"
                    value={user.role}
                    onChange={(e) => void updateRole(user.id!, e.target.value)}
                    sx={{ minWidth: 160 }}
                  >
                    {ASSIGNABLE_ROLES.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <Typography variant="body2">{user.role}</Typography>
                )}
              </Stack>
            ))}
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
