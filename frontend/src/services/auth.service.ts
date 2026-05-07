import api from './api';
import { AuthResponse } from '../types/user';

export const authService = {
  async register(email: string, username: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', { email, username, password });
    return data;
  },

  async login(emailOrUsername: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { emailOrUsername, password });
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/users/me');
    return data;
  },
};
