import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { AppSection, DashboardAuthStatusResponse, DashboardOverviewResponse } from "@/lib/types";

const benefitItems: Array<{
  icon: typeof HubOutlinedIcon;
  title: string;
  body: string;
}> = [
  {
    icon: HubOutlinedIcon,
    title: "One MCP endpoint",
    body: "Point Claude, Cursor, Copilot, Codex, or your own agents at a single streamable HTTP `/mcp` URL instead of juggling a separate config per server.",
  },
  {
    icon: DnsOutlinedIcon,
    title: "Central registry",
    body: "Register stdio, SSE, and streamable HTTP MCP servers once. The gateway proxies calls, tracks connection health, and keeps your inventory in one Postgres-backed catalog.",
  },
  {
    icon: HandymanOutlinedIcon,
    title: "Unified discovery",
    body: "Tools, prompts, resources, and Agent Skills from every server appear in one dashboard. Toggle exposure per server, tool, prompt, or skill without redeploying clients.",
  },
  {
    icon: AutoStoriesOutlinedIcon,
    title: "Agent Skills catalog",
    body: "Publish versioned Agent Skills with lifecycle and DLC status. Pin active versions into skill sets and expose them alongside MCP tools from a single governance surface.",
  },
  {
    icon: LayersOutlinedIcon,
    title: "Tool & prompt groups",
    body: "Curate subsets of tools and MCP prompts for least-privilege access and dedicated group endpoints—ideal for shared team gateways and scoped automations.",
  },
  {
    icon: AssignmentOutlinedIcon,
    title: "Prompts & resources",
    body: "Expose prompt templates and MCP resources through the same proxy as tools so assistants get a consistent, namespaced surface across backends.",
  },
  {
    icon: DescriptionOutlinedIcon,
    title: "Upstream OAuth flows",
    body: "Register servers that require OAuth without hand-rolling redirects—the dashboard coordinates authorization and stores tokens for repeatable access.",
  },
  {
    icon: ShieldOutlinedIcon,
    title: "Operational hardening",
    body: "Optional OIDC sign-in for this console, path-prefix deployment behind reverse proxies, proxy auth for MCP traffic, and Redis-backed sessions when you scale replicas.",
  },
  {
    icon: SpeedOutlinedIcon,
    title: "Observable by design",
    body: "Built-in health checks, diagnostics, and OpenTelemetry integration hooks so you can meter gateway traffic alongside the rest of your stack.",
  },
];

