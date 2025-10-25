import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Join } from '~/src/pages/join';
import { API_BASE_URL } from '~/src/shared/api';

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  const userResponse = await fetch(`${API_BASE_URL}/user`, {
    method: 'GET',
    headers: {
      Cookie: `authToken=${authToken?.value || ''}`,
    },
  });

  if (userResponse.ok) {
    redirect('/courses');
  }

  return <Join />;
}
