import type { Metadata } from 'next';
import { Noto_Sans_Arabic, Inter } from 'next/font/google';
import { AylaProvider } from '@ayla/ui-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-english',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ayla Platform',
  description: 'Ayla Digital Solutions - Smart Platform',
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 3,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body
        className={`${notoSansArabic.variable} ${inter.variable} font-arabic antialiased`}
        style={{
          backgroundColor: '#1a0f0a',
          color: '#f5f0e8',
          minHeight: '100vh',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AylaProvider platformId="PLATFORM_ID_HERE">
            {children}
          </AylaProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
