import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SkillContentForm, SkillCreateForm } from "../lib/skillForm";
import { MarkdownBodyField } from "./MarkdownBodyField";

export function SkillContentFields({
  form,
  setForm,
  disabled,
}: {
  form: SkillContentForm;
  setForm: (next: SkillContentForm) => void;
  disabled?: boolean;
}) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Description"
        multiline
        minRows={2}
        required
        disabled={disabled}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <TextField
        label="License"
        disabled={disabled}
        value={form.license}
        onChange={(e) => setForm({ ...form, license: e.target.value })}
      />
      <TextField
        label="Compatibility"
        disabled={disabled}
        value={form.compatibility}
        onChange={(e) => setForm({ ...form, compatibility: e.target.value })}
      />
      <TextField
        label="Allowed tools"
        disabled={disabled}
        helperText="Comma-separated MCP tool names"
        value={form.allowed_tools}
        onChange={(e) => setForm({ ...form, allowed_tools: e.target.value })}
      />
      <MarkdownBodyField
        required
        disabled={disabled}
        value={form.body_content}
        onChange={(body_content) => setForm({ ...form, body_content })}
      />
      <Box>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle2">Scripts</Typography>
          <Button
            size="small"
            disabled={disabled}
            onClick={() =>
              setForm({
                ...form,
                script_files: [...form.script_files, { filename: "", code_content: "" }],
              })
            }
          >
            Add script
          </Button>
        </Stack>
        <Stack spacing={1}>
          {form.script_files.map((script, index) => (
            <Stack key={index} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
              <TextField
                label="Filename"
                size="small"
                disabled={disabled}
                sx={{ minWidth: 180 }}
                value={script.filename}
                onChange={(e) => {
                  const next = [...form.script_files];
                  next[index] = { ...next[index], filename: e.target.value };
                  setForm({ ...form, script_files: next });
                }}
              />
              <TextField
                label="Code"
                size="small"
                multiline
                minRows={2}
                fullWidth
                disabled={disabled}
                value={script.code_content}
                onChange={(e) => {
                  const next = [...form.script_files];
                  next[index] = { ...next[index], code_content: e.target.value };
                  setForm({ ...form, script_files: next });
                }}
              />
              <IconButton
                aria-label="Remove script"
                disabled={disabled}
                onClick={() =>
                  setForm({
                    ...form,
                    script_files: form.script_files.filter((_, i) => i !== index),
                  })
                }
              >
                ×
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle2">References</Typography>
          <Button
            size="small"
            disabled={disabled}
            onClick={() =>
              setForm({
                ...form,
                reference_files: [...form.reference_files, { filename: "", markdown_content: "" }],
              })
            }
          >
            Add reference
          </Button>
        </Stack>
        <Stack spacing={1}>
          {form.reference_files.map((ref, index) => (
            <Stack key={index} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
              <TextField
                label="Filename"
                size="small"
                disabled={disabled}
                sx={{ minWidth: 180 }}
                value={ref.filename}
                onChange={(e) => {
                  const next = [...form.reference_files];
                  next[index] = { ...next[index], filename: e.target.value };
                  setForm({ ...form, reference_files: next });
                }}
              />
              <TextField
                label="Markdown"
                size="small"
                multiline
                minRows={2}
                fullWidth
                disabled={disabled}
                value={ref.markdown_content}
                onChange={(e) => {
                  const next = [...form.reference_files];
                  next[index] = { ...next[index], markdown_content: e.target.value };
                  setForm({ ...form, reference_files: next });
                }}
              />
              <IconButton
                aria-label="Remove reference"
                disabled={disabled}
                onClick={() =>
                  setForm({
                    ...form,
                    reference_files: form.reference_files.filter((_, i) => i !== index),
                  })
                }
              >
                ×
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export function SkillIdentityFields({
  form,
  setForm,
  nameLocked,
  versionHidden,
  disabled,
}: {
  form: SkillCreateForm;
  setForm: (next: SkillCreateForm) => void;
  nameLocked?: boolean;
  versionHidden?: boolean;
  disabled?: boolean;
}) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Name"
        required
        disabled={disabled || nameLocked}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {versionHidden ? null : (
        <TextField
          label="Version"
          required
          disabled={disabled}
          value={form.version}
          onChange={(e) => setForm({ ...form, version: e.target.value })}
        />
      )}
    </Stack>
  );
}
