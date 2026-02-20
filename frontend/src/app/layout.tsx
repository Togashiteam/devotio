import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';

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
        {/* BottomNav wired in Phase 2 T017/T018 */}
        <main className="min-h-screen pb-[calc(4rem+env(safe-area-inset-bottom))]">
          {children}
        </main>
      </body>
    </html>
  );
}
