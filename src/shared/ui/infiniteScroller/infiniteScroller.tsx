import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  loadingFallback: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

interface VirtualInfiniteScrollProps<TItem> {
  items: TItem[];
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  loadingFallback: React.ReactNode;
  renderItem: (item: TItem, index: number) => React.ReactNode;
  estimateSize?: number;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

// 기존 API 유지를 위한 원래 컴포넌트
export const InfiniteScroller = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
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

        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      [hasNextPage, fetchNextPage, isFetchingNextPage]
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
        {isFetchingNextPage && loadingFallback}
        {hasNextPage && (
          <div
            ref={observerTarget}
            aria-hidden="true"
            style={{ height: '5px' }}
          />
        )}
      </div>
    );
  }
);

InfiniteScroller.displayName = 'InfiniteScroller';

// TanStack Virtual을 사용한 최적화된 컴포넌트
export function VirtualInfiniteScroller<TItem>({
  items,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  loadingFallback,
  renderItem,
  estimateSize = 150,
  containerClassName,
  containerStyle,
}: VirtualInfiniteScrollProps<TItem>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 0, // 화면에 보이는 항목만 렌더링
  });

  const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

  useEffect(() => {
    if (!lastItem) return;

    if (
      lastItem.index >= items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, items.length, lastItem]);

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className={containerClassName}
      style={{ height: '100%', overflow: 'auto', ...containerStyle }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.key}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index], virtualItem.index)}
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div style={{ paddingTop: '20px' }}>{loadingFallback}</div>
      )}
    </div>
  );
}
