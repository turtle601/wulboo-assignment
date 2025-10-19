'use client';

import { cn } from '~/src/shared/utils/style';

import { ClassCard } from '~/src/entities/class/ui/classCard';
import { useClassesSortByParams } from '~/src/features/classes/get-infinite-classes/useClassesSortByParams.hook';

import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';
import { InfiniteScroller } from '~/src/shared/ui/infiniteScroller';
import { useGetInfiniteClasses } from '~/src/entities/class/get-classes';

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

  return (
    <div className="w-full">
      <CheckboxGroup.Wrapper
        name="class-sortBy"
        defaultActiveIds={Object.keys(getAllSearchParams())}
      >
        <div className="flex gap-8">
          <div className="flex items-center gap-3">
            <CheckboxGroup.Button
              id="createdAtSortBy"
              value="createdAtSortBy"
              onClick={toggleCreatedAtSortBy}
              drawActiveStyle={(isChecked) => {
                return cn(
                  'w-5 h-5 rounded-full border border-gray-300 transition-all duration-200',
                  isChecked && 'border-blue-500 bg-blue-500 relative',
                  isChecked &&
                    'after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:bg-white after:rounded-full'
                );
              }}
            ></CheckboxGroup.Button>
            <CheckboxGroup.Label htmlFor="createdAtSortBy">
              최근 등록순
            </CheckboxGroup.Label>
          </div>
          <div className="flex items-center gap-3">
            <CheckboxGroup.Button
              id="enrollCountSortBy"
              value="enrollCountSortBy"
              onClick={toggleEnrollCountSortBy}
              drawActiveStyle={(isChecked) => {
                return cn(
                  'w-5 h-5 rounded-full border border-gray-300 transition-all duration-200',
                  isChecked && 'border-blue-500 bg-blue-500 relative',
                  isChecked &&
                    'after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:bg-white after:rounded-full'
                );
              }}
            />
            <CheckboxGroup.Label htmlFor="enrollCountSortBy">
              신청자 많은 순
            </CheckboxGroup.Label>
          </div>
          <div className="flex items-center gap-3">
            <CheckboxGroup.Button
              id="enrollRatioSortBy"
              value="enrollRatioSortBy"
              onClick={toggleEnrollRatioSortBy}
              drawActiveStyle={(isChecked) => {
                return cn(
                  'w-5 h-5 rounded-full border border-gray-300 transition-all duration-200',
                  isChecked && 'border-blue-500 bg-blue-500 relative',
                  isChecked &&
                    'after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:bg-white after:rounded-full'
                );
              }}
            />
            <CheckboxGroup.Label htmlFor="enrollRatioSortBy">
              신청률 높은 순
            </CheckboxGroup.Label>
          </div>
        </div>
      </CheckboxGroup.Wrapper>

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
                  <ClassCard
                    name="course-list"
                    key={classItem.id}
                    course={classItem}
                    toggleCourse={() => {}}
                  />
                ))}
              </div>
            ))}
          </CheckboxGroup.Wrapper>
        </InfiniteScroller>
      </div>
    </div>
  );
}
