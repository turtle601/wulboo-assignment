import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';

import { useTabsContext } from '~/src/shared/ui/tabs/provider';
import { cn } from '~/src/shared/utils/style';

interface ITabProps extends Omit<ComponentPropsWithoutRef<'li'>, 'onClick'> {
  id?: string;
  onClick?: (id: string) => void;
  drawSelectedStyle?: (
    isSelected: boolean
  ) => ComponentPropsWithoutRef<'li'>['className'];

  children: ReactNode;
}

export const Tab = forwardRef<HTMLLIElement, ITabProps>(
  ({ id, children, drawSelectedStyle, onClick, ...props }, ref) => {
    const { selectedId, setSelectedId } = useTabsContext();

    const isSelected = selectedId === id;

    const handleSelectTab = () => {
      if (id) {
        setSelectedId(id);
        onClick?.(id);
      }
    };

    return (
      <li
        ref={ref}
        onClick={handleSelectTab}
        className={cn(
          'w-full flex justify-center items-center px-6 py-4 cursor-pointer transition-all border-b-2',
          {
            'border-b-gray-900': isSelected,
            'border-b-transparent': !isSelected,
            'text-gray-900': isSelected,
            'text-gray-500': !isSelected,
            'font-medium': isSelected,
            'font-normal': !isSelected,
          },
          drawSelectedStyle?.(selectedId === id)
        )}
        {...props}
      >
        {children}
      </li>
    );
  }
);

Tab.displayName = 'Tabs.Tab';
