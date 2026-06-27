import type { ReactNode } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import type { AppSection } from "@/lib/types";
import { filterNavMenu, filterNavMenuByRole, NAV_MENU } from "@/lib/navSections";
import { normalizeRole, type UserRole } from "@/lib/rbac";

const tabDividerSx = {
  minWidth: 8,
  width: 8,
  maxWidth: 8,
  px: 0,
  mx: 0.5,
  opacity: 1,
  cursor: "default",
  pointerEvents: "none",
  borderLeft: 1,
  borderColor: "divider",
  "&.Mui-disabled": {
    opacity: 1,
  },
} as const;

function buildNavTabs(includeHome: boolean, role?: UserRole, platformAdmin?: boolean) {
  const menu = filterNavMenuByRole(filterNavMenu(NAV_MENU, !includeHome), role, platformAdmin);
  const tabs: ReactNode[] = [];
  let needsDivider = false;

  for (const entry of menu) {
    if (entry.kind === "group") {
      if (needsDivider) {
        tabs.push(<Tab key={`divider-${entry.id}`} disabled sx={tabDividerSx} />);
      }
      for (const item of entry.items) {
        tabs.push(<Tab key={item.key} label={item.label} value={item.key} />);
      }
      needsDivider = true;
      continue;
    }

    if (needsDivider) {
      tabs.push(<Tab key={`divider-${entry.key}`} disabled sx={tabDividerSx} />);
    }
    tabs.push(<Tab key={entry.key} label={entry.label} value={entry.key} />);
    needsDivider = true;
  }

  return tabs;
}

export function NavTabs({
  active,
  onSelect,
  role,
  platformAdmin,
}: {
  active: AppSection;
  onSelect: (section: AppSection) => void;
  role?: UserRole;
  platformAdmin?: boolean;
}) {
  return (
    <Tabs
      aria-label="Dashboard sections"
      onChange={(_, value: AppSection) => onSelect(value)}
      scrollButtons="auto"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        minHeight: 48,
        px: { xs: 0.5, sm: 1 },
        "& .MuiTab-root": {
          minHeight: 48,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      }}
      value={active}
      variant="scrollable"
    >
      {buildNavTabs(false, normalizeRole(role), platformAdmin)}
    </Tabs>
  );
}
