import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerRequestOptions } from '~/app/courses/page';
import { HydrationPrefetchBoundary } from '~/src/app/provider';
import { classQueries } from '~/src/entities/class/class.query';
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

  const user = await userResponse.json();

  const serverForMyEnrolledListRequestOptions =
    await createServerRequestOptions({
      headers: {
        Cookie: `authToken=${authToken?.value || ''}`,
      },
    });

  const serverForMyCreatedListRequestOptions = await createServerRequestOptions(
    {
      headers: {
        Cookie: `authToken=${authToken?.value || ''}`,
      },
    }
  );

  if (!user.isTeacher) {
    return (
      <HydrationPrefetchBoundary
        fetchQueryOptions={[
          classQueries.myEnrolledList(serverForMyEnrolledListRequestOptions),
        ]}
      >
        <MyCreatedClassForStudent />
      </HydrationPrefetchBoundary>
    );
  }

  if (user.isTeacher) {
    return (
      <HydrationPrefetchBoundary
        fetchQueryOptions={[
          classQueries.myEnrolledList(serverForMyEnrolledListRequestOptions),
          classQueries.myCreatedList(serverForMyCreatedListRequestOptions),
        ]}
      >
        <MyClassForTeacher />
      </HydrationPrefetchBoundary>
    );
  }
}
