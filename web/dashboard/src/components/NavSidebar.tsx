import { useState, type ReactElement } from "react";
import type { AppSection } from "@/lib/types";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const DRAWER_EXPANDED_WIDTH = 216;
const DRAWER_COLLAPSED_WIDTH = 56;

function SectionIcon({ section, ...props }: { section: AppSection } & SvgIconProps): ReactElement | null {
  switch (section) {
    case "home":
      return <HomeOutlinedIcon {...props} />;
    case "servers":
      return <DnsOutlinedIcon {...props} />;
    case "tools":
      return <HandymanOutlinedIcon {...props} />;
    case "tool_groups":
      return <LayersOutlinedIcon {...props} />;
    case "prompt_groups":
      return <TextSnippetOutlinedIcon {...props} />;
    case "agent_apps":
      return <AppsOutlinedIcon {...props} />;
    case "prompts":
      return <AssignmentOutlinedIcon {...props} />;
    case "resources":
      return <DescriptionOutlinedIcon {...props} />;
    case "diagnostics":
      return <InfoOutlinedIcon {...props} />;
    default:
      return null;
  }
}

const items: Array<{ key: AppSection; label: string }> = [
  { key: "home", label: "Home" },
  { key: "servers", label: "Servers" },
  { key: "tools", label: "Tools" },
  { key: "tool_groups", label: "Tool Groups" },
  { key: "prompt_groups", label: "Prompt Groups" },
  { key: "agent_apps", label: "Agent Apps" },
  { key: "prompts", label: "Prompts" },
  { key: "resources", label: "Resources" },
  { key: "diagnostics", label: "System Info" },
];

export function NavSidebar({
  active,
  onSelect,
  signOutHref,
}: {
  active: AppSection;
  onSelect: (section: AppSection) => void;
  /** When set (OIDC session), shows Sign out at the bottom of the nav. */
  signOutHref?: string;
}) {
  const [expanded, setExpanded] = useState(() => {
    try {
      const saved = window.localStorage.getItem("dashboard-nav-expanded");
      if (saved !== null) {
        return saved === "1";
      }
    } catch {
      /* ignore */
    }
    return true;
  });

  function persist(next: boolean) {
    setExpanded(next);
    try {
      window.localStorage.setItem("dashboard-nav-expanded", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }

  return (
    <Box
      aria-label="Dashboard navigation"
      aria-expanded={expanded}
      component="aside"
      sx={{
        width: expanded ? DRAWER_EXPANDED_WIDTH : DRAWER_COLLAPSED_WIDTH,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        boxSizing: "border-box",
        borderRight: 1,
        borderColor: "divider",
        backgroundColor: "background.default",
        px: expanded ? "14px" : 1,
        py: 2,
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={2.25} sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            minWidth: 0,
            justifyContent: expanded ? "flex-start" : "center",
            flexWrap: "nowrap",
          }}
        >
          {expanded ? (
            <>
              <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
                <Typography
                  component="span"
                  sx={{ fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  MCP Gateway
                </Typography>
              </Box>
              <Tooltip title="Collapse menu">
                <IconButton aria-label="Collapse menu" edge="end" size="small" onClick={() => persist(false)}>
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Expand menu">
              <IconButton aria-label="Expand menu" size="small" onClick={() => persist(true)}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        <List disablePadding sx={{ px: 0, flex: 1, minHeight: 0, overflowY: "auto" }} aria-label="Dashboard sections">
          {items.map((item) => {
            const isActive = active === item.key;
            const button = (
              <ListItemButton
                selected={isActive}
                onClick={() => onSelect(item.key)}
                sx={{
                  px: expanded ? "12px" : "6px",
                  py: 1.125,
                  borderRadius: "12px",
                  mb: 0,
                  border: 1,
                  borderColor: isActive ? "divider" : "transparent",
                  backgroundColor: isActive ? "background.paper" : "transparent",
                  justifyContent: expanded ? "flex-start" : "center",
                }}
              >
                {!expanded ? (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      color: isActive ? "primary.main" : "text.secondary",
                    }}
                  >
                    <SectionIcon section={item.key} fontSize="small" />
                  </ListItemIcon>
                ) : null}
                {expanded ? (
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        variant: "body2",
                        sx: {
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "text.primary" : "text.secondary",
                        },
                      },
                    }}
                  />
                ) : null}
              </ListItemButton>
            );

            return (
              <ListItem key={item.key} disablePadding sx={{ mb: 0.25 }}>
                {expanded ? button : <Tooltip title={item.label} placement="right">{button}</Tooltip>}
              </ListItem>
            );
          })}
        </List>

        {signOutHref ? (
          <Box
            sx={{
              mt: "auto",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
              flexShrink: 0,
            }}
          >
            {expanded ? (
              <Button
                component="a"
                href={signOutHref}
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<LogoutOutlinedIcon />}
                sx={{
                  fontSize: "0.88rem",
                  minHeight: 36,
                  borderRadius: "12px",
                  textTransform: "none",
                }}
              >
                Sign out
              </Button>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tooltip title="Sign out" placement="right">
                  <IconButton component="a" href={signOutHref} aria-label="Sign out" size="small" color="primary">
                    <LogoutOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}
