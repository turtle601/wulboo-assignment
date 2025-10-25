import { TabsProvider } from '~/src/shared/ui/tabs/provider';
import { Tab } from '~/src/shared/ui/tabs/tab';
import { TabList } from '~/src/shared/ui/tabs/tabList';
import { TabPanel } from '~/src/shared/ui/tabs/tabPanel';
import { TabPanels } from '~/src/shared/ui/tabs/tabPanels';

export const Tabs = {
  Provider: TabsProvider,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} as const;
