import { useEffect, useMemo, useState } from "react";
import Dagre from "@dagrejs/dagre";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { DashboardLineageEdge, DashboardLineageNode, DashboardLineageResponse } from "@/lib/types";
import {
  activeLineageFilterLabels,
  EMPTY_LINEAGE_FILTERS,
  filterLineage,
  filterOptionsForField,
  hasActiveLineageFilters,
  lineageFilterKey,
  LINEAGE_FILTER_ALL,
  type LineageFilters,
} from "@/lib/lineageFilter";
import { EmptyStateCard } from "@/components/EmptyStateCard";
import { SectionCard } from "@/components/SectionCard";

const NODE_WIDTH = 196;
const NODE_HEIGHT = 64;
const GRAPH_EXPANDED_STORAGE_KEY = "dashboard-lineage-graph-expanded";

type RelationshipRow = {
  fromType: string;
  fromName: string;
  relationship: string;
  toType: string;
  toName: string;
  calls: string;
};

const NODE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  agent_app: { bg: "#e3f2fd", border: "#1976d2", text: "Agent app" },
  tool_group: { bg: "#f3e5f5", border: "#7b1fa2", text: "Tool group" },
  server: { bg: "#e8f5e9", border: "#2e7d32", text: "Server" },
  tool: { bg: "#fff3e0", border: "#ef6c00", text: "Tool" },
};

const EDGE_COLORS: Record<string, string> = {
  attaches: "#5c6bc0",
  includes_tool: "#8e24aa",
  includes_server: "#8e24aa",
  provides: "#9e9e9e",
  invokes: "#d84315",
  routes_to: "#fb8c00",
};

const EDGE_LABELS: Record<string, string> = {
  attaches: "attached to",
  includes_tool: "includes tool",
  includes_server: "includes server",
  provides: "provides",
  invokes: "invokes",
  routes_to: "routes to",
};

function kindLabel(kind: string): string {
  return NODE_COLORS[kind]?.text ?? kind.replace(/_/g, " ");
}

function layoutGraph(nodes: Node[], edges: Edge[]): Node[] {
  if (nodes.length === 0) {
    return nodes;
  }

  const graph = new Dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: nodes.length <= 8 ? "TB" : "LR",
    nodesep: 56,
    ranksep: 88,
    marginx: 32,
    marginy: 32,
  });

  for (const node of nodes) {
    graph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  }
  for (const edge of edges) {
    graph.setEdge(edge.source, edge.target);
  }

  Dagre.layout(graph);

  return nodes.map((node) => {
    const layoutNode = graph.node(node.id);
    return {
      ...node,
      position: {
        x: layoutNode.x - NODE_WIDTH / 2,
        y: layoutNode.y - NODE_HEIGHT / 2,
      },
    };
  });
}

function humanEdgeLabel(edge: DashboardLineageEdge): string {
  const base = EDGE_LABELS[edge.kind] ?? edge.kind.replace(/_/g, " ");
  if ((edge.weight ?? 0) > 0) {
    return `${base} (${edge.weight} calls)`;
  }
  return base;
}

function toFlowGraph(data: DashboardLineageResponse): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = data.nodes.map((node) => {
    const colors = NODE_COLORS[node.kind] ?? { bg: "#f5f5f5", border: "#757575", text: node.kind };
    const subtitle =
      node.kind === "tool" && node.meta?.server
        ? `${node.meta.server} · tool`
        : node.kind === "agent_app" && node.meta?.client_id
          ? node.meta.client_id
          : kindLabel(node.kind);

    return {
      id: node.id,
      data: {
        label: (
          <Box sx={{ textAlign: "center", px: 0.5 }}>
            <Typography variant="caption" sx={{ display: "block", color: "text.secondary", lineHeight: 1.2 }}>
              {subtitle}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
              {node.label}
            </Typography>
          </Box>
        ),
      },
      position: { x: 0, y: 0 },
      style: {
        width: NODE_WIDTH,
        border: `2px solid ${colors.border}`,
        backgroundColor: colors.bg,
        borderRadius: 14,
        fontSize: 12,
        padding: 10,
        boxShadow: "0 2px 8px rgba(27,31,36,0.08)",
      },
    };
  });

  const edges: Edge[] = data.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: humanEdgeLabel(edge),
    animated: edge.kind === "invokes" || edge.kind === "routes_to",
    style: {
      stroke: EDGE_COLORS[edge.kind] ?? "#bdbdbd",
      strokeWidth: edge.kind === "invokes" ? 2.5 : 1.5,
    },
    labelStyle: { fontSize: 11, fill: "#424242", fontWeight: 500 },
  }));

  return { nodes: layoutGraph(nodes, edges), edges };
}

