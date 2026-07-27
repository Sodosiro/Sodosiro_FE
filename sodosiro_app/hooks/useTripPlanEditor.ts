import { useCallback, useMemo, useState } from "react";

type UseTripPlanEditorParams = {
  initialPlan: DayPlan[];
  /** 스크롤 스파이 훅에서 넘겨받는 현재 활성 일차 index */
  activeIndex: number;
  /** 삭제로 인해 활성 일차 index가 바뀌어야 할 때 호출 (보통 useTimelineScrollSpy의 setActiveIndex) */
  onActiveIndexChange: (index: number) => void;
};

// 일정(plan) 데이터, 수정 모드, 삭제 대기 상태를 함께 관리하는 훅
export function useTripPlanEditor({
  initialPlan,
  activeIndex,
  onActiveIndexChange,
}: UseTripPlanEditorParams) {
  const [plan, setPlan] = useState<DayPlan[]>(initialPlan);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDeleteIndices, setPendingDeleteIndices] = useState<Set<number>>(new Set());

  // 삭제 대기중인 index는 화면에서 임시로 감춤 (확인 누르기 전까지 실제 데이터는 유지)
  const visiblePlan = useMemo(
    () =>
      plan
        .map((dayPlan, index) => ({ dayPlan, index }))
        .filter(({ index }) => !pendingDeleteIndices.has(index)),
    [plan, pendingDeleteIndices],
  );

  // 일차 뱃지 삭제(X) → 임시 삭제 (확인 누르기 전까지는 실제 데이터에서 지우지 않음)
  const requestDeleteDay = useCallback((index: number) => {
    setPendingDeleteIndices((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  // 수정하기 / 확인 버튼
  const pressEditButton = useCallback(() => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (pendingDeleteIndices.size > 0) {
      setPlan((prev) => {
        const nextPlan = prev.filter((_, idx) => !pendingDeleteIndices.has(idx));

        if (pendingDeleteIndices.has(activeIndex)) {
          // 보고있던 일차가 삭제됐다면 맨 앞으로
          onActiveIndexChange(0);
        } else {
          // 삭제된 항목들만큼 앞으로 당겨진 index로 보정
          const shift = Array.from(pendingDeleteIndices).filter((idx) => idx < activeIndex).length;
          onActiveIndexChange(activeIndex - shift);
        }

        return nextPlan;
      });
      setPendingDeleteIndices(new Set());
    }

    setIsEditing(false);
  }, [isEditing, pendingDeleteIndices, activeIndex, onActiveIndexChange]);

  return {
    plan,
    visiblePlan,
    isEditing,
    requestDeleteDay,
    pressEditButton,
  };
}
