import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CreateCourses } from '~/src/pages/createCourses';

import { API_BASE_URL } from '~/src/shared/api';

export default async function CreateClassPage() {
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

  return (
    <>
      <CreateCourses />
    </>
  );
}
