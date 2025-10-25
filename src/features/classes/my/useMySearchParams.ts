import { useCustomSearchParams } from '~/src/shared/hooks/useSearchParams';

export const useMySearchParams = () => {
  const { setSearchParams, getSearchParams } = useCustomSearchParams();

  return { tabSearchParams: getSearchParams('tab') ?? '0', setSearchParams };
};
