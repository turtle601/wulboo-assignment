import Link from 'next/link';
import { useGetMyCreatedClasses } from '~/src/entities/class/get-my-created-classes';

import { ClassCard2 } from '~/src/entities/class/ui/classCard2';

export function GetMyCreatedClasses() {
  const { data: myCreatedClasses } = useGetMyCreatedClasses();

  if (myCreatedClasses && 'message' in myCreatedClasses) {
    return <div>{myCreatedClasses.message}</div>;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link
          href="/myClass/create"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          + 강의 개설하기
        </Link>
      </div>
      <ul>
        {myCreatedClasses?.map((classItem) => (
          <ClassCard2 key={classItem.id} course={classItem} />
        ))}
      </ul>
    </>
  );
}
