import { useRef } from 'react';

export const useScrollTo = (options?: ScrollToOptions) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const goScrollTo = () => {
    scrollRef.current?.scrollTo(options);
  };

  return {
    scrollRef,
    goScrollTo,
  };
};
