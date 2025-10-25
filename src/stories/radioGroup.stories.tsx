import type { Meta, StoryObj } from '@storybook/nextjs';

import { RadioGroup } from '~/src/shared/ui/radioGroup';

const meta = {
  title: 'shared-ui/RadioGroup',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 RadioGroup
export const Default: Story = {
  render: () => (
    <RadioGroup.Wrapper name="gender" defaultActiveId="male">
      <div className="space-y-2">
        <div className="flex gap-4">
          <RadioGroup.Label htmlFor="male">남성</RadioGroup.Label>
          <RadioGroup.Option id="male" value="male" />
          <RadioGroup.Label htmlFor="female">여성</RadioGroup.Label>
          <RadioGroup.Option id="female" value="female" />
        </div>
      </div>
    </RadioGroup.Wrapper>
  ),
};
