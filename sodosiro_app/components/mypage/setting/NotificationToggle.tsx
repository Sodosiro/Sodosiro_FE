import { AnimatedPressable } from "@/components/common/animated/Animated";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function NotificationToggle({
  toggle,
  setToggle,
  children,
  disabled,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  disabled?: boolean;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(toggle ? 18 : 0, {
          duration: 200,
        }),
      },
    ],
  }));

  const selected = disabled ? false : toggle;

  const { containerStyle } = useSelectedAnimation(selected, {
    background: ["#E6E6E6", "#A9C92D"],
  });

  return (
    <View className="flex-row gap-2 py-3 items-center">
      {children}
      <AnimatedPressable
        style={containerStyle}
        onPress={() => setToggle((prev) => !prev)}
        disabled={disabled}
        className="w-11 h-6 rounded-full p-0.75 bg-primary-pressed"
      >
        <Animated.View
          className="size-4.5 bg-bg rounded-full"
          style={animatedStyle}
        />
      </AnimatedPressable>
    </View>
  );
}
