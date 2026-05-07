import api from './api';
import { BalanceReport, CategoryReport, TimelineEntry, DetailedReport } from '../types/report';

export const reportsService = {
  async getBalance(dateFrom?: string, dateTo?: string): Promise<BalanceReport> {
    const { data } = await api.get<BalanceReport>('/reports/balance', {
      params: { dateFrom, dateTo },
    });
    return data;
  },

  async getCategoryReport(
    type: 'INCOME' | 'EXPENSE',
    dateFrom?: string,
    dateTo?: string,
  ): Promise<CategoryReport[]> {
    const { data } = await api.get<CategoryReport[]>('/reports/categories', {
      params: { type, dateFrom, dateTo },
    });
    return data;
  },

  async getTimeline(
    groupBy: 'day' | 'week' | 'month',
    dateFrom?: string,
    dateTo?: string,
  ): Promise<TimelineEntry[]> {
    const { data } = await api.get<TimelineEntry[]>('/reports/timeline', {
      params: { groupBy, dateFrom, dateTo },
    });
    return data;
  },

  async getTopExpenses(
    limit: number,
    dateFrom?: string,
    dateTo?: string,
  ): Promise<CategoryReport[]> {
    const { data } = await api.get<CategoryReport[]>('/reports/top-expenses', {
      params: { limit, dateFrom, dateTo },
    });
    return data;
  },

  async getDetailedReport(dateFrom?: string, dateTo?: string): Promise<DetailedReport> {
    const { data } = await api.get<DetailedReport>('/reports/detailed', {
      params: { dateFrom, dateTo },
    });
    return data;
  },
};
