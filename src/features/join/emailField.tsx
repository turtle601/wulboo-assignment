import { useState } from 'react';
import { useForm } from '~/src/shared/hooks/useInput';
import { TextField } from '~/src/shared/ui/textField';

interface EmailFieldProps {
  register: ReturnType<typeof useForm>['register'];
}

export function EmailField({ register }: EmailFieldProps) {
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

  return (
    <div>
      <TextField.label htmlFor="email">이메일</TextField.label>
      <TextField.input
        name="email"
        placeholder="example@gmail.com"
        type="email"
        required
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        {...register({
          id: 'email',
          isControlled: true,
          onFocus: (validationMessage) => {
            setEmailErrorMsg(validationMessage || '');
          },
          onChange: (validationMessage) => {
            setEmailErrorMsg(validationMessage || '');
          },
        })}
      />
      <TextField.errorMessage text={emailErrorMsg} />
    </div>
  );
}
