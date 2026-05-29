import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { CSSProperties } from "react";
import App from "./App";
import { DashboardRuntimeProvider } from "./DashboardRuntimeProvider";
import type { AppSection } from "./lib/types";
import { appTheme } from "./theme";

export interface MCPGatewayDashboardProps {
  /** Cognito/OIDC JWT. When omitted, falls back to `localStorage.tenant_id_token`. */
  token?: string;
  /** Tenant id for `X-Tenant-ID`. When omitted, parsed from the JWT when possible. */
  tenantId?: string;
  /** Gateway HTTP path prefix (e.g. `/api/v1/sami-mcp-gateway`). */
  httpPathPrefix?: string;
  /** Initial section when the URL hash is absent. Defaults to `servers`. Cannot be `home`. */
  defaultSection?: AppSection;
  className?: string;
  style?: CSSProperties;
}

export function MCPGatewayDashboard({
  token,
  tenantId,
  httpPathPrefix,
  defaultSection = "servers",
  className,
  style,
}: MCPGatewayDashboardProps) {
  return (
    <Box
      className={className}
      style={style}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "600px",
        height: "100%",
      }}
    >
      <DashboardRuntimeProvider
        mode="component"
        token={token}
        tenantId={tenantId}
        httpPathPrefix={httpPathPrefix}
        defaultSection={defaultSection}
      >
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </DashboardRuntimeProvider>
    </Box>
  );
}
