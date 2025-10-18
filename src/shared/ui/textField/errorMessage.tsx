import { forwardRef } from 'react';
import { cn } from '~/src/shared/utils/style';

interface ErrorMessageProps extends React.ComponentProps<'div'> {
  isError: boolean;
  text: string;
}

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ isError, text, className, ...props }, ref) => {
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
