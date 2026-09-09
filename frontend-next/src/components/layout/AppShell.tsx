'use client';

import { useServerHealth } from '@/hooks/useServerHealth';
import ServerWarmupModal from '@/components/common/ServerWarmupModal';
import RenderWakeupBanner from '@/components/common/RenderWakeupBanner';
import DemoModeBanner from '@/components/layout/DemoModeBanner';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  const health = useServerHealth();

  return (
    <>
      <Sidebar />
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden pb-14 lg:pb-0">
        <DemoModeBanner />
        <RenderWakeupBanner health={health} />
        <div className="flex-1 overflow-y-auto min-h-0">
          {children}
        </div>
      </main>
      <BottomNav />
      <ServerWarmupModal health={health} />
    </>
  );
}
