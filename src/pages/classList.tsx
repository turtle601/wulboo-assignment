'use client';

import { useQuery } from '@tanstack/react-query';
import { classQueries } from '~/src/entities/class/class.query';
import { useCustomSearchParams } from '~/src/shared/hooks/useSearchParams/useSearchParams';
import { CheckboxGroup } from '~/src/shared/ui/checkboxGroup';

export default function ClassList() {
  const { getSearchParams, getAllSearchParams, setSearchParams } =
    useCustomSearchParams();

  const toggleCreatedAtSortBy = () => {
    const params = getSearchParams('createdAtSortBy');

    setSearchParams({
      createdAtSortBy: params ? null : 'new',
    });
  };

  const toggleEnrollCountSortBy = () => {
    const params = getSearchParams('enrollCountSortBy');

    setSearchParams({
      enrollCountSortBy: params ? null : 'desc',
    });
  };

  const toggleEnrollRatioSortBy = () => {
    const params = getSearchParams('enrollRatioSortBy');

    setSearchParams({
      enrollRatioSortBy: params ? null : 'high',
    });
  };

  const { data, isLoading, error } = useQuery(
    classQueries.list({
      createdAtSortBy: getSearchParams('createdAtSortBy'),
      enrollCountSortBy: getSearchParams('enrollCountSortBy'),
      enrollRatioSortBy: getSearchParams('enrollRatioSortBy'),
    })
  );

  return (
    <div>
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
            />
            <CheckboxGroup.Label htmlFor="createdAtSortBy">
              최근 등록순
            </CheckboxGroup.Label>
          </div>
          <div className="flex items-center gap-3">
            <CheckboxGroup.Button
              id="enrollCountSortBy"
              value="enrollCountSortBy"
              onClick={toggleEnrollCountSortBy}
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
            />
            <CheckboxGroup.Label htmlFor="enrollRatioSortBy">
              신청률 높은 순
            </CheckboxGroup.Label>
          </div>
        </div>
      </CheckboxGroup.Wrapper>

      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
