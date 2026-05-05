import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Save,
  Send,
} from "lucide-react";
import { generateScoreSummary, type ScoringEvaluationInput } from "../../scoring";
import { AiAssistantPanel, type AiCriterionSuggestion } from "../ai-assistant";
import {
  Badge,
  Button,
  Card,
  Input,
  SectionHeader,
  Select,
  StatusPill,
  Textarea,
} from "../ui";

type ContactType = "Rozmowa sprzedażowa" | "Wsparcie techniczne" | "Reklamacja";
type ContactChannel = "Telefon" | "Email" | "Chat" | "Messenger";
type EvaluationMode = "Pełna ocena" | "Szybka kontrola" | "Kalibracja";

interface EvaluationCriterionForm {
  id: string;
  label: string;
  maxScore: number;
  weight: number;
  critical?: boolean;
  requiredComment?: boolean;
}

interface EvaluationSectionForm {
  id: string;
  title: string;
  weight: number;
  criteria: EvaluationCriterionForm[];
}

interface EvaluationFormState {
  specialistName: string;
  specialistId: string;
  team: string;
  evaluationDate: string;
  period: string;
  mode: EvaluationMode;
  contactType: ContactType;
  channel: ContactChannel;
  conversationId: string;
  caseId: string;
  templateId: string;
  finalComment: string;
}

const templates = [
  { id: "support-quality", label: "Support Quality Scorecard" },
  { id: "complaint-review", label: "Complaint Review" },
];

const sections: EvaluationSectionForm[] = [
  {
    id: "resolution",
    title: "Rozwiązanie sprawy",
    weight: 55,
    criteria: [
      {
        id: "resolved",
        label: "Problem klienta został rozwiązany",
        maxScore: 5,
        weight: 3,
        critical: true,
      },
      {
        id: "policy",
        label: "Odpowiedź była zgodna z procedurą",
        maxScore: 5,
        weight: 2,
        requiredComment: true,
      },
    ],
  },
  {
    id: "communication",
    title: "Komunikacja",
    weight: 45,
    criteria: [
      {
        id: "empathy",
        label: "Specjalista okazał empatię",
        maxScore: 5,
        weight: 2,
      },
      {
        id: "next-steps",
        label: "Kolejne kroki były jasne",
        maxScore: 5,
        weight: 1,
      },
    ],
  },
];

const initialFormState: EvaluationFormState = {
  specialistName: "Anna Kaczmarek",
  specialistId: "specialist-anna",
  team: "Support PL",
  evaluationDate: "2026-05-05",
  period: "2026-04-27 - 2026-05-04",
  mode: "Pełna ocena",
  contactType: "Wsparcie techniczne",
  channel: "Chat",
  conversationId: "CONV-2026-1048",
  caseId: "CASE-88421",
  templateId: "support-quality",
  finalComment: "",
};

const initialScores = Object.fromEntries(
  sections.flatMap((section) =>
    section.criteria.map((criterion) => [criterion.id, criterion.maxScore])
  )
);

const initialComments = Object.fromEntries(
  sections.flatMap((section) => section.criteria.map((criterion) => [criterion.id, ""]))
);

