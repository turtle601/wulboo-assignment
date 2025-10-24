import { useSuspenseQuery } from '@tanstack/react-query';

import { classQueries } from '~/src/entities/class/class.query';
import { createClientRequestOptions } from '~/src/shared/api';

export const useGetMyCreatedClasses = () => {
  return useSuspenseQuery({
    ...classQueries.myCreatedList(
      createClientRequestOptions({
        credentials: 'include',
      })
    ),
  });
};
