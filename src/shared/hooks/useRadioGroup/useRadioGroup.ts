import { useInput } from '~/src/shared/hooks/useInput';

const isValidUserType = (id: string | null): id is 'student' | 'teacher' => {
  return id === 'student' || id === 'teacher';
};

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

  const getCheckedId = () => {
    const rawCheckedId =
      watchAll().els.filter((el) => el.checked)[0]?.id || null;

    const checkedId: 'student' | 'teacher' | null = isValidUserType(
      rawCheckedId
    )
      ? rawCheckedId
      : null;

    return checkedId;
  };

  return {
    registers: options.map((option) =>
      register({
        name,
        ...option,
      })
    ),
    validate,
    getCheckedId,
  };
};
