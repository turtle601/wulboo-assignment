import { forwardRef } from 'react';
import { cn } from '~/src/shared/utils/style';

interface InputProps extends React.ComponentProps<'input'> {
  isError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', isError = false, className, ...props }, ref) => {
    return (
      <input
        type={type}
        aria-invalid={isError}
        className={cn(
          'placeholder:text-muted-foreground focus-visible:outline-hidden container flex rounded-md file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed w-full bg-white py-4 font-normal border-[1px] border-solid border-[#f2f2f2] mb-2 h-[60px] px-[19.5px] pr-14 text-base aria-[invalid=true]:border-red-600 aria-[invalid=true]:border-[1px] aria-[invalid=true]:border-solid aria-[invalid=true]:bg-[#f2f2f2] disabled:bg-[#f2f2f2] disabled:font-normal disabled:text-black disabled:opacity-60',
          isError &&
            'aria-[invalid=true]:border-red-600 aria-[invalid=true]:border-[1px] aria-[invalid=true]:border-solid aria-[invalid=true]:bg-[#f2f2f2]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'TextField.Input';
