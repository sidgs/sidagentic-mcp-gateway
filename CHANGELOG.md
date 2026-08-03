# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.17.0] - 2026-08-02

### Added

- Multi-tenant dashboard and API with platform administrator support, tenant switching, and Cognito OIDC login.
- Dashboard RBAC with roles, teams, and scoped visibility for servers, tools, and related assets.
- Skills catalog API with skill sets, agent-app attachments, batch import, lifecycle management, and full dashboard CRUD flows.
- Dashboard observability and lineage views for tool invocation metrics and agent/tool relationships.
- MCP server re-registration from the dashboard and CLI.
- REST and OpenAPI upstream exposure as MCP tools.
- Redis pub/sub registry sync for consistent multi-replica proxy state.
- Flyway-based Postgres schema management (replaces GORM AutoMigrate).
- Kafka-based email notifications with configurable dashboard deep links.
- Tool group server inclusion/exclusion options and enhanced group MCP proxy security options.
- SAMI AI CapStack dashboard rebrand with skills-forward home page.

### Changed

- Project rebranded and repackaged as SAMI MCP Gateway (`sami.io/mcpgateway`).
- Dashboard reads (overview, servers, tools, prompts, resources, observability, lineage) are scoped to the active tenant.
- Docker Compose and Helm chart default image tags updated to `1.17.0`.

### Fixed

- Dashboard tenant isolation: list endpoints no longer leak assets from other tenants.
- Dashboard server inventory query error (`column "server_id" does not exist`) caused by reused GORM sessions across tables.
- Tenant membership resolution by email on login.
- Skills API returns full catalog details on tenant skill set list.
- Dashboard duplicate skill route handling and form data mapping.
- Reachable HTTP/SSE servers show a green status badge in the dashboard.

### Migration notes

- **Database:** Run the Flyway migrate image (`sami-mcp-gateway-migrate:1.17.0`) before upgrading the API. Existing deployments using GORM AutoMigrate must migrate to Flyway-managed schema (`db/migration/`).
- **Multi-tenant:** Set `DEFAULT_TENANT_ID` and ensure existing rows are backfilled (see `V2__data_backfills.sql`). Dashboard mutations and reads require a tenant context (`X-Tenant-ID` or JWT `tenant_id` claim).
- **Redis:** Recommended for OIDC session storage and registry sync when running more than one replica (`REDIS_URL`, `REGISTRY_SYNC_*`).

### Deployment

- Docker image tag: `sidgs.jfrog.io/sami/sami-mcp-gateway:1.17.0`
- Migrate image tag: `sidgs.jfrog.io/sami/sami-mcp-gateway-migrate:1.17.0`
- Helm chart `appVersion`: `1.17.0`
- Image digest: manual (build and push with `make build-push IMAGE_TAG=1.17.0` after tagging)
