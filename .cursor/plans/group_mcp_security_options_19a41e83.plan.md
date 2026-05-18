---
name: Group MCP security options
overview: Add a per-group `security_option` on tool groups and prompt groups (`open`, `api_key`, `basic`, `bearer`), enforce it on all `/v0/groups/:name/*` and `/v0/prompt-groups/:name/*` MCP routes (including dev mode), and extend MCP proxy authorization/filtering so "open" groups work in enterprise without credentials while agent-app modes validate group membership and return 401 on failure.
todos:
  - id: model-types
    content: Add SecurityOption to ToolGroup/PromptGroup models, pkg/types, validation in toolgroup/promptgroup services
    status: completed
  - id: ctx-open-flag
    content: Add mcpgatewayctx open-group flag; adjust ProxyToolFilter + authorizeProxyServerAccess
    status: completed
  - id: middleware-groups
    content: Implement checkAuthForGroupMcpProxyAccess; wire server.go group routes; keep global /mcp behavior
    status: completed
  - id: api-dashboard
    content: Expose security_option on admin + dashboard handlers; dashboard UI select
    status: completed
  - id: tests
    content: middleware + proxy tests for all four modes and dev enforcement
    status: completed
isProject: false
---

# Per-group MCP security (tool + prompt groups)

## Current behavior (baseline)

- [`internal/api/middleware.go`](internal/api/middleware.go) — `checkAuthForMcpProxyAccess()` skips all MCP auth in **dev**; in **enterprise** it requires `Authorization` and supports Basic + Bearer (legacy `McpClient` token first, then agent-app JWT). Group routes inject tool/prompt group name via [`internal/mcpgatewayctx/group_route.go`](internal/mcpgatewayctx/group_route.go).
- [`internal/service/mcp/proxy_filter.go`](internal/service/mcp/proxy_filter.go) + [`internal/service/mcp/proxy.go`](internal/service/mcp/proxy.go) — In enterprise, tool calls require either an `McpClient` with server access or an agent-app `Principal` whose allow-list includes the route’s group.

## Target behavior

| `security_option` | What to accept | Group allow check |
|------------------|----------------|-------------------|
| `open` | No credentials | N/A |
| `api_key` | `x-api-key` equals agent-app `client_id` | App enabled and group name in app’s `tool_group_names` / `prompt_group_names` |
| `basic` | `Authorization: Basic <base64(client_id:client_secret)>` (RFC 7617; scheme is case-insensitive, not a literal `BASIC` prefix) | Same as today (secret check + principal allow-list) |
| `bearer` | `Authorization: Bearer <token>` **only** agent-app JWT via existing [`agentapp.Service.ResolvePrincipalFromBearerJWT`](internal/service/agentapp/agentapp.go) — **no** legacy opaque `McpClient` lookup on these routes | Principal allow-list |

On any mismatch (wrong scheme, missing header, unknown app, disabled app, or group not allowed): **401** (consistent with your spec).

**Breaking change (explicit):** Legacy MCP client Bearer tokens will **no longer** authenticate tool-group / prompt-group URLs when the group’s option is `bearer` (they were previously accepted in enterprise before agent-app JWT was tried). They continue to work on the global `/mcp` and `/sse` routes unchanged.

## Data model and API surface

1. **Model** — Add a string field to [`internal/model/tool_group.go`](internal/model/tool_group.go) and [`internal/model/prompt_group.go`](internal/model/prompt_group.go), e.g. `SecurityOption` with GORM tag `size:32;not null;default:basic` (see “Default” below). Define typed constants in `model` or `pkg/types` (`open`, `api_key`, `basic`, `bearer`) and validate on create/update in [`internal/service/toolgroup/toolgroup.go`](internal/service/toolgroup/toolgroup.go) / [`internal/service/promptgroup/promptgroup.go`](internal/service/promptgroup/promptgroup.go).
2. **Public types** — Extend [`pkg/types/tool_group.go`](pkg/types/tool_group.go) and [`pkg/types/prompt_group.go`](pkg/types/prompt_group.go) so admin and dashboard JSON includes `security_option`.
3. **Migration** — Rely on existing `AutoMigrate` in [`internal/migrations/migration.go`](internal/migrations/migration.go); new column backfills with default for existing rows.
4. **Default** — Recommend **`basic`** as the column default so existing agent-app Basic flows keep working without requiring `AGENT_APP_JWT_SIGNING_KEY`. Operators who want JWT-only on a group set `security_option` to `bearer`.

