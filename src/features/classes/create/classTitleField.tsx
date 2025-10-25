import { useState } from 'react';
import { useForm } from '~/src/shared/hooks/useInput';
import { TextField } from '~/src/shared/ui/textField';

interface ClassTitleFieldProps {
  register: ReturnType<typeof useForm>['register'];
}

export function ClassTitleField({ register }: ClassTitleFieldProps) {
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  return (
    <div>
      <TextField.label htmlFor="course-title">강의명</TextField.label>
      <TextField.input
        required
        type="text"
        placeholder="강의명을 입력해주세요"
        name="course-title"
        {...register({
          id: 'course-title',
          isControlled: true,
          onChange: (errorMessage) => {
            setTitleErrorMessage(errorMessage || '');
          },
          onFocus: (errorMessage) => {
            setTitleErrorMessage(errorMessage || '');
          },
        })}
      />
      <TextField.errorMessage text={titleErrorMessage} />
    </div>
  );
}
