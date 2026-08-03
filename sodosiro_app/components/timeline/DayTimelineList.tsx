// DayTimelineList.tsx
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import EditableTimelineItem from "./EditableTimelineItem";

type DayTimelineListProps = {
  dayIndex: number;
  places: PlaceType[];
  onReorderPlaces: (dayIndex: number, newPlaces: PlaceType[]) => void;
};

export default function DayTimelineList({
  dayIndex,
  places,
  onReorderPlaces,
}: DayTimelineListProps) {
  const renderItem = ({ item, getIndex, drag, isActive }: RenderItemParams<PlaceType>) => {
    const index = getIndex() ?? 0;

    return (
      <ScaleDecorator>
        <EditableTimelineItem
          place={item}
          order={index + 1}
          isLast={index === places.length - 1}
          onLongPress={drag}
          isActive={isActive}
        />
      </ScaleDecorator>
    );
  };

  const handleDragEnd = ({ data }: DragEndParams<PlaceType>) => {
    // 해당 일차 내에서 순서가 변경된 결과를 부모에게 전달
    onReorderPlaces(dayIndex, data);
  };

  return (
    <DraggableFlatList
      data={places}
      keyExtractor={(place) => `${dayIndex}-${place.id}`}
      renderItem={renderItem}
      onDragEnd={handleDragEnd}
      activationDistance={10} // 수평 스와이프와의 충돌 방지를 위해 적절한 값 설정
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
    />
  );
}
