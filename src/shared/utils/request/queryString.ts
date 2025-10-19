interface Params {
  [key: string]: string | undefined | null;
}

export const getQueryString = (params: Params) => {
  const result: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      result.push(`${key}=${value}`);
    }
  });

  return new URLSearchParams(result.join('&'));
};

export const getSearchParamsObject = (searchParams: URLSearchParams) => {
  return [...searchParams.entries()].reduce<Record<string, string>>(
    (acc, [key, value]) => {
      acc[key] = value;

      return acc;
    },
    {}
  );
};
