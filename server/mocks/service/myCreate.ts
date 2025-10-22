export const checkMyCreateClassBodyData = (
  courseData: Record<string, string>
) => {
  return (
    courseData['course-title'] &&
    courseData['course-price'] &&
    courseData['course-total']
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

  return {
    id,
    title: courseData['course-title'],
    price: Number(courseData['course-price']),
    instructor: username,
    enrolledUserIds: [],
    total: Number(courseData['course-total']),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
