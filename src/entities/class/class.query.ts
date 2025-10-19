import { infiniteQueryOptions as tanstackInfiniteQueryOptions } from '@tanstack/react-query';
import { ClassListType } from '~/src/mocks/storage';
import { requestAPI } from '~/src/shared/api/request';

export interface ClassListParams {
  createdAtSortBy?: string;
  enrollCountSortBy?: string;
  enrollRatioSortBy?: string;
}

export interface ClassListResponse {
  hasMore: boolean;
  nextCursor: string;
  classes: ClassListType;
}

export const classQueries = {
  keys: () => ['classes'],
  lists: (params: ClassListParams) => [...classQueries.keys(), { ...params }],
  list: (params: ClassListParams) => {
    return tanstackInfiniteQueryOptions({
      queryKey: [...classQueries.lists(params)],
      queryFn: async ({ pageParam }) => {
        return await requestAPI<ClassListResponse>({
          url: '/classList',
          params: new URLSearchParams({
            ...params,
            ...(pageParam?.cursor && { cursor: pageParam.cursor }),
            limit: '7',
          }),
          options: {
            method: 'GET',
          },
        });
      },
      initialPageParam: { cursor: '1' },
      getNextPageParam: (lastPage: ClassListResponse) => {
        return lastPage.hasMore ? { cursor: lastPage.nextCursor } : undefined;
      },
    });
  },
};
