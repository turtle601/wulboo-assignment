'use client';

import { GetInfiniteClasses } from '~/src/features/classes/get-infinite-classes';
import { Header } from '~/src/widgets/header';

export default function ClassList() {
  return (
    <>
      <Header />
      <GetInfiniteClasses />
    </>
  );
}
