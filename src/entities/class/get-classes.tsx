import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ClassListParams,
  classQueries,
} from '~/src/entities/class/class.query';

export const useGetInfiniteClasses = (params: ClassListParams) => {
  return useInfiniteQuery({
    ...classQueries.list(params),
  });
};
