import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { classQueries } from '~/src/entities/class/class.query';
import { userQueries } from '~/src/entities/user/api/user.query';
import { requestAPI } from '~/src/shared/api/request';

interface EnrollClassesParams {
  courseIds: string[];
}

export const useEnrollClasses = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ courseIds }: EnrollClassesParams) => {
      return await requestAPI({
        url: `/classes/enroll`,
        options: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseIds),
          credentials: 'include',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...classQueries.keys()] });
      queryClient.invalidateQueries({ queryKey: [...userQueries.keys()] });

      router.push('/courses/my');
    },
  });
};
