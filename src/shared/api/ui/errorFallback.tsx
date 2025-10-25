import React from 'react';

import { FallbackProps } from 'react-error-boundary';
import { RUN_TIME_ERROR_MESSAGE } from '~/src/shared/api/constant';

function ErrorFallback(props: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[460px]">
      <div className="h-6"></div>
      <div className="text-lg font-bold text-gray-400 text-center">
        {props.error.errorMessage || RUN_TIME_ERROR_MESSAGE}
      </div>
      <div className="h-3"></div>
      <button
        className="px-2 py-2 cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-600 hover:text-white transition-colors"
        onClick={props.resetErrorBoundary}
      >
        다시 시도
      </button>
    </div>
  );
}

export default ErrorFallback;
