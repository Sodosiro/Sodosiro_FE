import CustomText from "@/components/common/CustomText";
import { LayoutChangeEvent, View } from "react-native";
import TimelineItem from "../TimelineItem";

type TimelineDaySectionProps = {
  dayPlan: DayPlan;
  /** 몇 번째 일차인지 (뱃지 번호로 사용) */
  dayOrder: number;
  isOngoing: boolean;
  isUpcoming: boolean;
  expandedIds: Set<string>;
  onToggleItem: (id: string) => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

// 하루치 일정 카드: 날짜 라벨 + 해당 날짜의 TimelineItem 목록
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
