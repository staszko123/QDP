export type IntegrationStatus = "Połączona" | "Wymaga konfiguracji" | "Błąd" | "Placeholder";

export interface IntegrationDefinition {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  endpoint: string;
  apiKeyPreview: string;
  category: string;
}

export interface SyncHistoryItem {
  id: string;
  integration: string;
  startedAt: string;
  records: number;
  status: "Sukces" | "Częściowy" | "Błąd";
}

export interface ErrorLogItem {
  id: string;
  integration: string;
  message: string;
  happenedAt: string;
}

export const integrationDefinitions: IntegrationDefinition[] = [
  {
    id: "csv-import",
    name: "CSV import",
    description: "Import rozmów, spraw i podstawowych metadanych z plików CSV.",
    status: "Połączona",
    endpoint: "file://qualitydesk/imports/csv",
    apiKeyPreview: "nie dotyczy",
    category: "Import plików",
  },
  {
    id: "xlsx-import",
    name: "XLSX import",
    description: "Import arkuszy XLSX przez przyszły worker przetwarzania plików.",
    status: "Wymaga konfiguracji",
    endpoint: "file://qualitydesk/imports/xlsx",
    apiKeyPreview: "nie dotyczy",
    category: "Import plików",
  },
  {
    id: "api",
    name: "API",
    description: "REST API do przesyłania rozmów i wyników ocen.",
    status: "Połączona",
    endpoint: "https://api.qualitydesk.local/v1/conversations",
    apiKeyPreview: "qd_live_...8F42",
    category: "API",
  },
  {
    id: "webhooks",
    name: "Webhooks",
    description: "Webhooki dla zakończonych ocen, raportów i błędów synchronizacji.",
    status: "Połączona",
    endpoint: "https://hooks.client.example/qualitydesk",
    apiKeyPreview: "whsec_...19AC",
    category: "Automatyzacja",
  },
  {
    id: "crm",
    name: "CRM placeholder",
    description: "Miejsce pod przyszłe połączenie z CRM.",
    status: "Placeholder",
    endpoint: "https://crm.example/api",
    apiKeyPreview: "crm_...mock",
    category: "CRM",
  },
  {
    id: "contact-center",
    name: "Contact center placeholder",
    description: "Miejsce pod źródło rozmów z platformy contact center.",
    status: "Placeholder",
    endpoint: "https://ccaas.example/api",
    apiKeyPreview: "cc_...mock",
    category: "Contact center",
  },
  {
    id: "ticketing",
    name: "Ticketing system placeholder",
    description: "Miejsce pod system ticketowy i statusy spraw.",
    status: "Placeholder",
    endpoint: "https://tickets.example/api",
    apiKeyPreview: "tkt_...mock",
    category: "Ticketing",
  },
  {
    id: "transcription",
    name: "Transcription source placeholder",
    description: "Miejsce pod transkrypcje i linki do nagrań.",
    status: "Placeholder",
    endpoint: "https://transcripts.example/api",
    apiKeyPreview: "tr_...mock",
    category: "Transkrypcje",
  },
  {
    id: "sso",
    name: "SSO placeholder",
    description: "Miejsce pod SAML/OIDC i automatyczne przypisywanie ról.",
    status: "Placeholder",
    endpoint: "https://identity.example/.well-known/openid-configuration",
    apiKeyPreview: "oidc_...mock",
    category: "Security",
  },
];

export const fieldMappings = [
  { qualityDeskField: "ID rozmowy", sourceField: "conversation_id", required: true },
  { qualityDeskField: "Data rozmowy", sourceField: "conversation_started_at", required: true },
  { qualityDeskField: "Konsultant", sourceField: "agent_name", required: true },
  { qualityDeskField: "Zespół", sourceField: "team_name", required: true },
  { qualityDeskField: "Klient", sourceField: "customer_name", required: false },
  { qualityDeskField: "Kanał kontaktu", sourceField: "channel", required: true },
  { qualityDeskField: "Typ sprawy", sourceField: "case_type", required: true },
  { qualityDeskField: "Transkrypcja", sourceField: "transcript", required: false },
  { qualityDeskField: "Link do nagrania", sourceField: "recording_url", required: false },
  { qualityDeskField: "Status sprawy", sourceField: "case_status", required: true },
];

export const syncHistory: SyncHistoryItem[] = [
  {
    id: "sync-001",
    integration: "API",
    startedAt: "2026-05-05 10:12",
    records: 248,
    status: "Sukces",
  },
  {
    id: "sync-002",
    integration: "CSV import",
    startedAt: "2026-05-04 17:30",
    records: 91,
    status: "Częściowy",
  },
  {
    id: "sync-003",
    integration: "Webhooks",
    startedAt: "2026-05-04 09:05",
    records: 42,
    status: "Sukces",
  },
];

export const errorLogs: ErrorLogItem[] = [
  {
    id: "err-001",
    integration: "CSV import",
    message: "Brak wymaganego pola case_status w 4 rekordach.",
    happenedAt: "2026-05-04 17:31",
  },
  {
    id: "err-002",
    integration: "Ticketing system placeholder",
    message: "Endpoint mock zwrócił timeout podczas testu.",
    happenedAt: "2026-05-03 14:18",
  },
];

export const examplePayloads = {
  conversation: {
    conversation_id: "CONV-2026-1048",
    conversation_started_at: "2026-05-05T09:24:00.000Z",
    agent_name: "Anna Kaczmarek",
    team_name: "Support PL",
    customer_name: "Jan Nowak",
    channel: "chat",
    case_type: "technical_support",
    transcript: "Klient zgłosił problem z logowaniem. Konsultant zweryfikował konto...",
    recording_url: "https://recordings.example/CONV-2026-1048",
    case_status: "resolved",
  },
  webhook: {
    event: "evaluation.completed",
    evaluation_id: "evaluation-001",
    conversation_id: "CONV-2026-1048",
    score_percentage: 90,
    status: "Dobry",
    occurred_at: "2026-05-05T10:00:00.000Z",
  },
};
