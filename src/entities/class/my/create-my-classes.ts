import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { classQueries } from '~/src/entities/class/class.query';
import { userQueries } from '~/src/entities/user/api/user.query';

import { requestAPI } from '~/src/shared/api/request';

export const useCreateMyClasses = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (classData: Record<string, string>) => {
      return requestAPI({
        url: '/classes/create',
        options: {
          method: 'POST',
          body: JSON.stringify(classData),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      });
    },
    onSuccess: () => {
      router.push('/courses');
      queryClient.invalidateQueries({ queryKey: [...classQueries.keys()] });
      queryClient.invalidateQueries({ queryKey: [...userQueries.keys()] });
    },
    onError: (error) => {
      console.log('onError', error);
    },
  });
};
