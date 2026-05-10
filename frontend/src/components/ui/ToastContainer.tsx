import React from "react";
import { clsx } from "clsx";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Toast } from "../../hooks/useToast";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "flex items-center gap-3 px-4 py-3 min-w-[280px] border font-mono text-sm uppercase tracking-wide relative cp-border before:pointer-events-none after:pointer-events-none",
            toast.type === "success" &&
              "bg-card border-neon-cyan text-neon-cyan shadow-neon-cyan",
            toast.type === "error" &&
              "bg-card border-neon-pink text-neon-pink shadow-neon-pink",
            toast.type === "info" &&
              "bg-card border-neon-yellow text-neon-yellow shadow-neon-yellow",
          )}
        >
          {toast.type === "success" && (
            <CheckCircle className="h-5 w-5 shrink-0" />
          )}
          {toast.type === "error" && (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          {toast.type === "info" && <Info className="h-5 w-5 shrink-0" />}
          <span className="flex-1 text-sm">{toast.message}</span>
          <button onClick={() => onRemove(toast.id)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
