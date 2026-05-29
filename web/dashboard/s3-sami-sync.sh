npm ci
export VITE_HTTP_PATH_PREFIX="/api/v1/sami-mcp-gateway"
npm run build
aws s3 sync dist s3://cdn.mysami.io/portal/apps/mcp-gateway-dashboard --delete --profile sami-saas-prod