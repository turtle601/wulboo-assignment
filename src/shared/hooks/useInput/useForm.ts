import { useRef } from 'react';

export interface FormDataType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ValidateFnType {
  validateFn: (element: HTMLInputElement) => boolean;
  errorMessage: string;
}

const VALIDITY_STATE = [
  'badInput',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valueMissing',
] as const;

const VALIDITY_STATE_MESSAGE_MAP: Record<
  (typeof VALIDITY_STATE)[number],
  string
> = {
  badInput: '잘못된 입력입니다.',
  patternMismatch: '입력 형식이 올바르지 않습니다.',
  rangeOverflow: '최대값을 초과했습니다.',
  rangeUnderflow: '최소값보다 작습니다.',
  stepMismatch: '입력 단위가 올바르지 않습니다.',
  tooLong: '입력값이 너무 깁니다.',
  tooShort: '입력값이 너무 짧습니다.',
  typeMismatch: '입력 타입이 올바르지 않습니다.',
  valueMissing: '필수 입력 항목입니다.',
};

const isErrorCheckElement = (
  element: HTMLInputElement,
  customValidateFn: ValidateFnType
) => {
  if (customValidateFn.validateFn(element)) {
    element.setCustomValidity(customValidateFn.errorMessage);
    return true;
  }

  return false;
};

export const getCustomValidateFnList = (
  element: HTMLInputElement,
  customValidateFnList: ValidateFnType[]
) => {
  return customValidateFnList.map((customValidate) => {
    return () => {
      return !isErrorCheckElement(element, customValidate);
    };
  });
};

export const getHTMLDefaultValidateFnList = (element: HTMLInputElement) => {
  const defaultValidateFnList = VALIDITY_STATE.map((item) => ({
    validateFn: (element: HTMLInputElement) => element.validity[item],
    errorMessage: VALIDITY_STATE_MESSAGE_MAP[item],
  }));

  return defaultValidateFnList.map((item) => {
    return () => {
      return !isErrorCheckElement(element, item);
    };
  });
};

export interface InputRegisterValuesType {
  id: string;
  element: HTMLInputElement;
  customValidateFnList?: ValidateFnType[];
  isControlled?: boolean;
  onChange?: (validationMessage?: string) => void;
  onFocus?: (validationMessage?: string) => void;
}

interface FormRefsType {
  id: string;
  element: HTMLInputElement;
  validateFnList?: (() => boolean)[];
}

export const useForm = () => {
  const formRefs = useRef<Record<string, FormRefsType>>({});

  const registerRef =
    ({
      id,
      customValidateFnList = [],
    }: Omit<InputRegisterValuesType, 'element'>) =>
    (el: HTMLInputElement | null) => {
      if (!el) return;

      formRefs.current[id] = {
        id,
        element: el,
        validateFnList: [
          ...getHTMLDefaultValidateFnList(el),
          ...getCustomValidateFnList(el, customValidateFnList),
        ],
      };
    };

  const validate = (id: string) => {
    const formRef = formRefs.current[id];
    if (!formRef) return false;

    formRef.element.setCustomValidity('');

    for (const validateFn of formRef.validateFnList || []) {
      if (!validateFn()) {
        return false;
      }
    }

    return true;
  };

  const register = ({
    id,
    customValidateFnList = [],
    isControlled = false,
    onChange,
    onFocus,
  }: Omit<InputRegisterValuesType, 'element'>) => {
    const inputRefs = registerRef({ id, customValidateFnList });

    const events = {
      onChange: () => {
        validate(id);
        onChange?.(formRefs.current[id]?.element.validationMessage);
      },
      onFocus: () => {
        validate(id);
        onFocus?.(formRefs.current[id]?.element.validationMessage);
      },
    };

    return {
      id,
      ref: inputRefs,
      ...(isControlled && events),
    };
  };

  const handleSubmit = (onSubmit: (formData: FormDataType) => void) => {
    for (const formRef of Object.values(formRefs.current)) {
      if (!validate(formRef.id)) {
        formRef.element.focus();
        return false;
      }
    }

    onSubmit(
      Object.values(formRefs.current).reduce<FormDataType>((acc, formRef) => {
        const elementValue =
          formRef.element.type === 'checkbox' ||
          formRef.element.type === 'radio'
            ? formRef.element.checked
            : formRef.element.value;

        const id = formRef.id;

        acc[id] = elementValue;
        return acc;
      }, {})
    );
  };

  return {
    formRefs,
    register,
    validate,
    handleSubmit,
  };
};
