'use client';

import {
  MyCreatedClasses,
  MyEnrolledClasses,
  useMySearchParams,
} from '~/src/features/classes/my';

import { Tabs } from '~/src/shared/ui/tabs';

export function MyClassForTeacher() {
  const { tabSearchParams, setSearchParams } = useMySearchParams();

  const handleSelectTab = (id: string) => {
    setSearchParams({ tab: id });
  };

  return (
    <>
      <Tabs.Provider defaultSelectedId={tabSearchParams}>
        <div className="bg-gray-100 rounded-t-lg w-full">
          <Tabs.TabList className="list-none p-0 m-0 flex">
            <Tabs.Tab onClick={handleSelectTab}>수강한 강의</Tabs.Tab>
            <Tabs.Tab onClick={handleSelectTab}>개설한 강의</Tabs.Tab>
          </Tabs.TabList>
        </div>

        <Tabs.TabPanels className="bg-white rounded-b-lg border border-gray-200 p-6 h-[424px] overflow-auto">
          <Tabs.TabPanel className="h-full">
            <MyEnrolledClasses />
          </Tabs.TabPanel>
          <Tabs.TabPanel className="h-full">
            <MyCreatedClasses />
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs.Provider>
    </>
  );
}
