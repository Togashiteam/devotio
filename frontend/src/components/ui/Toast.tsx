'use client';

// src/components/ui/Toast.tsx
// Lightweight toast notification with auto-dismiss.
// Slide-in from bottom via Framer Motion.

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastProps {
  /** Whether the toast is visible */
  isOpen: boolean;
  /** Message to display */
  message: string;
  /** Visual variant */
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. Set to 0 to disable auto-dismiss. Default: 3000 */
  duration?: number;
  /** Callback when toast is dismissed */
  onClose: () => void;
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'bg-green-700 text-white',
  error: 'bg-brand-accent text-white',
  info: 'bg-brand-muted border border-white/20 text-white',
};

const VARIANT_ICONS: Record<ToastVariant, React.ElementType> = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

export function Toast({
  isOpen,
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen || duration === 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const Icon = VARIANT_ICONS[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="status"
          aria-live="polite"
          className={cn(
            'fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-4 right-4 z-50',
            'flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg',
            VARIANT_STYLES[variant]
          )}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <Icon size={18} className="shrink-0" aria-hidden="true" />
          <span className="flex-1 text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="shrink-0 min-h-touch min-w-touch flex items-center justify-center -mr-1 opacity-70 hover:opacity-100"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
