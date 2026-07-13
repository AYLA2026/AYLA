// ============================================================
// AYLA TOAST COMPONENT
// إشعار منبثق
// ============================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const typeStyles: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: {
    bg: 'bg-[rgba(34,197,94,0.15)]',
    border: 'border-[rgba(34,197,94,0.4)]',
    icon: 'text-[#22c55e]',
  },
  error: {
    bg: 'bg-[rgba(239,68,68,0.15)]',
    border: 'border-[rgba(239,68,68,0.4)]',
    icon: 'text-[#ef4444]',
  },
  warning: {
    bg: 'bg-[rgba(245,158,11,0.15)]',
    border: 'border-[rgba(245,158,11,0.4)]',
    icon: 'text-[#f59e0b]',
  },
  info: {
    bg: 'bg-[rgba(59,130,246,0.15)]',
    border: 'border-[rgba(59,130,246,0.4)]',
    icon: 'text-[#3b82f6]',
  },
};

const icons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const styles = typeStyles[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className={`
        flex items-start gap-3 p-4 rounded-xl
        border ${styles.bg} ${styles.border}
        shadow-[0_10px_40px_rgba(0,0,0,0.5)]
        min-w-[320px] max-w-[400px]
      `}
    >
      <div className={styles.icon}>{icons[type]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#f5f0e8] text-sm">{title}</p>
        {message && <p className="mt-1 text-[#a89b8c] text-sm">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-[#7a6b5c] hover:text-[#f5f0e8] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

Toast.displayName = 'AylaToast';
export default Toast;
