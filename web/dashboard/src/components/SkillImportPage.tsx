import { useRef, useState } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../lib/api";
import { parseSkillImportText, readSkillImportFile, type SkillImportFormat } from "../lib/skillImport";
import {
  downloadSample,
  sampleForFormat,
  SAMPLE_SKILL_IMPORT_JSON,
  SAMPLE_SKILL_IMPORT_LIST_JSON,
  SAMPLE_SKILL_IMPORT_LIST_YAML,
  SAMPLE_SKILL_IMPORT_YAML,
} from "../lib/skillImportSample";
import type { DashboardCreateSkillInput } from "../lib/types";

export interface SkillImportPageProps {
  onCancel: () => void;
  onImported: () => void;
}

type ImportItemStatus = "pending" | "importing" | "success" | "error";

type ImportRunState = {
  total: number;
  completed: number;
  succeeded: number;
  failed: number;
  finished: boolean;
  currentKey: string | null;
  itemStatuses: Record<string, ImportItemStatus>;
  itemErrors: Record<string, string>;
};

function skillKey(skill: DashboardCreateSkillInput): string {
  return `${skill.name}@${skill.version}`;
}

function skillSummary(skill: DashboardCreateSkillInput): string {
  return `${skill.name} @ ${skill.version} — ${skill.description}`;
}

function initialImportRun(skills: DashboardCreateSkillInput[]): ImportRunState {
  const itemStatuses: Record<string, ImportItemStatus> = {};
  for (const skill of skills) {
    itemStatuses[skillKey(skill)] = "pending";
  }
  return {
    total: skills.length,
    completed: 0,
    succeeded: 0,
    failed: 0,
    finished: false,
    currentKey: skills[0] ? skillKey(skills[0]) : null,
    itemStatuses,
    itemErrors: {},
  };
}

