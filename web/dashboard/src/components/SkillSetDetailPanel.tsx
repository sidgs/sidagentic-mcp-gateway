import { useCallback, useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { api } from "../lib/api";
import { CopyButton } from "./CopyButton";
import { SkillSetMemberCard } from "./SkillSetMemberCard";
import type { DashboardSkillSet } from "../lib/types";

function PencilIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 16 16" width="18">
      <path
        d="M11.25 2.75 13.25 4.75M3.25 12.75l-.5 2.25 2.25-.5 8.5-8.5-1.75-1.75-8.5 8.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 16 16" width="18">
      <path
        d="M2.75 4.25h10.5M6.25 2.75h3.5m-5.75 1.5.44 7.04A1.5 1.5 0 0 0 5.94 12.75h4.12a1.5 1.5 0 0 0 1.5-1.46L12 4.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M6.5 6.5v3.5M9.5 6.5v3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

export function SkillSetDetailPanel({
  name,
  onBack,
  onEdit,
  onDeleted,
  onEditSkill,
}: {
  name: string;
  onBack: () => void;
  onEdit: () => void;
  onDeleted: () => void;
  onEditSkill: (skillName: string, skillVersion: string) => void;
}) {
  const [detail, setDetail] = useState<DashboardSkillSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setDetail(await api.getSkillSet(name));
    } catch (e) {
      setDetail(null);
      setError(e instanceof Error ? e.message : "Failed to load skill set");
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function deleteSet() {
    setDeleting(true);
    setError(null);
    try {
      await api.deleteSkillSet(name);
      onDeleted();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete skill set");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <Typography>Loading skill set…</Typography>;
  }

  if (!detail) {
    return (
      <Stack spacing={2} sx={{ py: 2 }}>
        <Typography color="text.secondary" variant="body2">
          {error ?? "This skill set does not exist or was deleted."}
        </Typography>
        <Button variant="contained" onClick={onBack}>
          Back to all skill sets
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", flexWrap: "wrap" }}>
        <IconButton aria-label="Edit skill set" onClick={onEdit} title="Edit skill set" size="small">
          <PencilIcon />
        </IconButton>
        <IconButton
          aria-label="Delete skill set"
          color="error"
          disabled={deleting}
          onClick={() => void deleteSet()}
          title="Delete skill set"
          size="small"
        >
          <TrashIcon />
        </IconButton>
      </Stack>

      {error ? <Typography color="error">{error}</Typography> : null}

      <dl className="tool-detail-meta">
        <div className="tool-detail-description">
          <dt>Description</dt>
          <dd>{detail.description}</dd>
        </div>
        <div className="tool-detail-description">
          <dt>Security</dt>
          <dd>
            <code className="identifier-code">{detail.security_option}</code>
          </dd>
        </div>
      </dl>

      <div className="tool-schema-section">
        <div className="tool-schema-header">
          <h4>Catalog endpoint</h4>
        </div>
        <div className="tool-group-endpoint-value">
          <code className="detail-target-code" title={detail.catalog_endpoint}>
            {detail.catalog_endpoint}
          </code>
          <CopyButton ariaLabel="Copy catalog endpoint" title="Copy catalog endpoint" value={detail.catalog_endpoint} />
        </div>
      </div>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
          Skills ({detail.members.length})
        </Typography>
        {detail.members.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No skills in this set yet. Use Edit to add active skill versions.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 1.5,
            }}
          >
            {detail.members.map((member) => (
              <SkillSetMemberCard
                key={member.skill_version_id}
                member={member}
                onOpen={() => onEditSkill(member.name, member.version)}
                action={
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSkill(member.name, member.version);
                    }}
                  >
                    Edit skill
                  </Button>
                }
              />
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
}
