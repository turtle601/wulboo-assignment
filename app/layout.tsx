import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import { MSWProvider, QueryClientProvider } from '~/src/app/provider';
import { CommonLayout } from '~/src/widgets/commonLayout';

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
          <CommonLayout>{children}</CommonLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
