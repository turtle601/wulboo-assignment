'use client';

import { JoinForm } from '~/src/features/join/joinForm.ui';

import { Header } from '~/src/widgets/header';

export default function JoinPage() {
  return (
    <>
      <Header />
      <main className="mt-4">
        <h1 className="text-[20px] font-bold items-center">회원가입</h1>
        <section className="mt-4">
          <JoinForm />
        </section>
      </main>
    </>
  );
}
