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

  return {
    getAllSearchParams,
    filterParams: getSearchParams('filter') ?? 'createdAtSortBy',
    filterClassesSortBy,
  };
};
