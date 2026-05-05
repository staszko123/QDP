import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Eye,
  FilePlus2,
  GripVertical,
  ListPlus,
  Plus,
  Save,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  ScoreBadge,
  SectionHeader,
  Select,
  StatusPill,
  Textarea,
} from "../ui";

type BuilderStep = "details" | "sections" | "criteria" | "thresholds" | "preview";
type CriterionType =
  | "Tak/Nie"
  | "Skala punktowa"
  | "Lista wyboru"
  | "Komentarz tekstowy"
  | "Ocena procentowa"
  | "Kryterium krytyczne";

interface BuilderCriterion {
  id: string;
  name: string;
  type: CriterionType;
  maxScore: number;
  weight: number;
  requiredComment: boolean;
  critical: boolean;
  options: string[];
}

interface BuilderSection {
  id: string;
  name: string;
  description: string;
  weight: number;
  criteria: BuilderCriterion[];
}

interface QualityThreshold {
  id: string;
  label: "Dobry" | "Wymaga uwagi" | "Słaby" | "Krytyczny";
  minPercentage: number;
}

interface TemplateDraft {
  id: string;
  name: string;
  active: boolean;
  sections: BuilderSection[];
  thresholds: QualityThreshold[];
}

const steps: Array<{ id: BuilderStep; label: string }> = [
  { id: "details", label: "Dane" },
  { id: "sections", label: "Sekcje" },
  { id: "criteria", label: "Kryteria" },
  { id: "thresholds", label: "Progi" },
  { id: "preview", label: "Podgląd" },
];

const criterionTypes: CriterionType[] = [
  "Tak/Nie",
  "Skala punktowa",
  "Lista wyboru",
  "Komentarz tekstowy",
  "Ocena procentowa",
  "Kryterium krytyczne",
];

const initialTemplate: TemplateDraft = {
  id: "template-builder-draft",
  name: "Nowy szablon oceny",
  active: false,
  sections: [
    {
      id: "section-resolution",
      name: "Rozwiązanie sprawy",
      description: "Ocena jakości rozwiązania problemu klienta.",
      weight: 60,
      criteria: [
        {
          id: "criterion-solved",
          name: "Problem został rozwiązany",
          type: "Tak/Nie",
          maxScore: 5,
          weight: 3,
          requiredComment: false,
          critical: true,
          options: [],
        },
      ],
    },
  ],
  thresholds: [
    { id: "threshold-good", label: "Dobry", minPercentage: 85 },
    { id: "threshold-attention", label: "Wymaga uwagi", minPercentage: 70 },
    { id: "threshold-weak", label: "Słaby", minPercentage: 50 },
    { id: "threshold-critical", label: "Krytyczny", minPercentage: 0 },
  ],
};

