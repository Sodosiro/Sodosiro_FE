import { useCallback, useMemo, useState } from "react";

export type TripPlanSavePayload = {
  order: number[];
  deletedIndices: number[];
  nextPlan: DayPlan[];
  didReorder: boolean;
  didDelete: boolean;
  didReorderPlaces: boolean;
};

type UseTripPlanEditorParams = {
  initialPlan: DayPlan[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSave?: (payload: TripPlanSavePayload) => void;
};

export function useTripPlanEditor({
  initialPlan,
  activeIndex,
  onActiveIndexChange,
  onSave,
}: UseTripPlanEditorParams) {
  const [plan, setPlan] = useState<DayPlan[]>(initialPlan);
  const [isEditing, setIsEditing] = useState(false);
  const [pendingDeleteIndices, setPendingDeleteIndices] = useState<Set<number>>(
    new Set(),
  );
  const [reorderedIndices, setReorderedIndices] = useState<number[] | null>(
    null,
  );
  // 일차별 장소 재정렬 draft (원본 day index -> 재정렬된 places)
  const [placeDraft, setPlaceDraft] = useState<Record<number, PlaceType[]>>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const baseOrder = useMemo(() => plan.map((_, i) => i), [plan]);

  const visiblePlan = useMemo(
    () =>
      baseOrder
        .filter((i) => !pendingDeleteIndices.has(i))
        .map((i) => ({ dayPlan: plan[i], index: i })),
    [baseOrder, plan, pendingDeleteIndices],
  );

  const badgeOrder = useMemo(
    () =>
      (reorderedIndices ?? baseOrder).filter(
        (i) => !pendingDeleteIndices.has(i),
      ),
    [reorderedIndices, baseOrder, pendingDeleteIndices],
  );

  // 편집 화면에서 실제로 보여줄 장소 목록 (draft 있으면 draft, 없으면 원본)
  const getDisplayPlaces = useCallback(
    (dayIndex: number) => placeDraft[dayIndex] ?? plan[dayIndex].places,
    [placeDraft, plan],
  );

  const requestDeleteDay = useCallback((index: number) => {
    setPendingDeleteIndices((prev) => new Set(prev).add(index));
  }, []);

  const handleReorderDays = useCallback((newOrder: number[]) => {
    setReorderedIndices(newOrder);
  }, []);

  // 일차 하나의 장소 순서가 바뀔 때
  const handleReorderPlaces = useCallback(
    (dayIndex: number, newPlaces: PlaceType[]) => {
      setPlaceDraft((prev) => ({ ...prev, [dayIndex]: newPlaces }));
    },
    [],
  );

  const pressEditButton = useCallback(() => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const hasChanges =
      pendingDeleteIndices.size > 0 ||
      reorderedIndices !== null ||
      Object.keys(placeDraft).length > 0;
    if (!hasChanges) {
      setIsEditing(false);
      return;
    }

    setIsConfirmOpen(true);
  }, [isEditing, pendingDeleteIndices, reorderedIndices, placeDraft]);

  const confirmSave = useCallback(() => {
    const hasDelete = pendingDeleteIndices.size > 0;
    const hasReorder = reorderedIndices !== null;
    const hasPlaceReorder = Object.keys(placeDraft).length > 0;

    if (hasDelete || hasReorder || hasPlaceReorder) {
      const order = reorderedIndices ?? plan.map((_, i) => i);
      const survivors = order.filter((i) => !pendingDeleteIndices.has(i));
      const nextPlan = survivors.map((i) => ({
        ...plan[i],
        places: placeDraft[i] ?? plan[i].places, // 👈 장소 재정렬 반영
      }));

      onSave?.({
        order: survivors,
        deletedIndices: Array.from(pendingDeleteIndices),
        nextPlan,
        didReorder: hasReorder,
        didDelete: hasDelete,
        didReorderPlaces: hasPlaceReorder,
      });

      setPlan(nextPlan);

      if (pendingDeleteIndices.has(activeIndex)) {
        onActiveIndexChange(0);
      } else {
        const newPosition = survivors.indexOf(activeIndex);
        onActiveIndexChange(newPosition >= 0 ? newPosition : 0);
      }

      setPendingDeleteIndices(new Set());
      setReorderedIndices(null);
      setPlaceDraft({});
    }

    setIsConfirmOpen(false);
    setIsEditing(false);
  }, [
    pendingDeleteIndices,
    reorderedIndices,
    placeDraft,
    activeIndex,
    onActiveIndexChange,
    plan,
    onSave,
  ]);

  const cancelEdit = useCallback(() => {
    setPendingDeleteIndices(new Set());
    setReorderedIndices(null);
    setPlaceDraft({});
    setIsEditing(false);
    setIsConfirmOpen(false);
  }, []);

  return {
    plan,
    visiblePlan,
    badgeOrder,
    getDisplayPlaces,
    isEditing,
    isConfirmOpen,
    requestDeleteDay,
    handleReorderDays,
    handleReorderPlaces,
    pressEditButton,
    confirmSave,
    cancelEdit,
  };
}
