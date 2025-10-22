import { http, HttpResponse, JsonBodyType, StrictRequest } from 'msw';

import { UserRequestBodyType } from '~/src/entities/user/api/create-user';

import { classList } from '~/server/mocks/storage';

import { enrollCourses } from '~/server/mocks/service/enroll';
import {
  checkMyCreateClassBodyData,
  makeClassData,
} from '~/server/mocks/service/myCreate';
import { createUser, getAuthUser } from '~/server/mocks/service/user';
import {
  checkCourseFilterParams,
  filterCreatedAtSortBy,
  filterEnrollCountSortBy,
  filterEnrollRatioSortBy,
  filterPagination,
} from '~/server/mocks/service/courses';

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

      try {
        return HttpResponse.json(
          {},
          {
            status: response.status,
            headers: { 'Set-Cookie': `authToken=${response.user.id}` },
          }
        );
      } catch (error: unknown) {
        return HttpResponse.json({ error }, { status: 500 });
      }
    }
  ),
];

export const classesHandlers = [
  http.get(`/classList`, async ({ request }) => {
    const url = new URL(request.url);

    if (!checkCourseFilterParams(url))
      return HttpResponse.json({}, { status: 400 });

    const sortedClasses = [...classList];
    const filterParams = url.searchParams.get('filter');

    filterCreatedAtSortBy(filterParams, sortedClasses);
    filterEnrollCountSortBy(filterParams, sortedClasses);
    filterEnrollRatioSortBy(filterParams, sortedClasses);

    const response = filterPagination({
      courseList: sortedClasses,
      limit: parseInt(url.searchParams.get('limit') ?? '10'),
      cursor: url.searchParams.get('cursor') || undefined,
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

      enrollCourses({ courseIds: await request.json(), user: response.user });

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

      if (checkMyCreateClassBodyData(classData)) {
        const newClass = makeClassData({
          courseData: classData,
          username: response.user.username,
        });

        classList.push(newClass);
        response.user.createdClasses.push(newClass);

        return HttpResponse.json({}, { status: 201 });
      }

      return HttpResponse.json({}, { status: 400 });
    }
  ),
];

// 모든 핸들러 통합
export const handlers = [...userHandlers, ...classesHandlers];
