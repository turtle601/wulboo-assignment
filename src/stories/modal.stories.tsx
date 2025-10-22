import type { Meta, StoryObj } from '@storybook/nextjs';

import { Modal } from '~/src/shared/ui/modal';

const meta = {
  title: 'shared-ui/modal',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 CheckboxGroup
export const Default: Story = {
  render: () => (
    <>
      <Modal.Open
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        modalContent={
          <div className="w-[300px] h-[50px] flex items-center justify-between rounded-md p-4 bg-white">
            <div>모달 내용</div>
            <Modal.Close className="bg-red-500 text-white px-2 py-1 rounded-md">
              닫기
            </Modal.Close>
          </div>
        }
      >
        모달 열기 버튼
      </Modal.Open>
      <Modal.Root />
    </>
  ),
};
