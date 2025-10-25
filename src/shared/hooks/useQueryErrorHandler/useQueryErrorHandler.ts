import { HTTP401Error, HTTP403Error } from '~/src/shared/api';

export const useQueryErrorHandler = () => {
  return (error: Error) => {
    if (error instanceof HTTP401Error || error instanceof HTTP403Error) {
      window.location.href = '/';
      return;
    }
  };
};
