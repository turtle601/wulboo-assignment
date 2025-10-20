import { useMutation } from '@tanstack/react-query';
import { requestAPI } from '~/src/shared/api/request';

export interface UserRequestBodyType {
  username: string;
  email: string;
  tel: string;
  password: string;
  isStudent: boolean;
  isTeacher: boolean;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (user: UserRequestBodyType) => {
      return await requestAPI({
        url: '/user',
        options: { method: 'POST', body: JSON.stringify(user) },
      });
    },
  });
};
