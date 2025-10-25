import { useState } from 'react';
import { useForm } from '~/src/shared/hooks/useInput';
import { TextField } from '~/src/shared/ui/textField';

interface TelFieldProps {
  register: ReturnType<typeof useForm>['register'];
}

export function TelField({ register }: TelFieldProps) {
  const [telErrorMsg, setTelErrorMsg] = useState<string>('');

  return (
    <div>
      <TextField.label htmlFor="tel">전화번호</TextField.label>
      <TextField.input
        name="tel"
        type="tel"
        required
        placeholder="010-1234-5678"
        pattern="^010-[0-9]{4}-[0-9]{4}$"
        {...register({
          id: 'tel',
          isControlled: true,
          onFocus: (validationMessage) => {
            setTelErrorMsg(validationMessage || '');
          },
          onChange: (validationMessage) => {
            setTelErrorMsg(validationMessage || '');
          },
        })}
      />
      <TextField.errorMessage text={telErrorMsg} />
    </div>
  );
}
