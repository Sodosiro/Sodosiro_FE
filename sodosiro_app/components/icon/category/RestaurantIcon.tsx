import { AnimatedPath } from "@/components/common/animated/Animated";
import Svg from "react-native-svg";

export default function RestaurantIcon({ animatedStroke }: AnimatedIconProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <AnimatedPath
        d="M2 1.33301V5.99967C2 6.73301 2.6 7.33301 3.33333 7.33301H6C6.35362 7.33301 6.69276 7.19253 6.94281 6.94248C7.19286 6.69243 7.33333 6.3533 7.33333 5.99967V1.33301"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M4.66992 1.33301V14.6663"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M14.0033 9.99967V1.33301C13.1192 1.33301 12.2714 1.6842 11.6462 2.30932C11.0211 2.93444 10.6699 3.78229 10.6699 4.66634V8.66634C10.6699 9.39967 11.2699 9.99967 12.0033 9.99967H14.0033ZM14.0033 9.99967V14.6663"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
