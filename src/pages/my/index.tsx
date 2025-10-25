'use client';

import { useGetUser } from '~/src/entities/user/api/get-user';
import { MyClassForTeacher } from '~/src/pages/my/myClassForTeacher';
import { MyCreatedClassForStudent } from '~/src/pages/my/myCreatedClassForStudent';

export function MyPage() {
  const { data: user } = useGetUser();

  if (!user) return;

  if (user.isTeacher) {
    return <MyClassForTeacher />;
  }

  return (
    <div>
      <MyCreatedClassForStudent />
    </div>
  );
}
