import { useQuery } from '@tanstack/react-query';
import { classQueries } from '~/src/entities/class/class.query';

export const useGetMyEnrolledClasses = () => {
  return useQuery({
    ...classQueries.myEnrolledList(),
  });
};
