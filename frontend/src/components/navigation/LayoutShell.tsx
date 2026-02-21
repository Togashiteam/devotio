'use client';

// src/components/navigation/LayoutShell.tsx
// Client-side layout shell that owns BottomNav and AnimatePresence.
// Kept in a separate 'use client' component so layout.tsx can remain a
// server component (required for Next.js Metadata export).

import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { BottomNav } from './BottomNav';

export interface LayoutShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const pathname = usePathname();

  return (
    <>
      <BottomNav />
      <main
        className="min-h-screen pb-[calc(4rem+env(safe-area-inset-bottom))]"
        id="main-content"
      >
        {/* AnimatePresence keyed by pathname enables cross-page transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <div key={pathname}>{children}</div>
        </AnimatePresence>
      </main>
    </>
  );
}
