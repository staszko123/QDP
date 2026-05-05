import { useState } from "react";
import { Bot, CheckCircle2, GitCompareArrows, Sparkles, Wand2 } from "lucide-react";
import {
  defaultTranscript,
  futureAiApiContract,
  mockAnalysis,
  type AiAnalysisResult,
  type AiCriterionSuggestion,
} from "./mockAiAssistant";
import { Badge, Button, Card, SectionHeader, StatusPill, Table, Textarea } from "../ui";

interface AiAssistantPanelProps {
  humanComments: Record<string, string>;
  humanScores: Record<string, number>;
  onAcceptSuggestion: (suggestion: AiCriterionSuggestion) => void;
}

export function AiAssistantPanel({
  humanComments,
  humanScores,
  onAcceptSuggestion,
}: AiAssistantPanelProps) {
  const [transcript, setTranscript] = useState(defaultTranscript);
  const [analysis, setAnalysis] = useState<AiAnalysisResult | null>(null);
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<string[]>([]);

  function runMockAnalysis() {
    setAnalysis(mockAnalysis);
  }

  function acceptSuggestion(suggestion: AiCriterionSuggestion) {
    onAcceptSuggestion(suggestion);
    setAcceptedSuggestions((current) =>
      current.includes(suggestion.criterionId) ? current : [...current, suggestion.criterionId]
    );
  }

  return (
    <section className="ai-assistant-panel">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label="Mock AI" tone="warning" />}
          description="AI nie zapisuje oceny samodzielnie. Proponuje wynik, a evaluator zatwierdza lub zmienia decyzję."
          title="AI Assistant do ocen"
        />

        <Textarea
          label="Wklej transkrypcję"
          name="aiTranscript"
          onChange={(event) => setTranscript(event.target.value)}
          rows={9}
          value={transcript}
        />

        <div className="ai-actions">
          <Button onClick={runMockAnalysis}>
            <Wand2 aria-hidden="true" size={17} />
            Analiza rozmowy mock
          </Button>
          <Badge tone="blue">Human approval required</Badge>
        </div>
      </Card>

      {analysis ? (
        <div className="ai-grid">
          <Card>
            <SectionHeader
              action={<Bot aria-hidden="true" className="section-icon" />}
              description="Podsumowanie jest sugestią AI i wymaga weryfikacji."
              title="Podsumowanie rozmowy"
            />
            <p className="ai-summary">{analysis.summary}</p>
          </Card>

          <Card>
            <SectionHeader description="Ryzyka i braki wykryte przez mock AI." title="Ryzyka i braki" />
            <div className="ai-signal-list">
              {analysis.risks.map((risk) => (
                <p key={risk}>
                  <Sparkles aria-hidden="true" size={16} />
                  <span>
                    <Badge tone="danger">Sugestia AI</Badge>
                    {risk}
                  </span>
                </p>
              ))}
              {analysis.serviceGaps.map((gap) => (
                <p key={gap}>
                  <Sparkles aria-hidden="true" size={16} />
                  <span>
                    <Badge tone="warning">Sugestia AI</Badge>
                    {gap}
                  </span>
                </p>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader description="Cytaty z transkrypcji wskazane przez AI." title="Cytaty z rozmowy" />
            <div className="ai-quote-list">
              {analysis.quotes.map((quote) => (
                <blockquote key={quote}>
                  <Badge tone="blue">Sugestia AI</Badge>
                  “{quote}”
                </blockquote>
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader
              action={<GitCompareArrows aria-hidden="true" className="section-icon" />}
              description="Porównanie sugestii AI z aktualną oceną człowieka."
              title="AI vs evaluator"
            />
            <Table
              headers={["Kryterium", "AI", "Człowiek", "Komentarz", "Akcja"]}
              rows={analysis.suggestions.map((suggestion) => [
                suggestion.label,
                <Badge key={`${suggestion.criterionId}-ai`} tone="orange">
                  Sugestia AI: {suggestion.suggestedScore}
                </Badge>,
                humanScores[suggestion.criterionId] ?? "-",
                humanComments[suggestion.criterionId]
                  ? `Człowiek: ${humanComments[suggestion.criterionId]}`
                  : suggestion.suggestedComment,
                <Button
                  key={`${suggestion.criterionId}-accept`}
                  onClick={() => acceptSuggestion(suggestion)}
                  size="sm"
                  variant={acceptedSuggestions.includes(suggestion.criterionId) ? "secondary" : "primary"}
                >
                  <CheckCircle2 aria-hidden="true" size={15} />
                  {acceptedSuggestions.includes(suggestion.criterionId) ? "Zaakceptowano" : "Zatwierdź"}
                </Button>,
              ])}
            />
          </Card>

          <Card>
            <SectionHeader
              description="Struktura pod przyszłe API AI. Bez realnego wywołania na tym etapie."
              title="Future API contract"
            />
            <Textarea
              label="Mock contract"
              name="aiApiContract"
              readOnly
              rows={10}
              value={JSON.stringify(futureAiApiContract, null, 2)}
            />
          </Card>
        </div>
      ) : null}
    </section>
  );
}
