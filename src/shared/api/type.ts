export interface IGenericError<T extends string> {
  errorType: T;
  errorMessage: string;
}

export const REQUEST = 'REQUEST' as const;
export interface IRequestError extends IGenericError<typeof REQUEST> {
  error: unknown;
}

export const NETWORK = 'NETWORK' as const;
export interface INetworkError extends IGenericError<typeof NETWORK> {
  error: unknown;
}

export const UNAUTHORIZED = 'UNAUTHORIZED' as const;
export interface IUnauthorizedError extends IGenericError<typeof UNAUTHORIZED> {
  error: unknown;
}

export const FORBIDDEN = 'FORBIDDEN' as const;
export interface IForbiddenError extends IGenericError<typeof FORBIDDEN> {
  error: unknown;
}

export const CONFLICT = 'CONFLICT' as const;
export interface IConflictError extends IGenericError<typeof CONFLICT> {
  error: unknown;
}
