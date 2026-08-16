import { AnimatedPath } from "@/components/common/animated/Animated";
import Svg from "react-native-svg";

export default function PlusIcon({ animatedStroke }: AnimatedIconProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <AnimatedPath
        d="M5 12H19"
        animatedProps={animatedStroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M12 5V19"
        animatedProps={animatedStroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
