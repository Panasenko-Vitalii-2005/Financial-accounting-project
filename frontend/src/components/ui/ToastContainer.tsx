import React from 'react';
import { clsx } from 'clsx';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Toast } from '../../hooks/useToast';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg text-white min-w-[280px]',
            toast.type === 'success' && 'bg-green-600',
            toast.type === 'error' && 'bg-red-600',
            toast.type === 'info' && 'bg-blue-600',
          )}
        >
          {toast.type === 'success' && <CheckCircle className="h-5 w-5 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="h-5 w-5 shrink-0" />}
          {toast.type === 'info' && <Info className="h-5 w-5 shrink-0" />}
          <span className="flex-1 text-sm">{toast.message}</span>
          <button onClick={() => onRemove(toast.id)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
