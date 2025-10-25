'use client';

import { JoinForm } from '~/src/features/join';

export function Join() {
  return (
    <>
      <main className="mt-4">
        <h1 className="text-[20px] font-bold items-center">회원가입</h1>
        <section className="mt-4">
          <JoinForm />
        </section>
      </main>
    </>
  );
}
