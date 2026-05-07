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
      <aside className="w-64 flex-shrink-0 border-r bg-card">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Мій бюджет</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 border-t p-4">
          <div className="mb-2 text-sm font-medium">{user?.username}</div>
          <div className="mb-3 text-xs text-muted-foreground truncate">
            {user?.email}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
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
