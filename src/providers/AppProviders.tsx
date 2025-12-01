import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/configs/queryClient.ts';
import type { ReactNode } from 'react';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
