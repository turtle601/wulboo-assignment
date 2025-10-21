import { forwardRef } from 'react';
import { useCheckboxGroup } from '~/src/shared/ui/checkboxGroup/wrapper';

import { cn } from '~/src/shared/utils/style';

export interface CheckboxGroupButtonProps
  extends Omit<React.ComponentProps<'input'>, 'id' | 'onClick' | 'children'> {
  id: string;
  onClick?: (id: string) => void;
  children: React.ReactNode | ((isChecked: boolean) => React.ReactNode);
  drawActiveStyle?: (
    isChecked: boolean
  ) => React.ComponentProps<'button'>['className'];
}

export const Button = forwardRef<HTMLInputElement, CheckboxGroupButtonProps>(
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
          {typeof children === 'function' ? children(isChecked) : children}
        </button>
      </div>
    );
  }
);

Button.displayName = 'CheckboxGroup.Button';
