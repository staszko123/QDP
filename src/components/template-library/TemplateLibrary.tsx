import { useMemo, useState } from "react";
import { CheckCircle2, Copy, Eye, Pencil, Sparkles } from "lucide-react";
import { templateLibrary, type LibraryTemplate, type TemplateDifficulty } from "./mockTemplateLibrary";
import { Badge, Button, Card, EmptyState, Input, SectionHeader, StatusPill, Textarea } from "../ui";

const difficultyTone: Record<TemplateDifficulty, "success" | "warning" | "danger"> = {
  Podstawowy: "success",
  Średni: "warning",
  Zaawansowany: "danger",
};

export function TemplateLibrary() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateLibrary[0]?.id ?? "");
  const [copiedTemplate, setCopiedTemplate] = useState<LibraryTemplate | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const selectedTemplate = useMemo(
    () => templateLibrary.find((template) => template.id === selectedTemplateId) ?? templateLibrary[0],
    [selectedTemplateId]
  );

  function useTemplate(template: LibraryTemplate) {
    const copy = {
      ...template,
      id: `org-copy-${template.id}`,
      name: `${template.name} - kopia organizacji`,
    };

    setCopiedTemplate(copy);
    setEditedName(copy.name);
    setEditedDescription(copy.description);
  }

  function saveCopiedEdit() {
    if (!copiedTemplate) {
      return;
    }

    setCopiedTemplate({
      ...copiedTemplate,
      name: editedName,
      description: editedDescription,
    });
  }

  return (
    <section className="template-library" id="templates">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label={`${templateLibrary.length} szablonów`} tone="blue" />}
          description="Realistyczne, fikcyjne szablony startowe gotowe do skopiowania i edycji w organizacji."
          title="Biblioteka szablonów ocen"
        />

        <div className="template-library-grid">
          <div className="template-list" aria-label="Lista szablonów">
            {templateLibrary.map((template) => (
              <button
                aria-pressed={selectedTemplate?.id === template.id}
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                type="button"
              >
                <span>
                  <strong>{template.name}</strong>
                  <small>{template.recommendedTeamType}</small>
                </span>
                <StatusPill label={template.difficulty} tone={difficultyTone[template.difficulty]} />
              </button>
            ))}
          </div>

          {selectedTemplate ? (
            <TemplatePreview template={selectedTemplate} onUseTemplate={useTemplate} />
          ) : (
            <EmptyState
              description="Dodaj lub wybierz szablon, aby zobaczyć szczegóły."
              icon={<Eye aria-hidden="true" />}
              title="Brak podglądu"
            />
          )}
        </div>
      </Card>

      {copiedTemplate ? (
        <Card className="template-copy-editor">
          <SectionHeader
            action={<StatusPill label="Skopiowano do organizacji" tone="success" />}
            description="Po skopiowaniu szablon można edytować jako wersję organizacyjną."
            title="Edycja po skopiowaniu"
          />
          <div className="template-copy-grid">
            <Input
              label="Nazwa szablonu"
              name="copiedTemplateName"
              onChange={(event) => setEditedName(event.target.value)}
              value={editedName}
            />
            <Textarea
              label="Opis"
              name="copiedTemplateDescription"
              onChange={(event) => setEditedDescription(event.target.value)}
              rows={3}
              value={editedDescription}
            />
          </div>
          <div className="template-copy-actions">
            <span>
              <CheckCircle2 aria-hidden="true" size={16} />
              {copiedTemplate.name}
            </span>
            <Button onClick={saveCopiedEdit}>
              <Pencil aria-hidden="true" size={17} />
              Zapisz edycję
            </Button>
          </div>
        </Card>
      ) : null}
    </section>
  );
}

function TemplatePreview({
  onUseTemplate,
  template,
}: {
  onUseTemplate: (template: LibraryTemplate) => void;
  template: LibraryTemplate;
}) {
  const criteriaCount = template.sections.reduce(
    (sum, section) => sum + section.criteria.length,
    0
  );

  return (
    <div className="template-preview">
      <div className="template-preview__header">
        <div>
          <p className="qd-eyebrow">Podgląd szablonu</p>
          <h3>{template.name}</h3>
          <p>{template.description}</p>
        </div>
        <Button onClick={() => onUseTemplate(template)}>
          <Sparkles aria-hidden="true" size={17} />
          Użyj szablonu
        </Button>
      </div>

      <div className="template-meta-grid">
        <div>
          <span>Poziom trudności</span>
          <StatusPill label={template.difficulty} tone={difficultyTone[template.difficulty]} />
        </div>
        <div>
          <span>Rekomendowany typ zespołu</span>
          <strong>{template.recommendedTeamType}</strong>
        </div>
        <div>
          <span>Czas oceny</span>
          <strong>{template.estimatedMinutes} min</strong>
        </div>
        <div>
          <span>Kryteria</span>
          <strong>{criteriaCount}</strong>
        </div>
      </div>

      <div className="template-tags">
        {template.tags.map((tag) => (
          <Badge key={tag} tone="blue">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="template-section-preview">
        {template.sections.map((section) => (
          <div key={section.name}>
            <header>
              <strong>{section.name}</strong>
              <Badge tone="orange">waga {section.weight}</Badge>
            </header>
            {section.criteria.map((criterion) => (
              <p key={criterion.name}>
                <span>{criterion.name}</span>
                <small>
                  {criterion.type} · max {criterion.maxScore} · waga {criterion.weight}
                  {criterion.critical ? " · krytyczne" : ""}
                </small>
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="template-preview__footer">
        <Button onClick={() => onUseTemplate(template)} variant="secondary">
          <Copy aria-hidden="true" size={17} />
          Duplikuj do organizacji
        </Button>
      </div>
    </div>
  );
}
