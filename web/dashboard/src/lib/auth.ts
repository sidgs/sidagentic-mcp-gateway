/** Thrown when embed mode cannot read or parse tenant_id_token from localStorage. */
export class EmbedAuthMissingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmbedAuthMissingError";
  }
}

/** Thrown when the gateway requires OIDC sign-in (`login_path` on 401 JSON). */
export class DashboardAuthRequiredError extends Error {
  readonly loginPath: string;

  constructor(loginPath: string) {
    super("authentication required");
    this.name = "DashboardAuthRequiredError";
    this.loginPath = loginPath;
  }
}

export function redirectToGatewayLogin(loginPath: string): void {
  const path = loginPath.startsWith("/") ? loginPath : `/${loginPath}`;
  window.location.assign(path);
}
