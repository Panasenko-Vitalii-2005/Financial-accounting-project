import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Wallet } from 'lucide-react';

export const RegisterPage: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-muted/30">
    <div className="w-full max-w-md rounded-xl bg-card p-8 shadow-lg">
      <div className="mb-6 flex flex-col items-center">
        <Wallet className="mb-2 h-10 w-10 text-primary" />
        <h1 className="text-2xl font-bold">Мій бюджет</h1>
        <p className="text-sm text-muted-foreground">Створіть акаунт</p>
      </div>
      <RegisterForm />
    </div>
  </div>
);
