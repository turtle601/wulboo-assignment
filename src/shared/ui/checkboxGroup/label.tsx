'use client';

import { forwardRef } from 'react';
import { cn } from '~/src/shared/utils/style';

interface LabelProps extends React.ComponentProps<'label'> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, htmlFor, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('text-sm font-normal text-[#444]', className)}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'CheckboxGroup.Label';
