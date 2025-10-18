import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '~/src/shared/api';

export interface UserRequestBodyType {
  username: string;
  email: string;
  tel: string;
  password: string;
  userType: 'student' | 'teacher';
}

export const userCreateUser = () => {
  return useMutation({
    mutationFn: async (user: UserRequestBodyType) => {
      return await apiClient.post('/user', user);
    },
  });
};