function buildRelationshipRows(
  nodes: DashboardLineageNode[],
  edges: DashboardLineageEdge[],
): RelationshipRow[] {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  return edges
    .map((edge) => {
      const from = nodeById.get(edge.source);
      const to = nodeById.get(edge.target);
      if (!from || !to) {
        return null;
      }
      return {
        fromType: kindLabel(from.kind),
        fromName: from.label,
        relationship: humanEdgeLabel(edge),
        toType: kindLabel(to.kind),
        toName: to.label,
        calls: (edge.weight ?? 0) > 0 ? String(edge.weight) : "—",
      };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null)
    .sort((a, b) => {
      const left = `${a.fromType}:${a.fromName}:${a.relationship}`;
      const right = `${b.fromType}:${b.fromName}:${b.relationship}`;
      return left.localeCompare(right);
    });
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function exportRelationshipRowsCsv(rows: RelationshipRow[]): void {
  const header = ["From", "From Type", "Relationship", "To", "To Type", "Calls"];
  const lines = [
    header.join(","),
    ...rows.map((row) =>
      [row.fromName, row.fromType, row.relationship, row.toName, row.toType, row.calls]
        .map(csvEscape)
        .join(","),
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `lineage-relationships-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function readGraphExpandedPreference(): boolean {
  try {
    const saved = window.localStorage.getItem(GRAPH_EXPANDED_STORAGE_KEY);
    if (saved !== null) {
      return saved === "1";
    }
  } catch {
    /* ignore */
  }
  return true;
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: DashboardLineageNode[];
  onChange: (value: string) => void;
}) {
  return (
    <FormControl size="small" sx={{ minWidth: 180, flex: "1 1 180px" }}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={(event) => onChange(event.target.value)}>
        <MenuItem value={LINEAGE_FILTER_ALL}>All</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function LineagePage({
  data,
  loading,
  error,
}: {
  data: DashboardLineageResponse | null;
  loading: boolean;
  error: string | null;
}) {
  const [agentFilter, setAgentFilter] = useState(LINEAGE_FILTER_ALL);
  const [serverFilter, setServerFilter] = useState(LINEAGE_FILTER_ALL);
  const [toolFilter, setToolFilter] = useState(LINEAGE_FILTER_ALL);
  const [graphExpanded, setGraphExpanded] = useState(readGraphExpandedPreference);

  function toggleGraphExpanded() {
    setGraphExpanded((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(GRAPH_EXPANDED_STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const filters = useMemo<LineageFilters>(
    () => ({
      agent: agentFilter,
      server: serverFilter,
      tool: toolFilter,
    }),
    [agentFilter, serverFilter, toolFilter],
  );

  const filterOptions = useMemo(() => {
    if (!data) {
      return { agents: [], servers: [], tools: [] };
    }
    return {
      agents: filterOptionsForField(data, filters, "agent_app", "agent"),
      servers: filterOptionsForField(data, filters, "server", "server"),
      tools: filterOptionsForField(data, filters, "tool", "tool"),
    };
  }, [data, filters]);

  const filteredData = useMemo(() => {
    if (!data) {
      return null;
    }
    return filterLineage(data, filters);
  }, [data, filters]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (agentFilter !== LINEAGE_FILTER_ALL && !filterOptions.agents.some((option) => option.id === agentFilter)) {
      setAgentFilter(LINEAGE_FILTER_ALL);
    }
    if (serverFilter !== LINEAGE_FILTER_ALL && !filterOptions.servers.some((option) => option.id === serverFilter)) {
      setServerFilter(LINEAGE_FILTER_ALL);
    }
    if (toolFilter !== LINEAGE_FILTER_ALL && !filterOptions.tools.some((option) => option.id === toolFilter)) {
      setToolFilter(LINEAGE_FILTER_ALL);
    }
  }, [data, agentFilter, serverFilter, toolFilter, filterOptions]);

  const activeFilters = useMemo(
    () => (data && hasActiveLineageFilters(filters) ? activeLineageFilterLabels(data, filters) : []),
    [data, filters],
  );

  const graph = useMemo(
    () => (filteredData && filteredData.nodes.length > 0 ? toFlowGraph(filteredData) : null),
    [filteredData],
  );

  const relationshipRows = useMemo(
    () => (filteredData ? buildRelationshipRows(filteredData.nodes, filteredData.edges) : []),
    [filteredData],
  );

  if (loading && !data) {
    return (
      <Stack sx={{ alignItems: "center", justifyContent: "center", py: 8 }}>
        <CircularProgress size={28} />
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          Building lineage graph…
        </Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <SectionCard title="Lineage" subtitle="Agent, tool set, server, and tool relationships">
        <Typography color="error">{error}</Typography>
      </SectionCard>
    );
  }

  if (!data?.nodes.length && data?.empty_state) {
    return <EmptyStateCard emptyState={data.empty_state} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
        <Chip size="small" label="Agent app" sx={{ bgcolor: NODE_COLORS.agent_app.bg, border: `1px solid ${NODE_COLORS.agent_app.border}` }} />
        <Chip size="small" label="Tool group" sx={{ bgcolor: NODE_COLORS.tool_group.bg, border: `1px solid ${NODE_COLORS.tool_group.border}` }} />
        <Chip size="small" label="Server" sx={{ bgcolor: NODE_COLORS.server.bg, border: `1px solid ${NODE_COLORS.server.border}` }} />
        <Chip size="small" label="Tool" sx={{ bgcolor: NODE_COLORS.tool.bg, border: `1px solid ${NODE_COLORS.tool.border}` }} />
        {data.usage_window ? (
          <Chip size="small" variant="outlined" label={`Usage overlay: ${data.usage_window}`} sx={{ ml: { sm: "auto" } }} />
        ) : null}
      </Stack>

      <SectionCard
        title="Filters"
        subtitle="Focus the graph and relationship table on a specific agent, server, or tool"
        action={
          hasActiveLineageFilters(filters) ? (
            <Button
              size="small"
              variant="text"
              onClick={() => {
                setAgentFilter(EMPTY_LINEAGE_FILTERS.agent);
                setServerFilter(EMPTY_LINEAGE_FILTERS.server);
                setToolFilter(EMPTY_LINEAGE_FILTERS.tool);
              }}
              sx={{ textTransform: "none", alignSelf: { sm: "flex-start" } }}
            >
              Clear filters
            </Button>
          ) : undefined
        }
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
          <FilterSelect label="Agent app" value={agentFilter} options={filterOptions.agents} onChange={setAgentFilter} />
          <FilterSelect label="Server" value={serverFilter} options={filterOptions.servers} onChange={setServerFilter} />
          <FilterSelect label="Tool" value={toolFilter} options={filterOptions.tools} onChange={setToolFilter} />
        </Stack>
      </SectionCard>

      {filteredData?.empty_state ? (
        <EmptyStateCard emptyState={filteredData.empty_state} />
      ) : (
        <>
          {graph ? (
            <SectionCard
              title="Lineage graph"
              subtitle={`${filteredData?.nodes.length ?? 0} nodes · ${filteredData?.edges.length ?? 0} relationships${
                activeFilters.length > 0 ? ` · ${activeFilters.join(" · ")}` : ""
              }`}
              action={
                <Button
                  size="small"
                  variant="outlined"
                  onClick={toggleGraphExpanded}
                  startIcon={graphExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{ textTransform: "none", alignSelf: { sm: "flex-start" } }}
                >
                  {graphExpanded ? "Collapse graph" : "Expand graph"}
                </Button>
              }
            >
              <Collapse in={graphExpanded} timeout="auto" unmountOnExit>
                <Box sx={{ width: "100%", height: 520, borderRadius: 2, overflow: "hidden", border: 1, borderColor: "divider", bgcolor: "#fafbfc" }}>
                  <ReactFlow
                    key={lineageFilterKey(filters)}
                    nodes={graph.nodes}
                    edges={graph.edges}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    nodesDraggable
                    nodesConnectable={false}
                    elementsSelectable
                    proOptions={{ hideAttribution: true }}
                  >
                    <MiniMap zoomable pannable />
                    <Controls />
                    <Background gap={20} color="#e0e0e0" />
                  </ReactFlow>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
                  Top-to-bottom layout for small graphs; left-to-right for larger ones. Purple edges are configuration; animated edges show observed traffic.
                </Typography>
              </Collapse>
              {!graphExpanded ? (
                <Typography variant="body2" color="text.secondary">
                  Graph hidden. Expand to explore the visual lineage map.
                </Typography>
              ) : null}
            </SectionCard>
          ) : null}

          <SectionCard
            title="Relationship table"
            subtitle={`${relationshipRows.length} relationship${relationshipRows.length === 1 ? "" : "s"}${
              activeFilters.length > 0 ? ` · filtered by ${activeFilters.join(" · ")}` : " · showing all relationships"
            }`}
            action={
              <Button
                size="small"
                variant="outlined"
                disabled={relationshipRows.length === 0}
                onClick={() => exportRelationshipRowsCsv(relationshipRows)}
                startIcon={<DownloadOutlinedIcon />}
                sx={{ textTransform: "none", alignSelf: { sm: "flex-start" } }}
              >
                Export CSV
              </Button>
            }
          >
            {activeFilters.length > 0 ? (
              <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", mb: 1.5 }}>
                {activeFilters.map((label) => (
                  <Chip key={label} size="small" label={label} variant="outlined" />
                ))}
              </Stack>
            ) : null}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Relationship</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Calls</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {relationshipRows.map((row, index) => (
                  <TableRow key={`${row.fromName}-${row.relationship}-${row.toName}-${index}`}>
                    <TableCell>{row.fromName}</TableCell>
                    <TableCell>{row.fromType}</TableCell>
                    <TableCell>{row.relationship}</TableCell>
                    <TableCell>{row.toName}</TableCell>
                    <TableCell>{row.toType}</TableCell>
                    <TableCell align="right">{row.calls}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {relationshipRows.length === 0 ? (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                No relationships match the current filters.
              </Typography>
            ) : null}
          </SectionCard>
        </>
      )}
    </Stack>
  );
}
