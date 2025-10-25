import { ClassContentUI } from '~/src/entities/class/ui/classContentUI';
import { Card } from '~/src/shared/ui/card';

import { useGetMyCreatedClasses } from '~/src/entities/class/my/get-my-created-classes';

export function MyCreatedClasses() {
  const { data: myCreatedClasses } = useGetMyCreatedClasses();

  if (myCreatedClasses && 'message' in myCreatedClasses) {
    return <div>{myCreatedClasses.message}</div>;
  }

  if (!myCreatedClasses || myCreatedClasses.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px] w-full">
        개설한 강의가 없습니다.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex flex-col gap-4">
        {myCreatedClasses?.map((classItem) => (
          <Card.wrapper key={classItem.id}>
            <ClassContentUI course={classItem} />
          </Card.wrapper>
        ))}
      </div>
    </div>
  );
}
