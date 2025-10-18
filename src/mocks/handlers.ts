import { http, HttpResponse, StrictRequest } from 'msw';
import { UserRequestBodyType } from '~/src/entities/user/api/create-user';
import { createUser } from '~/src/mocks/user/user';

// 사용자 관련 API 핸들러
export const userHandlers = [
  // 회원가입 요청 처리
  http.post(
    '/api/user',
    async ({ request }: { request: StrictRequest<UserRequestBodyType> }) => {
      const userData = await request.json();

      const status = createUser(userData);

      console.log(status, 'status');

      return HttpResponse.json(
        {},
        {
          status,
        }
      );
    }
  ),
];

// 모든 핸들러 통합
export const handlers = [...userHandlers];
