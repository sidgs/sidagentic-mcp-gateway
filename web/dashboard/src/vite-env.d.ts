/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** When BASE_URL is `/`, mirrors the gateway's HTTP_PATH_PREFIX (e.g. /api/v1/sami-mcp-gateway). Leave unset when the UI is deployed under HTTP_PATH_PREFIX. */
  readonly VITE_HTTP_PATH_PREFIX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
