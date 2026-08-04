import CustomText from "@/components/common/CustomText";
import { Dispatch, SetStateAction, useState, useCallback, memo } from "react";
import { LayoutChangeEvent, View } from "react-native";
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import TimelineItem from "../TimelineItem";

type TimelineDaySectionProps = {
  dayPlan: DayPlan;
  dayIndex: number;
  mode: "isOngoing" | "isUpcoming" | "completed";
  isEditing?: boolean;
  setPlan?: Dispatch<SetStateAction<DayPlan[]>>;
  setOnDrag?: Dispatch<SetStateAction<boolean>>;
  onLayout: (e: LayoutChangeEvent) => void;
};

function TimelineDaySection({
  dayPlan,
  dayIndex,
  mode,
  isEditing = false,
  setPlan,
  setOnDrag,
  onLayout,
}: TimelineDaySectionProps) {
  const [selectedId, setSelectedId] = useState<number | null>(
    dayPlan.places[0]?.id,
  );

  const handleToggle = useCallback((placeId: number) => {
    setSelectedId((prev) => (prev === placeId ? null : placeId));
  }, []);

  const renderEditableItem = useCallback(
    ({ item, getIndex, drag }: RenderItemParams<PlaceType>) => {
      const index = getIndex() ?? 0;

      return (
        <OpacityDecorator>
          <TimelineItem
            place={item}
            isExpanded={item.id === selectedId && !isEditing}
            isEditing={isEditing}
            onToggle={() => handleToggle(item.id)}
            order={index + 1}
            mode={mode}
            onLongPress={isEditing ? drag : undefined}
          />
        </OpacityDecorator>
      );
    },
    [selectedId, isEditing, handleToggle, mode],
  );

  const handleDragBegin = useCallback(() => {
    setOnDrag?.(true);
  }, [setOnDrag]);

  const handleDragEnd = useCallback(
    ({ data }: { data: PlaceType[] }) => {
      setOnDrag?.(false);
      setPlan?.((prev) =>
        prev.map((day) =>
          day.id === dayPlan.id
            ? {
                ...day,
                places: data,
              }
            : day,
        ),
      );
    },
    [setOnDrag, setPlan, dayPlan.id],
  );

  return (
    <View
      onLayout={onLayout}
      className="mb-6 rounded-2xl border border-border bg-white py-1 overflow-hidden"
    >
      <CustomText font="title" className="text-primary-dark px-3 pt-3">
        {dayPlan.dateLabel}
      </CustomText>

      {isEditing ? (
        <DraggableFlatList
          onDragBegin={setOnDrag ? handleDragBegin : undefined}
          data={dayPlan.places ?? []}
          onDragEnd={setOnDrag && setPlan ? handleDragEnd : undefined}
          activationDistance={10}
          scrollEnabled={false}
          keyExtractor={(item) => `place-${item.id}`}
          renderItem={renderEditableItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          {dayPlan.places?.map((place, index) => (
            <TimelineItem
              key={`place-${place.id}`}
              place={place}
              isExpanded={place.id === selectedId}
              isEditing={false}
              onToggle={() => handleToggle(place.id)}
              order={index + 1}
              mode={mode}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default memo(TimelineDaySection);

