import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, CircleDashed, Lightbulb, SkipForward } from "lucide-react";
import { Badge, Button, Card, Input, SectionHeader, Select, StatusPill, Textarea } from "../ui";

type StepStatus = "pending" | "done" | "skipped";

interface OnboardingStep {
  id: string;
  title: string;
  hint: string;
  actionLabel: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "organization",
    title: "Utwórz organizację",
    hint: "Nadaj nazwę tenantowi i ustaw strefę czasową przed zapraszaniem zespołu.",
    actionLabel: "Utwórz organizację mock",
  },
  {
    id: "users",
    title: "Dodaj użytkowników",
    hint: "Zacznij od Ownera, Admina i Quality Managera, a role operacyjne dodaj później.",
    actionLabel: "Dodaj użytkowników",
  },
  {
    id: "teams",
    title: "Dodaj zespoły",
    hint: "Zespoły ułatwią filtrowanie dashboardów, raportów i uprawnień liderów.",
    actionLabel: "Dodaj zespół",
  },
  {
    id: "template",
    title: "Wybierz szablon oceny",
    hint: "Użyj biblioteki szablonów, jeśli chcesz szybko wystartować z gotowym formularzem.",
    actionLabel: "Wybierz szablon",
  },
  {
    id: "criteria",
    title: "Dostosuj kryteria",
    hint: "Ustaw punktację, wagi, komentarze wymagane i kryteria krytyczne.",
    actionLabel: "Dostosuj kryteria",
  },
  {
    id: "specialists",
    title: "Zaimportuj specjalistów",
    hint: "Możesz zacząć od importu CSV lub dodać specjalistów ręcznie.",
    actionLabel: "Import mock",
  },
  {
    id: "first-evaluation",
    title: "Wykonaj pierwszą ocenę",
    hint: "Pierwsza ocena pozwoli zweryfikować scoring i komentarze końcowe.",
    actionLabel: "Utwórz ocenę",
  },
  {
    id: "dashboard",
    title: "Zobacz dashboard",
    hint: "Po pierwszych ocenach dashboard pokaże trendy, statusy i ryzyka.",
    actionLabel: "Otwórz dashboard",
  },
  {
    id: "report",
    title: "Skonfiguruj raport",
    hint: "Wybierz raport zespołu lub raport do zarządu jako pierwszy cykliczny widok.",
    actionLabel: "Skonfiguruj raport",
  },
  {
    id: "invite-more",
    title: "Zaproś kolejnych użytkowników",
    hint: "Dodaj Team Leaderów, Evaluatorów i Viewerów po potwierdzeniu procesu.",
    actionLabel: "Zaproś osoby",
  },
];

export function OnboardingWizard() {
  const [activeStepId, setActiveStepId] = useState(onboardingSteps[0]?.id ?? "");
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const activeStep = onboardingSteps.find((step) => step.id === activeStepId) ?? onboardingSteps[0];
  const completedCount = useMemo(
    () => Object.values(stepStatuses).filter((status) => status === "done").length,
    [stepStatuses]
  );
  const handledCount = useMemo(
    () => Object.values(stepStatuses).filter((status) => status !== "pending").length,
    [stepStatuses]
  );
  const progress = Math.round((handledCount / onboardingSteps.length) * 100);

  function markStep(status: StepStatus) {
    setStepStatuses((current) => ({ ...current, [activeStep.id]: status }));
    const currentIndex = onboardingSteps.findIndex((step) => step.id === activeStep.id);
    const nextStep = onboardingSteps[currentIndex + 1];
    if (nextStep) {
      setActiveStepId(nextStep.id);
    }
  }

  return (
    <section className="onboarding-wizard" id="onboarding">
      <Card elevated>
        <div className="onboarding-header">
          <SectionHeader
            action={<StatusPill label={`${progress}% setup`} tone={progress === 100 ? "success" : "blue"} />}
            description="Checklist startowa dla nowego klienta QualityDesk. Każdy krok można wykonać albo pominąć."
            title="Onboarding klienta"
          />
          <div className="onboarding-progress" aria-label="Progress setup">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="onboarding-grid">
          <aside className="onboarding-checklist" aria-label="Checklist startowa">
            {onboardingSteps.map((step) => {
              const status = stepStatuses[step.id] ?? "pending";
              return (
                <button
                  aria-pressed={activeStepId === step.id}
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  type="button"
                >
                  {status === "done" ? (
                    <CheckCircle2 aria-hidden="true" className="score-positive" size={18} />
                  ) : status === "skipped" ? (
                    <SkipForward aria-hidden="true" className="score-negative" size={18} />
                  ) : (
                    <CircleDashed aria-hidden="true" size={18} />
                  )}
                  <span>
                    <strong>{step.title}</strong>
                    <small>{status === "done" ? "Ukończono" : status === "skipped" ? "Pominięto" : "Do wykonania"}</small>
                  </span>
                </button>
              );
            })}
          </aside>

          <div className="onboarding-step-card">
            <div>
              <p className="qd-eyebrow">Aktywny krok</p>
              <h3>{activeStep.title}</h3>
              <p>{activeStep.hint}</p>
            </div>

            <div className="onboarding-tip">
              <Lightbulb aria-hidden="true" size={18} />
              <span>Wskazówka: zacznij od minimum danych, a szczegóły uzupełnij po pierwszej ocenie testowej.</span>
            </div>

            <div className="onboarding-form-preview">
              <Input label="Nazwa organizacji" name="onboardingOrg" placeholder="Aurora Support" />
              <Select
                label="Rola startowa"
                name="onboardingRole"
                options={[
                  { label: "Owner", value: "owner" },
                  { label: "Admin", value: "admin" },
                  { label: "Quality Manager", value: "quality-manager" },
                ]}
              />
              <Textarea
                label="Notatka wdrożeniowa"
                name="onboardingNote"
                placeholder="Co klient chce osiągnąć w pierwszych 30 dniach?"
                rows={3}
              />
            </div>

            <div className="onboarding-actions">
              <Button onClick={() => markStep("done")}>
                {activeStep.actionLabel}
                <ArrowRight aria-hidden="true" size={17} />
              </Button>
              <Button onClick={() => markStep("skipped")} variant="secondary">
                <SkipForward aria-hidden="true" size={17} />
                Pomiń krok
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="onboarding-summary">
        <Card>
          <Badge tone="success">{completedCount} ukończone</Badge>
          <h3>Checklist startowa</h3>
          <p>Najlepszy moment na przejście do produkcji to ukończenie organizacji, ról, szablonu i pierwszej oceny.</p>
        </Card>
        <Card>
          <Badge tone="blue">{onboardingSteps.length - handledCount} do decyzji</Badge>
          <h3>Setup progress</h3>
          <p>Pominięte kroki zostają widoczne w checklist, więc zespół może wrócić do nich po demo lub onboardingu.</p>
        </Card>
      </div>
    </section>
  );
}
