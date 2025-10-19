import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// 브라우저 환경에서 MSW 워커 설정
export const worker = setupWorker(...handlers);

// Start the worker
export async function startMSW() {
  if (typeof window === 'undefined') {
    return;
  }

  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}
