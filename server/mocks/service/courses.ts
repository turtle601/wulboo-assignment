// mocks/service/courses.ts

import { ClassItem } from '~/server/mocks/storage';

/**
 * GET /api/classes의 쿼리 파라미터 유효성을 검사합니다.
 * 실제로는 limit, cursor, filter 등의 형식을 검사해야 합니다.
 */
export function checkCourseFilterParams(
  query: Record<string, string>
): boolean {
  // 예시: limit이 있다면 숫자로 변환 가능한지 확인
  if (query.limit && isNaN(parseInt(query.limit))) {
    return false;
  }
  return true;
}

export function filterCreatedAtSortBy(filter: string, classList: ClassItem[]) {
  if (filter === 'createdAtSortBy') {
    classList.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // 최신순
  }
}

export function filterEnrollCountSortBy(
  filter: string,
  classList: ClassItem[]
) {
  if (filter === 'enrollCountSortBy') {
    classList.sort(
      (a, b) => b.enrolledUserIds.length - a.enrolledUserIds.length
    ); // 수강생 많은 순
  }
}

export function filterEnrollRatioSortBy(
  filter: string,
  classList: ClassItem[]
) {
  if (filter === 'enrollRatioSortBy') {
    classList.sort((a, b) => {
      const ratioA = a.total > 0 ? a.enrolledUserIds.length / a.total : 0;
      const ratioB = b.total > 0 ? b.enrolledUserIds.length / b.total : 0;
      return ratioB - ratioA; // 등록 비율 높은 순
    });
  }
}

/**
 * 배열을 기반으로 페이지네이션을 처리합니다.
 */
export function filterPagination({
  courseList,
  limit,
  cursor,
}: {
  courseList: ClassItem[];
  limit: number;
  cursor?: string;
}): { courseList: ClassItem[]; nextCursor: string | null } {
  let startIndex = 0;

  // 커서 기반 페이지네이션
  if (cursor) {
    const cursorIndex = courseList.findIndex((cls) => cls.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex + 1;
    }
  }

  const endIndex = startIndex + limit;
  const paginatedList = courseList.slice(startIndex, endIndex);

  // 다음 커서 설정: 다음 페이지의 첫 번째 요소 ID
  const nextItem = courseList[endIndex];
  const nextCursor = nextItem ? nextItem.id : null;

  return {
    courseList: paginatedList,
    nextCursor,
  };
}
