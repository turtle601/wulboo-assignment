'use client';

import { ClassesSortByType } from '~/src/features/classes/enroll/create/useClassesSortByParams';
import { RadioGroup } from '~/src/shared/ui/radioGroup';

interface EnrollableClassesOptions {
  id: ClassesSortByType;
  label: string;
}

export function EnrollableClassesOptions({
  filterParams,
  onSortChange,
}: {
  filterParams: string;
  onSortChange: (sortType: ClassesSortByType) => void;
}) {
  const sortOptions: EnrollableClassesOptions[] = [
    { id: 'createdAtSortBy', label: '최근 등록순' },
    { id: 'enrollCountSortBy', label: '신청자 많은 순' },
    { id: 'enrollRatioSortBy', label: '신청률 높은 순' },
  ];

  return (
    <RadioGroup.Wrapper name="class-sortBy" defaultActiveId={filterParams}>
      <div className="flex gap-8">
        {sortOptions.map((option) => (
          <div key={option.id} className="flex items-center gap-4">
            <RadioGroup.Option
              id={option.id}
              value={option.id}
              onClick={() => onSortChange(option.id)}
            />
            <RadioGroup.Label htmlFor={option.id}>
              {option.label}
            </RadioGroup.Label>
          </div>
        ))}
      </div>
    </RadioGroup.Wrapper>
  );
}
