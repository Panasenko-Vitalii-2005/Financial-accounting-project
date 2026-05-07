import { Category } from './category';

export interface Transaction {
  id: number;
  amount: string | number;
  date: string;
  description?: string;
  userId: number;
  categoryId: number;
  category: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFilters {
  dateFrom?: string;
  dateTo?: string;
  categoryId?: number;
  type?: 'INCOME' | 'EXPENSE';
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'date' | 'amount';
  sortOrder?: 'asc' | 'desc';
}
