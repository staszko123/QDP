import type { ReactNode } from "react";
import {
  Bell,
  Boxes,
  Building2,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  FlaskConical,
  Gauge,
  LayoutTemplate,
  LifeBuoy,
  Menu,
  PlugZap,
  Search,
  Settings,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import type { Organization, User } from "../../types";
import { Badge, Button } from "../ui";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AppShellProps {
  activeOrganization?: Organization;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
  organizations: Organization[];
  user?: User;
}

const navigation = [
  { label: "Dashboard", href: "#/app/dashboard", icon: Gauge, active: true },
  { label: "Oceny", href: "#/app/evaluations", icon: ClipboardCheck },
  { label: "Kreator ocen", href: "#/app/builder", icon: Sparkles },
  { label: "Szablony", href: "#/app/templates", icon: LayoutTemplate },
  { label: "Raporty", href: "#/app/reports", icon: FileBarChart },
  { label: "Zespoły", href: "#/app/teams", icon: Users },
  { label: "Specjaliści", href: "#/app/specialists", icon: LifeBuoy },
  { label: "Integracje", href: "#/app/integrations", icon: PlugZap },
  { label: "Administracja", href: "#/app/administration", icon: Shield },
  { label: "Ustawienia", href: "#/app/settings", icon: Settings },
  { label: "Billing", href: "#/app/billing", icon: CreditCard },
  { label: "Demo sandbox", href: "#/app/sandbox", icon: FlaskConical },
];

export function AppShell({
  activeOrganization,
  breadcrumbs,
  children,
  organizations,
  user,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand-block">
          <span className="brand-mark">QD</span>
          <div>
            <p>QualityDesk</p>
            <strong>Quality operations</strong>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="app-nav">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <a
                aria-current={item.active ? "page" : undefined}
                className="app-nav__link"
                href={item.href}
                key={item.label}
              >
                <Icon aria-hidden="true" size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      <div className="app-frame">
        <header className="topbar">
          <div className="topbar__left">
            <Button aria-label="Open navigation" className="topbar__menu" variant="ghost">
              <Menu aria-hidden="true" size={20} />
            </Button>

            <label className="topbar-search">
              <Search aria-hidden="true" size={18} />
              <input placeholder="Search evaluations, reports, specialists" type="search" />
            </label>
          </div>

          <div className="topbar__right">
            <label className="organization-switcher">
              <Building2 aria-hidden="true" size={18} />
              <span>Organization</span>
              <select defaultValue={activeOrganization?.id}>
                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name}
                  </option>
                ))}
              </select>
            </label>

            <Button aria-label="Notifications" className="icon-button" variant="secondary">
              <Bell aria-hidden="true" size={18} />
              <span className="notification-dot" />
            </Button>

            <button className="user-menu" type="button">
              <span className="user-menu__avatar">{getInitials(user?.displayName ?? "QualityDesk")}</span>
              <span>
                <strong>{user?.displayName ?? "QualityDesk User"}</strong>
                <small>{user?.email ?? "user@qualitydesk.local"}</small>
              </span>
            </button>
          </div>
        </header>

        <main className="content">
          <div className="breadcrumbs" aria-label="Breadcrumb">
            <Boxes aria-hidden="true" size={16} />
            {breadcrumbs.map((breadcrumb, index) => (
              <span key={breadcrumb.label}>
                {breadcrumb.href ? <a href={breadcrumb.href}>{breadcrumb.label}</a> : breadcrumb.label}
                {index < breadcrumbs.length - 1 ? <span className="breadcrumbs__separator">/</span> : null}
              </span>
            ))}
          </div>

          <div className="active-organization-strip">
            <span>{activeOrganization?.name ?? "No organization selected"}</span>
            <Badge tone="blue">Live workspace</Badge>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
