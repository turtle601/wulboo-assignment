import ClassList from '~/src/pages/classList';

import { HydrationPrefetchBoundary } from '~/src/app/provider';

import {
  CLASS_LIST_LIMIT,
  classQueries,
  INITIAL_CURSOR,
} from '~/src/entities/class/class.query';

export default function CoursePage() {
  return (
    <HydrationPrefetchBoundary
      fetchQueryOptions={[
        classQueries.list({
          limit: CLASS_LIST_LIMIT,
          cursor: INITIAL_CURSOR,
          filter: 'createdAtSortBy',
        }),
        classQueries.list({
          limit: CLASS_LIST_LIMIT,
          cursor: INITIAL_CURSOR,
          filter: 'enrollCountSortBy',
        }),
        classQueries.list({
          limit: CLASS_LIST_LIMIT,
          cursor: INITIAL_CURSOR,
          filter: 'enrollRatioSortBy',
        }),
      ]}
    >
      <ClassList />
    </HydrationPrefetchBoundary>
  );
}
