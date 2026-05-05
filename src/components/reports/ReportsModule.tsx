import { useMemo, useState } from "react";
import { Download, FileSpreadsheet, FileText, Save, Sparkles } from "lucide-react";
import {
  generatedReports,
  reportDefinitions,
  type GeneratedReport,
  type ReportDefinition,
} from "./mockReportsModule";
import { Badge, Button, Card, EmptyState, SectionHeader, Select, StatusPill, Table } from "../ui";

const xlsxAvailable = false;

export function ReportsModule() {
  const [selectedReportId, setSelectedReportId] = useState(reportDefinitions[0]?.id ?? "");
  const [team, setTeam] = useState("all");
  const [period, setPeriod] = useState("30d");
  const [status, setStatus] = useState("all");
  const [history, setHistory] = useState<GeneratedReport[]>(generatedReports);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const selectedReport = useMemo(
    () => reportDefinitions.find((report) => report.id === selectedReportId) ?? reportDefinitions[0],
    [selectedReportId]
  );

  const filteredHistory = history.filter(
    (report) => status === "all" || report.status.toLowerCase() === status
  );

  function exportCsv(report: ReportDefinition) {
    const headers = Object.keys(report.previewRows[0] ?? {});
    const rows = report.previewRows.map((row) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.id}-qualitydesk.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setLastAction("CSV wyeksportowany lokalnie.");
  }

  function mockExport(format: "PDF" | "XLSX") {
    setLastAction(
      format === "PDF"
        ? "PDF mock przygotowany. Docelowo endpoint API wygeneruje plik."
        : "Eksport XLSX wymaga biblioteki arkuszy lub endpointu API."
    );
  }

  function saveAsTemplate(report: ReportDefinition) {
    setHistory((current) => [
      {
        id: `generated-${Date.now()}`,
        name: `${report.type} - zapisany szablon`,
        type: report.type,
        generatedAt: new Date().toLocaleString("pl-PL", {
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        owner: "QualityDesk",
        status: "Szkic",
      },
      ...current,
    ]);
    setLastAction("Raport zapisany jako szablon.");
  }

  return (
    <section className="reports-module" id="reports">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label="Raporty mock" tone="blue" />}
          description="Centrum raportów QualityDesk z podglądem, filtrami, eksportem CSV i strukturą pod przyszłe API PDF/XLSX."
          title="Raporty"
        />

        <div className="reports-filter-grid">
          <Select
            label="Typ raportu"
            name="reportType"
            onChange={(event) => setSelectedReportId(event.target.value)}
            options={reportDefinitions.map((report) => ({ label: report.type, value: report.id }))}
            value={selectedReportId}
          />
          <Select
            label="Okres"
            name="reportPeriod"
            onChange={(event) => setPeriod(event.target.value)}
            options={[
              { label: "Ostatnie 7 dni", value: "7d" },
              { label: "Ostatnie 30 dni", value: "30d" },
              { label: "Ten kwartał", value: "quarter" },
            ]}
            value={period}
          />
          <Select
            label="Zespół"
            name="reportTeam"
            onChange={(event) => setTeam(event.target.value)}
            options={[
              { label: "Wszystkie zespoły", value: "all" },
              { label: "Support PL", value: "support-pl" },
              { label: "Care East", value: "care-east" },
              { label: "Retention", value: "retention" },
            ]}
            value={team}
          />
          <Select
            label="Status historii"
            name="reportStatus"
            onChange={(event) => setStatus(event.target.value)}
            options={[
              { label: "Wszystkie", value: "all" },
              { label: "Gotowy", value: "gotowy" },
              { label: "Szkic", value: "szkic" },
              { label: "Zaplanowany", value: "zaplanowany" },
            ]}
            value={status}
          />
        </div>
      </Card>

      <div className="reports-grid">
        <Card className="reports-list-card">
          <SectionHeader description="Wybierz raport do podglądu i eksportu." title="Typy raportów" />
          <div className="reports-list">
            {reportDefinitions.map((report) => (
              <button
                aria-pressed={selectedReport?.id === report.id}
                key={report.id}
                onClick={() => setSelectedReportId(report.id)}
                type="button"
              >
                <span>
                  <strong>{report.type}</strong>
                  <small>{report.recommendedAudience}</small>
                </span>
                <Badge tone="blue">{report.sections.length} sekcje</Badge>
              </button>
            ))}
          </div>
        </Card>

        {selectedReport ? (
          <Card className="report-preview-card" elevated>
            <div className="report-preview-header">
              <div>
                <p className="qd-eyebrow">Podgląd raportu</p>
                <h3>{selectedReport.type}</h3>
                <p>{selectedReport.description}</p>
              </div>
              <StatusPill label={selectedReport.recommendedAudience} tone="neutral" />
            </div>

            <div className="report-section-tags">
              {selectedReport.sections.map((section) => (
                <Badge key={section} tone="orange">
                  {section}
                </Badge>
              ))}
            </div>

            <Table
              headers={Object.keys(selectedReport.previewRows[0] ?? {})}
              rows={selectedReport.previewRows.map((row) => Object.values(row))}
            />

            <div className="report-actions">
              <Button onClick={() => exportCsv(selectedReport)} variant="secondary">
                <Download aria-hidden="true" size={17} />
                Eksport CSV
              </Button>
              <Button onClick={() => mockExport("PDF")} variant="secondary">
                <FileText aria-hidden="true" size={17} />
                Eksport PDF mock
              </Button>
              <Button disabled={!xlsxAvailable} onClick={() => mockExport("XLSX")} variant="secondary">
                <FileSpreadsheet aria-hidden="true" size={17} />
                Eksport XLSX
              </Button>
              <Button onClick={() => saveAsTemplate(selectedReport)}>
                <Save aria-hidden="true" size={17} />
                Zapisz jako szablon
              </Button>
            </div>

            {lastAction ? (
              <p className="report-action-note">
                <Sparkles aria-hidden="true" size={16} />
                {lastAction}
              </p>
            ) : null}
          </Card>
        ) : (
          <EmptyState
            description="Wybierz typ raportu, aby zobaczyć podgląd."
            icon={<FileText aria-hidden="true" />}
            title="Brak wybranego raportu"
          />
        )}
      </div>

      <Card>
        <SectionHeader
          description="Ostatnio wygenerowane i zapisane raporty organizacji."
          title="Historia wygenerowanych raportów"
        />
        {filteredHistory.length === 0 ? (
          <EmptyState
            description="Brak raportów dla wybranego statusu."
            icon={<FileText aria-hidden="true" />}
            title="Historia jest pusta"
          />
        ) : (
          <Table
            headers={["Nazwa", "Typ", "Wygenerowano", "Właściciel", "Status"]}
            rows={filteredHistory.map((report) => [
              report.name,
              report.type,
              report.generatedAt,
              report.owner,
              <StatusPill
                key={report.id}
                label={report.status}
                tone={report.status === "Gotowy" ? "success" : report.status === "Szkic" ? "warning" : "blue"}
              />,
            ])}
          />
        )}
      </Card>
    </section>
  );
}
