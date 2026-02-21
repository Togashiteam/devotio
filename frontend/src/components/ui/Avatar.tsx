// src/components/ui/Avatar.tsx
// User avatar component with image support and initials fallback.
// Sizes follow the 44×44 px minimum touch target rule (WCAG 2.5.5).

import Image from 'next/image';
import { cn } from '@/lib/cn';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** URL of the avatar image */
  src?: string | null;
  /** Display name used to generate initials fallback */
  name?: string;
  /** Visual size preset. Default: 'md' */
  size?: AvatarSize;
  /** Additional class names */
  className?: string;
  /** Accessible label. Defaults to name if provided. */
  alt?: string;
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
};

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 32,
  md: 44,
  lg: 56,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 'md',
  className,
  alt,
}: AvatarProps) {
  const px = SIZE_PX[size];
  const label = alt ?? name ?? 'Avatar';
  const initials = name ? getInitials(name) : '?';

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden shrink-0',
        'bg-brand-accent/30 flex items-center justify-center',
        SIZE_CLASSES[size],
        className
      )}
      aria-label={label}
      role="img"
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          width={px}
          height={px}
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="font-semibold text-white/90 select-none">{initials}</span>
      )}
    </div>
  );
}
