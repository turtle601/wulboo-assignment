import { forwardRef } from 'react';
import { useRadioGroup } from '~/src/shared/ui/radioGroup/wrapper';
import { cn } from '~/src/shared/utils/style';

interface OptionProps
  extends Omit<React.ComponentProps<'input'>, 'id' | 'onClick'> {
  id: string;
  onClick?: () => void;
}

export const Option = forwardRef<HTMLInputElement, OptionProps>(
  ({ className, id, value, children, onClick, ...props }, ref) => {
    const { activeId, onActiveChange, name } = useRadioGroup();

    const isChecked = activeId === id;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onActiveChange?.(id);
      onClick?.();
    };

    return (
      <div className="relative">
        <input
          type="radio"
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
        <button
          role="radio"
          aria-checked={isChecked}
          data-checked={isChecked}
          className={cn(
            'w-4 h-4 rounded-full border border-gray-400 cursor-pointer',
            'transition-all duration-200 flex items-center justify-center',
            isChecked && 'border-blue-500',
            className
          )}
          onClick={handleClick}
        >
          {isChecked && (
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          )}
          {children}
        </button>
      </div>
    );
  }
);

Option.displayName = 'RadioGroup.Option';
