import type { Meta, StoryObj } from '@storybook/nextjs';
import { ClassCard } from '~/src/entities/class/ui/classCard';
import { Course } from '../entities/class/ui/classCard';
import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';

const meta = {
  title: 'entities-ui/ClassCard',
  decorators: [
    (Story) => (
      <CheckboxGroup.Wrapper name="class-card">
        <Story />
      </CheckboxGroup.Wrapper>
    ),
  ],
} satisfies Meta<typeof ClassCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const course: Course = {
  id: '1',
  title: 'React 101',
  price: 100000,
  instructor: 'John Doe',
  enrolled: 10,
  total: 100,
};

// 기본 CheckboxGroup
export const Default: Story = {
  render: () => <ClassCard course={course} toggleCourse={() => {}} />,
};
