import type { DashboardCreateSkillInput } from "./types";

/** Reference JSON document for importing a skill version. */
export const SAMPLE_SKILL_IMPORT_JSON = `{
  "name": "agent-conversation",
  "version": "1.0.0",
  "description": "Guides multi-turn agent conversations with clear handoffs and tone.",
  "license": "Proprietary",
  "compatibility": "Works with MCP gateway tool groups that expose search and memory tools.",
  "allowed_tools": [
    "everything__echo"
  ],
  "body_content": "# Agent Conversation\\n\\nUse this skill when the user wants structured dialogue assistance.\\n\\n## Steps\\n\\n1. Clarify the user's goal.\\n2. Propose a short plan.\\n3. Execute with available tools.\\n\\nSee the [style guide](references/style-guide.md) for tone and formatting.\\n",
  "scripts": [
    {
      "filename": "summarize.py",
      "code_content": "def summarize(text: str) -> str:\\n    return text.strip()\\n"
    }
  ],
  "references": [
    {
      "filename": "style-guide.md",
      "markdown_content": "# Style Guide\\n\\n- Be concise.\\n- Prefer bullet lists for plans.\\n- Confirm before destructive actions.\\n"
    }
  ]
}`;

/** Reference YAML document for importing a skill version. */
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

export function sampleForFormat(format: "json" | "yaml"): string {
  return format === "json" ? SAMPLE_SKILL_IMPORT_JSON : SAMPLE_SKILL_IMPORT_YAML;
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
