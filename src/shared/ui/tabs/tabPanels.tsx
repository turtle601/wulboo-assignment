import {
  Children,
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement,
  isValidElement,
  cloneElement,
} from 'react';

import { TabPanel } from '~/src/shared/ui/tabs/tabPanel';

const allocateTabPanelIdxForChildren = (
  children: ReactElement<typeof TabPanel>[]
) => {
  return Children.map(children, (child, idx) => {
    if (child.type !== TabPanel) {
      throw new Error(`자식 요소에는 탭 패널 컴포넌트만 올 수 있습니다.`);
    }
    if (!isValidElement<{ id: string }>(child)) return child;

    return cloneElement(child, {
      id: `${idx}`,
    });
  });
};

interface ITabPanelsProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactElement<typeof TabPanel>[];
}

export const TabPanels = forwardRef<HTMLDivElement, ITabPanelsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {allocateTabPanelIdxForChildren(children)}
      </div>
    );
  }
);

TabPanels.displayName = 'Tabs.TabPanels';
