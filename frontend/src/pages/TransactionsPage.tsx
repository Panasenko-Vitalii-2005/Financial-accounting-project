import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '../components/common/Layout';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { transactionsService } from '../services/transactions.service';
import { categoriesService } from '../services/categories.service';
import { Transaction, TransactionFilters as Filters } from '../types/transaction';
import { Category } from '../types/category';
import { Plus, Download } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/ui/ToastContainer';

const EMPTY_FILTERS: Filters = { sortBy: 'date', sortOrder: 'desc' };

export const TransactionsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    categoriesService.getAll().then(setCategories).catch(() => {});
  }, []);

  const loadTransactions = useCallback(async () => {
    try {
      const data = await transactionsService.getAll(filters);
      setTransactions(data);
    } catch {
      addToast('Помилка завантаження', 'error');
    }
  }, [filters, addToast]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleCreate = async (data: any) => {
    setIsLoading(true);
    try {
      await transactionsService.create(data);
      addToast('Транзакцію додано', 'success');
      setIsModalOpen(false);
      loadTransactions();
    } catch {
      addToast('Помилка', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingTransaction) return;
    setIsLoading(true);
    try {
      await transactionsService.update(editingTransaction.id, data);
      addToast('Транзакцію оновлено', 'success');
      setEditingTransaction(undefined);
      loadTransactions();
    } catch {
      addToast('Помилка', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Видалити транзакцію?')) return;
    try {
      await transactionsService.delete(id);
      addToast('Видалено', 'success');
      loadTransactions();
    } catch {
      addToast('Помилка', 'error');
    }
  };

  const handleExport = () => {
    const url = transactionsService.getExportUrl(filters);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Транзакції</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              CSV
            </Button>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Додати
            </Button>
          </div>
        </div>

        <TransactionFilters
          filters={filters}
          categories={categories}
          onChange={setFilters}
          onReset={() => setFilters(EMPTY_FILTERS)}
        />

        <div className="text-sm text-muted-foreground">
          Знайдено: {transactions.length} транзакцій
        </div>

        <TransactionTable
          transactions={transactions}
          onEdit={(t) => setEditingTransaction(t)}
          onDelete={handleDelete}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Нова транзакція">
          <TransactionForm
            categories={categories}
            onSubmit={handleCreate}
            onCancel={() => setIsModalOpen(false)}
            isLoading={isLoading}
          />
        </Modal>

        <Modal
          isOpen={!!editingTransaction}
          onClose={() => setEditingTransaction(undefined)}
          title="Редагувати транзакцію"
        >
          {editingTransaction && (
            <TransactionForm
              initialData={editingTransaction}
              categories={categories}
              onSubmit={handleUpdate}
              onCancel={() => setEditingTransaction(undefined)}
              isLoading={isLoading}
            />
          )}
        </Modal>

        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Layout>
  );
};
