import type { DashboardLineageEdge, DashboardLineageNode, DashboardLineageResponse } from "@/lib/types";

export const LINEAGE_FILTER_ALL = "all";

export type LineageFilters = {
  agent: string;
  server: string;
  tool: string;
};

export type LineageFilterField = keyof LineageFilters;

export const EMPTY_LINEAGE_FILTERS: LineageFilters = {
  agent: LINEAGE_FILTER_ALL,
  server: LINEAGE_FILTER_ALL,
  tool: LINEAGE_FILTER_ALL,
};

type TraversalMode = "agent" | "server" | "tool";

const OUTBOUND_BY_MODE: Record<TraversalMode, Record<string, readonly string[]>> = {
  agent: {
    agent_app: ["attaches", "invokes"],
    tool_group: ["includes_tool", "includes_server", "routes_to"],
    server: ["provides"],
    tool: [],
  },
  server: {
    agent_app: [],
    tool_group: ["includes_tool", "routes_to"],
    server: ["provides"],
    tool: [],
  },
  tool: {
    agent_app: [],
    tool_group: [],
    server: [],
    tool: [],
  },
};

const INBOUND_BY_MODE: Record<TraversalMode, Record<string, readonly string[]>> = {
  agent: {
    agent_app: [],
    tool_group: [],
    server: [],
    tool: [],
  },
  server: {
    agent_app: ["attaches"],
    tool_group: ["attaches", "includes_server"],
    server: ["includes_server"],
    tool: ["includes_tool", "provides", "invokes", "routes_to"],
  },
  tool: {
    agent_app: [],
    tool_group: ["attaches"],
    server: ["includes_server"],
    tool: ["includes_tool", "provides", "invokes", "routes_to"],
  },
};

function toKindSet(values: readonly string[]): Set<string> {
  return new Set(values);
}

function expandFromSeeds(
  nodes: DashboardLineageNode[],
  edges: DashboardLineageEdge[],
  seeds: string[],
  mode: TraversalMode,
): Set<string> {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const outboundKinds = OUTBOUND_BY_MODE[mode];
  const inboundKinds = INBOUND_BY_MODE[mode];
  const visible = new Set<string>();
  const queue = [...seeds];

  while (queue.length > 0) {
    const id = queue.pop();
    if (!id || visible.has(id)) {
      continue;
    }
    visible.add(id);

    const node = nodeById.get(id);
    if (!node) {
      continue;
    }

    const allowedOut = toKindSet(outboundKinds[node.kind] ?? []);
    const allowedIn = toKindSet(inboundKinds[node.kind] ?? []);

    for (const edge of edges) {
      if (edge.source === id && allowedOut.has(edge.kind) && !visible.has(edge.target)) {
        queue.push(edge.target);
      }
      if (edge.target === id && allowedIn.has(edge.kind) && !visible.has(edge.source)) {
        queue.push(edge.source);
      }
    }
  }

  return visible;
}

function intersectSets(a: Set<string>, b: Set<string>): Set<string> {
  const out = new Set<string>();
  for (const value of a) {
    if (b.has(value)) {
      out.add(value);
    }
  }
  return out;
}

function sliceLineage(
  data: DashboardLineageResponse,
  visible: Set<string>,
): DashboardLineageResponse {
  const nodes = data.nodes.filter((node) => visible.has(node.id));
  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = data.edges.filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target));

  return {
    ...data,
    nodes,
    edges,
    empty_state:
      nodes.length === 0
        ? {
            title: "No matching lineage",
            description: "Try clearing one or more filters to see broader connections.",
          }
        : undefined,
  };
}

export function filterLineage(data: DashboardLineageResponse, filters: LineageFilters): DashboardLineageResponse {
  const { agent, server, tool } = filters;
  if (agent === LINEAGE_FILTER_ALL && server === LINEAGE_FILTER_ALL && tool === LINEAGE_FILTER_ALL) {
    return data;
  }

  let visible: Set<string> | null = null;

  function applyFilter(kind: DashboardLineageNode["kind"], selected: string, mode: TraversalMode) {
    if (selected === LINEAGE_FILTER_ALL) {
      return;
    }
    const seeds = data.nodes.filter((node) => node.kind === kind && node.id === selected).map((node) => node.id);
    if (seeds.length === 0) {
      visible = new Set();
      return;
    }
    const scoped = expandFromSeeds(data.nodes, data.edges, seeds, mode);
    visible = visible === null ? scoped : intersectSets(visible, scoped);
  }

  applyFilter("agent_app", agent, "agent");
  applyFilter("server", server, "server");
  applyFilter("tool", tool, "tool");

  const result = visible ?? new Set<string>();
  if (result.size === 0) {
    return sliceLineage(data, new Set());
  }

  return sliceLineage(data, result);
}

export function filterOptionsForField(
  data: DashboardLineageResponse,
  filters: LineageFilters,
  kind: DashboardLineageNode["kind"],
  field: LineageFilterField,
): DashboardLineageNode[] {
  const scopedFilters: LineageFilters = {
    agent: field === "agent" ? LINEAGE_FILTER_ALL : filters.agent,
    server: field === "server" ? LINEAGE_FILTER_ALL : filters.server,
    tool: field === "tool" ? LINEAGE_FILTER_ALL : filters.tool,
  };
  const scoped = filterLineage(data, scopedFilters);
  return scoped.nodes
    .filter((node) => node.kind === kind)
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function hasActiveLineageFilters(filters: LineageFilters): boolean {
  return (
    filters.agent !== LINEAGE_FILTER_ALL ||
    filters.server !== LINEAGE_FILTER_ALL ||
    filters.tool !== LINEAGE_FILTER_ALL
  );
}

export function activeLineageFilterLabels(data: DashboardLineageResponse, filters: LineageFilters): string[] {
  const labels: string[] = [];
  if (filters.agent !== LINEAGE_FILTER_ALL) {
    const node = data.nodes.find((entry) => entry.id === filters.agent);
    if (node) {
      labels.push(`Agent: ${node.label}`);
    }
  }
  if (filters.server !== LINEAGE_FILTER_ALL) {
    const node = data.nodes.find((entry) => entry.id === filters.server);
    if (node) {
      labels.push(`Server: ${node.label}`);
    }
  }
  if (filters.tool !== LINEAGE_FILTER_ALL) {
    const node = data.nodes.find((entry) => entry.id === filters.tool);
    if (node) {
      labels.push(`Tool: ${node.label}`);
    }
  }
  return labels;
}

export function lineageFilterKey(filters: LineageFilters): string {
  return `${filters.agent}|${filters.server}|${filters.tool}`;
}
