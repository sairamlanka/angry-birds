import type { Metadata, Viewport } from 'next';
import { Anton, Inter } from 'next/font/google';
import { CartProvider } from '@/components/CartProvider';
import './globals.css';

const display = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Angry Birds — Smash Burgers',
  description: 'Big flavor. Zero compromise. Order smash burgers, sides and shakes online.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0907',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-ink font-body text-cream antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
