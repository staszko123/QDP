import type { ReactNode } from "react";

interface PageHeaderProps {
  actions?: ReactNode;
  badge?: ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
}

export function PageHeader({ actions, badge, description, eyebrow, title }: PageHeaderProps) {
  return (
    <header className="qd-page-header">
      <div>
        {eyebrow ? <p className="qd-eyebrow">{eyebrow}</p> : null}
        <div className="qd-page-header__title">
          <h1>{title}</h1>
          {badge}
        </div>
        <p>{description}</p>
      </div>
      {actions ? <div className="qd-page-header__actions">{actions}</div> : null}
    </header>
  );
}
