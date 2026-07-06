import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { SkillSetDetailPanel } from "./SkillSetDetailPanel";
import { SkillSetFormPage } from "./SkillSetFormPage";
import { SkillSetsListPanel } from "./SkillSetsListPanel";
import { SectionCard } from "./SectionCard";
import {
  parseHashRoute,
  setDashboardLocationHash,
  skillEditHash,
  skillSetCreateHash,
  skillSetDetailHash,
  skillSetEditHash,
  skillSetsListHash,
  type SkillSetFormMode,
} from "../lib/hashRoute";
import { usesHashRouting } from "../lib/runtimeConfig";

function readSkillSetRoute(): {
  formMode: SkillSetFormMode;
  skillSetName: string | null;
} {
  const route = parseHashRoute();
  if (route.section !== "skill_sets") {
    return { formMode: null, skillSetName: null };
  }
  return {
    formMode: route.skillSetFormMode,
    skillSetName: route.skillSetName,
  };
}

export function SkillSetsSection() {
  const [route, setRoute] = useState(readSkillSetRoute);
  const [localFormMode, setLocalFormMode] = useState<SkillSetFormMode>(null);
  const [localSkillSetName, setLocalSkillSetName] = useState<string | null>(null);

  useEffect(() => {
    if (!usesHashRouting()) {
      return;
    }
    function onHashChange() {
      setRoute(readSkillSetRoute());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const formMode = usesHashRouting() ? route.formMode : localFormMode;
  const skillSetName = usesHashRouting() ? route.skillSetName : localSkillSetName;

  function navigateToList() {
    if (usesHashRouting()) {
      setDashboardLocationHash(skillSetsListHash());
      return;
    }
    setLocalFormMode(null);
    setLocalSkillSetName(null);
  }

  function openCreatePage() {
    if (usesHashRouting()) {
      setDashboardLocationHash(skillSetCreateHash());
      return;
    }
    setLocalFormMode("create");
    setLocalSkillSetName(null);
  }

  function openDetail(name: string) {
    if (usesHashRouting()) {
      setDashboardLocationHash(skillSetDetailHash(name));
      return;
    }
    setLocalFormMode(null);
    setLocalSkillSetName(name);
  }

  function openEdit(name: string) {
    if (usesHashRouting()) {
      setDashboardLocationHash(skillSetEditHash(name));
      return;
    }
    setLocalFormMode("edit");
    setLocalSkillSetName(name);
  }

  function openSkillEdit(skillName: string, skillVersion: string) {
    setDashboardLocationHash(skillEditHash(skillName, skillVersion));
  }

  if (formMode === "create") {
    return (
      <SectionCard
        title="Skill Sets"
        subtitle="Create Skill Set"
        action={
          <Button variant="outlined" onClick={navigateToList}>
            ← All skill sets
          </Button>
        }
      >
        <SkillSetFormPage
          mode="create"
          skillSetName={null}
          onCancel={navigateToList}
          onSaved={(name) => openDetail(name)}
        />
      </SectionCard>
    );
  }

  if (formMode === "edit" && skillSetName) {
    return (
      <SectionCard
        title="Skill Sets"
        subtitle={`Edit ${skillSetName}`}
        action={
          <Button variant="outlined" onClick={() => openDetail(skillSetName)}>
            ← {skillSetName}
          </Button>
        }
      >
        <SkillSetFormPage
          mode="edit"
          skillSetName={skillSetName}
          onCancel={() => openDetail(skillSetName)}
          onSaved={(name) => openDetail(name)}
        />
      </SectionCard>
    );
  }

  if (skillSetName) {
    return (
      <SectionCard
        title="Skill Sets"
        subtitle={skillSetName}
        action={
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
            <Button variant="outlined" onClick={navigateToList}>
              ← All skill sets
            </Button>
            <Button variant="contained" onClick={openCreatePage}>
              + Create Skill Set
            </Button>
          </Stack>
        }
      >
        <SkillSetDetailPanel
          name={skillSetName}
          onBack={navigateToList}
          onEdit={() => openEdit(skillSetName)}
          onDeleted={navigateToList}
          onEditSkill={openSkillEdit}
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Skill Sets"
      subtitle="Group pinned active skill versions for tenant catalog access."
      action={
        <Button variant="contained" onClick={openCreatePage}>
          + Create Skill Set
        </Button>
      }
    >
      <SkillSetsListPanel onOpenSet={openDetail} />
    </SectionCard>
  );
}
