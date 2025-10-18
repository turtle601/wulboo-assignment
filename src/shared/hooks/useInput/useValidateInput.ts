import { useState } from 'react';

const VALIDITY_STATE = [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valueMissing',
] as const;

const VALIDITY_STATE_MESSAGE_MAP: Record<
  (typeof VALIDITY_STATE)[number],
  string
> = {
  badInput: '잘못된 입력입니다.',
  patternMismatch: '입력 형식이 올바르지 않습니다.',
  rangeOverflow: '최대값을 초과했습니다.',
  rangeUnderflow: '최소값보다 작습니다.',
  stepMismatch: '입력 단위가 올바르지 않습니다.',
  tooLong: '입력값이 너무 깁니다.',
  tooShort: '입력값이 너무 짧습니다.',
  typeMismatch: '입력 타입이 올바르지 않습니다.',
  valueMissing: '필수 입력 항목입니다.',
};

export const useValidateInput = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const check = () => {
    return {
      errorMessage,
      isValid: !errorMessage,
    };
  };

  const reset = () => {
    setErrorMessage('');
  };

  const validate = ({
    elements,
    validateFnList = [],
  }: {
    elements: HTMLInputElement[];
    validateFnList?: {
      validateFn: (elements: HTMLInputElement[]) => boolean;
      errorMessage: string;
    }[];
  }) => {
    for (const { validateFn, errorMessage } of validateFnList) {
      if (!validateFn(elements)) {
        setErrorMessage(errorMessage);
        return false;
      }
    }

    for (const state of VALIDITY_STATE) {
      if (elements.some((element) => element.validity[state])) {
        setErrorMessage(VALIDITY_STATE_MESSAGE_MAP[state]);
        return false;
      }
    }

    reset();

    return true;
  };

  return {
    errorMessage,
    isValid: !errorMessage,
    validate,
    check,
    reset,
  };
};
