import { ClassContentUI } from '~/src/entities/class/ui/classContentUI';
import { Card } from '~/src/shared/ui/card';

import { useGetMyCreatedClasses } from '~/src/entities/class/my/get-my-created-classes';

export function MyCreatedClasses() {
  const { data: myCreatedClasses } = useGetMyCreatedClasses();

  if (myCreatedClasses && 'message' in myCreatedClasses) {
    return <div>{myCreatedClasses.message}</div>;
  }

  if (!myCreatedClasses || myCreatedClasses.length === 0) {
    return <div>등록한 강의가 없습니다.</div>;
  }

  return (
    <>
      <ul>
        {myCreatedClasses?.map((classItem) => (
          <Card.wrapper key={classItem.id}>
            <Card.content>
              <ClassContentUI course={classItem} />
            </Card.content>
          </Card.wrapper>
        ))}
      </ul>
    </>
  );
}
