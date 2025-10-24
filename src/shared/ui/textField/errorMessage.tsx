import { forwardRef } from 'react';
import { cn } from '~/src/shared/utils/style';

interface ErrorMessageProps extends React.ComponentProps<'div'> {
  text: string;
}

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ text, className, ...props }, ref) => {
    const isError = text.length > 0;

    return (
      <div
        className={cn('text-sm font-normal text-red-500 h-[20px]', className)}
        ref={ref}
        {...props}
      >
        {isError && text}
      </div>
    );
  }
);

ErrorMessage.displayName = 'TextField.ErrorMessage';
