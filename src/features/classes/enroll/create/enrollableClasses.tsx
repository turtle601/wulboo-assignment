'use client';

import { cn } from '~/src/shared/utils/style';

import {
  ClassesSortByType,
  useClassesSortByParams,
} from '~/src/features/classes/enroll/create/useClassesSortByParams';

import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';
import { InfiniteScroller } from '~/src/shared/ui/infiniteScroller';
import { useGetInfiniteClasses } from '~/src/entities/class/get-classes';

import { Card } from '~/src/shared/ui/card';
import { ClassContentUI } from '~/src/entities/class/ui/classContentUI';
import { Spinner } from '~/src/shared/ui/spinner';
import { useScrollTo } from '~/src/shared/hooks/useScrollTo/useScrollTo';
import { useSelectIds } from '~/src/shared/hooks/useSelectIds';
import { EnrollableClassesOptions } from '~/src/features/classes/enroll/create/erollableClassesOptions';
import { CreateEnrollClassesButton } from '~/src/features/classes/enroll/create/createEnrollClassesButton';

export function EnrollableClasses() {
  const { filterParams, filterClassesSortBy, getDefaultClassesSearchParams } =
    useClassesSortByParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteClasses(getDefaultClassesSearchParams());

  const { scrollRef, goScrollTo: goScrollToTop } = useScrollTo({
    top: 0,
    behavior: 'smooth',
  });

  const { selectedIds, toggleSelectedId, clearSelectedIds } = useSelectIds();

  const handleSortChange = (sortType: ClassesSortByType) => {
    filterClassesSortBy(sortType);
    clearSelectedIds();
    goScrollToTop();
  };

  return (
    <div className="w-full flex flex-col gap-4 h-[460px]">
      <EnrollableClassesOptions
        filterParams={filterParams}
        onSortChange={handleSortChange}
      />

      <div ref={scrollRef} className="w-full max-h-[500px] overflow-y-auto">
        <InfiniteScroller
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          loadingFallback={
            <div className="flex justify-center items-center h-[100px] w-full">
              <Spinner />
            </div>
          }
        >
          <CheckboxGroup.Wrapper
            name="course-list"
            defaultActiveIds={[...selectedIds]}
          >
            {data?.pages.map((page) => (
              <div key={page.nextCursor}>
                {page.classes.map((classItem) => (
                  <CheckboxGroup.Button
                    isChecked={selectedIds.includes(classItem.id)}
                    key={classItem.id}
                    id={classItem.id}
                    value={classItem.id}
                    onClick={() => toggleSelectedId(classItem.id)}
                    disabled={
                      classItem.total === classItem.enrolledUserIds.length
                    }
                    className={cn('w-full mb-2')}
                  >
                    {(isChecked) => {
                      return (
                        <Card.wrapper
                          className={cn(
                            'border w-full',
                            isChecked
                              ? 'border-blue-500 hover:border-blue-600 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          )}
                        >
                          <CheckboxGroup.Icon
                            id={classItem.id}
                            isChecked={isChecked}
                          />
                          <ClassContentUI course={classItem} />
                        </Card.wrapper>
                      );
                    }}
                  </CheckboxGroup.Button>
                ))}
              </div>
            ))}
          </CheckboxGroup.Wrapper>
        </InfiniteScroller>
      </div>

      <CreateEnrollClassesButton selectedCourseIds={[...selectedIds]} />
    </div>
  );
}
