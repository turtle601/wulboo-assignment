'use client';

import { useCreateMyClasses } from '~/src/entities/class/create-my-classes';
import { useInput } from '~/src/shared/hooks/useInput';
import { useValidateInput } from '~/src/shared/hooks/useInput/useValidateInput';
import { TextField } from '~/src/shared/ui/textField';
import {
  formatNumber,
  isFormattedNumber,
} from '~/src/shared/ui/textField/numberInput';

export function CreateClass() {
  const { register, watch, validate, onSubmit, watchAll } = useInput();

  const { mutate: createMyClasses } = useCreateMyClasses();

  const {
    validate: validateTitleField,
    errorMessage: titleFieldErrorMessage,
    isError: titleFieldIsError,
  } = useValidateInput(validate);

  const {
    validate: validateEnrolledUserLimitField,
    errorMessage: enrolledUserLimitFieldErrorMessage,
    isError: enrolledUserLimitFieldIsError,
  } = useValidateInput(validate);

  const {
    validate: validatePriceField,
    errorMessage: priceFieldErrorMessage,
    isError: priceFieldIsError,
  } = useValidateInput(validate);

  const validateFn = () => {
    return Object.entries({
      'course-title': validateTitleField,
      'course-total': validateEnrolledUserLimitField,
      'course-price': validatePriceField,
    }).every(([key, value]) => value({ elements: watch([key]).els }));
  };

  const handleSubmit = () => {
    if (!validateFn()) return;

    const classData = watchAll().els.reduce<Record<string, string>>(
      (acc, el) => {
        acc[el.id] = el.value;
        return acc;
      },
      {}
    );

    createMyClasses(classData);
  };

  return (
    <form className="w-full" noValidate onSubmit={onSubmit(handleSubmit)}>
      <div>
        <TextField.label htmlFor="course-title">강의명</TextField.label>
        <TextField.input
          type="text"
          placeholder="강의명을 입력해주세요"
          required
          onChange={() =>
            validateTitleField({
              elements: watch(['course-title']).els,
            })
          }
          onFocus={() =>
            validateTitleField({ elements: watch(['course-title']).els })
          }
          {...register({ id: 'course-title', name: 'course-title' })}
        />
        <TextField.errorMessage
          isError={titleFieldIsError}
          text={titleFieldErrorMessage}
        />
      </div>
      <div>
        <TextField.label htmlFor="course-enrolled-user-limit">
          수강 인원
        </TextField.label>
        <TextField.numberInput
          {...register({
            id: 'course-total',
            name: 'course-total',
          })}
          defaultValue={1}
          step={1}
          placeholder="총 수강 인원수를 입력해주세요"
          onChange={() =>
            validateEnrolledUserLimitField({
              elements: watch(['course-total']).els,
              validateFnList: [
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = elements[0].value;

                    if (isFormattedNumber(value)) {
                      return true;
                    }

                    return false;
                  },
                  errorMessage: '숫자를 입력해주세요',
                },
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = Number(formatNumber(elements[0].value));
                    return value >= 1 && Number.isInteger(value);
                  },
                  errorMessage:
                    '수강 인원수는 1명 이상 자연수만 기입 가능합니다.',
                },
              ],
            })
          }
          onFocus={() =>
            validateEnrolledUserLimitField({
              elements: watch(['course-total']).els,
              validateFnList: [
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = elements[0].value;

                    if (isFormattedNumber(value)) {
                      return true;
                    }

                    return false;
                  },
                  errorMessage: '숫자를 입력해주세요',
                },
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = Number(formatNumber(elements[0].value));
                    return value >= 1 && Number.isInteger(value);
                  },
                  errorMessage:
                    '수강 인원수는 1명 이상 자연수만 기입 가능합니다.',
                },
              ],
            })
          }
        />
        <TextField.errorMessage
          isError={enrolledUserLimitFieldIsError}
          text={enrolledUserLimitFieldErrorMessage}
        />
      </div>
      <div>
        <TextField.label htmlFor="course-price">가격</TextField.label>
        <TextField.numberInput
          {...register({
            id: 'course-price',
            name: 'course-price',
          })}
          placeholder="강의 가격을 입력해주세요"
          required
          defaultValue={1000}
          step={1000}
          onChange={() =>
            validatePriceField({
              elements: watch(['course-price']).els,
              validateFnList: [
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = elements[0].value;

                    if (isFormattedNumber(value)) {
                      return true;
                    }

                    return false;
                  },
                  errorMessage: '숫자를 입력해주세요',
                },
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = Number(formatNumber(elements[0].value));

                    return value >= 1000 && Number.isInteger(value);
                  },
                  errorMessage:
                    '강의가격은 1000원 이상 자연수만 기입 가능합니다.',
                },
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = Number(formatNumber(elements[0].value));

                    return value % 1000 === 0;
                  },
                  errorMessage: '강의 가격을 1000원 단위로 입력해주세요',
                },
              ],
            })
          }
          onFocus={() =>
            validatePriceField({
              elements: watch(['course-price']).els,
              validateFnList: [
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = elements[0].value;

                    if (isFormattedNumber(value)) {
                      return true;
                    }

                    return false;
                  },
                  errorMessage: '숫자를 입력해주세요',
                },
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = Number(formatNumber(elements[0].value));

                    return value >= 1000 && Number.isInteger(value);
                  },
                  errorMessage:
                    '강의가격은 1000원 이상 자연수만 기입 가능합니다.',
                },
                {
                  validateFn: (elements: HTMLInputElement[]) => {
                    const value = Number(formatNumber(elements[0].value));

                    return value % 1000 === 0;
                  },
                  errorMessage: '강의 가격을 1000원 단위로 입력해주세요',
                },
              ],
            })
          }
        />
        <TextField.errorMessage
          isError={priceFieldIsError}
          text={priceFieldErrorMessage}
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full h-[60px] bg-blue-500 text-white rounded-md cursor-pointer"
        >
          강의 개설하기
        </button>
      </div>
    </form>
  );
}
