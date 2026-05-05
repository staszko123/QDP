import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ className = "", id, label, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="qd-field">
      {label ? <span>{label}</span> : null}
      <textarea className={`qd-input qd-textarea ${className}`} id={textareaId} {...props} />
    </label>
  );
}
