'use client';

import { useRouter } from 'next/navigation';
import { RUN_TIME_ERROR_MESSAGE } from '~/src/shared/api';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(600px-120px)]">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {error.message || RUN_TIME_ERROR_MESSAGE}
        </h1>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          router.back();
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}
