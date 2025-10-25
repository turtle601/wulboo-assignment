import { useState } from 'react';
import { useForm, ValidateFnType } from '~/src/shared/hooks/useInput';
import { TextField } from '~/src/shared/ui/textField';

interface PriceFieldProps {
  register: ReturnType<typeof useForm>['register'];
  validateFn: ValidateFnType[];
}

export function PriceField({ register, validateFn }: PriceFieldProps) {
  const [priceErrorMessage, setPriceErrorMessage] = useState('');

  return (
    <div>
      <TextField.label htmlFor="course-price">가격</TextField.label>
      <TextField.numberInput
        placeholder="강의 가격을 입력해주세요"
        required
        step={1000}
        defaultValue={1000}
        {...register({
          id: 'course-price',
          isControlled: true,
          onChange: (errorMessage) => setPriceErrorMessage(errorMessage || ''),
          onFocus: (errorMessage) => setPriceErrorMessage(errorMessage || ''),
          customValidateFnList: validateFn,
        })}
      />
      <TextField.errorMessage text={priceErrorMessage} />
    </div>
  );
}
