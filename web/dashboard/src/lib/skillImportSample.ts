import type { DashboardCreateSkillInput } from "./types";

const SAMPLE_SKILL = {
  name: "agent-conversation",
  version: "1.0.0",
  description: "Guides multi-turn agent conversations with clear handoffs and tone.",
  license: "Proprietary",
  compatibility: "Works with MCP gateway tool groups that expose search and memory tools.",
  allowed_tools: ["everything__echo"],
  body_content:
    "# Agent Conversation\n\nUse this skill when the user wants structured dialogue assistance.\n\n## Steps\n\n1. Clarify the user's goal.\n2. Propose a short plan.\n3. Execute with available tools.\n\nSee the [style guide](references/style-guide.md) for tone and formatting.\n",
  scripts: [
    {
      filename: "summarize.py",
      code_content: "def summarize(text: str) -> str:\n    return text.strip()\n",
    },
  ],
  references: [
    {
      filename: "style-guide.md",
      markdown_content:
        "# Style Guide\n\n- Be concise.\n- Prefer bullet lists for plans.\n- Confirm before destructive actions.\n",
    },
  ],
} satisfies DashboardCreateSkillInput;

const SAMPLE_SKILL_LIST_SECOND = {
  name: "data-summarizer",
  version: "1.0.0",
  description: "Summarizes tabular or textual inputs for downstream agents.",
  body_content: "# Data Summarizer\n\nProduce concise summaries with key metrics and caveats.\n",
} satisfies DashboardCreateSkillInput;

/** Reference JSON document: single skill object. */
export const SAMPLE_SKILL_IMPORT_JSON = `${JSON.stringify(SAMPLE_SKILL, null, 2)}\n`;

/** Reference JSON document: array of skills. */
export const SAMPLE_SKILL_IMPORT_LIST_JSON = `${JSON.stringify([SAMPLE_SKILL, SAMPLE_SKILL_LIST_SECOND], null, 2)}\n`;

/** Reference YAML document: single skill object. */
export const SAMPLE_SKILL_IMPORT_YAML = `name: agent-conversation
version: "1.0.0"
description: Guides multi-turn agent conversations with clear handoffs and tone.
license: Proprietary
compatibility: Works with MCP gateway tool groups that expose search and memory tools.
allowed_tools:
  - everything__echo
body_content: |
  # Agent Conversation

  Use this skill when the user wants structured dialogue assistance.

  ## Steps

  1. Clarify the user's goal.
  2. Propose a short plan.
  3. Execute with available tools.

  See the [style guide](references/style-guide.md) for tone and formatting.
scripts:
  - filename: summarize.py
    code_content: |
      def summarize(text: str) -> str:
          return text.strip()
references:
  - filename: style-guide.md
    markdown_content: |
      # Style Guide

      - Be concise.
      - Prefer bullet lists for plans.
      - Confirm before destructive actions.
`;

/** Reference YAML document: skills list wrapper. */
export const SAMPLE_SKILL_IMPORT_LIST_YAML = `skills:
  - name: agent-conversation
    version: "1.0.0"
    description: Guides multi-turn agent conversations with clear handoffs and tone.
    body_content: |
      # Agent Conversation

      Use this skill when the user wants structured dialogue assistance.
  - name: data-summarizer
    version: "1.0.0"
    description: Summarizes tabular or textual inputs for downstream agents.
    body_content: |
      # Data Summarizer

      Produce concise summaries with key metrics and caveats.
`;

export function sampleForFormat(format: "json" | "yaml", list = false): string {
  if (format === "json") {
    return list ? SAMPLE_SKILL_IMPORT_LIST_JSON : SAMPLE_SKILL_IMPORT_JSON;
  }
  return list ? SAMPLE_SKILL_IMPORT_LIST_YAML : SAMPLE_SKILL_IMPORT_YAML;
}

export function downloadSample(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export type ParsedSkillImport = DashboardCreateSkillInput;
