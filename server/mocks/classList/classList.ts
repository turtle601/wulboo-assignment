import { classList } from '~/server/mocks/storage';

interface Params {
  limit: number;
  cursor?: string;
  filterParams: string | null;
}

export const generateClassListPaginationResponse = ({
  limit,
  cursor,
  filterParams,
}: Params) => {
  const sortedClasses = [...classList];

  if (filterParams === 'createdAtSortBy') {
    sortedClasses.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  if (filterParams === 'enrollCountSortBy') {
    sortedClasses.sort(
      (a, b) => b.enrolledUserIds.length - a.enrolledUserIds.length
    );
  }

  if (filterParams === 'enrollRatioSortBy') {
    sortedClasses.sort(
      (a, b) =>
        b.enrolledUserIds.length / b.total - a.enrolledUserIds.length / a.total
    );
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
