import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={clsx('rounded-lg border bg-card p-6 shadow-sm', className)}>{children}</div>
);
