import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { getCurrentMonthRange } from '../../utils/formatDate';

interface PeriodSelectorProps {
  dateFrom?: string;
  dateTo?: string;
  onChange: (dateFrom?: string, dateTo?: string) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ dateFrom, dateTo, onChange }) => {
  const presets = [
    {
      label: 'Цей місяць',
      action: () => {
        const { dateFrom, dateTo } = getCurrentMonthRange();
        onChange(dateFrom, dateTo);
      },
    },
    {
      label: 'Минулий місяць',
      action: () => {
        const now = new Date();
        const from = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
        const to = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
        onChange(from, to);
      },
    },
    {
      label: 'Цей рік',
      action: () => {
        const year = new Date().getFullYear();
        onChange(`${year}-01-01`, `${year}-12-31`);
      },
    },
    {
      label: 'Весь час',
      action: () => onChange(undefined, undefined),
    },
  ];

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <Button key={p.label} variant="outline" size="sm" onClick={p.action}>
            {p.label}
          </Button>
        ))}
      </div>
      <div className="flex items-end gap-2">
        <Input
          label="Від"
          type="date"
          value={dateFrom || ''}
          onChange={(e) => onChange(e.target.value || undefined, dateTo)}
          className="w-36"
        />
        <Input
          label="До"
          type="date"
          value={dateTo || ''}
          onChange={(e) => onChange(dateFrom, e.target.value || undefined)}
          className="w-36"
        />
      </div>
    </div>
  );
};
