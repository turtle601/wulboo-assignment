import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/">
      <div
        className="text-0 cursor-pointer bg-[url('https://cdn.weolbu.com/fe/logo.DZwdMn-h.svg')] bg-contain bg-no-repeat flex h-5 w-[140px] min-w-[140px] mr-6"
        data-prevent-progress="false"
      ></div>
    </Link>
  );
}
