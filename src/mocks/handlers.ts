import { http, HttpResponse, StrictRequest } from 'msw';
import { UserRequestBodyType } from '~/src/entities/user/api/create-user';

import { generateClassListPaginationResponse } from '~/src/mocks/classList/classList';

import { createUser } from '~/src/mocks/user/user';

export const userHandlers = [
  http.post(
    '/api/user',
    async ({ request }: { request: StrictRequest<UserRequestBodyType> }) => {
      const userData = await request.json();

      const status = createUser(userData);

      return HttpResponse.json(
        {},
        {
          status,
        }
      );
    }
  ),
];

export const classesHandlers = [
  http.get('/api/classList', async ({ request }) => {
    console.log('request', request);
    const url = new URL(request.url);

    const cursor = url.searchParams.get('cursor') || undefined; // 마지막 항목의 ID

    const limit = parseInt(url.searchParams.get('limit') || '10');

    const createdAtSortBy =
      url.searchParams.get('createdAtSortBy') || undefined; // old or new

    const enrollRatioSortBy =
      url.searchParams.get('enrollRatioSortBy') || undefined; // low or high

    const enrollCountSortBy =
      url.searchParams.get('enrollCountSortBy') || undefined; // asc or desc

    const response = generateClassListPaginationResponse({
      limit,
      cursor,
      enrollRatioSortBy,
      enrollCountSortBy,
      createdAtSortBy,
    });

    // await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json(response, { status: 200 });
  }),
];

// 모든 핸들러 통합
export const handlers = [...userHandlers, ...classesHandlers];
