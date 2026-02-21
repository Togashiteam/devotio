import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { LayoutShell } from '@/components/navigation/LayoutShell';

export const metadata: Metadata = {
  title: 'Devotio',
  description: 'Your daily space for Scripture, Prayer, and Community',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Devotio',
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand text-white font-sans antialiased">
        {/* Skip-to-content link for keyboard/screen-reader users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded-lg focus:bg-brand-accent focus:text-white focus:text-sm font-medium"
        >
          Skip to content
        </a>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
