import { useInput } from '~/src/shared/hooks/useInput';

interface UseTextFieldInputParamsType
  extends Omit<React.ComponentProps<'input'>, 'id, name'> {
  id: string;
  name: string;
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
  ...rest
}: UseTextFieldInputParamsType) => {
  const { register, validate, errorMessage, watch, isValid } = useInput();

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
      ...rest,
    }),
    isError: !isValid,
    errorMessage,
    values: watch({ id })?.els.map((el) => el.value)[0],
  };
};
