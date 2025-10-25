'use client';

import { Suspense } from 'react';
import { EnrollableClasses } from '~/src/features/classes/enroll/create';

import { Spinner } from '~/src/shared/ui/spinner';

export default function Courses() {
  return (
    <section className="w-full flex justify-center items-center h-[calc(600px-120px)]">
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center h-full">
            <Spinner />
          </div>
        }
      >
        <div className="w-full">
          <EnrollableClasses />
        </div>
      </Suspense>
    </section>
  );
}
