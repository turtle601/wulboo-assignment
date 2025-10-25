import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  CLASS_LIST_LIMIT,
  classQueries,
  INITIAL_CURSOR,
} from '~/src/entities/class/class.query';

import Courses from '~/src/pages/courses';

import { HydrationPrefetchBoundary } from '~/src/app/provider';
import { API_BASE_URL } from '~/src/shared/api';

export const createServerRequestOptions = async (
  options: RequestInit = {}
): Promise<RequestInit> => {
  const finalOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  if (authToken) {
    finalOptions.headers = {
      ...finalOptions.headers,
      Cookie: `authToken=${authToken.value || ''}`,
    };
  }

  return finalOptions;
};

export default async function CoursePage() {
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
      <HydrationPrefetchBoundary
        fetchQueryOptions={[
          classQueries.list(
            {
              limit: CLASS_LIST_LIMIT,
              cursor: INITIAL_CURSOR,
              filter: 'createdAtSortBy',
            },
            await createServerRequestOptions({
              method: 'GET',
            })
          ),
          classQueries.list(
            {
              limit: CLASS_LIST_LIMIT,
              cursor: INITIAL_CURSOR,
              filter: 'enrollCountSortBy',
            },
            await createServerRequestOptions({
              method: 'GET',
            })
          ),
          classQueries.list(
            {
              limit: CLASS_LIST_LIMIT,
              cursor: INITIAL_CURSOR,
              filter: 'enrollRatioSortBy',
            },
            await createServerRequestOptions({
              method: 'GET',
            })
          ),
        ]}
      >
        <Courses />
      </HydrationPrefetchBoundary>
    </>
  );
}
