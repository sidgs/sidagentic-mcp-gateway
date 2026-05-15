#!/bin/bash

echo "Syncing chart to sidgs-apps namespace"
helm upgrade --install sami-mcp-gateway . -n sidgs-apps -f values-sid-agentic.yaml
echo "Chart synced to sidgs-apps namespace"