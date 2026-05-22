# @sami/mcp-gateway-dashboard-embed

Static assets for embedding the MCP Gateway dashboard inside a parent web application.

## Prerequisites

The parent app must set a Cognito/OIDC ID token in `localStorage` before loading the embed:

```js
localStorage.setItem("tenant_id_token", cognitoIdToken);
```

The JWT should include standard claims such as `email` and `tenant_id` (or Cognito `custom:tenant_id`).

The MCP Gateway must have Cognito OIDC enabled and allow the parent app's origin:

```bash
COGNITO_ISSUER_URL=…
COGNITO_CLIENT_ID=…
COGNITO_CLIENT_SECRET=…
DASHBOARD_EMBED_ALLOWED_ORIGINS=https://your-parent-app.example.com
```

## Install

```bash
npm install @sami/mcp-gateway-dashboard-embed
```

## Serve

Copy or serve the `dist/` folder from this package (for example with your static file server or CDN):

```bash
npx serve node_modules/@sami/mcp-gateway-dashboard-embed/dist
```

## Embed in an iframe

```html
<iframe
  src="https://your-cdn.example.com/index.html#/servers"
  title="MCP Gateway Dashboard"
  style="width: 100%; height: 100%; border: 0;"
></iframe>
```

The embed build defaults to `#/servers` when no hash is present. API calls go to the gateway at `VITE_HTTP_PATH_PREFIX` (built as `/api/v1/sami-mcp-gateway` unless overridden at build time).

## Build from source

From the repository root:

```bash
cd web/dashboard-embed
npm run build
```

## Publish

```bash
cd web/dashboard-embed
npm publish --access restricted
```

Adjust registry and access level for your organization.

## React component embed

To mount the dashboard inside another React app (not an iframe), use `@sami/mcp-gateway-dashboard-react`. See [web/dashboard-react/README.md](../dashboard-react/README.md).
