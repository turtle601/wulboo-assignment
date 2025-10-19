'use client';

import { useEffect } from 'react';

export function MSWProvider() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      const init = async () => {
        const { startMSW } = await import('~/src/mocks/browser');
        await startMSW();
      };
      init();
    }
  }, []);
  return null;
}
