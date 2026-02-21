'use client';

// src/components/ui/PageTransition.tsx
// Framer Motion wrapper that provides a smooth fade + slide-in page transition.
// Wrap the content of each page route with this component for native-like UX.
//
// Usage:
//   export default function ReadingPage() {
//     return <PageTransition><YourContent /></PageTransition>;
//   }

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const variants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn('min-h-screen', className)}
    >
      {children}
    </motion.div>
  );
}
