import { useCustomSearchParams } from '~/src/shared/hooks/useSearchParams';

export const useClassesSortByParams = () => {
  const { getSearchParams, getAllSearchParams, setSearchParams } =
    useCustomSearchParams();

  const toggleCreatedAtSortBy = () => {
    const params = getSearchParams('createdAtSortBy');

    setSearchParams({
      createdAtSortBy: params ? null : 'new',
    });
  };

  const toggleEnrollCountSortBy = () => {
    const params = getSearchParams('enrollCountSortBy');

    setSearchParams({
      enrollCountSortBy: params ? null : 'desc',
    });
  };

  const toggleEnrollRatioSortBy = () => {
    const params = getSearchParams('enrollRatioSortBy');

    setSearchParams({
      enrollRatioSortBy: params ? null : 'high',
    });
  };

  return {
    getAllSearchParams,
    toggleCreatedAtSortBy,
    toggleEnrollCountSortBy,
    toggleEnrollRatioSortBy,
  };
};
