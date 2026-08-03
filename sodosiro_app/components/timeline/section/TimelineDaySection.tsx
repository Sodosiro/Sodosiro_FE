import CustomText from "@/components/common/CustomText";
import { LayoutChangeEvent, View } from "react-native";
import TimelineItem from "../TimelineItem";

type TimelineDaySectionProps = {
  dayPlan: DayPlan;
  dayOrder: number;
  isOngoing: boolean;
  isUpcoming: boolean;
  expandedIds: Set<string>;
  onToggleItem: (id: string) => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

export default function TimelineDaySection({
  dayPlan,
  dayOrder,
  isOngoing,
  isUpcoming,
  expandedIds,
  onToggleItem,
  onLayout,
}: TimelineDaySectionProps) {
  return (
    <View onLayout={onLayout} className="mb-6 rounded-2xl border border-[#EDEDED] bg-white py-1">
      <CustomText font="title" className="text-primary-dark px-3 pt-3">
        {dayPlan.dateLabel}
      </CustomText>
      {dayPlan.places.map((place, placeIndex) => {
        const expandKey = `${dayPlan.id}-${place.id}`;
        return (
          <TimelineItem
            key={expandKey}
            place={place}
            isLast={placeIndex === dayPlan.places.length - 1}
            isExpanded={expandedIds.has(expandKey)}
            onToggle={onToggleItem}
            expandKey={expandKey}
            order={dayOrder}
            isOngoing={isOngoing}
            isUpcoming={isUpcoming}
          />
        );
      })}
    </View>
  );
}
