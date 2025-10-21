import Link from 'next/link';

import { useGetUser } from '~/src/entities/user/api/get-user';

export function Header() {
  const { data: user } = useGetUser();

  const isLoggedIn = !!user;

  return (
    <div className="flex justify-between items-center w-full border-b border-gray-200 pb-4">
      <Link href="/">
        <Logo />
      </Link>
      <div>
        {isLoggedIn ? (
          <Link href="/myClass">내 강의실</Link>
        ) : (
          <div className="flex items-center gap-2">
            <LinkButton href="/join">회원가입</LinkButton>
            <LinkButton href="/createClass">강의개설</LinkButton>
          </div>
        )}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div
      className="text-0 cursor-pointer bg-[url('https://cdn.weolbu.com/fe/logo.DZwdMn-h.svg')] bg-contain bg-no-repeat flex h-5 w-[140px] min-w-[140px] mr-6"
      data-prevent-progress="false"
    ></div>
  );
}

function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-md transition-colors duration-200 text-sm whitespace-nowrap"
    >
      {children}
    </Link>
  );
}
