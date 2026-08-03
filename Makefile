# SAMI MCP Gateway — build, publish, and deploy helpers.
#
# Examples:
#   make build-push IMAGE_TAG=1.2.3
#   make build-push IMAGE_TAG=1.2.3-stdio
#   make s3-sync
#   make chart-sync
#   make rolling-restart

SHELL := /usr/bin/env bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help

REGISTRY          ?= sidgs.jfrog.io/sami
IMAGE_NAME        ?= sami-mcp-gateway
MIGRATE_IMAGE_NAME ?= sami-mcp-gateway-migrate
IMAGE_TAG         ?= latest-stdio
VERSION           ?= $(shell git describe --tags --always --dirty 2>/dev/null | sed 's/^release\///; s/^v//' || echo dev)
PLATFORM          ?= linux/amd64
DOCKER            ?= docker

IMAGE          := $(REGISTRY)/$(IMAGE_NAME)
MIGRATE_IMAGE  := $(REGISTRY)/$(MIGRATE_IMAGE_NAME)
BINARY         := sami-mcp-gateway

CHART_DIR            ?= charts/mcp-gateway
HELM_RELEASE         ?= sami-mcp-gateway
SIDGS_APPS_NAMESPACE ?= sidgs-apps
HELM_VALUES          ?= values-sid-agentic.yaml

DASHBOARD_DIR           ?= web/dashboard
VITE_HTTP_PATH_PREFIX   ?= /api/v1/sami-mcp-gateway
AWS_PROFILE             ?= sidgs
S3_DASHBOARD_URI        ?= s3://sami-x-apps/staging/apps/mcp-gateway-dashboard

SAMI_NAMESPACE     ?= sami-platform
SAMI_HELM_VALUES   ?= values-sami.yaml
SAMI_AWS_PROFILE   ?= sami-saas-prod
SAMI_S3_DASHBOARD_URI ?= s3://cdn.mysami.io/portal/apps/mcp-gateway-dashboard

GO_LDFLAGS := -s -w -X sami.io/mcpgateway/pkg/version.Version=$(VERSION)

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage: make \033[36m<target>\033[0m [VAR=value ...]\n\nTargets:\n"} \
		/^[a-zA-Z0-9_.-]+:.*##/ { printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@printf "\nCommon variables:\n"
	@printf "  IMAGE_TAG=%s  VERSION=%s  PLATFORM=%s\n" "$(IMAGE_TAG)" "$(VERSION)" "$(PLATFORM)"
	@printf "  SIDGS_APPS_NAMESPACE=%s  HELM_VALUES=%s\n\n" "$(SIDGS_APPS_NAMESPACE)" "$(HELM_VALUES)"

.PHONY: build-binary build-dashboard
build-dashboard: ## Build embedded dashboard UI into internal/dashboardui/dist
	./scripts/build-dashboard.sh

build-binary: build-dashboard ## Build gateway binary on the host (native OS; requires librdkafka for CGO)
	CGO_ENABLED=1 go build -trimpath \
		-ldflags="$(GO_LDFLAGS)" -o $(BINARY) .

.PHONY: build-image-stdio build-image-api build-image-migrate build-images
build-image-stdio: ## Build stdio runtime image (dashboard + CGO binary inside Docker)
	$(DOCKER) build --platform $(PLATFORM) -f Dockerfile.stdio \
		--build-arg VERSION=$(VERSION) \
		-t $(IMAGE):$(IMAGE_TAG) \
		.

build-image-api: ## Build API-only image (Dockerfile.api; no embedded dashboard)
	$(DOCKER) build --platform $(PLATFORM) -f Dockerfile.api \
		--build-arg VERSION=$(VERSION) \
		-t $(IMAGE):$(IMAGE_TAG)-api \
		.

build-image-migrate: ## Build Flyway migrate image
	$(DOCKER) build --platform $(PLATFORM) -f Dockerfile.migrate \
		-t $(MIGRATE_IMAGE):$(IMAGE_TAG) \
		.

build-images: build-image-stdio build-image-migrate ## Build stdio gateway + migrate images

.PHONY: push-image-stdio push-image-api push-image-migrate push-images push
push-image-stdio: ## Push stdio gateway image
	$(DOCKER) push $(IMAGE):$(IMAGE_TAG)

push-image-api: ## Push API-only gateway image
	$(DOCKER) push $(IMAGE):$(IMAGE_TAG)-api

push-image-migrate: ## Push migrate image
	$(DOCKER) push $(MIGRATE_IMAGE):$(IMAGE_TAG)

push-images: push-image-stdio push-image-migrate ## Push stdio gateway + migrate images

push: push-images ## Alias for push-images

.PHONY: build-push build-push-stdio build-push-api build-push-migrate
build-push-stdio: build-image-stdio push-image-stdio ## Build and push stdio gateway image

build-push-api: build-image-api push-image-api ## Build and push API-only gateway image

build-push-migrate: build-image-migrate push-image-migrate ## Build and push migrate image

build-push: build-push-stdio build-push-migrate ## Build and push stdio gateway + migrate images

.PHONY: s3-sync s3-sync-sami
s3-sync: ## Build dashboard SPA and sync to SIDGS staging S3
	cd $(DASHBOARD_DIR) && npm ci
	cd $(DASHBOARD_DIR) && VITE_HTTP_PATH_PREFIX="$(VITE_HTTP_PATH_PREFIX)" npm run build
	aws s3 sync $(DASHBOARD_DIR)/dist $(S3_DASHBOARD_URI) --delete --profile $(AWS_PROFILE)

s3-sync-sami: ## Build dashboard SPA and sync to SAMI production CDN
	cd $(DASHBOARD_DIR) && npm ci
	cd $(DASHBOARD_DIR) && VITE_HTTP_PATH_PREFIX="$(VITE_HTTP_PATH_PREFIX)" npm run build
	aws s3 sync $(DASHBOARD_DIR)/dist $(SAMI_S3_DASHBOARD_URI) --delete --profile $(SAMI_AWS_PROFILE)

.PHONY: chart-sync chart-sync-sami
chart-sync: ## Helm upgrade/install to SIDGS apps cluster (values-sid-agentic.yaml)
	cd $(CHART_DIR) && helm upgrade --install $(HELM_RELEASE) . \
		-n $(SIDGS_APPS_NAMESPACE) -f $(HELM_VALUES)

chart-sync-sami: ## Helm upgrade/install to SAMI platform cluster (values-sami.yaml)
	cd $(CHART_DIR) && helm upgrade --install $(HELM_RELEASE) . \
		-n $(SAMI_NAMESPACE) -f $(SAMI_HELM_VALUES)

.PHONY: rolling-restart rolling-restart-sami
rolling-restart: ## Restart gateway deployment after image/chart sync (SIDGS namespace)
	kubectl rollout restart deployment/$(HELM_RELEASE) -n $(SIDGS_APPS_NAMESPACE)
	kubectl rollout status deployment/$(HELM_RELEASE) -n $(SIDGS_APPS_NAMESPACE) --timeout=300s

rolling-restart-sami: ## Restart gateway deployment in SAMI platform namespace
	kubectl rollout restart deployment/$(HELM_RELEASE) -n $(SAMI_NAMESPACE)
	kubectl rollout status deployment/$(HELM_RELEASE) -n $(SAMI_NAMESPACE) --timeout=300s

.PHONY: clean
clean: ## Remove local build artifacts
	rm -f $(BINARY)
