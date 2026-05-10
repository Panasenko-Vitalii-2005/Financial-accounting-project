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
      <div className="border border-border bg-card p-12 text-center text-muted-foreground font-mono uppercase tracking-widest">
        Транзакцій не знайдено
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Дата
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Категорія
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Тип
            </th>
            <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Сума
            </th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Коментар
            </th>
            {showActions && (
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Дії
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y">
          {transactions.map((t) => (
            <tr
              key={t.id}
              className="hover:bg-neon-cyan/10 border-b border-border/50 transition-all duration-200 cyber-hover"
            >
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(t.date)}
              </td>
              <td className="px-4 py-3">{t.category.name}</td>
              <td className="px-4 py-3">
                <span
                  className={clsx(
                    "inline-flex px-2 py-0.5 text-xs font-bold uppercase tracking-widest border",
                    t.category.type === "INCOME"
                      ? "badge-income text-neon-cyan"
                      : "badge-expense text-neon-pink",
                  )}
                >
                  {t.category.type === "INCOME" ? "Дохід" : "Витрата"}
                </span>
              </td>
              <td
                className={clsx(
                  "px-4 py-3 text-right font-bold font-mono",
                  t.category.type === "INCOME"
                    ? "text-neon-cyan"
                    : "text-neon-pink",
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
