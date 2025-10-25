import { classStorage, UserItem, userStorage } from '~/server/mocks/storage';

export const enrollCourses = ({
  courseIds,
  user,
}: {
  courseIds: string[];
  user: UserItem;
}) => {
  courseIds.forEach((courseId) => {
    const classList = classStorage.getClassList();
    const classItem = classList.find((item) => item.id === courseId);

    if (classItem && classItem.enrolledUserIds.length < classItem.total) {
      if (!classItem.enrolledUserIds.includes(user.id)) {
        classStorage.addEnrolledUserId(courseId, user.id);

        user.addEnrolledCourseId(courseId);
        userStorage.setUser(user);
      }
    }
  });
};
