import { useInput } from '~/src/shared/hooks/useInput';

interface UseRadioGroupParamsType {
  name: string;
  options: Omit<React.ComponentProps<'input'>, 'id' | 'name' | 'value'> &
    {
      id: string;
      value: string;
      validateFnList?: {
        validateFn: (elements: HTMLInputElement[]) => boolean;
        errorMessage: string;
      }[];
    }[];
}

export const useRadioGroup = ({ name, options }: UseRadioGroupParamsType) => {
  const { register, watchAll, validate } = useInput();

  return {
    registers: options.map((option) =>
      register({
        name,
        ...option,
      })
    ),
    validate,
    checkedId: watchAll().els.filter((el) => el.checked)[0] || null,
  };
};
