import { useRef, useState } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { api } from "../lib/api";
import { parseSkillImportText, readSkillImportFile, type SkillImportFormat } from "../lib/skillImport";
import {
  downloadSample,
  sampleForFormat,
  SAMPLE_SKILL_IMPORT_JSON,
  SAMPLE_SKILL_IMPORT_YAML,
} from "../lib/skillImportSample";
import type { DashboardCreateSkillInput } from "../lib/types";

export interface SkillImportPageProps {
  onCancel: () => void;
  onImported: () => void;
}

function previewLines(payload: DashboardCreateSkillInput): string[] {
  return [
    `Name: ${payload.name}`,
    `Version: ${payload.version}`,
    `Description: ${payload.description}`,
    payload.license ? `License: ${payload.license}` : "",
    payload.compatibility ? `Compatibility: ${payload.compatibility}` : "",
    payload.allowed_tools?.length ? `Allowed tools: ${payload.allowed_tools.join(", ")}` : "Allowed tools: —",
    `Scripts: ${payload.scripts?.length ?? 0}`,
    `References: ${payload.references?.length ?? 0}`,
    `Body length: ${payload.body_content.length} characters`,
  ].filter(Boolean);
}

export function SkillImportPage({ onCancel, onImported }: SkillImportPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [format, setFormat] = useState<SkillImportFormat>("auto");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<DashboardCreateSkillInput | null>(null);
  const [importing, setImporting] = useState(false);

  function loadSample(nextFormat: "json" | "yaml") {
    setFormat(nextFormat);
    setText(sampleForFormat(nextFormat));
    setFileName(null);
    setError(null);
    setPreview(null);
  }

  async function onChooseFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    setError(null);
    setPreview(null);
    try {
      const loaded = await readSkillImportFile(file);
      setText(loaded.text);
      setFormat(loaded.format);
      setFileName(file.name);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read file");
    }
  }

  function runPreview() {
    setError(null);
    try {
      const parsed = parseSkillImportText(text, format);
      setPreview(parsed);
    } catch (e) {
      setPreview(null);
      setError(e instanceof Error ? e.message : "Failed to parse import document");
    }
  }

  async function runImport() {
    setImporting(true);
    setError(null);
    try {
      const parsed = parseSkillImportText(text, format);
      setPreview(parsed);
      await api.createSkill(parsed);
      onImported();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to import skill");
    } finally {
      setImporting(false);
    }
  }

  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary">
        Import a skill version from JSON or YAML. Paste content below or upload a <code>.json</code>,{" "}
        <code>.yaml</code>, or <code>.yml</code> file. New imports always start in preview status.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="skill-import-format-label">Format</InputLabel>
          <Select
            labelId="skill-import-format-label"
            label="Format"
            value={format}
            onChange={(e) => setFormat(e.target.value as SkillImportFormat)}
          >
            <MenuItem value="auto">Auto-detect</MenuItem>
            <MenuItem value="json">JSON</MenuItem>
            <MenuItem value="yaml">YAML</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" startIcon={<UploadFileOutlinedIcon />} onClick={() => fileInputRef.current?.click()}>
          Choose file
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.yaml,.yml,application/json,text/yaml,text/x-yaml"
          hidden
          onChange={(e) => void onChooseFile(e)}
        />
        <Button variant="outlined" onClick={() => loadSample("json")}>
          Load JSON sample
        </Button>
        <Button variant="outlined" onClick={() => loadSample("yaml")}>
          Load YAML sample
        </Button>
        <Button
          variant="text"
          onClick={() => downloadSample("skill-import.sample.json", SAMPLE_SKILL_IMPORT_JSON, "application/json")}
        >
          Download JSON sample
        </Button>
        <Button
          variant="text"
          onClick={() => downloadSample("skill-import.sample.yaml", SAMPLE_SKILL_IMPORT_YAML, "text/yaml")}
        >
          Download YAML sample
        </Button>
      </Stack>

      {fileName ? (
        <Typography variant="caption" color="text.secondary">
          Loaded file: {fileName}
        </Typography>
      ) : null}

      <TextField
        label="Import document"
        multiline
        minRows={16}
        fullWidth
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setPreview(null);
          setError(null);
        }}
        placeholder="Paste JSON or YAML here, or load a sample / file."
        slotProps={{
          input: {
            sx: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: "0.875rem" },
          },
        }}
      />

      <Accordion variant="outlined" disableGutters sx={{ borderRadius: 1, "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
          <Typography variant="subtitle2">Reference sample (YAML)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2,
              borderRadius: 1,
              bgcolor: "action.hover",
              overflow: "auto",
              fontSize: "0.8rem",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          >
            {SAMPLE_SKILL_IMPORT_YAML}
          </Box>
        </AccordionDetails>
      </Accordion>

      {preview ? (
        <Alert severity="success">
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Ready to import
          </Typography>
          {previewLines(preview).map((line) => (
            <Typography key={line} variant="body2" component="div">
              {line}
            </Typography>
          ))}
        </Alert>
      ) : null}

      {error ? <Alert severity="error">{error}</Alert> : null}

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={onCancel} disabled={importing}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={runPreview} disabled={importing || !text.trim()}>
          Preview import
        </Button>
        <Button variant="contained" onClick={() => void runImport()} disabled={importing || !text.trim()}>
          Import skill
        </Button>
      </Stack>
    </Stack>
  );
}
