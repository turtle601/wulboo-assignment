import { useEnrollClasses } from '~/src/entities/class/enroll-classes';

interface CreateEnrollClassesButtonProps {
  selectedCourseIds: string[];
}

export function CreateEnrollClassesButton({
  selectedCourseIds,
}: CreateEnrollClassesButtonProps) {
  const { mutate: createEnrollClasses } = useEnrollClasses();

  const handleCreateEnrollClasses = () => {
    if (selectedCourseIds.length > 0) {
      createEnrollClasses({ courseIds: selectedCourseIds });
    }
  };

  return (
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
      disabled={selectedCourseIds.length === 0}
      onClick={handleCreateEnrollClasses}
    >
      {`${selectedCourseIds.length}개 수강하기`}
    </button>
  );
}
