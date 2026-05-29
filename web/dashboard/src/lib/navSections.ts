import type { AppSection } from "./types";

export interface NavSectionItem {
  key: AppSection;
  label: string;
}

export const ALL_NAV_SECTIONS: NavSectionItem[] = [
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

export const COMPONENT_NAV_SECTIONS: NavSectionItem[] = ALL_NAV_SECTIONS.filter(
  (item) => item.key !== "home",
);
