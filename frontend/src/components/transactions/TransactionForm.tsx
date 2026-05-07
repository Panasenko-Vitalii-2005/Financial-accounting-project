import React, { useState } from 'react';
import { Transaction } from '../../types/transaction';
import { Category } from '../../types/category';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { toInputDate } from '../../utils/formatDate';

interface TransactionFormProps {
  initialData?: Transaction;
  categories: Category[];
  onSubmit: (data: {
    amount: number;
    date: string;
    categoryId: number;
    description?: string;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [form, setForm] = useState({
    amount: initialData ? String(Number(initialData.amount)) : '',
    date: initialData ? toInputDate(initialData.date) : new Date().toISOString().split('T')[0],
    categoryId: initialData ? String(initialData.categoryId) : '',
    description: initialData?.description || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const amount = parseFloat(form.amount);
    if (!form.amount || isNaN(amount) || amount <= 0) errs.amount = 'Введіть коректну суму';
    if (!form.date) errs.date = "Дата обов'язкова";
    if (!form.categoryId) errs.categoryId = "Категорія обов'язкова";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({
      amount: parseFloat(form.amount),
      date: form.date,
      categoryId: parseInt(form.categoryId, 10),
      description: form.description || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Сума (грн)"
        type="number"
        step="0.01"
        min="0.01"
        value={form.amount}
        onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
        error={errors.amount}
        placeholder="0.00"
      />
      <Input
        label="Дата"
        type="date"
        value={form.date}
        onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
        error={errors.date}
      />
      <Select
        label="Категорія"
        value={form.categoryId}
        onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))}
        error={errors.categoryId}
        placeholder="Оберіть категорію"
        options={categories.map((c) => ({
          value: c.id,
          label: `${c.name} (${c.type === 'INCOME' ? 'Дохід' : 'Витрата'})`,
        }))}
      />
      <Input
        label="Коментар (опціонально)"
        type="text"
        value={form.description}
        onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
        placeholder="Додати коментар..."
      />
      <div className="flex gap-2 pt-2">
        <Button type="submit" isLoading={isLoading} className="flex-1">
          {initialData ? 'Зберегти' : 'Додати'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Скасувати
        </Button>
      </div>
    </form>
  );
};
