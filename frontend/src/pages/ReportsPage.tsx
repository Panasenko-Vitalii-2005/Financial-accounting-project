import React, { useState, useEffect } from "react";
import { Layout } from "../components/common/Layout";
import { BalanceCard } from "../components/reports/BalanceCard";
import { CategoryChart } from "../components/reports/CategoryChart";
import { TimelineChart } from "../components/reports/TimelineChart";
import { PeriodSelector } from "../components/reports/PeriodSelector";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Select } from "../components/ui/Select";
import { reportsService } from "../services/reports.service";
import { BalanceReport, CategoryReport, TimelineEntry } from "../types/report";
import { formatCurrency } from "../utils/formatCurrency";
import { getCurrentMonthRange } from "../utils/formatDate";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/ToastContainer";

export const ReportsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [dateFrom, setDateFrom] = useState<string | undefined>(
    getCurrentMonthRange().dateFrom,
  );
  const [dateTo, setDateTo] = useState<string | undefined>(
    getCurrentMonthRange().dateTo,
  );
  const [categoryType, setCategoryType] = useState<"INCOME" | "EXPENSE">(
    "EXPENSE",
  );
  const [groupBy, setGroupBy] = useState<"day" | "week" | "month">("month");
  const [balance, setBalance] = useState<BalanceReport | null>(null);
  const [categoryReport, setCategoryReport] = useState<CategoryReport[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [topExpenses, setTopExpenses] = useState<CategoryReport[]>([]);

  useEffect(() => {
    loadAll();
  }, [dateFrom, dateTo]);

  useEffect(() => {
    reportsService
      .getCategoryReport(categoryType, dateFrom, dateTo)
      .then(setCategoryReport)
      .catch(() => {});
  }, [categoryType, dateFrom, dateTo]);

  useEffect(() => {
    reportsService
      .getTimeline(groupBy, dateFrom, dateTo)
      .then(setTimeline)
      .catch(() => {});
  }, [groupBy, dateFrom, dateTo]);

  const loadAll = async () => {
    try {
      const [bal, top] = await Promise.all([
        reportsService.getBalance(dateFrom, dateTo),
        reportsService.getTopExpenses(10, dateFrom, dateTo),
      ]);
      setBalance(bal);
      setTopExpenses(top);
    } catch {
      addToast("Помилка завантаження", "error");
    }
  };

  const handlePeriodChange = (from?: string, to?: string) => {
    setDateFrom(from);
    setDateTo(to);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-neon-yellow text-glow-yellow">
          Звіти та аналітика
        </h1>

        <PeriodSelector
          dateFrom={dateFrom}
          dateTo={dateTo}
          onChange={handlePeriodChange}
        />

        {balance && <BalanceCard report={balance} />}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="cyber-hover">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-neon-cyan">
                Структура по категоріях
              </h2>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant={categoryType === "EXPENSE" ? "primary" : "secondary"}
                  onClick={() => setCategoryType("EXPENSE")}
                >
                  Витрати
                </Button>
                <Button
                  size="sm"
                  variant={categoryType === "INCOME" ? "primary" : "secondary"}
                  onClick={() => setCategoryType("INCOME")}
                >
                  Доходи
                </Button>
              </div>
            </div>
            <CategoryChart
              data={categoryReport}
              title={categoryType === "EXPENSE" ? "Витрати" : "Доходи"}
            />
          </Card>

          <Card className="cyber-hover">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-neon-cyan">
                Топ витрат
              </h2>
            </div>
            {topExpenses.length === 0 ? (
              <p className="text-muted-foreground text-sm">Немає даних</p>
            ) : (
              <div className="space-y-3">
                {topExpenses.map((item, i) => (
                  <div
                    key={item.categoryId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm w-5">
                        {i + 1}.
                      </span>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="font-bold text-sm font-mono text-neon-pink">
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="cyber-hover">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-neon-cyan">
              Динаміка доходів та витрат
            </h2>
            <Select
              value={groupBy}
              onChange={(e) =>
                setGroupBy(e.target.value as "day" | "week" | "month")
              }
              options={[
                { value: "day", label: "По днях" },
                { value: "week", label: "По тижнях" },
                { value: "month", label: "По місяцях" },
              ]}
              className="w-36"
            />
          </div>
          <TimelineChart data={timeline} />
        </Card>

        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Layout>
  );
};
