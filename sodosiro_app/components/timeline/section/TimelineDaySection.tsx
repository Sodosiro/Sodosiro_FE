import CustomText from "@/components/common/CustomText";
import { Dispatch, SetStateAction, useState } from "react";
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

export default function TimelineDaySection({
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

  const renderEditableItem = ({
    item,
    getIndex,
    drag,
  }: RenderItemParams<PlaceType>) => {
    const index = getIndex() ?? 0;

    return (
      <OpacityDecorator>
        <TimelineItem
          place={item}
          isExpanded={item.id === selectedId && !isEditing}
          isEditing={isEditing}
          onToggle={() => {
            setSelectedId(item.id === selectedId ? null : item.id);
          }}
          order={index + 1}
          mode={mode}
          onLongPress={isEditing ? drag : undefined}
        />
      </OpacityDecorator>
    );
  };

  return (
    <View
      onLayout={onLayout}
      className="mb-6 rounded-2xl border border-border bg-white py-1 overflow-hidden"
    >
      <CustomText font="title" className="text-primary-dark px-3 pt-3">
        {dayPlan.dateLabel}
      </CustomText>

      <DraggableFlatList
        onDragBegin={setOnDrag ? () => setOnDrag(true) : undefined}
        data={dayPlan.places ?? []}
        onDragEnd={
          setOnDrag && setPlan
            ? ({ data }) => {
                setOnDrag(false);
                setPlan((prev) =>
                  prev.map((day) =>
                    day.id === dayPlan.id
                      ? {
                          ...day,
                          places: data,
                        }
                      : day,
                  ),
                );
              }
            : undefined
        }
        activationDistance={10}
        scrollEnabled={false}
        keyExtractor={(item) => `place-${item.id}`}
        renderItem={renderEditableItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
