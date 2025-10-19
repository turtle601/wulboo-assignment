import { API_BASE_URL } from '~/src/shared/api/constant';

interface ReqParams {
  url: string;
  params?: URLSearchParams;
  options?: RequestInit;
}

export const requestAPI = <T>({
  url,
  params,
  options,
}: ReqParams): Promise<T> => {
  const fullUrl = params
    ? `${API_BASE_URL}${url}?${params.toString()}`
    : `${API_BASE_URL}${url}`;

  return new Promise((resolve, reject) => {
    fetch(fullUrl, options)
      .then((response) => {
        if (!response.ok) {
          reject('API 요청 에러 발생');
        }

        return response.json();
      })
      .then((data: T) => resolve(data))
      .catch((error) => {
        reject('네트워크 에러 발생');
      });
  });
};
