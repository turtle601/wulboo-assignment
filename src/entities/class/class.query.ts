import {
  InfiniteData,
  QueryKey,
  infiniteQueryOptions as tanstackInfiniteQueryOptions,
  queryOptions as tsqQueryOptions,
} from '@tanstack/react-query';
import { ClassListType } from '~/server/mocks/storage';

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

export const CLASS_LIST_LIMIT = '7' as const;
export const INITIAL_CURSOR = '' as const;

export const classQueries = {
  keys: () => ['classes'],

  lists: () => [...classQueries.keys()],
  enroll: () => [...classQueries.keys(), 'enroll'],
  created: () => [...classQueries.keys(), 'myCreated'],

  list: (params: Record<string, string>, options: RequestInit) => {
    return tanstackInfiniteQueryOptions<
      ClassListResponse,
      Error,
      InfiniteData<ClassListResponse>,
      QueryKey,
      { cursor?: string; limit?: string }
    >({
      queryKey: [
        ...classQueries.lists(),
        {
          ...params,
          cursor: params.cursor || INITIAL_CURSOR,
          limit: params.limit || CLASS_LIST_LIMIT,
        },
      ],
      queryFn: async ({ pageParam }) => {
        return await requestAPI<ClassListResponse>({
          url: '/classes',
          params: new URLSearchParams({
            ...params,
            ...(pageParam?.cursor && { cursor: pageParam.cursor }),
            limit: CLASS_LIST_LIMIT,
          }),
          options,
        });
      },
      initialPageParam: { cursor: INITIAL_CURSOR },
      getNextPageParam: (lastPage: ClassListResponse) => {
        return lastPage.hasMore ? { cursor: lastPage.nextCursor } : undefined;
      },
    });
  },

  myEnrolledList: (options: RequestInit) => {
    return tsqQueryOptions({
      queryKey: [...classQueries.keys(), ...classQueries.enroll()],
      queryFn: async () => {
        return await requestAPI<ClassListType>({
          url: '/classes/enroll',
          options: {
            method: 'GET',
            ...options,
          },
        });
      },
    });
  },

  myCreatedList: (options: RequestInit) => {
    return tsqQueryOptions({
      queryKey: [...classQueries.keys(), ...classQueries.created()],
      queryFn: async () => {
        return await requestAPI<ClassListType | { message: string }>({
          url: '/classes/myCreated',
          options: {
            method: 'GET',
            ...options,
          },
        });
      },
    });
  },
};
