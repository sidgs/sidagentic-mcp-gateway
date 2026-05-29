import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import type { AppSection } from "@/lib/types";
import { COMPONENT_NAV_SECTIONS } from "@/lib/navSections";

export function NavTabs({
  active,
  onSelect,
}: {
  active: AppSection;
  onSelect: (section: AppSection) => void;
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
      {COMPONENT_NAV_SECTIONS.map((item) => (
        <Tab key={item.key} label={item.label} value={item.key} />
      ))}
    </Tabs>
  );
}
