import { useState } from 'react';

import {
  validatePasswordCombination,
  validatePasswordLength,
} from '~/src/entities/user/validate';

import { useForm } from '~/src/shared/hooks/useInput';
import { TextField } from '~/src/shared/ui/textField';

interface PasswordFieldProps {
  register: ReturnType<typeof useForm>['register'];
}

export function PasswordField({ register }: PasswordFieldProps) {
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');

  return (
    <div>
      <TextField.label htmlFor="password">비밀번호</TextField.label>
      <TextField.input
        name="password"
        type="password"
        required
        placeholder="비밀번호를 입력해주세요"
        {...register({
          id: 'password',
          isControlled: true,
          customValidateFnList: [
            {
              validateFn: validatePasswordLength,
              errorMessage: '비밀번호는 6자 이상 10자 이하여야 합니다.',
            },
            {
              validateFn: validatePasswordCombination,
              errorMessage:
                '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
            },
          ],
          onFocus: (validationMessage) => {
            setPasswordErrorMsg(validationMessage || '');
          },
          onChange: (validationMessage) => {
            setPasswordErrorMsg(validationMessage || '');
          },
        })}
      />
      <TextField.errorMessage text={passwordErrorMsg} />
    </div>
  );
}
