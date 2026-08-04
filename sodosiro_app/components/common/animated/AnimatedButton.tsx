import type { PressableProps, ViewStyle } from "react-native";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AnimatedPressable } from "./Animated";

interface Props extends PressableProps {
  backgroundColor: string[];
  disabledColor?: string;
  loading?: boolean;
}

export default function AnimatedButton({
  className,
  backgroundColor,
  children,
  disabled,
  loading,
  disabledColor,
  ...props
}: Props) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: loading
      ? backgroundColor[0]
      : disabled
        ? disabledColor
        : interpolateColor(pressed.value, [0, 1], backgroundColor),
  }));

  return (
    <AnimatedPressable
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
      style={animatedStyle as ViewStyle | string}
      className={`${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
