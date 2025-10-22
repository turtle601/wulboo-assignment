import { http, HttpResponse, JsonBodyType, StrictRequest } from 'msw';

import { UserRequestBodyType } from '~/src/entities/user/api/create-user';

import { generateClassListPaginationResponse } from '~/server/mocks/classList/classList';
import { classList, UserMap, ClassType } from '~/server/mocks/storage';

import { createUser } from '~/server/mocks/user/user';
import { API_BASE_URL } from '~/src/shared/api/constant';

const getAuthUser = (cookie: Record<string, string>) => {
  const authToken = cookie['authToken'];

  if (!authToken) {
    return {
      status: 401,
    };
  }

  const user = UserMap.get(authToken);

  if (!user) {
    return { status: 403 };
  }

  return { status: 200, user };
};

export const userHandlers = [
  http.get(`/user`, async ({ cookies }) => {
    const response = getAuthUser(cookies);
    return HttpResponse.json(response.user, { status: response.status });
  }),

  http.post(
    `/user`,
    async ({ request }: { request: StrictRequest<UserRequestBodyType> }) => {
      const userData = await request.json();

      const response = createUser(userData);

      return HttpResponse.json({}, response);
    }
  ),
];

export const classesHandlers = [
  http.get(`/classList`, async ({ request }) => {
    const url = new URL(request.url);

    const flag = url.searchParams
      ?.entries()
      .filter(([key]) => {
        return !['limit', 'cursor'].includes(key);
      })
      .every(([key, value]) => {
        return (
          ['filter'].includes(key) &&
          [
            'createdAtSortBy',
            'enrollCountSortBy',
            'enrollRatioSortBy',
          ].includes(value)
        );
      });

    if (!flag) return HttpResponse.json({}, { status: 400 });

    const cursor = url.searchParams.get('cursor') || undefined; // 마지막 항목의 ID
    const limit = parseInt(url.searchParams.get('limit') ?? '10');

    const filterParams = url.searchParams.get('filter');

    const response = generateClassListPaginationResponse({
      limit,
      cursor,
      filterParams,
    });

    return HttpResponse.json(response, { status: 200 });
  }),

  http.post<never, string[], JsonBodyType>(
    `/classes/enroll`,
    async ({ request, cookies }) => {
      const response = getAuthUser(cookies);

      if (!response.user) {
        return HttpResponse.json({}, response);
      }

      const courseIds = await request.json();

      const validCourses = classList?.filter((classListItem: ClassType) => {
        return courseIds?.includes(classListItem.id);
      });

      for (const classItem of classList) {
        if (courseIds.includes(classItem.id)) {
          if (classItem.enrolledUserIds.length < classItem.total) {
            classItem.enrolledUserIds = [
              ...new Set([...classItem.enrolledUserIds, response.user.id]),
            ];
          }
        }
      }

      response.user.enrolledCourses = [
        ...new Set([...response.user.enrolledCourses, ...validCourses]),
      ];

      return HttpResponse.json({}, { status: 201 });
    }
  ),

  http.get(`/classes/enroll`, async ({ cookies }) => {
    const response = getAuthUser(cookies);

    if (!response.user) {
      return HttpResponse.json({}, response);
    }

    return HttpResponse.json([...response.user.enrolledCourses], {
      status: 200,
    });
  }),

  http.get(`/classes/myCreated`, async ({ cookies }) => {
    const response = getAuthUser(cookies);

    if (!response.user) {
      return HttpResponse.json({}, response);
    }

    if (response.user.isTeacher) {
      return HttpResponse.json([...response.user.createdClasses], {
        status: 200,
      });
    }

    if (response.user.isStudent) {
      return HttpResponse.json(
        {
          message: '학생은 강의 개설 권한이 없습니다.',
        },
        { status: 200 }
      );
    }

    return HttpResponse.json({}, { status: 500 });
  }),

  http.post<never, Record<string, string>, JsonBodyType>(
    `/classes/create`,
    async ({ request, cookies }) => {
      const response = getAuthUser(cookies);

      if (!response.user) {
        return HttpResponse.json({}, response);
      }

      if (!response.user.isTeacher) {
        return HttpResponse.json({}, { status: 403 });
      }

      const classData = await request.json();

      if (
        classData['course-title'] &&
        classData['course-price'] &&
        classData['course-total']
      ) {
        // 강의 만들고 나서 유저 정보에 추가
        classList.push({
          id: response.user.id,
          title: classData['course-title'],
          price: Number(classData['course-price']),
          instructor: response.user.username,
          enrolledUserIds: [],
          total: Number(classData['course-total']),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        response.user.createdClasses.push({
          id: response.user.id,
          title: classData['course-title'],
          price: Number(classData['course-price']),
          instructor: response.user.username,
          enrolledUserIds: [],
          total: Number(classData['course-total']),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        return HttpResponse.json({}, { status: 201 });
      }

      return HttpResponse.json({}, { status: 400 });
    }
  ),
];

// 모든 핸들러 통합
export const handlers = [...userHandlers, ...classesHandlers];
