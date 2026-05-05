import type { ReactNode } from "react";
import { Card } from "./Card";

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  helper?: string;
}

export function StatCard({ helper, icon, label, value }: StatCardProps) {
  return (
    <Card className="qd-stat-card">
      <div className="qd-stat-card__icon">{icon}</div>
      <div>
        <span>{value}</span>
        <p>{label}</p>
        {helper ? <small>{helper}</small> : null}
      </div>
    </Card>
  );
}
