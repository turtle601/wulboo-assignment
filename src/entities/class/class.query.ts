import { queryOptions as tanstackQueryOptions } from '@tanstack/react-query';
import { requestAPI } from '~/src/shared/api/request';

interface ClassListParams {
  createdAtSortBy?: string;
  enrollCountSortBy?: string;
  enrollRatioSortBy?: string;
}

export const classQueries = {
  keys: () => ['class'],
  lists: () => [...classQueries.keys(), 'list'],
  list: (params: ClassListParams) => {
    return tanstackQueryOptions({
      queryKey: [...classQueries.lists(), params],
      queryFn: async () => {
        return await requestAPI({
          url: '/classList',
          ...params,
        });
      },
    });
  },
};
