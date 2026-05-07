import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Wallet } from 'lucide-react';

export const LoginPage: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted/30">
    <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-lg">
      <div className="mb-6 flex flex-col items-center">
        <Wallet className="mb-2 h-10 w-10 text-primary" />
        <h1 className="text-2xl font-bold">Мій бюджет</h1>
        <p className="text-sm text-muted-foreground">Увійдіть у свій акаунт</p>
      </div>
      <LoginForm />
    </div>
  </div>
);
