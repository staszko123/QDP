import type { ReactNode } from "react";
import { Card } from "./Card";

interface StickySummaryPanelProps {
  children: ReactNode;
  title: string;
}

export function StickySummaryPanel({ children, title }: StickySummaryPanelProps) {
  return (
    <Card className="qd-sticky-summary" elevated>
      <h2>{title}</h2>
      {children}
    </Card>
  );
}
