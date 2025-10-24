import {
  API_BASE_URL,
  FORBIDDEN_ERROR_MESSAGE,
  REQUEST_ERROR_MESSAGE,
  RUN_TIME_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  USER_EXISTS_ERROR_MESSAGE,
} from '~/src/shared/api/constant';
import {
  HTTP401Error,
  HTTP403Error,
  HTTP409Error,
  HTTP500Error,
  HTTPEtcError,
  UnExpectedAPIError,
} from './error';

export const createClientRequestOptions = (
  options: RequestInit = {}
): RequestInit => ({
  ...options,
  headers: {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  },
});

interface ReqParams {
  url: string;
  params?: URLSearchParams;
  options?: RequestInit;
}

export const requestAPI = async <T>({
  url,
  params,
  options,
}: ReqParams): Promise<T> => {
  const fullUrl = params
    ? `${API_BASE_URL}${url}?${params.toString()}`
    : `${API_BASE_URL}${url}`;

  const fetchOptions = options || createClientRequestOptions();

  const response = await fetch(fullUrl, fetchOptions);

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new HTTP401Error(UNAUTHORIZED_ERROR_MESSAGE);
      case 403:
        throw new HTTP403Error(FORBIDDEN_ERROR_MESSAGE);
      case 409:
        throw new HTTP409Error(USER_EXISTS_ERROR_MESSAGE);
      case 500:
        throw new HTTP500Error(REQUEST_ERROR_MESSAGE);
      default:
        throw new HTTPEtcError(response.status, RUN_TIME_ERROR_MESSAGE);
    }
  }

  try {
    return await response.json();
  } catch (error: unknown) {
    throw new UnExpectedAPIError({ error: error as unknown });
  }
};
