import React, { useState, useEffect } from 'react';
import { Layout } from '../components/common/Layout';
import { CategoryList } from '../components/categories/CategoryList';
import { CategoryForm } from '../components/categories/CategoryForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { categoriesService } from '../services/categories.service';
import { Category } from '../types/category';
import { Plus } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/ToastContainer';

export const CategoriesPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [deleteCategory, setDeleteCategory] = useState<Category | undefined>();
  const [transferToId, setTransferToId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch {
      addToast('Помилка завантаження', 'error');
    }
  };

  const handleCreate = async (data: { name: string; type?: 'INCOME' | 'EXPENSE' }) => {
    setIsLoading(true);
    try {
      await categoriesService.create(data.name, data.type!);
      addToast('Категорію додано', 'success');
      setIsCreateOpen(false);
      loadCategories();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Помилка', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: { name: string }) => {
    if (!editingCategory) return;
    setIsLoading(true);
    try {
      await categoriesService.update(editingCategory.id, data.name);
      addToast('Категорію оновлено', 'success');
      setEditingCategory(undefined);
      loadCategories();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Помилка', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;
    setIsLoading(true);
    try {
      await categoriesService.delete(
        deleteCategory.id,
        transferToId ? parseInt(transferToId, 10) : undefined,
      );
      addToast('Категорію видалено', 'success');
      setDeleteCategory(undefined);
      setTransferToId('');
      loadCategories();
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Помилка', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const otherCategories = deleteCategory
    ? categories.filter((c) => c.id !== deleteCategory.id)
    : categories;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Категорії</h1>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Додати категорію
          </Button>
        </div>

        <CategoryList
          categories={categories}
          onEdit={(c) => setEditingCategory(c)}
          onDelete={(c) => setDeleteCategory(c)}
        />

        <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Нова категорія">
          <CategoryForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={isLoading}
          />
        </Modal>

        <Modal
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(undefined)}
          title="Редагувати категорію"
        >
          {editingCategory && (
            <CategoryForm
              initialData={editingCategory}
              onSubmit={handleUpdate}
              onCancel={() => setEditingCategory(undefined)}
              isLoading={isLoading}
            />
          )}
        </Modal>

        <Modal
          isOpen={!!deleteCategory}
          onClose={() => { setDeleteCategory(undefined); setTransferToId(''); }}
          title="Видалити категорію"
        >
          {deleteCategory && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Видалити категорію <strong>{deleteCategory.name}</strong>?
                Якщо є пов'язані транзакції, оберіть категорію для переносу.
              </p>
              <Select
                label="Перенести транзакції до"
                value={transferToId}
                onChange={(e) => setTransferToId(e.target.value)}
                placeholder="Не переносити (якщо немає транзакцій)"
                options={otherCategories.map((c) => ({ value: c.id, label: c.name }))}
              />
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Видалити
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setDeleteCategory(undefined); setTransferToId(''); }}
                  className="flex-1"
                >
                  Скасувати
                </Button>
              </div>
            </div>
          )}
        </Modal>

        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Layout>
  );
};
