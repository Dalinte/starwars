import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/configs';
import type { ReactNode } from 'react';
import { SideDrawerManager } from '@/components/SlideDrawer/SideDrawerManager';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SideDrawerManager />
      {children}
    </QueryClientProvider>
  );
};
