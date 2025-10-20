import { Context, createContext, useContext, useState } from 'react';

interface ITabsContextProps {
  selectedId: string;
  selectTab: (id: string) => void;
}

const TabsContext: Context<ITabsContextProps | null> =
  createContext<ITabsContextProps | null>(null);

export const useTabsContext = () => {
  const state = useContext(TabsContext);
  if (state === null) throw new Error('Cannot find TabsContext');
  return state;
};

const useTabs = () => {
  const [selectedId, setSelectedId] = useState('0');

  const selectTab = (id: string) => {
    setSelectedId(id);
  };

  return {
    selectedId,
    selectTab,
  };
};

interface ITabsProviderProps {
  children: React.ReactNode;
}

export function TabsProvider({ children }: ITabsProviderProps) {
  const { selectedId, selectTab } = useTabs();

  return (
    <TabsContext.Provider value={{ selectedId, selectTab }}>
      {children}
    </TabsContext.Provider>
  );
}
