// src/components/ui/EmptyState.tsx
// Reusable empty state component for page-level list placeholders.
// Shows an icon, heading, optional description, and optional action button.

import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface EmptyStateProps {
  /** Lucide icon component */
  icon?: LucideIcon;
  /** Primary heading text */
  heading: string;
  /** Optional supporting description */
  description?: string;
  /** Optional action button label */
  actionLabel?: string;
  /** Optional action button callback */
  onAction?: () => void;
  /** Additional container class names */
  className?: string;
}

export function EmptyState({
  icon: Icon,
  heading,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 py-16 px-6 text-center',
        className
      )}
      role="status"
      aria-label={heading}
    >
      {Icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5">
          <Icon size={32} className="text-white/40" aria-hidden="true" />
        </div>
      )}
      <div className="space-y-1">
        <p className="text-base font-semibold text-white/80">{heading}</p>
        {description && (
          <p className="text-sm text-white/50 max-w-xs mx-auto">{description}</p>
        )}
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={cn(
            'mt-2 rounded-xl px-5 py-2.5 text-sm font-semibold',
            'bg-brand-accent text-white',
            'min-h-touch min-w-touch',
            'hover:bg-brand-accent/90 active:scale-95 transition-transform'
          )}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