export function EvaluationForm() {
  const [form, setForm] = useState<EvaluationFormState>(initialFormState);
  const [scores, setScores] = useState<Record<string, number>>(initialScores);
  const [comments, setComments] = useState<Record<string, string>>(initialComments);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "");
  const [savedState, setSavedState] = useState<string | null>(null);

  const scoringInput = useMemo<ScoringEvaluationInput>(
    () => ({
      id: "evaluation-form-live",
      title: form.templateId,
      sections: sections.map((section) => ({
        id: section.id,
        title: section.title,
        weight: section.weight,
        criteria: section.criteria.map((criterion) => ({
          id: criterion.id,
          label: criterion.label,
          sectionId: section.id,
          maxScore: criterion.maxScore,
          weight: criterion.weight,
          score: scores[criterion.id] ?? 0,
          answer: scores[criterion.id] ?? 0,
          critical: criterion.critical,
          criticalFailure: criterion.critical && (scores[criterion.id] ?? 0) === 0,
          required: true,
        })),
      })),
    }),
    [form.templateId, scores]
  );

  const scoreSummary = useMemo(() => generateScoreSummary(scoringInput), [scoringInput]);
  const validationMessages = useMemo(
    () => validateEvaluation(form, scores, comments),
    [comments, form, scores]
  );

  function updateForm(patch: Partial<EvaluationFormState>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  function saveEvaluation(kind: "draft" | "final" | "export") {
    const timestamp = new Date().toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const label =
      kind === "draft"
        ? "Wersja robocza zapisana"
        : kind === "final"
          ? "Ocena zapisana"
          : "Eksport mock przygotowany";

    setSavedState(`${label} o ${timestamp}`);
  }

  return (
    <section className="evaluation-form-shell" id="evaluations">
      <div className="evaluation-form-main">
        <Card elevated>
          <SectionHeader
            action={<StatusPill label={form.mode} tone="blue" />}
            description="Wybierz tryb i szablon, a następnie uzupełnij dane kontaktu oraz wynik oceny."
            title="Formularz oceny"
          />

          <div className="evaluation-mode-grid">
            <Select
              label="Tryb oceny"
              name="evaluationMode"
              onChange={(event) => updateForm({ mode: event.target.value as EvaluationMode })}
              options={[
                { label: "Pełna ocena", value: "Pełna ocena" },
                { label: "Szybka kontrola", value: "Szybka kontrola" },
                { label: "Kalibracja", value: "Kalibracja" },
              ]}
              value={form.mode}
            />
            <Select
              label="Wybór szablonu oceny"
              name="template"
              onChange={(event) => updateForm({ templateId: event.target.value })}
              options={templates.map((template) => ({
                label: template.label,
                value: template.id,
              }))}
              value={form.templateId}
            />
          </div>

          <div className="conversation-panel">
            <SectionHeader
              description="Dane rozmowy są pod wyborem trybu oceny, żeby oceniający najpierw potwierdził kontekst."
              title="Dane rozmowy"
            />
            <div className="evaluation-field-grid">
              <Input
                label="Dane ocenianego specjalisty"
                name="specialistName"
                onChange={(event) => updateForm({ specialistName: event.target.value })}
                value={form.specialistName}
              />
              <Input
                label="ID specjalisty"
                name="specialistId"
                onChange={(event) => updateForm({ specialistId: event.target.value })}
                value={form.specialistId}
              />
              <Input
                label="Data oceny"
                name="evaluationDate"
                onChange={(event) => updateForm({ evaluationDate: event.target.value })}
                type="date"
                value={form.evaluationDate}
              />
              <Input
                label="Okres"
                name="period"
                onChange={(event) => updateForm({ period: event.target.value })}
                value={form.period}
              />
              <Select
                label="Typ kontaktu"
                name="contactType"
                onChange={(event) =>
                  updateForm({ contactType: event.target.value as ContactType })
                }
                options={[
                  { label: "Rozmowa sprzedażowa", value: "Rozmowa sprzedażowa" },
                  { label: "Wsparcie techniczne", value: "Wsparcie techniczne" },
                  { label: "Reklamacja", value: "Reklamacja" },
                ]}
                value={form.contactType}
              />
              <Select
                label="Kanał kontaktu"
                name="channel"
                onChange={(event) => updateForm({ channel: event.target.value as ContactChannel })}
                options={[
                  { label: "Telefon", value: "Telefon" },
                  { label: "Email", value: "Email" },
                  { label: "Chat", value: "Chat" },
                  { label: "Messenger", value: "Messenger" },
                ]}
                value={form.channel}
              />
              <Input
                label="ID rozmowy"
                name="conversationId"
                onChange={(event) => updateForm({ conversationId: event.target.value })}
                value={form.conversationId}
              />
              <Input
                label="ID sprawy"
                name="caseId"
                onChange={(event) => updateForm({ caseId: event.target.value })}
                value={form.caseId}
              />
              <Input
                label="Zespół"
                name="team"
                onChange={(event) => updateForm({ team: event.target.value })}
                value={form.team}
              />
            </div>
          </div>
        </Card>

        <div className="evaluation-section-list" aria-label="Sekcje formularza">
          {sections.map((section) => {
            const sectionScore = scoreSummary.sections.find((item) => item.sectionId === section.id);
            const isActive = activeSectionId === section.id;

            return (
              <Card
                className={`evaluation-section-card ${
                  isActive ? "evaluation-section-card--active" : ""
                }`}
                key={section.id}
                onMouseEnter={() => setActiveSectionId(section.id)}
              >
                <SectionHeader
                  action={
                    <Badge tone={sectionScore && sectionScore.percentage >= 70 ? "success" : "danger"}>
                      {sectionScore?.percentage ?? 0}%
                    </Badge>
                  }
                  description={`Waga sekcji: ${section.weight}`}
                  title={section.title}
                />

                <div className="criterion-score-list">
                  {section.criteria.map((criterion) => (
                    <div className="criterion-score-row" key={criterion.id}>
                      <div className="criterion-score-row__header">
                        <div>
                          <strong>{criterion.label}</strong>
                          <span>
                            max {criterion.maxScore} pkt · waga {criterion.weight}
                          </span>
                        </div>
                        <div className="score-stepper" aria-label={`Punktacja ${criterion.label}`}>
                          {Array.from({ length: criterion.maxScore + 1 }, (_, score) => (
                            <button
                              aria-pressed={(scores[criterion.id] ?? 0) === score}
                              key={score}
                              onClick={() =>
                                setScores((current) => ({ ...current, [criterion.id]: score }))
                              }
                              type="button"
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Textarea
                        label={`Komentarz do kryterium${criterion.requiredComment ? " (wymagany)" : ""}`}
                        name={`${criterion.id}-comment`}
                        onChange={(event) =>
                          setComments((current) => ({
                            ...current,
                            [criterion.id]: event.target.value,
                          }))
                        }
                        placeholder="Dodaj uzasadnienie oceny"
                        rows={2}
                        value={comments[criterion.id] ?? ""}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card>
          <SectionHeader
            description="Widoczny w raporcie końcowym oraz historii audytu oceny."
            title="Komentarz końcowy"
          />
          <Textarea
            label="Komentarz końcowy"
            name="finalComment"
            onChange={(event) => updateForm({ finalComment: event.target.value })}
            placeholder="Podsumuj wynik oceny i rekomendowane działania"
            rows={4}
            value={form.finalComment}
          />
        </Card>

        <div className="evaluation-actions">
          <div aria-live="polite">
            {savedState ? (
              <span className="evaluation-save-state">
                <CheckCircle2 aria-hidden="true" size={16} />
                {savedState}
              </span>
            ) : (
              <span>Ocena nie została jeszcze zapisana.</span>
            )}
          </div>
          <div>
            <Button onClick={() => saveEvaluation("export")} variant="secondary">
              <Download aria-hidden="true" size={17} />
              Eksport mock
            </Button>
            <Button onClick={() => saveEvaluation("draft")} variant="secondary">
              <Save aria-hidden="true" size={17} />
              Zapis wersji roboczej
            </Button>
            <Button disabled={validationMessages.length > 0} onClick={() => saveEvaluation("final")}>
              <Send aria-hidden="true" size={17} />
              Zapis oceny
            </Button>
          </div>
        </div>

        <AiAssistantPanel
          humanComments={comments}
          humanScores={scores}
          onAcceptSuggestion={(suggestion: AiCriterionSuggestion) => {
            setScores((current) => ({
              ...current,
              [suggestion.criterionId]: suggestion.suggestedScore,
            }));
            setComments((current) => ({
              ...current,
              [suggestion.criterionId]: suggestion.suggestedComment,
            }));
          }}
        />
      </div>

      <aside className="evaluation-score-panel">
        <Card elevated>
          <div className="score-panel-header">
            <div>
              <p className="qd-eyebrow">Wynik końcowy</p>
              <strong
                className={
                  scoreSummary.status === "Dobry"
                    ? "score-positive"
                    : scoreSummary.status === "Krytyczny"
                      ? "score-negative"
                      : ""
                }
              >
                {scoreSummary.percentage}%
              </strong>
            </div>
            <StatusPill
              label={scoreSummary.status}
              tone={scoreSummary.status === "Dobry" ? "success" : "danger"}
            />
          </div>

          <div className="score-panel-details">
            <div>
              <span>Wynik punktowy</span>
              <strong>
                {scoreSummary.score}/{scoreSummary.maxScore}
              </strong>
            </div>
            <div>
              <span>Wynik ważony</span>
              <strong>{scoreSummary.weightedScore}/100</strong>
            </div>
            <div>
              <span>Krytyczne błędy</span>
              <strong className={scoreSummary.criticalFailures.length > 0 ? "score-negative" : "score-positive"}>
                {scoreSummary.criticalFailures.length}
              </strong>
            </div>
          </div>

          <p className="score-summary-text">{scoreSummary.summary}</p>

          <div className="evaluation-validation" aria-live="polite">
            {validationMessages.length === 0 ? (
              <p className="evaluation-validation__success">
                <CheckCircle2 aria-hidden="true" size={16} />
                Formularz gotowy do zapisu.
              </p>
            ) : (
              validationMessages.map((message) => (
                <p key={message}>
                  <AlertTriangle aria-hidden="true" size={16} />
                  {message}
                </p>
              ))
            )}
          </div>
        </Card>
      </aside>
    </section>
  );
}

function validateEvaluation(
  form: EvaluationFormState,
  scores: Record<string, number>,
  comments: Record<string, string>
): string[] {
  const messages: string[] = [];
  const requiredTextFields: Array<[string, string]> = [
    ["Dane specjalisty", form.specialistName],
    ["Data oceny", form.evaluationDate],
    ["Okres", form.period],
    ["ID rozmowy", form.conversationId],
    ["ID sprawy", form.caseId],
    ["Zespół", form.team],
    ["Komentarz końcowy", form.finalComment],
  ];

  requiredTextFields.forEach(([label, value]) => {
    if (value.trim().length === 0) {
      messages.push(`${label} jest wymagane.`);
    }
  });

  sections.forEach((section) => {
    section.criteria.forEach((criterion) => {
      if (scores[criterion.id] === undefined) {
        messages.push(`Uzupełnij punktację: ${criterion.label}.`);
      }

      if (criterion.requiredComment && (comments[criterion.id] ?? "").trim().length < 3) {
        messages.push(`Komentarz do kryterium "${criterion.label}" jest wymagany.`);
      }
    });
  });

  return messages;
}
