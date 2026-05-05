export interface AiCriterionSuggestion {
  criterionId: string;
  label: string;
  suggestedScore: number;
  suggestedComment: string;
  confidence: number;
}

export interface AiAnalysisResult {
  summary: string;
  risks: string[];
  serviceGaps: string[];
  quotes: string[];
  suggestions: AiCriterionSuggestion[];
}

export const defaultTranscript = `Klient: Nie mogę zalogować się do panelu od rana.
Konsultant: Rozumiem, sprawdzimy to krok po kroku. Proszę potwierdzić adres email konta.
Klient: jan.nowak@example.com.
Konsultant: Widzę blokadę po kilku błędnych próbach. Odblokuję konto i wyślę link resetu hasła.
Klient: Czy to rozwiąże problem od razu?
Konsultant: Tak, po zmianie hasła dostęp wróci. Jeśli problem się powtórzy, proszę odpisać w tej sprawie.
Klient: Dziękuję.`;

export const mockAnalysis: AiAnalysisResult = {
  summary:
    "Rozmowa dotyczyła problemu z logowaniem. Konsultant poprawnie zweryfikował konto, odblokował dostęp i przekazał klientowi dalsze kroki.",
  risks: [
    "Brak jasnej informacji o czasie ważności linku resetu hasła.",
    "Nie potwierdzono, czy klient faktycznie odzyskał dostęp przed zakończeniem rozmowy.",
  ],
  serviceGaps: [
    "Warto dodać instrukcję, co zrobić, jeśli email resetu nie dotrze.",
    "Brakuje krótkiego podsumowania numeru sprawy lub dalszej ścieżki kontaktu.",
  ],
  quotes: [
    "Rozumiem, sprawdzimy to krok po kroku.",
    "Odblokuję konto i wyślę link resetu hasła.",
    "Jeśli problem się powtórzy, proszę odpisać w tej sprawie.",
  ],
  suggestions: [
    {
      criterionId: "resolved",
      label: "Problem klienta został rozwiązany",
      suggestedScore: 4,
      suggestedComment:
        "Sugestia AI: problem najpewniej rozwiązano, ale nie potwierdzono finalnego odzyskania dostępu.",
      confidence: 0.84,
    },
    {
      criterionId: "policy",
      label: "Odpowiedź była zgodna z procedurą",
      suggestedScore: 4,
      suggestedComment:
        "Sugestia AI: procedura została zachowana, choć zabrakło informacji o ważności linku resetu.",
      confidence: 0.78,
    },
    {
      criterionId: "empathy",
      label: "Specjalista okazał empatię",
      suggestedScore: 5,
      suggestedComment: "Sugestia AI: konsultant zaczął od uspokojenia klienta i prowadził rozmowę spokojnie.",
      confidence: 0.91,
    },
    {
      criterionId: "next-steps",
      label: "Kolejne kroki były jasne",
      suggestedScore: 4,
      suggestedComment:
        "Sugestia AI: kolejne kroki były opisane, ale warto dodać alternatywę, gdy email nie dotrze.",
      confidence: 0.82,
    },
  ],
};

export const futureAiApiContract = {
  endpoint: "POST /v1/ai/evaluation-suggestions",
  requestShape: {
    organizationId: "org-aurora",
    templateId: "support-quality",
    transcript: "string",
    criteria: ["criterion_id", "label", "max_score", "weight"],
  },
  responseShape: {
    summary: "string",
    risks: ["string"],
    serviceGaps: ["string"],
    quotes: ["string"],
    suggestions: ["criterion_id", "suggested_score", "suggested_comment", "confidence"],
  },
};
