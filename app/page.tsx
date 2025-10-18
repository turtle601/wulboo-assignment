import { JoinForm } from '~/src/features/join/joinForm.ui';

export default function Home() {
  return (
    <div className="min-w-[1200px] max-w-[2560px] mx-auto isolate">
      <div className="relative flex min-h-[100dvh] items-center justify-center flex-col bg-neutral-600">
        <div className="flex flex-col bg-white min-w-[640px] rounded-2xl py-14 px-10">
          <div className="flex flex-col">
            <div className="mb-11 flex w-full flex-col text-[32px] font-bold items-center">
              회원가입
            </div>
            <JoinForm />
          </div>
        </div>
      </div>
    </div>
  );
}
