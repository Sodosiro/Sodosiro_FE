import { AnimatedCircle, AnimatedPath } from "@/components/common/Animated";
import Svg from "react-native-svg";

export default function GpsIcon({
  animatedStroke,
  animatedFill,
  width = 28,
  height = 28,
}: AnimatedIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 60 60" fill="none">
      <AnimatedPath
        d="M13.5 30H21"
        animatedProps={animatedStroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M39 30H46.5"
        animatedProps={animatedStroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M30 13.5V21"
        animatedProps={animatedStroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M30 39V46.5"
        animatedProps={animatedStroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M30 47.4995C39.665 47.4995 47.5 39.6645 47.5 29.9995C47.5 20.3345 39.665 12.4995 30 12.4995C20.335 12.4995 12.5 20.3345 12.5 29.9995C12.5 39.6645 20.335 47.4995 30 47.4995Z"
        animatedProps={animatedStroke}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedCircle cx={30} cy={30} r={3} animatedProps={animatedFill} />
    </Svg>
  );
}
