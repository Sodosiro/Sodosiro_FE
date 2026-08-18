import { DownIcon } from "@/assets/svgs";
import { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomText from "./CustomText";

const ANIMATION_DURATION = 300;
const MAX_LINES = 3;

type Props = {
  children: string;
  font?: "body1" | "body2" | "body3";
  textClass?: string;
};

export default function ExpandableText({
  children,
  font = "body3",
  textClass,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLimited, setIsLimited] = useState(true);
  const [isOverflow, setIsOverflow] = useState(false);

  const collapsedHeight = useSharedValue(0);
  const expandedHeight = useSharedValue(0);
  const animatedHeight = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isExpanded ? "-180deg" : "0deg", {
          duration: ANIMATION_DURATION,
        }),
      },
    ],
  }));

  // 전체 텍스트 높이 측정
  const handleMeasure = (event: any) => {
    const lines = event.nativeEvent.lines;

    if (lines.length === 0) return;

    const lineHeight = lines[0].height;

    const expanded = lines.length * lineHeight;
    const collapsed = Math.min(lines.length, MAX_LINES) * lineHeight;

    expandedHeight.value = expanded;
    collapsedHeight.value = collapsed;

    // 최초 측정
    if (animatedHeight.value === 0) {
      animatedHeight.value = collapsed;
    }

    setIsOverflow(lines.length > MAX_LINES);
  };

  const handleToggle = () => {
    if (isExpanded) {
      // 펼침 → 닫힘
      setIsExpanded(false);

      animatedHeight.value = withTiming(collapsedHeight.value, {
        duration: ANIMATION_DURATION,
      });

      setTimeout(() => {
        setIsLimited(true);
      }, ANIMATION_DURATION);
    } else {
      // 닫힘 → 펼침
      setIsLimited(false);
      setIsExpanded(true);

      animatedHeight.value = withTiming(expandedHeight.value, {
        duration: ANIMATION_DURATION,
      });
    }
  };

  return (
    <View className="w-full">
      {/* 측정용 텍스트 */}
      <View className="absolute opacity-0" pointerEvents="none">
        <CustomText
          font={font}
          className={textClass}
          onTextLayout={handleMeasure}
        >
          {children}
        </CustomText>
      </View>

      {/* 실제 텍스트 */}
      <Animated.View className="overflow-hidden" style={containerStyle}>
        <CustomText
          font={font}
          className={textClass}
          numberOfLines={isLimited ? MAX_LINES : undefined}
        >
          {children}
        </CustomText>
      </Animated.View>

      {/* 3줄 초과일 때만 버튼 */}
      {isOverflow && (
        <Pressable
          className="absolute right-0 top-0"
          hitSlop={8}
          onPress={handleToggle}
        >
          <Animated.View style={iconStyle}>
            <DownIcon width={16} />
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
}
