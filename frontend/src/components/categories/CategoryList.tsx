import React from 'react';
import { Category } from '../../types/category';
import { Button } from '../ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onEdit: (c: Category) => void;
  onDelete: (c: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete }) => {
  const income = categories.filter((c) => c.type === 'INCOME');
  const expense = categories.filter((c) => c.type === 'EXPENSE');

  const renderGroup = (title: string, items: Category[], color: string) => (
    <div>
      <h3 className={`mb-3 text-sm font-semibold uppercase tracking-wide ${color}`}>{title}</h3>
      <div className="space-y-2">
        {items.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-md border bg-card px-4 py-3"
          >
            <span className="font-medium">{c.name}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(c)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(c)}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">Немає категорій</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {renderGroup('Доходи', income, 'text-green-600')}
      {renderGroup('Витрати', expense, 'text-red-600')}
    </div>
  );
};
