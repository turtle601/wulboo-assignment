import { classList } from '~/src/mocks/storage';

interface Params {
  limit: number;
  cursor?: string;
  createdAtSortBy?: string;
  enrollCountSortBy?: string;
  enrollRatioSortBy?: string;
}

export const generateClassListPaginationResponse = ({
  limit,
  cursor,
  enrollRatioSortBy,
  enrollCountSortBy,
  createdAtSortBy,
}: Params) => {
  // eslint-disable-next-line prefer-const
  let sortedClasses = [...classList];

  if (createdAtSortBy === 'new') {
    sortedClasses.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (enrollRatioSortBy === 'high') {
    sortedClasses.sort((a, b) => b.enrolled / b.total - a.enrolled / a.total);
  }

  if (enrollCountSortBy === 'desc') {
    sortedClasses.sort((a, b) => b.enrolled - a.enrolled);
  }

  let startIndex = 0;
  if (cursor) {
    const cursorIndex = sortedClasses.findIndex((item) => item.id === cursor);

    startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
  }

  const pageData = sortedClasses.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < sortedClasses.length;
  const nextCursor = hasMore ? pageData[pageData.length - 1]?.id : null;

  return {
    classes: pageData,
    hasMore,
    nextCursor,
  };
};

export function parseSortOrder(value: string | null): value is 'asc' | 'desc' {
  if (value === 'asc' || value === 'desc') {
    return true;
  }
  return false;
}

/**
 * URL 파라미터에서 받은 값을 'high' | 'low' 타입으로 안전하게 변환하는 타입가드 함수
 */
export function parseHighLowSort(
  value: string | null
): value is 'high' | 'low' {
  if (value === 'high' || value === 'low') {
    return true;
  }
  return false;
}

/**
 * URL 파라미터에서 받은 값을 'new' | 'old' 타입으로 안전하게 변환하는 타입가드 함수
 */
export function parseDateSort(value: string | null): value is 'new' | 'old' {
  if (value === 'new' || value === 'old') {
    return true;
  }
  return false;
}
