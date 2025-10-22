'use client';

import { useState } from 'react';
import { cn } from '~/src/shared/utils/style';

import { useClassesSortByParams } from '~/src/features/classes/get-infinite-classes/useClassesSortByParams.hook';

import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';
import { InfiniteScroller } from '~/src/shared/ui/infiniteScroller';
import { useGetInfiniteClasses } from '~/src/entities/class/get-classes';
import { RadioGroup } from '~/src/shared/ui/radioGroup';

import { CreateEnrollClassesButton } from '~/src/features/classes/get-infinite-classes/createEnrollClassesButton';

import { Card } from '~/src/shared/ui/card';
import { ClassContentUI } from '~/src/entities/class/ui/classContentUI';

export function GetInfiniteClasses() {
  const { filterParams, filterClassesSortBy, getDefaultClassesSearchParams } =
    useClassesSortByParams();

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetInfiniteClasses(
    getDefaultClassesSearchParams()
  );

  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

  const toggleSelectedCourseId = (id: string) => {
    setSelectedCourseIds((prev) =>
      prev.includes(id)
        ? prev.filter((courseId) => courseId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <RadioGroup.Wrapper name="class-sortBy" defaultActiveId={filterParams}>
        <div className="flex gap-8">
          <div className="flex items-center gap-4">
            <RadioGroup.Option
              id="createdAtSortBy"
              value="createdAtSortBy"
              onClick={() => filterClassesSortBy('createdAtSortBy')}
            />
            <CheckboxGroup.Label htmlFor="createdAtSortBy">
              최근 등록순
            </CheckboxGroup.Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroup.Option
              id="enrollCountSortBy"
              value="enrollCountSortBy"
              onClick={() => filterClassesSortBy('enrollCountSortBy')}
            />
            <CheckboxGroup.Label htmlFor="enrollCountSortBy">
              신청자 많은 순
            </CheckboxGroup.Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroup.Option
              id="enrollRatioSortBy"
              value="enrollRatioSortBy"
              onClick={() => filterClassesSortBy('enrollRatioSortBy')}
            />
            <CheckboxGroup.Label htmlFor="enrollRatioSortBy">
              신청률 높은 순
            </CheckboxGroup.Label>
          </div>
        </div>
      </RadioGroup.Wrapper>
      <div className="w-full max-h-[500px] overflow-y-auto">
        <InfiniteScroller
          fetchNextPage={fetchNextPage}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          loadingFallback={<div>Loading...</div>}
        >
          <CheckboxGroup.Wrapper name="course-list">
            {data?.pages.map((page) => (
              <div key={page.nextCursor}>
                {page.classes.map((classItem) => (
                  <CheckboxGroup.Button
                    key={classItem.id}
                    id={classItem.id}
                    value={classItem.id}
                    onClick={toggleSelectedCourseId}
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
                          <CheckboxGroup.Icon id={classItem.id} />
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
      <CreateEnrollClassesButton selectedCourseIds={selectedCourseIds} />
    </div>
  );
}
