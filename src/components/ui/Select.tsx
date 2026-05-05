import type { SelectHTMLAttributes } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export function Select({ className = "", id, label, options, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="qd-field">
      {label ? <span>{label}</span> : null}
      <select className={`qd-input qd-select ${className}`} id={selectId} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
