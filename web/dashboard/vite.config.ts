import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (mode === "lib") {
    return {
      plugins: [
        react(),
        dts({
          entryRoot: "src",
          include: ["src/component.tsx", "src/MCPGatewayDashboard.tsx", "src/lib/types.ts"],
          rollupTypes: true,
          tsconfigPath: "./tsconfig.json",
        }),
      ],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@repo-assets": path.resolve(__dirname, "../../assets"),
        },
      },
      build: {
        outDir: "dist-lib",
        emptyOutDir: true,
        lib: {
          entry: path.resolve(__dirname, "src/component.tsx"),
          name: "MCPGatewayDashboard",
          formats: ["es", "cjs"],
          fileName: (format) => `mcp-gateway-dashboard.${format === "es" ? "js" : "cjs"}`,
        },
        rollupOptions: {
          external: ["react", "react-dom", "react/jsx-runtime"],
          output: {
            assetFileNames: "mcp-gateway-dashboard[extname]",
          },
        },
      },
    };
  }

  const rawBase = (env.VITE_DASHBOARD_BASE ?? "").trim();
  const dashboardBase = rawBase === "" ? "./" : rawBase.replace(/\/?$/, "/");

  const proxy: Record<string, { target: string; changeOrigin: boolean }> = {};
  if (rawBase === "") {
    proxy["/api"] = { target: "http://localhost:8080", changeOrigin: false };
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
      outDir: mode === "embed" ? "dist-embed" : "dist",
      emptyOutDir: true,
    },
  };
});
