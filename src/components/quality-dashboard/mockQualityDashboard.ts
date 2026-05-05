export type QualityStatus = "Dobry" | "Wymaga uwagi" | "Słaby" | "Krytyczny";

export interface QualityTrendPoint {
  label: string;
  score: number;
  evaluations: number;
}

export interface QualityBarDatum {
  label: string;
  score: number;
  count?: number;
}

export interface StatusDatum {
  status: QualityStatus;
  count: number;
}

export interface HeatmapCell {
  team: string;
  area: string;
  score: number;
}

export interface QualityFilterOption {
  label: string;
  value: string;
}

export const dashboardFilters = {
  periods: [
    { label: "Ostatnie 7 dni", value: "7d" },
    { label: "Ostatnie 30 dni", value: "30d" },
    { label: "Ten kwartał", value: "quarter" },
  ],
  teams: [
    { label: "Wszystkie zespoły", value: "all" },
    { label: "Support PL", value: "support-pl" },
    { label: "Care East", value: "care-east" },
    { label: "Quality Ops", value: "quality-ops" },
  ],
  specialists: [
    { label: "Wszyscy specjaliści", value: "all" },
    { label: "Anna Kaczmarek", value: "anna" },
    { label: "Piotr Lewandowski", value: "piotr" },
    { label: "Jules Carter", value: "jules" },
  ],
  templates: [
    { label: "Wszystkie szablony", value: "all" },
    { label: "Support Quality Scorecard", value: "support" },
    { label: "Complaint Review", value: "complaint" },
  ],
  channels: [
    { label: "Wszystkie kanały", value: "all" },
    { label: "Chat", value: "chat" },
    { label: "Email", value: "email" },
    { label: "Telefon", value: "phone" },
  ],
  contactTypes: [
    { label: "Wszystkie typy", value: "all" },
    { label: "Wsparcie techniczne", value: "support" },
    { label: "Reklamacja", value: "complaint" },
    { label: "Sprzedaż", value: "sales" },
  ],
  statuses: [
    { label: "Wszystkie statusy", value: "all" },
    { label: "Dobry", value: "good" },
    { label: "Wymaga uwagi", value: "attention" },
    { label: "Słaby", value: "weak" },
    { label: "Krytyczny", value: "critical" },
  ],
} satisfies Record<string, QualityFilterOption[]>;

export const qualityTrend: QualityTrendPoint[] = [
  { label: "Pon", score: 82, evaluations: 18 },
  { label: "Wt", score: 86, evaluations: 22 },
  { label: "Śr", score: 79, evaluations: 20 },
  { label: "Czw", score: 88, evaluations: 26 },
  { label: "Pt", score: 91, evaluations: 24 },
  { label: "Sob", score: 84, evaluations: 12 },
  { label: "Nd", score: 89, evaluations: 10 },
];

export const teamScores: QualityBarDatum[] = [
  { label: "Support PL", score: 91, count: 42 },
  { label: "Quality Ops", score: 86, count: 28 },
  { label: "Care East", score: 78, count: 31 },
  { label: "Retention", score: 72, count: 19 },
];

export const specialistScores: QualityBarDatum[] = [
  { label: "Anna K.", score: 94, count: 16 },
  { label: "Jules C.", score: 87, count: 13 },
  { label: "Piotr L.", score: 81, count: 14 },
  { label: "Maya C.", score: 76, count: 11 },
  { label: "Ewa W.", score: 69, count: 9 },
];

export const statusDistribution: StatusDatum[] = [
  { status: "Dobry", count: 82 },
  { status: "Wymaga uwagi", count: 31 },
  { status: "Słaby", count: 14 },
  { status: "Krytyczny", count: 6 },
];

export const downgradedCriteria: QualityBarDatum[] = [
  { label: "Polityka", score: 38, count: 31 },
  { label: "Następne kroki", score: 29, count: 24 },
  { label: "Empatia", score: 22, count: 18 },
  { label: "Rozwiązanie", score: 17, count: 14 },
];

export const formComparison: QualityBarDatum[] = [
  { label: "Support QA", score: 88, count: 74 },
  { label: "Complaint Review", score: 76, count: 38 },
  { label: "Sales QA", score: 83, count: 21 },
];

export const heatmap: HeatmapCell[] = [
  { team: "Support PL", area: "Rozwiązanie", score: 91 },
  { team: "Support PL", area: "Komunikacja", score: 88 },
  { team: "Support PL", area: "Procedury", score: 82 },
  { team: "Care East", area: "Rozwiązanie", score: 78 },
  { team: "Care East", area: "Komunikacja", score: 74 },
  { team: "Care East", area: "Procedury", score: 69 },
  { team: "Retention", area: "Rozwiązanie", score: 73 },
  { team: "Retention", area: "Komunikacja", score: 70 },
  { team: "Retention", area: "Procedury", score: 62 },
];

export const qualityKpis = {
  averageScore: 86,
  evaluationsCount: 133,
  criticalCount: 6,
  qualityTrend: "+4.8%",
  bestTeam: "Support PL",
  weakestArea: "Procedury",
  evaluatedConversations: 121,
  commentShare: "78%",
};
