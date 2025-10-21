import { useCustomSearchParams } from '~/src/shared/hooks/useSearchParams';

export type ClassesSortByType =
  | 'createdAtSortBy'
  | 'enrollCountSortBy'
  | 'enrollRatioSortBy';

export const useClassesSortByParams = () => {
  const { getSearchParams, setSearchParams } = useCustomSearchParams();

  const filterClassesSortBy = (value: ClassesSortByType) => {
    setSearchParams({
      filter: value,
    });
  };

  const getClassesSortBy = () => {
    return getSearchParams('filter') ?? 'createdAtSortBy';
  };

  return {
    filterClassesSortBy,
    getClassesSortBy,
  };
};
