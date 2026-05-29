#!/bin/bash

echo "Syncing chart to sidgs-apps namespace"
helm upgrade --install sami-mcp-gateway . -n ${SIDGS_APPS_NAMESPACE:-sami-platform} -f values-sami.yaml
echo "Chart synced to sidgs-apps namespace"