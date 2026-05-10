import React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold uppercase tracking-widest text-neon-cyan"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          "flex h-10 w-full border border-border bg-muted px-3 py-2 text-sm font-mono",
          "text-foreground placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:border-neon-cyan focus-visible:glow-bright-cyan",
          "transition-all duration-200",
          "disabled:cursor-not-allowed disabled:opacity-40",
          error &&
            "border-neon-pink focus-visible:border-neon-pink focus-visible:glow-bright-pink",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-neon-pink tracking-wide">{error}</p>}
    </div>
  );
};
