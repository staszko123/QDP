import type { ScoreSeverity } from "../../types";
import { Badge } from "./Badge";

const scoreTone: Record<ScoreSeverity, "success" | "blue" | "warning" | "danger"> = {
  excellent: "success",
  good: "blue",
  warning: "warning",
  critical: "danger",
};

interface ScoreBadgeProps {
  percentage: number;
  severity: ScoreSeverity;
}

export function ScoreBadge({ percentage, severity }: ScoreBadgeProps) {
  return <Badge tone={scoreTone[severity]}>{percentage}%</Badge>;
}
