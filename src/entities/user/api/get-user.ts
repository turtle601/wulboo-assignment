import { useQuery } from '@tanstack/react-query';
import { userQueries } from '~/src/entities/user/api/user.query';

export const useGetUser = () => {
  return useQuery({
    ...userQueries.user(),
  });
};
