import CustomText from "@/components/common/CustomText";
import { useMemo } from "react";
import { View } from "react-native";
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import EditableTimelineItem from "./EditableTimelineItem";

type FlatRow =
  | { key: string; type: "header"; dayIndex: number; label: string }
  | { key: string; type: "place"; dayIndex: number; place: PlaceType };

type TimelineEditableListProps = {
  days: { dayPlan: DayPlan; index: number }[]; // visiblePlan
  getDisplayPlaces: (dayIndex: number) => PlaceType[];
  onReorderPlaces: (dayIndex: number, newPlaces: PlaceType[]) => void;
};

export default function TimelineEditableList({
  days,
  getDisplayPlaces,
  onReorderPlaces,
}: TimelineEditableListProps) {
  const flatData = useMemo<FlatRow[]>(() => {
    const rows: FlatRow[] = [];
    days.forEach(({ dayPlan, index }) => {
      rows.push({
        key: `header-${index}`,
        type: "header",
        dayIndex: index,
        label: dayPlan.dateLabel,
      });
      getDisplayPlaces(index).forEach((place) => {
        rows.push({
          key: `place-${index}-${place.contentId}`,
          type: "place",
          dayIndex: index,
          place,
        });
      });
    });
    return rows;
  }, [days, getDisplayPlaces]);

  const renderItem = ({
    item,
    getIndex,
    drag,
    isActive,
  }: RenderItemParams<FlatRow>) => {
    if (item.type === "header") {
      return (
        <View className="px-4 pt-4 pb-1 bg-white">
          <CustomText font="title" className="text-primary-dark">
            {item.label}
          </CustomText>
        </View>
      );
    }

    // 같은 일차 내에서 몇 번째인지 계산 (헤더 기준 상대 위치)
    const flatIndex = getIndex() ?? 0;
    let orderInDay = 1;
    for (let i = flatIndex - 1; i >= 0; i--) {
      const row = flatData[i];
      if (row.type === "header") break;
      if (row.dayIndex === item.dayIndex) orderInDay++;
    }

    return (
      <ScaleDecorator>
        <EditableTimelineItem
          place={item.place}
          order={orderInDay}
          isLast={false}
          onLongPress={drag}
          isActive={isActive}
        />
      </ScaleDecorator>
    );
  };

  const handleDragEnd = ({ data, to }: DragEndParams<FlatRow>) => {
    const movedRow = data[to];
    if (!movedRow || movedRow.type !== "place") return;

    // 원래 일차의 구간(헤더~다음 헤더 직전) 계산
    let start = -1;
    let end = data.length;
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row.type === "header") {
        if (row.dayIndex === movedRow.dayIndex) {
          start = i;
        } else if (start !== -1) {
          end = i;
          break;
        }
      }
    }

    let finalData = data;
    const isWithinBounds = to > start && to < end;

    if (!isWithinBounds) {
      // 일차 경계를 벗어났다면 -> 원래 일차 구간 가장자리로 스냅백
      const clampedIndex = to < start ? start + 1 : end - 1;
      const arr = [...data];
      arr.splice(to, 1);
      arr.splice(clampedIndex, 0, movedRow);
      finalData = arr;
    }

    // 최종 배열을 일차별로 다시 그룹핑해서 각각 상위로 알림
    const grouped: Record<number, PlaceType[]> = {};
    let currentDay: number | null = null;
    finalData.forEach((row) => {
      if (row.type === "header") {
        currentDay = row.dayIndex;
        grouped[currentDay] = grouped[currentDay] ?? [];
      } else if (currentDay !== null) {
        grouped[currentDay].push(row.place);
      }
    });

    Object.entries(grouped).forEach(([dayIndexStr, places]) => {
      onReorderPlaces(Number(dayIndexStr), places);
    });
  };

  return (
    <DraggableFlatList
      data={flatData}
      keyExtractor={(row) => row.key}
      renderItem={renderItem}
      onDragEnd={handleDragEnd}
      activationDistance={5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
    />
  );
}
