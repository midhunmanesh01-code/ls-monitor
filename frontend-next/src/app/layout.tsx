import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import DemoModeBanner from '@/components/layout/DemoModeBanner';
import BottomNav from '@/components/layout/BottomNav';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Landslide Monitor — Wayanad Pilot',
  description: 'AI-Assisted Early Warning & Risk Monitoring System for landslide-prone regions. Wayanad District pilot deployment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full flex flex-col lg:flex-row bg-slate-950 text-slate-100 antialiased overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden pb-14 lg:pb-0">
          <DemoModeBanner />
          <div className="flex-1 overflow-y-auto min-h-0">
            {children}
          </div>
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
