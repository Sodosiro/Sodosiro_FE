import { useCallback, useState } from "react";

// 특정 id들의 "펼침" 상태를 Set으로 관리하는 범용 훅
// (아코디언, 드롭다운 등 여러 개를 동시에 열고 닫아야 하는 곳에서 재사용 가능)
export function useExpandedItems(initialIds: string[] = []) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialIds));

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);

      const [dayId] = id.split("-");

      // 같은 날짜의 열린 항목 제거
      Array.from(next).forEach((key) => {
        if (key.startsWith(`${dayId}-`)) {
          next.delete(key);
        }
      });

      // 기존 열린 항목이면 닫기
      if (prev.has(id)) {
        return next;
      }

      // 새 항목 열기
      next.add(id);

      return next;
    });
  }, []);

  const closeAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  return { expandedIds, toggleExpand, closeAll };
}
