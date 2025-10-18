import { userCreateUser } from '~/src/entities/user/api/create-user';
import { useRadioGroup } from '~/src/shared/hooks/useRadioGroup';
import { useTextFieldInput } from '~/src/shared/hooks/useTextField';

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

export const useJoinForm = () => {
  const {
    register,
    isError,
    errorMessage,
    check: checkUserName,
    values: userNameData,
  } = useTextFieldInput({
    id: 'username',
    name: 'username',
    type: 'text',
  });

  const {
    register: registerEmail,
    isError: isErrorEmail,
    errorMessage: errorMessageEmail,
    check: checkUserEmail,
    values: userEmailData,
  } = useTextFieldInput({
    id: 'user-email',
    name: 'user-email',
    type: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
  });

  const {
    register: registerTel,
    isError: isErrorTel,
    errorMessage: errorMessageTel,
    check: checkUserTel,
    values: userTelData,
  } = useTextFieldInput({
    id: 'user-tel',
    name: 'user-tel',
    type: 'tel',
    pattern: '^010-[0-9]{4}-[0-9]{4}$',
  });

  const {
    register: registerPassword,
    isError: isErrorPassword,
    errorMessage: errorMessagePassword,
    check: checkUserPassword,
    values: userPasswordData,
  } = useTextFieldInput({
    id: 'user-password',
    name: 'user-password',
    type: 'password',
    validateFnList: [
      {
        validateFn: validatePasswordLength,
        errorMessage: '비밀번호는 6자 이상 10자 이하로 설정해주세요',
      },
      {
        validateFn: validatePasswordCombination,
        errorMessage: '영문 소문자/대문자/숫자 중 2가지 이상 조합해주세요',
      },
    ],
  });

  const { registers, getCheckedId } = useRadioGroup({
    name: 'user-type',
    options: [
      { id: 'student', value: '수강생' },
      { id: 'teacher', value: '강사' },
    ],
  });

  const { mutate: createUser } = userCreateUser();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isErrorUserField = checkUserName();
    const isErrorEmailField = checkUserEmail();
    const isErrorTelField = checkUserTel();
    const isErrorPasswordField = checkUserPassword();
    const checkedId = getCheckedId();

    if (
      isErrorUserField ||
      isErrorEmailField ||
      isErrorTelField ||
      isErrorPasswordField ||
      !checkedId
    ) {
      console.log('유효성 검사 실패');
      return;
    }

    createUser({
      username: userNameData,
      email: userEmailData,
      tel: userTelData,
      password: userPasswordData,
      userType: checkedId,
    });
  };

  return {
    isError,
    errorMessage,
    isErrorEmail,
    errorMessageEmail,
    isErrorTel,
    errorMessageTel,
    isErrorPassword,
    errorMessagePassword,
    register,
    registerEmail,
    registerTel,
    registerPassword,
    registers,
    onSubmit,
  };
};
