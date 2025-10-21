import { useInfiniteQuery } from '@tanstack/react-query';
import { classQueries } from '~/src/entities/class/class.query';

export const useGetInfiniteClasses = (params: Record<string, string>) => {
  return useInfiniteQuery({
    ...classQueries.list(params),
  });
};
