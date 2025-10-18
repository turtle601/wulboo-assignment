import type { Meta, StoryObj } from '@storybook/nextjs';

import { TextField } from '~/src/shared/ui/textField';

const meta = {
  title: 'shared-ui/TextField',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTextField: Story = {
  render: () => (
    <div className="w-80">
      <TextField.label htmlFor="email">Email</TextField.label>
      <TextField.input
        id="email"
        placeholder="email@example.com"
        type="email"
      />
      <TextField.errorMessage
        text="올바른 이메일 형식을 입력해주세요"
        isError={false}
      />
    </div>
  ),
};

// 에러가 있는 TextField
export const DefaultTextFieldWithError: Story = {
  render: () => (
    <div className="w-80">
      <TextField.label htmlFor="email-error">Email</TextField.label>
      <TextField.input
        id="email-error"
        placeholder="email@example.com"
        type="email"
        isError={true}
      />
      <TextField.errorMessage
        text="올바른 이메일 형식을 입력해주세요"
        isError={true}
      />
    </div>
  ),
};

export const HorizontalTextField: Story = {
  render: () => (
    <div className="w-80 flex gap-2 items-center">
      <TextField.label htmlFor="email-error">Email</TextField.label>
      <TextField.input
        id="email-error"
        placeholder="email@example.com"
        type="email"
      />
    </div>
  ),
};
