import React, { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div
    className={clsx(
      "relative bg-card p-6 border border-border cp-border glow-card",
      "before:pointer-events-none after:pointer-events-none",
      className,
    )}
  >
    {children}
  </div>
);
