import { Card } from '~/src/shared/ui/card';

import type { ClassType } from '~/server/mocks/storage';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
};

interface ClassContentUIProps {
  course: ClassType;
}

export function ClassContentUI({ course }: ClassContentUIProps) {
  const isFull = course.enrolledUserIds.length >= course.total;

  return (
    <Card.content>
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-gray-900 leading-snug">
            {course.title}
          </h3>
          <span className="text-lg font-bold text-gray-900 flex-shrink-0">
            {formatPrice(course.price)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <span>강사:</span>
            <span className="font-medium text-gray-800">
              {course.instructor}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* 수강 마감 표시 */}
            {isFull ? (
              <span className="ml-2 px-2 py-1 text-xs font-medium text-orange-900 bg-orange-200 rounded-full">
                수강 마감
              </span>
            ) : (
              <>
                <span className="text-gray-600">수강인원</span>
                <span className="font-bold text-blue-600">
                  {course.enrolledUserIds.length}
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{course.total}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card.content>
  );
}
