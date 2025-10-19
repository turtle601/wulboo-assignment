import { ClassType } from '~/src/mocks/storage';
import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';
import { cn } from '~/src/shared/utils/style';

interface ClassCardProps {
  name: string;
  course: ClassType;
  toggleCourse: (course: ClassType) => void;
}

export function ClassCard({ name, course, toggleCourse }: ClassCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };

  return (
    <CheckboxGroup.Button
      name={name}
      id={course.id}
      value={course.id}
      drawActiveStyle={(isChecked) => {
        return cn(
          'border w-full',
          isChecked
            ? 'border-blue-500 shadow-md'
            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
        );
      }}
      onClick={() => toggleCourse(course)}
    >
      <div className="flex items-start gap-3 p-4 cursor-pointer">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-0.5">
          <CheckboxGroup.Icon
            id={course.id}
            drawActiveStyle={(isChecked) => {
              return cn(
                'border',
                isChecked
                  ? 'border-blue-500 border-blue-500'
                  : 'bg-white border-gray-300'
              );
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
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
              <span className="text-gray-600">수강인원</span>
              <span className={`font-bold 'text-blue-600'`}>
                {course.enrolled}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{course.total}</span>
            </div>
          </div>
        </div>
      </div>
    </CheckboxGroup.Button>
  );
}
