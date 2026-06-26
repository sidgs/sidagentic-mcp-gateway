import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type BodyEditorMode = "write" | "preview";

const markdownPreviewSx = {
  minHeight: 220,
  p: 2,
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  bgcolor: "background.paper",
  overflow: "auto",
  "& h1, & h2, & h3, & h4": { mt: 2, mb: 1, fontWeight: 700, lineHeight: 1.3 },
  "& h1": { fontSize: "1.5rem" },
  "& h2": { fontSize: "1.25rem" },
  "& h3": { fontSize: "1.1rem" },
  "& p, & ul, & ol, & pre, & blockquote": { mt: 0, mb: 1.5 },
  "& ul, & ol": { pl: 3 },
  "& code": {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "0.875em",
    bgcolor: "action.hover",
    px: 0.5,
    py: 0.25,
    borderRadius: 0.5,
  },
  "& pre": {
    p: 1.5,
    borderRadius: 1,
    bgcolor: "action.hover",
    overflow: "auto",
  },
  "& pre code": { bgcolor: "transparent", p: 0 },
  "& blockquote": {
    borderLeft: 3,
    borderColor: "divider",
    pl: 2,
    color: "text.secondary",
  },
  "& a": { color: "primary.main" },
  "& table": { width: "100%", borderCollapse: "collapse", mb: 2 },
  "& th, & td": { border: 1, borderColor: "divider", p: 1, textAlign: "left" },
} as const;

export function MarkdownBodyField({
  value,
  onChange,
  disabled,
  label = "Body (Markdown)",
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  required?: boolean;
}) {
  const [mode, setMode] = useState<BodyEditorMode>("write");

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, mb: 1 }}
      >
        <InputLabel required={required} sx={{ position: "static", transform: "none" }}>
          {label}
        </InputLabel>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={mode}
          onChange={(_, next: BodyEditorMode | null) => {
            if (next) {
              setMode(next);
            }
          }}
          aria-label="Body markdown editor mode"
        >
          <ToggleButton value="write" aria-label="Write markdown">
            Write
          </ToggleButton>
          <ToggleButton value="preview" aria-label="Preview markdown">
            Preview
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {mode === "write" ? (
        <TextField
          multiline
          minRows={10}
          fullWidth
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Instructions"
          slotProps={{
            input: {
              sx: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: "0.875rem" },
            },
          }}
        />
      ) : (
        <Box sx={markdownPreviewSx}>
          {value.trim() ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Nothing to preview yet.
            </Typography>
          )}
        </Box>
      )}

      <FormHelperText>
        {mode === "write"
          ? "Skill instructions in Markdown. Switch to Preview to see rendered output."
          : "Rendered preview of the Markdown body."}
      </FormHelperText>
    </Box>
  );
}
