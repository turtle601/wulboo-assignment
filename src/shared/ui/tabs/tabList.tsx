import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  ReactElement,
} from 'react';

import { Tab } from '~/src/shared/ui/tabs/tab';

const allocateTabIdxForChildren = (children: ReactElement<typeof Tab>[]) => {
  return Children.map(children, (child, idx) => {
    if (child.type !== Tab) {
      throw new Error(`자식 요소에는 탭 컴포넌트만 올 수 있습니다.`);
    }
    if (!isValidElement<{ id: string }>(child)) return child;

    return cloneElement(child, {
      id: `${idx}`,
    });
  });
};

interface ITabListProps extends ComponentPropsWithoutRef<'ul'> {
  children: ReactElement<typeof Tab>[];
}

export const TabList = forwardRef<HTMLUListElement, ITabListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <ul ref={ref} className={className} {...props}>
        {allocateTabIdxForChildren(children)}
      </ul>
    );
  }
);

TabList.displayName = 'Tabs.TabList';
