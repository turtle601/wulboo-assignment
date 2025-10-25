import { cn } from '~/src/shared/utils/style';

export function Spinner() {
  return (
    <div
      className={cn(
        `w-10 h-10 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500`
      )}
    ></div>
  );
}
