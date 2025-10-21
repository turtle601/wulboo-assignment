import {
  infiniteQueryOptions as tanstackInfiniteQueryOptions,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';
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

  lists: () => [...classQueries.keys()],
  enroll: () => [...classQueries.keys(), 'enroll'],
  created: () => [...classQueries.keys(), 'myCreated'],

  list: (params: Record<string, string>) => {
    return tanstackInfiniteQueryOptions({
      queryKey: [...classQueries.lists(), { ...params }],
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
      initialPageParam: { cursor: '' },
      getNextPageParam: (lastPage: ClassListResponse) => {
        return lastPage.hasMore ? { cursor: lastPage.nextCursor } : undefined;
      },
    });
  },

  myEnrolledList: () => {
    return tsqQueryOptions({
      queryKey: [...classQueries.enroll()],
      queryFn: async () => {
        return await requestAPI<ClassListType>({
          url: '/classes/enroll',
          options: {
            method: 'GET',
            credentials: 'include',
          },
        });
      },
    });
  },

  myCreatedList: () => {
    return tsqQueryOptions({
      queryKey: [...classQueries.created()],
      queryFn: async () => {
        return await requestAPI<ClassListType | { message: string }>({
          url: '/classes/myCreated',
          options: {
            method: 'GET',
            credentials: 'include',
          },
        });
      },
    });
  },
};
