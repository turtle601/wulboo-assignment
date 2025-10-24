import { useCreateUser } from '~/src/entities/user/api/create-user';
import { EmailField } from '~/src/features/join/emailField';
import { PasswordField } from '~/src/features/join/passwordField';
import { TelField } from '~/src/features/join/telField';
import { UsernameField } from '~/src/features/join/usernameField';
import { UserTypeField } from '~/src/features/join/userTypeField';
import { useForm, FormDataType } from '~/src/shared/hooks/useInput/useForm';

export const JoinForm = () => {
  const { register, handleSubmit } = useForm();

  const { mutate: createUser } = useCreateUser();

  const onSubmit = (formData: FormDataType) => {
    createUser({
      username: formData.username,
      email: formData.email,
      tel: formData.tel,
      password: formData.password,
      isStudent: formData.student,
      isTeacher: formData.teacher,
    });
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
      noValidate
    >
      <div className="flex flex-col gap-4 overflow-y-auto h-[340px]">
        <UsernameField register={register} />
        <EmailField register={register} />
        <TelField register={register} />
        <PasswordField register={register} />
        <div className="mt-4">
          <UserTypeField register={register} />
        </div>
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
