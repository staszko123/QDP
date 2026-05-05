import { useMemo, useState } from "react";
import { Eye, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import {
  demoAlerts,
  demoCriticalEvaluations,
  demoEvaluations,
  demoForms,
  demoIntegrations,
  demoOrganizations,
  demoReports,
  demoScenarios,
  demoSpecialists,
  demoTeams,
  demoTrends,
} from "./mockDemoSandbox";
import { Badge, Button, Card, SectionHeader, StatusPill, Table } from "../ui";

export function DemoSandbox() {
  const [presentationMode, setPresentationMode] = useState(false);
  const [maskData, setMaskData] = useState(true);
  const [activeScenarioId, setActiveScenarioId] = useState(demoScenarios[0]?.id ?? "");
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const activeScenario = demoScenarios.find((scenario) => scenario.id === activeScenarioId);
  const averageScore = useMemo(
    () => Math.round(demoEvaluations.reduce((sum, item) => sum + item.score, 0) / demoEvaluations.length),
    []
  );

  function resetDemo() {
    setPresentationMode(false);
    setMaskData(true);
    setActiveScenarioId(demoScenarios[0]?.id ?? "");
    setResetMessage("Demo zresetowane do danych startowych.");
  }

  return (
    <section className={`demo-sandbox ${presentationMode ? "demo-sandbox--presentation" : ""}`} id="sandbox">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label={presentationMode ? "Tryb prezentacyjny" : "Tryb roboczy"} tone={presentationMode ? "success" : "blue"} />}
          description="Środowisko sprzedażowe z fikcyjnymi, maskowanymi danymi do prezentacji QualityDesk."
          title="Demo sandbox"
        />

        <div className="demo-controls">
          <Button onClick={() => setPresentationMode((current) => !current)}>
            <Eye aria-hidden="true" size={17} />
            Tryb prezentacyjny
          </Button>
          <Button onClick={() => setMaskData((current) => !current)} variant="secondary">
            <ShieldCheck aria-hidden="true" size={17} />
            {maskData ? "Dane maskowane" : "Maskuj dane"}
          </Button>
          <Button onClick={resetDemo} variant="secondary">
            <RefreshCcw aria-hidden="true" size={17} />
            Reset demo
          </Button>
        </div>

        {resetMessage ? <p className="demo-note">{resetMessage}</p> : null}
      </Card>

      <div className="demo-kpi-grid">
        <DemoMetric label="organizacje testowe" value={demoOrganizations.length} />
        <DemoMetric label="zespoły" value={demoTeams.length} />
        <DemoMetric label="specjaliści" value={demoSpecialists.length} />
        <DemoMetric label="oceny" value={demoEvaluations.length} />
        <DemoMetric label="formularze ocen" value={demoForms.length} />
        <DemoMetric label="raporty" value={demoReports.length} />
        <DemoMetric label="integracje mock" value={demoIntegrations.length} />
        <DemoMetric label="średnia demo" value={`${averageScore}%`} />
      </div>

      <div className="demo-grid">
        <Card>
          <SectionHeader
            description="Gotowe narracje dopasowane do rozmów sprzedażowych."
            title="Co pokazać klientowi"
          />
          <div className="demo-scenario-list">
            {demoScenarios.map((scenario) => (
              <button
                aria-pressed={activeScenarioId === scenario.id}
                key={scenario.id}
                onClick={() => setActiveScenarioId(scenario.id)}
                type="button"
              >
                <strong>{scenario.title}</strong>
                <small>
                  {scenario.audience} · {scenario.duration}
                </small>
              </button>
            ))}
          </div>
          {activeScenario ? (
            <div className="demo-scenario-preview">
              {activeScenario.talkingPoints.map((point) => (
                <Badge key={point} tone="orange">
                  {point}
                </Badge>
              ))}
            </div>
          ) : null}
        </Card>

        <Card>
          <SectionHeader description="Przykładowe trendy jakości dla prezentacji." title="Trendy demo" />
          <div className="demo-trend">
            {demoTrends.map((trend) => (
              <div key={trend.label}>
                <span style={{ height: `${trend.score}%` }} />
                <strong>{trend.score}%</strong>
                <small>{trend.label}</small>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="demo-grid">
        <Card>
          <SectionHeader description="Alerty jakości, które warto pokazać w rozmowie." title="Przykładowe alerty jakości" />
          <div className="demo-alert-list">
            {demoAlerts.map((alert) => (
              <p key={alert}>
                <Sparkles aria-hidden="true" size={16} />
                {alert}
              </p>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader description="Fikcyjne oceny krytyczne do omówienia flow reakcji." title="Przykładowe oceny krytyczne" />
          <Table
            headers={["Ocena", "Specjalista", "Wynik", "Status"]}
            rows={demoCriticalEvaluations.map((evaluation) => {
              const specialist = demoSpecialists.find((item) => item.id === evaluation.specialistId);
              return [
                evaluation.id,
                maskData ? maskName(specialist?.name ?? "Demo User") : specialist?.name ?? "Demo User",
                `${evaluation.score}%`,
                <StatusPill key={evaluation.id} label={evaluation.status} tone="danger" />,
              ];
            })}
          />
        </Card>
      </div>

      <Card>
        <SectionHeader
          description="Dane są syntetyczne i bezpieczne do prezentacji. Nie zawierają realnych klientów ani rozmów."
          title="Gwarancja danych demo"
        />
        <div className="demo-data-policy">
          <Badge tone="success">Brak prawdziwych danych</Badge>
          <Badge tone="blue">Maskowanie włączone</Badge>
          <Badge tone="neutral">Dane fikcyjne</Badge>
          <Badge tone="orange">Resetowalne demo</Badge>
        </div>
      </Card>
    </section>
  );
}

function DemoMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <Card className="demo-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </Card>
  );
}

function maskName(name: string): string {
  const [firstName, lastName] = name.split(" ");
  return `${firstName?.[0] ?? "D"}. ${lastName?.[0] ?? "U"}.`;
}
