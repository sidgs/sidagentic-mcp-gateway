import { useCallback, useEffect, useState, type ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { api } from "@/lib/api";
import type { TenantMembershipPublic, TenantPublic } from "@/lib/types";

const MEMBER_ROLES = ["administrator", "provider", "user", "auditor"] as const;

function formatAuditTime(value?: string): string {
  if (!value) {
    return "—";
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString();
}

export function TenantAdminPage() {
  const [tenants, setTenants] = useState<TenantPublic[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [members, setMembers] = useState<TenantMembershipPublic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberRole, setMemberRole] = useState<string>("user");

  const selected = tenants.find((t) => t.id === selectedId) ?? null;

  const loadTenants = useCallback(async () => {
    setError(null);
    try {
      const rows = await api.platformTenants();
      setTenants(rows);
      if (rows.length > 0 && !rows.some((t) => t.id === selectedId)) {
        setSelectedId(rows[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tenants");
    }
  }, [selectedId]);

  const loadMembers = useCallback(async (tenantId: string) => {
    if (!tenantId) {
      setMembers([]);
      return;
    }
    try {
      setMembers(await api.platformTenantMembers(tenantId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load members");
    }
  }, []);

  useEffect(() => {
    void loadTenants();
  }, [loadTenants]);

  useEffect(() => {
    if (selectedId) {
      void loadMembers(selectedId);
    }
  }, [selectedId, loadMembers]);

  async function createTenant() {
    try {
      await api.createPlatformTenant({
        tenant_id: newId.trim(),
        name: newName.trim(),
        owner_email: newOwnerEmail.trim(),
      });
      setCreateOpen(false);
      setNewId("");
      setNewName("");
      setNewOwnerEmail("");
      await loadTenants();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create tenant");
    }
  }

  async function runLifecycle(action: "suspend" | "remove" | "normal" | "read_only") {
    if (!selected) {
      return;
    }
    try {
      if (action === "suspend") {
        await api.suspendPlatformTenant(selected.id);
      } else if (action === "remove") {
        await api.removePlatformTenant(selected.id);
      } else {
        await api.setPlatformTenantMode(selected.id, action);
      }
      await loadTenants();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lifecycle action failed");
    }
  }

  async function addMember() {
    if (!selected || !memberEmail.trim()) {
      return;
    }
    try {
      await api.addPlatformTenantMember(selected.id, {
        email: memberEmail.trim(),
        role: memberRole,
      });
      setMemberEmail("");
      await loadMembers(selected.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add member");
    }
  }

  async function updateMemberRole(membershipId: number, role: string) {
    if (!selected) {
      return;
    }
    try {
      await api.patchPlatformTenantMember(selected.id, membershipId, { role });
      await loadMembers(selected.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update member");
    }
  }

  async function removeMember(membershipId: number) {
    if (!selected) {
      return;
    }
    try {
      await api.deletePlatformTenantMember(selected.id, membershipId);
      await loadMembers(selected.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove member");
    }
  }

  return (
    <Stack spacing={2}>
      {error ? <Alert severity="error">{error}</Alert> : null}

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Tenant registry
        </Typography>
        <Button variant="contained" onClick={() => setCreateOpen(true)}>
          Create tenant
        </Button>
      </Stack>

      <Paper sx={{ overflowX: "auto" }}>
        <Stack component="table" sx={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
          <Stack component="thead" direction="row" sx={{ borderBottom: 1, borderColor: "divider", px: 2, py: 1 }}>
            {["ID", "Name", "Status", "Mode", "Owner", "Updated"].map((h) => (
              <Typography key={h} component="th" variant="caption" sx={{ flex: h === "Name" ? 2 : 1, fontWeight: 600 }}>
                {h}
              </Typography>
            ))}
          </Stack>
          {tenants.map((t) => (
            <Stack
              key={t.id}
              component="tr"
              direction="row"
              onClick={() => setSelectedId(t.id)}
              sx={{
                px: 2,
                py: 1,
                cursor: "pointer",
                bgcolor: t.id === selectedId ? "action.selected" : undefined,
                borderBottom: 1,
                borderColor: "divider",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Typography component="td" variant="body2" sx={{ flex: 1 }}>
                {t.id}
              </Typography>
              <Typography component="td" variant="body2" sx={{ flex: 2 }}>
                {t.name}
              </Typography>
              <BoxCell>
                <Chip size="small" label={t.status} />
              </BoxCell>
              <BoxCell>
                <Chip size="small" label={t.mode} variant="outlined" />
              </BoxCell>
              <Typography component="td" variant="body2" sx={{ flex: 1 }}>
                {t.owner_email || "—"}
              </Typography>
              <Typography component="td" variant="body2" sx={{ flex: 1 }}>
                {formatAuditTime(t.updated_on)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      {selected ? (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {selected.name} ({selected.id})
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Created {formatAuditTime(selected.created_on)} by {selected.created_by || "—"} · Updated{" "}
            {formatAuditTime(selected.updated_on)} by {selected.updated_by || "—"}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
            <Button size="small" onClick={() => void runLifecycle("suspend")}>
              Suspend
            </Button>
            <Button size="small" onClick={() => void runLifecycle("remove")}>
              Remove
            </Button>
            <Button size="small" onClick={() => void runLifecycle("normal")}>
              Normal mode
            </Button>
            <Button size="small" onClick={() => void runLifecycle("read_only")}>
              Read-only mode
            </Button>
          </Stack>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Members
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 2 }}>
            <TextField
              size="small"
              label="Email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              sx={{ flex: 2 }}
            />
            <TextField
              select
              size="small"
              label="Role"
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value)}
              sx={{ minWidth: 160 }}
            >
              {MEMBER_ROLES.map((r) => (
                <MenuItem key={r} value={r}>
                  {r}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" onClick={() => void addMember()} disabled={!memberEmail.trim()}>
              Add member
            </Button>
          </Stack>

          {members.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              No members yet.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {members.map((m) => (
                <Stack
                  key={m.id}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{ alignItems: { sm: "center" }, borderBottom: 1, borderColor: "divider", pb: 1 }}
                >
                  <Typography variant="body2" sx={{ flex: 2 }}>
                    {m.email}
                  </Typography>
                  <TextField
                    select
                    size="small"
                    value={m.role}
                    onChange={(e) => void updateMemberRole(m.id, e.target.value)}
                    sx={{ minWidth: 160 }}
                  >
                    {MEMBER_ROLES.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography variant="caption" color="text.secondary" sx={{ flex: 2 }}>
                    {formatAuditTime(m.updated_on)} · {m.updated_by}
                  </Typography>
                  <Button size="small" color="error" onClick={() => void removeMember(m.id)}>
                    Remove
                  </Button>
                </Stack>
              ))}
            </Stack>
          )}
        </Paper>
      ) : null}

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create tenant</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Tenant ID" value={newId} onChange={(e) => setNewId(e.target.value)} />
            <TextField label="Display name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <TextField
              label="Owner email"
              value={newOwnerEmail}
              onChange={(e) => setNewOwnerEmail(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => void createTenant()}
            disabled={!newId.trim() || !newName.trim() || !newOwnerEmail.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

function BoxCell({ children }: { children: React.ReactNode }) {
  return (
    <Stack component="td" sx={{ flex: 1, justifyContent: "center" }}>
      {children}
    </Stack>
  );
}
