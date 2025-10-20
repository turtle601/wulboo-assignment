import { useRef } from 'react';

export interface ValidateFnType {
  validateFn: (elements: HTMLInputElement[]) => boolean;
  errorMessage: string;
}

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

export interface InputRegisterValuesType {
  element: HTMLInputElement;
}

export type InputRegisterType = Omit<
  React.ComponentProps<'input'>,
  'id' | 'name'
> & {
  id: string;
  name?: string;
  onClick?: () => void | React.ComponentProps<'input'>['onClick'];
};

export const useInput = () => {
  const formRefs = useRef<Record<string, InputRegisterValuesType>>({});

  const watchAll = () => {
    return {
      els: Object.values(formRefs.current).map((item) => item.element) || [],
    };
  };

  const watch = (ids: string[]) => {
    return {
      els: ids.map((id) => formRefs.current[id]?.element).filter(Boolean),
    };
  };

  const registerRef =
    ({ id }: Omit<InputRegisterType, 'name'>) =>
    (el: HTMLInputElement) => {
      if (!el) return;

      formRefs.current[id] = {
        element: el,
      };
    };

  const register = ({ id, name, ...props }: InputRegisterType) => {
    return {
      id,
      name,
      ref: registerRef({ id }),
      ...props,
    };
  };

  const validate =
    (elements: HTMLInputElement[]) =>
    ({
      validateFnList = [],
      errorCallBack,
    }: {
      validateFnList?: ValidateFnType[];
      errorCallBack?: (errorMessage?: string) => void;
    }) => {
      for (const { validateFn, errorMessage } of validateFnList) {
        if (!validateFn(elements)) {
          errorCallBack?.(errorMessage);
          return false;
        }
      }

      for (const state of VALIDITY_STATE) {
        if (elements.some((element) => element.validity[state])) {
          errorCallBack?.(VALIDITY_STATE_MESSAGE_MAP[state]);
          return false;
        }
      }

      errorCallBack?.('');

      return true;
    };

  const getElements = (ids: string[]) => {
    return ids.map((id) => formRefs.current[id]?.element).filter(Boolean);
  };

  const onSubmit = (
    fn: (data: Record<string, InputRegisterValuesType>) => void
  ) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fn(formRefs.current);
    };
  };

  return {
    watch,
    watchAll,
    getElements,
    register,
    validate,
    onSubmit,
  };
};
