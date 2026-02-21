'use client';

// src/components/ui/BottomSheet.tsx
// Animated bottom sheet using Framer Motion.
// Slides up from the bottom of the screen with a backdrop overlay.
// Used for share flows and contextual overlays (mocked in Phase 2).

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface BottomSheetProps {
  /** Whether the sheet is visible */
  isOpen: boolean;
  /** Callback to close the sheet */
  onClose: () => void;
  /** Sheet title displayed in the drag handle region */
  title?: string;
  /** Sheet content */
  children: React.ReactNode;
  /** Additional class names for the sheet panel */
  className?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  className,
}: BottomSheetProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet panel */}
          <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-50',
              'bg-brand-muted rounded-t-2xl',
              'pb-[env(safe-area-inset-bottom)]',
              'max-h-[90dvh] overflow-y-auto',
              className
            )}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Drag handle indicator */}
            <div className="flex items-center justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <h2 className="text-base font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="min-h-touch min-w-touch flex items-center justify-center rounded-full text-white/60 hover:text-white"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-5 py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
