import React, { useState } from 'react';
import { Category } from '../../types/category';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: { name: string; type?: 'INCOME' | 'EXPENSE' }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>(initialData?.type || 'EXPENSE');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Назва обов'язкова");
      return;
    }
    setError('');
    onSubmit({ name: name.trim(), type: initialData ? undefined : type });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Назва категорії"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        placeholder="Введіть назву"
        autoFocus
      />
      {!initialData && (
        <Select
          label="Тип"
          value={type}
          onChange={(e) => setType(e.target.value as 'INCOME' | 'EXPENSE')}
          options={[
            { value: 'INCOME', label: 'Дохід' },
            { value: 'EXPENSE', label: 'Витрата' },
          ]}
        />
      )}
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
