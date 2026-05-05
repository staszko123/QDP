import type { ReactNode } from "react";
import { Button } from "./Button";

interface DrawerProps {
  children: ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}

export function Drawer({ children, onClose, open, title }: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="qd-overlay qd-overlay--drawer" role="presentation">
      <aside aria-label={title} className="qd-drawer">
        <header className="qd-modal__header">
          <h2>{title}</h2>
          <Button aria-label="Close drawer" onClick={onClose} variant="ghost">
            Close
          </Button>
        </header>
        {children}
      </aside>
    </div>
  );
}
