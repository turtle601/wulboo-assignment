import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { classQueries } from '~/src/entities/class/class.query';
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
          credentials: 'include',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...classQueries.keys()] });
      router.push('/courses/my?tab=1');
    },
    onError: () => {
      console.error('강의 생성에 실패했습니다');
    },
  });
};
