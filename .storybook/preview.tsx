import React from 'react';

import '../app/globals.css';

import type { Preview } from '@storybook/nextjs-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="font-pretendard">
        <Story />
      </div>
    ),
  ],
};

export default preview;
