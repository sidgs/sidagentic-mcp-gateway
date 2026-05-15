npm ci
export VITE_HTTP_PATH_PREFIX="/api/v1/sami-mcp-gateway"
npm run build
aws s3 sync dist s3://sami-x-apps/staging/apps/mcp-gateway-dashboard --delete --profile sidgs