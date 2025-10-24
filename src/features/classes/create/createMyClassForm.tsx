'use client';

import { useCreateMyClasses } from '~/src/entities/class/my/create-my-classes';
import {
  numberFormatValidator,
  positiveIntegerValidator,
  priceValidator,
} from '~/src/entities/class/create/validate';

import { ClassTitleField } from '~/src/features/classes/create/classTitleField';
import { EnrollLimitField } from '~/src/features/classes/create/enrollLimitField';
import { PriceField } from '~/src/features/classes/create/priceField';
import { FormDataType, useForm } from '~/src/shared/hooks/useInput';

export function CreateMyClassForm() {
  const { register, handleSubmit } = useForm();

  const { mutate: createMyClasses } = useCreateMyClasses();

  const onSubmit = (formData: FormDataType) => {
    createMyClasses(formData);
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      <ClassTitleField register={register} />
      <EnrollLimitField
        register={register}
        validateFn={[positiveIntegerValidator, numberFormatValidator]}
      />
      <PriceField
        register={register}
        validateFn={[
          priceValidator,
          numberFormatValidator,
          positiveIntegerValidator,
        ]}
      />

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
