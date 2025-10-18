'use client';

import { ReactNode } from 'react';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/src/shared/lib/tanstack-query';

interface IQueryClientProviderProps {
  children: ReactNode;
}

export function QueryClientProvider({ children }: IQueryClientProviderProps) {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
}
