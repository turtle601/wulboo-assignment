import { queryOptions as tanstackQueryOptions } from '@tanstack/react-query';
import { UserType } from '~/src/mocks/storage';

import { requestAPI } from '~/src/shared/api/request';

export const userQueries = {
  keys: () => ['user'],
  user: () => {
    return tanstackQueryOptions({
      queryKey: [...userQueries.keys()],
      queryFn: async () => {
        return await requestAPI<UserType>({
          url: '/user',
          options: {
            method: 'GET',
            credentials: 'include',
          },
        });
      },
    });
  },
};
