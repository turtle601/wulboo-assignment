import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MyPage } from '~/src/pages/my';

import { MyClassForTeacher } from '~/src/pages/my/myClassForTeacher';
import { MyCreatedClassForStudent } from '~/src/pages/my/myCreatedClassForStudent';

import { API_BASE_URL } from '~/src/shared/api';

export default async function MyCoursePage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  const userResponse = await fetch(`${API_BASE_URL}/user`, {
    method: 'GET',
    headers: {
      Cookie: `authToken=${authToken?.value || ''}`,
    },
  });

  if (!userResponse.ok) {
    redirect('/');
    return null;
  }

  return <MyPage />;
}
