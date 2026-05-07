import React from 'react';
import { TransactionFilters as Filters } from '../../types/transaction';
import { Category } from '../../types/category';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface TransactionFiltersProps {
  filters: Filters;
  categories: Category[];
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  categories,
  onChange,
  onReset,
}) => {
  const handle = (field: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    onChange({ ...filters, [field]: val || undefined });
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Input
          label="Від"
          type="date"
          value={filters.dateFrom || ''}
          onChange={handle('dateFrom')}
        />
        <Input
          label="До"
          type="date"
          value={filters.dateTo || ''}
          onChange={handle('dateTo')}
        />
        <Select
          label="Тип"
          value={filters.type || ''}
          onChange={handle('type')}
          placeholder="Всі типи"
          options={[
            { value: 'INCOME', label: 'Доходи' },
            { value: 'EXPENSE', label: 'Витрати' },
          ]}
        />
        <Select
          label="Категорія"
          value={filters.categoryId || ''}
          onChange={(e) =>
            onChange({
              ...filters,
              categoryId: e.target.value ? parseInt(e.target.value, 10) : undefined,
            })
          }
          placeholder="Всі категорії"
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
        <Input
          label="Мін. сума"
          type="number"
          min="0"
          value={filters.minAmount ?? ''}
          onChange={(e) =>
            onChange({
              ...filters,
              minAmount: e.target.value ? parseFloat(e.target.value) : undefined,
            })
          }
        />
        <Input
          label="Макс. сума"
          type="number"
          min="0"
          value={filters.maxAmount ?? ''}
          onChange={(e) =>
            onChange({
              ...filters,
              maxAmount: e.target.value ? parseFloat(e.target.value) : undefined,
            })
          }
        />
        <Select
          label="Сортувати за"
          value={filters.sortBy || 'date'}
          onChange={handle('sortBy')}
          options={[
            { value: 'date', label: 'Датою' },
            { value: 'amount', label: 'Сумою' },
          ]}
        />
        <Select
          label="Порядок"
          value={filters.sortOrder || 'desc'}
          onChange={handle('sortOrder')}
          options={[
            { value: 'desc', label: 'Спадання' },
            { value: 'asc', label: 'Зростання' },
          ]}
        />
      </div>
      <div className="mt-3 flex justify-end">
        <Button variant="outline" size="sm" onClick={onReset}>
          Скинути фільтри
        </Button>
      </div>
    </div>
  );
};
