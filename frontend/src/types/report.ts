export interface BalanceReport {
  income: number;
  expense: number;
  balance: number;
}

export interface CategoryReport {
  categoryId: number;
  name: string;
  total: number;
}

export interface TimelineEntry {
  label: string;
  income: number;
  expense: number;
}

export interface DetailedReport extends BalanceReport {
  transactions: any[];
}
