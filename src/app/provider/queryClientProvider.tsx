'use client';

import { ReactNode } from 'react';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '~/src/shared/lib/tanstack-query';

interface IQueryClientProviderProps {
  children: ReactNode;
}

export function QueryClientProvider({ children }: IQueryClientProviderProps) {
  const queryClient = getQueryClient();

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </TanStackQueryClientProvider>
  );
}
