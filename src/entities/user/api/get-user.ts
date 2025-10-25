import { useQuery } from '@tanstack/react-query';
import { userQueries } from '~/src/entities/user/api/user.query';
import { createClientRequestOptions } from '~/src/shared/api';

export const useGetUser = () => {
  return useQuery({
    ...userQueries.user(
      createClientRequestOptions({
        method: 'GET',
        credentials: 'include',
      })
    ),
  });
};
