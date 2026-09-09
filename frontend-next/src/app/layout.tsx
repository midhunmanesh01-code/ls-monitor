import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import DemoModeBanner from '@/components/layout/DemoModeBanner';

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
      <body className="h-full flex bg-slate-950 text-slate-100 antialiased">
        <Sidebar />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden lg:ml-0">
          <DemoModeBanner />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
