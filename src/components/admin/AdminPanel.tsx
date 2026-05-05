import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Building2, CheckCircle2, History, Palette, ShieldCheck, SlidersHorizontal } from "lucide-react";
import {
  mockAuditLogs,
  mockOrganizations,
  mockRoles,
  mockSpecialists,
  mockTeams,
  mockUsers,
} from "../../data";
import type { RoleName } from "../../types";
import {
  activityHistory,
  enterpriseReadinessChecklist,
  evaluationChangeHistory,
  organizationSettings,
  permissionGroups,
  rolePermissions,
  securityAuditLogs,
  templateChangeHistory,
} from "./mockAdminModule";
import { Badge, Button, Card, Input, SectionHeader, StatusPill, Table } from "../ui";

export function AdminPanel() {
  const [settingsSaved, setSettingsSaved] = useState(false);
  const auroraUsers = useMemo(
    () => mockUsers.filter((user) => user.organizationId === "org-aurora"),
    []
  );
  const auroraRoles = useMemo(
    () => mockRoles.filter((role) => role.organizationId === "org-aurora"),
    []
  );
  const auroraTeams = useMemo(
    () => mockTeams.filter((team) => team.organizationId === "org-aurora"),
    []
  );
  const auroraSpecialists = useMemo(
    () => mockSpecialists.filter((specialist) => specialist.organizationId === "org-aurora"),
    []
  );

  return (
    <section className="admin-panel" id="administration">
      <Card elevated>
        <SectionHeader
          action={<StatusPill label="Auth mock" tone="warning" />}
          description="Panel administracyjny organizacji bez prawdziwego auth. Struktura RBAC jest przygotowana pod przyszłe podłączenie dostawcy tożsamości."
          title="Administracja organizacji"
        />

        <div className="admin-kpi-grid">
          <AdminMetric icon={<Building2 aria-hidden="true" />} label="Organizacje" value={mockOrganizations.length} />
          <AdminMetric icon={<ShieldCheck aria-hidden="true" />} label="Role" value={auroraRoles.length} />
          <AdminMetric icon={<History aria-hidden="true" />} label="Logi audytowe" value={mockAuditLogs.length} />
          <AdminMetric icon={<SlidersHorizontal aria-hidden="true" />} label="Retencja ocen" value={`${organizationSettings.retention.evaluationsDays} dni`} />
        </div>
      </Card>

      <div className="admin-grid">
        <Card>
          <SectionHeader description="Użytkownicy i przypisane role w organizacji." title="Użytkownicy" />
          <Table
            headers={["Użytkownik", "Email", "Status", "Role"]}
            rows={auroraUsers.map((user) => [
              user.displayName,
              user.email,
              <StatusPill key={`${user.id}-status`} label={user.status} tone="success" />,
              user.roleIds
                .map((roleId) => auroraRoles.find((role) => role.id === roleId)?.name)
                .filter(Boolean)
                .join(", "),
            ])}
          />
        </Card>

        <Card>
          <SectionHeader description="Zespoły i specjaliści przypisani do tenant workspace." title="Zespoły i specjaliści" />
          <Table
            headers={["Zespół", "Lider", "Specjaliści"]}
            rows={auroraTeams.map((team) => [
              team.name,
              auroraUsers.find((user) => user.id === team.leaderId)?.displayName ?? "Brak",
              team.specialistIds
                .map((specialistId) => auroraSpecialists.find((specialist) => specialist.id === specialistId)?.displayName)
                .filter(Boolean)
                .join(", ") || "Brak",
            ])}
          />
        </Card>
      </div>

      <Card>
        <SectionHeader
          description="Mock permissions według roli. Owner ma pełny dostęp, pozostałe role mają zakres zgodny z opisem produktu."
          title="Role i uprawnienia"
        />
        <div className="permissions-matrix">
          <div className="permissions-matrix__header">
            <strong>Obszar</strong>
            {Object.keys(rolePermissions).map((role) => (
              <strong key={role}>{role}</strong>
            ))}
          </div>
          {permissionGroups.map((group) => (
            <div className="permissions-matrix__row" key={group.area}>
              <span>
                <strong>{group.area}</strong>
                <small>{group.permissions.join(", ")}</small>
              </span>
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <PermissionCell
                  key={`${group.area}-${role}`}
                  permissions={permissions}
                  requiredPermissions={group.permissions}
                  role={role as RoleName}
                />
              ))}
            </div>
          ))}
        </div>
      </Card>

      <div className="admin-grid">
        <Card>
          <SectionHeader
            action={<Palette aria-hidden="true" className="section-icon" />}
            description="Widok ustawień organizacji, brandingu klienta, scoringu, danych i retencji."
            title="Ustawienia organizacji"
          />
          <div className="admin-settings-grid">
            <Input label="Kolor główny brandingu" name="brandColor" value={organizationSettings.branding.primaryColor} readOnly />
            <Input label="Tryb logo" name="logoMode" value={organizationSettings.branding.logoMode} readOnly />
            <Input label="Próg Dobry" name="goodThreshold" value={organizationSettings.scoring.goodThreshold} readOnly />
            <Input label="Próg Wymaga uwagi" name="attentionThreshold" value={organizationSettings.scoring.attentionThreshold} readOnly />
            <Input label="Strefa czasowa" name="timezone" value={organizationSettings.data.defaultTimezone} readOnly />
            <Input label="Retencja nagrań" name="recordingsRetention" value={`${organizationSettings.retention.recordingsDays} dni`} readOnly />
          </div>
          <div className="admin-settings-actions">
            <Button onClick={() => setSettingsSaved(true)}>Zapisz ustawienia mock</Button>
            {settingsSaved ? (
              <span>
                <CheckCircle2 aria-hidden="true" size={16} />
                Ustawienia zapisane lokalnie.
              </span>
            ) : null}
          </div>
        </Card>

        <Card>
          <SectionHeader description="Przygotowana struktura pod przyszły provider auth." title="Auth readiness" />
          <div className="auth-readiness">
            <p>
              <strong>Aktualnie:</strong> aplikacja używa mock użytkowników, ról i uprawnień.
            </p>
            <p>
              <strong>Docelowo:</strong> `currentUser`, `organizationId`, role i permissions powinny przychodzić z sesji auth.
            </p>
            <Badge tone="blue">RBAC ready</Badge>
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader
          action={<ShieldCheck aria-hidden="true" className="section-icon" />}
          description="Widok bezpieczeństwa obejmuje role, separację danych, audyt, retencję, eksport/usuwanie danych, zgody i demo masking."
          title="Bezpieczeństwo i compliance"
        />
        <div className="security-readiness-grid">
          {enterpriseReadinessChecklist.map((check) => (
            <div className="security-check" key={check.item}>
              <span className={check.ready ? "score-positive" : "score-negative"}>
                <CheckCircle2 aria-hidden="true" size={18} />
              </span>
              <strong>{check.item}</strong>
              <Badge tone={check.ready ? "success" : "warning"}>
                {check.ready ? "Gotowe" : "Mock / do wdrożenia"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <div className="admin-grid">
        <Card>
          <SectionHeader description="Mock logów bezpieczeństwa i operacji na danych." title="Logi bezpieczeństwa" />
          <Table
            headers={["Obszar", "Zdarzenie", "Aktor", "Czas"]}
            rows={securityAuditLogs.map((log) => [log.area, log.event, log.actor, log.time])}
          />
        </Card>

        <Card>
          <SectionHeader description="Historia zmian ocen i szablonów." title="Historia zmian" />
          <Table
            headers={["Typ", "Obiekt", "Zmiana", "Czas"]}
            rows={[
              ...evaluationChangeHistory.map((change) => [
                "Ocena",
                change.item,
                `${change.change} (${change.actor})`,
                change.time,
              ]),
              ...templateChangeHistory.map((change) => [
                "Szablon",
                change.item,
                `${change.change} (${change.actor})`,
                change.time,
              ]),
            ]}
          />
        </Card>
      </div>

      <div className="admin-grid">
        <Card>
          <SectionHeader description="Logi audytowe tenant workspace." title="Logi audytowe" />
          <Table
            headers={["Akcja", "Obiekt", "Komunikat"]}
            rows={mockAuditLogs.map((log) => [log.action, log.targetType, log.message])}
          />
        </Card>

        <Card>
          <SectionHeader description="Ostatnia aktywność administracyjna." title="Historia aktywności" />
          <Table
            headers={["Aktor", "Akcja", "Czas"]}
            rows={activityHistory.map((activity) => [activity.actor, activity.action, activity.time])}
          />
        </Card>
      </div>
    </section>
  );
}

function AdminMetric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="admin-metric">
      <span>{icon}</span>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}

function PermissionCell({
  permissions,
  requiredPermissions,
}: {
  permissions: string[];
  requiredPermissions: string[];
  role: RoleName;
}) {
  const hasAccess =
    permissions.includes("*") ||
    requiredPermissions.some((permission) => permissions.includes(permission));

  return hasAccess ? (
    <Badge tone="success">Tak</Badge>
  ) : (
    <Badge tone="neutral">Nie</Badge>
  );
}
