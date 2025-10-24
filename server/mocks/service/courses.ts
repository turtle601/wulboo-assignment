import { ClassType, UserType } from '~/server/mocks/storage';

export const checkCourseFilterParams = (
  searchParams: Record<string, string>
) => {
  return Object.entries(searchParams)
    .filter(([key]) => {
      return !['limit', 'cursor'].includes(key);
    })
    .every(([key, value]) => {
      return (
        ['filter'].includes(key) &&
        ['createdAtSortBy', 'enrollCountSortBy', 'enrollRatioSortBy'].includes(
          value
        )
      );
    });
};

export const filterCreatedAtSortBy = (
  filterParams: string | null,
  courseList: ClassType[]
) => {
  if (filterParams === 'createdAtSortBy') {
    courseList.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
};

export const filterEnrollCountSortBy = (
  filterParams: string | null,
  courseList: ClassType[]
) => {
  if (filterParams === 'enrollCountSortBy') {
    courseList.sort((a, b) => {
      return b.enrolledUserIds.length - a.enrolledUserIds.length;
    });
  }
};

export const filterEnrollRatioSortBy = (
  filterParams: string | null,
  courseList: ClassType[]
) => {
  if (filterParams === 'enrollRatioSortBy') {
    courseList.sort((a, b) => {
      return (
        b.enrolledUserIds.length / b.total - a.enrolledUserIds.length / a.total
      );
    });
  }
};

export const checkMyCreated = (classItem: ClassType, user: UserType) => {
  return classItem.instructor === user.username;
};

export const checkMyEnrolled = (classItem: ClassType, user: UserType) => {
  return classItem.enrolledUserIds.includes(user.id);
};

export const filterPagination = ({
  courseList,
  limit,
  cursor,
}: {
  courseList: ClassType[];
  limit: number;
  cursor?: string;
}) => {
  let startIndex = 0;
  if (cursor) {
    const cursorIndex = courseList.findIndex((item) => item.id === cursor);

    startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
  }

  const pageData = courseList.slice(startIndex, startIndex + limit);
  const hasMore = startIndex + limit < courseList.length;
  const nextCursor = hasMore ? pageData[pageData.length - 1]?.id : null;

  return {
    classes: pageData,
    hasMore,
    nextCursor,
  };
};
