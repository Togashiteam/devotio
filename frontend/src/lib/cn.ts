// src/lib/cn.ts
// Utility for merging Tailwind class names with conflict resolution.
// Combines clsx (conditional class toggling) with tailwind-merge
// (deduplication of conflicting Tailwind utilities).
//
// Usage:
//   cn('px-4 py-2', isActive && 'bg-brand-accent', 'text-white')

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
