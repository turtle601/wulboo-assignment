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
    {
      id,
      className,
      onClick,
      value,
      disabled,
      children,
      drawActiveStyle,
      ...props
    },
    ref
  ) => {
    const { activeIds, toggleId, name } = useCheckboxGroup();

    const isChecked = activeIds.includes(id);

    const handleClick = () => {
      if (disabled) return;

      toggleId?.(id);
      onClick?.(id);
    };

    return (
      <div className={cn('relative flex items-center justify-center')}>
        <input
          type="checkbox"
          className="sr-only"
          name={name}
          value={value}
          id={id}
          checked={isChecked}
          disabled={disabled}
          ref={ref}
          onChange={(e) => {
            e.preventDefault();
          }}
          {...props}
        />
        <button
          className={cn(
            'w-full transition-all duration-200',
            'disabled:opacity-80 disabled:cursor-not-allowed',
            'disabled:[&_*]:opacity-80 disabled:[&_*]:cursor-not-allowed',
            drawActiveStyle?.(isChecked),
            className
          )}
          disabled={disabled}
          onClick={handleClick}
        >
          {typeof children === 'function' ? children(isChecked) : children}
        </button>
      </div>
    );
  }
);

Button.displayName = 'CheckboxGroup.Button';
