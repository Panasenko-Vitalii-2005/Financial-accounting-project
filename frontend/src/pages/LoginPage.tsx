import React from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { Wallet } from "lucide-react";

export const LoginPage: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
    {/* Background grid lines */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
    {/* Neon horizontal lines */}
    <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-30" />
    <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-yellow to-transparent opacity-20" />

    <div className="relative w-full max-w-md">
      {/* Corner accents */}
      <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neon-yellow" />
      <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-neon-cyan" />
      <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-neon-cyan" />
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neon-yellow" />

      <div className="bg-card border border-border p-8">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="p-3 border border-neon-yellow shadow-neon-yellow">
            <Wallet className="h-8 w-8 text-neon-yellow drop-shadow-[0_0_8px_#ffe600]" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-neon-yellow text-glow-yellow">
            Мій бюджет
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            // авторизація системи //
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
);
