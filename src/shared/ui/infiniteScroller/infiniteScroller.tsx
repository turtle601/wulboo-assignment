import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
  loadingFallback: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export const InfiniteScroller = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      fetchNextPage,
      hasNextPage,
      isLoading,
      loadingFallback,
      threshold = 0.1,
      rootMargin = '100px',
      children,
      ...props
    },
    ref
  ) => {
    const observerTarget = useRef<HTMLDivElement>(null);

    const handleIntersection = useCallback(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry?.isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      [hasNextPage, fetchNextPage, isLoading]
    );

    useEffect(() => {
      const observerTargetElement = observerTarget.current;
      if (!observerTargetElement) return;

      const observer = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });

      observer.observe(observerTargetElement);

      return () => {
        observer.disconnect();
      };
    }, [handleIntersection, threshold, rootMargin]);

    return (
      <div ref={ref} {...props}>
        {children}
        {isLoading && loadingFallback}
        <div
          ref={observerTarget}
          aria-hidden="true"
          style={{ height: '5px' }}
        />
      </div>
    );
  }
);

InfiniteScroller.displayName = 'InfiniteScroller';
