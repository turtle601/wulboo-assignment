import { useInput } from '~/src/shared/hooks/useInput';

interface UseTextFieldInputParamsType {
  id: string;
  name: string;
  type?: string;
  validateFnList?: {
    validateFn: (elements: HTMLInputElement[]) => boolean;
    errorMessage: string;
  }[];
}

export const useTextFieldInput = ({
  id,
  name,
  type = 'text',
  validateFnList = [],
}: UseTextFieldInputParamsType) => {
  const { register, validate, reset, errorMessage, watch, isValid } =
    useInput();

  const check = () => {
    return !validate({
      elements: watch({ id }).els,
      validateFnList,
    });
  };

  return {
    check,
    register: register({
      id,
      name,
      type,
      onChange: check,
      onFocus: check,
    }),
    isError: !isValid,
    errorMessage,
    values: watch({ id }).els.map((el) => el.value),
  };
};
