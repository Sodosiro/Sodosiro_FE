import { XMiniIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import { BADGE_BASE_CLASS } from "@/components/trip/badge/badgeStyles";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { LayoutChangeEvent } from "react-native";

type DayBadgeProps = {
  text: string;
  selected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  isEditing?: boolean;
  onLayout: (e: LayoutChangeEvent) => void;
  onDelete?: () => void;
};

// 상단 "N일차" 탭 뱃지 (조회 모드 전용 - 스크롤 동기화 및 탭 이동만 담당)
export default function DayBadge({
  text,
  selected = false,
  onPress,
  onLongPress,
  isEditing = false,
  onLayout,
  onDelete,
}: DayBadgeProps) {
  const { containerStyle, textStyle } = useSelectedAnimation(selected, {});

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      onLayout={onLayout}
      className={BADGE_BASE_CLASS}
      style={containerStyle}
    >
      <CustomText
        font="body3 tight"
        className={selected ? "text-white" : "text-text-primary"}
        animatedStyle={textStyle}
      >
        {text}
      </CustomText>
      {isEditing && <XMiniIcon onPress={onDelete} />}
    </AnimatedPressable>
  );
}
