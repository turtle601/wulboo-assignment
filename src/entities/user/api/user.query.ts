import { queryOptions as tanstackQueryOptions } from '@tanstack/react-query';
import { UserType } from '~/server/mocks/storage';

import { requestAPI } from '~/src/shared/api/request';

export const userQueries = {
  keys: () => ['user'],
  user: () => {
    return tanstackQueryOptions<UserType>({
      queryKey: [...userQueries.keys()],
      queryFn: async () => {
        return await requestAPI({
          url: '/user',
          options: {
            method: 'GET',
            credentials: 'include',
          },
        });
      },
    });
  },
} as const;
