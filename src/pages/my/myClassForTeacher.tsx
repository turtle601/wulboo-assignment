'use client';

import { Suspense } from 'react';
import {
  MyCreatedClasses,
  MyEnrolledClasses,
  useMySearchParams,
} from '~/src/features/classes/my';
import { Spinner } from '~/src/shared/ui/spinner';
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

        <Tabs.TabPanels className="bg-white rounded-b-lg border border-gray-200 p-6 h-[480px]">
          <Tabs.TabPanel className="space-y-4 h-full">
            <MyEnrolledClasses />
          </Tabs.TabPanel>
          <Tabs.TabPanel className="space-y-4 h-full">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full w-full">
                  <Spinner />
                </div>
              }
            >
              <MyCreatedClasses />
            </Suspense>
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs.Provider>
    </>
  );
}
