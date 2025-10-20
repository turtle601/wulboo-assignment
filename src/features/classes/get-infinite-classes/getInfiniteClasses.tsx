'use client';

import { ClassCard } from '~/src/entities/class/ui/classCard';
import { useClassesSortByParams } from '~/src/features/classes/get-infinite-classes/useClassesSortByParams.hook';

import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';
import { InfiniteScroller } from '~/src/shared/ui/infiniteScroller';
import { useGetInfiniteClasses } from '~/src/entities/class/get-classes';
import { RadioGroup } from '~/src/shared/ui/radioGroup';

import { CreateEnrollClassesButton } from '~/src/features/classes/get-infinite-classes/createEnrollClassesButton';
import { useState } from 'react';

export function GetInfiniteClasses() {
  const {
    getAllSearchParams,
    toggleCreatedAtSortBy,
    toggleEnrollCountSortBy,
    toggleEnrollRatioSortBy,
  } = useClassesSortByParams();

  const { data, fetchNextPage, hasNextPage, isLoading } = useGetInfiniteClasses(
    getAllSearchParams()
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
      <RadioGroup.Wrapper
        name="class-sortBy"
        defaultActiveId={Object.keys(getAllSearchParams())[0]}
      >
        <div className="flex gap-8">
          <div className="flex items-center gap-3">
            <RadioGroup.Option
              id="createdAtSortBy"
              value="createdAtSortBy"
              onClick={toggleCreatedAtSortBy}
            />
            <CheckboxGroup.Label htmlFor="createdAtSortBy">
              최근 등록순
            </CheckboxGroup.Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroup.Option
              id="enrollCountSortBy"
              value="enrollCountSortBy"
              onClick={toggleEnrollCountSortBy}
            />
            <CheckboxGroup.Label htmlFor="enrollCountSortBy">
              신청자 많은 순
            </CheckboxGroup.Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroup.Option
              id="enrollRatioSortBy"
              value="enrollRatioSortBy"
              onClick={toggleEnrollRatioSortBy}
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
                  <div key={classItem.id} className="mb-2">
                    <ClassCard
                      course={classItem}
                      onClick={toggleSelectedCourseId}
                    />
                  </div>
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
