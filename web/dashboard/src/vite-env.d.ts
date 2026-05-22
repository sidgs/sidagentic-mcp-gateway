/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** When BASE_URL is `/`, mirrors the gateway's HTTP_PATH_PREFIX (e.g. /api/v1/sami-mcp-gateway). Leave unset when the UI is deployed under HTTP_PATH_PREFIX. */
  readonly VITE_HTTP_PATH_PREFIX?: string;
  /** When "true", dashboard runs embedded in a parent app (localStorage tenant_id_token auth). */
  readonly VITE_EMBED_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
