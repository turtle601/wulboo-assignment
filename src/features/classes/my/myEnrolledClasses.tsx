import { useGetMyEnrolledClasses } from '~/src/entities/class/my/get-my-enrolled-classes';

import { ClassContentUI } from '~/src/entities/class/ui/classContentUI';
import { Card } from '~/src/shared/ui/card';

export function MyEnrolledClasses() {
  const { data: enrolledClasses } = useGetMyEnrolledClasses();

  if (!enrolledClasses || (enrolledClasses && enrolledClasses.length === 0)) {
    return (
      <div className="flex justify-center items-center h-[400px] w-full">
        수강한 강의가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <ul>
        {enrolledClasses?.map((classItem) => (
          <Card.wrapper key={classItem.id}>
            <ClassContentUI course={classItem} />
          </Card.wrapper>
        ))}
      </ul>
    </div>
  );
}