## HTTP middleware (group MCP routes only)

1. **New middleware** (e.g. `checkAuthForGroupMcpProxyAccess(isToolGroup bool)`) registered on the six route patterns in [`internal/api/server.go`](internal/api/server.go) (`/mcp`, `/sse`, `/message` × tool + prompt groups), **replacing** `checkAuthForMcpProxyAccess` on those routes only.
2. **Always enforce** (dev and enterprise): remove the early `ModeDev` bypass for these routes.
3. **Flow**:
   - Load group by `c.Param("name")` + tenant (`toolGroupService.GetToolGroup` / `promptGroupService.GetPromptGroup`). If missing → **404** (same as handlers today).
   - `injectMCPGroupRouteContext` (move/split from today’s `injectMCPGroupRouteContext` so group name is always set for downstream proxy).
   - Switch on `group.SecurityOption`:
     - **open** — Set a new context flag (e.g. `mcpgatewayctx.WithOpenGroupMCP(ctx, true)`) and `c.Next()` without principal/client.
     - **api_key** — Read `x-api-key`; `GetByClientID`; require enabled; verify group name in app’s JSON lists (reuse unmarshaling from [`model.AgentApp`](internal/model/agent_app.go)); build principal via `PrincipalForApp`; inject principal.
     - **basic** — Parse Basic header (reuse `parseMCPBasicAuth`); `ResolvePrincipalFromBasic`; verify `AllowsToolGroup` / `AllowsPromptGroup`.
     - **bearer** — Require JWT path only: if `!agentAppService.JWTConfigured()` → **503** with clear JSON; else `ResolvePrincipalFromBearerJWT`; verify allow-list.
4. Keep **`checkAuthForMcpProxyAccess`** for global `/mcp`, `/sse`, `/message` unchanged (including dev bypass and legacy Bearer for `McpClient`).

Optional hygiene: drop `agentAppAllowedMCPFullPath` checks from the **global** middleware paths where they only existed to constrain agent-app traffic, or leave them if still needed for global `/mcp` (review when implementing).

## MCP proxy authorization and tool listing

1. **Context** — Add `OpenGroupMCP` (or similar) helpers in [`internal/mcpgatewayctx/group_route.go`](internal/mcpgatewayctx/group_route.go).
2. **`authorizeProxyServerAccess`** in [`internal/service/mcp/proxy.go`](internal/service/mcp/proxy.go) — If enterprise **and** open-group flag **and** request is on a tool- or prompt-group route, return `nil` (allow upstream server access for tools/prompts already registered on that group server).
3. **`ProxyToolFilter`** in [`internal/service/mcp/proxy_filter.go`](internal/service/mcp/proxy_filter.go) — If enterprise **and** open-group flag **and** `ToolGroupRoute` set, return the same tenant-qualified tool pass-through as dev (today’s lines 19–29), since the group server already limits registered tools.

Prompt-group servers register a subset of prompts; confirm analogous listing/filter path (if a prompt filter exists parallel to `ProxyToolFilter`, apply the same open-group behavior; if prompts are fixed at server build time only, `authorizeProxyServerAccess` may be sufficient).

## Dashboard + admin API

- Thread `security_option` through create/get/list/update for tool and prompt groups: [`internal/api/tool_groups.go`](internal/api/tool_groups.go), [`internal/api/prompt_groups.go`](internal/api/prompt_groups.go), [`internal/api/dashboard_tool_groups.go`](internal/api/dashboard_tool_groups.go), [`internal/api/dashboard_prompt_groups.go`](internal/api/dashboard_prompt_groups.go).
- UI: add a single-select on group forms in [`web/dashboard`](web/dashboard) (types in [`web/dashboard/src/lib/types.ts`](web/dashboard/src/lib/types.ts), API in [`web/dashboard/src/lib/api.ts`](web/dashboard/src/lib/api.ts)).

## Tests

- Extend [`internal/api/middleware_test.go`](internal/api/middleware_test.go) for each mode on a representative group route: open (no headers), api_key (allowed + denied group), basic (good + bad secret), bearer (valid JWT + invalid token + JWT not configured → 503).
- Add/adjust proxy tests if `authorizeProxyServerAccess` / `ProxyToolFilter` behavior changes.

## Documentation / release note

- Short note in README or API overview: new field, defaults, and legacy Bearer no longer valid on group URLs when using `bearer` (and global `/mcp` unchanged).
