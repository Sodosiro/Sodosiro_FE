import { WhiteBigCheckIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import { ACTION_BADGE_CLASS } from "@/components/trip/badge/badgeStyles";
import { LayoutChangeEvent } from "react-native";

type ActionBadgeProps = {
  text: string;
  selected?: boolean;
  bgWhite?: boolean;
  disabled?: boolean;
  /** 방문 인증이 완료됐을 때 체크 아이콘 표시 */
  isAuthCompleted?: boolean;
  /** 현재 진행 중인 일정임을 강조 (초록 배경) */
  isOngoing?: boolean;
  onPress: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
};

// 장소 상세보기 / 다른 곳으로 변경하기 / 방문 인증하기 등 장소에 대한 액션 뱃지
export default function ActionBadge({
  text,
  selected = false,
  bgWhite = false,
  disabled = false,
  isAuthCompleted = false,
  isOngoing = false,
  onPress,
  onLayout,
}: ActionBadgeProps) {
  const bgClass = isOngoing
    ? "bg-primary"
    : selected
      ? "bg-text-primary"
      : disabled
        ? "bg-btn-disabled"
        : "bg-bg-soft";

  const textClass = isOngoing
    ? "text-text-primary"
    : selected
      ? "text-white"
      : disabled
        ? "text-text-muted"
        : "text-text-primary";

  return (
    <AnimatedPressable
      className={`${bgClass} ${ACTION_BADGE_CLASS}`}
      disabled={disabled}
      onPress={onPress}
      onLayout={onLayout}
    >
      {isAuthCompleted && <WhiteBigCheckIcon />}
      <CustomText font="body3 tight" className={textClass}>
        {text}
      </CustomText>
    </AnimatedPressable>
  );
}
