import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { AnimatedView } from "../animated/Animated";
import CustomText from "../CustomText";

export function SkeletonLine({
  width = "100%",
  font = "body3",
  backgroundColors = ["#ededed", "#e6e6e6"],
}: {
  width?: `${number}%`;
  font?: TypoType;
  backgroundColors?: string[];
}) {
  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1000,
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], backgroundColors),
  }));

  return (
    <AnimatedView className="w-full rounded" style={[{ width }, animatedStyle]}>
      <CustomText font={font} />
    </AnimatedView>
  );
}
