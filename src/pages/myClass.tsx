'use client';

import { useEffect } from 'react';

import { GetEnrollClasses } from '~/src/features/classes/get-enroll-classes/getEnrollClasses';
import { GetMyCreatedClasses } from '~/src/features/classes/get-my-created-classes';

import { useCustomSearchParams } from '~/src/shared/hooks/useSearchParams';

import { Tabs } from '~/src/shared/ui/tabs';

export function MyClass() {
  const { setSearchParams, getSearchParams } = useCustomSearchParams();

  useEffect(() => {
    const tab = getSearchParams('tab');
    if (!tab) setSearchParams({ tab: '0' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectTab = (id: string) => {
    setSearchParams({ tab: id });
  };

  return (
    <>
      <Tabs.Provider defaultSelectedId={getSearchParams('tab')}>
        <div className="bg-gray-100 rounded-t-lg w-full">
          <Tabs.TabList className="list-none p-0 m-0 flex">
            <Tabs.Tab onClick={handleSelectTab}>수강한 강의</Tabs.Tab>
            <Tabs.Tab onClick={handleSelectTab}>개설한 강의</Tabs.Tab>
          </Tabs.TabList>
        </div>

        <Tabs.TabPanels className="bg-white rounded-b-lg border border-gray-200 p-6 h-[480px]">
          <Tabs.TabPanel className="space-y-4 h-full">
            <GetEnrollClasses />
          </Tabs.TabPanel>
          <Tabs.TabPanel className="space-y-4 h-full">
            <GetMyCreatedClasses />
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs.Provider>
    </>
  );
}
