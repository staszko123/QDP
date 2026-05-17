import {
  ClipboardCheck,
  Database,
  Eye,
  FileBarChart,
  LifeBuoy,
  LockKeyhole,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { Badge, Card, Input, SectionHeader, Select, StatusPill, Table, Textarea } from "../ui";

const demoSteps = [
  {
    title: "1. Zacznij od landing page",
    description: "Pokaż problem, rozwiązanie, moduły, bezpieczeństwo i pricing.",
    href: "#/",
  },
  {
    title: "2. Przejdź do dashboardu",
    description: "Pokaż średnią jakość, ryzyka, trendy i ranking zespołów.",
    href: "#/app/dashboard",
  },
  {
    title: "3. Wykonaj pierwszą ocenę",
    description: "Otwórz Oceny, pokaż scoring, komentarze, AI mock i zapisz ocenę.",
    href: "#/app/evaluations",
  },
  {
    title: "4. Pokaż raport",
    description: "Otwórz Raporty, pokaż podgląd i eksport CSV/PDF mock.",
    href: "#/app/reports",
  },
];

const settingsChecklist = [
  ["Organizacja", "Aurora Support", "Gotowe"],
  ["Plan demo", "Professional", "Gotowe"],
  ["Dane demo", "Fikcyjne i maskowane", "Gotowe"],
  ["Role i uprawnienia", "Owner, Admin, Manager, Evaluator", "Gotowe"],
  ["Integracje", "CSV, XLSX, API, Webhooks mock", "Gotowe"],
  ["Bezpieczeństwo", "Audyt, retencja, separacja tenantów", "Gotowe"],
];

export function SettingsModule() {
  return (
    <section className="settings-module" id="settings">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label="Panel operatora demo" tone="blue" />}
          description="To jest miejsce startowe dla osoby prowadzącej prezentację. Masz tu skrót flow, ustawienia organizacji i checklistę gotowości."
          title="Ustawienia i instrukcja korzystania"
        />

        <div className="settings-hero-grid">
          <div className="settings-guide-card">
            <span>
              <Route aria-hidden="true" />
            </span>
            <h3>Jak korzystać z demo?</h3>
            <p>
              Nie przewijaj całej aplikacji od góry do dołu. Użyj sidebaru: Dashboard,
              Oceny, Raporty, Integracje i Administracja. Każdy moduł jest osobnym
              punktem prezentacji.
            </p>
            <div className="settings-actions">
              <a className="qd-button qd-button--primary qd-button--md" href="#/app/evaluations">Przejdź do pierwszej oceny</a>
              <a className="qd-button qd-button--secondary qd-button--md" href="#/app/reports">Pokaż raport</a>
            </div>
          </div>

          <div className="settings-guide-card settings-guide-card--accent">
            <span>
              <Eye aria-hidden="true" />
            </span>
            <h3>Najlepsza ścieżka sprzedażowa</h3>
            <p>
              Zacznij od wartości biznesowej, potem pokaż workflow managera:
              onboarding, scoring rozmowy, dashboard jakości i raport dla zespołu.
            </p>
            <div className="settings-pill-row">
              <Badge tone="orange">Demo-ready</Badge>
              <Badge tone="blue">Mock data</Badge>
              <Badge tone="success">Bez danych prawdziwych</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="settings-demo-path">
        {demoSteps.map((step) => (
          <a href={step.href} key={step.title}>
            <strong>{step.title}</strong>
            <span>{step.description}</span>
          </a>
        ))}
      </div>

      <div className="settings-grid">
        <Card>
          <SectionHeader
            action={<SlidersHorizontal aria-hidden="true" className="section-icon" />}
            description="Mock konfiguracji organizacji. Docelowo te pola zapisze API ustawień."
            title="Ustawienia organizacji"
          />
          <div className="settings-form-grid">
            <Input label="Nazwa organizacji" name="settingsOrg" value="Aurora Support" readOnly />
            <Select
              label="Plan"
              name="settingsPlan"
              options={[
                { label: "Starter", value: "starter" },
                { label: "Professional", value: "professional" },
                { label: "Enterprise", value: "enterprise" },
              ]}
              defaultValue="professional"
            />
            <Select
              label="Język demo"
              name="settingsLanguage"
              options={[
                { label: "Polski", value: "pl" },
                { label: "English", value: "en" },
              ]}
              defaultValue="pl"
            />
            <Input label="Strefa czasowa" name="settingsTimezone" value="Europe/Warsaw" readOnly />
            <Textarea
              label="Notatka dla prowadzącego"
              name="settingsPresenterNote"
              rows={4}
              value="Pokaż jako pierwsze: dashboard jakości, zapis pierwszej oceny, raport specjalisty i integracje mock. Nie obiecuj prawdziwego AI ani produkcyjnego API na tym etapie."
              readOnly
            />
          </div>
        </Card>

        <Card>
          <SectionHeader
            action={<ClipboardCheck aria-hidden="true" className="section-icon" />}
            description="Szybka kontrola przed rozmową z klientem."
            title="Checklist gotowości"
          />
          <Table
            headers={["Obszar", "Zakres", "Status"]}
            rows={settingsChecklist.map(([area, scope, status]) => [
              area,
              scope,
              <StatusPill key={area} label={status} tone="success" />,
            ])}
          />
        </Card>
      </div>

      <div className="settings-grid">
        <Card>
          <SectionHeader
            action={<ShieldCheck aria-hidden="true" className="section-icon" />}
            description="Co można bezpiecznie powiedzieć w demo."
            title="Bezpieczeństwo i compliance"
          />
          <div className="settings-security-list">
            {[
              ["Role i uprawnienia", Users],
              ["Separacja danych organizacji", Database],
              ["Logi audytowe", FileBarChart],
              ["Retencja i usuwanie danych", LockKeyhole],
              ["Brak prawdziwych danych w demo", ShieldCheck],
              ["Wsparcie po wdrożeniu", LifeBuoy],
            ].map(([label, Icon]) => (
              <div key={String(label)}>
                <Icon aria-hidden="true" />
                <strong>{String(label)}</strong>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader
            description="Te elementy są mockami i powinny być komunikowane jako planowana integracja."
            title="Czego nie obiecywać jako produkcyjne"
          />
          <div className="settings-risk-list">
            <p>AI Assistant działa jako UI i mock sugestii, bez prawdziwego API AI.</p>
            <p>Eksport PDF/XLSX jest przygotowany jako struktura, nie jako finalny generator dokumentów.</p>
            <p>Integracje CRM, SSO i contact center są placeholderami pod przyszłe adaptery.</p>
            <p>Auth i zapis do bazy danych nie są jeszcze podłączone.</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
