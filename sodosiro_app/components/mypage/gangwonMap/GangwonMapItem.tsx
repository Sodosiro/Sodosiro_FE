import { AnimatedG, AnimatedPath } from "@/components/common/animated/Animated";
import { useEffect } from "react";
import {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { G, Path } from "react-native-svg";

type RegionProps = {
  id: number;
  d: string;
  x: number;
  y: number;
  isVisited: boolean;
  onPress: () => void;
};

export default function GangwonMapItem({
  id,
  d,
  x,
  y,
  isVisited,
  onPress,
}: RegionProps) {
  const animatedProps = useAnimatedProps(() => ({
    fill: withTiming(isVisited ? "#A9C92D" : "#EDEDED", { duration: 300 }),
  }));

  return (
    <G id={String(id)} onPress={isVisited ? onPress : undefined}>
      <AnimatedPath
        animatedProps={animatedProps}
        stroke={"#ffffff"}
        fillRule="evenodd"
        d={d}
      />
      {isVisited && <PinMini x={x} y={y} onPress={onPress} />}
    </G>
  );
}

function PinMini({
  x,
  y,
  onPress,
}: {
  x: number;
  y: number;
  onPress: () => void;
}) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 300,
    });
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedG
      animatedProps={animatedProps}
      transform={`translate(${x - 24}, ${y - 48}) scale(3)`}
      onPress={onPress}
    >
      <Path
        d="M8.39806 14.5328C9.63806 13.4622 13.3307 9.9955 13.3307 6.66683C13.3307 5.25234 12.7688 3.89579 11.7686 2.89559C10.7684 1.8954 9.41188 1.3335 7.9974 1.3335C6.58291 1.3335 5.22635 1.8954 4.22616 2.89559C3.22597 3.89579 2.66406 5.25234 2.66406 6.66683C2.66406 9.9955 6.35673 13.4622 7.59673 14.5328C7.71225 14.6197 7.85286 14.6667 7.9974 14.6667C8.14193 14.6667 8.28255 14.6197 8.39806 14.5328Z"
        fill="#7E9432"
      />
      <Path
        d="M8 8.66675C9.10457 8.66675 10 7.77132 10 6.66675C10 5.56218 9.10457 4.66675 8 4.66675C6.89543 4.66675 6 5.56218 6 6.66675C6 7.77132 6.89543 8.66675 8 8.66675Z"
        fill="white"
      />
    </AnimatedG>
  );
}
