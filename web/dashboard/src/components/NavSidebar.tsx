import { useEffect, useState, type ReactElement } from "react";
import type { AppSection } from "@/lib/types";
import type { UserRole } from "@/lib/rbac";
import {
  ALL_NAV_SECTIONS,
  DEFAULT_NAV_GROUP_STATE,
  filterNavMenu,
  filterNavMenuByRole,
  findNavGroupForSection,
  NAV_MENU,
  readNavGroupState,
  writeNavGroupState,
  type NavGroupExpandedState,
  type NavGroupId,
  type NavMenuEntry,
  type NavSectionItem,
} from "@/lib/navSections";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
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

const DRAWER_EXPANDED_WIDTH = 240;
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
    case "skills":
      return <AutoStoriesOutlinedIcon {...props} />;
    case "skill_sets":
      return <LibraryBooksOutlinedIcon {...props} />;
    case "agent_apps":
      return <AppsOutlinedIcon {...props} />;
    case "teams":
      return <GroupOutlinedIcon {...props} />;
    case "users":
      return <PeopleOutlinedIcon {...props} />;
    case "prompts":
      return <AssignmentOutlinedIcon {...props} />;
    case "resources":
      return <DescriptionOutlinedIcon {...props} />;
    case "diagnostics":
      return <InfoOutlinedIcon {...props} />;
    case "observability":
      return <InsightsOutlinedIcon {...props} />;
    case "lineage":
      return <AccountTreeOutlinedIcon {...props} />;
    default:
      return null;
  }
}

function GroupIcon({ groupId, ...props }: { groupId: NavGroupId } & SvgIconProps): ReactElement | null {
  switch (groupId) {
    case "providers":
      return <HubOutlinedIcon {...props} />;
    case "products":
      return <CategoryOutlinedIcon {...props} />;
    case "system":
      return <SettingsOutlinedIcon {...props} />;
    default:
      return null;
  }
}

function NavItemButton({
  item,
  active,
  expanded,
  onSelect,
  indent = false,
}: {
  item: NavSectionItem;
  active: AppSection;
  expanded: boolean;
  onSelect: (section: AppSection) => void;
  indent?: boolean;
}) {
  const isActive = active === item.key;
  const button = (
    <ListItemButton
      selected={isActive}
      onClick={() => onSelect(item.key)}
      sx={{
        px: expanded ? (indent ? "20px" : "12px") : "6px",
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
      ) : (
        <>
          <ListItemIcon
            sx={{
              minWidth: 32,
              justifyContent: "center",
              color: isActive ? "primary.main" : "text.secondary",
            }}
          >
            <SectionIcon section={item.key} fontSize="small" />
          </ListItemIcon>
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
        </>
      )}
    </ListItemButton>
  );

  return (
    <ListItem disablePadding sx={{ mb: 0.25 }}>
      {expanded ? button : <Tooltip title={item.label} placement="right">{button}</Tooltip>}
    </ListItem>
  );
}

export function NavSidebar({
  active,
  onSelect,
  signOutHref,
  embedMode = false,
  signedInEmail,
  userRole,
}: {
  active: AppSection;
  onSelect: (section: AppSection) => void;
  /** When set (OIDC session), shows Sign out at the bottom of the nav. */
  signOutHref?: string;
  /** Embedded mode: hide Home and Sign out; show signed-in email when provided. */
  embedMode?: boolean;
  signedInEmail?: string;
  userRole?: UserRole;
}) {
  const navMenu = filterNavMenuByRole(filterNavMenu(NAV_MENU, embedMode), userRole);
  const collapsedNavItems = embedMode
    ? ALL_NAV_SECTIONS.filter((item) => item.key !== "home")
    : ALL_NAV_SECTIONS;

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

  const [groupExpanded, setGroupExpanded] = useState<NavGroupExpandedState>(() => readNavGroupState());

  useEffect(() => {
    const activeGroup = findNavGroupForSection(active);
    if (!activeGroup) {
      return;
    }
    setGroupExpanded((prev) => {
      if (prev[activeGroup]) {
        return prev;
      }
      const next = { ...prev, [activeGroup]: true };
      writeNavGroupState(next);
      return next;
    });
  }, [active]);

  function persistSidebar(next: boolean) {
    setExpanded(next);
    try {
      window.localStorage.setItem("dashboard-nav-expanded", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }

  function toggleGroup(groupId: NavGroupId) {
    setGroupExpanded((prev) => {
      const next = { ...prev, [groupId]: !prev[groupId] };
      writeNavGroupState(next);
      return next;
    });
  }

  function renderMenuEntry(entry: NavMenuEntry) {
    if (entry.kind === "item") {
      return (
        <NavItemButton
          key={entry.key}
          item={{ key: entry.key, label: entry.label }}
          active={active}
          expanded={expanded}
          onSelect={onSelect}
        />
      );
    }

    const isGroupOpen = groupExpanded[entry.id] ?? DEFAULT_NAV_GROUP_STATE[entry.id];
    const groupContentId = `nav-group-${entry.id}`;

    return (
      <Box key={entry.id} component="li" sx={{ listStyle: "none", mb: 0.25 }}>
        <ListItem disablePadding>
          <ListItemButton
            aria-controls={groupContentId}
            aria-expanded={isGroupOpen}
            onClick={() => toggleGroup(entry.id)}
            sx={{
              px: "8px",
              py: 0.75,
              borderRadius: "12px",
              minHeight: 36,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 32,
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              <GroupIcon groupId={entry.id} fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={entry.label}
              slotProps={{
                primary: {
                  variant: "caption",
                  sx: {
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "text.secondary",
                  },
                },
              }}
            />
            {isGroupOpen ? (
              <ExpandLessIcon fontSize="small" sx={{ color: "text.secondary" }} />
            ) : (
              <ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary" }} />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse in={isGroupOpen} timeout="auto" unmountOnExit>
          <List disablePadding id={groupContentId} aria-label={entry.label}>
            {entry.items.map((item) => (
              <NavItemButton
                key={item.key}
                item={item}
                active={active}
                expanded={expanded}
                onSelect={onSelect}
                indent
              />
            ))}
          </List>
        </Collapse>
      </Box>
    );
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
                  SAMI AI CapStack
                </Typography>
              </Box>
              <Tooltip title="Collapse menu">
                <IconButton aria-label="Collapse menu" edge="end" size="small" onClick={() => persistSidebar(false)}>
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Expand menu">
              <IconButton aria-label="Expand menu" size="small" onClick={() => persistSidebar(true)}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        <List disablePadding sx={{ px: 0, flex: 1, minHeight: 0, overflowY: "auto" }} aria-label="Dashboard sections">
          {expanded
            ? navMenu.map((entry) => renderMenuEntry(entry))
            : collapsedNavItems.map((item) => (
                <NavItemButton
                  key={item.key}
                  item={item}
                  active={active}
                  expanded={expanded}
                  onSelect={onSelect}
                />
              ))}
        </List>

        {embedMode && signedInEmail ? (
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
              <Chip label={`Signed in as ${signedInEmail}`} size="small" sx={{ width: "100%" }} />
            ) : (
              <Tooltip title={`Signed in as ${signedInEmail}`} placement="right">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Chip label={signedInEmail.slice(0, 1).toUpperCase()} size="small" />
                </Box>
              </Tooltip>
            )}
          </Box>
        ) : signOutHref ? (
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
