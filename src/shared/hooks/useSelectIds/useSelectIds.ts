import { useState } from 'react';

export const useSelectIds = (defaultSelectedIds: string[] = []) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);

  const toggleSelectedId = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((courseId) => courseId !== id)
        : [...prev, id]
    );
  };

  const clearSelectedIds = () => {
    setSelectedIds([]);
  };

  return {
    selectedIds,
    setSelectedIds,
    toggleSelectedId,
    clearSelectedIds,
  };
};
