import { http, HttpResponse, StrictRequest } from 'msw';
import { UserRequestBodyType } from '~/src/entities/user/api/create-user';

import {
  parseDateSort,
  parseHighLowSort,
  parseSortOrder,
  generateClassListPaginationResponse,
} from '~/src/mocks/classList/classList';

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
  http.get('*/api/classList*', async ({ request }) => {
    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('page') || '1');

    const limit = parseInt(url.searchParams.get('limit') || '10');

    const createdAtSortBy = url.searchParams.get('createdAtSortBy') || 'old'; // old or new

    const enrollRatioSortBy =
      url.searchParams.get('enrollRatioSortBy') || 'low'; // low or high

    const enrollCountSortBy =
      url.searchParams.get('enrollCountSortBy') || 'asc'; // asc or desc

    if (
      !parseDateSort(createdAtSortBy) ||
      !parseHighLowSort(enrollRatioSortBy) ||
      !parseSortOrder(enrollCountSortBy)
    ) {
      return HttpResponse.json(
        {
          error: 'Invalid sort parameters',
        },
        { status: 400 }
      );
    }

    const response = generateClassListPaginationResponse({
      page,
      limit,
      enrollRatioSortBy,
      enrollCountSortBy,
      createdAtSortBy,
    });

    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json(response, { status: 200 });
  }),
];

// 모든 핸들러 통합
export const handlers = [...userHandlers, ...classesHandlers];
