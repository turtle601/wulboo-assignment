import { useGetMyEnrolledClasses } from '~/src/entities/class/get-my-enrolled-classes';

import { ClassCard2 } from '~/src/entities/class/ui/classCard2';

export function GetEnrollClasses() {
  const { data: enrolledClasses } = useGetMyEnrolledClasses();

  if (!enrolledClasses || enrolledClasses.length === 0) {
    return <div>등록된 강의가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {enrolledClasses?.map((classItem) => (
        <ClassCard2 key={classItem.id} course={classItem} />
      ))}
    </ul>
  );
}
