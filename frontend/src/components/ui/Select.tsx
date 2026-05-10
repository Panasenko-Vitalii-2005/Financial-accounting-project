import React from "react";
import { clsx } from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  placeholder,
  className,
  id,
  ...props
}) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold uppercase tracking-widest text-neon-cyan"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={clsx(
          "flex h-10 w-full border border-border bg-muted px-3 py-2 text-sm font-mono",
          "text-foreground focus-visible:outline-none focus-visible:border-neon-cyan focus-visible:glow-bright-cyan",
          "transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40",
          error && "border-neon-pink",
          className,
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-neon-pink tracking-wide">{error}</p>}
    </div>
  );
};
