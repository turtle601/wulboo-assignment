import { cn } from '~/src/shared/utils/style';

interface WrapperProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export function Wrapper({ children, className, ...props }: WrapperProps) {
  return (
    <div
      className={cn(
        'border w-full flex items-start gap-3 p-4 cursor-pointer border-gray-200 hover:border-gray-300 hover:shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
