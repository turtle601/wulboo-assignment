import {
  formatNumber,
  isFormattedNumber,
} from '~/src/shared/ui/textField/numberInput';

export const numberFormatValidator = {
  validateFn: (element: HTMLInputElement) => {
    const value = element.value;
    if (isFormattedNumber(value)) {
      return false;
    }

    return true;
  },
  errorMessage: '숫자를 입력해주세요',
};

export const positiveIntegerValidator = {
  validateFn: (element: HTMLInputElement) => {
    const value = Number(formatNumber(element.value));
    return value < 1 || !Number.isInteger(value);
  },

  errorMessage: '수강 인원수는 1명 이상 자연수만 기입 가능합니다.',
};

export const priceValidator = {
  validateFn: (element: HTMLInputElement) => {
    const value = Number(formatNumber(element.value));
    return value % 1000 !== 0;
  },
  errorMessage: '강의 가격을 1000원 단위로 입력해주세요',
};
