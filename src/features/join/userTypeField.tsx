import { useForm } from '~/src/shared/hooks/useInput';
import { RadioGroup } from '~/src/shared/ui/radioGroup';

interface UserTypeFieldProps {
  register: ReturnType<typeof useForm>['register'];
}

export function UserTypeField({ register }: UserTypeFieldProps) {
  return (
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
              name="user-type"
              {...register({ id: option.id })}
            />
            <RadioGroup.Label htmlFor={option.id}>
              {option.value}
            </RadioGroup.Label>
          </div>
        ))}
      </div>
    </RadioGroup.Wrapper>
  );
}
