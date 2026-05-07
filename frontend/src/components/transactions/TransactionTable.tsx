import React from "react";
import { Transaction } from "../../types/transaction";
import { formatDate } from "../../utils/formatDate";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import { clsx } from "clsx";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit?: (t: Transaction) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
        Транзакцій не знайдено
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Дата
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Категорія
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Тип
            </th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">
              Сума
            </th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
              Коментар
            </th>
            {showActions && (
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Дії
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(t.date)}
              </td>
              <td className="px-4 py-3">{t.category.name}</td>
              <td className="px-4 py-3">
                <span
                  className={clsx(
                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                    t.category.type === "INCOME"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                  )}
                >
                  {t.category.type === "INCOME" ? "Дохід" : "Витрата"}
                </span>
              </td>
              <td
                className={clsx(
                  "px-4 py-3 text-right font-medium",
                  t.category.type === "INCOME"
                    ? "text-green-600"
                    : "text-red-600",
                )}
              >
                {t.category.type === "INCOME" ? "+" : "-"}
                {formatCurrency(t.amount)}
              </td>
              <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                {t.description || "—"}
              </td>
              {showActions && onEdit && onDelete && (
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(t)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(t.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
