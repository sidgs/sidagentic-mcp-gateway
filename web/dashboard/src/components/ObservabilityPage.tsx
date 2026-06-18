import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type {
  DashboardObservabilityResponse,
  ObservabilityRange,
} from "@/lib/types";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { SectionCard } from "@/components/SectionCard";

function formatTimestamp(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function formatMs(value: number): string {
  return `${value.toFixed(1)} ms`;
}

export function ObservabilityPage({
  data,
  loading,
  error,
  range,
  onRangeChange,
  onRefresh,
  metricsEndpoint,
}: {
  data: DashboardObservabilityResponse | null;
  loading: boolean;
  error: string | null;
  range: ObservabilityRange;
  onRangeChange: (range: ObservabilityRange) => void;
  onRefresh: () => void;
  metricsEndpoint?: string;
}) {
  if (loading && !data) {
    return (
      <Stack sx={{ alignItems: "center", justifyContent: "center", py: 8 }}>
        <CircularProgress size={28} />
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Loading observability metrics…
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <SectionCard title="Observability" subtitle="Tool invocation analytics">
        <Typography color="error">{error}</Typography>
      </SectionCard>
    );
  }

  if (!data) {
    return null;
  }

  if (data.empty_state && data.summary.total_calls === 0) {
    return <EmptyStateCard emptyState={data.empty_state} />;
  }

  const volumeSeries = data.call_volume_series.map((bucket) => ({
    label: formatTimestamp(bucket.timestamp),
    total: bucket.total_calls,
    success: bucket.success_calls,
    error: bucket.error_calls,
  }));

  const topToolChart = data.top_tools.map((tool) => ({
    name: tool.canonical_name,
    calls: tool.total_calls,
  }));

  const topGroupChart = data.top_tool_groups.map((group) => ({
    name: group.tool_group_name,
    calls: group.total_calls,
  }));

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" } }}>
        <TextField
          select
          size="small"
          label="Time range"
          value={range}
          onChange={(event) => onRangeChange(event.target.value as ObservabilityRange)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="24h">Last 24 hours</MenuItem>
          <MenuItem value="7d">Last 7 days</MenuItem>
          <MenuItem value="30d">Last 30 days</MenuItem>
        </TextField>
        <Button variant="outlined" size="small" onClick={onRefresh} disabled={loading}>
          Refresh
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ ml: { sm: "auto" } }}>
          Window: {formatTimestamp(data.from)} – {formatTimestamp(data.to)}
        </Typography>
      </Stack>

      <div className="diagnostics-grid compact-diagnostics-grid">
        <div className="diag-card compact-metric">
          <span>Total calls</span>
          <strong>{data.summary.total_calls.toLocaleString()}</strong>
        </div>
        <div className="diag-card compact-metric">
          <span>Success rate</span>
          <strong>{formatPercent(data.summary.success_rate)}</strong>
        </div>
        <div className="diag-card compact-metric">
          <span>Active agents</span>
          <strong>{data.summary.active_agents}</strong>
        </div>
        <div className="diag-card compact-metric">
          <span>Active tools</span>
          <strong>{data.summary.active_tools}</strong>
        </div>
        <div className="diag-card compact-metric">
          <span>Active tool sets</span>
          <strong>{data.summary.active_tool_sets}</strong>
        </div>
        <div className="diag-card compact-metric">
          <span>Avg latency</span>
          <strong>{formatMs(data.summary.avg_latency_ms)}</strong>
        </div>
      </div>

      <SectionCard title="Call volume" subtitle="Hourly tool invocations">
        <Box sx={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={volumeSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" minTickGap={24} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" name="Total" stroke="#1976d2" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="success" name="Success" stroke="#2e7d32" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="error" name="Error" stroke="#d32f2f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </SectionCard>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SectionCard title="Most popular tools" subtitle="Top tools by call volume">
            <Box sx={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={topToolChart} layout="vertical" margin={{ left: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="calls" name="Calls" fill="#1976d2" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SectionCard title="Most popular tool sets" subtitle="Top tool groups by call volume">
            <Box sx={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={topGroupChart} layout="vertical" margin={{ left: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="calls" name="Calls" fill="#7b1fa2" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </SectionCard>
        </Box>
      </Stack>

      <SectionCard title="Tool calls by agent" subtitle="Agent app attribution for MCP traffic">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Client ID</TableCell>
              <TableCell align="right">Calls</TableCell>
              <TableCell align="right">Errors</TableCell>
              <TableCell align="right">Success rate</TableCell>
              <TableCell align="right">Avg latency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.by_agent.map((row) => (
              <TableRow key={`${row.agent_app_id ?? "none"}-${row.client_id}-${row.agent_name}`}>
                <TableCell>{row.agent_name}</TableCell>
                <TableCell>
                  <code>{row.client_id || "—"}</code>
                </TableCell>
                <TableCell align="right">{row.total_calls.toLocaleString()}</TableCell>
                <TableCell align="right">{row.error_calls.toLocaleString()}</TableCell>
                <TableCell align="right">{formatPercent(row.success_rate)}</TableCell>
                <TableCell align="right">{formatMs(row.avg_latency_ms)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <SectionCard title="Tool traffic" subtitle="Per-tool call volume, reliability, and latency">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Server</TableCell>
              <TableCell>Tool</TableCell>
              <TableCell align="right">Calls</TableCell>
              <TableCell align="right">Errors</TableCell>
              <TableCell align="right">Success rate</TableCell>
              <TableCell align="right">Avg latency</TableCell>
              <TableCell align="right">P95 latency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.tool_traffic.map((row) => (
              <TableRow key={row.canonical_name}>
                <TableCell>{row.mcp_server_name}</TableCell>
                <TableCell>
                  <code>{row.tool_name}</code>
                </TableCell>
                <TableCell align="right">{row.total_calls.toLocaleString()}</TableCell>
                <TableCell align="right">{row.error_calls.toLocaleString()}</TableCell>
                <TableCell align="right">{formatPercent(row.success_rate)}</TableCell>
                <TableCell align="right">{formatMs(row.avg_latency_ms)}</TableCell>
                <TableCell align="right">{formatMs(row.p95_latency_ms)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      {metricsEndpoint ? (
        <Typography variant="caption" color="text.secondary">
          Raw Prometheus metrics: <code>{metricsEndpoint}</code>
        </Typography>
      ) : null}
    </Stack>
  );
}
