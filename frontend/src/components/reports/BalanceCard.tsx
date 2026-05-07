import React from 'react';
import { BalanceReport } from '../../types/report';
import { formatCurrency } from '../../utils/formatCurrency';
import { TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { clsx } from 'clsx';

interface BalanceCardProps {
  report: BalanceReport;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ report }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Доходи</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(report.income)}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-red-100 p-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Витрати</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(report.expense)}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className={clsx('rounded-full p-2', report.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100')}>
            <Scale className={clsx('h-5 w-5', report.balance >= 0 ? 'text-blue-600' : 'text-orange-600')} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Баланс</p>
            <p
              className={clsx(
                'text-2xl font-bold',
                report.balance >= 0 ? 'text-blue-600' : 'text-orange-600',
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
