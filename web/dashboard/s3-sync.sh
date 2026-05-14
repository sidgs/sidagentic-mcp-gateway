npm ci
npm run build
aws s3 sync dist s3://sami-x-apps/staging/apps/mcp-gateway-dashboard --delete --profile sidgs