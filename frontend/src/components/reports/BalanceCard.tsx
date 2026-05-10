import React from "react";
import { BalanceReport } from "../../types/report";
import { formatCurrency } from "../../utils/formatCurrency";
import { TrendingUp, TrendingDown, Scale } from "lucide-react";
import { clsx } from "clsx";

interface BalanceCardProps {
  report: BalanceReport;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ report }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="relative bg-card border border-neon-cyan/40 p-6 cp-border glow-card before:pointer-events-none after:pointer-events-none cyber-hover">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-neon-cyan/50 bg-neon-cyan/10">
            <TrendingUp className="h-5 w-5 text-neon-cyan drop-shadow-[0_0_6px_#00e5ff]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-neon-cyan">
              Доходи
            </p>
            <p className="text-2xl font-black text-neon-cyan text-glow-cyan font-mono">
              {formatCurrency(report.income)}
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-card border border-neon-pink/40 p-6 cp-border glow-card before:pointer-events-none after:pointer-events-none cyber-hover">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-neon-pink/50 bg-neon-pink/10">
            <TrendingDown className="h-5 w-5 text-neon-pink drop-shadow-[0_0_6px_#ff2d78]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-neon-pink">
              Витрати
            </p>
            <p className="text-2xl font-black text-neon-pink text-glow-pink font-mono">
              {formatCurrency(report.expense)}
            </p>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "relative bg-card p-6 cp-border glow-card before:pointer-events-none after:pointer-events-none cyber-hover",
          report.balance >= 0
            ? "border border-neon-yellow/40"
            : "border border-neon-pink/40",
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "p-2 border",
              report.balance >= 0
                ? "border-neon-yellow/50 bg-neon-yellow/10"
                : "border-neon-pink/50 bg-neon-pink/10",
            )}
          >
            <Scale
              className={clsx(
                "h-5 w-5",
                report.balance >= 0
                  ? "text-neon-yellow drop-shadow-[0_0_6px_#ffe600]"
                  : "text-neon-pink drop-shadow-[0_0_6px_#ff2d78]",
              )}
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-neon-yellow">
              Баланс
            </p>
            <p
              className={clsx(
                "text-2xl font-black font-mono",
                report.balance >= 0
                  ? "text-neon-yellow text-glow-yellow"
                  : "text-neon-pink text-glow-pink",
              )}
            >
              {formatCurrency(report.balance)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
