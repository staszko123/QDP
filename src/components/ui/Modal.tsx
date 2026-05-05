import type { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  children: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}

export function Modal({ children, onClose, open, title }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="qd-overlay" role="presentation">
      <section aria-modal="true" className="qd-modal" role="dialog">
        <header className="qd-modal__header">
          <h2>{title}</h2>
          <Button aria-label="Close modal" onClick={onClose} variant="ghost">
            Close
          </Button>
        </header>
        {children}
      </section>
    </div>
  );
}
