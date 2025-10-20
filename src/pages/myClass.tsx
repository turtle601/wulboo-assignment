'use client';

import { useEffect } from 'react';
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
            <h3 className="text-xl font-semibold text-gray-800">강의 관리</h3>
            <p className="text-gray-600">
              강의 목록을 확인하고 새로운 강의를 생성할 수 있습니다.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800 text-sm">
                현재 등록된 강의가 3개 있습니다.
              </p>
            </div>
          </Tabs.TabPanel>

          <Tabs.TabPanel className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">과제 관리</h3>
            <p className="text-gray-600">
              학생들의 과제를 관리하고 평가할 수 있습니다.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800 text-sm">
                제출 대기 중인 과제가 5개 있습니다.
              </p>
            </div>
          </Tabs.TabPanel>

          <Tabs.TabPanel className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">조편성</h3>
            <p className="text-gray-600">
              학생들을 조로 나누어 팀 프로젝트를 관리합니다.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-purple-800 text-sm">
                총 4개의 조가 구성되어 있습니다.
              </p>
            </div>
          </Tabs.TabPanel>
        </Tabs.TabPanels>
      </Tabs.Provider>
    </>
  );
}
