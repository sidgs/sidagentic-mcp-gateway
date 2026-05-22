# @sami/mcp-gateway-dashboard-react

Use the MCP Gateway dashboard as a React component inside your application.

## Install

```bash
npm install @sami/mcp-gateway-dashboard-react
```

Peer dependencies: `react` and `react-dom` ^18.

## Usage

```tsx
import { MCPGatewayDashboard } from "@sami/mcp-gateway-dashboard-react";
import "@sami/mcp-gateway-dashboard-react/style.css";

function AdminPage() {
  return (
    <div style={{ height: "80vh" }}>
      <MCPGatewayDashboard
        token={cognitoIdToken}
        tenantId="my-tenant"
        httpPathPrefix="/api/v1/sami-mcp-gateway"
        defaultSection="servers"
      />
    </div>
  );
}
```

### Props

| Prop | Required | Description |
|------|----------|-------------|
| `token` | No* | Cognito/OIDC JWT (`Authorization: Bearer`). Falls back to `localStorage.tenant_id_token`. |
| `tenantId` | No | Sent as `X-Tenant-ID`. Parsed from JWT when omitted. |
| `httpPathPrefix` | No | Gateway mount prefix (e.g. `/api/v1/sami-mcp-gateway`). |
| `defaultSection` | No | Initial section when URL hash is absent. Default: `servers`. |
| `className` | No | Wrapper class name. |
| `style` | No | Wrapper inline styles (set `height` for layout). |

Component mode does not modify the parent page URL hash — section navigation is kept in React state only.

\*Required unless `localStorage.tenant_id_token` is already set.

## Gateway configuration

The gateway must validate Bearer JWTs (Cognito OIDC) and allow your app's origin:

```bash
COGNITO_ISSUER_URL=…
COGNITO_CLIENT_ID=…
COGNITO_CLIENT_SECRET=…
DASHBOARD_EMBED_ALLOWED_ORIGINS=https://your-app.example.com
```

## Build from source

```bash
cd web/dashboard-react
npm run build
```

## Publish

```bash
cd web/dashboard-react
npm publish --access restricted
```

## Static iframe embed

For iframe/static hosting without React integration, use `@sami/mcp-gateway-dashboard-embed` instead.
