import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { useTabsContext } from '~/src/shared/ui/tabs/provider';

interface ITabPanelProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export const TabPanel = forwardRef<HTMLDivElement, ITabPanelProps>(
  ({ id, className, children, ...props }, ref) => {
    const { selectedId } = useTabsContext();

    const isSelected = id === selectedId;

    return (
      isSelected && (
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      )
    );
  }
);

TabPanel.displayName = 'Tabs.TabPanel';
