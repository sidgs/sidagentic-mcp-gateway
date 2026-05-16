import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const rawBase = (env.VITE_DASHBOARD_BASE ?? "").trim();
  const dashboardBase = rawBase === "" ? "./" : rawBase.replace(/\/?$/, "/");

  const proxy: Record<string, { target: string; changeOrigin: boolean }> = {};
  if (rawBase === "") {
    proxy["/api"] = { target: "http://localhost:8080", changeOrigin: false };
    // Dashboard JSON API when HTTP_PATH_PREFIX is unset (same host root as Vite script).
    proxy["/dashboard"] = { target: "http://localhost:8080", changeOrigin: true };
  } else {
    const prefix = rawBase.replace(/\/$/, "");
    proxy[`^${prefix}`] = { target: "http://localhost:8080", changeOrigin: true };
  }

  return {
    base: dashboardBase,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@repo-assets": path.resolve(__dirname, "../../assets"),
      },
    },
    server: {
      port: 5173,
      fs: {
        allow: [path.resolve(__dirname, "../..")],
      },
      proxy,
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
