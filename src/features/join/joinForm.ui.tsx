'use client';

import { useCreateUser } from '~/src/entities/user/api/create-user';

import { InputRegisterValuesType, useInput } from '~/src/shared/hooks/useInput';
import { useValidateInput } from '~/src/shared/hooks/useInput/useValidateInput';

import { RadioGroup } from '~/src/shared/ui/radioGroup';
import { TextField } from '~/src/shared/ui/textField';

const validatePasswordLength = (elements: HTMLInputElement[]) => {
  const value = elements[0].value;

  if (value.length <= 6 || value.length >= 10) {
    return false;
  }

  return true;
};

const validatePasswordCombination = (elements: HTMLInputElement[]) => {
  const value = elements[0].value;

  const hasLowerCase = /[a-z]/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);

  const conditionCount = [hasLowerCase, hasUpperCase, hasNumber].filter(
    Boolean
  ).length;

  return conditionCount >= 2;
};

export const JoinForm = () => {
  const { register, watch, validate, onSubmit } = useInput();

  const {
    validate: validateUsername,
    errorMessage: usernameFieldErrorMessage,
    isError: usernameFieldIsError,
  } = useValidateInput(validate);

  const {
    validate: validateEmail,
    errorMessage: emailFieldErrorMessage,
    isError: emailFieldIsError,
  } = useValidateInput(validate);

  const {
    validate: validateTel,
    errorMessage: telFieldErrorMessage,
    isError: telFieldIsError,
  } = useValidateInput(validate);

  const {
    validate: validatePassword,
    errorMessage: passwordFieldErrorMessage,
    isError: passwordFieldIsError,
  } = useValidateInput(validate);

  const { mutate: createUser } = useCreateUser();

  const handleSubmit = (data: Record<string, InputRegisterValuesType>) => {
    const usernameValid = validateUsername({
      elements: data.username?.element ? [data.username.element] : [],
    });

    const emailValid = validateEmail({
      elements: data.email?.element ? [data.email.element] : [],
    });

    const telValid = validateTel({
      elements: data.tel?.element ? [data.tel.element] : [],
    });

    const passwordValid = validatePassword({
      elements: data.password?.element ? [data.password.element] : [],
    });

    const allFieldsValid =
      usernameValid && emailValid && telValid && passwordValid;

    if (!allFieldsValid) return;

    createUser({
      username: data.username?.element?.value || '',
      email: data.email?.element?.value || '',
      tel: data.tel?.element?.value || '',
      password: data.password?.element?.value || '',
      isStudent: data.student?.element?.checked || false,
      isTeacher: data.teacher?.element?.checked || false,
    });
  };

  return (
    <form className="w-full" noValidate onSubmit={onSubmit(handleSubmit)}>
      <div>
        <TextField.label htmlFor="username">이름</TextField.label>
        <TextField.input
          type="text"
          {...register({ id: 'username', name: 'username' })}
          placeholder="이름을 입력해주세요"
          required
          onChange={() =>
            validateUsername({ elements: watch(['username']).els })
          }
          onFocus={() =>
            validateUsername({ elements: watch(['username']).els })
          }
        />
        <TextField.errorMessage
          isError={usernameFieldIsError}
          text={usernameFieldErrorMessage}
        />
      </div>

      <div>
        <TextField.label htmlFor="email">이메일</TextField.label>
        <TextField.input
          placeholder="example@gmail.com"
          type="email"
          {...register({ id: 'email', name: 'email' })}
          required
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          onChange={() => validateEmail({ elements: watch(['email']).els })}
          onFocus={() => validateEmail({ elements: watch(['email']).els })}
        />
        <TextField.errorMessage
          isError={emailFieldIsError}
          text={emailFieldErrorMessage}
        />
      </div>

      <div>
        <TextField.label htmlFor="tel">전화번호</TextField.label>
        <TextField.input
          type="tel"
          required
          placeholder="010-1234-5678"
          pattern="^010-[0-9]{4}-[0-9]{4}$"
          {...register({ id: 'tel', name: 'tel' })}
          onChange={() => validateTel({ elements: watch(['tel']).els })}
          onFocus={() => validateTel({ elements: watch(['tel']).els })}
        />
        <TextField.errorMessage
          isError={telFieldIsError}
          text={telFieldErrorMessage}
        />
      </div>

      <div>
        <TextField.label htmlFor="password">비밀번호</TextField.label>
        <TextField.input
          type="password"
          {...register({ id: 'password', name: 'password' })}
          required
          onChange={() =>
            validatePassword({
              elements: watch(['password']).els,
              validateFnList: [
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
            })
          }
          onFocus={() =>
            validatePassword({
              elements: watch(['password']).els,
              validateFnList: [
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
            })
          }
        />
        <TextField.errorMessage
          isError={passwordFieldIsError}
          text={passwordFieldErrorMessage}
        />
      </div>

      <div>
        <RadioGroup.Wrapper
          name="user-type"
          aria-labelledby="회원유형"
          defaultActiveId="student"
        >
          <div id="회원유형" className="text-sm font-normal text-[#444]">
            회원유형
          </div>
          <div className="flex gap-12 mt-2">
            {[
              { id: 'student', value: '수강생' },
              { id: 'teacher', value: '강사' },
            ].map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <RadioGroup.Option
                  {...register({ id: option.id, value: option.value })}
                />
                <RadioGroup.Label htmlFor={option.id}>
                  {option.value}
                </RadioGroup.Label>
              </div>
            ))}
          </div>
        </RadioGroup.Wrapper>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full h-[60px] bg-blue-500 text-white rounded-md cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </form>
  );
};
