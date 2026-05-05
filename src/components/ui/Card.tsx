import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  elevated?: boolean;
}

export function Card({ children, className = "", elevated = false, ...props }: CardProps) {
  return (
    <article className={`qd-card ${elevated ? "qd-card--elevated" : ""} ${className}`} {...props}>
      {children}
    </article>
  );
}
