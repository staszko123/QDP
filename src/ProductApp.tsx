import { Activity, ClipboardCheck, FileBarChart, Users } from "lucide-react";
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
import { OnboardingWizard } from "./components/onboarding";
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

export function ProductApp() {
  return (
    <AppShell
      activeOrganization={activeOrganization}
      breadcrumbs={[
        { label: "Dashboard", href: "#/app" },
        { label: "Quality overview" },
      ]}
      organizations={organizations}
      user={activeUser}
    >
      <PageHeader
        actions={
          <>
            <Button variant="secondary">Export</Button>
            <Button>New evaluation</Button>
          </>
        }
        badge={<Badge tone="orange">{activePlan?.name}</Badge>}
        description="Premium SaaS workspace for multi tenant quality programs, mock services, scorecards, reports, integrations, and audit visibility."
        eyebrow="Dashboard"
        title={activeOrganization?.name ?? "QualityDesk"}
      />

      <OnboardingWizard />
      <QualityDashboard />
      <TemplateLibrary />
      <ReportsModule />
      <IntegrationsModule />
      <AdminPanel />
      <BillingModule />
      <EvaluationForm />
      <EvaluationTemplateBuilder />
      <DemoSandbox />

      <section className="workspace-grid">
        <StickySummaryPanel title="Tenant summary">
          <div className="summary-list">
            <div>
              <span>
                <Users aria-hidden="true" />
                Users
              </span>
              <strong>{users.length}</strong>
            </div>
            <div>
              <span>
                <FileBarChart aria-hidden="true" />
                Reports
              </span>
              <strong>{reports.length}</strong>
            </div>
            <div>
              <span>
                <Activity aria-hidden="true" />
                Score
              </span>
              <strong>86%</strong>
            </div>
          </div>
          <EmptyState
            description="Use this pattern when a tenant has no records yet."
            icon={<ClipboardCheck aria-hidden="true" />}
            title="No blockers"
          />
        </StickySummaryPanel>
      </section>
    </AppShell>
  );
}
