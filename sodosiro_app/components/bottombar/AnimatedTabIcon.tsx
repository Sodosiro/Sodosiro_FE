import useSelectedAnimation from "@/hooks/useSelcetedAnimation";

import Animated from "react-native-reanimated";

import type { SvgProps } from "react-native-svg";

type Props = {
  focused: boolean;
  Icon: React.ComponentType<SvgProps>;
};

export default function AnimatedTabIcon({ focused, Icon }: Props) {
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  const { animatedProps } = useSelectedAnimation(focused, {
    color: ["#888888", "#1a1a1a"],
  });

  return <AnimatedIcon width={24} height={24} animatedProps={animatedProps} />;
}
