import { AnimatedPath } from "@/components/common/animated/Animated";
import Svg from "react-native-svg";

export default function AccommodationIcon({
  animatedStroke,
}: AnimatedIconProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <AnimatedPath
        d="M1.33203 13.3337V8.00033C1.33203 7.6467 1.47251 7.30757 1.72256 7.05752C1.9726 6.80747 2.31174 6.66699 2.66536 6.66699H13.332C13.6857 6.66699 14.0248 6.80747 14.2748 7.05752C14.5249 7.30757 14.6654 7.6467 14.6654 8.00033V13.3337"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M2.66797 6.66699V4.00033C2.66797 3.6467 2.80844 3.30756 3.05849 3.05752C3.30854 2.80747 3.64768 2.66699 4.0013 2.66699H12.0013C12.3549 2.66699 12.6941 2.80747 12.9441 3.05752C13.1942 3.30756 13.3346 3.6467 13.3346 4.00033V6.66699"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M8 2.66699V6.66699"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M1.33203 12H14.6654"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
