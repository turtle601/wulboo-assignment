import { ClassItem } from '~/server/mocks/storage';
import { formatNumber } from '~/src/shared/ui/textField/numberInput';

export const checkMyCreateClassBodyData = (
  courseData: Record<string, string>
) => {
  return (
    courseData['course-title'] &&
    courseData['course-price'] &&
    courseData['course-enrolled-total']
  );
};

export const makeClassData = ({
  courseData,
  username,
}: {
  courseData: Record<string, string>;
  username: string;
}) => {
  const id = new Date().getTime().toString();

  const classData = {
    id,
    title: courseData['course-title'],
    price: parseInt(formatNumber(courseData['course-price'])) || 0,
    instructor: username,
    enrolledUserIds: [],
    total: parseInt(formatNumber(courseData['course-enrolled-total'])) || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return new ClassItem(classData);
};
