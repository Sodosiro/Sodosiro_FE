import { CreateIcon, ToTopIcon } from "@/assets/svgs";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { AnimatedPressable } from "../common/animated/Animated";
import PlusIcon from "../icon/feed/PlusIcon";

const floatingButtonStyle = `rounded-full border border-border p-3`;

export default function FeedFloatingButton({
  onToTop,
}: {
  onToTop: () => void;
}) {
  const [isExpended, setIsExpended] = useState(false);

  const { containerStyle, strokeStyle, borderStyle } = useSelectedAnimation(
    isExpended,
    {
      background: ["#ffffff", "#1a1a1a"],
      stroke: ["#1a1a1a", "white"],
      border: ["#d9d9d9", "#1a1a1a"],
    },
  );

  // + → ×
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isExpended ? "45deg" : "0deg"),
      },
    ],
  }));

  const toTopButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isExpended ? 1 : 0),
    transform: [
      {
        translateY: withTiming(isExpended ? -50 : 0),
      },
    ],
  }));

  const createButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isExpended ? 1 : 0),
    transform: [
      {
        translateY: withTiming(isExpended ? -100 : 0),
      },
    ],
  }));

  return (
    <View className="absolute bottom-5 right-5 items-center">
      {/* 작성 버튼 */}
      <Animated.View style={createButtonStyle} className="absolute bottom-0">
        <AnimatedPressable
          className={`bg-white ${floatingButtonStyle}`}
          onPress={() => router.push("/feed/create")}
        >
          <CreateIcon width={20} height={20} />
        </AnimatedPressable>
      </Animated.View>

      {/* To Top 버튼 */}
      <Animated.View style={toTopButtonStyle} className="absolute bottom-0">
        <AnimatedPressable
          className={`bg-white ${floatingButtonStyle}`}
          onPress={onToTop}
        >
          <ToTopIcon width={20} height={20} />
        </AnimatedPressable>
      </Animated.View>

      {/* 확장 버튼 */}
      <AnimatedPressable
        className={`${floatingButtonStyle}`}
        style={[containerStyle, borderStyle]}
        onPress={() => setIsExpended((prev) => !prev)}
      >
        <Animated.View style={rotationStyle}>
          <PlusIcon animatedStroke={strokeStyle} />
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
}
