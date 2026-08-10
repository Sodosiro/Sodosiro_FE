import { AnimatedPath } from "@/components/common/animated/Animated";
import Svg from "react-native-svg";

export default function BigBusIcon({ animatedStroke }: AnimatedIconProps) {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <AnimatedPath
        d="M9.334 7V14"
        animatedProps={animatedStroke}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M17.5 7V14"
        animatedProps={animatedStroke}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M2.334 14H25.2"
        animatedProps={animatedStroke}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M21 21H24.5C24.5 21 25.084 18.5167 25.434 17.7333C25.551 17.2667 25.667 16.8 25.667 16.3333C25.667 15.8667 25.551 15.4 25.434 14.9333L23.801 9.1C23.451 7.93333 22.284 7 21 7H4.667C4.049 7 3.456 7.246 3.018 7.683C2.58 8.121 2.334 8.714 2.334 9.333V21H5.834"
        animatedProps={animatedStroke}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M8.167 23.333C9.456 23.333 10.5 22.29 10.5 21C10.5 19.711 9.456 18.667 8.167 18.667C6.878 18.667 5.834 19.711 5.834 21C5.834 22.29 6.878 23.333 8.167 23.333Z"
        animatedProps={animatedStroke}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M10.5 21H16.333"
        animatedProps={animatedStroke}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <AnimatedPath
        d="M18.667 23.333C19.956 23.333 21 22.29 21 21C21 19.711 19.956 18.667 18.667 18.667C17.378 18.667 16.334 19.711 16.334 21C16.334 22.29 17.378 23.333 18.667 23.333Z"
        animatedProps={animatedStroke}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
