import { useCallback, useMemo, useState } from "react";

type UseTripPlanEditorParams = {
  initialPlan: DayPlan[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

export function useTripPlanEditor({
  initialPlan,
  activeIndex,
  onActiveIndexChange,
}: UseTripPlanEditorParams) {
  const [plan, setPlan] = useState<DayPlan[]>(initialPlan);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDeleteIndices, setPendingDeleteIndices] = useState<Set<number>>(new Set());
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const visiblePlan = useMemo(
    () =>
      plan
        .map((dayPlan, index) => ({ dayPlan, index }))
        .filter(({ index }) => !pendingDeleteIndices.has(index)),
    [plan, pendingDeleteIndices],
  );

  const requestDeleteDay = useCallback((index: number) => {
    setPendingDeleteIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const pressEditButton = useCallback(() => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // 삭제 대기 중인 항목이 없으면(변경사항이 없으면) 컨펌 없이 바로 편집 모드 종료
    if (pendingDeleteIndices.size === 0) {
      setIsEditing(false);
      return;
    }

    // 변경사항이 있을 때만 컨펌 모달 오픈
    setIsConfirmOpen(true);
  }, [isEditing, pendingDeleteIndices]);

  // [저장하기] 누를 때 -> 삭제 내역 반영 및 저장
  const confirmSave = useCallback(() => {
    if (pendingDeleteIndices.size > 0) {
      setPlan((prev) => {
        const nextPlan = prev.filter((_, idx) => !pendingDeleteIndices.has(idx));

        if (pendingDeleteIndices.has(activeIndex)) {
          onActiveIndexChange(0);
        } else {
          const shift = Array.from(pendingDeleteIndices).filter((idx) => idx < activeIndex).length;
          onActiveIndexChange(activeIndex - shift);
        }

        return nextPlan;
      });
      setPendingDeleteIndices(new Set());
    }

    setIsConfirmOpen(false);
    setIsEditing(false);
  }, [pendingDeleteIndices, activeIndex, onActiveIndexChange]);

  // [취소] 누를 때 -> 삭제 대기 내역 초기화 (원복) + 편집 모드 종료 + 모달 닫기
  const cancelEdit = useCallback(() => {
    setPendingDeleteIndices(new Set()); // 임시 삭제했던 일차들 복구
    setIsEditing(false); // 편집 모드 종료
    setIsConfirmOpen(false); // 모달 닫기
  }, []);

  return {
    plan,
    visiblePlan,
    isEditing,
    isConfirmOpen,
    requestDeleteDay,
    pressEditButton,
    confirmSave,
    cancelEdit,
  };
}
