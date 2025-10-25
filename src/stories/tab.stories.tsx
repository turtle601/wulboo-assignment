import { Tabs } from '~/src/shared/ui/tabs';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Tabs.Provider> = {
  title: 'shared-ui/Tabs',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs.Provider>
      <div className="bg-gray-100 rounded-t-lg w-full">
        <Tabs.TabList className="list-none p-0 m-0 flex">
          <Tabs.Tab>강의</Tabs.Tab>
          <Tabs.Tab>과제 관리</Tabs.Tab>
          <Tabs.Tab>조편성</Tabs.Tab>
        </Tabs.TabList>
      </div>

      <Tabs.TabPanels className="bg-white rounded-b-lg border border-gray-200 p-6 min-h-[200px]">
        <Tabs.TabPanel className="space-y-4">
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
  ),
};
