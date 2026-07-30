import { AnimatedPath } from "@/components/common/Animated";
import Svg from "react-native-svg";

export default function ActivityIcon({ animatedStroke }: AnimatedIconProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <AnimatedPath
        d="M7.99935 9.33366C8.73573 9.33366 9.33268 8.73671 9.33268 8.00033C9.33268 7.26395 8.73573 6.66699 7.99935 6.66699C7.26297 6.66699 6.66602 7.26395 6.66602 8.00033C6.66602 8.73671 7.26297 9.33366 7.99935 9.33366Z"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M8 1.33301V3.99967"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M4.53255 10L2.19922 11.3333"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M13.7982 4.66699L11.4648 6.00033"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M4.53255 6.00033L2.19922 4.66699"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M13.7982 11.3333L11.4648 10"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M6 14.6663L8 9.33301L10 14.6663"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M5.33398 14.667H10.6673"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <AnimatedPath
        d="M12 12.4668C12.9057 11.6567 13.5441 10.5906 13.8307 9.40978C14.1173 8.22891 14.0386 6.98886 13.605 5.8537C13.1714 4.71854 12.4034 3.74178 11.4025 3.05269C10.4017 2.36359 9.21515 1.99463 8 1.99463C6.78485 1.99463 5.59834 2.36359 4.59747 3.05269C3.59661 3.74178 2.82856 4.71854 2.39497 5.8537C1.96137 6.98886 1.88267 8.22891 2.16928 9.40978C2.45588 10.5906 3.09428 11.6567 4 12.4668"
        animatedProps={animatedStroke}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
