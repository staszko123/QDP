import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "blue" | "orange" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

export function Badge({ children, className = "", tone = "blue", ...props }: BadgeProps) {
  return (
    <span className={`qd-badge qd-badge--${tone} ${className}`} {...props}>
      {children}
    </span>
  );
}
