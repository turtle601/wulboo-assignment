'use client';

import { ReactNode } from 'react';
import {
  defaultShouldDehydrateQuery,
  MutationCache,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '~/src/shared/lib/tanstack-query';

import { useMutationErrorHandler } from '~/src/shared/hooks/useMutationErrorHandler';

import { HTTP401Error, HTTP403Error } from '~/src/shared/api';

const useMutationCacheHandler = () => {
  const mutationErrorHandler = useMutationErrorHandler();

  return new MutationCache({
    onError: mutationErrorHandler,
  });
};

export function QueryClientProvider({ children }: { children: ReactNode }) {
  const mutationCache = useMutationCacheHandler();

  const queryClient = getQueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
        retry: false,
        refetchOnWindowFocus: true,
        throwOnError: (error: Error) => {
          if (error instanceof HTTP401Error || error instanceof HTTP403Error) {
            return false;
          }

          return true;
        },
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
    mutationCache,
  });

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </TanStackQueryClientProvider>
  );
}
