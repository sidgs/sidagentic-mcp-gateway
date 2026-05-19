# Dashboard bundle for internal/dashboardui (go:embed prerequisite)
FROM node:20-bookworm-slim AS dashboard-builder

WORKDIR /src/web/dashboard
COPY web/dashboard/package.json web/dashboard/package-lock.json ./
RUN npm ci
COPY web/dashboard/ ./
# @repo-assets in vite.config resolves to ../../assets → /src/assets in this image (may be empty).
RUN mkdir -p /src/assets

ARG VITE_DASHBOARD_BASE=
ENV VITE_DASHBOARD_BASE=$VITE_DASHBOARD_BASE

RUN npm run build

# Phase 1 — Go builder (CGO disabled for Linux, matching .goreleaser builds)
FROM golang:1.24.3-bookworm AS builder

ARG VERSION=dev

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN rm -rf internal/dashboardui/dist
COPY --from=dashboard-builder /src/web/dashboard/dist ./internal/dashboardui/dist

RUN CGO_ENABLED=0 go build -trimpath \
	-ldflags="-s -w -X sami.io/mcpgateway/pkg/version.Version=${VERSION}" \
	-o /sami-mcp-gateway .

# Phase 2 — runtime
FROM gcr.io/distroless/base

# OCI image labels
# LABEL org.opencontainers.image.source="https://sami.io/mcpgateway"
# LABEL org.opencontainers.image.description="SAMI MCP Gateway - Self-hosted MCP Gateway for developers and enterprises"
# LABEL org.opencontainers.image.title="SAMI MCP Gateway"
# LABEL org.opencontainers.image.vendor="sidglobal"

COPY --from=builder /sami-mcp-gateway /sami-mcp-gateway

EXPOSE 8080
ENTRYPOINT ["/sami-mcp-gateway"]

# Run the Registry Server by default
CMD ["start"]
