import api from './api';
import { Transaction, TransactionFilters } from '../types/transaction';

export const transactionsService = {
  async getAll(filters?: TransactionFilters): Promise<Transaction[]> {
    const { data } = await api.get<Transaction[]>('/transactions', { params: filters });
    return data;
  },

  async create(payload: {
    amount: number;
    date: string;
    categoryId: number;
    description?: string;
  }): Promise<Transaction> {
    const { data } = await api.post<Transaction>('/transactions', payload);
    return data;
  },

  async update(
    id: number,
    payload: {
      amount?: number;
      date?: string;
      categoryId?: number;
      description?: string;
    },
  ): Promise<Transaction> {
    const { data } = await api.patch<Transaction>(`/transactions/${id}`, payload);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },

  getExportUrl(filters?: TransactionFilters): string {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.set(k, String(v));
      });
    }
    const token = localStorage.getItem('access_token');
    if (token) params.set('token', token);
    return `/api/transactions/export/csv?${params.toString()}`;
  },
};
