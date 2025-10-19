import { forwardRef } from 'react';
import { useCheckboxGroup } from '~/src/shared/ui/checkboxGroup/wrapper';

import { cn } from '~/src/shared/utils/style';

interface ButtonProps
  extends Omit<React.ComponentProps<'input'>, 'id' | 'onClick'> {
  id: string;
  onClick: (id: string) => void;
  drawActiveStyle?: (
    isChecked: boolean
  ) => React.ComponentProps<'button'>['className'];
}

export const Button = forwardRef<HTMLInputElement, ButtonProps>(
  (
    { id, className, onClick, value, children, drawActiveStyle, ...props },
    ref
  ) => {
    const { activeIds, toggleId, name } = useCheckboxGroup();

    const isChecked = activeIds.includes(id);

    const handleClick = () => {
      toggleId?.(id);
      onClick?.(id);
    };

    return (
      <div className="relative flex items-center justify-center">
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
        <button
          className={cn(className, drawActiveStyle?.(isChecked))}
          onClick={handleClick}
        >
          {children}
        </button>
      </div>
    );
  }
);

Button.displayName = 'CheckboxGroup.Button';
