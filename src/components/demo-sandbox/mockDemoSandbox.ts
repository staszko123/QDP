export interface DemoSpecialist {
  id: string;
  name: string;
  team: string;
  organization: string;
}

export interface DemoEvaluation {
  id: string;
  specialistId: string;
  score: number;
  status: "Dobry" | "Wymaga uwagi" | "Słaby" | "Krytyczny";
  critical: boolean;
}

export interface DemoScenario {
  id: string;
  title: string;
  audience: string;
  duration: string;
  talkingPoints: string[];
}

export const demoOrganizations = [
  "Aurora Support Demo",
  "Nova Care Demo",
  "Vertex Commerce Demo",
];

export const demoTeams = [
  "Support PL",
  "Care East",
  "E-commerce Tier 1",
  "Retention Desk",
  "Technical Helpdesk",
];

const firstNames = [
  "Anna",
  "Piotr",
  "Lena",
  "Igor",
  "Ewa",
  "Tomasz",
  "Nadia",
  "Maja",
  "Kamil",
  "Ola",
];

const lastNames = [
  "Nowak",
  "Kowalski",
  "Zielinska",
  "Mazur",
  "Wisniewska",
  "Baran",
  "Wrona",
  "Lis",
  "Pawlak",
  "Carter",
];

export const demoSpecialists: DemoSpecialist[] = Array.from({ length: 50 }, (_, index) => ({
  id: `demo-specialist-${index + 1}`,
  name: `${firstNames[index % firstNames.length]} ${lastNames[index % lastNames.length]} ${String(index + 1).padStart(2, "0")}`,
  team: demoTeams[index % demoTeams.length],
  organization: demoOrganizations[index % demoOrganizations.length],
}));

export const demoEvaluations: DemoEvaluation[] = Array.from({ length: 300 }, (_, index) => {
  const score = 52 + ((index * 17) % 47);
  const critical = index % 23 === 0;
  const status = critical
    ? "Krytyczny"
    : score >= 85
      ? "Dobry"
      : score >= 70
        ? "Wymaga uwagi"
        : "Słaby";

  return {
    id: `demo-evaluation-${index + 1}`,
    specialistId: demoSpecialists[index % demoSpecialists.length].id,
    score,
    status,
    critical,
  };
});

export const demoForms = [
  "Obsługa klienta",
  "Helpdesk techniczny",
  "Sprzedaż",
  "Reklamacje",
  "Back office",
  "Windykacja miękka",
  "Onboarding klienta",
  "B2B account support",
  "Support e-commerce",
  "Wsparcie terminalowe",
];

export const demoReports = Array.from({ length: 12 }, (_, index) => ({
  id: `demo-report-${index + 1}`,
  name: `Raport demo ${index + 1}`,
  type: index % 2 === 0 ? "Raport zespołu" : "Raport trendu",
}));

export const demoIntegrations = [
  "CSV import demo",
  "API demo",
  "Webhooks demo",
  "CRM placeholder demo",
  "Ticketing placeholder demo",
];

export const demoTrends = [
  { label: "Tydz. 1", score: 78 },
  { label: "Tydz. 2", score: 81 },
  { label: "Tydz. 3", score: 84 },
  { label: "Tydz. 4", score: 86 },
  { label: "Tydz. 5", score: 89 },
];

export const demoAlerts = [
  "Wzrost ocen krytycznych w Retention Desk",
  "Spadek kryterium Procedury w Care East",
  "Niski udział komentarzy coachingowych w Helpdesk",
];

export const demoCriticalEvaluations = demoEvaluations
  .filter((evaluation) => evaluation.critical)
  .slice(0, 8);

export const demoScenarios: DemoScenario[] = [
  {
    id: "executive",
    title: "Demo dla zarządu",
    audience: "CEO / COO",
    duration: "12 min",
    talkingPoints: ["Dashboard jakości", "Ryzyka krytyczne", "Raport do zarządu"],
  },
  {
    id: "quality-manager",
    title: "Demo dla Quality Managera",
    audience: "Quality / CX",
    duration: "18 min",
    talkingPoints: ["Kreator ocen", "Scoring", "Raport kryteriów"],
  },
  {
    id: "operations",
    title: "Demo operacyjne",
    audience: "Team Leader",
    duration: "15 min",
    talkingPoints: ["Formularz oceny", "Coaching", "Oceny krytyczne"],
  },
];
