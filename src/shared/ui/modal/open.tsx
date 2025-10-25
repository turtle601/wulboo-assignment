import { cn } from '~/src/shared/utils/style';

import { useModalStore } from './store';

interface OpenProps extends Omit<React.ComponentProps<'button'>, 'onClick'> {
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  modalContent: React.ReactNode;
}

export function Open({
  onClick,
  modalContent,
  children,
  className,
  ...props
}: OpenProps) {
  const { openModal } = useModalStore();

  const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
    openModal(modalContent);
    onClick?.(event);
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
