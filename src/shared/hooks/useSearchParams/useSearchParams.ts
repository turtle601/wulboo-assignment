import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { getQueryString } from '~/src/shared/utils/request/queryString';

export const useCustomSearchParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getSearchParams = useCallback(
    (key: string): string | undefined => {
      return searchParams?.get(key) ?? undefined;
    },
    [searchParams]
  );

  const getAllSearchParams = useCallback(() => {
    if (!searchParams) return {};

    return [...searchParams.entries()].reduce<Record<string, string>>(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {}
    );
  }, [searchParams]);

  const setSearchParams = (params: {
    [key: string]: string | undefined | null;
  }) => {
    router.push(
      `${pathname}?${getQueryString({
        ...getAllSearchParams(),
        ...params,
      })}`
    );
  };

  return {
    getSearchParams,
    getAllSearchParams,
    setSearchParams,
  };
};
