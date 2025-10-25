'use client';

import React, { Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './errorFallback';

interface IAsyncQueryBoundaryProps {
  suspenseFallback: React.ReactNode;
  children: React.ReactNode;
}

export function AsyncQueryBoundary({
  children,
  suspenseFallback,
}: IAsyncQueryBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorFallback}>
          <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
