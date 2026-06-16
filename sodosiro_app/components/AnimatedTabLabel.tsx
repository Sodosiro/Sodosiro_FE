import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function AnimatedTabLabel({
  focused,
  title,
}: {
  focused: boolean;
  title: string;
}) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, {
      duration: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ["#CCCCCC", "#1A1A1A"]
    ),
  }));

  return (
    <Animated.Text
      style={[
        {
          fontFamily: "Pretendard",
          fontSize: 11,
          fontWeight: "700",
        },
        animatedStyle,
      ]}
    >
      {title}
    </Animated.Text>
  );
}