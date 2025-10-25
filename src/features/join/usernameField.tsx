import { useState } from 'react';
import { useForm } from '~/src/shared/hooks/useInput';
import { TextField } from '~/src/shared/ui/textField';

interface UsernameFieldProps {
  register: ReturnType<typeof useForm>['register'];
}

export function UsernameField({ register }: UsernameFieldProps) {
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>('');

  return (
    <div>
      <TextField.label htmlFor="username">이름</TextField.label>
      <TextField.input
        name="username"
        placeholder="이름을 입력해주세요"
        required
        {...register({
          id: 'username',
          customValidateFnList: [],
          isControlled: true,
          onChange: (validationMessage) => {
            setUsernameErrorMsg(validationMessage || '');
          },
          onFocus: (validationMessage) => {
            setUsernameErrorMsg(validationMessage || '');
          },
        })}
      />
      <TextField.errorMessage text={usernameErrorMsg} />
    </div>
  );
}
