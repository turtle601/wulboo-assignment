import { useState } from 'react';
import { ValidateFnType } from '~/src/shared/hooks/useInput/useInput';

export const useValidateInput = (
  validate: (
    elements: HTMLInputElement[]
  ) => ({
    validateFnList,
    errorCallBack,
  }: {
    validateFnList?: ValidateFnType[];
    errorCallBack?: (errorMessage?: string) => void;
  }) => boolean
) => {
  const [errorMessage, setErrorMessage] = useState('');

  return {
    validate: ({
      elements,
      validateFnList,
    }: {
      elements: HTMLInputElement[];
      validateFnList?: ValidateFnType[];
    }) => {
      return validate(elements)({
        validateFnList,
        errorCallBack: (errorMessage?: string) => {
          setErrorMessage(errorMessage ?? '');
        },
      });
    },
    errorMessage,
    isError: !!errorMessage,
  };
};
