export type ReportType =
  | "Raport specjalisty"
  | "Raport zespołu"
  | "Raport organizacji"
  | "Raport trendu"
  | "Raport kryteriów"
  | "Raport ocen krytycznych"
  | "Raport coachingowy"
  | "Raport do zarządu";

export interface ReportDefinition {
  id: string;
  type: ReportType;
  description: string;
  recommendedAudience: string;
  sections: string[];
  previewRows: Array<Record<string, string | number>>;
}

export interface GeneratedReport {
  id: string;
  name: string;
  type: ReportType;
  generatedAt: string;
  owner: string;
  status: "Gotowy" | "Szkic" | "Zaplanowany";
}

export const reportDefinitions: ReportDefinition[] = [
  {
    id: "specialist",
    type: "Raport specjalisty",
    description: "Indywidualny wynik, mocne strony, obszary coachingu i historia ocen.",
    recommendedAudience: "Team Leader",
    sections: ["KPI specjalisty", "Trend", "Kryteria obniżające", "Rekomendacje"],
    previewRows: [
      { metryka: "Średnia ocena", wartość: "89%", zmiana: "+3.1%" },
      { metryka: "Oceny krytyczne", wartość: 1, zmiana: "-2" },
      { metryka: "Komentarze coachingowe", wartość: 12, zmiana: "+4" },
    ],
  },
  {
    id: "team",
    type: "Raport zespołu",
    description: "Porównanie specjalistów, rozkład statusów i ryzyka jakościowe zespołu.",
    recommendedAudience: "Quality Manager",
    sections: ["Ranking", "Rozkład statusów", "Heatmapa", "Lista ryzyk"],
    previewRows: [
      { metryka: "Support PL", wartość: "91%", zmiana: "+4.8%" },
      { metryka: "Care East", wartość: "78%", zmiana: "-1.2%" },
      { metryka: "Retention", wartość: "72%", zmiana: "+0.6%" },
    ],
  },
  {
    id: "organization",
    type: "Raport organizacji",
    description: "Syntetyczny obraz jakości na poziomie całej organizacji.",
    recommendedAudience: "Owner / Admin",
    sections: ["Executive summary", "Trendy", "Zespoły", "Koszyk działań"],
    previewRows: [
      { metryka: "Średnia organizacji", wartość: "86%", zmiana: "+2.4%" },
      { metryka: "Ocenione rozmowy", wartość: 121, zmiana: "+18" },
      { metryka: "Udział komentarzy", wartość: "78%", zmiana: "+7%" },
    ],
  },
  {
    id: "trend",
    type: "Raport trendu",
    description: "Zmiany jakości w czasie z porównaniem do poprzednich okresów.",
    recommendedAudience: "Quality Manager",
    sections: ["Trend dzienny", "Trend tygodniowy", "Anomalie", "Interpretacja"],
    previewRows: [
      { metryka: "Trend 7 dni", wartość: "+4.8%", zmiana: "rosnący" },
      { metryka: "Najlepszy dzień", wartość: "Piątek", zmiana: "91%" },
      { metryka: "Najsłabszy dzień", wartość: "Środa", zmiana: "79%" },
    ],
  },
  {
    id: "criteria",
    type: "Raport kryteriów",
    description: "Najczęściej obniżane kryteria i wpływ na wynik końcowy.",
    recommendedAudience: "Evaluator",
    sections: ["Kryteria", "Wagi", "Wpływ", "Propozycje zmian"],
    previewRows: [
      { metryka: "Polityka", wartość: 31, zmiana: "wysoki wpływ" },
      { metryka: "Następne kroki", wartość: 24, zmiana: "średni wpływ" },
      { metryka: "Empatia", wartość: 18, zmiana: "średni wpływ" },
    ],
  },
  {
    id: "critical",
    type: "Raport ocen krytycznych",
    description: "Lista ocen krytycznych, przyczyny, właściciele i rekomendowany SLA reakcji.",
    recommendedAudience: "Team Leader",
    sections: ["Lista krytyczna", "Powody", "SLA", "Status działań"],
    previewRows: [
      { metryka: "Krytyczne", wartość: 6, zmiana: "-2" },
      { metryka: "Bez właściciela", wartość: 1, zmiana: "ryzyko" },
      { metryka: "Po SLA", wartość: 0, zmiana: "OK" },
    ],
  },
  {
    id: "coaching",
    type: "Raport coachingowy",
    description: "Sugestie coachingowe dla liderów na podstawie wzorców ocen.",
    recommendedAudience: "Team Leader",
    sections: ["Plan coachingu", "Priorytety", "Materiały", "Follow-up"],
    previewRows: [
      { metryka: "Sesje do zaplanowania", wartość: 8, zmiana: "+3" },
      { metryka: "Priorytet wysoki", wartość: 2, zmiana: "pilne" },
      { metryka: "Najczęstszy temat", wartość: "Procedury", zmiana: "31 obniżeń" },
    ],
  },
  {
    id: "board",
    type: "Raport do zarządu",
    description: "Krótki raport executive z trendami, ryzykami i decyzjami do podjęcia.",
    recommendedAudience: "Zarząd",
    sections: ["Executive summary", "Ryzyka", "ROI jakości", "Decyzje"],
    previewRows: [
      { metryka: "Indeks jakości", wartość: "86%", zmiana: "+2.4%" },
      { metryka: "Ryzyka krytyczne", wartość: 6, zmiana: "maleją" },
      { metryka: "Rekomendowane działania", wartość: 4, zmiana: "do decyzji" },
    ],
  },
];

export const generatedReports: GeneratedReport[] = [
  {
    id: "generated-001",
    name: "Tygodniowy raport Support PL",
    type: "Raport zespołu",
    generatedAt: "2026-05-05 09:12",
    owner: "Lena Zielinska",
    status: "Gotowy",
  },
  {
    id: "generated-002",
    name: "Oceny krytyczne - kwiecień",
    type: "Raport ocen krytycznych",
    generatedAt: "2026-05-04 16:45",
    owner: "Igor Mazur",
    status: "Gotowy",
  },
  {
    id: "generated-003",
    name: "Executive quality pulse",
    type: "Raport do zarządu",
    generatedAt: "2026-05-03 11:20",
    owner: "Amelia Nowak",
    status: "Zaplanowany",
  },
];
