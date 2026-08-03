import CustomText from "@/components/common/CustomText";
import { BADGE_BASE_CLASS } from "@/components/trip/badge/badgeStyles";
import { LayoutChangeEvent, Pressable } from "react-native";

type DayBadgeProps = {
  text: string;
  selected?: boolean;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
};

// 상단 "N일차" 탭 뱃지 (조회 모드 전용 - 스크롤 동기화 및 탭 이동만 담당)
export default function DayBadge({ text, selected = false, onPress, onLayout }: DayBadgeProps) {
  return (
    <Pressable
      onPress={onPress}
      onLayout={onLayout}
      className={`${selected ? "bg-text-primary" : "bg-bg-muted"} ${BADGE_BASE_CLASS}`}
    >
      <CustomText font="body3 tight" className={selected ? "text-white" : "text-text-primary"}>
        {text}
      </CustomText>
    </Pressable>
  );
}
