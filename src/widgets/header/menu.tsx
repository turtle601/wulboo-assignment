'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useGetUser } from '~/src/entities/user/api/get-user';

export function Menu() {
  const pathname = usePathname();
  const { data: user } = useGetUser();

  const isLoggedIn = !!user;
  const isTeacher = user?.isTeacher;

  return (
    <div>
      {isLoggedIn && (
        <div className="flex items-center gap-2">
          {pathname?.startsWith('/courses/my') ? (
            <LinkButton href="/courses">
              <ListIcon />
              강의목록
            </LinkButton>
          ) : (
            <LinkButton href="/courses/my">
              <ClassroomIcon />내 강의실
            </LinkButton>
          )}
          {isTeacher && (
            <LinkButton href="/courses/create">
              <CreateIcon />
              강의개설
            </LinkButton>
          )}
        </div>
      )}
    </div>
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
      className="flex items-center justify-center gap-2 bg-slate-500 hover:bg-slate-600 text-white font-medium py-2 px-3 rounded-md transition-colors duration-200 text-sm whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

// 아이콘 컴포넌트들
function ListIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  );
}

function ClassroomIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function CreateIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}
