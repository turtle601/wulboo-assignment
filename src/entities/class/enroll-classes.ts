import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { classQueries } from '~/src/entities/class/class.query';
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
          body: JSON.stringify(courseIds),
          credentials: 'include',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...classQueries.enroll()],
      });

      router.push('/courses/my');
    },
    onError: () => {
      console.log('수강하기 실패');
      // 회원가입 권유 모달 띄우기
    },
  });
};
