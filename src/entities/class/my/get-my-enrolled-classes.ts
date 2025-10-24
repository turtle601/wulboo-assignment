import { useSuspenseQuery } from '@tanstack/react-query';
import { classQueries } from '~/src/entities/class/class.query';
import { createClientRequestOptions } from '~/src/shared/api';

export const useGetMyEnrolledClasses = () => {
  return useSuspenseQuery({
    ...classQueries.myEnrolledList(
      createClientRequestOptions({
        credentials: 'include',
      })
    ),
  });
};
