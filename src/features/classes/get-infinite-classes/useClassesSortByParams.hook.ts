import { useCustomSearchParams } from '~/src/shared/hooks/useSearchParams';

export type ClassesSortByType =
  | 'createdAtSortBy'
  | 'enrollCountSortBy'
  | 'enrollRatioSortBy';

export const useClassesSortByParams = () => {
  const { getSearchParams, setSearchParams, getAllSearchParams } =
    useCustomSearchParams();

  const filterClassesSortBy = (value: ClassesSortByType) => {
    setSearchParams({
      filter: value,
    });
  };

  const getDefaultClassesSearchParams = () => {
    const params = getAllSearchParams();
    return Object.keys(params).length === 0
      ? { filter: 'createdAtSortBy' }
      : params;
  };

  return {
    getDefaultClassesSearchParams,
    filterParams: getSearchParams('filter') ?? 'createdAtSortBy',
    filterClassesSortBy,
  };
};
