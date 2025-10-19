import { classList } from '~/src/mocks/storage';

interface Params {
  createdAtSortBy: 'new' | 'old';
  enrollCountSortBy: 'asc' | 'desc';
  enrollRatioSortBy: 'high' | 'low';
}

export const generateClassListPaginationResponse = ({
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
    sortedClasses.sort((a, b) => b.currentApplicants - a.currentApplicants);
  }

  if (enrollCountSortBy === 'desc') {
    sortedClasses.sort((a, b) => b.currentApplicants - a.currentApplicants);
  }

  return {
    classes: sortedClasses,
    // pagination: {
    //   currentPage: page,
    //   totalPages: Math.ceil(classList.length / limit),
    //   totalCount: classList.length,
    //   hasMore: endIndex < classList.length,
    //   limit,
    // },
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
