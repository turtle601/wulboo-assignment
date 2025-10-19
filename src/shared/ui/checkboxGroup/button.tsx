import { forwardRef } from 'react';
import { useCheckboxGroup } from '~/src/shared/ui/checkboxGroup/wrapper';

import { cn } from '~/src/shared/utils/style';

interface ButtonProps
  extends Omit<React.ComponentProps<'input'>, 'id' | 'onClick'> {
  id: string;
  onClick: (id: string) => void;
}

export const Button = forwardRef<HTMLInputElement, ButtonProps>(
  ({ className, id, onClick, value, ...props }, ref) => {
    const { activeIds, toggleId, name } = useCheckboxGroup();

    const isChecked = activeIds.includes(id);

    const handleClick = () => {
      toggleId?.(id);
      onClick?.(id);
    };

    return (
      <button
        role="checkbox"
        aria-checked={isChecked}
        data-checked={isChecked}
        className={cn(
          'w-5 h-5 rounded-md border border-gray-400 cursor-pointer',
          'transition-all duration-200 flex items-center justify-center',
          isChecked && 'bg-black border-black',
          className
        )}
        onClick={handleClick}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        )}
        <input
          type="checkbox"
          className="sr-only"
          name={name}
          value={value}
          id={id}
          checked={isChecked}
          ref={ref}
          onChange={(e) => {
            e.preventDefault();
          }}
          {...props}
        />
      </button>
    );
  }
);

Button.displayName = 'CheckboxGroup.Button';
