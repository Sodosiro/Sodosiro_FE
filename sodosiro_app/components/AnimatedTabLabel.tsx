import { useEffect } from "react";
import { View } from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";


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
      duration: 0,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ["#888888", "#1A1A1A"]
    ),
  }));


  return (
    <View>
      <Animated.Text
        className={`${focused ? `text-body2-tight` : `text-body3-tight`} font-pretendard`}
        style={[animatedStyle]}
      >
        {title}
      </Animated.Text>
    </View>
  );
}