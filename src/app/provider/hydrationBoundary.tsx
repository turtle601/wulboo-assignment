/* eslint-disable @typescript-eslint/no-explicit-any */
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import type {
  QueryKey,
  DefaultError,
  FetchQueryOptions,
  FetchInfiniteQueryOptions,
} from '@tanstack/react-query';
import { getQueryClient } from '~/src/shared/lib/tanstack-query';

type AnyFetchQueryOptions =
  | FetchQueryOptions<any, DefaultError, any, QueryKey>
  | FetchInfiniteQueryOptions<any, DefaultError, any, QueryKey, any>;

// 타입가드 함수들
function isInfiniteQueryOptions(
  option: AnyFetchQueryOptions
): option is FetchInfiniteQueryOptions<any, DefaultError, any, QueryKey, any> {
  return 'initialPageParam' in option && 'getNextPageParam' in option;
}

function isRegularQueryOptions(
  option: AnyFetchQueryOptions
): option is FetchQueryOptions<any, DefaultError, any, QueryKey> {
  return !isInfiniteQueryOptions(option);
}

export async function HydrationPrefetchBoundary({
  fetchQueryOptions,
  children,
}: {
  fetchQueryOptions: AnyFetchQueryOptions[];
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await Promise.all(
    fetchQueryOptions.map((option) => {
      if (isInfiniteQueryOptions(option)) {
        return queryClient.prefetchInfiniteQuery(option);
      }

      if (isRegularQueryOptions(option)) {
        return queryClient.prefetchQuery(option);
      }

      return null;
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
