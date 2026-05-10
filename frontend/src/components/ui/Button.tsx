import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading,
  className,
  disabled,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-40 clip-corner-tr relative overflow-hidden cyber-hover";

  const variants = {
    primary:
      "bg-neon-yellow text-background hover:bg-yellow-300 border-2 border-neon-yellow hover:border-yellow-300 shadow-neon-yellow hover:shadow-neon-yellow",
    secondary:
      "bg-neon-cyan/20 text-neon-cyan border-2 border-neon-cyan shadow-neon-sm-cyan hover:bg-neon-cyan/30 hover:border-neon-cyan hover:shadow-neon-cyan",
    destructive:
      "bg-neon-pink/20 text-neon-pink border-2 border-neon-pink shadow-neon-sm-pink hover:bg-neon-pink/30 hover:border-neon-pink hover:shadow-neon-pink",
    ghost:
      "bg-transparent text-neon-cyan border-2 border-neon-cyan/60 shadow-neon-sm-cyan hover:text-neon-yellow hover:bg-neon-yellow/10 hover:border-neon-yellow hover:shadow-neon-yellow",
    outline:
      "bg-transparent text-neon-cyan border-2 border-neon-cyan shadow-neon-sm-cyan hover:bg-neon-cyan/15 hover:text-neon-yellow hover:border-neon-yellow hover:shadow-neon-yellow",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-8 text-base",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