export function SkillImportPage({ onCancel, onImported }: SkillImportPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [format, setFormat] = useState<SkillImportFormat>("auto");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<DashboardCreateSkillInput[] | null>(null);
  const [importing, setImporting] = useState(false);
  const [importRun, setImportRun] = useState<ImportRunState | null>(null);

  function resetImportState() {
    setImportRun(null);
    setError(null);
  }

  function loadSample(nextFormat: "json" | "yaml", list: boolean) {
    setFormat(nextFormat);
    setText(sampleForFormat(nextFormat, list));
    setFileName(null);
    resetImportState();
    setPreview(null);
  }

  async function onChooseFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }
    resetImportState();
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
    resetImportState();
    try {
      setPreview(parseSkillImportText(text, format));
    } catch (e) {
      setPreview(null);
      setError(e instanceof Error ? e.message : "Failed to parse import document");
    }
  }

  async function runImport() {
    setImporting(true);
    setError(null);
    try {
      const skills = parseSkillImportText(text, format);
      setPreview(skills);
      let run = initialImportRun(skills);
      setImportRun(run);

      for (let index = 0; index < skills.length; index += 1) {
        const skill = skills[index];
        const key = skillKey(skill);
        const nextKey = index + 1 < skills.length ? skillKey(skills[index + 1]) : null;

        run = {
          ...run,
          currentKey: key,
          itemStatuses: { ...run.itemStatuses, [key]: "importing" },
        };
        setImportRun(run);

        let succeeded = run.succeeded;
        let failed = run.failed;
        const itemStatuses = { ...run.itemStatuses };
        const itemErrors = { ...run.itemErrors };

        try {
          await api.createSkill(skill);
          succeeded += 1;
          itemStatuses[key] = "success";
        } catch (e) {
          failed += 1;
          itemStatuses[key] = "error";
          itemErrors[key] = e instanceof Error ? e.message : "Failed to create skill";
        }

        run = {
          ...run,
          completed: index + 1,
          succeeded,
          failed,
          currentKey: nextKey,
          itemStatuses,
          itemErrors,
          finished: index + 1 === skills.length,
        };
        setImportRun(run);
      }

      if (run.failed === 0) {
        onImported();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to import skills");
      setImportRun(null);
    } finally {
      setImporting(false);
    }
  }

  const importLabel =
    preview && preview.length > 1 ? `Import ${preview.length} skills` : "Import skill";

  const progressValue =
    importRun && importRun.total > 0 ? Math.round((importRun.completed / importRun.total) * 100) : 0;

  const showProgress = importRun !== null && importRun.total > 0;

  return (
    <Stack spacing={3}>
      <Typography variant="body2" color="text.secondary">
        Import one or many skill versions from JSON or YAML. Use a single skill object, a top-level array, or{" "}
        <code>{`{ skills: [...] }`}</code>. Paste content below or upload a <code>.json</code>, <code>.yaml</code>, or{" "}
        <code>.yml</code> file. New imports always start in preview status.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="skill-import-format-label">Format</InputLabel>
          <Select
            labelId="skill-import-format-label"
            label="Format"
            value={format}
            onChange={(e) => setFormat(e.target.value as SkillImportFormat)}
            disabled={importing}
          >
            <MenuItem value="auto">Auto-detect</MenuItem>
            <MenuItem value="json">JSON</MenuItem>
            <MenuItem value="yaml">YAML</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<UploadFileOutlinedIcon />}
          disabled={importing}
          onClick={() => fileInputRef.current?.click()}
        >
          Choose file
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.yaml,.yml,application/json,text/yaml,text/x-yaml"
          hidden
          onChange={(e) => void onChooseFile(e)}
        />
        <Button variant="outlined" disabled={importing} onClick={() => loadSample("json", false)}>
          Load JSON sample
        </Button>
        <Button variant="outlined" disabled={importing} onClick={() => loadSample("yaml", false)}>
          Load YAML sample
        </Button>
        <Button variant="outlined" disabled={importing} onClick={() => loadSample("json", true)}>
          Load list sample
        </Button>
        <Button
          variant="text"
          disabled={importing}
          onClick={() => downloadSample("skill-import.sample.json", SAMPLE_SKILL_IMPORT_JSON, "application/json")}
        >
          Download JSON sample
        </Button>
        <Button
          variant="text"
          disabled={importing}
          onClick={() =>
            downloadSample("skill-import-list.sample.json", SAMPLE_SKILL_IMPORT_LIST_JSON, "application/json")
          }
        >
          Download list sample
        </Button>
        <Button
          variant="text"
          disabled={importing}
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
        disabled={importing}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setPreview(null);
          resetImportState();
        }}
        placeholder="Paste a skill object, an array of skills, or { skills: [...] }."
        slotProps={{
          input: {
            sx: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: "0.875rem" },
          },
        }}
      />

      <Accordion variant="outlined" disableGutters sx={{ borderRadius: 1, "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
          <Typography variant="subtitle2">Reference samples</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                Single skill (YAML)
              </Typography>
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
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                Multiple skills (YAML)
              </Typography>
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
                {SAMPLE_SKILL_IMPORT_LIST_YAML}
              </Box>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {showProgress ? (
        <Box>
          <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="body2">
              {importing
                ? `Importing skill ${importRun.completed + (importRun.currentKey ? 1 : 0)} of ${importRun.total}…`
                : importRun.finished
                  ? `Import complete: ${importRun.succeeded} succeeded`
                  : `Processed ${importRun.completed} of ${importRun.total}`}
            </Typography>
            <Typography variant="body2" color={importRun.failed > 0 ? "error.main" : "success.main"}>
              {importRun.failed > 0
                ? `${importRun.failed} failed`
                : importRun.finished
                  ? "All succeeded"
                  : `${importRun.succeeded} succeeded`}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            color={importRun.failed > 0 && importRun.finished ? "warning" : importRun.failed > 0 ? "error" : "primary"}
            sx={{ height: 8, borderRadius: 1 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
            {importing && importRun.currentKey
              ? `Current: ${importRun.currentKey.replace("@", " @ ")}`
              : `${importRun.completed} of ${importRun.total} processed (${progressValue}%)`}
          </Typography>
        </Box>
      ) : null}

      {preview ? (
        <Alert
          severity={
            importRun?.finished && importRun.failed > 0
              ? "warning"
              : importRun && (importing || importRun.finished)
                ? importRun.failed > 0
                  ? "warning"
                  : "info"
                : "success"
          }
        >
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            {importRun && (importing || importRun.finished)
              ? importRun.finished
                ? `Imported ${importRun.succeeded} of ${importRun.total} skill${importRun.total === 1 ? "" : "s"}`
                : `Importing ${Math.min(importRun.completed + 1, importRun.total)} of ${importRun.total} skill${importRun.total === 1 ? "" : "s"}`
              : `Ready to import ${preview.length} skill${preview.length === 1 ? "" : "s"}`}
          </Typography>
          <List dense disablePadding>
            {preview.map((skill) => {
              const key = skillKey(skill);
              const status = importRun?.itemStatuses[key] ?? "pending";
              return (
                <ListItem key={key} disableGutters sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    {status === "success" ? (
                      <CheckCircleOutlinedIcon fontSize="small" color="success" />
                    ) : status === "error" ? (
                      <ErrorOutlineOutlinedIcon fontSize="small" color="error" />
                    ) : status === "importing" ? (
                      <Typography variant="caption" color="primary">
                        …
                      </Typography>
                    ) : null}
                  </ListItemIcon>
                  <ListItemText
                    primary={skillSummary(skill)}
                    secondary={
                      importRun?.itemErrors[key] ??
                      (status === "importing" ? "Importing…" : `Body: ${skill.body_content.length} chars`)
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Alert>
      ) : null}

      {importRun?.finished && importRun.failed > 0 ? (
        <Alert severity="error">
          {importRun.failed} skill{importRun.failed === 1 ? "" : "s"} failed to import. Successful imports were kept.
          Fix the document and retry failed entries, or return to the skills list.
        </Alert>
      ) : null}

      {error ? <Alert severity="error">{error}</Alert> : null}

      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          onClick={importRun?.finished && importRun.succeeded > 0 ? onImported : onCancel}
          disabled={importing}
        >
          {importRun?.finished && importRun.succeeded > 0 ? "Back to skills" : "Cancel"}
        </Button>
        <Button variant="outlined" onClick={runPreview} disabled={importing || !text.trim()}>
          Preview import
        </Button>
        <Button variant="contained" onClick={() => void runImport()} disabled={importing || !text.trim()}>
          {importing ? "Importing…" : preview ? importLabel : "Import"}
        </Button>
      </Stack>
    </Stack>
  );
}
