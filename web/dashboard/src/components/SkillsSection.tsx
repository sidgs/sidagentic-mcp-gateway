import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { SkillsCatalogPanel } from "./SkillsCatalogPanel";
import { SkillFormPage } from "./SkillFormPage";
import { SkillImportPage } from "./SkillImportPage";
import { SectionCard } from "./SectionCard";
import {
  parseHashRoute,
  setDashboardLocationHash,
  skillCreateHash,
  skillAddVersionHash,
  skillEditHash,
  skillImportHash,
  skillsListHash,
  type SkillFormMode,
} from "../lib/hashRoute";
import { usesHashRouting } from "../lib/runtimeConfig";

function readSkillFormRoute(): {
  mode: SkillFormMode | null;
  skillName: string | null;
  skillVersion: string | null;
} {
  const route = parseHashRoute();
  if (route.section !== "skills") {
    return { mode: null, skillName: null, skillVersion: null };
  }
  return {
    mode: route.skillFormMode,
    skillName: route.skillName,
    skillVersion: route.skillVersion,
  };
}

export function SkillsSection() {
  const [formRoute, setFormRoute] = useState(readSkillFormRoute);
  const [localFormMode, setLocalFormMode] = useState<SkillFormMode | null>(null);
  const [localSkillName, setLocalSkillName] = useState<string | null>(null);
  const [localSkillVersion, setLocalSkillVersion] = useState<string | null>(null);

  useEffect(() => {
    if (!usesHashRouting()) {
      return;
    }
    function onHashChange() {
      setFormRoute(readSkillFormRoute());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const activeFormMode = usesHashRouting() ? formRoute.mode : localFormMode;
  const activeSkillName = usesHashRouting() ? formRoute.skillName : localSkillName;
  const activeSkillVersion = usesHashRouting() ? formRoute.skillVersion : localSkillVersion;

  function navigateToList() {
    if (usesHashRouting()) {
      setDashboardLocationHash(skillsListHash());
      return;
    }
    setLocalFormMode(null);
    setLocalSkillName(null);
    setLocalSkillVersion(null);
  }

  function openCreatePage() {
    if (usesHashRouting()) {
      setDashboardLocationHash(skillCreateHash());
      return;
    }
    setLocalFormMode("create");
    setLocalSkillName(null);
    setLocalSkillVersion(null);
  }

  function openImportPage() {
    if (usesHashRouting()) {
      setDashboardLocationHash(skillImportHash());
      return;
    }
    setLocalFormMode("import");
    setLocalSkillName(null);
    setLocalSkillVersion(null);
  }

  if (activeFormMode === "import") {
    return (
      <SectionCard
        title="Import Skill"
        subtitle="Create a skill version from JSON or YAML."
        action={
          <Button variant="outlined" onClick={navigateToList}>
            ← All skills
          </Button>
        }
      >
        <SkillImportPage onCancel={navigateToList} onImported={navigateToList} />
      </SectionCard>
    );
  }

  if (activeFormMode) {
    const backLabel =
      activeFormMode === "edit" && activeSkillName ? `← ${activeSkillName}` : "← All skills";
    const title =
      activeFormMode === "create"
        ? "Register Skill"
        : activeFormMode === "add-version"
          ? "Add Version"
          : "Edit Skill";

    return (
      <SectionCard
        title={title}
        subtitle={
          activeFormMode === "edit" && activeSkillName && activeSkillVersion
            ? `${activeSkillName} @ ${activeSkillVersion}`
            : "Versioned Agent Skills catalog with lifecycle and DLC status."
        }
        action={
          <Button variant="outlined" onClick={navigateToList}>
            {backLabel}
          </Button>
        }
      >
        <SkillFormPage
          mode={activeFormMode}
          skillName={activeSkillName}
          skillVersion={activeSkillVersion}
          onCancel={navigateToList}
          onSaved={navigateToList}
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Skills"
      subtitle="Versioned Agent Skills catalog with lifecycle and DLC status."
      action={
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button variant="outlined" onClick={openImportPage}>
            Import Skill
          </Button>
          <Button variant="contained" onClick={openCreatePage}>
            Register Skill
          </Button>
        </Stack>
      }
    >
      <SkillsCatalogPanel
        onAddVersion={(name) => {
          if (usesHashRouting()) {
            setDashboardLocationHash(skillAddVersionHash(name));
            return;
          }
          setLocalFormMode("add-version");
          setLocalSkillName(name);
          setLocalSkillVersion(null);
        }}
        onEditSkill={(name, version) => {
          if (usesHashRouting()) {
            setDashboardLocationHash(skillEditHash(name, version));
            return;
          }
          setLocalFormMode("edit");
          setLocalSkillName(name);
          setLocalSkillVersion(version);
        }}
      />
    </SectionCard>
  );
}
