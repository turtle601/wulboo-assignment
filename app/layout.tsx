import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { MSWProvider, QueryClientProvider } from '~/src/app/provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '월급쟁이부자들 Frontend 과제',
  description: '월급쟁이부자들 Frontend 과제',
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-[1200px] max-w-[2560px] mx-auto isolate">
      <div className="relative flex min-h-[100dvh] items-center justify-center flex-col bg-neutral-600">
        <div className="flex flex-col bg-white min-w-[640px] min-h-[600px] rounded-2xl py-14 px-10 max-w-[1200px]">
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MSWProvider />
        <QueryClientProvider>
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
