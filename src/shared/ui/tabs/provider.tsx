import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ITabsContextProps {
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const TabsContext: Context<ITabsContextProps | null> =
  createContext<ITabsContextProps | null>(null);

export const useTabsContext = () => {
  const state = useContext(TabsContext);
  if (state === null) throw new Error('Cannot find TabsContext');
  return state;
};

interface ITabsProviderProps {
  children: React.ReactNode;
  defaultSelectedId?: string;
}

export function TabsProvider({
  children,
  defaultSelectedId = '0',
}: ITabsProviderProps) {
  const [selectedId, setSelectedId] = useState(defaultSelectedId);

  return (
    <TabsContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </TabsContext.Provider>
  );
}
