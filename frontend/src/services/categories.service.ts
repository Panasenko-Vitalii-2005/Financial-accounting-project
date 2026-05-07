import api from './api';
import { Category } from '../types/category';

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  },

  async create(name: string, type: 'INCOME' | 'EXPENSE'): Promise<Category> {
    const { data } = await api.post<Category>('/categories', { name, type });
    return data;
  },

  async update(id: number, name: string): Promise<Category> {
    const { data } = await api.patch<Category>(`/categories/${id}`, { name });
    return data;
  },

  async delete(id: number, transferToId?: number): Promise<void> {
    const params = transferToId ? { transferToId } : {};
    await api.delete(`/categories/${id}`, { params });
  },
};
