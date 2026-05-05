import { useMemo, useState } from "react";
import { CheckCircle2, KeyRound, PlugZap, Plus, RefreshCcw, Send, Webhook } from "lucide-react";
import {
  errorLogs,
  examplePayloads,
  fieldMappings,
  integrationDefinitions,
  syncHistory,
  type IntegrationDefinition,
  type IntegrationStatus,
} from "./mockIntegrationsModule";
import { Badge, Button, Card, Input, SectionHeader, Select, StatusPill, Table, Textarea } from "../ui";

const statusTone: Record<IntegrationStatus, "success" | "warning" | "danger" | "neutral"> = {
  Połączona: "success",
  "Wymaga konfiguracji": "warning",
  Błąd: "danger",
  Placeholder: "neutral",
};

export function IntegrationsModule() {
  const [integrations, setIntegrations] = useState(integrationDefinitions);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState(integrationDefinitions[0]?.id ?? "");
  const [endpoint, setEndpoint] = useState(integrationDefinitions[0]?.endpoint ?? "");
  const [apiKeyPreview, setApiKeyPreview] = useState(integrationDefinitions[0]?.apiKeyPreview ?? "");
  const [testMessage, setTestMessage] = useState<string | null>(null);
  const selectedIntegration = useMemo(
    () => integrations.find((integration) => integration.id === selectedIntegrationId) ?? integrations[0],
    [integrations, selectedIntegrationId]
  );

  function selectIntegration(integration: IntegrationDefinition) {
    setSelectedIntegrationId(integration.id);
    setEndpoint(integration.endpoint);
    setApiKeyPreview(integration.apiKeyPreview);
    setTestMessage(null);
  }

  function addIntegration() {
    const integration: IntegrationDefinition = {
      id: `custom-${Date.now()}`,
      name: `Custom API ${integrations.length + 1}`,
      description: "Nowa integracja dodana lokalnie jako mock konfiguracji.",
      status: "Wymaga konfiguracji",
      endpoint: "https://api.client.example/qualitydesk",
      apiKeyPreview: "qd_mock_...new",
      category: "Custom",
    };

    setIntegrations((current) => [integration, ...current]);
    selectIntegration(integration);
  }

  function updateConfiguration() {
    setIntegrations((current) =>
      current.map((integration) =>
        integration.id === selectedIntegrationId
          ? { ...integration, endpoint, apiKeyPreview, status: "Połączona" }
          : integration
      )
    );
    setTestMessage("Konfiguracja endpointu zapisana lokalnie.");
  }

  function testConnection() {
    setTestMessage(
      selectedIntegration?.status === "Placeholder"
        ? "Test mock: integracja placeholder wymaga przyszłego adaptera API."
        : "Test mock zakończony sukcesem. Endpoint odpowiada w trybie symulacji."
    );
  }

  return (
    <section className="integrations-module" id="integrations">
      <Card elevated>
        <SectionHeader
          action={
            <Button onClick={addIntegration}>
              <Plus aria-hidden="true" size={17} />
              Dodaj integrację
            </Button>
          }
          description="Centrum integracji dla importów, API, webhooków i przyszłych konektorów zewnętrznych."
          title="Integracje"
        />

        <div className="integrations-grid">
          <div className="integration-list" aria-label="Lista integracji">
            {integrations.map((integration) => (
              <button
                aria-pressed={selectedIntegration?.id === integration.id}
                key={integration.id}
                onClick={() => selectIntegration(integration)}
                type="button"
              >
                <span className="integration-list__icon">
                  {integration.id === "webhooks" ? <Webhook aria-hidden="true" /> : <PlugZap aria-hidden="true" />}
                </span>
                <span>
                  <strong>{integration.name}</strong>
                  <small>{integration.category}</small>
                </span>
                <StatusPill label={integration.status} tone={statusTone[integration.status]} />
              </button>
            ))}
          </div>

          {selectedIntegration ? (
            <div className="integration-config">
              <div className="integration-config__header">
                <div>
                  <p className="qd-eyebrow">Konfiguracja</p>
                  <h3>{selectedIntegration.name}</h3>
                  <p>{selectedIntegration.description}</p>
                </div>
                <StatusPill
                  label={selectedIntegration.status}
                  tone={statusTone[selectedIntegration.status]}
                />
              </div>

              <div className="integration-form-grid">
                <Input
                  label="Endpoint"
                  name="integrationEndpoint"
                  onChange={(event) => setEndpoint(event.target.value)}
                  value={endpoint}
                />
                <Input
                  label="Klucz API mock"
                  name="apiKey"
                  onChange={(event) => setApiKeyPreview(event.target.value)}
                  value={apiKeyPreview}
                />
                <Select
                  label="Tryb synchronizacji"
                  name="syncMode"
                  options={[
                    { label: "Ręczny", value: "manual" },
                    { label: "Co godzinę", value: "hourly" },
                    { label: "Webhook realtime", value: "realtime" },
                  ]}
                />
              </div>

              <div className="integration-actions">
                <Button onClick={updateConfiguration} variant="secondary">
                  <KeyRound aria-hidden="true" size={17} />
                  Zapisz konfigurację
                </Button>
                <Button onClick={testConnection}>
                  <Send aria-hidden="true" size={17} />
                  Test połączenia mock
                </Button>
              </div>

              {testMessage ? (
                <p className="integration-note">
                  <CheckCircle2 aria-hidden="true" size={16} />
                  {testMessage}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </Card>

      <div className="integration-detail-grid">
        <Card>
          <SectionHeader
            description="Mapowanie pól wejściowych na model QualityDesk."
            title="Mapowanie pól"
          />
          <Table
            headers={["Pole QualityDesk", "Pole źródłowe", "Wymagane"]}
            rows={fieldMappings.map((field) => [
              field.qualityDeskField,
              <code key={field.qualityDeskField}>{field.sourceField}</code>,
              field.required ? <Badge key={`${field.qualityDeskField}-yes`} tone="danger">Tak</Badge> : <Badge key={`${field.qualityDeskField}-no`} tone="neutral">Nie</Badge>,
            ])}
          />
        </Card>

        <Card>
          <SectionHeader
            description="Przykładowe payloady JSON dla API i webhooków."
            title="Payloady JSON"
          />
          <Textarea
            label="Conversation payload"
            name="conversationPayload"
            readOnly
            rows={10}
            value={JSON.stringify(examplePayloads.conversation, null, 2)}
          />
          <Textarea
            label="Webhook payload"
            name="webhookPayload"
            readOnly
            rows={8}
            value={JSON.stringify(examplePayloads.webhook, null, 2)}
          />
        </Card>
      </div>

      <div className="integration-detail-grid">
        <Card>
          <SectionHeader
            action={<RefreshCcw aria-hidden="true" className="section-icon" />}
            description="Ostatnie próby pobrania lub wysłania danych."
            title="Historia synchronizacji"
          />
          <Table
            headers={["Integracja", "Start", "Rekordy", "Status"]}
            rows={syncHistory.map((item) => [
              item.integration,
              item.startedAt,
              item.records,
              <StatusPill
                key={item.id}
                label={item.status}
                tone={item.status === "Sukces" ? "success" : item.status === "Błąd" ? "danger" : "warning"}
              />,
            ])}
          />
        </Card>

        <Card>
          <SectionHeader
            description="Błędy walidacji, timeouty i problemy po stronie adapterów."
            title="Log błędów"
          />
          <Table
            headers={["Integracja", "Komunikat", "Czas"]}
            rows={errorLogs.map((item) => [item.integration, item.message, item.happenedAt])}
          />
        </Card>
      </div>

      <Card>
        <SectionHeader
          description="Dokumentacja mock API. Docelowo zostanie zastąpiona publiczną dokumentacją endpointów."
          title="Dokumentacja API mock"
        />
        <div className="api-doc-grid">
          <div>
            <strong>POST /v1/conversations</strong>
            <p>Przyjmuje rozmowę, metadane sprawy, transkrypcję i link do nagrania.</p>
          </div>
          <div>
            <strong>POST /v1/evaluations</strong>
            <p>Tworzy ocenę lub zapisuje wersję roboczą z wynikami kryteriów.</p>
          </div>
          <div>
            <strong>GET /v1/sync-runs</strong>
            <p>Zwraca historię synchronizacji dla organizacji.</p>
          </div>
          <div>
            <strong>POST /v1/webhooks/test</strong>
            <p>Wysyła testowy event webhooka do skonfigurowanego endpointu.</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
