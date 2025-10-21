import { useGetMyEnrolledClasses } from '~/src/entities/class/get-my-enrolled-classes';

import { ClassContentUI } from '~/src/entities/class/ui/classContentUI';
import { Card } from '~/src/shared/ui/card';

export function GetEnrollClasses() {
  const { data: enrolledClasses } = useGetMyEnrolledClasses();

  if (!enrolledClasses || enrolledClasses.length === 0) {
    return <div>등록된 강의가 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {enrolledClasses?.map((classItem) => (
        <Card.wrapper key={classItem.id}>
          <ClassContentUI course={classItem} />
        </Card.wrapper>
      ))}
    </ul>
  );
}
