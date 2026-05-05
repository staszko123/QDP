import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ className = "", id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="qd-field">
      {label ? <span>{label}</span> : null}
      <input className={`qd-input ${className}`} id={inputId} {...props} />
    </label>
  );
}