export function EvaluationTemplateBuilder() {
  const [template, setTemplate] = useState<TemplateDraft>(initialTemplate);
  const [activeStep, setActiveStep] = useState<BuilderStep>("details");
  const [activeSectionId, setActiveSectionId] = useState(initialTemplate.sections[0]?.id ?? "");
  const [activeCriterionId, setActiveCriterionId] = useState(
    initialTemplate.sections[0]?.criteria[0]?.id ?? ""
  );
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const activeSection = template.sections.find((section) => section.id === activeSectionId);
  const activeCriterion = activeSection?.criteria.find(
    (criterion) => criterion.id === activeCriterionId
  );
  const validationMessages = useMemo(() => validateTemplate(template), [template]);
  const completion = useMemo(() => calculateCompletion(template), [template]);

  function updateTemplate(patch: Partial<TemplateDraft>) {
    setTemplate((current) => ({ ...current, ...patch }));
  }

  function updateSection(sectionId: string, patch: Partial<BuilderSection>) {
    setTemplate((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId ? { ...section, ...patch } : section
      ),
    }));
  }

  function updateCriterion(
    sectionId: string,
    criterionId: string,
    patch: Partial<BuilderCriterion>
  ) {
    setTemplate((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              criteria: section.criteria.map((criterion) =>
                criterion.id === criterionId ? { ...criterion, ...patch } : criterion
              ),
            }
          : section
      ),
    }));
  }

  function addSection() {
    const section: BuilderSection = {
      id: createId("section"),
      name: `Sekcja ${template.sections.length + 1}`,
      description: "",
      weight: 20,
      criteria: [],
    };

    setTemplate((current) => ({ ...current, sections: [...current.sections, section] }));
    setActiveSectionId(section.id);
    setActiveCriterionId("");
    setActiveStep("sections");
  }

  function addCriterion() {
    if (!activeSection) {
      addSection();
      return;
    }

    const criterion: BuilderCriterion = {
      id: createId("criterion"),
      name: `Kryterium ${activeSection.criteria.length + 1}`,
      type: "Skala punktowa",
      maxScore: 5,
      weight: 1,
      requiredComment: false,
      critical: false,
      options: ["Opcja A", "Opcja B"],
    };

    setTemplate((current) => ({
      ...current,
      sections: current.sections.map((section) =>
        section.id === activeSection.id
          ? { ...section, criteria: [...section.criteria, criterion] }
          : section
      ),
    }));
    setActiveCriterionId(criterion.id);
    setActiveStep("criteria");
  }

  function duplicateTemplate() {
    const duplicatedSections = template.sections.map((section) => ({
      ...section,
      id: createId("section"),
      criteria: section.criteria.map((criterion) => ({
        ...criterion,
        id: createId("criterion"),
      })),
    }));

    setTemplate({
      ...template,
      id: createId("template"),
      name: `${template.name} kopia`,
      active: false,
      sections: duplicatedSections,
    });
    setActiveSectionId(duplicatedSections[0]?.id ?? "");
    setActiveCriterionId(duplicatedSections[0]?.criteria[0]?.id ?? "");
    setDraftSavedAt(null);
  }

  function saveDraft() {
    setDraftSavedAt(new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }));
  }

  return (
    <Card className="builder-shell" elevated id="builder">
      <div className="builder-progress">
        <div>
          <p className="qd-eyebrow">Kreator ocen</p>
          <h2>Szablon oceny klienta</h2>
        </div>
        <div className="builder-progress__meter" aria-label="Postęp kreatora">
          <span style={{ width: `${completion}%` }} />
        </div>
        <strong>{completion}%</strong>
      </div>

      <div className="builder-steps" role="tablist" aria-label="Kroki kreatora">
        {steps.map((step) => (
          <button
            aria-selected={activeStep === step.id}
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            role="tab"
            type="button"
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="builder-grid">
        <aside className="builder-sections" aria-label="Lista sekcji">
          <SectionHeader
            action={
              <Button onClick={addSection} size="sm" variant="secondary">
                <Plus aria-hidden="true" size={16} />
                Sekcja
              </Button>
            }
            description="Wybierz sekcję do edycji lub dodaj nową."
            title="Sekcje"
          />

          {template.sections.length === 0 ? (
            <EmptyState
              action={
                <Button onClick={addSection} size="sm">
                  Dodaj sekcję
                </Button>
              }
              description="Szablon potrzebuje przynajmniej jednej sekcji."
              icon={<ListPlus aria-hidden="true" />}
              title="Brak sekcji"
            />
          ) : (
            <div className="builder-section-list">
              {template.sections.map((section) => (
                <button
                  aria-pressed={activeSectionId === section.id}
                  key={section.id}
                  onClick={() => {
                    setActiveSectionId(section.id);
                    setActiveCriterionId(section.criteria[0]?.id ?? "");
                    setActiveStep("sections");
                  }}
                  type="button"
                >
                  <GripVertical aria-hidden="true" size={16} />
                  <span>
                    <strong>{section.name}</strong>
                    <small>
                      {section.criteria.length} kryteria · waga {section.weight}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          )}
        </aside>

        <section className="builder-editor">
          <SectionHeader
            action={<StatusPill label={template.active ? "Aktywny" : "Wersja robocza"} tone={template.active ? "success" : "warning"} />}
            description="Edytuj nazwę, sekcje, kryteria, progi jakości i ustawienia publikacji."
            title="Edycja szablonu"
          />

          <div className="builder-editor-grid">
            <Input
              label="Nazwa szablonu"
              name="templateName"
              onChange={(event) => updateTemplate({ name: event.target.value })}
              value={template.name}
            />

            <label className="qd-field builder-toggle">
              <span>Aktywność szablonu</span>
              <button
                aria-pressed={template.active}
                className="builder-toggle__control"
                onClick={() => updateTemplate({ active: !template.active })}
                type="button"
              >
                <span />
                {template.active ? "Aktywny" : "Nieaktywny"}
              </button>
            </label>
          </div>

          {activeSection ? (
            <div className="builder-edit-block">
              <SectionHeader
                action={
                  <Button onClick={addCriterion} size="sm" variant="secondary">
                    <Plus aria-hidden="true" size={16} />
                    Kryterium
                  </Button>
                }
                description="Po lewej wybierasz sekcję, po prawej edytujesz jej zawartość."
                title="Aktywna sekcja"
              />
              <div className="builder-editor-grid">
                <Input
                  label="Nazwa sekcji"
                  name="sectionName"
                  onChange={(event) => updateSection(activeSection.id, { name: event.target.value })}
                  value={activeSection.name}
                />
                <Input
                  label="Waga sekcji"
                  min={0}
                  name="sectionWeight"
                  onChange={(event) =>
                    updateSection(activeSection.id, { weight: Number(event.target.value) })
                  }
                  type="number"
                  value={activeSection.weight}
                />
                <Textarea
                  label="Opis sekcji"
                  name="sectionDescription"
                  onChange={(event) =>
                    updateSection(activeSection.id, { description: event.target.value })
                  }
                  rows={3}
                  value={activeSection.description}
                />
              </div>

              {activeSection.criteria.length === 0 ? (
                <EmptyState
                  action={
                    <Button onClick={addCriterion}>
                      <FilePlus2 aria-hidden="true" size={18} />
                      Dodaj pierwsze kryterium
                    </Button>
                  }
                  description="Sekcja będzie widoczna w podglądzie po dodaniu kryteriów."
                  icon={<AlertTriangle aria-hidden="true" />}
                  title="Brak kryteriów w sekcji"
                />
              ) : (
                <div className="criterion-layout">
                  <div className="criterion-list">
                    {activeSection.criteria.map((criterion) => (
                      <button
                        aria-pressed={activeCriterionId === criterion.id}
                        key={criterion.id}
                        onClick={() => {
                          setActiveCriterionId(criterion.id);
                          setActiveStep("criteria");
                        }}
                        type="button"
                      >
                        <strong>{criterion.name}</strong>
                        <small>{criterion.type}</small>
                      </button>
                    ))}
                  </div>

                  {activeCriterion ? (
                    <div className="criterion-editor">
                      <div className="builder-editor-grid">
                        <Input
                          label="Nazwa kryterium"
                          name="criterionName"
                          onChange={(event) =>
                            updateCriterion(activeSection.id, activeCriterion.id, {
                              name: event.target.value,
                            })
                          }
                          value={activeCriterion.name}
                        />
                        <Select
                          label="Typ kryterium"
                          name="criterionType"
                          onChange={(event) =>
                            updateCriterion(activeSection.id, activeCriterion.id, {
                              critical: event.target.value === "Kryterium krytyczne",
                              type: event.target.value as CriterionType,
                            })
                          }
                          options={criterionTypes.map((type) => ({ label: type, value: type }))}
                          value={activeCriterion.type}
                        />
                        <Input
                          label="Punktacja maksymalna"
                          min={0}
                          name="maxScore"
                          onChange={(event) =>
                            updateCriterion(activeSection.id, activeCriterion.id, {
                              maxScore: Number(event.target.value),
                            })
                          }
                          type="number"
                          value={activeCriterion.maxScore}
                        />
                        <Input
                          label="Waga kryterium"
                          min={0}
                          name="criterionWeight"
                          onChange={(event) =>
                            updateCriterion(activeSection.id, activeCriterion.id, {
                              weight: Number(event.target.value),
                            })
                          }
                          type="number"
                          value={activeCriterion.weight}
                        />
                      </div>

                      <div className="builder-checks">
                        <label>
                          <input
                            checked={activeCriterion.requiredComment}
                            onChange={(event) =>
                              updateCriterion(activeSection.id, activeCriterion.id, {
                                requiredComment: event.target.checked,
                              })
                            }
                            type="checkbox"
                          />
                          Komentarz wymagany
                        </label>
                        <label>
                          <input
                            checked={activeCriterion.critical}
                            onChange={(event) =>
                              updateCriterion(activeSection.id, activeCriterion.id, {
                                critical: event.target.checked,
                                type: event.target.checked ? "Kryterium krytyczne" : activeCriterion.type,
                              })
                            }
                            type="checkbox"
                          />
                          Kryterium krytyczne
                        </label>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ) : null}

          <div className="builder-edit-block">
            <SectionHeader
              description="Minimalne wyniki procentowe dla statusów jakości."
              title="Progi jakości"
            />
            <div className="threshold-grid">
              {template.thresholds.map((threshold) => (
                <Input
                  key={threshold.id}
                  label={threshold.label}
                  min={0}
                  max={100}
                  name={threshold.id}
                  onChange={(event) =>
                    updateTemplate({
                      thresholds: template.thresholds.map((item) =>
                        item.id === threshold.id
                          ? { ...item, minPercentage: Number(event.target.value) }
                          : item
                      ),
                    })
                  }
                  type="number"
                  value={threshold.minPercentage}
                />
              ))}
            </div>
          </div>

          <div className="builder-edit-block builder-preview">
            <SectionHeader
              action={
                <Button onClick={() => setActiveStep("preview")} size="sm" variant="secondary">
                  <Eye aria-hidden="true" size={16} />
                  Podgląd
                </Button>
              }
              description="Tak formularz będzie wyglądał dla osoby oceniającej."
              title="Podgląd formularza"
            />
            {template.sections.length === 0 ? (
              <EmptyState
                description="Dodaj sekcje i kryteria, aby zobaczyć formularz."
                icon={<Eye aria-hidden="true" />}
                title="Podgląd jest pusty"
              />
            ) : (
              template.sections.map((section) => (
                <div className="preview-section" key={section.id}>
                  <h3>{section.name}</h3>
                  {section.criteria.map((criterion) => (
                    <div className="preview-criterion" key={criterion.id}>
                      <span>
                        {criterion.name}
                        {criterion.requiredComment ? <Badge tone="orange">Komentarz</Badge> : null}
                        {criterion.critical ? <Badge tone="danger">Krytyczne</Badge> : null}
                      </span>
                      <ScoreBadge percentage={Math.round((criterion.maxScore / 5) * 100)} severity="good" />
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          <div className="builder-validation" aria-live="polite">
            {validationMessages.length === 0 ? (
              <StatusPill label="Szablon gotowy do zapisu" tone="success" />
            ) : (
              validationMessages.map((message) => (
                <p key={message}>
                  <AlertTriangle aria-hidden="true" size={16} />
                  {message}
                </p>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="builder-actions">
        <div>
          {draftSavedAt ? (
            <span>
              <CheckCircle2 aria-hidden="true" size={16} />
              Wersja robocza zapisana o {draftSavedAt}
            </span>
          ) : (
            <span>Zmiany nie zostały jeszcze zapisane.</span>
          )}
        </div>
        <div>
          <Button onClick={duplicateTemplate} variant="secondary">
            <Copy aria-hidden="true" size={17} />
            Duplikuj
          </Button>
          <Button onClick={saveDraft}>
            <Save aria-hidden="true" size={17} />
            Zapisz wersję roboczą
          </Button>
        </div>
      </div>
    </Card>
  );
}

function validateTemplate(template: TemplateDraft): string[] {
  const messages: string[] = [];

  if (template.name.trim().length < 3) {
    messages.push("Nazwa szablonu musi mieć co najmniej 3 znaki.");
  }

  if (template.sections.length === 0) {
    messages.push("Dodaj przynajmniej jedną sekcję.");
  }

  template.sections.forEach((section) => {
    if (section.name.trim().length === 0) {
      messages.push("Każda sekcja musi mieć nazwę.");
    }

    if (section.weight <= 0) {
      messages.push(`Sekcja "${section.name}" musi mieć wagę większą od 0.`);
    }

    if (section.criteria.length === 0) {
      messages.push(`Sekcja "${section.name}" nie ma kryteriów.`);
    }

    section.criteria.forEach((criterion) => {
      if (criterion.name.trim().length === 0) {
        messages.push(`Kryterium w sekcji "${section.name}" musi mieć nazwę.`);
      }

      if (criterion.maxScore <= 0 && criterion.type !== "Komentarz tekstowy") {
        messages.push(`Kryterium "${criterion.name}" musi mieć punktację większą od 0.`);
      }

      if (criterion.weight <= 0) {
        messages.push(`Kryterium "${criterion.name}" musi mieć wagę większą od 0.`);
      }
    });
  });

  return messages;
}

function calculateCompletion(template: TemplateDraft): number {
  const hasName = template.name.trim().length >= 3 ? 20 : 0;
  const hasSections = template.sections.length > 0 ? 20 : 0;
  const hasCriteria = template.sections.some((section) => section.criteria.length > 0) ? 25 : 0;
  const hasThresholds = template.thresholds.length >= 4 ? 20 : 0;
  const isValid = validateTemplate(template).length === 0 ? 15 : 0;

  return hasName + hasSections + hasCriteria + hasThresholds + isValid;
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
