#!/bin/bash

echo "Syncing chart to sidgs-apps namespace"
helm upgrade --install sami-mcp-gateway . -n ${SIDGS_APPS_NAMESPACE:-sidgs-apps} -f values-sid-agentic.yaml
echo "Chart synced to sidgs-apps namespace"