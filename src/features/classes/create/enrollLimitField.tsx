import { useState } from 'react';
import { useForm, ValidateFnType } from '~/src/shared/hooks/useInput';
import { TextField } from '~/src/shared/ui/textField';

interface EnrollLimitFieldProps {
  register: ReturnType<typeof useForm>['register'];
  validateFn: ValidateFnType[];
}

export function EnrollLimitField({
  register,
  validateFn,
}: EnrollLimitFieldProps) {
  const [enrolledUserLimitErrorMessage, setEnrolledUserLimitErrorMessage] =
    useState('');

  return (
    <div>
      <TextField.label htmlFor="course-enrolled-total">
        수강 인원
      </TextField.label>
      <TextField.numberInput
        required
        placeholder="수강 인원을 입력해주세요"
        name="course-enrolled-total"
        defaultValue={1}
        step={1}
        {...register({
          id: 'course-enrolled-total',
          isControlled: true,
          onChange: (errorMessage) => {
            setEnrolledUserLimitErrorMessage(errorMessage || '');
          },
          onFocus: (errorMessage) => {
            setEnrolledUserLimitErrorMessage(errorMessage || '');
          },
          customValidateFnList: validateFn,
        })}
      />
      <TextField.errorMessage text={enrolledUserLimitErrorMessage} />
    </div>
  );
}
