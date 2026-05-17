import { Activity, ArrowRight, CheckCircle2, ClipboardCheck, FileBarChart, Settings, Users } from "lucide-react";
import { AppShell } from "./components/layout";
import { EvaluationForm } from "./components/evaluation-form";
import { EvaluationTemplateBuilder } from "./components/evaluation-builder";
import { QualityDashboard } from "./components/quality-dashboard";
import { TemplateLibrary } from "./components/template-library";
import { ReportsModule } from "./components/reports";
import { IntegrationsModule } from "./components/integrations";
import { AdminPanel } from "./components/admin";
import { DemoSandbox } from "./components/demo-sandbox";
import { BillingModule } from "./components/billing";
import { SettingsModule } from "./components/settings";
import {
  Badge,
  Button,
  EmptyState,
  PageHeader,
  StickySummaryPanel,
} from "./components/ui";
import {
  organizationService,
  reportService,
  subscriptionService,
  userService,
} from "./services";

const activeOrganizationId = "org-aurora";

const organizations = await organizationService.listOrganizations();
const activeOrganization = await organizationService.getOrganization(activeOrganizationId);
const users = await userService.listUsers(activeOrganizationId);
const reports = await reportService.listReports(activeOrganizationId);
const plans = await subscriptionService.listPlans();
const activePlan = plans.find((plan) => plan.id === activeOrganization?.subscriptionPlanId);
const activeUser = users[0];

interface ProductAppProps {
  routePath: string;
}

const routeLabels: Record<string, string> = {
  "/app": "Dashboard",
  "/app/dashboard": "Dashboard",
  "/app/evaluations": "Oceny",
  "/app/builder": "Kreator ocen",
  "/app/templates": "Szablony",
  "/app/reports": "Raporty",
  "/app/teams": "Zespoły",
  "/app/specialists": "Specjaliści",
  "/app/integrations": "Integracje",
  "/app/administration": "Administracja",
  "/app/settings": "Ustawienia",
  "/app/billing": "Billing",
  "/app/sandbox": "Demo sandbox",
};

export function ProductApp({ routePath }: ProductAppProps) {
  const activeRoute = routeLabels[routePath] ? routePath : "/app/dashboard";
  const activeLabel = routeLabels[activeRoute] ?? "Dashboard";
  const isDashboard = activeRoute === "/app" || activeRoute === "/app/dashboard";

  return (
    <AppShell
      activeOrganization={activeOrganization}
      breadcrumbs={[
        { label: "Aplikacja", href: "#/app" },
        { label: activeLabel },
      ]}
      organizations={organizations}
      user={activeUser}
    >
      <PageHeader
        actions={
          <>
            <Button onClick={() => { window.location.hash = "#/app/reports"; }} variant="secondary">
              Eksport
            </Button>
            <Button onClick={() => { window.location.hash = "#/app/evaluations"; }}>
              Nowa ocena
            </Button>
          </>
        }
        badge={<Badge tone="orange">{activePlan?.name}</Badge>}
        description="Sprzedażowe demo SaaS dla programów jakości: formularze ocen, scoring, dashboardy, raporty, integracje i audyt w jednym widoku."
        eyebrow="Dashboard"
        title={activeOrganization?.name ?? "QualityDesk"}
      />

      {isDashboard ? (
        <DashboardCommandCenter />
      ) : null}

      {isDashboard ? (
        <section className="demo-flow-strip" aria-label="Ścieżka demo sprzedażowego">
        {[
          { label: "1. Landing page", href: "#/", text: "Pokaż problem, wartość i pricing." },
          { label: "2. Onboarding", href: "#/app/dashboard", text: "Przejdź przez checklistę startową." },
          { label: "3. Pierwsza ocena", href: "#/app/evaluations", text: "Zapisz ocenę z wynikiem i komentarzem." },
          { label: "4. Raport", href: "#/app/reports", text: "Pokaż podgląd i eksport CSV/PDF mock." },
        ].map((step) => (
          <a href={step.href} key={step.label}>
            <strong>{step.label}</strong>
            <span>{step.text}</span>
          </a>
        ))}
        </section>
      ) : null}

      {renderActiveModule(activeRoute)}

      <section className="workspace-grid">
        <StickySummaryPanel title="Podsumowanie tenant">
          <div className="summary-list">
            <div>
              <span>
                <Users aria-hidden="true" />
                Użytkownicy
              </span>
              <strong>{users.length}</strong>
            </div>
            <div>
              <span>
                <FileBarChart aria-hidden="true" />
                Raporty
              </span>
              <strong>{reports.length}</strong>
            </div>
            <div>
              <span>
                <Activity aria-hidden="true" />
                Wynik
              </span>
              <strong>86%</strong>
            </div>
          </div>
          <EmptyState
            description="Tenant demo ma komplet danych do prezentacji bez pustych widoków."
            icon={<ClipboardCheck aria-hidden="true" />}
            title="Gotowe do demo"
          />
        </StickySummaryPanel>
      </section>
    </AppShell>
  );
}

function DashboardCommandCenter() {
  const actions = [
    {
      description: "Wypełniony formularz z wynikiem, komentarzami i zapisem mock.",
      href: "#/app/evaluations",
      label: "Wykonaj pierwszą ocenę",
    },
    {
      description: "Podgląd raportu, historia generowania i eksport CSV/PDF mock.",
      href: "#/app/reports",
      label: "Zobacz raport",
    },
    {
      description: "Instrukcja korzystania z demo i checklist gotowości.",
      href: "#/app/settings",
      label: "Jak korzystać z aplikacji",
    },
  ];

  return (
    <section className="command-center" aria-label="Centrum akcji dashboardu">
      <div className="command-center__intro">
        <Badge tone="success">Gotowe do prezentacji</Badge>
        <h2>Co chcesz zrobić teraz?</h2>
        <p>
          Zacznij od jednej z trzech głównych akcji. Dashboard pokazuje stan jakości,
          ale praca operacyjna zaczyna się od oceny, raportu albo instrukcji demo.
        </p>
      </div>
      <div className="command-center__actions">
        {actions.map((action) => (
          <a href={action.href} key={action.label}>
            <span>
              {action.href.includes("settings") ? (
                <Settings aria-hidden="true" />
              ) : action.href.includes("reports") ? (
                <FileBarChart aria-hidden="true" />
              ) : (
                <CheckCircle2 aria-hidden="true" />
              )}
            </span>
            <strong>{action.label}</strong>
            <small>{action.description}</small>
            <ArrowRight aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

function renderActiveModule(routePath: string) {
  switch (routePath) {
    case "/app":
    case "/app/dashboard":
      return <QualityDashboard />;
    case "/app/evaluations":
      return <EvaluationForm />;
    case "/app/builder":
      return <EvaluationTemplateBuilder />;
    case "/app/templates":
      return <TemplateLibrary />;
    case "/app/reports":
      return <ReportsModule />;
    case "/app/integrations":
      return <IntegrationsModule />;
    case "/app/administration":
    case "/app/teams":
    case "/app/specialists":
      return <AdminPanel />;
    case "/app/settings":
      return <SettingsModule />;
    case "/app/billing":
      return <BillingModule />;
    case "/app/sandbox":
      return <DemoSandbox />;
    default:
      return <QualityDashboard />;
  }
}
