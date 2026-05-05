import type { ReactNode } from "react";

interface EmptyStateProps {
  action?: ReactNode;
  description: string;
  icon?: ReactNode;
  title: string;
}

export function EmptyState({ action, description, icon, title }: EmptyStateProps) {
  return (
    <section className="qd-empty-state">
      {icon ? <div className="qd-empty-state__icon">{icon}</div> : null}
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}
