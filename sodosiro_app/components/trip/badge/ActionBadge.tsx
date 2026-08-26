import { BigCheckIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import { ACTION_BADGE_CLASS } from "@/components/trip/badge/badgeStyles";
import { LayoutChangeEvent } from "react-native";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ActionBadgeProps = {
  text: string;
  selected?: boolean;
  disabled?: boolean;
  /** 방문 인증이 완료됐을 때 체크 아이콘 표시 */
  isGpsVerificated?: boolean;
  primary?: boolean;
  onPress: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
};

// 장소 상세보기 / 다른 곳으로 변경하기 / 방문 인증하기 등 장소에 대한 액션 뱃지
export default function ActionBadge({
  text,
  selected = false,
  disabled = false,
  isGpsVerificated = false,
  primary = false,
  onPress,
  onLayout,
}: ActionBadgeProps) {
  const pressed = useSharedValue(0);

  const bgColors = primary
    ? ["#C4D96A", "#A9C92D"]
    : selected
      ? ["#1A1A1A", "#1A1A1A"]
      : disabled
        ? ["#f4f4f4", "#f4f4f4"]
        : ["#ededed", "#e6e6e6"];

  const textClass = primary
    ? "text-text-primary"
    : selected
      ? "text-white"
      : disabled
        ? "text-text-muted"
        : "text-text-primary";

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(pressed.value, [0, 1], bgColors),
  }));

  return (
    <AnimatedPressable
      className={`${ACTION_BADGE_CLASS}`}
      style={animatedStyle}
      disabled={disabled}
      onPress={onPress}
      onLayout={onLayout}
      onPressIn={() => {
        pressed.value = withTiming(1, {
          duration: 100,
        });
      }}
      onPressOut={() => {
        pressed.value = withTiming(0, {
          duration: 100,
        });
      }}
    >
      {isGpsVerificated && (
        <BigCheckIcon
          color={"white"}
          width={14}
          height={14}
        />
      )}
      <CustomText
        font="body3 tight"
        className={textClass}
      >
        {text}
      </CustomText>
    </AnimatedPressable>
  );
}
