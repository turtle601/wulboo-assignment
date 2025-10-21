import { useQuery } from '@tanstack/react-query';
import { classQueries } from '~/src/entities/class/class.query';

export const useGetMyCreatedClasses = () => {
  return useQuery({
    ...classQueries.myCreatedList(),
  });
};
