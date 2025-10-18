import { useRef } from 'react';
import { useValidateInput } from './useValidateInput';

export interface InputRegisterValuesType {
  element: HTMLInputElement;
}

export type InputRegisterType = Omit<
  React.ComponentProps<'input'>,
  'id' | 'name'
> & {
  id: string;
  name: string;
};

export const useInput = () => {
  const formRefs = useRef<Record<string, InputRegisterValuesType>>({});
  const { validate, errorMessage, isValid, reset } = useValidateInput();

  const watchAll = () => {
    return {
      els: Object.values(formRefs.current).map((item) => item.element) || [],
    };
  };

  const watch = ({ id }: { id: string }) => {
    return {
      els: formRefs.current[id]?.element ? [formRefs.current[id].element] : [],
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

  return {
    watch,
    watchAll,
    reset,
    register,
    validate,
    errorMessage,
    isValid,
  };
};
