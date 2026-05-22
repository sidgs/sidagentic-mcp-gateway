import { CSSProperties } from 'react';
import { AppSection } from './lib/types';
export interface MCPGatewayDashboardProps {
    /** Cognito/OIDC JWT. When omitted, falls back to `localStorage.tenant_id_token`. */
    token?: string;
    /** Tenant id for `X-Tenant-ID`. When omitted, parsed from the JWT when possible. */
    tenantId?: string;
    /** Gateway HTTP path prefix (e.g. `/api/v1/sami-mcp-gateway`). */
    httpPathPrefix?: string;
    /** Initial section when the URL hash is absent. Defaults to `servers`. */
    defaultSection?: AppSection;
    className?: string;
    style?: CSSProperties;
}
export declare function MCPGatewayDashboard({ token, tenantId, httpPathPrefix, defaultSection, className, style, }: MCPGatewayDashboardProps): import("react/jsx-runtime").JSX.Element;
