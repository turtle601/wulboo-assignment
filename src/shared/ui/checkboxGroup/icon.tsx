import { forwardRef } from 'react';
import { useCheckboxGroup } from '~/src/shared/ui/checkboxGroup/wrapper';
import { cn } from '~/src/shared/utils/style';

interface IconProps
  extends Omit<React.ComponentProps<'div'>, 'id' | 'className'> {
  id: string;
  drawActiveStyle?: (
    isChecked: boolean
  ) => React.ComponentProps<'button'>['className'];
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ id, drawActiveStyle, ...props }, ref) => {
    const { activeIds } = useCheckboxGroup();

    const isChecked = activeIds.includes(id);

    return (
      <div
        ref={ref}
        role="checkbox"
        aria-checked={isChecked}
        data-checked={isChecked}
        className={cn(
          'w-5 h-5 rounded-md border border-gray-400 cursor-pointer',
          'transition-all duration-200 flex items-center justify-center',
          isChecked && 'bg-blue-500 border-blue-500',
          drawActiveStyle?.(isChecked)
        )}
        {...props}
      >
        {isChecked && (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
        )}
      </div>
    );
  }
);

Icon.displayName = 'Icon';
