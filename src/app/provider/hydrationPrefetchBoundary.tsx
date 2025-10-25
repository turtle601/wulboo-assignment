/* eslint-disable @typescript-eslint/no-explicit-any */
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import type {
  QueryKey,
  DefaultError,
  FetchQueryOptions,
  FetchInfiniteQueryOptions,
} from '@tanstack/react-query';
import { getQueryClient } from '~/src/shared/lib/tanstack-query';

export type AnyFetchQueryOptions =
  | FetchQueryOptions<any, DefaultError, any, any> // QueryKey를 any로 변경
  | FetchInfiniteQueryOptions<any, DefaultError, any, any, any>; // QueryKey를 any로 변

// 타입가드 함수들
function isInfiniteQueryOptions(
  option: AnyFetchQueryOptions
): option is FetchInfiniteQueryOptions<any, DefaultError, any, QueryKey, any> {
  return 'initialPageParam' in option && 'getNextPageParam' in option;
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

      return queryClient.prefetchQuery(option);
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
