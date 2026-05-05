import type { RoleName } from "../../types";

export interface PermissionGroup {
  area: string;
  permissions: string[];
}

export const permissionGroups: PermissionGroup[] = [
  {
    area: "Organizacja",
    permissions: ["organization.read", "organization.update", "billing.manage", "branding.manage"],
  },
  {
    area: "Ludzie",
    permissions: ["users.manage", "roles.manage", "teams.manage", "specialists.manage"],
  },
  {
    area: "Jakość",
    permissions: ["evaluations.create", "evaluations.manage", "templates.manage", "reports.manage"],
  },
  {
    area: "Integracje",
    permissions: ["integrations.manage", "webhooks.manage", "api_keys.manage"],
  },
  {
    area: "Dane",
    permissions: ["data_settings.manage", "retention.manage", "audit_logs.view"],
  },
];

export const rolePermissions: Record<RoleName, string[]> = {
  Owner: ["*"],
  Admin: [
    "organization.read",
    "organization.update",
    "branding.manage",
    "users.manage",
    "roles.manage",
    "teams.manage",
    "specialists.manage",
    "data_settings.manage",
    "retention.manage",
    "audit_logs.view",
  ],
  "Quality Manager": [
    "organization.read",
    "evaluations.manage",
    "templates.manage",
    "reports.manage",
    "audit_logs.view",
  ],
  "Team Leader": ["organization.read", "teams.manage", "specialists.manage", "reports.manage"],
  Evaluator: ["organization.read", "evaluations.create", "templates.manage"],
  Viewer: ["organization.read", "reports.manage"],
  "Integration Admin": ["organization.read", "integrations.manage", "webhooks.manage", "api_keys.manage"],
};

export const organizationSettings = {
  branding: {
    primaryColor: "#0072CE",
    logoMode: "QualityDesk co-brand",
    emailFooter: "Aurora Support Quality Operations",
  },
  scoring: {
    goodThreshold: 85,
    attentionThreshold: 70,
    weakThreshold: 50,
    criticalFailureBlocksPass: true,
  },
  data: {
    defaultTimezone: "Europe/Warsaw",
    piiMasking: true,
    exportWatermark: true,
  },
  retention: {
    evaluationsDays: 730,
    recordingsDays: 180,
    auditLogsDays: 1095,
  },
};

export const activityHistory = [
  {
    id: "activity-001",
    actor: "Amelia Nowak",
    action: "Zmieniono próg statusu Dobry na 85%",
    time: "2026-05-05 10:24",
  },
  {
    id: "activity-002",
    actor: "Nadia Wrona",
    action: "Przetestowano webhook evaluation.completed",
    time: "2026-05-05 09:58",
  },
  {
    id: "activity-003",
    actor: "Mateusz Kowalski",
    action: "Zaproszono użytkownika do roli Viewer",
    time: "2026-05-04 16:40",
  },
];

export const securityAuditLogs = [
  {
    id: "sec-001",
    area: "Role i uprawnienia",
    event: "Admin dodał permission roles.manage do roli Admin",
    actor: "Amelia Nowak",
    time: "2026-05-05 10:42",
  },
  {
    id: "sec-002",
    area: "Separacja danych",
    event: "Zweryfikowano tenant scope dla org-aurora",
    actor: "System",
    time: "2026-05-05 10:31",
  },
  {
    id: "sec-003",
    area: "Eksport danych",
    event: "Wygenerowano eksport CSV raportu zespołu",
    actor: "Lena Zielinska",
    time: "2026-05-05 09:55",
  },
  {
    id: "sec-004",
    area: "Usuwanie danych",
    event: "Mock request usunięcia danych klienta oznaczony jako oczekujący",
    actor: "Mateusz Kowalski",
    time: "2026-05-04 15:12",
  },
];

export const evaluationChangeHistory = [
  {
    id: "eval-change-001",
    item: "evaluation-001",
    change: "Zmieniono wynik kryterium Policy accuracy z 3 na 4",
    actor: "Ewa Wisniewska",
    time: "2026-05-05 10:02",
  },
  {
    id: "eval-change-002",
    item: "evaluation-001",
    change: "Dodano komentarz końcowy po kalibracji",
    actor: "Lena Zielinska",
    time: "2026-05-05 10:08",
  },
];

export const templateChangeHistory = [
  {
    id: "tpl-change-001",
    item: "Support Quality Scorecard",
    change: "Opublikowano wersję v1",
    actor: "Lena Zielinska",
    time: "2026-05-04 14:20",
  },
  {
    id: "tpl-change-002",
    item: "Support Quality Scorecard",
    change: "Dodano próg krytyczny dla rozwiązania sprawy",
    actor: "Amelia Nowak",
    time: "2026-05-04 13:44",
  },
];

export const enterpriseReadinessChecklist = [
  { item: "Role i uprawnienia", ready: true },
  { item: "Separacja danych organizacji", ready: true },
  { item: "Logi audytowe", ready: true },
  { item: "Historia zmian ocen", ready: true },
  { item: "Historia zmian szablonów", ready: true },
  { item: "Retencja danych", ready: true },
  { item: "Eksport danych", ready: true },
  { item: "Usuwanie danych", ready: false },
  { item: "Zgody na przetwarzanie", ready: false },
  { item: "Brak prawdziwych danych w demo", ready: true },
  { item: "Maskowanie danych w demo", ready: true },
];
