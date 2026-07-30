import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ColorConfig = {
  background?: [string, string];
  color?: [string, string];
};

export default function useSelectedAnimation(
  selected: boolean,
  {
    background = ["#FFFFFF", "#1A1A1A"],
    color = ["#1A1A1A", "#FFFFFF"],
    duration = 150,
  }: ColorConfig & {
    duration?: number;
  },
) {
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, {
      duration,
    });
  }, [selected, duration, progress]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], background),
  }));

  const strokeStyle = useAnimatedProps(() => ({
    stroke: interpolateColor(progress.value, [0, 1], color),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], color),
  }));

  return {
    containerStyle,
    strokeStyle,
    textStyle,
  };
}
