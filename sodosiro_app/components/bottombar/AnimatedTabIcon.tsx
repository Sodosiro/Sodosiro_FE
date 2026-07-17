import { useEffect } from "react";

import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { SvgProps } from "react-native-svg";

type Props = {
  focused: boolean;
  Icon: React.ComponentType<SvgProps>;
};

export default function AnimatedTabIcon({
  focused,
  Icon,
}: Props) {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, {
      duration: 200,
    });
  }, [focused]);

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  const animatedProps = useAnimatedProps(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ["#888888", "#1A1A1A"]
    ),
  }));

  return <AnimatedIcon width={24} height={24} animatedProps={animatedProps} />;
}