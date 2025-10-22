import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { userQueries } from '~/src/entities/user/api/user.query';
import { UserType } from '~/server/mocks/storage';
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
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (user: UserRequestBodyType) => {
      return await requestAPI<UserType>({
        url: '/user',
        options: {
          method: 'POST',
          body: JSON.stringify(user),
        },
      });
    },
    onSuccess: () => {
      router.push('/courses');
      queryClient.invalidateQueries({ queryKey: userQueries.keys() });
    },
  });
};
