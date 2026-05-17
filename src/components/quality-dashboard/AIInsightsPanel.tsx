import { AlertTriangle, BrainCircuit, CheckCircle2, DatabaseZap, PlugZap, Sparkles, Target } from "lucide-react";
import { Badge, Card, SectionHeader, StatusPill } from "../ui";

const memorySources = [
  { label: "Oceny", value: "133", status: "zsynchronizowane" },
  { label: "Komentarze", value: "104", status: "w pamięci jakości" },
  { label: "Kryteria", value: "18", status: "zmapowane" },
  { label: "Trendy", value: "7 dni", status: "gotowe" },
];

const aiSignals = [
  {
    title: "Procedury są głównym źródłem spadku jakości",
    description: "QualityDesk wykrył 31 obniżeń w kryterium Polityka i 24 w kryterium Następne kroki. To wskazuje na problem z jasnością instrukcji.",
    impact: "Wysoki wpływ",
    tone: "danger" as const,
  },
  {
    title: "Support PL utrzymuje stabilny wynik",
    description: "Zespół ma 91% średniej i 42 oceny. Ten wzorzec warto zapisać jako benchmark dla liderów i coachingu.",
    impact: "Benchmark",
    tone: "success" as const,
  },
  {
    title: "Komentarze są dobrym źródłem wiedzy",
    description: "78% ocen ma komentarz. To wystarcza do budowy pamięci jakości dla błędów, mocnych stron i ryzyk.",
    impact: "Gotowe do AI",
    tone: "warning" as const,
  },
];

const recommendedActions = [
  "Utwórz checklistę dla kryteriów Polityka i Następne kroki.",
  "Dodaj historię specjalisty: błędy, poprawa, powtarzalne tematy.",
  "Zapisuj każdą ocenę jako wpis w pamięci jakości, a nie sam rekord.",
];

const plannedPlugins = ["Import transkrypcji", "CRM connector", "Raport coachingowy", "Eksport do PDF"];

export function AIInsightsPanel() {
  return (
    <section className="ai-insights-grid" aria-label="AI memory i rekomendacje">
      <Card className="ai-memory-card" elevated>
        <SectionHeader
          action={<Badge tone="blue">Local-first ready</Badge>}
          description="Warstwa zapisuje kontekst ocen, komentarzy i trendów jako pamięć jakości dla lidera."
          title="AI memory dla QualityDesk"
        />
        <div className="ai-memory-map">
          <div className="ai-memory-map__core">
            <BrainCircuit aria-hidden="true" />
            <strong>Pamięć jakości</strong>
            <span>Oceny, komentarze, trendy i działania coachingowe</span>
          </div>
          <div className="ai-memory-sources">
            {memorySources.map((source) => (
              <div key={source.label}>
                <span>{source.label}</span>
                <strong>{source.value}</strong>
                <small>{source.status}</small>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="ai-plugin-card">
        <SectionHeader
          action={<StatusPill label="MVP" tone="success" />}
          description="QualityDesk może rosnąć przez moduły, bez dokładania chaosu do core produktu."
          title="Moduły pod SaaS"
        />
        <div className="ai-plugin-list">
          {plannedPlugins.map((plugin) => (
            <div key={plugin}>
              <PlugZap aria-hidden="true" />
              <span>{plugin}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="ai-signal-card ai-signal-card--wide">
        <SectionHeader
          action={<Badge tone="orange">3 sygnały</Badge>}
          description="Panel zamienia dane w decyzje dla lidera."
          title="Insight engine"
        />
        <div className="ai-signal-list">
          {aiSignals.map((signal) => (
            <article key={signal.title}>
              <div>
                {signal.tone === "danger" ? <AlertTriangle aria-hidden="true" /> : signal.tone === "success" ? <CheckCircle2 aria-hidden="true" /> : <Sparkles aria-hidden="true" />}
              </div>
              <span>
                <StatusPill label={signal.impact} tone={signal.tone} />
                <strong>{signal.title}</strong>
                <small>{signal.description}</small>
              </span>
            </article>
          ))}
        </div>
      </Card>

      <Card className="ai-action-card">
        <SectionHeader action={<DatabaseZap aria-hidden="true" />} description="Kroki dla MVP sprzedawanego jako AI Team Leader." title="Rekomendacje" />
        <ol className="ai-action-list">
          {recommendedActions.map((action) => (
            <li key={action}>
              <Target aria-hidden="true" />
              <span>{action}</span>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
}
