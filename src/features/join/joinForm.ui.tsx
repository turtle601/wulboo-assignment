'use client';

import { useJoinForm } from '~/src/features/join/joinForm.hook';

import { RadioGroup } from '~/src/shared/ui/radioGroup';
import { TextField } from '~/src/shared/ui/textField';

export const JoinForm = () => {
  const {
    register,
    registerEmail,
    registerTel,
    registerPassword,
    registers,
    isError,
    errorMessage,
    isErrorEmail,
    errorMessageEmail,
    isErrorTel,
    errorMessageTel,
    isErrorPassword,
    errorMessagePassword,
    onSubmit,
  } = useJoinForm();

  return (
    <form className="w-full">
      <div>
        <TextField.label htmlFor="username">이름</TextField.label>
        <TextField.input
          placeholder="이름을 입력해주세요"
          {...register}
          required
        />
        <TextField.errorMessage isError={isError} text={errorMessage} />
      </div>

      <div>
        <TextField.label htmlFor="email">이메일</TextField.label>
        <TextField.input
          placeholder="example@gmail.com"
          type="email"
          {...registerEmail}
          required
        />
        <TextField.errorMessage
          isError={isErrorEmail}
          text={errorMessageEmail}
        />
      </div>

      <div>
        <TextField.label htmlFor="tel">전화번호</TextField.label>
        <TextField.input
          required
          placeholder="010-1234-5678"
          {...registerTel}
        />
        <TextField.errorMessage isError={isErrorTel} text={errorMessageTel} />
      </div>

      <div>
        <TextField.label htmlFor="password">비밀번호</TextField.label>
        <TextField.input {...registerPassword} required />
        <TextField.errorMessage
          isError={isErrorPassword}
          text={errorMessagePassword}
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
            {registers.map((register) => (
              <div key={register.id} className="flex items-center gap-2">
                <RadioGroup.Option {...register} />
                <RadioGroup.Label htmlFor={register.id}>
                  {register.value}
                </RadioGroup.Label>
              </div>
            ))}
          </div>
        </RadioGroup.Wrapper>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          onClick={onSubmit}
          className="w-full h-[60px] bg-blue-500 text-white rounded-md cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </form>
  );
};
