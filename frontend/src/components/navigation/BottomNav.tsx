'use client';

// src/components/navigation/BottomNav.tsx
// Persistent five-tab bottom navigation bar.
// Positioned in the thumb-friendly bottom zone with safe-area support.
// Active state is derived from the current pathname via usePathname().
//
// Tabs (in order, left-to-right):
//   Home → /
//   Reading → /reading
//   Prayer → /prayer
//   Community → /community
//   About → /about

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Hand, Users, Info } from 'lucide-react';
import { cn } from '@/lib/cn';

interface NavTab {
  label: string;
  href: string;
  icon: React.ElementType;
  /** Routes that count as active for this tab */
  match: string[];
}

const TABS: NavTab[] = [
  { label: 'Home', href: '/', icon: Home, match: ['/'] },
  { label: 'Reading', href: '/reading', icon: BookOpen, match: ['/reading'] },
  { label: 'Prayer', href: '/prayer', icon: Hand, match: ['/prayer'] },
  { label: 'Community', href: '/community', icon: Users, match: ['/community'] },
  { label: 'About', href: '/about', icon: Info, match: ['/about'] },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30',
        'flex items-stretch justify-around',
        'bg-brand-muted/95 backdrop-blur-md',
        'border-t border-white/10',
        'pb-[env(safe-area-inset-bottom)]',
        'h-[calc(4rem+env(safe-area-inset-bottom))]'
      )}
    >
      {TABS.map((tab) => {
        const isActive = tab.match.some((route) =>
          route === '/' ? pathname === '/' : pathname.startsWith(route)
        );
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1',
              'min-h-touch min-w-touch',
              'transition-colors duration-150',
              isActive
                ? 'text-brand-accent'
                : 'text-white/50 hover:text-white/80'
            )}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.75}
              aria-hidden="true"
            />
            <span
              className={cn(
                'text-[10px] font-medium leading-none',
                isActive ? 'opacity-100' : 'opacity-70'
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
