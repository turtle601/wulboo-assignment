import { ClassContentUI } from '~/src/entities/class/ui/classContentUI';
import { Card } from '~/src/shared/ui/card';

import { useGetMyCreatedClasses } from '~/src/entities/class/get-my-created-classes';

export function GetMyCreatedClasses() {
  const { data: myCreatedClasses } = useGetMyCreatedClasses();

  if (myCreatedClasses && 'message' in myCreatedClasses) {
    return <div>{myCreatedClasses.message}</div>;
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
