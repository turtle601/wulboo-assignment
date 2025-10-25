import type { Meta, StoryObj } from '@storybook/nextjs';

import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';

const meta = {
  title: 'shared-ui/CheckboxGroup',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 CheckboxGroup
export const Default: Story = {
  render: () => (
    <CheckboxGroup.Wrapper name="interests">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <CheckboxGroup.Button
            id="reading"
            value="reading"
            onClick={(id) => console.log('Selected:', id)}
            className="w-5 h-5"
          >
            <CheckboxGroup.Icon id="reading" />
          </CheckboxGroup.Button>
          <CheckboxGroup.Label htmlFor="reading">독서</CheckboxGroup.Label>
        </div>
        <div className="flex items-center gap-3">
          <CheckboxGroup.Button
            id="music"
            value="music"
            onClick={(id) => console.log('Selected:', id)}
          >
            <CheckboxGroup.Icon id="music" />
          </CheckboxGroup.Button>
          <CheckboxGroup.Label htmlFor="music">음악 감상</CheckboxGroup.Label>
        </div>
        <div className="flex items-center gap-3">
          <CheckboxGroup.Button
            id="sports"
            value="sports"
            onClick={(id) => console.log('Selected:', id)}
          >
            <CheckboxGroup.Icon id="sports" />
          </CheckboxGroup.Button>

          <CheckboxGroup.Label htmlFor="sports">운동</CheckboxGroup.Label>
        </div>
      </div>
    </CheckboxGroup.Wrapper>
  ),
};

// // 여러 항목 선택 가능한 CheckboxGroup
// export const MultipleSelection: Story = {
//   render: () => (
//     <CheckboxGroup.Wrapper name="hobbies">
//       <div className="space-y-3">
//         <h3 className="text-lg font-semibold mb-4">
//           취미를 선택해주세요 (복수 선택 가능)
//         </h3>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="travel"
//             value="travel"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="travel">여행</CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="cooking"
//             value="cooking"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="cooking">요리</CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="photography"
//             value="photography"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="photography">
//             사진 촬영
//           </CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="gaming"
//             value="gaming"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="gaming">게임</CheckboxGroup.Label>
//         </div>
//       </div>
//     </CheckboxGroup.Wrapper>
//   ),
// };

// // 미리 선택된 항목이 있는 CheckboxGroup
// export const PreSelected: Story = {
//   render: () => (
//     <CheckboxGroup.Wrapper name="skills">
//       <div className="space-y-3">
//         <h3 className="text-lg font-semibold mb-4">보유 기술</h3>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="javascript"
//             value="javascript"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="javascript">
//             JavaScript
//           </CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="typescript"
//             value="typescript"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="typescript">
//             TypeScript
//           </CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="react"
//             value="react"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="react">React</CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="nodejs"
//             value="nodejs"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="nodejs">Node.js</CheckboxGroup.Label>
//         </div>
//       </div>
//     </CheckboxGroup.Wrapper>
//   ),
// };

// // 컴팩트한 레이아웃의 CheckboxGroup
// export const Compact: Story = {
//   render: () => (
//     <CheckboxGroup.Wrapper name="preferences">
//       <div className="space-y-2">
//         <div className="flex items-center gap-2">
//           <CheckboxGroup.Button
//             id="notifications"
//             value="notifications"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="notifications">
//             알림 수신
//           </CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-2">
//           <CheckboxGroup.Button
//             id="marketing"
//             value="marketing"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="marketing">
//             마케팅 정보 수신
//           </CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-2">
//           <CheckboxGroup.Button
//             id="newsletter"
//             value="newsletter"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="newsletter">
//             뉴스레터 구독
//           </CheckboxGroup.Label>
//         </div>
//       </div>
//     </CheckboxGroup.Wrapper>
//   ),
// };

// // 그리드 레이아웃의 CheckboxGroup
// export const GridLayout: Story = {
//   render: () => (
//     <CheckboxGroup.Wrapper name="features">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="feature1"
//             value="feature1"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="feature1">기능 1</CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="feature2"
//             value="feature2"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="feature2">기능 2</CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="feature3"
//             value="feature3"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="feature3">기능 3</CheckboxGroup.Label>
//         </div>
//         <div className="flex items-center gap-3">
//           <CheckboxGroup.Button
//             id="feature4"
//             value="feature4"
//             onClick={(id) => console.log('Selected:', id)}
//           />
//           <CheckboxGroup.Label htmlFor="feature4">기능 4</CheckboxGroup.Label>
//         </div>
//       </div>
//     </CheckboxGroup.Wrapper>
//   ),
// };
