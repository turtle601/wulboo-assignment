import { cn } from '~/src/shared/utils/style';

import { useModalStore } from './store';

interface CloseProps extends Omit<React.ComponentProps<'button'>, 'onClick'> {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Close({ onClick, children, className, ...props }: CloseProps) {
  const { closeModal } = useModalStore();

  const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    closeModal();
  };

  return (
    <button
      onClick={handleClick}
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </button>
  );
}
