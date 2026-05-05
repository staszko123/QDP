import type { ReactNode } from "react";

interface SectionHeaderProps {
  action?: ReactNode;
  description?: string;
  title: string;
}

export function SectionHeader({ action, description, title }: SectionHeaderProps) {
  return (
    <header className="qd-section-header">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </header>
  );
}
