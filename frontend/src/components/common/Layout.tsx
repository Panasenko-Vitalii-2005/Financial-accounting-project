import React, { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tag,
  BarChart3,
  LogOut,
  Wallet,
} from "lucide-react";

const navLinks = [
  { to: "/", label: "Дашборд", icon: LayoutDashboard },
  { to: "/transactions", label: "Транзакції", icon: ArrowLeftRight },
  { to: "/categories", label: "Категорії", icon: Tag },
  { to: "/reports", label: "Звіти", icon: BarChart3 },
];

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 flex-shrink-0 border-r border-border bg-card flex flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-border px-6 relative">
          <div className="relative">
            <Wallet className="h-6 w-6 text-neon-yellow drop-shadow-[0_0_6px_#ffe600]" />
          </div>
          <span className="text-lg font-bold uppercase tracking-widest text-neon-yellow text-glow-yellow">
            Мій бюджет
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-yellow via-neon-cyan to-transparent opacity-60" />
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-200 cyber-hover border-2",
                location.pathname === to
                  ? "text-background bg-neon-yellow border-neon-yellow shadow-neon-sm-yellow hover:shadow-neon-yellow"
                  : "text-neon-cyan bg-transparent border-neon-cyan/40 shadow-neon-sm-cyan hover:text-neon-yellow hover:bg-neon-yellow/5 hover:border-neon-yellow hover:shadow-neon-sm-yellow",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-4 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-40" />
          <div className="mb-1 text-sm font-bold uppercase tracking-widest text-foreground">
            {user?.username}
          </div>
          <div className="mb-3 text-xs text-muted-foreground font-mono truncate">
            {user?.email}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neon-cyan border border-neon-cyan/40 rounded px-2 py-1 hover:text-neon-pink hover:border-neon-pink/60 hover:shadow-neon-sm-pink transition-all"
          >
            <LogOut className="h-4 w-4" />
            Вийти
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl p-6">{children}</div>
      </main>
    </div>
  );
};
