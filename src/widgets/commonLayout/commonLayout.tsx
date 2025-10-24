export function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-w-[320px] max-w-[2560px] mx-auto isolate">
      <div className="relative flex min-h-[100dvh] items-center justify-center flex-col bg-neutral-600 px-4 sm:px-6 lg:px-8">
        <div className="container flex flex-col bg-white w-full h-[600px] rounded-2xl py-8 px-6 min-w-[478px] max-w-[768px]">
          <div className="w-full h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </main>
  );
}
