'use client';

import { Suspense } from 'react';
import { MyEnrolledClasses } from '~/src/features/classes/my';
import { Spinner } from '~/src/shared/ui/spinner';
import { cn } from '~/src/shared/utils/style';

export function MyCreatedClassForStudent() {
  return (
    <div>
      <div className="bg-gray-100 rounded-t-lg w-full">
        <div className="list-none p-0 m-0 flex">
          <div
            className={cn(
              'w-full flex justify-center items-center px-6 py-4 cursor-pointer transition-all',
              {
                'border-b-gray-900': true,
                'text-gray-900': true,
                'font-medium': true,
              }
            )}
          >
            수강한 강의
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg border border-gray-200 h-[424px] overflow-auto">
        <div className="h-full">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-full w-full">
                <Spinner />
              </div>
            }
          >
            <MyEnrolledClasses />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