export function HomePage({
  overview,
  auth,
  onNavigate,
}: {
  overview?: DashboardOverviewResponse;
  auth?: DashboardAuthStatusResponse;
  onNavigate: (section: AppSection) => void;
}) {
  return (
    <Stack spacing={3} sx={{ pb: 4 }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          color: "primary.contrastText",
          background: "linear-gradient(125deg, #042f60 0%, #0550ae 38%, #0969da 72%, #388bfd 100%)",
          boxShadow: "0 12px 40px rgba(5, 80, 174, 0.35)",
          minHeight: { xs: 260, md: 300 },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.22,
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.9) 0, transparent 42%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.5) 0, transparent 38%),
              linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)`,
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              -12deg,
              transparent,
              transparent 18px,
              rgba(255,255,255,0.04) 18px,
              rgba(255,255,255,0.04) 19px
            )`,
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 4, md: 5 }, px: { xs: 2.5, sm: 4 } }}>
          <Box
            sx={{
              position: "absolute",
              top: { xs: 12, sm: 16 },
              right: { xs: 12, sm: 20 },
              zIndex: 2,
            }}
          >
            {auth?.oidc_enabled ? (
              auth.authenticated ? (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: { sm: "center" } }}>
                  <Chip
                    label={
                      auth.email?.trim()
                        ? `Signed in as ${auth.email.trim()}`
                        : auth.sub
                          ? `Signed in (${auth.sub})`
                          : "Signed in"
                    }
                    sx={{
                      bgcolor: "rgba(255,255,255,0.14)",
                      color: "common.white",
                      border: "1px solid rgba(255,255,255,0.35)",
                      fontWeight: 600,
                    }}
                  />
                  {auth.logout_path ? (
                    <Button
                      component="a"
                      href={auth.logout_path}
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: "background.paper",
                        color: "primary.dark",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#f0f6ff" },
                      }}
                    >
                      Sign out
                    </Button>
                  ) : null}
                </Stack>
              ) : auth.login_path ? (
                <Button
                  component="a"
                  href={auth.login_path}
                  variant="contained"
                  size="medium"
                  sx={{
                    bgcolor: "background.paper",
                    color: "primary.dark",
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#f0f6ff" },
                  }}
                >
                  Sign in
                </Button>
              ) : null
            ) : null}
          </Box>
          <Stack spacing={2.5} sx={{ maxWidth: 720 }}>
            <Typography variant="overline" sx={{ letterSpacing: "0.12em", opacity: 0.92, fontWeight: 600 }}>
              MCP &amp; Agent Skills
            </Typography>
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.15,
                fontSize: { xs: "1.85rem", sm: "2.35rem", md: "2.75rem" },
                textShadow: "0 1px 24px rgba(0,0,0,0.2)",
              }}
            >
              SAMI AI CapStack
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontWeight: 400,
                opacity: 0.95,
                lineHeight: 1.5,
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                maxWidth: 640,
              }}
            >
              Run MCP servers and Agent Skills behind one secure, discoverable capability stack. Register backends once,
              expose a unified surface to your AI clients, and govern tools and skills from the same dashboard your team
              uses for operations.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => onNavigate("servers")}
                sx={{
                  bgcolor: "background.paper",
                  color: "primary.dark",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#f0f6ff" },
                  px: 3,
                }}
              >
                Manage servers
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onNavigate("tools")}
                sx={{
                  borderColor: "rgba(255,255,255,0.72)",
                  color: "common.white",
                  fontWeight: 600,
                  "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,0.12)" },
                  px: 3,
                }}
              >
                Browse tools
              </Button>
              <Button
                variant="text"
                size="large"
                onClick={() => onNavigate("tool_groups")}
                sx={{ color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                Tool groups
              </Button>
              <Button
                variant="text"
                size="large"
                onClick={() => onNavigate("prompt_groups")}
                sx={{ color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                Prompt groups
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<AutoStoriesOutlinedIcon />}
                onClick={() => onNavigate("skills")}
                sx={{ color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                Skills
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<AppsOutlinedIcon />}
                onClick={() => onNavigate("agent_apps")}
                sx={{ color: "common.white", fontWeight: 600, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                Agent apps
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {overview ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: { sm: "center" },
            px: { xs: 0, sm: 0.5 },
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
            Live gateway snapshot
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            <StatPill label="Servers" value={overview.server_count} />
            <StatPill label="Tools" value={overview.tool_count} />
            <StatPill label="Prompts" value={overview.prompt_count} />
            <StatPill label="Resources" value={overview.resource_count} />
          </Stack>
        </Stack>
      ) : null}

      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 0, sm: 0 } }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Why use SAMI AI CapStack?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 800, lineHeight: 1.6 }}>
          MCP connects assistants to your systems, and Agent Skills package reusable know-how for those agents—but each
          new server or skill usually means another client config, another set of credentials, and another place to look
          for capabilities. CapStack collapses that sprawl: one registration pipeline, one discovery index for tools and
          skills, and one place to apply policy—whether you are solo on a laptop or running shared infrastructure for a
          team.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 2,
          }}
        >
          {benefitItems.map(({ icon: Icon, title, body }) => (
            <Card
              key={title}
              variant="outlined"
              sx={{
                height: "100%",
                borderRadius: 2,
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                  boxShadow: 2,
                  borderColor: "primary.light",
                },
              }}
            >
              <CardContent sx={{ p: 2.25 }}>
                <Stack spacing={1.25}>
                  <Icon color="primary" sx={{ fontSize: 32 }} />
                  <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.55 }}>
                    {body}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Stack>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        gap: 1,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: "14px",
        px: 1.75,
        py: 0.75,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
        {value}
      </Typography>
    </Box>
  );
}
