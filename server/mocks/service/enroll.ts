import { classList, ClassType, UserType } from '~/server/mocks/storage';

export const enrollCourses = ({
  courseIds,
  user,
}: {
  courseIds: string[];
  user: UserType;
}) => {
  const validCourses = classList?.filter((classListItem: ClassType) => {
    return courseIds?.includes(classListItem.id);
  });

  for (const classItem of classList) {
    if (courseIds.includes(classItem.id)) {
      if (classItem.enrolledUserIds.length < classItem.total) {
        classItem.enrolledUserIds = [
          ...new Set([...classItem.enrolledUserIds, user.id]),
        ];
      }
    }
  }

  user.enrolledCourses = [
    ...new Set([...user.enrolledCourses, ...validCourses]),
  ];
};
