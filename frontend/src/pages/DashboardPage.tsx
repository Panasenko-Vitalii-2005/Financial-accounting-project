import React, { useState, useEffect } from "react";
import { Layout } from "../components/common/Layout";
import { BalanceCard } from "../components/reports/BalanceCard";
import { TransactionTable } from "../components/transactions/TransactionTable";
import { TransactionForm } from "../components/transactions/TransactionForm";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { reportsService } from "../services/reports.service";
import { transactionsService } from "../services/transactions.service";
import { categoriesService } from "../services/categories.service";
import { BalanceReport } from "../types/report";
import { Transaction } from "../types/transaction";
import { Category } from "../types/category";
import { getCurrentMonthRange } from "../utils/formatDate";
import { Plus } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/ToastContainer";

export const DashboardPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [balance, setBalance] = useState<BalanceReport | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dateFrom, dateTo } = getCurrentMonthRange();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bal, txs, cats] = await Promise.all([
        reportsService.getBalance(dateFrom, dateTo),
        transactionsService.getAll({ sortBy: "date", sortOrder: "desc" }),
        categoriesService.getAll(),
      ]);
      setBalance(bal);
      setTransactions(txs.slice(0, 10));
      setCategories(cats);
    } catch {
      addToast("Помилка завантаження даних", "error");
    }
  };

  const handleCreate = async (data: any) => {
    setIsLoading(true);
    try {
      await transactionsService.create(data);
      addToast("Транзакцію додано", "success");
      setIsModalOpen(false);
      loadData();
    } catch {
      addToast("Помилка при додаванні", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Дашборд</h1>
            <p className="text-sm text-muted-foreground">
              Баланс за поточний місяць
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Додати транзакцію
          </Button>
        </div>

        {balance && <BalanceCard report={balance} />}

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Останні транзакції</h2>
          <TransactionTable transactions={transactions} showActions={false} />
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Нова транзакція"
        >
          <TransactionForm
            categories={categories}
            onSubmit={handleCreate}
            onCancel={() => setIsModalOpen(false)}
            isLoading={isLoading}
          />
        </Modal>

        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Layout>
  );
};
