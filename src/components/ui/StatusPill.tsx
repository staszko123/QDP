import { Badge } from "./Badge";

type StatusTone = "success" | "warning" | "danger" | "neutral" | "blue";

interface StatusPillProps {
  label: string;
  tone?: StatusTone;
}

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  return <Badge tone={tone}>{label}</Badge>;
}
