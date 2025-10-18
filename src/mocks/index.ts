// 브라우저 환경에서만 MSW 활성화
async function initMocks() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const { worker } = await import('./browser');
    return worker.start({
      onUnhandledRequest: 'warn',
    });
  }
}

initMocks();

// 모듈로 인식되도록 빈 export 추가
export {};
