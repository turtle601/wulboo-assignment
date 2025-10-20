import Link from 'next/link';

import { useGetUser } from '~/src/entities/user/api/get-user';

export function Header() {
  const { data: user } = useGetUser();

  const isLoggedIn = !!user;

  return (
    <div className="flex justify-between items-center w-full">
      <div>월급쟁이부자들</div>
      <div>
        {isLoggedIn ? (
          <Link href="/myClass">내 강의실</Link>
        ) : (
          <Link href="/join">회원가입</Link>
        )}
      </div>
    </div>
  );
}
