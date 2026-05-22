import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { isEmbedMode } from "./lib/embedAuth";
import { setDashboardRuntimeConfig } from "./lib/runtimeConfig";
import "./index.css";
import "./styles.css";
import { appTheme } from "./theme";

function initStandaloneRuntime(): void {
  const embed = isEmbedMode();
  const envPrefix =
    typeof import.meta.env.VITE_HTTP_PATH_PREFIX === "string"
      ? import.meta.env.VITE_HTTP_PATH_PREFIX
      : "";
  setDashboardRuntimeConfig({
    mode: embed ? "embed" : "standalone",
    httpPathPrefix: envPrefix.trim().replace(/\/$/, ""),
    defaultSection: embed ? "servers" : "home",
  });
}

initStandaloneRuntime();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
