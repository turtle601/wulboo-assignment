import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { classQueries } from '~/src/entities/class/class.query';
import { createClientRequestOptions } from '~/src/shared/api';

export const useGetInfiniteClasses = (params: Record<string, string>) => {
  return useSuspenseInfiniteQuery({
    ...classQueries.list(
      params,
      createClientRequestOptions({
        method: 'GET',
        credentials: 'include',
      })
    ),
  });
};
